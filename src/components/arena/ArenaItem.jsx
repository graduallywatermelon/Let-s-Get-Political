import FateFig from './figs/FateFig';
import BracketFig from './figs/BracketFig';
import ClauseFig from './figs/ClauseFig';

const FIGS = { fate: FateFig, bracket: BracketFig, clauses: ClauseFig };

export default function ArenaItem({ mode }) {
  const Fig = FIGS[mode.fig];
  return (
    <article className="a-item" data-step={mode.step}>
      <div className="a-head">
        <span className="a-idx">{mode.numeral}</span>
        <h3>{mode.title}</h3>
      </div>
      <div className="a-body">
        <p>{mode.text}</p>
        <div className="fig">
          <span className="tag">{mode.tag}</span>
          <Fig />
        </div>
      </div>
    </article>
  );
}
