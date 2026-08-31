import '../../styles/orderbox.css'
import { useMemo, useState } from 'react';
import { bills } from '../../data/bills';
import { filterTabs } from '../../data/filterTabs';
import BillRow from './BillRow';

export default function OrderBox() {
  const [filter, setFilter] = useState('all');
  const visible = useMemo(
    () => (filter === 'all' ? bills : bills.filter((b) => b.org === filter)),
    [filter],
  );
  return (
    <aside className="orderbox reveal" aria-label="Bills currently in division">
      <div className="ob-head">
        <span className="ob-cap">On the floor today</span>
        <span className="ob-live"><i></i>Divisions open</span>
      </div>
      <div className="tabs" role="tablist" aria-label="Filter bills by institution">
        {filterTabs.map((t) => (
          <button
            key={t.f}
            type="button"
            role="tab"
            aria-selected={filter === t.f}
            className={`tab${filter === t.f ? ' on' : ''}`}
            onClick={() => setFilter(t.f)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="bills">
        {visible.map((b) => (
          <BillRow key={b.id} bill={b} />
        ))}
      </div>
      <div className="ob-foot">
        <span>Updated from official records daily at 06:00</span>
        <a href="#draft" data-cursor="Draft">Write your own &rarr;</a>
      </div>
    </aside>
  );
}
