import { arenaClauses } from '../../../data/arenaModes';

export default function ClauseFig() {
  return (
    <div className="clauses">
      {arenaClauses.map((c) => (
        <div className="clause" key={c.article}>
          <b>{c.article}</b>
          <span>{c.label}</span>
          <span className="fa">{c.verdict}</span>
        </div>
      ))}
    </div>
  );
}
