import SmartAnchor from './SmartAnchor';

export default function Receipt({ stamp, refNo, children, to, cta }) {
  return (
    <div className="receipt reveal in" role="status">
      <div className="rc-stamp">{stamp}</div>
      <p className="rc-ref">Reference &middot; {refNo}</p>
      <p className="rc-body">{children}</p>
      {to && <SmartAnchor className="btn-solid" to={to} data-cursor="Open">{cta || 'View it'}</SmartAnchor>}
    </div>
  );
}
