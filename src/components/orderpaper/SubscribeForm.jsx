import { useEffect, useRef, useState } from 'react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [noteOn, setNoteOn] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) return;
    setEmail('');
    setNoteOn(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNoteOn(false), 4000);
  };

  return (
    <>
      <form className="op-form" onSubmit={onSubmit}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.org"
          aria-label="Email address for the weekly order paper"
        />
        <button type="submit" data-cursor="Send">Weekly paper</button>
      </form>
      <div id="opNote" className={noteOn ? 'on' : ''}>
        Added &mdash; the paper posts each Friday, 09:00 GMT.
      </div>
    </>
  );
}
