const PREFIX = 'lsgp.v1.';
const EVT = 'lsgp:change';

export function uid(prefix) {
  return prefix + '-' + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
}

export function read(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function write(key, list) {
  localStorage.setItem(PREFIX + key, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(EVT, { detail: { key } }));
}

export function subscribe(key, fn) {
  const onEvent = (e) => {
    if (!e.detail || e.detail.key === key) fn();
  };
  const onStorage = (e) => {
    if (!e.key || e.key === PREFIX + key) fn();
  };
  window.addEventListener(EVT, onEvent);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(EVT, onEvent);
    window.removeEventListener('storage', onStorage);
  };
}

export function relTime(iso) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const s = Math.max(1, Math.round((Date.now() - then) / 1000));
  if (s < 60) return s + 's ago';
  const m = Math.round(s / 60);
  if (m < 60) return m + 'm ago';
  const h = Math.round(m / 60);
  if (h < 24) return h + 'h ago';
  const d = Math.round(h / 24);
  if (d < 14) return d + 'd ago';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function fmtCount(n) {
  return Number(n || 0).toLocaleString('en-GB');
}
