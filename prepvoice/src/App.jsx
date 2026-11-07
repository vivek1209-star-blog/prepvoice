import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { Bookmark, Mic2, Moon, Search, Sun, Target } from "lucide-react";
import { CATEGORIES, QUESTIONS, inCategory } from "./data/index.js";
import { createSearch } from "./lib/search.js";
import { useProgress } from "./lib/store.js";
import SearchBar from "./components/SearchBar.jsx";
import QuestionList from "./components/QuestionList.jsx";
import AnswerView from "./components/AnswerView.jsx";
import Practice from "./components/Practice.jsx";

const search = createSearch(QUESTIONS);
const BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));

function useIsDesktop() {
  const q = "(min-width: 1024px)";
  const [is, setIs] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setIs(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return is;
}

const NAV = [
  { id: "search", label: "Search", icon: Search },
  { id: "practice", label: "Practice", icon: Target },
  { id: "saved", label: "Saved", icon: Bookmark },
];

export default function App() {
  const progress = useProgress();
  const isDesktop = useIsDesktop();
  const [view, setView] = useState("search");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [practiceItem, setPracticeItem] = useState(null);
  const deferredQuery = useDeferredValue(query);

  // Theme
  const theme = progress.theme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0e0d0b" : "#f6f3ed");
  }, [theme]);

  const results = useMemo(() => {
    const base = deferredQuery.trim() ? search(deferredQuery) : QUESTIONS;
    if (view === "saved") return base.filter(q => progress.saved[q.id]);
    return base.filter(q => inCategory(q, cat));
  }, [deferredQuery, cat, view, progress.saved]);

  const searching = !!deferredQuery.trim();
  const selected = selectedId ? BY_ID[selectedId] : null;
  const desktopItem = selected || (isDesktop ? results[0] : null);

  // Mobile: answer sheet kholne pe browser back button se band ho
  const select = useCallback(id => {
    setSelectedId(id);
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      window.history.pushState({ sheet: id }, "");
      window.scrollTo({ top: 0 });
    }
  }, []);
  useEffect(() => {
    const onPop = () => setSelectedId(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const closeSheet = () => window.history.back();

  // Naya search / category → desktop pe pehla result dikhao
  const onQuery = useCallback(q => { setQuery(q); if (window.matchMedia("(min-width: 1024px)").matches) setSelectedId(null); }, []);
  const onCat = c => { setCat(c); setSelectedId(null); };

  const onVoiceResult = useCallback(text => {
    setQuery(text);
    const top = search(text)[0];
    if (top) setSelectedId(top.id);
  }, []);

  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map(c => [c.id, QUESTIONS.filter(q => inCategory(q, c.id)).length])), []);
  const doneCount = Object.keys(progress.done).length;
  const pct = Math.round((doneCount / QUESTIONS.length) * 100);

  const goView = v => { setView(v); setSelectedId(null); if (v !== "practice") setPracticeItem(null); window.scrollTo({ top: 0 }); };
  const mobileSheetOpen = !isDesktop && selected && view !== "practice";

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line/80 bg-bg/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1680px] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button onClick={() => goView("search")} className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-ink"><Mic2 size={19} /></span>
            <span className="text-lg font-bold tracking-tight">Prep<span className="text-accent">Voice</span></span>
          </button>

          <nav className="mx-auto hidden items-center gap-1 rounded-2xl border border-line bg-surface p-1 md:flex">
            {NAV.map(n => (
              <button key={n.id} onClick={() => goView(n.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${view === n.id ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}>
                <n.icon size={16} />{n.label}
                {n.id === "saved" && Object.keys(progress.saved).length > 0 && <span className="rounded-full bg-accent px-1.5 text-[10px] text-accent-ink">{Object.keys(progress.saved).length}</span>}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <div className="hidden items-center gap-2 rounded-xl border border-line bg-surface px-3 py-1.5 sm:flex" title={`${doneCount} of ${QUESTIONS.length} done`}>
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-accent transition-all" style={{ width: pct + "%" }} /></div>
              <span className="font-mono text-xs font-semibold tabular-nums">{doneCount}/{QUESTIONS.length}</span>
            </div>
            <button onClick={() => progress.setTheme(theme === "dark" ? "light" : "dark")}
              className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface transition hover:border-muted/50" aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1680px] px-4 pb-28 pt-5 sm:px-6 md:pb-12 lg:px-8 lg:pt-8">
        {view === "practice" ? (
          <Practice key={practiceItem?.id || "practice"} progress={progress} startWith={practiceItem} />
        ) : (
          <>
            {!mobileSheetOpen && (
              <div className="grid gap-6 lg:grid-cols-[minmax(360px,440px)_1fr] lg:gap-10 2xl:grid-cols-[500px_1fr]">
                {/* Left: search + list */}
                <section className="min-w-0">
                  {view === "search" && !searching && (
                    <div className="mb-5">
                      <h1 className="text-balance text-[1.75rem] font-bold leading-[1.15] tracking-tight sm:text-4xl">
                        Bolo question, <span className="text-accent">pao seedha answer.</span>
                      </h1>
                      <p className="mt-2 text-muted">{QUESTIONS.length} MERN interview questions · short English answers · programs with output.</p>
                    </div>
                  )}
                  {view === "saved" && (
                    <div className="mb-5">
                      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Saved questions</h1>
                      <p className="mt-1 text-muted">Interview se pehle last revision ke liye.</p>
                    </div>
                  )}
                  <div className="lg:sticky lg:top-20 lg:z-10 lg:bg-bg lg:pb-3">
                    <SearchBar value={query} onChange={onQuery} onVoiceResult={onVoiceResult} />
                    {view === "search" && (
                      <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:flex-wrap">
                        {CATEGORIES.map(c => (
                          <button key={c.id} onClick={() => onCat(c.id)}
                            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${cat === c.id ? "bg-ink text-bg" : "bg-surface text-muted ring-1 ring-line hover:text-ink"}`}>
                            {c.label} <span className="ml-0.5 opacity-60">{counts[c.id]}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 mb-2 flex items-center justify-between px-1 text-xs font-medium text-muted">
                    <span>{searching ? `${results.length} results` : `${results.length} questions`}</span>
                    {searching && <span>Top match pehle</span>}
                  </div>
                  <QuestionList items={results} activeId={desktopItem?.id} progress={progress} onSelect={select} showBest={searching} />
                </section>

                {/* Right: answer (desktop) */}
                <section className="hidden min-w-0 lg:block">
                  <div className="lg:sticky lg:top-24">
                    {desktopItem ? (
                      <div className="scroll-thin max-h-[calc(100dvh-7rem)] overflow-y-auto pr-2">
                        <AnswerView key={desktopItem.id} item={desktopItem} progress={progress} query={deferredQuery} />
                      </div>
                    ) : (
                      <EmptyDetail />
                    )}
                  </div>
                </section>
              </div>
            )}

            {/* Mobile / tablet answer page */}
            {mobileSheetOpen && (
              <div className="sheet-in">
                <AnswerView key={selected.id} item={selected} progress={progress} onBack={closeSheet} compact query={query} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3">
          {NAV.map(n => (
            <button key={n.id} onClick={() => goView(n.id)} className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${view === n.id ? "text-accent" : "text-muted"}`}>
              <n.icon size={21} />{n.label}
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
