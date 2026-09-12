export default function PageIntro({ kicker, children, lede }) {
  return (
    <div className="page-head reveal">
      <div>
        <div className="kick">{kicker}</div>
        <h1 className="serif">{children}</h1>
      </div>
      {lede && <p>{lede}</p>}
    </div>
  );
}
