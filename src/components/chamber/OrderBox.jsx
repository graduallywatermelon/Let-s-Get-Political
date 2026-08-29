import '../../styles/orderbox.css'
import { bills } from '../../data/bills';
import BillRow from './BillRow';

export default function OrderBox() {
  return (
    <aside className="orderbox reveal" aria-label="Bills currently in division">
      <div className="ob-head">
        <span className="ob-cap">On the floor today</span>
        <span className="ob-live"><i></i>Divisions open</span>
      </div>
      <div className="bills">
        {bills.map((b) => (
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
