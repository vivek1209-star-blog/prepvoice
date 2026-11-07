import { memo } from "react";
import { BookmarkCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { TypePill } from "./ui.jsx";

const Row = memo(function Row({ item, active, done, saved, best, onSelect }) {
  return (
    <li>
      <button onClick={() => onSelect(item.id)}
        className={`group flex w-full items-start gap-3 rounded-2xl border px-3.5 py-3 text-left transition sm:px-4
          ${active ? "border-accent/60 bg-accent-soft/60" : "border-transparent hover:border-line hover:bg-surface"}`}>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <TypePill type={item.type} />
            {best && <span className="text-[11px] font-bold uppercase tracking-wider text-accent">Best match</span>}
            {done && <CheckCircle2 size={14} className="text-ok" />}
            {saved && <BookmarkCheck size={14} className="text-accent" />}
          </div>
          <div className={`font-semibold leading-snug ${active ? "text-ink" : "text-ink/90"}`}>{item.q}</div>
          <div className="mt-0.5 line-clamp-1 text-sm text-muted">{item.a}</div>
        </div>
        <ChevronRight size={18} className={`mt-6 shrink-0 transition ${active ? "text-accent" : "text-muted/50 group-hover:translate-x-0.5"}`} />
      </button>
    </li>
  );
});

export default function QuestionList({ items, activeId, progress, onSelect, showBest }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-line px-6 py-14 text-center text-muted">
        <p className="font-medium text-ink">Kuch nahi mila</p>
        <p className="mt-1 text-sm">Dusre words try karo, jaise "closure", "jwt", "reverse string".</p>
      </div>
    );
  }
  return (
    <ul className="space-y-1">
      {items.map((it, i) => (
        <Row key={it.id} item={it} active={it.id === activeId} best={showBest && i === 0}
          done={!!progress.done[it.id]} saved={!!progress.saved[it.id]} onSelect={onSelect} />
      ))}
    </ul>
  );
}
