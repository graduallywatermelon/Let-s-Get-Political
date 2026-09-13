import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCollection } from '../store/useCollection';
import { findLedger } from '../store/domain';
import SmartAnchor from '../components/common/SmartAnchor';
import Pill from '../components/common/Pill';
import SourceLinks from '../components/common/SourceLinks';
import CommentThread from '../components/common/CommentThread';
import ReportDialog from '../components/common/ReportDialog';
import { useReports } from '../store/useReports';

export default function LedgerDetailPage() {
  const { id } = useParams();
  const { items: userEntries } = useCollection('flipflops');
  const { items: verifies, add, remove } = useCollection('verifies');
  const r = findLedger(id, userEntries);
  const [reporting, setReporting] = useState(false);
  const { count, flagged } = useReports('ledger', id);
  if (!r) {
    return (
      <div className="wrap">
        <div className="empty-state reveal in"><b>No pair filed as “{id}”.</b>
          It may still be awaiting its first re-read.
          {' '}<SmartAnchor to="/ledger">Back to the Ledger &#8594;</SmartAnchor></div>
      </div>
    );
  }
  const mine = verifies.find((v) => v.entryId === r.id);
  const checks = (r.checks || 0) + verifies.filter((v) => v.entryId === r.id).length;
  const toggleVerify = () => (mine ? remove(mine.id) : add({ entryId: r.id }, 'vf'));
  return (
    <div className="wrap">
      <div className="bill-hero reveal">
        <div className="bh-crumbs">
          <SmartAnchor to="/ledger">The Ledger</SmartAnchor><span>&#183;</span>
          <span>{r.org.toUpperCase()}</span><span>&#183;</span>
          <Pill tone={r.status === 'verified' ? 'live' : 'review'}>{r.status === 'verified' ? 'Verified pair' : 'Awaiting review'}</Pill>
        </div>
        <h1 className="serif">{r.person}</h1>
        <div className="bh-meta">
          <span>{r.role}</span>
          <span>Filed as entry &middot; <b>{r.id}</b></span>
          <span>&#10003; {checks.toLocaleString('en-GB')} readers re-checked the sources</span>
        </div>
      </div>
      {flagged && (
        <div className="flag-banner reveal in" style={{ marginTop: 24 }}>
          <Pill tone="flagged">Flagged &middot; {count} reports</Pill>
          Readers dispute this pairing. The stamps stay attached to the evidence below until a moderator re-reads
          every source cited.
        </div>
      )}
      <section className="ffcard reveal" style={{ marginTop: 34 }}>
        <div className="ff-half then">
          <div className="ff-stamp">The statement &middot; {r.then.date}</div>
          <p className="ff-quote">{r.then.quote}</p>
          <SourceLinks srcs={r.then.srcs} />
        </div>
        <div className="ff-mid" aria-hidden="true"><span>&#8646;</span></div>
        <div className="ff-half now ff-now">
          <div className="ff-stamp">The action &middot; {r.now.date}</div>
          <p className="ff-quote">{r.now.quote}</p>
          <Pill tone="gold">{r.now.tag}</Pill>
          <SourceLinks srcs={r.now.srcs} />
        </div>
      </section>
      <div className="verify-row reveal">
        <p><b>Cross-verify before you believe it.</b> Open both citations yourself, then mark whether they held up.
          Entries survive re-reading; the book depends on yours.</p>
        <button className={'verify-btn' + (mine ? ' on' : '')} onClick={toggleVerify} data-cursor={mine ? 'Undo' : 'Checked'}>
          {mine ? '\u2713 Sources held up — yours counted' : 'I re-checked both sources'}
        </button>
      </div>
      <section className="reveal" style={{ marginTop: 46 }}>
        <div className="sect-kick">The record between them</div>
        <p className="summary-lead" style={{ fontSize: 17 }}>{r.context}</p>
        <button className="btn-ghost" style={{ marginTop: 8 }} onClick={() => setReporting(true)} data-cursor="Flag">
          Report this entry
        </button>
      </section>
      <CommentThread refKey={'ledger:' + r.id} title="Is it a contradiction, or context?"
        note="The fairest test: argue the strongest version of their side, then say why the pairing stands anyway. Citations beat adjectives." />
      <ReportDialog open={reporting} kind="ledger" refId={r.id} subject={r.person + ' — ' + r.then.quote.slice(0, 50)} onClose={() => setReporting(false)} />
    </div>
  );
}
