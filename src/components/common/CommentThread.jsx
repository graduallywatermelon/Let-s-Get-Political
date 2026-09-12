import { useState } from 'react';
import { useCollection } from '../../store/useCollection';
import { commentsFor } from '../../store/domain';
import { relTime } from '../../store/local';
import { useReports } from '../../store/useReports';
import ReportDialog from './ReportDialog';

function CommentRow({ c }) {
  const [open, setOpen] = useState(false);
  const { count } = useReports('comment', c.id);
  return (
    <li className="cmt">
      <span className="cava serif">{(c.author || '?').trim().charAt(0).toUpperCase()}</span>
      <div className="cbody">
        <div className="cmeta">
          <b>{c.author}</b>
          <time>{relTime(c.at)}</time>
          {!c.seed && <span className="cyou">yours</span>}
          {count > 0 && <span className="cflag">under review</span>}
        </div>
        <p>{c.text}</p>
        <button className="report-link" onClick={() => setOpen(true)} data-cursor="Flag">Report{count ? ' · ' + count : ''}</button>
      </div>
      <ReportDialog open={open} kind="comment" refId={c.id} subject={c.text.slice(0, 90) + '…'} onClose={() => setOpen(false)} />
    </li>
  );
}

export default function CommentThread({ refKey, title = 'Debate', note }) {
  const { items, add } = useCollection('comments');
  const list = commentsFor(refKey, items);
  const [alias, setAlias] = useState('');
  const [text, setText] = useState('');
  const submit = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (t.length < 4) return;
    add({ ref: refKey, author: alias.trim() || 'A citizen', text: t }, 'c');
    setText('');
  };
  return (
    <section className="thread reveal">
      <div className="thread-head">
        <h3>{title} <sup>{list.length}</sup></h3>
        {note && <p>{note}</p>}
      </div>
      <ul className="clist">
        {list.length === 0 && <li className="cempty">Nothing on the record yet. Set the tone of the argument.</li>}
        {list.map((c) => <CommentRow key={c.id} c={c} />)}
      </ul>
      <form className="cform" onSubmit={submit}>
        <input type="text" placeholder="Standing (optional) — e.g. Delegate for Portugal" maxLength="48"
          value={alias} onChange={(e) => setAlias(e.target.value)} aria-label="Your standing or name" />
        <textarea rows="3" placeholder="Put the argument, not the shout." maxLength="600"
          value={text} onChange={(e) => setText(e.target.value)} aria-label="Comment text" required />
        <div className="cform-foot">
          <span className="ccount">{text.trim().length} / 600</span>
          <button type="submit" className="btn-solid" disabled={text.trim().length < 4} data-cursor="Post">Enter the debate</button>
        </div>
      </form>
    </section>
  );
}
