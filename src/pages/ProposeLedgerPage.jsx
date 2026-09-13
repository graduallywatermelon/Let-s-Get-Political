import { useState } from 'react';
import { useCollection } from '../store/useCollection';
import PageIntro from '../components/common/PageIntro';
import Receipt from '../components/common/Receipt';

const ORGS = [['uk', 'United Kingdom'], ['eu', 'European Union'], ['de', 'Germany'], ['un', 'United Nations'], ['other', 'Anywhere with a record']];
const TAGS = ['Reversal', 'Quiet dilution', 'Contradiction'];
const URL_OK = /^https?:\/\/.+\..+/;

const EMPTY = {
  person: '', role: '', org: 'uk', tag: 'Reversal', context: '',
  thenQuote: '', thenDate: '', thenLabel: '', thenUrl: '',
  nowQuote: '', nowDate: '', nowLabel: '', nowUrl: '',
};

export default function ProposeLedgerPage() {
  const { add } = useCollection('flipflops');
  const [f, setF] = useState(EMPTY);
  const [errs, setErrs] = useState({});
  const [filed, setFiled] = useState(null);
  const set = (k) => (e) => setF((prev) => ({ ...prev, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const need = {};
    if (f.person.trim().length < 3) need.person = 'Who are we pairing? A name or an office.';
    if (f.thenQuote.trim().length < 12) need.thenQuote = 'Quote the statement — a fragment is fine, but give us words actually said.';
    if (!f.thenDate.trim()) need.thenDate = 'Even an approximate date keeps the pair honest.';
    if (!URL_OK.test(f.thenUrl.trim())) need.thenUrl = 'A full https:// link reviewers can open.';
    if (f.nowQuote.trim().length < 12) need.nowQuote = 'The action needs its own words.';
    if (!f.nowDate.trim()) need.nowDate = 'When did the vote or statement land?';
    if (!URL_OK.test(f.nowUrl.trim())) need.nowUrl = 'A full https:// link reviewers can open.';
    if (f.context.trim().length < 40) need.context = 'Give the record some air: at least a sentence of context.';
    setErrs(need);
    if (Object.keys(need).length) return;
    const ref = 'L-' + String(Date.now()).slice(-5);
    add({ ...f, id: ref }, 'ff');
    setFiled(ref);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  if (filed) {
    return (
      <div className="wrap">
        <Receipt stamp="Entered for review" refNo={filed}
          to="/ledger" cta="See it in the Ledger">
          Your pairing is on the page with an “awaiting review” stamp. Two readers re-reading your sources clears it
          into the verified book — or your citation gets argued with downstairs.
        </Receipt>
      </div>
    );
  }
  return (
    <div className="wrap">
      <PageIntro kicker="The Flip-Flop Ledger &middot; propose an addition"
        lede={<>Two quotes, two dates, two openable sources. That is the entire bar for entry — and the only thing
          that ever gets a pair removed.</>}>
        Add a line<br /><em>between what was promised and what was done.</em>
      </PageIntro>
      <form className="big-form reveal in" style={{ marginTop: 36 }} onSubmit={submit} noValidate>
        <div className="frow-ser">
          <div className="frow">
            <label htmlFor="p-person">Who *</label>
            <input id="p-person" value={f.person} onChange={set('person')} maxLength="80"
              placeholder="Name or office — e.g. The Trade Secretary" />
            {errs.person && <p className="ferr">{errs.person}</p>}
          </div>
          <div className="frow">
            <label htmlFor="p-role">Office / institution</label>
            <input id="p-role" value={f.role} onChange={set('role')} maxLength="80" placeholder="e.g. Department of Trade" />
          </div>
        </div>
        <div className="frow-ser">
          <div className="frow">
            <label htmlFor="p-org">Chamber or body</label>
            <select id="p-org" value={f.org} onChange={set('org')}>
              {ORGS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div className="frow">
            <label htmlFor="p-tag">What kind of move is it</label>
            <select id="p-tag" value={f.tag} onChange={set('tag')}>
              {TAGS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="sect-kick" style={{ marginTop: 34 }}>The statement &mdash; then</div>
        <div className="frow-ser">
          <div className="frow">
            <label htmlFor="p-tq">Quoted words *</label>
            <textarea id="p-tq" rows="3" maxLength="400" value={f.thenQuote} onChange={set('thenQuote')}
              placeholder="As said, not as summarised." />
            {errs.thenQuote && <p className="ferr">{errs.thenQuote}</p>}
          </div>
          <div className="frow">
            <label htmlFor="p-td">Date *</label>
            <input id="p-td" value={f.thenDate} onChange={set('thenDate')} maxLength="40" placeholder="e.g. 14 March" />
            {errs.thenDate && <p className="ferr">{errs.thenDate}</p>}
          </div>
        </div>
        <div className="frow-ser">
          <div className="frow">
            <label htmlFor="p-tl">Source reads as</label>
            <input id="p-tl" value={f.thenLabel} onChange={set('thenLabel')} maxLength="70" placeholder="e.g. Floor speech · Hansard col. 447" />
          </div>
          <div className="frow">
            <label htmlFor="p-tu">Source link *</label>
            <input id="p-tu" type="url" value={f.thenUrl} onChange={set('thenUrl')} placeholder="https://…" />
            {errs.thenUrl && <p className="ferr">{errs.thenUrl}</p>}
          </div>
        </div>
        <div className="sect-kick" style={{ marginTop: 34 }}>The action &mdash; now</div>
        <div className="frow-ser">
          <div className="frow">
            <label htmlFor="p-nq">Quoted words *</label>
            <textarea id="p-nq" rows="3" maxLength="400" value={f.nowQuote} onChange={set('nowQuote')}
              placeholder="The vote, the interview, the rewritten clause." />
            {errs.nowQuote && <p className="ferr">{errs.nowQuote}</p>}
          </div>
          <div className="frow">
            <label htmlFor="p-nd">Date *</label>
            <input id="p-nd" value={f.nowDate} onChange={set('nowDate')} maxLength="40" placeholder="e.g. 29 July" />
            {errs.nowDate && <p className="ferr">{errs.nowDate}</p>}
          </div>
        </div>
        <div className="frow-ser">
          <div className="frow">
            <label htmlFor="p-nl">Source reads as</label>
            <input id="p-nl" value={f.nowLabel} onChange={set('nowLabel')} maxLength="70" placeholder="e.g. Division record · aye" />
          </div>
          <div className="frow">
            <label htmlFor="p-nu">Source link *</label>
            <input id="p-nu" type="url" value={f.nowUrl} onChange={set('nowUrl')} placeholder="https://…" />
            {errs.nowUrl && <p className="ferr">{errs.nowUrl}</p>}
          </div>
        </div>
        <div className="frow">
          <label htmlFor="p-ctx">The record between them *</label>
          <textarea id="p-ctx" rows="4" maxLength="700" value={f.context} onChange={set('context')}
            placeholder="What happened in between, and why the pairing is fair — including their best defence." />
          {errs.context && <p className="ferr">{errs.context}</p>}
        </div>
        <div className="form-actions">
          <span className="fhint">Filed under your standing if you name one; “a citizen” is a respectable standing.</span>
          <button type="submit" className="btn-solid" data-cursor="File">Propose the pair</button>
        </div>
      </form>
    </div>
  );
}
