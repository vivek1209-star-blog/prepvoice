// Runs every runnable code sample and checks it matches the expected output.
// Usage: node scripts/verify-code.mjs
import vm from "node:vm";
import { QUESTIONS } from "../src/data/index.js";

const fmt = v => {
  if (typeof v === "string") return v;
  if (v === undefined) return "undefined";
  try { const j = JSON.stringify(v); return j === undefined ? String(v) : j; } catch { return String(v); }
};
const norm = s => String(s).replace(/\s+/g, "");

function run(code, sloppy) {
  return new Promise(resolve => {
    const out = [];
    const c = { log: (...a) => out.push(a.map(fmt).join(" ")) };
    const ctx = vm.createContext({ console: c, setTimeout, clearTimeout, setImmediate, process, structuredClone });
    try { new vm.Script("(function(console){" + (sloppy ? "" : "\"use strict\";") + "\n" + code + "\n}).call(undefined, console)").runInContext(ctx); } catch (e) { out.push("THROW " + e.name + ": " + e.message); }
    setTimeout(() => resolve(out.join("\n")), 1200);
  });
}

let total = 0, fail = 0;
const jobs = [];
for (const q of QUESTIONS) {
  const list = q.ways ? q.ways : [["code", q.code], ["alt", q.alt]];
  for (const [label, code] of list) {
    if (!code || q.norun || q.out == null) continue;
    total++;
    jobs.push(run(code, q.sloppy).then(o => {
      if (norm(o) !== norm(q.out)) {
        fail++;
        console.log(`✗ ${q.q} [${label}]\n   got: ${JSON.stringify(o)}\n   exp: ${JSON.stringify(q.out)}`);
      }
    }));
  }
}
await Promise.all(jobs);
const byCat = {};
QUESTIONS.forEach(q => { const k = q.type === "concept" ? q.cat : q.type; byCat[k] = (byCat[k] || 0) + 1; });
console.log(`\nQuestions: ${QUESTIONS.length}`, byCat);
console.log(`Code checks: ${total}, failures: ${fail}`);
process.exit(fail ? 1 : 0);
