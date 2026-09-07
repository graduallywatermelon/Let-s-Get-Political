import { roadmapItems } from '../../data/roadmapItems';

export default function RoadmapSection() {
  return (
    <section id="roadmap">
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: 640 }}>
          <div className="kick">What&apos;s next &middot; On the order paper</div>
          <h2>More instruments for <em>accountability.</em></h2>
        </div>
        <div className="tl">
          {roadmapItems.map((it) => (
            <div className="tli reveal" key={it.id}>
              <div>
                <div className="when">{it.when}</div>
                <h4>{it.title}</h4>
                <p>{it.text}</p>
                <span className={`pill ${it.pillClass}`}>{it.pillText}</span>
              </div>
              <p>{it.side}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
