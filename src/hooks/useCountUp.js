import { useEffect, useState } from 'react';
import { useOnceInView } from './useReveal';

export function useCountUp(ref, target, duration = 2400) {
  const [value, setValue] = useState(0);
  useOnceInView(ref, () => {
    let raf = 0;
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / duration);
      const e = 1 - Math.pow(1 - k, 3);
      setValue(Math.round(target * e));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, .5);
  return value;
}
