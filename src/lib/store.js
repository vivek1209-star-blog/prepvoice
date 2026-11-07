import { useCallback, useEffect, useState } from "react";
import { get, set } from "idb-keyval";

const KEY = "prepvoice:v1";
const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
};

/** done / saved / theme — localStorage mein (same browser pe yaad rehta hai) */
export function useProgress() {
  const [state, setState] = useState(() => ({ done: {}, saved: {}, ...read() }));
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode */ }
  }, [state]);

  const toggle = useCallback((field, id) => setState(s => {
    const next = { ...s[field] };
    if (next[id]) delete next[id]; else next[id] = Date.now();
    return { ...s, [field]: next };
  }), []);
  const setDone = useCallback(id => setState(s => ({ ...s, done: { ...s.done, [id]: Date.now() } })), []);
  const setPref = useCallback((key, value) => setState(s => ({ ...s, prefs: { ...s.prefs, [key]: value } })), []);
  const prefs = { theme: state.theme || "auto", font: "lexend", size: "m", hinglish: true, ...state.prefs };

  return { ...state, prefs, toggle, setDone, setPref };
}

/** Recordings — IndexedDB mein (audio blobs) */
export async function loadRecordings(qid) {
  try { return (await get("rec:" + qid)) || []; } catch { return []; }
}
export async function saveRecording(qid, rec) {
  const list = await loadRecordings(qid);
  const next = [{ id: Date.now(), ...rec }, ...list].slice(0, 10);
  try { await set("rec:" + qid, next); } catch { /* storage full */ }
  return next;
}
export async function deleteRecording(qid, recId) {
  const next = (await loadRecordings(qid)).filter(r => r.id !== recId);
  try { await set("rec:" + qid, next); } catch { /* ignore */ }
  return next;
}
