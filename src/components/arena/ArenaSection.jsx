import { useRef } from 'react';
import { arenaModes } from '../../data/arenaModes';
import { useSectionSpy } from '../../hooks/useSectionSpy';
import ArenaItem from './ArenaItem';

export default function ArenaSection() {
  const listRef = useRef(null);
  const active = useSectionSpy(listRef, '.a-item');
  return (
    <section id="arena">
      <div className="arena-grid">
        <div style={{ display: 'contents' }}>
          <div className="a-sticky">
            <div>
              <div className="a-note">Section II &mdash;<br />Structured debate</div>
              <h2>Three ways<br /><em>in.</em></h2>
            </div>
            <div>
              <div className="a-prog" id="aprog">
                {arenaModes.map((m, i) => (
                  <div key={m.step} className={`a-step${active === i ? ' on' : ''}`}>
                    <span className="bar"></span>0{m.step + 1} / {m.title}
                  </div>
                ))}
              </div>
              <div className="a-note" style={{ marginTop: 40 }}>
                1v1 and 2v2 &middot; timed rounds &middot; scored by the audience on argument alone.
              </div>
            </div>
          </div>
          <div className="a-list" ref={listRef}>
            {arenaModes.map((m) => (
              <ArenaItem key={m.step} mode={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
