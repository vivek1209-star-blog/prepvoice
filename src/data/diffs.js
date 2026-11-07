// Difference questions — sirf tab aate hain jab "difference / vs / compare" bola ya likha
const D = (q, pair, cat, a, hi, x = {}) => ({ q, pair, cat, type: "diff", a, hi, ...x, tags: [pair.join(" vs "), ...pair, ...(x.tags || [])] });

export default [
  // ---------- JavaScript ----------
  D("Difference between var, let and const", ["var", "let", "const"], "js",
    "var is function-scoped and can be re-declared. let and const are block-scoped. let can be reassigned, const cannot be reassigned. var is hoisted with undefined, let and const stay in the TDZ.",
    "var purana aur function scope. let badal sakte ho. const reassign nahi hota.",
    { table: [["", "var", "let", "const"], ["Scope", "Function", "Block", "Block"], ["Re-declare", "Yes", "No", "No"], ["Reassign", "Yes", "Yes", "No"], ["Hoisting", "undefined", "TDZ error", "TDZ error"]],
      code: `if (true) { var a = 1; let b = 2; }
console.log(a);
console.log(typeof b);`, out: "1\nundefined", ex: "var block ke bahar bhi mila, let nahi mila." }),

  D("Difference between callback and Promise", ["callback", "promise"], "js",
    "A callback is a function passed to run later, but nesting many callbacks makes code hard to read. A Promise represents a future value, can be chained with .then, and handles all errors in one .catch.",
    "Callback = function bhejo. Promise = future result, clean chaining aur ek jagah error handling.",
    { table: [["", "Callback", "Promise"], ["What", "Function passed to another function", "Object for future value"], ["Readability", "Nested, callback hell", "Flat .then chain"], ["Errors", "Handle in every callback", "One .catch"]],
      code: `// Callback
setTimeout(() => console.log("callback done"), 0);
// Promise
Promise.resolve("promise done").then(r => console.log(r));`, out: "promise done\ncallback done", ex: "Promise microtask hai isliye pehle chala." }),

  D("Difference between Promise and async/await", ["promise", "async await"], "js",
    "Both handle async code. Promises use .then and .catch. async/await is built on promises but reads like normal synchronous code and uses try/catch for errors.",
    "Same kaam, async/await zyada readable.",
    { code: `const get = () => Promise.resolve(5);
get().then(v => console.log("then:", v));
(async () => { const v = await get(); console.log("await:", v); })();`, out: "then: 5\nawait: 5" }),

  D("Difference between Promise.race and Promise.any", ["promise.race", "promise.any"], "js",
    "Promise.race returns the first promise that settles, whether it succeeds or fails. Promise.any returns the first promise that succeeds, and rejects only if all fail.",
    "race = jo pehle khatam (pass ya fail). any = jo pehle pass.",
    { code: `const fail = new Promise((_, rej) => setTimeout(() => rej("fail"), 10));
const ok = new Promise(res => setTimeout(() => res("ok"), 50));
Promise.race([fail, ok]).catch(e => console.log("race:", e));
Promise.any([fail, ok]).then(v => console.log("any:", v));`, out: "race: fail\nany: ok" }),

  D("Difference between Promise.all and Promise.allSettled", ["promise.all", "promise.allsettled"], "js",
    "Promise.all fails immediately if any promise fails. Promise.allSettled waits for all and returns each result with its status, success or failure.",
    "all = ek fail toh sab fail. allSettled = sabka result milega.",
    { code: `const ps = [Promise.resolve(1), Promise.reject("x")];
Promise.all(ps).catch(e => console.log("all:", e));
Promise.allSettled(ps).then(r => console.log(r.map(x => x.status)));`, out: 'all: x\n["fulfilled","rejected"]' }),

  D("Difference between arrow function and normal function", ["arrow function", "normal function"], "js",
    "Arrow functions have shorter syntax, don't have their own this or arguments, and can't be used with new. Normal functions have their own this, which depends on how they're called.",
    "Arrow ka apna this nahi, normal function ka hota hai.",
    { code: `const obj = {
  name: "Vivek",
  normal() { return this.name; },
  arrow: () => this === obj,
};
console.log(obj.normal(), obj.arrow());`, out: "Vivek false", ex: "Normal method ka this = obj. Arrow ka this obj nahi hai, isliye false." }),

  D("Difference between map, filter and find", ["map", "filter", "find"], "js",
    "map returns a new array with every item changed. filter returns a new array with only items that match a condition. find returns only the first matching item, not an array.",
    "map = sab badlo. filter = kuch chuno. find = pehla ek.",
    { code: `const n = [1, 2, 3, 4];
console.log(n.map(x => x * 2));
console.log(n.filter(x => x > 2));
console.log(n.find(x => x > 2));`, out: "[2,4,6,8]\n[3,4]\n3" }),

  D("Difference between forEach and map", ["foreach", "map"], "js",
    "forEach just loops and returns undefined. map loops and returns a new array with the results, so we can chain it.",
    "forEach kuch return nahi karta. map naya array deta hai.",
    { code: `const n = [1, 2];
console.log(n.forEach(x => x * 2));
console.log(n.map(x => x * 2));`, out: "undefined\n[2,4]" }),

  D("Difference between == and ===", ["==", "===", "double equals", "triple equals"], "js",
    "== compares values after converting types. === compares both value and type without conversion. We should use ===.",
    "== type badal ke compare. === type bhi check.",
    { code: `console.log(5 == "5", 5 === "5");`, out: "true false" }),

  D("Difference between null and undefined", ["null", "undefined"], "js",
    "undefined means a variable is declared but has no value. null is an empty value that we assign on purpose.",
    "undefined = JS ne value nahi di. null = humne khud khaali rakha.",
    { code: `let a;
let b = null;
console.log(a, b, typeof a, typeof b);`, out: "undefined null undefined object" }),

  D("Difference between call, apply and bind", ["call", "apply", "bind"], "js",
    "All three set this. call runs the function immediately with arguments one by one. apply runs immediately with arguments as an array. bind doesn't run it, it returns a new function to call later.",
    "call = comma. apply = array. bind = baad mein.",
    { code: `function intro(city) { return this.name + " from " + city; }
const u = { name: "Vivek" };
console.log(intro.call(u, "Mumbai"));
console.log(intro.apply(u, ["Pune"]));
const later = intro.bind(u, "Delhi");
console.log(later());`, out: "Vivek from Mumbai\nVivek from Pune\nVivek from Delhi" }),

  D("Difference between shallow copy and deep copy", ["shallow copy", "deep copy"], "js",
    "A shallow copy copies only the top level, nested objects are still shared. A deep copy copies everything, so changing nested data doesn't affect the original. Spread is shallow, structuredClone is deep.",
    "Shallow = upar ki copy, andar shared. Deep = poori nayi copy.",
    { code: `const a = { addr: { city: "Mumbai" } };
const shallow = { ...a };
const deep = structuredClone(a);
shallow.addr.city = "Pune";
console.log(a.addr.city, deep.addr.city);`, out: "Pune Mumbai" }),

  D("Difference between Object.freeze and Object.seal", ["object.freeze", "object.seal", "freeze", "seal"], "js",
    "freeze blocks adding, deleting and changing properties. seal blocks adding and deleting, but allows changing existing values.",
    "freeze = kuch nahi. seal = sirf value change.",
    { code: `const f = Object.freeze({ a: 1 }); f.a = 9;
const s = Object.seal({ a: 1 }); s.a = 9;
console.log(f.a, s.a);`, out: "1 9", sloppy: true }),

  D("Difference between localStorage, sessionStorage and cookies", ["localstorage", "sessionstorage", "cookies"], "js",
    "localStorage stays until we clear it. sessionStorage is cleared when the tab closes. Cookies are small, sent to the server with every request, can expire, and can be HttpOnly so JavaScript can't read them.",
    "local = hamesha. session = tab band toh khatam. cookie = server ke saath jaati hai.",
    { table: [["", "localStorage", "sessionStorage", "Cookies"], ["Size", "~5–10 MB", "~5 MB", "~4 KB"], ["Expires", "Never", "Tab close", "Set by us"], ["Sent to server", "No", "No", "Yes, every request"], ["JS access", "Yes", "Yes", "No if HttpOnly"]] }),

  D("Difference between Map and Set", ["map", "set"], "js",
    "A Map stores key-value pairs. A Set stores only unique values, without keys.",
    "Map = key + value. Set = sirf unique values.",
    { code: `const m = new Map([["a", 1]]);
const s = new Set([1, 1, 2]);
console.log(m.get("a"), [...s]);`, out: "1 [1,2]" }),

  D("Difference between Map and Object", ["map", "object"], "js",
    "A Map can have any type as a key and keeps insertion order with a size property. An Object's keys are strings or symbols, and it's better for fixed structured data.",
    "Map ki key kuch bhi. Object ki key string."),

  D("Difference between debounce and throttle", ["debounce", "throttle"], "js",
    "Debounce runs the function only after the user stops for some time, like search input. Throttle runs it at most once every fixed interval, like scroll.",
    "Debounce = rukne ke baad. Throttle = har X second mein ek baar."),

  D("Difference between event bubbling and capturing", ["event bubbling", "event capturing", "bubbling", "capturing"], "js",
    "Bubbling goes from the clicked element up to its parents, and it's the default. Capturing goes from the top parent down to the element.",
    "Bubbling = neeche se upar. Capturing = upar se neeche."),

  D("Difference between microtask and macrotask", ["microtask", "macrotask"], "js",
    "Microtasks are promise callbacks and run first after the current code. Macrotasks are setTimeout and events, and run after all microtasks finish.",
    "Promise pehle, setTimeout baad mein."),

  D("Difference between spread and rest operator", ["spread", "rest"], "js",
    "Both use three dots. Spread expands an array or object. Rest collects many values into one array.",
    "Spread = kholo. Rest = samet lo."),

  D("Difference between primitive and non-primitive types", ["primitive", "non primitive"], "js",
    "Primitives like string, number and boolean are stored by value and are immutable. Non-primitives like objects and arrays are stored by reference.",
    "Primitive = value copy. Non-primitive = reference copy."),

  D("Difference between synchronous and asynchronous code", ["synchronous", "asynchronous", "sync", "async"], "js",
    "Synchronous code runs line by line and blocks until each line finishes. Asynchronous code starts a task and moves on, and the result comes later through a callback, promise or await.",
    "Sync = ek ke baad ek, rukta hai. Async = kaam start karke aage badho."),

  D("Difference between JavaScript and TypeScript", ["javascript", "typescript"], "js",
    "TypeScript is JavaScript with static types. It catches type errors at compile time and gives better autocomplete, and then compiles to plain JavaScript.",
    "TS = JS + types. Galti pehle pakdi jaati hai."),

  D("Difference between let and const", ["let", "const"], "js",
    "Both are block-scoped. let can be reassigned, const cannot. A const object's properties can still change.",
    "let badal sakte ho, const nahi."),

  D("Difference between function declaration and function expression", ["function declaration", "function expression"], "js",
    "A function declaration is fully hoisted, so we can call it before it's defined. A function expression is stored in a variable and can't be called before that line.",
    "Declaration pehle call ho sakta hai, expression nahi."),

  D("Difference between setTimeout and setInterval", ["settimeout", "setinterval"], "js",
    "setTimeout runs once after a delay. setInterval keeps running at every interval until cleared.",
    "Timeout = ek baar. Interval = baar baar."),

  // ---------- React ----------
  D("Difference between Virtual DOM and Real DOM", ["virtual dom", "real dom"], "react",
    "The real DOM is the actual page, and updating it is slow. The virtual DOM is a lightweight copy in memory. React compares virtual DOMs and updates only the changed parts of the real DOM.",
    "Real = asli page, slow. Virtual = copy, fast compare.",
    { tags: ["how react compares virtual dom with real dom"] }),

  D("Difference between Virtual DOM and Shadow DOM", ["virtual dom", "shadow dom"], "react",
    "Virtual DOM is a React concept for fast updates. Shadow DOM is a browser feature that keeps a component's HTML and CSS isolated, used in web components.",
    "Virtual = speed ke liye. Shadow = CSS isolation ke liye."),

  D("Difference between JSX and TSX", ["jsx", "tsx"], "react",
    "JSX is used in JavaScript files. TSX is the same syntax in TypeScript files, with type checking for props and state.",
    "TSX = JSX + TypeScript types."),

  D("Difference between class and functional components", ["class component", "functional component"], "react",
    "Class components use ES6 classes, this.state and lifecycle methods. Functional components are plain functions that use hooks. Functional components have less code and are the standard today.",
    "Class = purana, this. Functional = hooks, kam code."),

  D("Difference between props and state", ["props", "state"], "react",
    "Props come from the parent and are read-only. State is managed inside the component and can be changed with setState.",
    "Props = bahar se, read-only. State = andar ka, change ho sakta hai.",
    { table: [["", "Props", "State"], ["Comes from", "Parent", "Same component"], ["Can change?", "No (read-only)", "Yes, with setter"], ["Causes re-render", "When parent passes new", "When updated"]] }),

  D("Difference between controlled and uncontrolled components", ["controlled", "uncontrolled"], "react",
    "In a controlled component, the input value is stored in React state. In an uncontrolled component, the DOM keeps the value and we read it using a ref.",
    "Controlled = state mein value. Uncontrolled = ref se padho.",
    { code: `// Controlled
<input value={name} onChange={e => setName(e.target.value)} />
// Uncontrolled
<input ref={nameRef} />`, norun: true }),

  D("Difference between useState and useRef", ["usestate", "useref"], "react",
    "Updating useState causes a re-render. Updating useRef does not. useRef is used for DOM access and values we don't need to show.",
    "useState = UI update. useRef = chupchaap value."),

  D("Difference between useState, useContext and useReducer", ["usestate", "usecontext", "usereducer"], "react",
    "useState is for simple local state. useReducer is for complex state with many actions. useContext is for reading shared data from a Provider without prop drilling.",
    "Simple = useState. Complex = useReducer. Share = useContext."),

  D("Difference between useMemo and useCallback", ["usememo", "usecallback"], "react",
    "useMemo caches a value, the result of a function. useCallback caches the function itself.",
    "useMemo = result yaad. useCallback = function yaad.",
    { code: `const total = useMemo(() => calc(items), [items]);
const onSave = useCallback(() => save(id), [id]);`, norun: true }),

  D("Difference between useEffect and useLayoutEffect", ["useeffect", "uselayouteffect"], "react",
    "useEffect runs after the browser paints. useLayoutEffect runs before paint, so it's used for measuring layout. useEffect is the default choice.",
    "useEffect = paint ke baad. useLayoutEffect = paint se pehle."),

  D("Difference between Context API and Redux", ["context api", "redux"], "react",
    "Context API is built-in and good for small, rarely changing data like theme or user. Redux is better for large, frequently changing state, with DevTools, middleware and better performance through selectors.",
    "Chhota data = Context. Bada, complex = Redux."),

  D("Difference between Redux and Redux Toolkit", ["redux", "redux toolkit"], "react",
    "Redux Toolkit is the modern way to write Redux. It removes boilerplate with createSlice and createAsyncThunk and has built-in Immer and DevTools setup.",
    "RTK = kam code wala Redux."),

  D("Difference between Synthetic Event and Real DOM event", ["synthetic event", "real dom event", "native event"], "react",
    "A Synthetic Event is React's wrapper around the native browser event, and it works the same in all browsers. The native event is the browser's own event, available as e.nativeEvent.",
    "Synthetic = React ka wrapper. Native = browser ka asli event."),

  D("Difference between Axios and Fetch", ["axios", "fetch"], "react",
    "Fetch is built into the browser, needs res.json(), and doesn't throw on 404 or 500. Axios is a library that converts JSON automatically, throws on error status codes, and supports interceptors and timeouts.",
    "Fetch = built-in, manual kaam. Axios = automatic JSON + interceptors.",
    { code: `// Fetch
const r = await fetch("/api/users");
const data = await r.json();
// Axios
const { data: users } = await axios.get("/api/users");`, norun: true }),

  D("Difference between Webpack and Babel", ["webpack", "babel"], "react",
    "Babel converts modern JavaScript and JSX into older JavaScript. Webpack bundles all files and assets into a few optimized files. Webpack uses Babel through babel-loader.",
    "Babel = translate. Webpack = pack."),

  D("Difference between React.memo and PureComponent", ["react.memo", "purecomponent"], "react",
    "Both skip re-renders when props don't change. React.memo is for functional components, PureComponent is for class components.",
    "Same kaam, memo functional ke liye."),

  D("Difference between React.memo and useMemo", ["react.memo", "usememo"], "react",
    "React.memo memoizes a whole component. useMemo memoizes a value inside a component.",
    "memo = component. useMemo = value."),

  D("Difference between SSR and CSR", ["ssr", "csr"], "react",
    "In CSR, the browser downloads JavaScript and builds the page. In SSR, the server sends ready HTML, so the first load is faster and better for SEO.",
    "CSR = browser banata hai. SSR = server banata hai."),

  D("Difference between library and framework", ["library", "framework"], "react",
    "With a library, we call it when we need it, like React. A framework calls our code and gives a fixed structure, like Angular.",
    "Library = hum control karte hain. Framework = woh control karta hai."),

  D("Difference between React and Angular", ["react", "angular"], "react",
    "React is a UI library with one-way data flow and JSX. Angular is a full framework with TypeScript, two-way binding, built-in routing and dependency injection.",
    "React = flexible library. Angular = complete framework."),

  // ---------- Node / Backend ----------
  D("Difference between PUT and PATCH", ["put", "patch"], "node",
    "PUT replaces the whole resource. PATCH updates only the fields we send.",
    "PUT = poora badlo. PATCH = thoda badlo.",
    { code: `PUT   /users/1  { "name": "Vivek", "city": "Mumbai" }
PATCH /users/1  { "city": "Pune" }`, norun: true, lang: "text" }),

  D("Difference between GET and POST", ["get", "post"], "node",
    "GET reads data, sends parameters in the URL, and can be cached. POST sends data in the body to create something.",
    "GET = lena. POST = bhejna/banana."),

  D("Difference between authentication and authorization", ["authentication", "authorization", "authn", "authz"], "node",
    "Authentication checks who you are, like login. Authorization checks what you are allowed to do, like admin access. Failed authentication gives 401, failed authorization gives 403.",
    "Authentication = kaun ho. Authorization = kya kar sakte ho."),

  D("Difference between stateless and stateful APIs", ["stateless", "stateful"], "node",
    "A stateless API doesn't store client data between requests, every request carries everything needed, like a JWT. A stateful API keeps session data on the server. Stateless is easier to scale.",
    "Stateless = server kuch yaad nahi rakhta. Stateful = session yaad rakhta hai."),

  D("Difference between streams and buffers", ["streams", "buffers", "stream", "buffer"], "node",
    "A buffer holds a chunk of raw data in memory. A stream moves data piece by piece using buffers, so we don't load the whole file at once.",
    "Buffer = ek tukda. Stream = tukdon ka flow."),

  D("Difference between process.nextTick and setImmediate", ["process.nexttick", "setimmediate", "nexttick"], "node",
    "process.nextTick runs right after the current operation, before promises and the event loop continues. setImmediate runs in the check phase, after I/O.",
    "nextTick = turant. setImmediate = agle loop mein."),

  D("Difference between concurrency and parallelism", ["concurrency", "parallelism"], "node",
    "Concurrency means handling many tasks by switching between them, like Node's event loop on one thread. Parallelism means running tasks at the same time on multiple cores, like worker threads or cluster.",
    "Concurrency = ek banda kai kaam switch karke. Parallelism = kai bande ek saath."),

  D("Difference between Cluster and Worker Threads", ["cluster", "worker threads"], "node",
    "Cluster creates separate processes to handle more requests using all CPU cores. Worker threads run heavy CPU work in parallel threads inside one process.",
    "Cluster = zyada requests. Worker = heavy calculation."),

  D("Difference between hashing, encryption and encoding", ["hashing", "encryption", "encoding"], "node",
    "Hashing is one-way and can't be reversed, used for passwords. Encryption is two-way with a key, used to protect data. Encoding just changes the format, like Base64, and isn't security.",
    "Hashing = wapas nahi. Encryption = key se wapas. Encoding = sirf format.",
    { table: [["", "Hashing", "Encryption", "Encoding"], ["Reversible", "No", "Yes, with key", "Yes, anyone"], ["Use", "Passwords", "Sensitive data", "Data transfer (Base64)"], ["Example", "bcrypt", "AES", "Base64"]] }),

  D("Difference between SQL and NoSQL", ["sql", "nosql", "mysql", "mongodb"], "node",
    "SQL databases store data in tables with a fixed schema and support joins and strong transactions. NoSQL like MongoDB stores flexible JSON-like documents and scales horizontally easily.",
    "SQL = table, fixed. NoSQL = document, flexible."),

  D("Difference between Replica Set and Sharding", ["replica set", "sharding"], "node",
    "A replica set keeps copies of the same data for high availability. Sharding splits data across servers for scaling.",
    "Replica = copy. Sharding = baantna."),

  D("Difference between horizontal and vertical scaling", ["horizontal scaling", "vertical scaling"], "node",
    "Vertical scaling means a bigger server with more CPU and RAM. Horizontal scaling means adding more servers behind a load balancer.",
    "Vertical = bada server. Horizontal = zyada servers."),

  D("Difference between monolith and microservices", ["monolith", "microservices"], "node",
    "A monolith is one app with all features, simple to build and deploy. Microservices split features into small independent services, which scale separately but are more complex.",
    "Monolith = ek bada app. Microservices = chhote alag apps."),

  D("Difference between process and thread", ["process", "thread"], "node",
    "A process is a running program with its own memory. A thread runs inside a process and shares its memory.",
    "Process = alag ghar. Thread = ek ghar ke kamre."),

  D("Difference between require and import", ["require", "import", "commonjs", "es modules"], "node",
    "require is CommonJS, loads synchronously and is the old Node style. import is ES modules, is static and supports tree shaking.",
    "require = purana. import = modern."),

  D("Difference between dependencies and devDependencies", ["dependencies", "devdependencies"], "node",
    "dependencies are needed to run the app in production, like Express. devDependencies are only needed during development, like ESLint or Vite.",
    "Production ke liye vs sirf development ke liye."),

  D("Difference between session and JWT authentication", ["session", "jwt"], "node",
    "Session auth stores login data on the server and sends a session id cookie. JWT stores signed data in the token itself, so the server doesn't need to store sessions.",
    "Session = server yaad rakhta hai. JWT = token mein sab."),

  D("Difference between embedding and referencing in MongoDB", ["embedding", "referencing", "embed", "reference"], "node",
    "Embedding stores related data inside the same document, good for small data read together. Referencing stores an id to another document, good for large or shared data.",
    "Embed = andar rakho. Reference = id rakho."),

  // ---------- Managerial ----------
  D("Difference between unit, integration and functional testing", ["unit testing", "integration testing", "functional testing"], "manager",
    "Unit testing checks one small function or component alone. Integration testing checks if multiple parts work together, like API and database. Functional testing checks a full feature from the user's point of view.",
    "Unit = ek piece. Integration = pieces saath. Functional = poora feature."),

  D("Difference between Dev, FT, UAT, Pre-Prod and Production environments", ["dev", "ft", "uat", "pre-production", "production", "environments"], "manager",
    "Dev is where developers build and test. FT is functional testing by QA. UAT is where the client or business users test. Pre-production is a copy of production for final checks. Production is the live app for real users.",
    "Dev → QA → Client test → Final check → Live.",
    { tags: ["environment"] }),

  D("Difference between Agile and Waterfall", ["agile", "waterfall"], "manager",
    "Waterfall goes step by step, finishing each phase before the next. Agile works in short sprints, delivering small parts and adjusting to feedback.",
    "Waterfall = ek baar mein sab. Agile = chhote sprints."),
];

// Single concepts that pair with the diffs above
export const extraSingles = [
  { cat: "js", q: "What is bind()?", tags: ["bind", "bind method"], a: "bind creates a new function with this fixed to the object we pass. It doesn't run immediately, we call it later.", hi: "this fix karke naya function deta hai, baad mein chalao.", code: `const user = { name: "Vivek" };
function hi() { return "Hi " + this.name; }
const bound = hi.bind(user);
console.log(bound());`, out: "Hi Vivek" },
  { cat: "js", q: "What is call()?", tags: ["call", "call method"], a: "call runs a function immediately with this set to the object we pass, and arguments are passed one by one.", hi: "Turant chalao, this set karke.", code: `function hi(city) { return this.name + " from " + city; }
console.log(hi.call({ name: "Vivek" }, "Mumbai"));`, out: "Vivek from Mumbai" },
  { cat: "js", q: "What is apply()?", tags: ["apply", "apply method"], a: "apply is like call, it runs the function immediately with a given this, but takes the arguments as an array.", hi: "call jaisa, par arguments array mein.", code: `function hi(city) { return this.name + " from " + city; }
console.log(hi.apply({ name: "Vivek" }, ["Pune"]));`, out: "Vivek from Pune" },
  { cat: "js", q: "What is a shallow copy?", tags: ["shallow copy"], a: "A shallow copy copies only the top level of an object. Nested objects are still shared, so changing them changes the original. Spread and Object.assign make shallow copies.", hi: "Upar ki copy, andar ka data shared.", code: `const a = { addr: { city: "Mumbai" } };
const b = { ...a };
b.addr.city = "Pune";
console.log(a.addr.city);`, out: "Pune" },
  { cat: "js", q: "What is a deep copy?", tags: ["deep copy"], a: "A deep copy copies everything, including nested objects, so changes in the copy don't affect the original. We use structuredClone or a recursive function.", hi: "Poori nayi copy, andar tak.", code: `const a = { addr: { city: "Mumbai" } };
const b = structuredClone(a);
b.addr.city = "Pune";
console.log(a.addr.city);`, out: "Mumbai" },
  { cat: "react", q: "What is a controlled component?", tags: ["controlled component", "controlled"], a: "A controlled component is a form input whose value is stored in React state and updated through onChange.", hi: "Input ki value React state mein." },
  { cat: "react", q: "What is an uncontrolled component?", tags: ["uncontrolled component", "uncontrolled"], a: "An uncontrolled component keeps its value in the DOM, and we read it with a ref when needed.", hi: "Value DOM mein, ref se padho." },
  { cat: "react", q: "What is a class component?", tags: ["class component"], a: "A class component is an ES6 class that extends React.Component, uses this.state and lifecycle methods, and has a render method.", hi: "Purana class wala component." },
  { cat: "react", q: "What is a functional component?", tags: ["functional component"], a: "A functional component is a JavaScript function that returns JSX and uses hooks for state and side effects.", hi: "Function jo JSX return kare." },
  { cat: "node", q: "What is authentication?", tags: ["authentication"], a: "Authentication verifies who the user is, like login with email and password or OTP.", hi: "Tum kaun ho, ye check karna." },
  { cat: "node", q: "What is authorization?", tags: ["authorization"], a: "Authorization decides what a logged-in user is allowed to do, based on their role or permissions.", hi: "Tumhe kya karne ki permission hai." },
  { cat: "node", q: "What is hashing?", tags: ["hashing", "hash"], a: "Hashing converts data into a fixed string that can't be reversed. We use it to store passwords.", hi: "One-way. Wapas nahi aata." },
  { cat: "node", q: "What is encryption?", tags: ["encryption", "encrypt"], a: "Encryption converts data into an unreadable form using a key, and it can be decrypted back with the key.", hi: "Key se lock aur unlock." },
  { cat: "node", q: "What is encoding?", tags: ["encoding", "base64"], a: "Encoding changes data into another format, like Base64, so it can be transferred safely. Anyone can decode it, so it's not security.", hi: "Sirf format change, security nahi." },
  { cat: "node", q: "What is a stateless API?", tags: ["stateless api", "stateless"], a: "A stateless API doesn't remember anything between requests. Each request carries its own data, like a JWT token.", hi: "Server kuch yaad nahi rakhta." },
  { cat: "node", q: "What is a PUT API?", tags: ["put"], a: "PUT updates a resource by replacing it completely with the data we send.", hi: "Poora record replace." },
  { cat: "node", q: "What is a PATCH API?", tags: ["patch"], a: "PATCH updates only the fields we send, not the whole resource.", hi: "Sirf diye hue fields update." },
  { cat: "node", q: "What is concurrency?", tags: ["concurrency"], a: "Concurrency means handling many tasks by switching between them. Node does this with the event loop on one thread.", hi: "Ek thread, kai kaam switch karke." },
  { cat: "node", q: "What is parallelism?", tags: ["parallelism"], a: "Parallelism means running multiple tasks at the exact same time on different CPU cores, like with worker threads.", hi: "Kai cores pe ek saath." },
];
