const fmt = v => {
  if (typeof v === "string") return v;
  if (v === undefined) return "undefined";
  if (typeof v === "function") return "[Function]";
  try { const j = JSON.stringify(v); return j === undefined ? String(v) : j; } catch { return String(v); }
};

/** Code sample browser mein chalao aur console.log capture karo (async logs bhi). */
export function runCode(code, { sloppy = false, onLine, waitMs = 1300 } = {}) {
  return new Promise(resolve => {
    const lines = [];
    const push = text => { lines.push(text); onLine?.(text); };
    const consoleProxy = {
      log: (...a) => push(a.map(fmt).join(" ")),
      error: (...a) => push("Error: " + a.map(fmt).join(" ")),
      warn: (...a) => push(a.map(fmt).join(" ")),
    };
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function("console", (sloppy ? "" : '"use strict";\n') + code);
      fn.call(undefined, consoleProxy);
    } catch (e) {
      push("❌ " + e.name + ": " + e.message);
    }
    setTimeout(() => resolve(lines), waitMs);
  });
}
