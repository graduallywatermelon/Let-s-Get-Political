import { useCollection } from './useCollection';

export function useReports(kind, refId) {
  const { items } = useCollection('reports');
  const mine = items.filter((r) => r.kind === kind && r.refId === String(refId));
  return { count: mine.length, flagged: mine.length >= 2 };
}
