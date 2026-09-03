import '../../styles/ledger.css'
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ledgerPair } from '../../data/ledgerPair';
import { buildBridge } from '../../utils/bridge';

export default function LedgerSection() {
  const pairRef = useRef(null);
  const svgRef = useRef(null);
  const drawn = useRef(false);

  const geometry = useMemo(() => buildBridge, []);

  const draw = useCallback(() => {
    const pairEl = pairRef.current, bSvg = svgRef.current;
    if (!pairEl || !bSvg) return null;
    const pr = pairEl.getBoundingClientRect();
    const a = pairEl.querySelector('.pairq.one').getBoundingClientRect();
    const b = pairEl.querySelector('.pairq.two').getBoundingClientRect();
    const geo = geometry(pr, a, b);
    bSvg.setAttribute('viewBox', `0 0 ${geo.W} ${geo.H}`);
    bSvg.innerHTML = `<path class="trace" d="${geo.d}"/>`
      + `<circle class="node" cx="${geo.x1.toFixed(1)}" cy="${geo.y1.toFixed(1)}" r="4"/>`
      + `<circle class="node" cx="${geo.x2.toFixed(1)}" cy="${geo.y2.toFixed(1)}" r="4"/>`;
    const tr = bSvg.querySelector('path');
    if (!drawn.current) {
      tr.style.clipPath = 'inset(0 100% 0 0)';
      tr.style.transition = 'clip-path 2.1s cubic-bezier(.4,0,.3,1) .2s';
    }
    return tr;
  }, [geometry]);

  useEffect(() => {
    let trace = draw();
    let raf = 0;
    const io = new IntersectionObserver((entries, ob) => {
      if (!entries[0].isIntersecting || drawn.current) return;
      drawn.current = true;
      if (trace) trace.style.clipPath = 'inset(0 -2% 0 0)';
      ob.disconnect();
    }, { threshold: .25 });
    if (pairRef.current) io.observe(pairRef.current);
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { trace = draw(); });
    };
    addEventListener('resize', onResize, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { trace = draw(); });
    return () => {
      io.disconnect();
      removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [draw]);

  const { statement, action } = ledgerPair;
  return (
    <section id="ledger">
      <div className="wrap">
        <div className="lg-head reveal">
          <div>
            <div className="kick" style={{ color: 'var(--gold-lt)' }}>The Ledger &middot; Power, audited</div>
            <h2>What they said. What they did.<br /><em>The line between them.</em></h2>
          </div>
          <p>Statements are timestamped and sourced from the official record. When a vote contradicts a promise, the
            Ledger pairs them, dates both, and leaves the evidence attached. No aggregation, no ranking &mdash; just the
            pair.</p>
        </div>
        <div className="pair reveal" ref={pairRef}>
          <svg id="bridgeLines" ref={svgRef} aria-label="A dashed line bridges the promise to the vote that undid it"></svg>
          <blockquote className="pairq one">
            <div className="stamp"><b>{statement.date}</b>the statement</div>
            <span className="said">{statement.said}</span>
            <div className="src">
              {statement.srcLines.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </div>
          </blockquote>
          <blockquote className="pairq two">
            <div className="stamp">the action<b>{action.date}</b></div>
            <span className="said">{action.said}</span>
            <div className="src">
              <em>{action.tag}</em>
              {action.srcLines.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
