// JavaScript — short, precise answers. a = bolne wala English, hi = Hinglish meaning
const E = (q, tags, a, hi, x = {}) => ({ q, tags, a, hi, ...x });

export default [
  E("What is the difference between JavaScript and other programming languages?", ["javascript", "js vs other languages", "what is javascript"],
    "JavaScript is a dynamically typed, single-threaded language that runs in the browser and also on the server with Node.js. Unlike Java or C++, it isn't compiled ahead of time, it's interpreted and JIT compiled. It supports both functional and object-oriented styles.",
    "JS browser + server dono pe chalti hai, type fix nahi hota, aur ek hi thread pe chalti hai."),

  E("What is an execution context?", ["execution context", "global execution context", "call stack"],
    "An execution context is the environment where JavaScript code runs. It has two phases: the memory phase, where variables and functions are stored, and the execution phase, where code runs line by line. Each function call creates a new context on the call stack.",
    "Code chalne se pehle JS memory banata hai, phir line by line chalata hai. Har function call ka apna context hota hai.",
  ),

  E("How does the event loop work?", ["event loop", "how event loop works"],
    "JavaScript runs on one call stack. Async tasks like timers and API calls are handled outside, and their callbacks wait in queues. When the call stack is empty, the event loop first runs all microtasks like promises, then one macrotask like setTimeout.",
    "Stack khaali hote hi event loop pehle Promise wale kaam, phir setTimeout wale kaam uthata hai.",
    { code: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");`, out: "1\n4\n3\n2", ex: "Pehle sync code (1, 4), phir Promise (3), last mein setTimeout (2)." }),

  E("What is the call stack?", ["call stack"],
    "The call stack keeps track of which function is running. When a function is called, it's pushed on the stack, and when it returns, it's popped off. JavaScript has only one call stack.",
    "Function call hua toh upar rakha, khatam hua toh hata diya."),

  E("What are microtasks and macrotasks?", ["microtask", "macrotask", "microtask queue", "macrotask queue"],
    "Microtasks are promise callbacks and queueMicrotask. Macrotasks are setTimeout, setInterval and events. After every task, all microtasks run first, then the next macrotask.",
    "Microtask = Promise (VIP line). Macrotask = setTimeout (normal line)."),

  E("What are primitive and non-primitive data types?", ["primitive", "non primitive", "data types", "datatypes"],
    "Primitive types are string, number, boolean, undefined, null, symbol and bigint. They're stored by value. Non-primitive types are objects, arrays and functions, and they're stored by reference.",
    "Primitive ki copy banti hai. Object/array ka sirf reference copy hota hai.",
    { code: `let a = 10; let b = a; b = 20;
console.log(a);
let o1 = { x: 1 }; let o2 = o1; o2.x = 5;
console.log(o1.x);`, out: "10\n5", ex: "Number copy hua isliye a same raha. Object reference share hua isliye o1 bhi badla." }),

  E("What is the nullish coalescing operator (??)?", ["nullish coalescing", "??", "double question mark"],
    "The ?? operator returns the right side only when the left side is null or undefined. Unlike ||, it keeps valid values like 0 or an empty string.",
    "?? sirf null/undefined pe default deta hai. 0 ko galat nahi samajhta.",
    { code: `const count = 0;
console.log(count ?? 10);
console.log(count || 10);`, out: "0\n10", ex: "?? ne 0 rakha, || ne 0 ko false maan ke 10 de diya." }),

  E("What is an arrow function?", ["arrow function", "arrow functions", "fat arrow"],
    "An arrow function is a shorter way to write a function using =>. It doesn't have its own this or arguments, so it takes this from the outer scope.",
    "Chhota syntax, aur iska apna this nahi hota.",
    { code: `const add = (a, b) => a + b;
console.log(add(2, 3));`, out: "5", ex: "Ek line mein function, return likhne ki zaroorat nahi." }),

  E("What is an IIFE?", ["iife", "immediately invoked function expression", "self invoking function"],
    "An IIFE is a function that runs immediately after it's defined. It's used to create a private scope so variables don't leak into the global scope.",
    "Function banao aur turant chala do. Variables bahar nahi aate.",
    { code: `(function () {
  const secret = "hidden";
  console.log("IIFE ran");
})();`, out: "IIFE ran", ex: "Brackets mein function wrap kiya aur last () se turant call ho gaya." }),

  E("What is a closure?", ["closure", "closures"],
    "A closure is when an inner function remembers the variables of its outer function, even after the outer function has finished. It's used for private variables, counters and debounce.",
    "Outer function khatam, phir bhi inner function ko uske variables yaad rehte hain.",
    { code: `function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const inc = counter();
console.log(inc());
console.log(inc());`, out: "1\n2", ex: "Inner function ko count yaad hai, isliye har call pe value badhti hai. Bahar se count access nahi hota." }),

  E("What is the this keyword?", ["this", "this keyword"],
    "this refers to the object that is calling the function. In a method, it's the object before the dot. In a normal function it's undefined in strict mode, and arrow functions take this from the outer scope.",
    "Dot ke left mein jo object hai, wahi this hai.",
    { code: `const user = {
  name: "Vivek",
  show() { return this.name; }
};
console.log(user.show());`, out: "Vivek", ex: "show() user se call hua, isliye this = user." }),

  E("What is a prototype and prototypal inheritance?", ["prototype", "prototypal inheritance", "prototype chain", "inheritance"],
    "Every object has a hidden link to another object called its prototype. If a property isn't found on the object, JavaScript looks for it in the prototype chain. That's prototypal inheritance.",
    "Object ke paas cheez nahi hai toh uske parent (prototype) se le leta hai.",
    { code: `const animal = { eat() { return "eating"; } };
const dog = Object.create(animal);
console.log(dog.eat());`, out: "eating", ex: "dog mein eat nahi hai, par prototype animal se mil gaya." }),

  E("What is a callback function? List its use cases.", ["callback", "callback function", "callbacks"],
    "A callback is a function passed to another function, which is called later. Use cases are event listeners, setTimeout, array methods like map, and handling async results.",
    "Ek function ko doosre function mein bhejna, taaki woh baad mein chalaye.",
    { code: `function greet(name, cb) {
  cb("Hello " + name);
}
greet("Vivek", msg => console.log(msg));`, out: "Hello Vivek", ex: "Arrow function ko callback bana ke bheja, greet ne baad mein usko call kiya." }),

  E("What is callback hell? How can you avoid it?", ["callback hell", "pyramid of doom"],
    "Callback hell is when many callbacks are nested inside each other, so the code becomes hard to read and handle errors. We avoid it using promises, async/await, and small named functions.",
    "Callback ke andar callback ke andar callback, code ulajh jaata hai. Promise ya async/await se solve hota hai."),

  E("What is a Promise?", ["promise", "promises"],
    "A Promise represents a value that will be available in the future. It has three states: pending, fulfilled and rejected. We use .then for success and .catch for errors.",
    "Promise = future ka result. Pending, success ya fail.",
    { code: `const p = new Promise((resolve) => {
  setTimeout(() => resolve("Done"), 100);
});
p.then(res => console.log(res));`, out: "Done", ex: "100ms baad resolve hua, .then mein result mila." }),

  E("What are the different Promise methods?", ["promise methods", "promise apis", "types of promise methods"],
    "Promise.all waits for all and fails if one fails. Promise.allSettled waits for all and gives every result. Promise.race gives the first settled result, success or failure. Promise.any gives the first success.",
    "all = sab pass. allSettled = sabka result. race = jo pehle khatam. any = jo pehle pass."),

  E("What is Promise.all?", ["promise all", "promise.all"],
    "Promise.all takes many promises and waits for all of them. It returns all results in order, but if any one fails, it rejects immediately.",
    "Sab pass hone chahiye. Ek fail toh sab fail.",
    { code: `Promise.all([Promise.resolve(1), Promise.resolve(2)])
  .then(res => console.log(res));`, out: "[1,2]", ex: "Dono pass hue, toh dono results ek array mein mile." }),

  E("What is Promise chaining?", ["promise chaining", "chaining"],
    "Promise chaining means calling .then one after another, where each .then gets the result of the previous one. One .catch at the end handles errors from any step.",
    "Ek .then ka result agle .then mein jaata hai.",
    { code: `Promise.resolve(2)
  .then(n => n * 2)
  .then(n => n + 1)
  .then(n => console.log(n));`, out: "5", ex: "2 → 4 → 5. Har step pichle ka result use karta hai." }),

  E("What is async/await?", ["async await", "async", "await"],
    "async/await is a cleaner way to work with promises. An async function always returns a promise, and await waits for a promise to finish. We handle errors with try/catch.",
    "Promise ko normal code jaisa likhne ka tareeka.",
    { code: `const getData = () => Promise.resolve("data");
async function load() {
  try {
    const res = await getData();
    console.log(res);
  } catch (e) {
    console.log("error");
  }
}
load();`, out: "data", ex: "await ne promise ka result aane tak wait kiya, error aata toh catch mein jaata." }),

  E("What is event bubbling?", ["event bubbling", "bubbling"],
    "Event bubbling means when an event happens on a child, it first runs on the child and then moves up to its parent elements. It's the default behavior.",
    "Event neeche se upar jaata hai, jaise paani ka bulbula."),

  E("What is event capturing?", ["event capturing", "capturing", "trickling"],
    "Event capturing is the opposite of bubbling. The event goes from the top parent down to the target element. We enable it by passing { capture: true } to addEventListener.",
    "Event upar se neeche aata hai."),

  E("What is event delegation?", ["event delegation", "delegation"],
    "Event delegation means adding one event listener on a parent instead of many on each child, and using event.target to know which child was clicked. It works because of bubbling.",
    "100 buttons pe 100 listener nahi, parent pe ek listener.",
    { code: `document.getElementById("list").addEventListener("click", e => {
  if (e.target.tagName === "LI") console.log(e.target.textContent);
});`, norun: true, ex: "Parent ul pe ek listener, jo li click hua uska text mila." }),

  E("What is immutability?", ["immutability", "immutable"],
    "Immutability means not changing existing data. Instead, we create a new copy with the changes. It makes code predictable, and React uses it to detect state changes.",
    "Purana data mat badlo, naya copy banao.",
    { code: `const user = { name: "Vivek" };
const updated = { ...user, city: "Mumbai" };
console.log(user, updated);`, out: '{"name":"Vivek"} {"name":"Vivek","city":"Mumbai"}', ex: "Spread se nayi copy bani, original user same raha." }),

  E("What is a Map?", ["map object", "new map"],
    "A Map stores key-value pairs where keys can be any type, even objects. It keeps insertion order and has a size property.",
    "Object jaisa, par key kuch bhi ho sakti hai.",
    { code: `const m = new Map();
m.set("name", "Vivek");
console.log(m.get("name"), m.size);`, out: "Vivek 1" }),

  E("What is a Set?", ["set", "new set"],
    "A Set stores only unique values. It's commonly used to remove duplicates from an array.",
    "Duplicate allowed nahi.",
    { code: `const s = new Set([1, 2, 2, 3]);
console.log([...s]);`, out: "[1,2,3]" }),

  E("What is code splitting?", ["code splitting", "dynamic import", "lazy loading js"],
    "Code splitting means breaking the JavaScript bundle into smaller files that load only when needed. We do it with dynamic import(). It makes the first page load faster.",
    "Saara code ek saath mat bhejo, zaroorat pe load karo.",
    { code: `button.onclick = async () => {
  const { exportExcel } = await import("./exportExcel.js");
  exportExcel();
};`, norun: true, ex: "Excel ka code sirf button click pe load hota hai." }),

  E("What is memoization?", ["memoization", "memoize", "memo function"],
    "Memoization means caching a function's result for the same input, so next time we return the saved result instead of calculating again.",
    "Ek baar calculate karo, yaad rakho, dobara wahi do.",
    { code: `function memo(fn) {
  const cache = {};
  return n => cache[n] ?? (cache[n] = fn(n));
}
const square = memo(n => { console.log("calc"); return n * n; });
console.log(square(4));
console.log(square(4));`, out: "calc\n16\n16", ex: "Pehli baar 'calc' chala, doosri baar cache se result mila." }),

  E("What is strict mode?", ["strict mode", "use strict"],
    "\"use strict\" makes JavaScript stricter. It throws errors for silent mistakes like using undeclared variables, and this becomes undefined in normal functions.",
    "JS ko strict teacher bana deta hai, chhoti galti pe bhi error.",
    { code: `"use strict";
try { x = 10; } catch (e) { console.log(e.name); }`, out: "ReferenceError" }),

  E("What is currying?", ["currying", "curry"],
    "Currying converts a function with many arguments into a chain of functions that take one argument each, like add(1)(2)(3).",
    "Saare arguments ek saath nahi, ek ek karke.",
    { code: `const add = a => b => c => a + b + c;
console.log(add(1)(2)(3));`, out: "6" }),

  E("What are Object.freeze() and Object.seal()?", ["object.freeze", "freeze", "object.seal", "seal"],
    "Object.freeze makes an object read-only, nothing can be added, removed or changed. Object.seal stops adding or removing properties, but existing ones can still be changed.",
    "Freeze = kuch nahi badlega. Seal = sirf value badal sakte ho.",
    { code: `const f = Object.freeze({ a: 1 }); f.a = 2;
const s = Object.seal({ a: 1 }); s.a = 2; s.b = 3;
console.log(f.a, JSON.stringify(s));`, out: '1 {"a":2}', sloppy: true, ex: "Normal mode mein change chupchaap ignore hota hai. Strict mode mein error aata hai." }),

  E("What are design patterns in JavaScript?", ["design patterns", "design pattern", "singleton", "module pattern", "observer pattern"],
    "Design patterns are reusable solutions to common problems. Common ones in JavaScript are Module, Singleton, Factory, Observer and Pub/Sub. For example, Redux store is a singleton, and event listeners follow the Observer pattern.",
    "Common problems ke tested solutions. Redux store = singleton, addEventListener = observer."),

  E("What is debouncing?", ["debounce", "debouncing"],
    "Debouncing runs a function only after the user stops triggering it for some time. It's used in search inputs so the API is called only after typing stops.",
    "User rukega tabhi function chalega.",
    { code: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
const search = debounce(q => console.log("Search:", q), 100);
search("v"); search("vi"); search("viv");`, out: "Search: viv", ex: "Har call pe purana timer cancel hua, sirf last call chali." }),

  E("What is throttling?", ["throttle", "throttling"],
    "Throttling runs a function at most once in a fixed time, no matter how many times it's triggered. It's used for scroll and resize events.",
    "Kitni bhi baar call karo, ek time mein sirf ek baar chalega.",
    { code: `function throttle(fn, limit) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= limit) { last = now; fn(...args); }
  };
}
const log = throttle(n => console.log("Run", n), 1000);
log(1); log(2); log(3);`, out: "Run 1", ex: "1 second mein sirf pehli call chali." }),

  E("What is hoisting?", ["hoisting", "hoist"],
    "Hoisting means JavaScript moves declarations to the top before running the code. Function declarations work before they're defined, var gives undefined, and let and const give a ReferenceError.",
    "Code chalne se pehle declarations ko memory mil jaati hai.",
    { code: `console.log(a);
var a = 5;
hello();
function hello() { console.log("Hi"); }`, out: "undefined\nHi", ex: "var ki value undefined mili, function poora hoist hua." }),

  E("What is the Temporal Dead Zone (TDZ)?", ["tdz", "temporal dead zone"],
    "TDZ is the time between the start of a block and the line where a let or const variable is declared. Accessing it in this zone gives a ReferenceError.",
    "let/const declare hone se pehle use kiya toh error.",
    { code: `try { console.log(x); } catch (e) { console.log(e.name); }
let x = 5;`, out: "ReferenceError" }),

  E("What is scope and lexical scope?", ["scope", "lexical scope", "scope chain"],
    "Scope decides where a variable can be used: global, function or block scope. Lexical scope means a function can use variables from where it is written, its parent scopes.",
    "Variable kahan tak dikhega. Andar wala function bahar ke variables dekh sakta hai."),

  E("What is a higher-order function?", ["higher order function", "hof"],
    "A higher-order function takes a function as an argument or returns a function. Examples are map, filter, reduce and setTimeout.",
    "Jo function, function le ya function return kare.",
    { code: `const nums = [1, 2, 3];
console.log(nums.map(n => n * 2));`, out: "[2,4,6]" }),

  E("What is a first-class function?", ["first class function", "first class functions"],
    "In JavaScript, functions are first-class, meaning we can store them in variables, pass them as arguments and return them from other functions.",
    "Function bhi ek normal value ki tarah use hota hai."),

  E("What is a pure function?", ["pure function", "pure functions", "side effect"],
    "A pure function always returns the same output for the same input and has no side effects, like changing outside variables or calling an API. Redux reducers must be pure.",
    "Same input → same output, aur bahar kuch nahi badalta."),

  E("What is the spread operator?", ["spread", "spread operator"],
    "The spread operator ... expands an array or object into individual items. It's used to copy and merge arrays or objects.",
    "Array/object ko khol deta hai.",
    { code: `const a = [1, 2];
const b = [...a, 3];
console.log(b);`, out: "[1,2,3]" }),

  E("What is the rest operator?", ["rest", "rest operator", "rest parameter"],
    "The rest operator ... collects remaining values into an array. It's used in function parameters and destructuring.",
    "Baaki bache values ko ek array mein samet leta hai.",
    { code: `function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3));`, out: "6" }),

  E("What is destructuring?", ["destructuring", "object destructuring", "array destructuring"],
    "Destructuring lets us take values out of arrays or objects into separate variables in one line.",
    "Object/array se values nikalne ka short tareeka.",
    { code: `const user = { name: "Vivek", city: "Mumbai" };
const { name, city } = user;
console.log(name, city);`, out: "Vivek Mumbai" }),

  E("What is optional chaining (?.)?", ["optional chaining", "?."],
    "Optional chaining ?. safely reads nested properties. If any part is null or undefined, it returns undefined instead of throwing an error.",
    "Beech mein kuch missing ho toh crash nahi, undefined milega.",
    { code: `const res = { data: null };
console.log(res.data?.user?.name);`, out: "undefined" }),

  E("What is a generator function?", ["generator", "generator function", "yield"],
    "A generator is a function written with function* that can pause with yield and continue later. Each next() call gives the next value.",
    "Pause aur resume hone wala function.",
    { code: `function* ids() { yield 1; yield 2; }
const g = ids();
console.log(g.next().value, g.next().value);`, out: "1 2" }),

  E("What is garbage collection?", ["garbage collection", "garbage collector"],
    "Garbage collection automatically frees memory that's no longer reachable. JavaScript uses the mark-and-sweep algorithm.",
    "Jo data kahin use nahi ho raha, JS khud memory se hata deta hai."),

  E("What is a memory leak in JavaScript?", ["memory leak", "memory leaks"],
    "A memory leak is memory that's not released because we still keep a reference to it. Common causes are timers or event listeners not removed, global variables and growing caches.",
    "Kaam khatam, par reference pakad ke rakha, isliye memory free nahi hui."),

  E("What is type coercion?", ["type coercion", "coercion", "implicit conversion"],
    "Type coercion is when JavaScript automatically converts one type to another, like a number to a string during + with a string.",
    "JS khud type badal deta hai.",
    { code: `console.log("5" + 1);
console.log("5" - 1);`, out: "51\n4" }),

  E("What is NaN?", ["nan", "not a number", "isnan"],
    "NaN means Not a Number, the result of an invalid math operation. Its type is number, and NaN is not equal to itself, so we check it with Number.isNaN.",
    "Galat calculation ka result. NaN === NaN false hota hai.",
    { code: `console.log(typeof NaN, NaN === NaN, Number.isNaN(NaN));`, out: "number false true" }),

  E("What is the typeof operator?", ["typeof"],
    "typeof returns the type of a value as a string, like \"number\" or \"object\". typeof null returns \"object\", which is an old bug.",
    "Value ka type batata hai.",
    { code: `console.log(typeof 5, typeof "a", typeof null, typeof []);`, out: "number string object object" }),

  E("What are template literals?", ["template literals", "template string", "backtick"],
    "Template literals use backticks and let us add variables with ${} and write multi-line strings.",
    "Backtick se string, aur ${} se variable."),

  E("What are the ES6 features you use?", ["es6", "es6 features", "es2015", "modern javascript"],
    "let and const, arrow functions, template literals, destructuring, spread and rest, default parameters, classes, modules, promises, Map and Set.",
    "Jo daily use karte ho wahi bolo."),

  E("What are ES modules?", ["es modules", "import export", "modules", "esm"],
    "ES modules let us split code into files using import and export. They support tree shaking, so unused code is removed from the bundle.",
    "import/export se code alag files mein."),

  E("What is a WeakMap?", ["weakmap", "weakset"],
    "A WeakMap only takes objects as keys and holds them weakly, so if the object has no other reference, it can be garbage collected. It's not iterable.",
    "Key object hata toh entry bhi apne aap hat jaati hai."),

  E("What is the difference between async and defer in script tags?", ["async defer", "script async", "script defer"],
    "Both download the script without blocking HTML. async runs it as soon as it's downloaded, in any order. defer runs it after HTML parsing, in order.",
    "async = jaldi chalao. defer = HTML ke baad, order mein.", { type: "diff", pair: ["async", "defer"] }),

  E("How do you handle errors in JavaScript?", ["error handling", "try catch", "exception"],
    "We use try/catch for synchronous code and async/await, .catch for promises, and finally for cleanup. We can also throw custom errors.",
    "try mein code, catch mein error, finally hamesha chalta hai.",
    { code: `try {
  JSON.parse("{bad}");
} catch (e) {
  console.log("Invalid JSON");
} finally {
  console.log("done");
}`, out: "Invalid JSON\ndone" }),

  E("What is JSON?", ["json", "json.parse", "json.stringify"],
    "JSON is a text format to store and send data. JSON.stringify converts an object to a string, and JSON.parse converts the string back to an object.",
    "Data bhejne ka text format.",
    { code: `const s = JSON.stringify({ a: 1 });
console.log(s, JSON.parse(s).a);`, out: '{"a":1} 1' }),

  E("What is setTimeout and setInterval?", ["settimeout", "setinterval", "timer"],
    "setTimeout runs a function once after a delay. setInterval runs it again and again at a fixed interval. We stop them with clearTimeout and clearInterval.",
    "setTimeout = ek baar. setInterval = baar baar."),

  E("Is JavaScript synchronous or asynchronous?", ["synchronous", "asynchronous", "sync or async", "single threaded"],
    "JavaScript is single-threaded and synchronous by nature. It becomes asynchronous with the help of the browser or Node APIs and the event loop.",
    "JS khud sync hai. Async kaam browser/Node karta hai."),
];
