import { useState } from 'react';
import { useCollection } from '../../store/useCollection';
import { amendmentsFor, clausesFor } from '../../store/domain';
import { relTime } from '../../store/local';
import Pill from './Pill';
import ReportDialog from './ReportDialog';

function AmendmentRow({ a, n }) {
  const { items, add, remove } = useCollection('supports');
  const mine = items.find((s) => s.amId === a.id);
  const [open, setOpen] = useState(false);
  const toggle = () => (mine ? remove(mine.id) : add({ amId: a.id }, 'sp'));
  return (
    <li className={'am' + (a.seed ? '' : ' am-mine')}>
      <div className="am-meta">
        <span className="am-no serif">A&#8209;{String(n).padStart(2, '0')}</span>
        <Pill tone={a.status === 'On the floor' ? 'live' : a.status === 'Seconded' ? 'gold' : 'mute'}>{a.status}</Pill>
        <span className="am-clause">{a.clause}</span>
      </div>
      <blockquote className="am-wording serif">{a.wording}</blockquote>
      {a.rationale && <p className="am-why">{a.rationale}</p>}
      <div className="am-foot">
        <span>{a.author} &middot; {relTime(a.at)}</span>
        <span className="am-actions">
          <button className={'support' + (mine ? ' on' : '')} onClick={toggle} data-cursor="Second">&#8639; Second · {(a.supports || 0) + (mine ? 1 : 0)}</button>
          <button className="report-link" onClick={() => setOpen(true)} data-cursor="Flag">Report</button>
        </span>
      </div>
      <ReportDialog open={open} kind="comment" refId={a.id} subject={'Amendment A-' + n + ': ' + a.wording.slice(0, 60)} onClose={() => setOpen(false)} />
    </li>
  );
}

export default function AmendmentBoard({ bill }) {
  const { items: userAms, add } = useCollection('amendments');
  const list = amendmentsFor(bill.id, userAms);
  const [open, setOpen] = useState(false);
  const clauses = ['Whole bill', ...clausesFor(bill).map((c) => c.n + (c.h ? ' — ' + c.h : ''))];
  const [clause, setClause] = useState(clauses[0]);
  const [wording, setWording] = useState('');
  const [rationale, setRationale] = useState('');
  const [alias, setAlias] = useState('');
  const ok = wording.trim().length >= 40;
  const submit = (e) => {
    e.preventDefault();
    if (!ok) return;
    add({
      billId: bill.id, clause, wording: wording.trim(), rationale: rationale.trim(),
      author: alias.trim() || 'A citizen', supports: 0,
    }, 'am');
    setWording(''); setRationale(''); setOpen(false);
  };
  return (
    <section className="amboard reveal">
      <div className="thread-head">
        <h3>Amendments <sup>{list.length}</sup></h3>
        <p>Every amendment lands in the open and is ranked by argument, not by who filed it.</p>
        {!open && (
          <button className="btn-solid" onClick={() => setOpen(true)} data-cursor="Draft">Propose an amendment</button>
        )}
      </div>
      {open && (
        <form className="am-form reveal in" onSubmit={submit}>
          <div className="frow">
            <label htmlFor="am-alias">Standing (optional)</label>
            <input id="am-alias" type="text" maxLength="48" value={alias} placeholder="e.g. Delegate for Finland"
              onChange={(e) => setAlias(e.target.value)} />
          </div>
          <div className="frow">
            <label htmlFor="am-clause">Touches</label>
            <select id="am-clause" value={clause} onChange={(e) => setClause(e.target.value)}>
              {clauses.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="frow">
            <label htmlFor="am-wording">The operative words <em>&mdash; 40 characters minimum, drafted the way it would be printed</em></label>
            <textarea id="am-wording" rows="4" maxLength="700" value={wording} onChange={(e) => setWording(e.target.value)}
              placeholder={'Delete “…” and substitute “…” / Insert after paragraph 2: “…”'} required />
          </div>
          <div className="frow">
            <label htmlFor="am-why">Why it matters (optional)</label>
            <textarea id="am-why" rows="2" maxLength="400" value={rationale} onChange={(e) => setRationale(e.target.value)} />
          </div>
          <div className="cform-foot">
            <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="btn-solid" disabled={!ok} data-cursor="Table">Table the amendment</button>
          </div>
        </form>
      )}
      <ul className="amlist">
        {list.length === 0 && <li className="cempty">No amendment has touched this text yet. First word is yours.</li>}
        {list.map((a, i) => <AmendmentRow key={a.id} a={a} n={i + 1} />)}
      </ul>
    </section>
  );
}
