import { useEffect, useRef, useState } from "react";
import { Check, Languages, Type } from "lucide-react";

const THEMES = [
  { id: "auto", label: "Auto", bg: "linear-gradient(135deg,#f6f4ef 50%,#0d0c0b 50%)", ink: "#e4570b" },
  { id: "light", label: "Light", bg: "#f6f4ef", ink: "#1b1915" },
  { id: "paper", label: "Paper", bg: "#f2e8d5", ink: "#3a2e20" },
  { id: "dim", label: "Dim", bg: "#16202b", ink: "#e4ebf2" },
  { id: "dark", label: "Dark", bg: "#0d0c0b", ink: "#f0ece5" },
];
const FONTS = [
  { id: "lexend", label: "Lexend", note: "Easy reading", family: '"Lexend Variable"' },
  { id: "atkinson", label: "Atkinson", note: "Super clear letters", family: '"Atkinson Hyperlegible Next Variable"' },
  { id: "literata", label: "Literata", note: "Book style", family: '"Literata Variable"' },
  { id: "inter", label: "Inter", note: "Compact", family: '"Inter Variable"' },
];
const SIZES = [["s", "S"], ["m", "M"], ["l", "L"], ["xl", "XL"]];

/** "Aa" button → theme, font, size, Hinglish on/off */
export default function ReadingSettings({ prefs, setPref }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = e => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = e => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Reading settings" title="Theme, font, size"
        className={`flex h-10 items-center gap-1.5 rounded-xl border px-3 text-sm font-semibold transition ${open ? "border-accent bg-accent-soft text-accent" : "border-line bg-surface hover:border-muted/60"}`}>
        <Type size={17} /><span className="hidden sm:inline">Aa</span>
      </button>

      {open && (
        <div className="rise absolute right-0 top-12 z-50 w-[min(92vw,340px)] rounded-2xl border border-line bg-surface p-4 shadow-card">
          <Label>Theme</Label>
          <div className="grid grid-cols-5 gap-2">
            {THEMES.map(t => (
              <button key={t.id} onClick={() => setPref("theme", t.id)} className="group flex flex-col items-center gap-1.5" aria-label={t.label + " theme"}>
                <span className={`flex size-11 items-center justify-center rounded-xl border-2 text-sm font-bold transition ${prefs.theme === t.id ? "border-accent" : "border-line group-hover:border-muted"}`}
                  style={{ background: t.bg, color: t.ink }}>
                  {prefs.theme === t.id ? <Check size={16} /> : "Aa"}
                </span>
                <span className={`text-[11px] font-medium ${prefs.theme === t.id ? "text-accent" : "text-muted"}`}>{t.label}</span>
              </button>
            ))}
          </div>

          <Label className="mt-4">Font</Label>
          <div className="grid grid-cols-2 gap-2">
            {FONTS.map(f => (
              <button key={f.id} onClick={() => setPref("font", f.id)}
                className={`rounded-xl border px-3 py-2 text-left transition ${prefs.font === f.id ? "border-accent bg-accent-soft" : "border-line hover:border-muted/60"}`}>
                <span className="block text-base font-semibold" style={{ fontFamily: f.family }}>{f.label}</span>
                <span className="block text-[11px] text-muted">{f.note}</span>
              </button>
            ))}
          </div>

          <Label className="mt-4">Text size</Label>
          <div className="grid grid-cols-4 gap-1 rounded-xl bg-surface-2 p-1">
            {SIZES.map(([id, label], i) => (
              <button key={id} onClick={() => setPref("size", id)}
                className={`rounded-lg py-1.5 font-semibold transition ${prefs.size === id ? "bg-surface text-ink shadow-card" : "text-muted"}`}
                style={{ fontSize: 12 + i * 2 }}>
                {label}
              </button>
            ))}
          </div>

          <button onClick={() => setPref("hinglish", !prefs.hinglish)}
            className="mt-4 flex w-full items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-left">
            <Languages size={18} className="text-muted" />
            <span className="flex-1 text-sm font-medium">Hinglish meaning dikhao</span>
            <span className={`relative h-6 w-10 rounded-full transition ${prefs.hinglish ? "bg-accent" : "bg-line"}`}>
              <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${prefs.hinglish ? "left-[18px]" : "left-0.5"}`} />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

function Label({ children, className = "" }) {
  return <div className={`mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted ${className}`}>{children}</div>;
}
