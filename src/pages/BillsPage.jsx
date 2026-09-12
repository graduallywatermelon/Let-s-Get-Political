import { useMemo, useState } from 'react';
import { useCollection } from '../store/useCollection';
import { allBills } from '../store/domain';
import SmartAnchor from '../components/common/SmartAnchor';
import PageIntro from '../components/common/PageIntro';
import Pill from '../components/common/Pill';

const ORGS = [['all', 'Everything'], ['un', 'United Nations'], ['uk', 'United Kingdom'], ['eu', 'European Union'], ['de', 'Germany'], ['citizen', "Citizen's bench"]];

function BillCard({ b, comments, voted }) {
  return (
    <SmartAnchor className={'bcard reveal' + (b.seed ? '' : ' bcard-draft')} to={'/bill/' + b.id} data-cursor="Read">
      <div className="bc-top">
        <span className="bc-org">{b.orgLabel}</span>
        {b.seed ? <Pill tone="live">Live</Pill> : <Pill tone="gold">Citizen draft</Pill>}
      </div>
      <h3>{b.name}</h3>
      <p className="bc-desc">{b.desc}</p>
      {b.seed
        ? <div className="bc-meter"><i data-w={b.meter}></i></div>
        : <div className="ff-role">No chamber reading yet &middot; argues on the text alone</div>}
      <div className="bc-foot">
        <span>{b.due}</span>
        <span>{comments ? comments + ' in debate' : 'First word yours'}{voted && ' · you voted'}{' '}</span>
        <span className="bc-open">Open &#8594;</span>
      </div>
    </SmartAnchor>
  );
}

export default function BillsPage() {
  const { items: userBills } = useCollection('bills');
  const { items: comments } = useCollection('comments');
  const { items: votes } = useCollection('votes');
  const [org, setOrg] = useState('all');
  const [q, setQ] = useState('');
  const bills = allBills(userBills);
  const shown = useMemo(() => bills.filter((b) => {
    if (org !== 'all' && b.org !== org) return false;
    const needle = q.trim().toLowerCase();
    if (!needle) return true;
    return (b.name + ' ' + b.desc + ' ' + b.ref).toLowerCase().includes(needle);
  }), [bills, org, q]);
  return (
    <div className="wrap">
      <PageIntro kicker="The Bills &middot; read it, then take a side"
        lede={<>Every live text on the board, with its division open to you. Vote, argue in the open, or file an
          amendment against the exact words it touches. Citizen drafts sit alongside chamber bills &mdash; same record,
          same scrutiny.</>}>
        The Bills.<br /><em>Yours to amend.</em>
      </PageIntro>
      <div className="chips reveal">
        {ORGS.map(([k, label]) => (
          <button key={k} className={'chip' + (org === k ? ' on' : '')} onClick={() => setOrg(k)} data-cursor="Show">{label}</button>
        ))}
        <input className="searchbox" type="search" placeholder="Search titles, references, summaries…" data-cursor="Type"
          value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the bills" data-cursor="Type" />
      </div>
      <div className="list-meta">
        {shown.length} of {bills.length} texts &middot; citizen drafts carry a petition number, not a chamber one
        {' '}&mdash;{' '}
        <SmartAnchor to="/bills/new" style={{ color: 'var(--gold)', fontWeight: 800, letterSpacing: '.1em' }} data-cursor="Draft">Propose your own &#8594;</SmartAnchor>
      </div>
      {shown.length === 0 ? (
        <div className="empty-state reveal in"><b>Nothing matches that yet.</b>Loosen the filter &mdash; or write the
          bill the board is missing. <SmartAnchor to="/bills/new" data-cursor="Draft">Take the Draft Bench &#8594;</SmartAnchor></div>
      ) : (
        <div className="bills-grid">
          {shown.map((b) => (
            <BillCard key={b.id} b={b}
              comments={comments.filter((c) => c.ref === 'bill:' + b.id).length}
              voted={votes.some((v) => v.billId === b.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
