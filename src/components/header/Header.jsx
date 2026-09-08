import { navLinks } from '../../data/navLinks';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import BrandMark from './BrandMark';
import FlyLetters from './FlyLetters';

export default function Header() {
  const barRef = useScrollProgress();
  return (
    <>
      <header>
        <div className="wrap nav">
          <BrandMark />
          <nav>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} data-cursor={l.cursor}>{l.label}</a>
            ))}
          </nav>
          <div className="nav-right">
            <a className="nav-cta" href="#final" data-cursor="Enter">Enter the Floor</a>
          </div>
          <span id="progress" ref={barRef}></span>
        </div>
      </header>
      <FlyLetters />
    </>
  );
}
