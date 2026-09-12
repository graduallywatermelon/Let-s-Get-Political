export default function SourceLinks({ srcs = [], kicker = 'Cross-verify' }) {
  if (!srcs.length) return null;
  return (
    <div className="srcholder reveal">
      {kicker && <span className="src-kick">{kicker}</span>}
      <div className="srchips">
        {srcs.map((s, i) => (
          <a key={i} className="srclink" href={s.url || '#'} target="_blank" rel="noopener noreferrer"
            data-cursor="Open">{s.label}<i aria-hidden="true">&#8599;</i></a>
        ))}
      </div>
    </div>
  );
}
