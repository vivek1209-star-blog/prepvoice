import { useCallback, useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Bookmark, Mic2, Search, Target } from "lucide-react";
import { CATEGORIES, QUESTIONS, inCategory } from "./data/index.js";
import { createSearch } from "./lib/search.js";
import { useProgress } from "./lib/store.js";
import SearchBar from "./components/SearchBar.jsx";
import QuestionList from "./components/QuestionList.jsx";
import AnswerView from "./components/AnswerView.jsx";
import Practice from "./components/Practice.jsx";
import ReadingSettings from "./components/ReadingSettings.jsx";

const search = createSearch(QUESTIONS);
const BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
const DESKTOP = "(min-width: 1024px)";
const EXAMPLES = ["tell me about yourself", "angular interceptor", "switchMap vs mergeMap", "nth highest salary", "observable vs promise", "buy gold flow", "reverse string without loop"];
const NAV = [
  { id: "search", label: "Search", icon: Search },
  { id: "practice", label: "Practice", icon: Target },
  { id: "saved", label: "Saved", icon: Bookmark },
];

function useMedia(query) {
  const [is, setIs] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setIs(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return is;
}

/** Theme / font / size ko <html> pe lagao */
function useApplyPrefs(prefs) {
  const systemDark = useMedia("(prefers-color-scheme: dark)");
  const theme = prefs.theme === "auto" ? (systemDark ? "dark" : "light") : prefs.theme;
  useEffect(() => {
    const el = document.documentElement;
    el.dataset.theme = theme;
    el.dataset.font = prefs.font;
    el.dataset.size = prefs.size;
    const bg = getComputedStyle(el).getPropertyValue("--bg").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bg || "#f6f4ef");
  }, [theme, prefs.font, prefs.size]);
}

export default function App() {
  const progress = useProgress();
  useApplyPrefs(progress.prefs);
  const isDesktop = useMedia(DESKTOP);

  const [view, setView] = useState("search");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const deferredQuery = useDeferredValue(query);
  const headerRef = useRef(null);
  const answerScrollRef = useRef(null);

  // Header ki height CSS variable mein (sticky answer panel ke liye)
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty("--hdr", el.offsetHeight + "px");
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const results = useMemo(() => {
    const base = deferredQuery.trim() ? search(deferredQuery) : QUESTIONS;
    if (view === "saved") return base.filter(q => progress.saved[q.id]);
    return base.filter(q => inCategory(q, cat));
  }, [deferredQuery, cat, view, progress.saved]);

  const searching = !!deferredQuery.trim();
  const selected = selectedId ? BY_ID[selectedId] : null;
  const current = selected || (isDesktop ? results[0] : null);
  const sheetOpen = !isDesktop && !!selected && view !== "practice";

  // ---------- navigation ----------
  const scrollAnswerTop = () => {
    if (window.matchMedia(DESKTOP).matches) answerScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0 });
  };
  const selectedRef = useRef(null);
  useEffect(() => { selectedRef.current = selectedId; }, [selectedId]);
  const open = useCallback(id => {
    const mobile = !window.matchMedia(DESKTOP).matches;
    if (mobile && !selectedRef.current && !window.history.state?.sheet) window.history.pushState({ sheet: 1 }, "");
    selectedRef.current = id;
    setSelectedId(id);
    if (mobile) window.scrollTo({ top: 0 });
  }, []);
  useEffect(() => {
    const onPop = () => setSelectedId(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const closeSheet = useCallback(() => window.history.back(), []);

  const idx = current ? results.findIndex(r => r.id === current.id) : -1;
  const goTo = useCallback(step => {
    const next = results[idx + step];
    if (!next) return;
    setSelectedId(next.id);
    scrollAnswerTop();
  }, [results, idx]);

  useEffect(() => {
    const onKey = e => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName) || view === "practice") return;
      if (e.key === "ArrowRight" || e.key === "j") goTo(1);
      if (e.key === "ArrowLeft" || e.key === "k") goTo(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, view]);

  // ---------- search ----------
  const onQuery = useCallback(q => {
    setQuery(q);
    if (window.matchMedia(DESKTOP).matches) setSelectedId(null);
    else if (window.history.state?.sheet) window.history.back(); // phone: type karte hi list pe
  }, []);
  const onVoiceResult = useCallback(text => {
    setQuery(text);
    const top = search(text)[0];
    if (top) { open(top.id); }
    setView(v => (v === "practice" ? "search" : v));
  }, [open]);
  const onCat = c => { setCat(c); setSelectedId(null); window.scrollTo({ top: 0 }); };
  const goView = v => {
    if (window.history.state?.sheet) window.history.back();
    setView(v); setSelectedId(null); window.scrollTo({ top: 0 });
  };

  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map(c => [c.id, QUESTIONS.filter(q => inCategory(q, c.id)).length])), []);
  const doneCount = Object.keys(progress.done).length;
  const savedCount = Object.keys(progress.saved).length;
  const pct = Math.round((doneCount / QUESTIONS.length) * 100);

  const nav = current && idx >= 0 ? { pos: idx + 1, total: results.length, onPrev: idx > 0 ? () => goTo(-1) : null, onNext: idx < results.length - 1 ? () => goTo(1) : null } : null;
  const showSearch = view !== "practice";

  const chips = (inHeader) => (
    <div className={`no-scrollbar flex gap-2 overflow-x-auto ${inHeader ? "[mask-image:linear-gradient(90deg,#000_92%,transparent)] pr-8" : "-mx-4 px-4 sm:-mx-6 sm:px-6"}`}>
      {CATEGORIES.map(c => (
        <button key={c.id} onClick={() => onCat(c.id)}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${cat === c.id ? "bg-ink text-bg" : "bg-surface text-muted ring-1 ring-line hover:text-ink"}`}>
          {c.label}<span className="ml-1 opacity-60">{counts[c.id]}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-dvh">
      {/* ===== Sticky top: logo + nav + search (kabhi scroll nahi hota) ===== */}
      <header ref={headerRef} className="sticky top-0 z-30 border-b border-line/70 bg-bg/90 backdrop-blur-xl">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center gap-3 md:h-16">
            <button onClick={() => goView("search")} className="flex items-center gap-2.5" aria-label="Home">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-ink"><Mic2 size={19} /></span>
              <span className="font-display text-xl font-bold tracking-tight">Prep<span className="text-accent">Voice</span></span>
            </button>
            <nav className="mx-auto hidden items-center gap-1 rounded-2xl border border-line bg-surface p-1 md:flex">
              {NAV.map(n => (
                <button key={n.id} onClick={() => goView(n.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${view === n.id ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}>
                  <n.icon size={16} />{n.label}
                  {n.id === "saved" && savedCount > 0 && <span className="rounded-full bg-accent px-1.5 text-[10px] text-accent-ink">{savedCount}</span>}
                </button>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-2 md:ml-0">
              <div className="hidden items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 sm:flex" title={`${doneCount} of ${QUESTIONS.length} done`}>
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-2 lg:w-24"><div className="h-full rounded-full bg-accent transition-all" style={{ width: pct + "%" }} /></div>
                <span className="font-mono text-xs font-semibold tabular-nums">{doneCount}/{QUESTIONS.length}</span>
              </div>
              <ReadingSettings prefs={progress.prefs} setPref={progress.setPref} />
            </div>
          </div>

          {showSearch && (
            <div className="grid gap-x-10 pb-3 lg:grid-cols-[minmax(360px,440px)_1fr] lg:items-center 2xl:grid-cols-[500px_1fr]">
              <SearchBar value={query} onChange={onQuery} onVoiceResult={onVoiceResult} onBack={sheetOpen ? closeSheet : null} />
              {view === "search" && <div className="hidden min-w-0 lg:block">{chips(true)}</div>}
            </div>
          )}
        </div>
      </header>

      <main className={`mx-auto max-w-[1680px] px-4 pb-28 pt-4 sm:px-6 md:pb-12 lg:px-8 ${view !== "practice" && !sheetOpen ? "lg:h-[calc(100dvh-var(--hdr,140px))] lg:overflow-hidden lg:py-0" : "lg:pt-6"}`}>
        {view === "practice" ? (
          <Practice progress={progress} />
        ) : sheetOpen ? (
          /* ===== Phone / tablet: answer page ===== */
          <div className="sheet-in">
            <AnswerView key={selected.id} item={selected} progress={progress} compact query={query} nav={nav} />
          </div>
        ) : (
          <div className="grid gap-6 lg:h-full lg:grid-cols-[minmax(360px,440px)_1fr] lg:gap-10 2xl:grid-cols-[500px_1fr]">
            {/* ===== List (desktop pe apna scroll) ===== */}
            <section className="scroll-thin min-w-0 lg:h-full lg:overflow-y-auto lg:pr-2 lg:pt-5 lg:pb-10">
              {view === "search" && !searching && (
                <div className="mb-4">
                  <h1 className="font-display text-balance text-[1.7rem] font-bold leading-[1.1] tracking-tight sm:text-4xl">
                    Bolo question, <span className="text-accent">pao seedha answer.</span>
                  </h1>
                  <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
                    <span className="shrink-0 py-1.5 text-xs font-semibold text-muted">Try:</span>
                    {EXAMPLES.map(ex => (
                      <button key={ex} onClick={() => onQuery(ex)} className="shrink-0 rounded-full border border-dashed border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent hover:text-accent">
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {view === "saved" && (
                <div className="mb-4">
                  <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Saved questions</h1>
                  <p className="mt-1 text-muted">Interview se pehle last revision ke liye.</p>
                </div>
              )}
              {view === "search" && <div className="mb-3 lg:hidden">{chips(false)}</div>}
              <div className="mb-2 flex items-center justify-between px-1 text-xs font-medium text-muted">
                <span>{searching ? `${results.length} results` : `${results.length} questions`}</span>
                {searching ? <span>Top match pehle</span> : <span className="hidden lg:inline">← → se next / previous</span>}
              </div>
              <QuestionList items={results} activeId={current?.id} progress={progress} onSelect={open} showBest={searching} />
            </section>

            {/* ===== Desktop: answer panel (sticky, apna scroll) ===== */}
            <section ref={answerScrollRef} className="scroll-thin hidden min-w-0 lg:block lg:h-full lg:overflow-y-auto lg:pr-3 lg:pt-5">
              {current ? <AnswerView key={current.id} item={current} progress={progress} query={deferredQuery} nav={nav} /> : <EmptyDetail />}
            </section>
          </div>
        )}
      </main>

      {/* ===== Phone: bottom nav ===== */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3">
          {NAV.map(n => (
            <button key={n.id} onClick={() => goView(n.id)} className={`relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${view === n.id ? "text-accent" : "text-muted"}`}>
              <n.icon size={21} />{n.label}
              {n.id === "saved" && savedCount > 0 && <span className="absolute right-[30%] top-1.5 rounded-full bg-accent px-1.5 text-[9px] text-accent-ink">{savedCount}</span>}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

function EmptyDetail() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-line text-center text-muted">
      <Mic2 size={36} className="mb-3 text-accent" />
      <p className="font-semibold text-ink">Mic dabao aur question bolo</p>
      <p className="mt-1 max-w-xs text-sm">Jaise "callback" ya "difference between callback and promise".</p>
    </div>
  );
}
