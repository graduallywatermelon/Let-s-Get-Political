import '../../styles/orderpaper.css'
import { orderPaperItems } from '../../data/orderPaperItems';

export default function OrderPaper() {
  return (
    <section className="orderpaper" aria-label="Legislatures tracked and the weekly order paper">
      <div className="wrap op-grid">
        <div className="op-left reveal">
          <div className="op-cap">On our order paper</div>
          <h3>Read nightly, from the official record.</h3>
          <p>Thirty-eight legislatures are ingested every night from Hansard, UN documents and each house&apos;s own
            proceedings page. What reaches your floor is what was tabled, amended or divided on &mdash; sourced and
            timestamped.</p>
          <form className="op-form">
            <input type="email" required placeholder="you@example.org" aria-label="Email address for the weekly order paper" />
            <button type="submit" data-cursor="Send">Weekly paper</button>
          </form>
          <div id="opNote">Added &mdash; the paper posts each Friday, 09:00 GMT.</div>
        </div>
        <div className="op-list reveal">
          {orderPaperItems.map((it) => (
            <div className="op-item" key={it.name}>
              <b>{it.name}</b>
              <span>{it.city}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
