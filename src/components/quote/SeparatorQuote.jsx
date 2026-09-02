import { useRef } from 'react';
import { useOnceInView } from '../../hooks/useReveal';

export default function SeparatorQuote() {
  const sepRef = useRef(null);
  useOnceInView(sepRef, () => sepRef.current.classList.add('in'), .6);
  return (
    <section className="sepwrap">
      <div className="wrap">
        <div className="sep" ref={sepRef}>
          <span className="l"></span>
          <span className="dia"></span>
          <span className="r"></span>
        </div>
        <blockquote className="quote reveal">
          <q>Apathy is not consent — it is only a debate nobody showed up to.</q>
          <cite>The Let&apos;s Get Political founding note</cite>
        </blockquote>
      </div>
    </section>
  );
}
