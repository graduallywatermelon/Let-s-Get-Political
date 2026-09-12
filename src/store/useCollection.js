import { useCallback, useEffect, useState } from 'react';
import { read, write, subscribe, uid } from './local';

export function useCollection(key) {
  const [items, setItems] = useState(() => read(key));
  useEffect(() => {
    const refresh = () => setItems(read(key));
    refresh();
    return subscribe(key, refresh);
  }, [key]);
  const add = useCallback((obj, idPrefix) => {
    const record = { id: uid(idPrefix || key), at: new Date().toISOString(), ...obj };
    write(key, [...read(key), record]);
    return record;
  }, [key]);
  const update = useCallback((id, patch) => {
    write(key, read(key).map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, [key]);
  const remove = useCallback((id) => {
    write(key, read(key).filter((it) => it.id !== id));
  }, [key]);
  return { items, add, update, remove };
}
