import { navLinks } from '../../data/navLinks';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import SmartAnchor from '../common/SmartAnchor';
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
              <SmartAnchor key={l.to || l.href} to={l.to} href={l.href} data-cursor={l.cursor}>{l.label}</SmartAnchor>
            ))}
          </nav>
          <div className="nav-right">
            <SmartAnchor className="nav-cta" href="#final" data-cursor="Enter">Enter the Floor</SmartAnchor>
          </div>
          <span id="progress" ref={barRef}></span>
        </div>
      </header>
      <FlyLetters />
    </>
  );
}
