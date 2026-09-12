import '../styles/pages.css';
import { useParams } from 'react-router-dom';
import { useCollection } from '../store/useCollection';
import { findBill, clausesFor } from '../store/domain';
import SmartAnchor from '../components/common/SmartAnchor';

export default function BillTextPage() {
  const { id } = useParams();
  const { items: userBills } = useCollection('bills');
  const bill = findBill(id, userBills);
  if (!bill) {
    return (
      <div className="docwrap">
        <div className="docbar">
          <SmartAnchor to="/bills">&#8592; The bills</SmartAnchor>
          <span>Text not found</span>
        </div>
        <div className="wrap"><div className="empty-state reveal in" style={{ marginTop: 60 }}>This reference is not
          on the board. <SmartAnchor to="/bills">Back to the bills &#8594;</SmartAnchor></div></div>
      </div>
    );
  }
  const clauses = clausesFor(bill);
  return (
    <div className="docwrap">
      <div className="docbar">
        <SmartAnchor to={'/bill/' + bill.id}>&#8592; Return to the record</SmartAnchor>
        <span>Original text &middot; as tabled, unamended</span>
      </div>
      <article className="doc-sheet">
        <div className="doc-head">
          <div className="crest">&#10070; LET&apos;S GET POLITICAL &#10070;</div>
          <h1>{bill.name}</h1>
          <p>{bill.ref ? bill.ref + ' · ' : ''}{bill.orgLabel} · {bill.due}</p>
        </div>
        {clauses.map((c) => (
          <section className="doc-clause" key={c.n} style={{ marginBottom: 30 }}>
            <h2>{c.n}{c.h ? ' — ' + c.h : ''}</h2>
            {c.p.map((p, i) => <p key={i}>{p}</p>)}
          </section>
        ))}
        <footer className="doc-foot">
          Digital facsimile generated from the tabled text on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.
          Amendments filed after generation are not incorporated here; the live amendment list beside the summary is
          authoritative for what has been seconded so far.
        </footer>
      </article>
    </div>
  );
}
