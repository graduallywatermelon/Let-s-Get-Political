import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCollection } from '../store/useCollection';
import { findBill, clausesFor } from '../store/domain';
import SmartAnchor from '../components/common/SmartAnchor';
import Pill from '../components/common/Pill';
import VotePanel from '../components/common/VotePanel';
import AmendmentBoard from '../components/common/AmendmentBoard';
import CommentThread from '../components/common/CommentThread';
import ReportDialog from '../components/common/ReportDialog';
import { useReports } from '../store/useReports';

function NotFound({ id }) {
  return (
    <div className="wrap">
      <div className="empty-state reveal in"><b>No text with reference “{id}”.</b>
        It may have been withdrawn, or the link mistyped.
        {' '}<SmartAnchor to="/bills" data-cursor="Board">Back to the bills &#8594;</SmartAnchor></div>
    </div>
  );
}

export default function BillDetailPage() {
  const { id } = useParams();
  const { items: userBills } = useCollection('bills');
  const bill = findBill(id, userBills);
  const [reporting, setReporting] = useState(false);
  const { flagged } = useReports('bill', id);
  if (!bill) return <NotFound id={id} />;
  const clauses = clausesFor(bill);
  return (
    <div className="wrap">
      <div className="bill-hero reveal">
        <div className="bh-crumbs">
          <SmartAnchor to="/bills">The Bills</SmartAnchor><span>&#183;</span>
          <span>{bill.orgLabel}</span><span>&#183;</span>
          {bill.seed ? <Pill tone="live">Division open</Pill> : <Pill tone="gold">Open for co-signature</Pill>}
        </div>
        <h1 className="serif">{bill.name}</h1>
        <div className="bh-meta">
          {bill.ref && <span>Reference &middot; <b>{bill.ref}</b></span>}
          <span>{bill.due}</span>
          {!bill.seed && <span>Filed by &middot; <b>{bill.alias || 'A citizen'}</b></span>}
        </div>
      </div>
      {flagged && (
        <div className="flag-banner reveal in" style={{ marginTop: 24 }}>
          <Pill tone="flagged">Flagged</Pill>
          Several readers reported a problem with this entry. A moderator will re-check it against the tabled text;
          the record below stays visible meanwhile.
        </div>
      )}
      <div className="bill-cols">
        <div>
          <section className="reveal">
            <div className="sect-kick">The summary</div>
            <p className="summary-lead">{bill.desc}</p>
            <ul className="summary-list">
              {(clauses[0] ? ['It binds: ' + (clauses.find((c) => c.h !== null)?.h || clauses[0].n).toLowerCase() + ' is the operative machinery of this text.',
                'Every clause below is quoted as tabled — the link opens the full original against which amendments are measured.',
                bill.seed ? 'Dissents and secondings stay attached to this page for the life of the division.'
                  : 'As a citizen petition this carries no chamber number until it earns floor time.'] : []).map((s) => <li key={s}>{s}</li>)}
            </ul>
            <a className="doclink" href={'/bill/' + bill.id + '/text'} target="_blank" rel="noopener noreferrer" data-cursor="Open">
              Read the original text as tabled <i aria-hidden="true">&#8599;</i>
            </a>
          </section>
          <section className="reveal">
            <div className="sect-kick" style={{ marginTop: 46 }}>The clauses</div>
            <div className="clauses-preview">
              {clauses.map((c) => (
                <div className="cl-row" key={c.n}>
                  <div>
                    <div className="cl-n">{c.n}</div>
                    {c.h && <div className="cl-h">{c.h}</div>}
                  </div>
                  <p className="cl-p">{c.p.join(' ')}</p>
                </div>
              ))}
            </div>
          </section>
          <AmendmentBoard bill={bill} />
          <CommentThread refKey={'bill:' + bill.id} title="Debate on the floor"
            note="Arguments stay attached to this text and to every vote cast after yours. Bring sources; shout is free elsewhere." />
        </div>
        <aside className="bill-side">
          <div className="side-card reveal">
            <VotePanel bill={bill} />
          </div>
          <div className="side-card reveal">
            <div className="fact-row"><span>Stage</span><span>{bill.seed ? 'Committee &rarr; floor' : 'Petition, unsigned chamber route'}</span></div>
            <div className="fact-row"><span>Sponsor</span><span>{bill.seed ? 'As tabled — see original text' : bill.alias || 'A citizen'}</span></div>
            <div className="fact-row"><span>Closes</span><span>{bill.due}</span></div>
            <div className="fact-row"><span>Amendments</span><span>{clauses.length} clauses on the table</span></div>
          </div>
          <button className="btn-ghost reveal" style={{ justifySelf: 'start' }} onClick={() => setReporting(true)} data-cursor="Flag">Report this entry</button>
        </aside>
      </div>
      <ReportDialog open={reporting} kind="bill" refId={bill.id} subject={bill.name} onClose={() => setReporting(false)} />
    </div>
  );
}
