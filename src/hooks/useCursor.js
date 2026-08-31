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
    const nodes = document.querySelectorAll('[data-cursor]');
    const enters = [], leaves = [];
    nodes.forEach((el) => {
      const enter = () => {
        cLabel.textContent = el.dataset.cursor;
        cursor.classList.add('big');
        if (el.matches('.nav nav a')) el.classList.add('blind');
      };
      const leave = () => {
        cursor.classList.remove('big');
        el.classList.remove('blind');
      };
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      enters.push([el, enter]); leaves.push([el, leave]);
    });
    const hide = () => { cursor.style.opacity = 0 };
    const show = () => { cursor.style.opacity = 1 };
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onMove);
      enters.forEach(([el, fn]) => el.removeEventListener('mouseenter', fn));
      leaves.forEach(([el, fn]) => el.removeEventListener('mouseleave', fn));
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, []);
}
