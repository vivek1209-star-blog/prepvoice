// Chhote reusable UI pieces
import { TYPE_META } from "../lib/meta.js";

export function TypePill({ type }) {
  const m = TYPE_META[type] || TYPE_META.concept;
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${m.cls}`}>{m.label}</span>;
}

// `code` ko inline code banake dikhana
export function RichText({ text }) {
  const parts = String(text).split(/(`[^`]+`|\[[A-Z][a-z][^\]]*\])/g);
  return parts.map((p, i) => {
    if (p.startsWith("`") && p.endsWith("`")) return <code key={i} className="inline-code">{p.slice(1, -1)}</code>;
    if (/^\[[A-Z][a-z]/.test(p) && p.endsWith("]")) return <mark key={i} className="rounded bg-accent-soft px-1 text-accent">{p}</mark>;
    return <span key={i}>{p}</span>;
  });
}

export function Card({ className = "", children }) {
  return <div className={`rounded-2xl border border-line bg-surface ${className}`}>{children}</div>;
}

export function SectionLabel({ icon: Icon, children, className = "" }) {
  return (
    <div className={`mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted ${className}`}>
      {Icon && <Icon size={14} />}{children}
    </div>
  );
}

export function IconButton({ onClick, active, title, children, className = "" }) {
  return (
    <button onClick={onClick} title={title} aria-label={title}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition
        ${active ? "border-accent bg-accent-soft text-accent" : "border-line bg-surface text-ink hover:border-muted/50"} ${className}`}>
      {children}
    </button>
  );
}
