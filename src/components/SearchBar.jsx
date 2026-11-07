import { useEffect, useRef } from "react";
import { ArrowLeft, Mic, Search, X } from "lucide-react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition.js";

/** Hamesha upar fixed search: type karo ya mic dabake bolo */
export default function SearchBar({ value, onChange, onVoiceResult, onBack }) {
  const inputRef = useRef(null);
  const speech = useSpeechRecognition({ continuous: false, onFinal: text => onVoiceResult(text) });

  useEffect(() => { if (speech.listening && speech.transcript) onChange(speech.transcript); }, [speech.transcript, speech.listening, onChange]);

  useEffect(() => {
    const onKey = e => {
      const typing = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
      if (e.key === "/" && !typing) { e.preventDefault(); inputRef.current?.focus(); inputRef.current?.select(); }
      if ((e.key === "m" || e.key === "M") && !typing && !e.metaKey && !e.ctrlKey) { e.preventDefault(); if (speech.listening) speech.stop(); else speech.start(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [speech]);

  return (
    <div>
      <div className={`flex items-center gap-1.5 rounded-2xl border bg-surface p-1.5 pl-2 shadow-card transition sm:pl-3
        ${speech.listening ? "border-accent ring-4 ring-accent/15" : "border-line focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-accent/10"}`}>
        {onBack ? (
          <button onClick={onBack} className="flex size-9 shrink-0 items-center justify-center rounded-xl text-muted hover:bg-surface-2 hover:text-ink" aria-label="Back to list">
            <ArrowLeft size={20} />
          </button>
        ) : (
          <Search size={19} className="mx-1 shrink-0 text-muted" />
        )}
        <input ref={inputRef} value={value} onChange={e => onChange(e.target.value)} type="search"
          placeholder={speech.listening ? "Sun raha hoon… bolo" : "Question bolo ya type karo…"}
          className="h-10 min-w-0 flex-1 bg-transparent text-[1.02rem] outline-none placeholder:text-muted/80 [&::-webkit-search-cancel-button]:hidden"
          autoComplete="off" spellCheck="false" enterKeyHint="search" aria-label="Search questions"
          onKeyDown={e => e.key === "Enter" && e.currentTarget.blur()} />
        {value && !speech.listening && (
          <button onClick={() => { onChange(""); inputRef.current?.focus(); }} className="rounded-full p-1.5 text-muted hover:bg-surface-2" aria-label="Clear search">
            <X size={18} />
          </button>
        )}
        <button onClick={speech.listening ? speech.stop : speech.start}
          className={`relative isolate flex size-10 shrink-0 items-center justify-center rounded-xl text-accent-ink transition ${speech.listening ? "pulse-ring bg-accent" : "bg-accent hover:brightness-110"}`}
          aria-label={speech.listening ? "Stop listening" : "Speak your question"} title="Bolo (M)">
          <Mic size={20} />
        </button>
      </div>
      {speech.error && <p className="mt-1.5 px-2 text-xs text-red-500">{speech.error}</p>}
    </div>
  );
}
