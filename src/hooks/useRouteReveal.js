import { useEffect } from 'react';

export function useRouteReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll?.('.bc-meter i').forEach((i) => requestAnimationFrame(() => {
        i.style.width = i.dataset.w + '%';
      }));
      io.unobserve(e.target);
    }), { threshold: .12 });
    const scan = () => document.querySelectorAll('.feature .reveal:not(.in)').forEach((el) => io.observe(el));
    const raf = requestAnimationFrame(scan);
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
