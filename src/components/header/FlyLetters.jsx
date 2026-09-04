import { useEffect } from 'react';

const LETTERS = ['L', 'G', 'P'];

export default function FlyLetters() {
  useEffect(() => {
    const brandEl = document.querySelector('.brand');
    const megaEl = document.querySelector('.mega');
    if (!brandEl || !megaEl) return;
    const flies = [...document.querySelectorAll('.fly')];
    let introDone = false;
    const revealHero = () => document.querySelectorAll('.mega .up').forEach((el, i) => {
      el.style.transition = 'transform 1.05s cubic-bezier(.2,.9,.2,1) ' + (i * 110) + 'ms';
      el.style.transform = 'translateY(0)';
    });
    const inHero = () => {
      const r = document.querySelector('.hero').getBoundingClientRect();
      return r.bottom > innerHeight * .35;
    };
    const updateBrand = () => {
      const home = introDone && !inHero();
      brandEl.classList.toggle('mark-on', home);
      if (home) brandEl.classList.remove('mark-out');
    };
    addEventListener('scroll', updateBrand, { passive: true });
    const HERO_ROWS = [0, 1, 2].map((i) => {
      const row = document.querySelectorAll('.mega .row')[i].getBoundingClientRect();
      return { x: row.left, y: row.top + row.height * .02, fs: parseFloat(getComputedStyle(megaEl).fontSize) };
    });
    const launchFlights = () => {
      brandEl.classList.add('mark-out');
      const glyphs = [...brandEl.querySelectorAll('.lgp i')];
      flies.forEach((el, i) => {
        const r = HERO_ROWS[i], g = glyphs[i].getBoundingClientRect();
        const L = Math.round(g.left) - 1, T = Math.round(g.top) + 2;
        el.style.fontSize = '31px';
        el.style.left = L + 'px';
        el.style.top = T + 'px';
        el.style.opacity = '1';
        const k = r.fs / 31, dx = r.x - L, dy = r.y - T;
        const arc = [
          { transform: 'translate(0px,0px) scale(1) rotate(0deg)', color: '#1B2432', opacity: 1 },
          { transform: `translate(${dx * .10}px,${-24 - i * 8}px) scale(1.05) rotate(${-2 - i}deg)`, color: 'var(--gold)', opacity: 1, offset: .22 },
          { transform: `translate(${dx * .45}px,${dy * .26 - (30 - i * 6)}px) scale(${k * .72}) rotate(${-5 - i * 1.5}deg)`, color: 'var(--gold)', opacity: 1, offset: .52 },
          { transform: `translate(${dx}px,${dy - 8}px) scale(${k * .98}) rotate(0deg)`, color: 'var(--gold)', opacity: .34, offset: .8 },
          { transform: `translate(${dx}px,${dy}px) scale(${k}) rotate(0deg)`, color: 'var(--gold)', opacity: 0 },
        ];
        el.style.display = 'block';
        const anim = el.animate(arc, { duration: 1220, delay: 340 + (2 - i) * 115, easing: 'cubic-bezier(.5,.02,.28,1)', fill: 'both' });
        anim.onfinish = () => { el.style.display = 'none' };
      });
    };
    let t1 = 0, t2 = 0;
    if (scrollY > innerHeight * .3) {
      introDone = true;
      revealHero();
      flies.forEach((f) => { f.style.display = 'none' });
      updateBrand();
    } else {
      const go = () => {
        launchFlights();
        t1 = setTimeout(() => {
          document.querySelectorAll('.mega .up').forEach((el, i) => {
            el.style.transition = 'transform 1s cubic-bezier(.2,.9,.2,1) ' + (i * 130) + 'ms';
            el.style.transform = 'translateY(0)';
          });
        }, 860);
        t2 = setTimeout(() => { introDone = true; updateBrand(); }, 1950);
      };
      (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(go));
    }
    return () => {
      removeEventListener('scroll', updateBrand);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  return LETTERS.map((ch, i) => (
    <span key={i} className="fly" id={`fly${i}`} aria-hidden="true">{ch}</span>
  ));
}
