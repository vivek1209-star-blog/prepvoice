import strings from "./strings.js";
import arrays from "./arrays.js";
import objects from "./objects.js";
import logic from "./logic.js";
import advanced from "./advanced.js";
import legacy from "./legacy.js";

// React + output programs purani file se (unke cross questions yahan)
const EXTRA_CROSS = {
  "Build a counter in React": [["Why c => c + 1?", "It always uses the latest state, even if clicks happen fast."], ["Add a reset?", "<button onClick={() => setCount(0)}>Reset</button>."]],
  "Build a todo list in React": [["Why not todos.push()?", "That mutates state, so React won't re-render. I create a new array."], ["Why id as key?", "Index keys break when items are deleted or reordered."], ["How to toggle complete?", "map the list and flip done for the matching id."]],
  "Fetch and show API data in React": [["Why the empty dependency array?", "So the API is called only once after the first render."], ["How do you cancel the request on unmount?", "Use AbortController and call abort in the cleanup."]],
  "Search with debounce in React": [["Why clearTimeout in cleanup?", "Every new keystroke cancels the old timer, so the API is called only after typing stops."]],
  "Toggle show/hide in React": [],
  "Controlled form with validation in React": [["Why [e.target.name]?", "One handler updates whichever field changed."], ["Bigger forms?", "React Hook Form with Yup or Zod."]],
};

const fromLegacy = legacy
  .filter(p => p.cat === "react" || p.q.startsWith("Output:"))
  .map(p => ({ ...p, ways: [[p.cat === "react" ? "Component" : "Code", p.code]], cross: EXTRA_CROSS[p.q] || [] }));

export default [...strings, ...arrays, ...objects, ...logic, ...advanced, ...fromLegacy].map(p => ({
  type: "program",
  ...p,
  code: p.ways[0][1],
  alt: undefined,
}));
