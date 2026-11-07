import { useMemo, useState } from "react";
import { Eye, EyeOff, RotateCcw, Shuffle, ThumbsUp } from "lucide-react";
import { CATEGORIES, QUESTIONS, inCategory } from "../data/index.js";
import VoiceRecorder from "./VoiceRecorder.jsx";
import AnswerView from "./AnswerView.jsx";
import { TypePill } from "./ui.jsx";

const pick = (list, exclude) => {
  const pool = list.length > 1 ? list.filter(q => q.id !== exclude) : list;
  return pool[Math.floor(Math.random() * pool.length)];
};

/** Mock interview: question dekho → khud bolo (record) → phir model answer se match karo */
export default function Practice({ progress, startWith }) {
  const [cat, setCat] = useState("all");
  const [onlyPending, setOnlyPending] = useState(true);
  const pool = useMemo(() => {
    const list = QUESTIONS.filter(q => inCategory(q, cat));
    const pending = list.filter(q => !progress.done[q.id]);
    return onlyPending && pending.length ? pending : list;
  }, [cat, onlyPending, progress.done]);
  const [current, setCurrent] = useState(() => startWith || pick(pool));
  const [reveal, setReveal] = useState(false);

  const next = () => { setCurrent(pick(pool, current?.id)); setReveal(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const changeCat = c => { setCat(c); const list = QUESTIONS.filter(q => inCategory(q, c)); setCurrent(pick(list)); setReveal(false); };

  if (!current) return null;
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Practice mode</h2>
        <p className="mt-1 text-muted">Pehle khud bolo, record karo, sunlo. Phir answer kholke match karo.</p>
      </div>

      <div className="no-scrollbar -mx-4 mb-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => changeCat(c.id)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${cat === c.id ? "bg-ink text-bg" : "bg-surface text-muted ring-1 ring-line hover:text-ink"}`}>
            {c.label}
          </button>
        ))}
      </div>
      <label className="mb-5 inline-flex cursor-pointer items-center gap-2 text-sm text-muted">
        <input type="checkbox" checked={onlyPending} onChange={e => setOnlyPending(e.target.checked)} className="size-4 accent-[var(--accent)]" />
        Sirf jo abhi "done" nahi hain
      </label>

      <div className="rise rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7" key={current.id}>
        <div className="mb-3 flex items-center gap-2">
          <TypePill type={current.type} />
          <span className="text-xs text-muted">{pool.length} questions in this set</span>
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Interviewer asks</p>
        <h3 className="mt-1 text-balance text-2xl font-bold leading-snug sm:text-[1.75rem]">{current.q}</h3>
        <div className="mt-6"><VoiceRecorder qid={current.id} compact /></div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={() => setReveal(r => !r)} className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-bg hover:opacity-90">
            {reveal ? <EyeOff size={18} /> : <Eye size={18} />}{reveal ? "Hide answer" : "Show answer"}
          </button>
          <button onClick={() => { progress.setDone(current.id); next(); }} className="inline-flex items-center gap-2 rounded-xl bg-ok/15 px-4 py-2.5 text-sm font-semibold text-ok hover:bg-ok/20">
            <ThumbsUp size={18} /> Aa gaya, next
          </button>
          <button onClick={next} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-semibold hover:border-muted/50">
            {reveal ? <RotateCcw size={18} /> : <Shuffle size={18} />} Next
          </button>
        </div>
      </div>

      {reveal && <div className="mt-8"><AnswerView key={current.id} item={current} progress={progress} compact /></div>}
    </div>
  );
}
