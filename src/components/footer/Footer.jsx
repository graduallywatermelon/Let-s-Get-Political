import '../../styles/footer.css'
import { footerColumns } from '../../data/footerLinks';
import SmartAnchor from '../common/SmartAnchor';

export default function Footer() {
  return (
    <div className="footwrap">
      <div className="wrap footgrid">
        <div className="footbrand">
          <span className="lgp serif">LGP</span>
          <p>Let&apos;s Get Political &mdash; a civic debating platform built in React for the generation that inherits
            every verdict.</p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h5>{col.title}</h5>
            {col.links.map((l, i) => (
              <SmartAnchor key={`${col.title}-${i}`} to={l.to} href={l.href}>{l.label}</SmartAnchor>
            ))}
          </div>
        ))}
      </div>
      <div className="wrap footbase">
        <span>&copy; Let&apos;s Get Political</span>
        <span>No parties. No outrage algorithms. Just the record.</span>
      </div>
    </div>
  );
}
