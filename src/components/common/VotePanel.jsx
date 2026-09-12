import { useCollection } from '../../store/useCollection';
import { tally } from '../../store/domain';
import { fmtCount } from '../../store/local';

export default function VotePanel({ bill }) {
  const { items, add, update } = useCollection('votes');
  const mine = items.find((v) => v.billId === bill.id);
  const t = tally(bill, items, bill.id);
  const cast = (side) => {
    if (mine) update(mine.id, { side });
    else add({ billId: bill.id, side }, 'v');
  };
  return (
    <div className={'votebox' + (mine ? ' voted' : '')}>
      <div className="vb-kick">{mine ? 'Your division bell has rung' : 'How do you call it?'}</div>
      {!mine ? (
        <div className="vb-buttons">
          <button className="vb-aye" onClick={() => cast('aye')} data-cursor="Aye">Aye<em>for the bill</em></button>
          <button className="vb-no" onClick={() => cast('nay')} data-cursor="Nay">Nay<em>against it</em></button>
        </div>
      ) : (
        <>
          <div className="vb-result">
            <span><b>{t.pct}%</b> aye &middot; {fmtCount(t.ayes)} &mdash; {fmtCount(t.noes)} nay <b>{100 - t.pct}%</b></span>
            <div className="vb-bar" role="img" aria-label={t.pct + ' percent aye'}>
              <i className="aye" style={{ width: t.pct + '%' }}></i>
              <i className="nay" style={{ width: (100 - t.pct) + '%' }}></i>
            </div>
          </div>
          <p className="vb-called">You voted <b>{mine.side === 'aye' ? 'Aye' : 'Nay'}</b>. Your name goes to the division list with the timestamp.</p>
          <button className="vb-change" onClick={() => cast(mine.side === 'aye' ? 'nay' : 'aye')} data-cursor="Flip">Change my vote</button>
        </>
      )}
    </div>
  );
}
