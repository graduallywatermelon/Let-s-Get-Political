import { useEffect } from 'react';

export function useWordCycle(wrapRef, count, every = 3400) {
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || count < 2) return;
    const WORDS = [...wrap.querySelectorAll('.w')];
    let wi = 0, cycPaused = false;
    WORDS.forEach((w, i) => {
      if (i) { w.style.transform = 'translateY(105%)'; w.style.opacity = '0'; }
    });
    const onVis = () => { cycPaused = document.hidden };
    document.addEventListener('visibilitychange', onVis);
    const id = setInterval(() => {
      if (cycPaused) return;
      const hide = WORDS[wi], show = WORDS[(wi + 1) % WORDS.length];
      wi = (wi + 1) % WORDS.length;
      hide.style.transition = 'transform .5s cubic-bezier(.55,0,.35,1),opacity .28s';
      hide.style.transform = 'translateY(-105%)';
      hide.style.opacity = '0';
      void show.offsetWidth;
      show.style.transition = 'transform .62s cubic-bezier(.16,1,.3,1) .12s,opacity .34s .12s';
      show.style.transform = 'translateY(0)';
      show.style.opacity = '1';
    }, every);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [wrapRef, count, every]);
}
