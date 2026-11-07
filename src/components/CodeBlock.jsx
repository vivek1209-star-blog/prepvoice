import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy, Play, Loader2 } from "lucide-react";
import { runCode } from "../lib/runCode.js";

export default function CodeBlock({ tabs, initialTab = 0, runnable = true, sloppy = false, expected, lang = "jsx" }) {
  const [active, setActive] = useState(initialTab);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const code = tabs[active].code;

  const copy = async () => {
    try { await navigator.clipboard.writeText(code); } catch {
      const t = document.createElement("textarea"); t.value = code; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const run = async () => {
    setRunning(true);
    const live = [];
    setOutput([]);
    await runCode(code, { sloppy, onLine: l => { live.push(l); setOutput([...live]); } });
    setRunning(false);
    if (!live.length) setOutput(["(no output)"]);
  };

  const prismLang = lang === "sql" ? "sql" : lang === "text" ? "markup" : "jsx";

  return (
    <div className="overflow-hidden rounded-2xl border border-[#2b2722] bg-[#1d1b18] shadow-card">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 px-3 py-2">
        {tabs.length > 1 ? (
          <div className="no-scrollbar flex min-w-0 basis-full gap-1 overflow-x-auto sm:basis-auto sm:flex-1">
            {tabs.map((t, i) => (
              <button key={t.label} onClick={() => { setActive(i); setOutput(null); }}
                className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${i === active ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80"}`}>
                {t.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="flex items-center gap-1.5 pl-1">
            <i className="size-2.5 rounded-full bg-[#ff5f57]" /><i className="size-2.5 rounded-full bg-[#febc2e]" /><i className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
        )}
        <div className="ml-auto flex shrink-0 gap-1.5">
          <button onClick={copy} className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-white/10">
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}{copied ? "Copied" : "Copy"}
          </button>
          {runnable && (
            <button onClick={run} disabled={running} className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink transition hover:brightness-110 disabled:opacity-60">
              {running ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}Run
            </button>
          )}
        </div>
      </div>

      <Highlight theme={themes.oneDark} code={code} language={prismLang}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="scroll-thin overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-6 sm:text-sm" style={{ background: "transparent" }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, k) => <span key={k} {...getTokenProps({ token })} />)}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      {(output || expected) && (
        <div className="grid border-t border-white/5 sm:grid-cols-2">
          {expected != null && (
            <div className="px-4 py-3">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">Expected output</div>
              <pre className="whitespace-pre-wrap font-mono text-[13px] leading-6 text-amber-200">{expected}</pre>
            </div>
          )}
          {output && (
            <div className={`px-4 py-3 ${expected != null ? "border-t border-white/5 sm:border-l sm:border-t-0" : ""}`}>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">Your run</div>
              <pre className="whitespace-pre-wrap font-mono text-[13px] leading-6 text-lime-300">{output.join("\n") || "…"}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
