import '../../styles/orderbox.css';

export default function OrderBox() {
  return (
    <aside className="orderbox reveal" aria-label="Bills currently in division">
      <div className="ob-head">
        <span className="ob-cap">On the floor today</span>
        <span className="ob-live"><i></i>Divisions open</span>
      </div>
      <div className="bills">
      <div className="billrow" data-cursor="Vote" data-org="un">
        <div className="bl-top">
          <span className="org">United Nations<span className="ref">res. A/81/L.7</span></span>
          <span className="due">closes Fri 19 Sep, 22:00 GMT</span>
        </div>
        <div className="nm">Ocean Treaty — deep-sea mining moratorium, Art. 4</div>
        <div className="ds">A ten-year pause on prospecting licences in the Clarion-Clipperton Zone, conditional on an independent review of the sediment-plume data. Nauru and Kiribati have both entered dissents.</div>
        <div className="split"><i data-w="71"></i></div>
        <div className="bl-bot">
          <span>Ayes <b>18,402</b></span>
          <span>Noes <b>7,539</b></span>
          <button type="button" className="votebtn" data-cursor="Cast">Record vote</button>
        </div>
      </div>
      <div className="billrow" data-cursor="Vote" data-org="uk">
        <div className="bl-top">
          <span className="org">United Kingdom<span className="ref">HL Bill 92</span></span>
          <span className="due">closes 21 Sep, 17:00 GMT</span>
        </div>
        <div className="nm">Digital Rights &amp; Algorithms Bill</div>
        <div className="ds">Feed-ranking on accounts registered to under-18s becomes auditable, and Ofcom gets the power to actually demand the audit. What's left to argue about is who pays for the auditors.</div>
        <div className="split"><i data-w="58"></i></div>
        <div className="bl-bot">
          <span>Ayes <b>9,144</b></span>
          <span>Noes <b>6,602</b></span>
          <button type="button" className="votebtn" data-cursor="Cast">Record vote</button>
        </div>
      </div>
      <div className="billrow" data-cursor="Vote" data-org="eu">
        <div className="bl-top">
          <span className="org">European Union<span className="ref">COM(2026) 341</span></span>
          <span className="due">closes 23 Sep, 20:00 CET</span>
        </div>
        <div className="nm">Housing First Amendment Directive</div>
        <div className="ds">Member states would treat emergency bed-nights as a last resort and publish an exit plan against them. Ireland and Portugal applied early; France abstained at committee, oddly.</div>
        <div className="split"><i data-w="83"></i></div>
        <div className="bl-bot">
          <span>Ayes <b>31,655</b></span>
          <span>Noes <b>6,508</b></span>
          <button type="button" className="votebtn" data-cursor="Cast">Record vote</button>
        </div>
      </div>
      <div className="billrow" data-cursor="Vote" data-org="de">
        <div className="bl-top">
          <span className="org">Germany<span className="ref">BT Drs 20/11842</span></span>
          <span className="due">extended &mdash; now closes 2 Oct, 18:00 CET</span>
        </div>
        <div className="nm">Youth Quota in Legislative Committees Act</div>
        <div className="ds">Land committees would need at least one member under thirty. The coalition whips are two votes short and the CDU has started counting defectors out loud.</div>
        <div className="split"><i data-w="46"></i></div>
        <div className="bl-bot">
          <span>Ayes <b>4,910</b></span>
          <span>Noes <b>5,744</b></span>
          <button type="button" className="votebtn" data-cursor="Cast">Record vote</button>
        </div>
      </div>
      <div className="billrow" data-cursor="Vote" data-org="un">
        <div className="bl-top">
          <span className="org">United Nations<span
                      class="ref">ITU-D/26/CRCDT-3<span className="ref"></span></span>
          <span className="due">closes 28 Sep, 22:00 GMT</span>
        </div>
        <div className="nm">Digital Commons Compact — connectivity as public good</div>
        <div className="ds">Connectivity treated as a public good, with a small levy on transit payloads funding maintenance rather than new builds. Drafted quietly by the secretariat, then leaked in full.</div>
        <div className="split"><i data-w="67"></i></div>
        <div className="bl-bot">
          <span>Ayes <b>15,338</b></span>
          <span>Noes <b>7,580</b></span>
          <button type="button" className="votebtn" data-cursor="Cast">Record vote</button>
        </div>
      </div>
      <div className="billrow" data-cursor="Vote" data-org="eu">
        <div className="bl-top">
          <span className="org">European Union<span className="ref">COM(2026) 128 rev.
                      2</span></span>
          <span className="due">report stage &middot; closes 30 Sep, 20:00 CET</span>
        </div>
        <div className="nm">AI Liability Directive — burden of proof, Art. 7</div>
        <div className="ds">Would shift the burden onto suppliers to prove their system <em>didn't</em> cause the harm claimed. Insurers hate it; the consumer bloc says eleven years is long enough.</div>
        <div className="split"><i data-w="62"></i></div>
        <div className="bl-bot">
          <span>Ayes <b>12,874</b></span>
          <span>Noes <b>7,903</b></span>
          <button type="button" className="votebtn" data-cursor="Cast">Record vote</button>
        </div>
      </div>
      </div>
      <div className="ob-foot">
        <span>Updated from official records daily at 06:00</span>
        <a href="#draft" data-cursor="Draft">Write your own →</a>
      </div>
    </aside>
  );
}
