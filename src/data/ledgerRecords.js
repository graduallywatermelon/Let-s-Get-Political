export const ledgerRecords = [
  {
    id: 'L-01', person: 'The Chancellor of the Exchequer', role: 'HM Treasury', org: 'uk',
    then: { date: '14 March', quote: 'We will not, under any circumstance, widen student fees.', srcs: [
      { label: 'Hansard vol. 812, col. 447', url: 'https://hansard.parliament.uk/' },
      { label: 'Timestamped video · 00:41:12', url: 'https://www.youtube.com/@channel4news' },
    ] },
    now: { date: '29 July', quote: 'A necessary modernisation of graduate contributions.', tag: 'Reversal', srcs: [
      { label: 'Committee evidence FEB 214, Q7', url: 'https://committees.parliament.uk/committee/158/treasury-committee/' },
      { label: 'Division record: aye — fee cap lifted', url: 'https://divisionsexplorer.org.uk/' },
    ] },
    context: 'The March refusal was delivered as an answer on higher-education funding and used the exact words “under any circumstance”. The July statement accompanied the amendment lifting the graduate contribution cap. No intervening consultation changed the underlying cost modelling.',
    status: 'verified', checks: 1284,
  },
  {
    id: 'L-02', person: 'Rapporteur on the Digital Services Budget', role: 'European Parliament · ITRE', org: 'eu',
    then: { date: '2 February', quote: 'No file under this rapporteurship will see its enforcement budget trimmed. I stake the mandate on it.', srcs: [
      { label: 'Committee floor speech · transcript 02/02', url: 'https://www.europarl.europa.eu/committees/en/home' },
    ] },
    now: { date: '11 February', quote: 'The enforcement line is reallocated to the innovation facility, at the Commission\u2019s request.', tag: 'Reversal', srcs: [
      { label: 'Amendment 44 · tabled text', url: 'https://www.europarl.europa.eu/RegData/etudes/ABOUT/en/homepage_en.pdf' },
    ] },
    context: 'Nine days between the pledge and the amendment, which moved EUR 340m from enforcement to a facility with no spending criteria drafted yet. The rapporteur maintains the pledge was about the line item, not the total.',
    status: 'verified', checks: 651,
  },
  {
    id: 'L-03', person: 'Federal Minister for Digital Infrastructure', role: 'Bundesministerium', org: 'de',
    then: { date: '21 November', quote: 'Rural coverage guarantees will not be weakened in the coalition\u2019s lifetime. That was the agreement, and it stands.', srcs: [
      { label: 'Federal press conference · transcript', url: 'https://www.bundesregierung.de/' },
    ] },
    now: { date: '3 June', quote: 'Coverage obligations must remain technology-open and proportionate.', tag: 'Quiet dilution', srcs: [
      { label: 'Ministry draft, § 67 (rewritten)', url: 'https://www.gesetze-im-internet.de/' },
    ] },
    context: 'The June redraft replaced fixed rural percentage floors with a proportionality test. No press release announced it; the change was visible only in the ref text — which is why it is on this page.',
    status: 'verified', checks: 402,
  },
  {
    id: 'L-04', person: 'Chair, Committee on Delegated Powers', role: 'House of Lords', org: 'uk',
    then: { date: '9 May', quote: 'Any delegated power this size deserves the affirmative procedure. I would be surprised if any minister disagreed.', srcs: [
      { label: 'Committee report, para 18', url: 'https://www.parliament.uk/' },
    ] },
    now: { date: '27 June', quote: 'The explanatory notes make the negative procedure proportionate in this instance.', tag: 'Reversal', srcs: [
      { label: 'Ministerial statement · written', url: 'https://www.thegazette.co.uk/' },
    ] },
    context: 'The ministerial statement the Chair endorsed in June is not, on its face, affirmative-procedure wording — it argues the negative procedure suffices. Whether that is a reversal or a misprint is exactly what the debate below is for.',
    status: 'review', checks: 96,
  },
];
