import { useEffect, useRef } from 'react';

export default function FinalCTA() {
  const blockRef = useRef(null);
  const verdictRef = useRef(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !blockRef.current) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting && e.intersectionRatio > .5 && verdictRef.current) {
        verdictRef.current.classList.add('show');
        io.disconnect();
      }
    }), { threshold: .5 });
    io.observe(blockRef.current);
    return () => io.disconnect();
  }, []);
  return (
    <section id="final">
      <div className="wrap">
        <h2 className="reveal">Put it <em>to the vote.</em></h2>
        <p className="reveal">Your seat in the chamber is free, permanent and waiting.</p>
        <div id="verdict" ref={verdictRef}>&ldquo;The Ayes have it.&rdquo;</div>
        <div id="blockZone" ref={blockRef}>
          <span id="shockRing"></span>
          <div id="gavelBlock">Order &middot; The house divides</div>
        </div>
      </div>
    </section>
  );
}
