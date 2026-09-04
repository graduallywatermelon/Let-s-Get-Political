import OrderBox from './OrderBox';

export default function ChamberSection() {
  return (
    <section id="chamberSec">
      <div className="wrap">
        <div className="ch-grid">
          <div className="reveal ch-copy">
            <div className="kick">The Chamber &middot; Divisions, live</div>
            <h2>Read the bill. <em>Then</em> take a side.</h2>
            <p>Bills reach the Chamber from Westminster, Strasbourg, Berlin and New York within hours of publication
              &mdash; as a plain-language brief naming the sponsors, the stakes and the exact article under argument.
              You vote on the text in front of you, not on a headline written about it afterwards.</p>
            <ul className="cando">
              <li>A recorded vote on every article, weighted once, logged with your reasoning</li>
              <li>Clause threads instead of a comment feed &mdash; argument ranked, not boosted</li>
              <li>A cohort tracker that shows how your age group moves as a division closes</li>
            </ul>
          </div>
          <OrderBox />
        </div>
      </div>
    </section>
  );
}
