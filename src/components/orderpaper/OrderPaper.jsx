import '../../styles/orderpaper.css'

export default function OrderPaper() {
  return (
    <section className="orderpaper" aria-label="Legislatures tracked and the weekly order paper">
      <div className="wrap op-grid">
        <div className="op-left reveal">
          <div className="op-cap">On our order paper</div>
          <h3>Read nightly, from the official record.</h3>
          <p>Thirty-eight legislatures are ingested every night from Hansard, UN documents and each house&apos;s own
            proceedings page. What reaches your floor is what was tabled, amended or divided on &mdash; sourced and
            timestamped.</p>
          <form className="op-form">
            <input type="email" required placeholder="you@example.org" aria-label="Email address for the weekly order paper" />
            <button type="submit" data-cursor="Send">Weekly paper</button>
          </form>
          <div id="opNote">Added &mdash; the paper posts each Friday, 09:00 GMT.</div>
        </div>
        <div className="op-list reveal">
          <div className="op-item"><b>United Nations</b><span>General Assembly</span></div>
          <div className="op-item"><b>Congress of the United States</b><span>Washington</span></div>
          <div className="op-item"><b>House of Commons</b><span>Westminster</span></div>
          <div className="op-item"><b>Rajya Sabha</b><span>New Delhi</span></div>
          <div className="op-item"><b>European Parliament</b><span>Strasbourg</span></div>
          <div className="op-item"><b>Folketing</b><span>Copenhagen</span></div>
          <div className="op-item"><b>Bundestag</b><span>Berlin</span></div>
          <div className="op-item"><b>Sejm</b><span>Warsaw</span></div>
          <div className="op-item"><b>National Assembly</b><span>Paris</span></div>
          <div className="op-item"><b>Riksdag</b><span>Stockholm</span></div>
          <div className="op-item"><b>Knesset</b><span>Jerusalem</span></div>
          <div className="op-item"><b>Cortes Generales</b><span>Madrid</span></div>
          <div className="op-item"><b>Althingi</b><span>Reykjav&iacute;k</span></div>
          <div className="op-item"><b>Oireachtas</b><span>Dublin</span></div>
          <div className="op-item"><b>Senate of the Republic</b><span>Rome</span></div>
          <div className="op-item"><b>House of Representatives</b><span>Canberra</span></div>
        </div>
      </div>
    </section>
  );
}
