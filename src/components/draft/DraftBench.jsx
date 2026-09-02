import '../../styles/draft.css'
import { draftSteps } from '../../data/draftSteps';
import PaperCard from './PaperCard';

export default function DraftBench() {
  return (
    <section id="draft">
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: 640 }}>
          <div className="kick">The Draft Bench &middot; Propose legislation</div>
          <h2>Don&apos;t just vote on law. <em>Write it.</em></h2>
        </div>
        <div className="steps-top reveal" id="stepsTop">
          <div className="flowline"><i></i></div>
          <div className="steplist">
            {draftSteps.map((s, i) => (
              <div className="stepnode" key={s.numeral}>
                <span className="dot" style={{ '--d': `${.2 + i * .4}s` }}>{s.numeral}</span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="draft-cols">
          <PaperCard />
          <div className="reveal">
            <p style={{ fontSize: 17, lineHeight: 1.85, color: '#3E4656', maxWidth: '50ch' }}>
              The Draft Bench turns voters into authors. Every proposal is versioned, every amendment is argued in
              public, and nothing disappears into a void &mdash; drafts that stall are archived with the reasons
              attached.
            </p>
            <ul className="cando" style={{ marginTop: 26 }}>
              <li>Guided drafting written with constitutional lawyers</li>
              <li>Public amendment threads with argument scoring</li>
              <li>Merits-based promotion &mdash; no signatures required to be heard</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
