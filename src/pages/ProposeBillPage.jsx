import { useState } from 'react';
import { useCollection } from '../store/useCollection';
import PageIntro from '../components/common/PageIntro';
import Receipt from '../components/common/Receipt';

const CATEGORIES = ['Environment', 'Technology & rights', 'Economy', 'Housing', 'Governance', 'Peace & security'];
const ROMAN = ['I', 'II', 'III'];

export default function ProposeBillPage() {
  const { add } = useCollection('bills');
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ title: '', category: CATEGORIES[0], alias: '', desc: '', body: '' });
  const [errs, setErrs] = useState({});
  const [filed, setFiled] = useState(null);
  const set = (k) => (e) => setF((prev) => ({ ...prev, [k]: e.target.value }));
  const validate = () => {
    const need = {};
    if (step === 0 && f.title.trim().length < 8) need.title = 'A name the record can cite — at least eight characters.';
    if (step === 1) {
      if (f.desc.trim().length < 40) need.desc = 'One clause-led paragraph: the problem and the outcome, together.';
      if (f.body.trim().length < 80) need.body = 'The operative text. Blank lines separate clauses.';
    }
    setErrs(need);
    return Object.keys(need).length === 0;
  };
  const next = () => { if (validate()) setStep(step + 1); };
  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const ref = 'CB-2026-' + String(Math.floor(1000 + Math.random() * 9000));
    const billId = 'cb' + Date.now().toString(36);
    add({ id: billId, title: f.title.trim(), desc: f.desc.trim(), body: f.body.trim(), ref, category: f.category, alias: f.alias.trim() }, 'b');
    setFiled({ billId, ref });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  if (filed) {
    return (
      <div className="wrap">
        <Receipt stamp="On the bench" refNo={filed.ref} to={'/bill/' + filed.billId} cta="Open your bill">
          Your bill sits on the Citizen&apos;s bench, open for co-signature and exactly as amendable as anything a
          minister tables. The link from the board goes straight to your text.
        </Receipt>
      </div>
    );
  }
  const previewClauses = f.body.split(/\n{2,}/).filter((p) => p.trim());
  return (
    <div className="wrap">
      <PageIntro kicker="The Draft Bench &middot; open to everyone"
        lede={<>Ministerial bills arrive through whips; yours arrives through the text. Three panels, then it is on
          the board — versioned, amendable, and permanently answerable to argument.</>}>
        Write a bill.<br /><em>The record will take it.</em>
      </PageIntro>
      <div className="stepper reveal in">
        {['Name it', 'Draft it', 'Tabel it'].map((s, i) => (
          <span key={s} className={'stepdot' + (i === step ? ' on' : i < step ? ' done' : '')}>
            <i>{ROMAN[i]}</i>{s}{i < step ? ' \u2713' : ''}
          </span>
        ))}
      </div>
      <form className="big-form reveal in" style={{ marginTop: 20 }} onSubmit={submit} noValidate>
        {step === 0 && (
          <>
            <div className="frow">
              <label htmlFor="b-title">Bill title *</label>
              <input id="b-title" value={f.title} onChange={set('title')} maxLength="120"
                placeholder="e.g. Right to Repair (Consumer Electronics) Bill" />
              {errs.title && <p className="ferr">{errs.title}</p>}
            </div>
            <div className="frow-ser">
              <div className="frow">
                <label htmlFor="b-cat">Field</label>
                <select id="b-cat" value={f.category} onChange={set('category')}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="frow">
                <label htmlFor="b-alias">Standing — how the record cites you</label>
                <input id="b-alias" value={f.alias} onChange={set('alias')} maxLength="48"
                  placeholder="Optional — “a citizen” is already on the record." />
              </div>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div className="frow">
              <label htmlFor="b-desc">The one-paragraph case *</label>
              <textarea id="b-desc" rows="4" maxLength="320" value={f.desc} onChange={set('desc')}
                placeholder="Name the problem and the outcome you want, in one clause-led paragraph." />
              {errs.desc && <p className="ferr">{errs.desc}</p>}
            </div>
            <div className="frow">
              <label htmlFor="b-body">The operative text * <em>&mdash; a blank line starts a new clause; a short first line becomes its heading</em></label>
              <textarea id="b-body" rows="10" maxLength="4000" value={f.body} onChange={set('body')}
                placeholder={'Scope\nThis Act applies to…\n\nThe duty\nA manufacturer must, for seven years from sale…'} />
              <p className="fhint">{previewClauses.length} clause{previewClauses.length === 1 ? '' : 's'} detected so far.</p>
              {errs.body && <p className="ferr">{errs.body}</p>}
            </div>
          </>
        )}
        {step === 2 && (
          <div className="bcard reveal in" style={{ cursor: 'default' }}>
            <div className="bc-top"><span className="bc-org">Citizen&apos;s bench</span><span className="pill pill-gold">Preview</span></div>
            <h3>{f.title}</h3>
            <p className="bc-desc" style={{ WebkitLineClamp: 6, display: 'block' }}>{f.desc}</p>
            {previewClauses.map((p, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                <div className="cl-n">Clause {i + 1}</div>
                <p className="cl-p" style={{ whiteSpace: 'pre-line' }}>{p.trim()}</p>
              </div>
            ))}
          </div>
        )}
        <div className="form-actions">
          {step > 0
            ? <button type="button" className="btn-ghost" onClick={() => setStep(step - 1)}>Back to the last panel</button>
            : <span className="fhint">Nothing publishes until you table it.</span>}
          {step < 2
            ? <button key="continue" type="button" className="btn-solid" onClick={next} data-cursor="Next">Continue</button>
            : <button key="table" type="submit" className="btn-solid" data-cursor="Table">Table the bill</button>}
        </div>
      </form>
    </div>
  );
}
