import { useRef } from 'react';
import { useWordCycle } from '../../hooks/useWordCycle';

export default function WordCycle({ words }) {
  const wrapRef = useRef(null);
  useWordCycle(wrapRef, words.length);
  return (
    <span id="cycleWrap" ref={wrapRef}>
      {words.map((w) => <span key={w} className="w">{w}</span>)}
    </span>
  );
}
