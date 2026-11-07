import { useEffect, useState } from "react";
import { ArrowLeft, Bookmark, BookmarkCheck, CheckCircle2, Circle, Code2, Copy, Check, Languages, MessageSquareQuote, Mic, Volume2, Square, Lightbulb, Timer, MessagesSquare } from "lucide-react";
import { pickWay } from "../lib/pickWay.js";
import CodeBlock from "./CodeBlock.jsx";
import VoiceRecorder from "./VoiceRecorder.jsx";
import { Card, RichText, SectionLabel, TypePill } from "./ui.jsx";
import { CAT_LABEL } from "../lib/meta.js";

function useSpeak() {
  const [speaking, setSpeaking] = useState(null);
  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  const speak = (text, id = "main") => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (speaking === id) { synth.cancel(); setSpeaking(null); return; }
    const u = new SpeechSynthesisUtterance(text.replace(/[[\]`]/g, ""));
    const voices = synth.getVoices();
    u.voice = voices.find(v => v.lang === "en-IN") || voices.find(v => v.lang?.startsWith("en")) || null;
    u.lang = u.voice?.lang || "en-IN";
    u.rate = 0.95;
    u.onend = u.onerror = () => setSpeaking(s => (s === id ? null : s));
    synth.cancel();
    synth.speak(u);
    setSpeaking(id);
  };
  return { speaking, speak };
}

export default function AnswerView({ item, progress, onBack, compact = false, query = "" }) {
  const { speaking, speak } = useSpeak();
  const [copied, setCopied] = useState(false);
  const [showRec, setShowRec] = useState(false);

  const done = !!progress.done[item.id];
  const saved = !!progress.saved[item.id];

  const copyAnswer = async () => {
    try { await navigator.clipboard.writeText(item.a); setCopied(true); setTimeout(() => setCopied(false), 1300); } catch { /* ignore */ }
  };

  const tabs = item.ways
    ? item.ways.map(([label, code]) => ({ label, code }))
    : item.code ? [{ label: "Example", code: item.code }, ...(item.alt ? [{ label: "Other way", code: item.alt }] : [])] : null;
  const startTab = pickWay(item.ways, query);

  return (
    <article key={item.id} className="rise mx-auto w-full max-w-3xl">
      {onBack && (
        <button onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-medium text-muted hover:text-ink">
          <ArrowLeft size={18} /> Back
        </button>
      )}

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <TypePill type={item.type} />
        {CAT_LABEL[item.cat] && <span className="text-xs font-medium text-muted">{CAT_LABEL[item.cat]}</span>}
        {done && <span className="inline-flex items-center gap-1 text-xs font-semibold text-ok"><CheckCircle2 size={14} /> Done</span>}
      </div>
      <h1 className="text-balance text-[1.6rem] font-bold leading-tight tracking-tight sm:text-3xl">{item.q}</h1>

      {/* Bolne wala answer */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-say/30 bg-say-soft/60">
        <div className="flex items-center gap-2 border-b border-say/20 px-4 py-2.5 sm:px-5">
          <MessageSquareQuote size={16} className="text-say" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-say">{item.type === "program" ? "Approach — ye bolo" : "Interviewer ko ye bolo"}</span>
          <div className="ml-auto flex gap-1">
            <button onClick={() => speak(item.a)} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-say hover:bg-say/10" title="Pronunciation suno">
              {speaking === "main" ? <Square size={13} fill="currentColor" /> : <Volume2 size={15} />}{speaking === "main" ? "Stop" : "Listen"}
            </button>
            <button onClick={copyAnswer} className="rounded-lg p-1.5 text-say hover:bg-say/10" title="Copy">{copied ? <Check size={15} /> : <Copy size={15} />}</button>
          </div>
        </div>
        <p className="px-4 py-4 text-[1.08rem] leading-[1.7] text-ink sm:px-5 sm:text-[1.15rem]"><RichText text={item.a} /></p>
      </div>

      <Card className="mt-3 px-4 py-3.5 sm:px-5">
        <SectionLabel icon={Languages} className="mb-1">Hinglish mein samjho</SectionLabel>
        <p className="leading-relaxed text-ink/85"><RichText text={item.hi} /></p>
      </Card>

      {item.table && (
        <div className="scroll-thin mt-3 overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full min-w-[420px] text-sm">
            <thead><tr>{item.table[0].map((h, i) => <th key={i} className="bg-surface-2 px-4 py-2.5 text-left font-semibold">{h}</th>)}</tr></thead>
            <tbody>
              {item.table.slice(1).map((row, r) => (
                <tr key={r} className="border-t border-line">
                  {row.map((c, i) => <td key={i} className={`px-4 py-2.5 ${i === 0 ? "font-medium text-muted" : ""}`}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tabs && (
        <section className="mt-6">
          <SectionLabel icon={Code2}>{item.type === "program" ? (tabs.length > 1 ? `Program · ${tabs.length} ways (tabs badlo)` : "Program") : "Code example"}</SectionLabel>
          <CodeBlock key={item.id + startTab} tabs={tabs} initialTab={startTab} runnable={!item.norun} sloppy={item.sloppy} expected={item.out ?? null} lang={item.lang} />
        </section>
      )}

      {(item.ex || item.cx) && (
        <Card className="mt-3 px-4 py-3.5 sm:px-5">
          {item.ex && (
            <>
              <div className="flex items-center">
                <SectionLabel icon={Lightbulb} className="mb-1">Code explain</SectionLabel>
                <SpeakBtn id="ex" text={item.ex} speaking={speaking} speak={speak} />
              </div>
              <p className="leading-relaxed"><RichText text={item.ex} /></p>
            </>
          )}
          {item.cx && (
            <p className={`flex items-center gap-1.5 text-sm text-muted ${item.ex ? "mt-2" : ""}`}>
              <Timer size={15} /> Time: <code className="inline-code text-ink">{item.cx}</code>
              {item.sc && <>· Space: <code className="inline-code text-ink">{item.sc}</code></>}
            </p>
          )}
        </Card>
      )}

      {item.cross?.length > 0 && (
        <section className="mt-6">
          <SectionLabel icon={MessagesSquare}>Interviewer cross-questions · {item.cross.length}</SectionLabel>
          <div className="space-y-2">
            {item.cross.map(([q, a], i) => (
              <details key={i} className="group rounded-2xl border border-line bg-surface px-4 py-3 open:border-violet/40 sm:px-5" open={i < 2}>
                <summary className="flex cursor-pointer list-none items-start gap-2 font-semibold leading-snug">
                  <span className="mt-0.5 shrink-0 rounded-md bg-violet-soft px-1.5 text-xs font-bold text-violet">Q</span>
                  <span className="flex-1">{q}</span>
                  <span className="text-muted transition group-open:rotate-90">›</span>
                </summary>
                <div className="mt-2 flex items-start gap-2 pl-0.5">
                  <span className="mt-0.5 shrink-0 rounded-md bg-say-soft px-1.5 text-xs font-bold text-say">A</span>
                  <p className="flex-1 leading-relaxed text-ink/90"><RichText text={a} /></p>
                  <SpeakBtn id={"c" + i} text={a} speaking={speaking} speak={speak} />
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => progress.toggle("done", item.id)}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${done ? "bg-ok/15 text-ok" : "bg-ink text-bg hover:opacity-90"}`}>
          {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}{done ? "Done" : "Mark as done"}
        </button>
        <button onClick={() => progress.toggle("saved", item.id)}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${saved ? "border-accent bg-accent-soft text-accent" : "border-line bg-surface hover:border-muted/50"}`}>
          {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}{saved ? "Saved" : "Save"}
        </button>
        <button onClick={() => setShowRec(v => !v)}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${showRec ? "border-accent bg-accent-soft text-accent" : "border-line bg-surface hover:border-muted/50"}`}>
          <Mic size={18} /> Practice speaking
        </button>
      </div>

      {showRec && <div className="mt-4"><VoiceRecorder qid={item.id} compact={compact} /></div>}
      <div className="h-24 lg:h-10" />
    </article>
  );
}

function SpeakBtn({ id, text, speaking, speak }) {
  const on = speaking === id;
  return (
    <button onClick={() => speak(text, id)} className="ml-auto shrink-0 rounded-lg p-1.5 text-muted hover:bg-surface-2 hover:text-ink" title={on ? "Stop" : "Listen"} aria-label="Listen">
      {on ? <Square size={14} fill="currentColor" /> : <Volume2 size={16} />}
    </button>
  );
}
