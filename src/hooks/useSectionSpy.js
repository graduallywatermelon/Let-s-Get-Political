import { useEffect, useState } from 'react';

export function useSectionSpy(containerRef, itemSelector) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const items = [...root.querySelectorAll(itemSelector)];
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      setActive(+e.target.dataset.step);
    }), { threshold: 0 });
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, [containerRef, itemSelector]);
  return active;
}
