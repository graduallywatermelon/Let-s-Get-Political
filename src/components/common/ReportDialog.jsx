import { useEffect, useRef, useState } from 'react';
import { useCollection } from '../../store/useCollection';
import { REPORT_REASONS } from '../../data/social';

export default function ReportDialog({ open, kind, refId, subject, onClose }) {
  const { add } = useCollection('reports');
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);
  const firstRef = useRef(null);

  useEffect(() => {
    if (!open) { setReason(''); setNote(''); setDone(false); return; }
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    if (firstRef.current) firstRef.current.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const reasons = REPORT_REASONS[kind] || REPORT_REASONS.comment;
  const submit = (e) => {
    e.preventDefault();
    if (!reason) return;
    add({ kind, refId: String(refId), reason, note: note.trim() }, 'rep');
    setDone(true);
    setTimeout(onClose, 1400);
  };
  return (
    <div className="rd-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="rd-card" role="dialog" aria-modal="true" aria-label={'Report ' + kind}>
        <div className="rd-kick">Flag for review</div>
        <h4>{'Report this ' + kind}</h4>
        {subject && <p className="rd-subject">{subject}</p>}
        {done ? (
          <p className="rd-thanks">Logged &mdash; a moderator will re-read the entry with your note attached.</p>
        ) : (
          <form onSubmit={submit}>
            <fieldset>
              <legend>What is wrong with it?</legend>
              {reasons.map((r, i) => (
                <label key={r} className="rd-radio">
                  <input type="radio" name="rd-reason" value={r}
                    checked={reason === r}
                    ref={i === 0 ? firstRef : null}
                    onChange={() => setReason(r)} />
                  <span>{r}</span>
                </label>
              ))}
            </fieldset>
            <textarea rows="3" placeholder="Anything a reviewer should know (optional)"
              value={note} maxLength="400" onChange={(e) => setNote(e.target.value)} />
            <div className="rd-actions">
              <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-solid" disabled={!reason} data-cursor="File">Submit report</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
