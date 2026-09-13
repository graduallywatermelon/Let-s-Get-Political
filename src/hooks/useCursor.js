import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
    const cLabel = cursor.querySelector('.cl');
    let cxp = innerWidth / 2, cyp = innerHeight / 2, ctx_ = cxp, cty = cyp;
    let raf = 0;
    const onMove = (e) => { cxp = e.clientX; cyp = e.clientY };
    addEventListener('pointermove', onMove, { passive: true });
    const cursorLoop = () => {
      ctx_ += (cxp - ctx_) * .24;
      cty += (cyp - cty) * .24;
      cursor.style.transform = `translate(${ctx_}px,${cty}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(cursorLoop);
    };
    cursorLoop();
    let current = null;
    const clear = () => {
      if (!current) return;
      cursor.classList.remove('big');
      if (current.matches('.nav nav a')) current.classList.remove('blind');
      current = null;
    };
    const onOver = (e) => {
      const el = e.target && e.target.closest ? e.target.closest('[data-cursor]') : null;
      if (el === current) return;
      clear();
      if (!el) return;
      current = el;
      cLabel.textContent = el.dataset.cursor;
      cursor.classList.add('big');
      if (el.matches('.nav nav a')) el.classList.add('blind');
    };
    document.addEventListener('pointerover', onOver);
    const hide = () => { cursor.style.opacity = 0 };
    const show = () => { cursor.style.opacity = 1 };
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, []);
}
