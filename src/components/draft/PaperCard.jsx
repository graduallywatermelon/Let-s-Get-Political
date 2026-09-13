const LINES = [92, 100, 84, 97, 58];
const TARGET = 2318;

export default function PaperCard() {
  return (
    <div className="paper reveal">
      <div className="ph">Clean Air in Cities Bill</div>
      <div className="ps">Community draft No.&nbsp;097 &middot; Open for co-signatures</div>
      {LINES.map((w, i) => (
        <div key={i} className="ln" style={{ '--w': `${w}%` }}></div>
      ))}
      <div className="signrow">
        <div className="avatars"><i></i><i></i><i></i><i></i></div>
        <div className="cs">
          <b>{TARGET.toLocaleString()}</b> citizens have co-signed this draft
        </div>
      </div>
      <span className="stamp3">First Reading</span>
    </div>
  );
}
