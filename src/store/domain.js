import { bills } from '../data/bills';
import { billDocs } from '../data/billDocs';
import { ledgerRecords } from '../data/ledgerRecords';
import { seedAmendments, SEED_COMMENTS } from '../data/social';

const ENTITIES = { '&mdash;': '—', '&ndash;': '–', '&amp;': '&', '&middot;': '·', '&quot;': '”', '&#39;': '’' };

export function decode(s) {
  return String(s || '').replace(/&[a-z#0-9]+;/gi, (m) => (m in ENTITIES ? ENTITIES[m] : m)).replace(/<[^>]+>/g, '');
}

export function seededBills() {
  return bills.map((b) => ({
    id: String(b.id), seed: true, org: b.org, orgLabel: decode(b.orgLabel), ref: b.ref,
    due: decode(b.due), name: decode(b.name), desc: decode(b.desc),
    meter: b.meter, ayes: parseInt(String(b.ayes).replace(/,/g, ''), 10) || 0,
    noes: parseInt(String(b.noes).replace(/,/g, ''), 10) || 0, status: 'live',
  }));
}

export function allBills(userBills) {
  const user = userBills.map((u) => ({
    id: u.id, seed: false, org: 'citizen', orgLabel: "Citizen's bench", ref: u.ref,
    due: 'open for co-signature', name: u.title, desc: u.desc, meter: 50,
    ayes: 0, noes: 0, status: 'draft', at: u.at, category: u.category, body: u.body, alias: u.alias,
  }));
  return [...seededBills(), ...user];
}

export function findBill(id, userBills) {
  return allBills(userBills).find((b) => b.id === String(id)) || null;
}

export function tally(bill, votes, billId) {
  const mine = votes.find((v) => v.billId === String(billId));
  let ayes = bill.ayes;
  let noes = bill.noes;
  if (mine) {
    if (mine.side === 'aye') ayes += 1;
    else noes += 1;
  }
  const total = ayes + noes || 1;
  return { mine: mine ? mine.side : null, ayes, noes, pct: Math.round((ayes / total) * 100) };
}

export function clausesFor(bill) {
  if (bill.seed) return (billDocs[bill.id] && billDocs[bill.id].clauses) || [];
  return deriveClauses(bill.body);
}

export function deriveClauses(body) {
  const paras = String(body || '').split(/\n{2,}/).filter((p) => p.trim());
  let auto = 0;
  return paras.map((p) => {
    const lines = p.trim().split('\n');
    const head = lines[0].trim();
    const isHeading = head.length <= 60 && !/[.!?]$/.test(head);
    auto += 1;
    return {
      n: 'Clause ' + auto,
      h: isHeading ? head.replace(/[:—-]$/, '') : null,
      p: isHeading ? lines.slice(1).join(' ').trim().split('\n').filter(Boolean) || [] : lines.map((l) => l.trim()).filter(Boolean),
    };
  });
}

export function amendmentsFor(billId, userAmendments) {
  const list = [...seedAmendments.filter((a) => a.billId === String(billId))];
  const mine = userAmendments.filter((a) => a.billId === String(billId)).map((a) => ({ ...a, status: 'Awaiting committee', seed: false }));
  return [...list.map((a) => ({ ...a, seed: true })), ...mine].sort((x, y) => new Date(x.at) - new Date(y.at));
}

export function commentsFor(ref, userComments) {
  const seeded = (SEED_COMMENTS[ref] || []).map((c) => ({ ...c, seed: true }));
  const mine = userComments.filter((c) => c.ref === ref);
  return [...seeded, ...mine].sort((x, y) => new Date(x.at) - new Date(y.at));
}

export function allLedger(userEntries) {
  const user = userEntries.map((u) => ({
    id: u.id, seed: false, person: u.person, role: u.role, org: u.org,
    then: { date: u.thenDate, quote: u.thenQuote, srcs: [{ label: u.thenLabel || 'Cited source', url: u.thenUrl }] },
    now: { date: u.nowDate, quote: u.nowQuote, tag: u.tag || 'Contradiction', srcs: [{ label: u.nowLabel || 'Cited source', url: u.nowUrl }] },
    context: u.context, status: 'review', checks: 0, at: u.at,
  }));
  return [...ledgerRecords.map((r) => ({ ...r, seed: true })), ...user];
}

export function findLedger(id, userEntries) {
  return allLedger(userEntries).find((r) => r.id === String(id)) || null;
}
