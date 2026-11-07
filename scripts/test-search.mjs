// Checks that the TOP result is exactly the right question for spoken / typed queries.
// Usage: node scripts/test-search.mjs
import { QUESTIONS } from "../src/data/index.js";
import { createSearch } from "../src/lib/search.js";
import { pickWay } from "../src/lib/pickWay.js";

const search = createSearch(QUESTIONS);
const cases = [
  ["callback", "What is a callback function? List its use cases."],
  ["what is callback", "What is a callback function? List its use cases."],
  ["call back", "What is a callback function? List its use cases."],
  ["callback hell", "What is callback hell? How can you avoid it?"],
  ["diff callback vs promise", "Difference between callback and Promise"],
  ["difference between callback and promise", "Difference between callback and Promise"],
  ["promise", "What is a Promise?"],
  ["promise vs async await", "Difference between Promise and async/await"],
  ["closure", "What is a closure?"],
  ["explain closure in javascript", "What is a closure?"],
  ["clouser", "What is a closure?"],
  ["let vs const", "Difference between let and const"],
  ["difference between var let and const", "Difference between var, let and const"],
  ["use effect", "What is useEffect?"],
  ["useMemo vs useCallback", "Difference between useMemo and useCallback"],
  ["usememo", "What is useMemo?"],
  ["props vs state", "Difference between props and state"],
  ["props", "What are props?"],
  ["state", "What is state in React?"],
  ["virtual dom", "What is the Virtual DOM?"],
  ["virtual dom vs real dom", "Difference between Virtual DOM and Real DOM"],
  ["event loop", "How does the event loop work?"],
  ["node event loop", "Explain the event loop in Node.js."],
  ["jwt", "What is JWT? Explain its structure."],
  ["put vs patch", "Difference between PUT and PATCH"],
  ["authentication vs authorization", "Difference between authentication and authorization"],
  ["middleware", "What is middleware in Express?"],
  ["reverse string program", "Reverse a string"],
  ["write a program to reverse a string", "Reverse a string"],
  ["palindrome", "Check if a string is a palindrome"],
  ["second largest number", "Find the second largest number in an array"],
  ["remove duplicates", "Remove duplicates from an array"],
  ["nested object search", "Search a value in a nested object and return the key"],
  ["object inside object", "Search a value in a nested object and return the key"],
  ["debounce", "What is debouncing?"],
  ["implement debounce", "Implement debounce"],
  ["debounce vs throttle", "Difference between debounce and throttle"],
  ["tell me about yourself", "Tell me about yourself."],
  ["promise all", "What is Promise.all?"],
  ["promise.race vs promise.any", "Difference between Promise.race and Promise.any"],
  ["race vs any", "Difference between Promise.race and Promise.any"],
  ["hoisting", "What is hoisting?"],
  ["redux", "What is Redux?"],
  ["context api vs redux", "Difference between Context API and Redux"],
  ["axios vs fetch", "Difference between Axios and Fetch"],
  ["sql vs nosql", "Difference between SQL and NoSQL"],
  ["hashing encryption encoding difference", "Difference between hashing, encryption and encoding"],
  ["map vs foreach", "Difference between forEach and map"],
  ["== vs ===", "Difference between == and ==="],
  ["double equals vs triple equals", "Difference between == and ==="],
  ["aggregation", "What is the aggregation pipeline in MongoDB?"],
  ["solid principles", "What are the SOLID principles?"],
  ["360pass", "Explain the 360Pass project."],
  ["fizzbuzz", "FizzBuzz"],
  ["cors", "What is CORS?"],
  ["custom hook", "What are custom Hooks? How have you used them?"],
  ["useState vs useRef", "Difference between useState and useRef"],
  ["shallow copy vs deep copy", "Difference between shallow copy and deep copy"],
  ["deep copy", "What is a deep copy?"],
  ["shallow vs deep copy", "Difference between shallow copy and deep copy"],
  ["bind", "What is bind()?"],
  ["call apply bind difference", "Difference between call, apply and bind"],
  ["difference between usestate usecontext usereducer", "Difference between useState, useContext and useReducer"],
  ["webpack vs babel", "Difference between Webpack and Babel"],
  ["streams vs buffers", "Difference between streams and buffers"],
  ["this keyword", "What is the this keyword?"],
];

cases.push(
  ["reverse program", "Reverse a string"],
  ["reverse", "Reverse a string"],
  ["reverse string without loop", "Reverse a string"],
  ["reverse array", "Reverse an array"],
  ["reverse number", "Reverse a number"],
  ["palindrome without loop", "Check if a string is a palindrome"],
  ["nested object", "Search a value in a nested object and return the key"],
  ["object search", "Search a value in an object and return the key"],
  ["flatten object", "Flatten a nested object into dot keys"],
  ["get value by path", "Get a value from a nested object by path (address.city)"],
  ["deep equal", "Compare two objects (deep equal)"],
  ["second largest without loop", "Find the second largest number in an array"],
  ["remove duplicates using set", "Remove duplicates from an array"],
  ["factorial using recursion", "Factorial of a number"],
  ["fibonacci", "Fibonacci series"],
  ["group by", "Group objects by a property"],
  ["deep merge", "Deep merge two nested objects"],
  ["string compression", "String compression (aaabbc → a3b2c1)"],
  ["star pattern", "Print a star pattern (pyramid)"],
  ["sum of digits", "Sum of digits of a number"],
);
const tabCases = [
  ["reverse string without loop", "Reverse a string", "Without loop"],
  ["reverse string using recursion", "Reverse a string", "Recursion"],
  ["reverse string", "Reverse a string", "For loop"],
  ["remove duplicates using set", "Remove duplicates from an array", "Without loop (Set)"],
  ["remove duplicates using reduce", "Remove duplicates from an array", "reduce"],
  ["factorial recursion", "Factorial of a number", "Recursion (without loop)"],
  ["nested object search without recursion stack", "Search a value in a nested object and return the key", "Without recursion (stack)"],
];
let fail = 0;
for (const [q, title, tab] of tabCases) {
  const item = QUESTIONS.find(x => x.q === title);
  const got = item.ways[pickWay(item.ways, q)][0];
  if (got !== tab) { fail++; console.log(`✗ tab "${q}" got ${got} exp ${tab}`); }
}
for (const [q, expected] of cases) {
  const top = search(q)[0];
  const ok = top && top.q === expected;
  if (!ok) { fail++; console.log(`✗ "${q}"\n   got: ${top ? top.q : "(nothing)"}\n   exp: ${expected}\n   next: ${search(q).slice(1, 3).map(x => x.q).join(" | ")}`); }
}
console.log(`\nSearch + tab tests: ${cases.length + tabCases.length - fail}/${cases.length + tabCases.length} passed`);
process.exit(fail ? 1 : 0);
