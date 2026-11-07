import { useEffect, useRef } from "react";
import { Mic, Search, X } from "lucide-react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition.js";

const EXAMPLES = ["callback", "callback vs promise", "reverse string program", "useEffect", "put vs patch", "tell me about yourself"];

export default function SearchBar({ value, onChange, onVoiceResult }) {
  const inputRef = useRef(null);
  const speech = useSpeechRecognition({ continuous: false, onFinal: text => onVoiceResult(text) });

  // Bolte waqt live text search box mein
  useEffect(() => { if (speech.listening && speech.transcript) onChange(speech.transcript); }, [speech.transcript, speech.listening, onChange]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") { e.preventDefault(); inputRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      <div className={`flex items-center gap-2 rounded-[22px] border bg-surface p-2 pl-4 shadow-card transition ${speech.listening ? "border-accent ring-4 ring-accent/15" : "border-line focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-accent/10"}`}>
        <Search size={20} className="shrink-0 text-muted" />
        <input ref={inputRef} value={value} onChange={e => onChange(e.target.value)}
          placeholder={speech.listening ? "Sun raha hoon… question bolo" : "Question bolo ya type karo…"}
          className="h-11 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted/80 sm:text-lg"
          autoComplete="off" spellCheck="false" enterKeyHint="search" aria-label="Search questions" />
        {value && !speech.listening && (
          <button onClick={() => { onChange(""); inputRef.current?.focus(); }} className="rounded-full p-2 text-muted hover:bg-surface-2" aria-label="Clear">
            <X size={18} />
          </button>
        )}
        <button onClick={speech.listening ? speech.stop : speech.start}
          className={`relative isolate flex size-12 shrink-0 items-center justify-center rounded-2xl text-accent-ink transition ${speech.listening ? "pulse-ring bg-accent" : "bg-accent hover:brightness-110"}`}
          aria-label={speech.listening ? "Stop listening" : "Speak your question"} title="Bolo (voice search)">
          <Mic size={22} />
        </button>
      </div>
      {speech.error && <p className="mt-2 px-2 text-sm text-red-500">{speech.error}</p>}
      {!value && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-0.5 pb-1">
          <span className="shrink-0 py-1.5 text-xs font-medium text-muted">Try:</span>
          {EXAMPLES.map(ex => (
            <button key={ex} onClick={() => onChange(ex)} className="shrink-0 rounded-full border border-dashed border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent hover:text-accent">
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
