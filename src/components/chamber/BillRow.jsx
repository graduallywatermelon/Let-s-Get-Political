export default function BillRow({ bill }) {
  return (
    <div className="billrow" data-cursor="Vote" data-org={bill.org}>
      <div className="bl-top">
        <span className="org">
          {bill.orgLabel}
          <span className="ref">{bill.ref}</span>
        </span>
        <span className="due">{bill.due}</span>
      </div>
      <div className="nm">{bill.name}</div>
      <div className="ds">{bill.desc}</div>
      <div className="split"><i data-w={String(bill.meter)}></i></div>
      <div className="bl-bot">
        <span>Ayes <b>{bill.ayes}</b></span>
        <span>Noes <b>{bill.noes}</b></span>
        <button type="button" className="votebtn" data-cursor="Cast">Record vote</button>
      </div>
    </div>
  );
}
