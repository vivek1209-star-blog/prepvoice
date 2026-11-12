import Fuse from "fuse.js";

// Bole hue / type kiye hue words ko ek standard form mein laana
const ALIASES = [
  [/\bjava ?script\b/g, "javascript"], [/\btype ?script\b/g, "typescript"],
  [/\bjason\b/g, "json"], [/\bj ?w ?t\b/g, "jwt"], [/\bj s\b/g, "js"],
  [/\bcall ?back\b/g, "callback"], [/\bcall backs\b/g, "callbacks"],
  [/\buse ?state\b/g, "usestate"], [/\buse ?effect\b/g, "useeffect"], [/\buse ?ref\b/g, "useref"],
  [/\buse ?memo\b/g, "usememo"], [/\buse ?callback\b/g, "usecallback"], [/\buse ?context\b/g, "usecontext"],
  [/\buse ?reducer\b/g, "usereducer"], [/\buse ?layout ?effect\b/g, "uselayouteffect"], [/\buse ?params\b/g, "useparams"],
  [/\breact ?\.? ?memo\b/g, "react.memo"], [/\bpure ?component\b/g, "purecomponent"],
  [/\bpromise ?\.? ?all ?settled\b/g, "promise.allsettled"], [/\bpromise ?\.? ?all\b/g, "promise.all"],
  [/\bpromise ?\.? ?any\b/g, "promise.any"], [/\bpromise ?\.? ?race\b/g, "promise.race"],
  [/\bobject ?\.? ?freeze\b/g, "object.freeze"], [/\bobject ?\.? ?seal\b/g, "object.seal"],
  [/\blocal ?storage\b/g, "localstorage"], [/\bsession ?storage\b/g, "sessionstorage"],
  [/\bfor ?each\b/g, "foreach"], [/\bprocess ?\.? ?next ?tick\b/g, "process.nexttick"], [/\bnext ?tick\b/g, "nexttick"],
  [/\bset ?immediate\b/g, "setimmediate"], [/\bset ?timeout\b/g, "settimeout"], [/\bset ?interval\b/g, "setinterval"],
  [/\bweb ?pack\b/g, "webpack"], [/\bmongo ?db\b/g, "mongodb"], [/\bmy ?sql\b/g, "mysql"],
  [/\bnode ?\.? ?js\b/g, "node"], [/\bnodejs\b/g, "node"], [/\bexpress ?\.? ?js\b/g, "express"],
  [/\breact ?\.? ?js\b/g, "react"], [/\bnext ?\.? ?js\b/g, "next.js"], [/\bredux ?tool ?kit\b/g, "redux toolkit"],
  [/\bre ?-? ?render(ing|s)?\b/g, "rerender"], [/\bversus\b/g, "vs"], [/\bv\/s\b/g, "vs"], [/\bv s\b/g, "vs"],
  [/\bclo(u)?s(e)?r(e|s)?\b/g, "closure"], [/\bclosures\b/g, "closure"], [/\bprototypes\b/g, "prototype"],
  [/\bpromises\b/g, "promise"], [/\bhooks\b/g, "hooks"], [/\bmiddlewares\b/g, "middleware"],
  [/\bi ?i ?f ?e\b/g, "iife"], [/\bh ?o ?c\b/g, "hoc"], [/\bc ?o ?r ?s\b/g, "cors"], [/\bcourse\b/g, "cors"],
  [/\bs ?s ?r\b/g, "ssr"], [/\bc ?s ?r\b/g, "csr"], [/\bt ?d ?z\b/g, "tdz"], [/\br ?b ?a ?c\b/g, "rbac"],
  [/\bdouble equals?\b/g, "=="], [/\btriple equals?\b/g, "==="], [/\bnull ?ish\b/g, "nullish"],
  [/\b2nd\b/g, "second"],
];

const FILLER = new Set(("what is are was the a an explain tell me about define definition of in on to for with example examples " +
  "please can you could give do does did how why when we use used using i my your this that it its js javascript " +
  "difference differences diff between and vs versus compare comparison program write code implement short simple answer " +
  "question interview mean meaning by say without loop loops built inbuilt bina one line using recursion recursive").split(" "));

export function normalize(text) {
  let s = ` ${String(text).toLowerCase()} `;
  s = s.replace(/[“”"'`’,!;:()[\]{}]/g, " ").replace(/\s-\s|-/g, " ").replace(/\?(?!\?|\.)/g, " ");
  for (const [re, to] of ALIASES) s = s.replace(re, to);
  return s.replace(/\s+/g, " ").trim();
}

export function clean(normalized) {
  const words = normalized.split(" ").filter(Boolean);
  const kept = words.filter(w => !FILLER.has(w));
  // "javascript" / "react" akela bola ho toh rakho
  return (kept.length ? kept : words.filter(w => !["what", "is", "the", "a", "an", "explain", "tell", "me"].includes(w))).join(" ");
}

const hasPhrase = (hay, needle) => needle && (` ${hay} `).includes(` ${needle} `);
const CAT_HINTS = [["angular", "angular"], ["rxjs", "angular"], ["typescript", "angular"], ["react", "react"], ["node", "node"], ["express", "node"], ["mongodb", "node"], ["mysql", "sql"], ["sql", "sql"], ["sequelize", "sql"]];
const DIFF_RE = /\b(diff|difference|differences|vs|compare|comparison|between)\b/;
const PROG_RE = /\b(program|write|code|implement|polyfill|output|print|find|reverse|count|check|sort|remove|build)\b/;

export function createSearch(items) {
  const prepared = items.map(it => ({
    it,
    tags: it.tags.map(t => {
      const n = normalize(t);
      return { n, c: clean(n) || n };
    }),
    pair: (it.pair || []).map(p => clean(normalize(p)) || normalize(p)),
  }));
  const fuse = new Fuse(items, {
    keys: [{ name: "tags", weight: 0.7 }, { name: "q", weight: 0.3 }],
    threshold: 0.38, ignoreLocation: true, includeScore: true, minMatchCharLength: 2,
  });

  return function search(query, limit = 40) {
    const nq = normalize(query);
    if (!nq) return [];
    const cq = clean(nq) || nq;
    const diffIntent = DIFF_RE.test(nq);
    const progIntent = PROG_RE.test(nq);

    const fuzzy = new Map();
    for (const r of fuse.search(cq.length >= 2 ? cq : nq)) fuzzy.set(r.item.id, r.score);

    const scored = prepared.map(({ it, tags, pair }) => {
      let s = 0;
      const isDiff = it.type === "diff";

      if (isDiff) {
        const short = p => p.includes(".") ? p.split(".").pop() : p;
        const hit = p => hasPhrase(cq, p) || hasPhrase(cq, short(p));
        const hits = pair.filter(hit).length;
        if (diffIntent) {
          const covered = pair.flatMap(p => [...p.split(" "), short(p)]);
          const extra = cq.split(" ").filter(w => !covered.includes(w)).length;
          if (hits === pair.length) s += 120 + 10 * pair.length - 10 * extra;
          else s += hits * 25 - (pair.length - hits) * 5;
        } else {
          s += pair.some(p => p === cq) ? 25 : hits * 4;
          s -= 40;
        }
      } else {
        let best = 0;
        for (const t of tags) {
          if (t.n === nq || t.c === cq) best = Math.max(best, 100);
          else if (hasPhrase(cq, t.c)) best = Math.max(best, 12 + 7 * t.c.split(" ").length);
          else if (hasPhrase(t.c, cq)) best = Math.max(best, 6);
        }
        s += best;
        if (diffIntent) s -= 15;
      }

      if (it.type === "program" && progIntent) s += 25;
      // "in angular" / "in react" / "mysql" bola ho toh us category ko thoda upar
      for (const [word, cat] of CAT_HINTS) if (s > 0 && hasPhrase(nq, word) && it.cat === cat) s += 12;
      if (fuzzy.has(it.id)) s += (1 - fuzzy.get(it.id)) * (s > 0 ? 10 : 30);
      return { it, s };
    });

    const top = Math.max(0, ...scored.map(x => x.s));
    const min = top >= 100 ? 25 : 8; // strong match mila toh kachra results hatao
    return scored
      .filter(x => x.s > min)
      .sort((a, b) => b.s - a.s)
      .slice(0, limit)
      .map(x => x.it);
  };
}
