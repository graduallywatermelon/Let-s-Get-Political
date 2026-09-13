import { useMemo, useState } from 'react';
import { useCollection } from '../store/useCollection';
import { allLedger } from '../store/domain';
import SmartAnchor from '../components/common/SmartAnchor';
import PageIntro from '../components/common/PageIntro';
import Pill from '../components/common/Pill';

const FILTERS = [['all', 'The whole book'], ['verified', 'Verified pairs'], ['review', 'Awaiting review']];

function LedgerCard({ r, debates, checks }) {
  return (
    <SmartAnchor className="ffcard reveal" to={'/ledger/' + r.id} data-cursor="Weigh">
      <div className="ff-who">
        <h3>{r.person}</h3>
        <span className="ff-role">{r.role} &middot; {r.org.toUpperCase()}</span>
      </div>
      <div className="ff-half then">
        <div className="ff-stamp">The statement &middot; {r.then.date}</div>
        <p className="ff-quote">{r.then.quote}</p>
      </div>
      <div className="ff-mid"><span aria-hidden="true">&#8646;</span></div>
      <div className="ff-half now ff-now">
        <div className="ff-stamp">The action &middot; {r.now.date} &middot; {r.now.tag}</div>
        <p className="ff-quote">{r.now.quote}</p>
      </div>
      <div className="ff-foot">
        <Pill tone={r.status === 'verified' ? 'live' : 'review'}>{r.status === 'verified' ? 'Verified pair' : 'Awaiting review'}</Pill>
        <span>&#10003; {checks.toLocaleString('en-GB')} cross-checks</span>
        <span>{debates} in the debate</span>
        <span style={{ marginLeft: 'auto', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', fontSize: 10.5 }}>Open the pair &#8594;</span>
      </div>
    </SmartAnchor>
  );
}

export default function LedgerPage() {
  const { items: userEntries } = useCollection('flipflops');
  const { items: comments } = useCollection('comments');
  const { items: verifies } = useCollection('verifies');
  const [status, setStatus] = useState('all');
  const [q, setQ] = useState('');
  const records = allLedger(userEntries);
  const shown = useMemo(() => records.filter((r) => {
    if (status !== 'all' && r.status !== status) return false;
    const needle = q.trim().toLowerCase();
    if (!needle) return true;
    return (r.person + ' ' + r.role + ' ' + r.then.quote + ' ' + r.now.quote).toLowerCase().includes(needle);
  }), [records, status, q]);
  return (
    <div className="wrap">
      <PageIntro kicker="The Flip-Flop Ledger &middot; power, audited"
        lede={<>Promises and votes, paired with dates and sources you can open yourself. Anyone can propose an
          addition &mdash; nothing enters the book without its citations, and every pair stays debatable in the open.</>}>
        What they said.<br />What they did. <em>The line between them.</em>
      </PageIntro>
      <div className="chips reveal">
        {FILTERS.map(([k, label]) => (
          <button key={k} className={'chip' + (status === k ? ' on' : '')} onClick={() => setStatus(k)}>{label}</button>
        ))}
        <input className="searchbox" type="search" placeholder="Search a person, an office, a quote…" data-cursor="Type"
          value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the ledger" data-cursor="Type" />
      </div>
      <div className="list-meta">
        {shown.length} of {records.length} pairs &middot; proposed entries carry an “awaiting review” stamp until the
        sources are re-read
        {' '}&mdash;{' '}
        <SmartAnchor to="/ledger/new" style={{ color: 'var(--gold)', fontWeight: 800, letterSpacing: '.1em' }} data-cursor="Add">Propose an addition &#8594;</SmartAnchor>
      </div>
      {shown.length === 0 ? (
        <div className="empty-state reveal in"><b>No pair matches that yet.</b>The record is wide but not infinite.
          Try another name &mdash; or file the pairing you noticed. <SmartAnchor to="/ledger/new">Add it &#8594;</SmartAnchor></div>
      ) : (
        <div>
          {shown.map((r) => (
            <LedgerCard key={r.id} r={r}
              debates={comments.filter((c) => c.ref === 'ledger:' + r.id).length}
              checks={(r.checks || 0) + verifies.filter((v) => v.entryId === r.id).length} />
          ))}
        </div>
      )}
    </div>
  );
}
