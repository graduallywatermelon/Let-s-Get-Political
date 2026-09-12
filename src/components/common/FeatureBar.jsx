import { NavLink } from 'react-router-dom';

export default function FeatureBar() {
  return (
    <div className="fbar">
      <div className="wrap fbar-in">
        <NavLink to="/" className="fbar-brand" data-cursor="Home">
          <span className="lgp serif"><i>L</i><i>G</i><i>P</i></span>
          <span className="fbar-rule"></span>
          <span className="fbar-name">Let&apos;s Get Political</span>
        </NavLink>
        <nav className="fbar-nav">
          <NavLink to="/bills" data-cursor="Bills">The Bills</NavLink>
          <NavLink to="/ledger" data-cursor="Ledger">Flip-Flop Ledger</NavLink>
        </nav>
        <div className="fbar-cta">
          <NavLink to="/bills/new" className="fbar-ghost" data-cursor="Draft">Draft a bill</NavLink>
          <NavLink to="/ledger/new" className="fbar-solid" data-cursor="Add">Add to the Ledger</NavLink>
        </div>
      </div>
    </div>
  );
}
