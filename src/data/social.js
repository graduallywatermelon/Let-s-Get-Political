export const seedAmendments = [
  {
    id: 'am-seed-101', billId: '1', clause: 'Article 4', author: 'Delegate for Fiji', at: '2026-09-05T09:14:00+05:30',
    wording: 'Delete “by a two-thirds majority of its panel members” and substitute “by simple majority, with any dissenting member entitled to append a statement of dissent to the finding”.',
    rationale: 'A two-thirds bar inside an unelected panel is a moratorium that never ends. Simple majority with recorded dissent keeps the evidentiary standard but returns the veto to politics.',
    supports: 214, status: 'On the floor',
  },
  {
    id: 'am-seed-102', billId: '1', clause: 'Article 2', author: 'Observer for the International Seabed Authority', at: '2026-09-06T18:40:00+05:30',
    wording: 'After “withdraw any application pending”, insert “unless the applicant has already conducted a full environmental baseline study certified under regulation 35”.',
    rationale: 'Sponsors who did the expensive science first should not be treated identically to those who skipped it. The carve-out rewards exactly the behaviour the moratorium is trying to buy.',
    supports: 96, status: 'Awaiting committee',
  },
  {
    id: 'am-seed-103', billId: '3', clause: 'Article 6', author: 'Rapporteur\u2019s office (draft)', at: '2026-09-04T14:05:00+05:30',
    wording: 'Add after paragraph 1: “An exit plan that slips by more than twelve months on any milestone triggers a mandatory peer review at the next sitting of the committee.”',
    rationale: 'Publication without consequence is a press release. This attaches an automatic consequence to slippage without inventing a new sanction.',
    supports: 173, status: 'Seconded',
  },
];

export const SEED_COMMENTS = {
  'bill:1': [
    { id: 'c-seed-11', author: 'P. Mali', at: '2026-09-07T11:02:00+05:30', text: 'The dissent states are right about Art. 4 — whoever sets the threshold before the science is in controls the science. Support the Fiji amendment.' },
    { id: 'c-seed-12', author: 'K. Osei', at: '2026-09-07T15:44:00+05:30', text: 'Ten years is a generation of licences either way. If the panel clears early, that should be celebrated, not treated as a capture risk.' },
  ],
  'bill:3': [
    { id: 'c-seed-31', author: 'Delegate for Portugal', at: '2026-09-06T10:18:00+05:30', text: 'We applied the framework in January. Bed-nights down 34% in Lisbon alone — the exit-plan format is workable as drafted.' },
    { id: 'c-seed-32', author: 'Anonymous rapporteur', at: '2026-09-08T19:57:00+05:30', text: 'The French abstention had nothing to do with Art. 6 and everything to do with the spring publication calendar. Read the committee minutes before reading the press release.' },
  ],
  'bill:4': [
    { id: 'c-seed-41', author: 'Zugereist', at: '2026-09-08T08:30:00+05:30', text: 'Binding committees but not plenaries is the clever part — it survives the competence challenge and still moves who actually drafts legislation.' },
  ],
  'bill:6': [
    { id: 'c-seed-61', author: 'Consumer bloc proxy', at: '2026-09-09T12:12:00+05:30', text: 'Eleven years of “wait for the study”. Art. 7 finally makes the side with all the data prove something.' },
    { id: 'c-seed-62', author: 'Insurance correspondent', at: '2026-09-09T16:05:00+05:30', text: 'Rebuttable presumptions that the defendant can only rebut with the plaintiff\u2019s evidence are how you quietly socialise defence costs. Watch the SME cap reopen.' },
  ],
  'ledger:L-01': [
    { id: 'c-seed-l1', author: 'Hansard regular', at: '2026-09-03T09:21:00+05:30', text: 'The March quote is complete as printed — col. 447 includes the “under any circumstance” framing in her own interruption, not the questioner\u2019s words.' },
    { id: 'c-seed-l2', author: 'Constituency organiser', at: '2026-09-03T13:48:00+05:30', text: 'Context cuts both ways: the July statement is about graduate contributions, which March explicitly excluded. The pairing is fair, but say so precisely.' },
  ],
  'ledger:L-02': [
    { id: 'c-seed-l3', author: 'Committee watcher', at: '2026-09-05T17:30:00+05:30', text: 'The floor speech and the amendment are only nine days apart. That is not a reversal over months — it is four sitting days of arithmetic catching up with rhetoric.' },
  ],
};

export const REPORT_REASONS = {
  bill: ['Duplicate of an existing entry', 'Misattributed or wrong sponsor', 'Text does not match the official record', 'Spam or advertising'],
  ledger: ['Quote taken out of context', 'Wrong date or wrong person', 'Source link is broken or fake', 'Not actually a contradiction'],
  comment: ['Personal attack', 'Off-topic', 'Fabricated citation', 'Spam or advertising'],
};
