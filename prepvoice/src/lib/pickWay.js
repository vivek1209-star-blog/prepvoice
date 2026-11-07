// Bole hue words se sahi solution tab chuno: "without loop", "recursion", "reduce" ...
const RULES = [
  [/without recursion|no recursion|iterative/, l => l.includes("without recursion") || l.includes("stack") || l === "loop"],
  [/without (a |any )?loops?|no loops?|bina loop|one ?line|built ?in|inbuilt/, l => l.includes("without") || l.includes("built")],
  [/recursi/, l => l.includes("recursion")],
  [/\breduce\b/, l => l.includes("reduce")],
  [/\bset\b/, l => l.includes("set")],
  [/\bwhile\b/, l => l.includes("while")],
  [/\bstack\b/, l => l.includes("stack")],
  [/\bregex|regular expression/, l => l.includes("regex")],
  [/\bfilter\b/, l => l.includes("filter")],
  [/\bsort\b/, l => l.includes("sort")],
  [/two pointers?/, l => l.includes("pointer")],
  [/\bmap\b/, l => l === "map"],
  [/with (a )?loop|for ?loop|using (a )?loop/, l => l.includes("loop") && !l.includes("without")],
];

export function pickWay(ways, query) {
  if (!ways || !query) return 0;
  const q = query.toLowerCase();
  for (const [re, match] of RULES) {
    if (re.test(q)) {
      const i = ways.findIndex(([label]) => match(label.toLowerCase()));
      if (i >= 0) return i;
    }
  }
  return 0;
}
