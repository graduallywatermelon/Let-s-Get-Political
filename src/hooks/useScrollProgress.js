import { useEffect, useRef } from 'react';

export function useScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = document.body.scrollHeight - innerHeight;
      if (barRef.current) barRef.current.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return barRef;
}
