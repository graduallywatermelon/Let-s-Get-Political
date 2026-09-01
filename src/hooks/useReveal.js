import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll?.('.meter i,.split i').forEach((i) => requestAnimationFrame(() => {
        i.style.width = i.dataset.w + '%';
      }));
      io.unobserve(e.target);
    }), { threshold: .2 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useOnceInView(ref, onEnter, threshold = .5) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries, ob) => {
      if (!entries[0].isIntersecting) return;
      onEnter();
      ob.disconnect();
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, onEnter, threshold]);
}
