import js from "./js.js";
import react from "./react.js";
import node from "./node.js";
import manager from "./manager.js";
import resume from "./resume.js";
import programs from "./programs/index.js";
import diffs, { extraSingles } from "./diffs.js";

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "me", label: "About Me" },
  { id: "js", label: "JavaScript" },
  { id: "react", label: "React" },
  { id: "node", label: "Node · Express · DB" },
  { id: "program", label: "Programs" },
  { id: "diff", label: "Differences" },
  { id: "manager", label: "Managerial" },
];

const withCat = (list, cat) => list.map(x => ({ cat, type: "concept", ...x }));

const raw = [
  ...withCat(resume, "me"),
  ...withCat(js, "js"),
  ...withCat(react, "react"),
  ...withCat(node, "node"),
  ...withCat(manager, "manager"),
  ...withCat(programs, "js"),
  ...diffs.map(d => ({ type: "diff", ...d })),
  ...extraSingles.map(x => ({ type: "concept", ...x })),
];

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const seen = new Set();
export const QUESTIONS = raw.map(item => {
  let id = slug(item.q);
  while (seen.has(id)) id += "-x";
  seen.add(id);
  return { ...item, id, tags: item.tags.map(t => t.toLowerCase()) };
});

export const inCategory = (item, cat) => {
  if (cat === "all") return true;
  if (cat === "program") return item.type === "program";
  if (cat === "diff") return item.type === "diff";
  return item.cat === cat;
};
