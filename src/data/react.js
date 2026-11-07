const E = (q, tags, a, hi, x = {}) => ({ q, tags, a, hi, ...x });

export default [
  E("What is React.js and how is it different from other libraries and frameworks?", ["react", "what is react", "react js"],
    "React is a JavaScript library for building user interfaces with reusable components. It only handles the view layer, unlike Angular which is a full framework. It uses a virtual DOM to update the UI efficiently.",
    "React sirf UI banane ki library hai. Routing, state ke liye alag libraries lagti hain."),

  E("What is JSX?", ["jsx"],
    "JSX lets us write HTML-like code inside JavaScript. The build tool converts it into React.createElement calls.",
    "JS ke andar HTML jaisa likhna. Browser ise directly nahi samajhta, Babel convert karta hai.",
    { code: `const name = "Vivek";
const el = <h1 className="title">Hello {name}</h1>;`, norun: true }),

  E("What is TSX?", ["tsx"],
    "TSX is JSX written in TypeScript files. It gives type checking for props and state.",
    "TypeScript wala JSX, types ke saath."),

  E("What is the Virtual DOM?", ["virtual dom", "vdom"],
    "The virtual DOM is a lightweight JavaScript copy of the real DOM. When state changes, React creates a new virtual DOM, compares it with the old one, and updates only the changed parts in the real DOM.",
    "Pehle copy mein badlav check karo, phir sirf zaroori part real DOM mein update karo."),

  E("What is the Shadow DOM?", ["shadow dom"],
    "Shadow DOM is a browser feature used by web components to keep an element's HTML and CSS isolated from the rest of the page. React doesn't use it, React uses the virtual DOM.",
    "Component ka CSS bahar leak na ho, uske liye browser feature."),

  E("What are the types of components in React?", ["types of components", "components", "component types"],
    "There are two types: functional components, which are plain functions using hooks, and class components, which use ES6 classes and lifecycle methods. Today we mostly use functional components.",
    "Functional (hooks wale) aur class components."),

  E("What is state in React?", ["state", "react state"],
    "State is data that belongs to a component and can change over time. When state changes, the component re-renders to show the new data.",
    "Component ki apni memory. Badli toh UI update."),

  E("What are props?", ["props", "properties"],
    "Props are inputs passed from a parent component to a child. They are read-only for the child.",
    "Parent se child ko data bhejna. Child usko change nahi kar sakta.",
    { code: `function Hello({ name }) {
  return <h1>Hello {name}</h1>;
}
<Hello name="Vivek" />`, norun: true }),

  E("What is prop drilling and how can you avoid it?", ["prop drilling"],
    "Prop drilling is passing props through many components that don't need them, just to reach a deep child. We avoid it with Context API, Redux, or component composition.",
    "Dada se pote tak beech wale sab se props pass karna. Context ya Redux se bachte hain."),

  E("How does re-rendering happen when state changes?", ["re-rendering", "rerender", "re render", "when component re-renders"],
    "When we call setState, React schedules a re-render. It runs the component again, creates a new virtual DOM, compares it, and updates only what changed. A component also re-renders when its parent re-renders or its context changes.",
    "setState → component dobara chalta hai → sirf badla hua part update."),

  E("What happens if you update state directly?", ["update state directly", "mutate state", "direct state update"],
    "If we change state directly, React doesn't know it changed, so the component won't re-render. We must always use the setter function with a new value.",
    "state.name = 'x' karne se UI update nahi hoga. setState use karo.",
    { code: `// Wrong
user.name = "Rahul";
// Right
setUser({ ...user, name: "Rahul" });`, norun: true }),

  E("How do you share data between sibling components?", ["sibling components", "share data between siblings", "lifting state up"],
    "We lift the state up to their common parent and pass it down as props, or use Context or Redux if it's needed in many places.",
    "State ko common parent mein rakho, dono ko props do."),

  E("What are styled components? Have you implemented theming?", ["styled components", "theming", "theme"],
    "Styled-components is a CSS-in-JS library where we write CSS inside components. For theming, we use a ThemeProvider. In my project, I implemented theming using CSS variables for dark and light mode.",
    "Component ke andar CSS. Theme ke liye CSS variables ya ThemeProvider."),

  E("What are React Server Components?", ["server components", "react server components", "rsc"],
    "Server Components run on the server and send ready HTML to the browser, so their JavaScript isn't shipped to the client. They can fetch data directly. They're used in Next.js App Router.",
    "Server pe render hote hain, browser pe kam JS jaata hai."),

  E("Explain the lifecycle methods of React components.", ["lifecycle", "lifecycle methods", "component lifecycle", "componentdidmount"],
    "A component has three phases: mounting, updating and unmounting. In class components, we use componentDidMount, componentDidUpdate and componentWillUnmount.",
    "Banna, badalna, hatna."),

  E("How do functional components handle lifecycle methods?", ["lifecycle in functional components", "useeffect lifecycle", "lifecycle hooks"],
    "With useEffect. Empty dependency array works like componentDidMount, dependencies work like componentDidUpdate, and the cleanup function works like componentWillUnmount.",
    "useEffect se teeno lifecycle handle hote hain.",
    { code: `useEffect(() => {
  console.log("mounted");
  return () => console.log("unmounted");
}, []);`, norun: true }),

  E("How do you handle side effects in class and functional components?", ["side effects", "side effect"],
    "In class components, we use lifecycle methods like componentDidMount. In functional components, we use the useEffect hook for API calls, timers and subscriptions.",
    "Class = lifecycle methods. Functional = useEffect."),

  E("What are React Hooks? Which hooks have you used?", ["hooks", "react hooks"],
    "Hooks are functions that let functional components use state and other React features. I've used useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer and custom hooks.",
    "Functional component ko state aur features dene wale functions."),

  E("What is useState?", ["usestate"],
    "useState adds state to a functional component. It returns the current value and a function to update it.",
    "Component mein value store karne ka hook.",
    { code: `const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>{count}</button>`, norun: true }),

  E("What is useEffect?", ["useeffect"],
    "useEffect runs side effects after the component renders, like API calls or timers. The dependency array decides when it runs, and the return function is for cleanup.",
    "Render ke baad kaam chalane ka hook.",
    { code: `useEffect(() => {
  fetch("/api/users").then(r => r.json()).then(setUsers);
}, []);`, norun: true }),

  E("What is the useEffect dependency array?", ["dependency array", "useeffect dependency"],
    "No array means the effect runs after every render. An empty array means it runs once after mount. With values, it runs when those values change.",
    "Kuch nahi = har baar. [] = ek baar. [x] = x badle tab."),

  E("What is useRef?", ["useref", "ref"],
    "useRef stores a value that stays between renders but doesn't cause a re-render when it changes. It's also used to access DOM elements, like focusing an input.",
    "Value yaad rakho bina re-render ke, ya DOM element pakdo.",
    { code: `const inputRef = useRef(null);
<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus</button>`, norun: true }),

  E("What is useContext?", ["usecontext", "context"],
    "useContext reads a value from a React Context without passing props through every level.",
    "Context ki value seedha lo, props pass kiye bina."),

  E("What is useReducer?", ["usereducer", "reducer"],
    "useReducer manages complex state with a reducer function and actions, similar to Redux. It's better than useState when state has many related fields.",
    "Complex state ke liye mini Redux.",
    { code: `function reducer(state, action) {
  if (action.type === "inc") return { count: state.count + 1 };
  return state;
}
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: "inc" });`, norun: true }),

  E("What is useMemo?", ["usememo"],
    "useMemo caches a calculated value and recalculates only when its dependencies change. It's used for expensive calculations.",
    "Heavy calculation ka result yaad rakho.",
    { code: `const filtered = useMemo(
  () => users.filter(u => u.name.includes(search)),
  [users, search]
);`, norun: true }),

  E("What is useCallback?", ["usecallback"],
    "useCallback caches a function so it keeps the same reference between renders. It's useful when passing functions to memoized child components.",
    "Function ka same reference rakho, taaki child bekaar re-render na ho."),

  E("What are the rules of Hooks?", ["rules of hooks", "hooks rules"],
    "Call hooks only at the top level, not inside loops, conditions or nested functions. And call them only inside React function components or custom hooks.",
    "Hooks hamesha top pe, if/loop ke andar nahi."),

  E("What are custom Hooks? How have you used them?", ["custom hook", "custom hooks"],
    "A custom hook is a function starting with use that reuses stateful logic. In my project, every module has a hook like useResidents that fetches data and returns data, loading and actions.",
    "Logic ko reuse karne ke liye apna hook.",
    { code: `function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url).then(r => r.json()).then(d => {
      setData(d);
      setLoading(false);
    });
  }, [url]);
  return { data, loading };
}`, norun: true, ex: "Koi bhi component useFetch(url) call karke data aur loading le sakta hai." }),

  E("What is a Higher-Order Component (HOC)?", ["hoc", "higher order component"],
    "A HOC is a function that takes a component and returns a new component with extra features, like adding authentication checks. Today, custom hooks are often used instead.",
    "Component lo, extra power add karo, naya component do.",
    { code: `function withAuth(Component) {
  return function (props) {
    const user = useAuth();
    return user ? <Component {...props} /> : <Login />;
  };
}`, norun: true }),

  E("What is the React reconciliation process?", ["reconciliation", "diffing", "fiber"],
    "Reconciliation is how React compares the new virtual DOM with the old one and decides the minimum changes for the real DOM. It uses keys to match list items. React Fiber is the engine that does this work.",
    "Purana vs naya compare karke kam se kam DOM changes."),

  E("What is the Context API?", ["context api", "createcontext"],
    "Context API shares data like theme or logged-in user across components without prop drilling. We create a context, wrap with a Provider, and read it with useContext.",
    "Global data bina props pass kiye.",
    { code: `const ThemeContext = createContext("light");
<ThemeContext.Provider value="dark"><App /></ThemeContext.Provider>
const theme = useContext(ThemeContext);`, norun: true }),

  E("What is Redux?", ["redux"],
    "Redux is a state management library that keeps global state in one store. Components dispatch actions, reducers update the state, and components read it with selectors.",
    "Poore app ka data ek central store mein."),

  E("What is Redux Toolkit and how does it simplify Redux?", ["redux toolkit", "rtk", "createslice", "createasyncthunk"],
    "Redux Toolkit is the official way to write Redux. createSlice creates actions and reducers together, createAsyncThunk handles API calls, and Immer lets us update state easily. It removes most boilerplate.",
    "Redux ka kam code wala version."),

  E("What is middleware in Redux?", ["redux middleware", "thunk", "redux thunk", "redux saga"],
    "Middleware sits between dispatching an action and the reducer. It's used for async work and logging. Examples are Redux Thunk and Redux Saga.",
    "Action aur reducer ke beech ka step, API calls ke liye."),

  E("How would you implement global state without Redux?", ["global state without redux", "state management without redux", "zustand"],
    "Using Context API with useReducer, or lightweight libraries like Zustand. For server data, React Query.",
    "Context + useReducer, ya Zustand."),

  E("What is a Synthetic Event in React?", ["synthetic event", "synthetic events"],
    "A Synthetic Event is React's wrapper around the browser's native event. It works the same across all browsers.",
    "React ka cross-browser event wrapper."),

  E("How do you pass arguments to event handlers?", ["pass arguments to event handler", "event handler arguments", "onclick with parameter"],
    "We use an arrow function inside the handler, like onClick={() => deleteUser(id)}.",
    "Arrow function mein wrap karke.",
    { code: `<button onClick={() => deleteUser(user.id)}>Delete</button>`, norun: true }),

  E("How do you handle dynamic routing in React?", ["dynamic routing", "route params", "useparams"],
    "With React Router, we define a route with a parameter like /users/:id, and read it in the component with useParams.",
    "URL mein :id, aur useParams se padho.",
    { code: `<Route path="/users/:id" element={<UserDetail />} />
const { id } = useParams();`, norun: true }),

  E("What is React Router?", ["react router", "routing"],
    "React Router handles navigation in a single-page app. It maps URLs to components without reloading the page.",
    "URL ke hisaab se component dikhana, bina page reload."),

  E("How do you create protected routes?", ["protected route", "private route", "route guard"],
    "We create a wrapper component that checks if the user is logged in. If yes, it shows the page, otherwise it redirects to login.",
    "Login nahi hai toh login page pe bhejo.",
    { code: `function ProtectedRoute({ children }) {
  const user = useAuth();
  return user ? children : <Navigate to="/login" />;
}`, norun: true }),

  E("How do you manage form validation in React?", ["form validation", "validation in react", "react hook form"],
    "For small forms, I validate on change or submit with regex and show error messages. For bigger forms, I use React Hook Form with a schema library like Yup or Zod.",
    "Chhota form = khud validate. Bada form = React Hook Form.",
    { code: `const [email, setEmail] = useState("");
const [error, setError] = useState("");
const submit = e => {
  e.preventDefault();
  if (!/^\\S+@\\S+\\.\\S+$/.test(email)) return setError("Invalid email");
  setError("");
};`, norun: true }),

  E("How would you implement lazy loading with routes?", ["lazy loading", "react.lazy", "suspense", "lazy loading routes"],
    "Using React.lazy to import the page component and wrapping routes in Suspense with a loader. The page code downloads only when the user visits it.",
    "Page tabhi load ho jab user uspe jaaye.",
    { code: `const Dashboard = React.lazy(() => import("./Dashboard"));
<Suspense fallback={<Loader />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Suspense>`, norun: true }),

  E("How do you optimize forms with hundreds of input fields?", ["large forms", "optimize forms", "hundreds of fields"],
    "Use uncontrolled inputs with React Hook Form so typing doesn't re-render the whole form, split the form into sections, and memoize field components.",
    "Har keystroke pe poora form re-render nahi hona chahiye."),

  E("How would you implement a multi-step form?", ["multi step form", "wizard form", "stepper form"],
    "Keep a step number in state and the form data in one object. Show the component for the current step, validate before moving next, and submit at the end.",
    "step state + ek data object + har step pe validation.",
    { code: `const [step, setStep] = useState(1);
const [data, setData] = useState({});
return (
  <>
    {step === 1 && <Personal data={data} setData={setData} />}
    {step === 2 && <Address data={data} setData={setData} />}
    <button onClick={() => setStep(step + 1)}>Next</button>
  </>
);`, norun: true }),

  E("What are keys in React and why are they important?", ["keys", "key prop", "keys in list"],
    "Keys give each list item a unique identity, so React knows which item changed, was added or removed. We should use a unique id, not the array index.",
    "List item ka unique ID, taaki React sahi item update kare."),

  E("Why shouldn't we use index as key?", ["index as key"],
    "If the list is reordered or items are added or removed, the index changes, so React may update the wrong item and cause bugs.",
    "Order badla toh index badla, React confuse."),

  E("What is React.memo?", ["react.memo", "react memo", "memo"],
    "React.memo wraps a component and skips re-rendering if its props haven't changed.",
    "Props same hain toh component dobara render nahi hoga.",
    { code: `const UserCard = React.memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});`, norun: true }),

  E("What is a PureComponent?", ["purecomponent", "pure component"],
    "PureComponent is a class component that re-renders only when props or state change, using a shallow comparison. It's the class version of React.memo.",
    "Class component ka React.memo."),

  E("What is virtualization in React?", ["virtualization", "react window", "windowing"],
    "Virtualization means rendering only the rows visible on screen instead of the whole list. Libraries like react-window do this, so long lists stay fast.",
    "10,000 rows mein se sirf dikhne wali 20 render karo."),

  E("How do you optimize rendering of large lists?", ["large lists", "optimize large list", "render large list"],
    "Use pagination or infinite scroll, virtualization with react-window, stable unique keys, and React.memo for list items.",
    "Kam data, kam DOM, memo rows."),

  E("How do you avoid unnecessary re-rendering?", ["unnecessary re-render", "avoid re-render", "prevent re-render"],
    "Use React.memo for child components, useCallback and useMemo for props, keep state close to where it's used, and avoid creating new objects inside JSX.",
    "memo + useCallback + state local rakho."),

  E("What are Error Boundaries?", ["error boundary", "error boundaries"],
    "An Error Boundary is a class component that catches errors in its child components while rendering and shows a fallback UI instead of crashing the whole app.",
    "Ek component crash ho toh poora app white screen na ho."),

  E("How do you handle errors in async operations in React?", ["async errors react", "error handling react", "api error handling"],
    "With try/catch in async functions, storing the error in state and showing a message. Error boundaries don't catch async errors, so we handle them manually.",
    "try/catch + error state + message dikhao.",
    { code: `const [error, setError] = useState(null);
async function load() {
  try {
    const res = await axios.get("/api/users");
    setUsers(res.data);
  } catch (e) {
    setError("Failed to load users");
  }
}`, norun: true }),

  E("How do you fetch data in React?", ["fetch data", "data fetching", "api call in react"],
    "Inside useEffect using fetch or axios, with loading and error states. For caching and refetching, React Query is better.",
    "useEffect mein API call + loading + error.",
    { code: `useEffect(() => {
  setLoading(true);
  axios.get("/api/users")
    .then(res => setUsers(res.data))
    .catch(() => setError("Error"))
    .finally(() => setLoading(false));
}, []);`, norun: true }),

  E("What is Axios?", ["axios"],
    "Axios is a library for making HTTP requests. It automatically converts JSON, supports interceptors for adding tokens, and handles errors for 4xx and 5xx responses.",
    "API call karne ki popular library."),

  E("How do you securely store API keys in React?", ["api keys", "store api keys", "secret keys react"],
    "We can't fully hide secrets in React because frontend code is public. Real secret keys should stay on the backend, and the frontend calls our backend. Only public keys go in .env with the VITE_ prefix.",
    "Frontend mein secret safe nahi. Secret backend pe rakho."),

  E("How would you implement retry logic for failed API requests?", ["retry logic", "retry api", "retry"],
    "Use a loop or an axios interceptor that retries a failed request a few times with a delay. React Query also has built-in retry.",
    "Fail hua toh 2-3 baar dobara try, beech mein wait.",
    { code: `async function fetchWithRetry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try { return await fn(); }
    catch (e) { if (i === retries - 1) throw e; }
  }
}`, norun: true }),

  E("What are Fragments?", ["fragment", "fragments", "react.fragment"],
    "Fragments let us return multiple elements without adding an extra div to the DOM. We write <> </>.",
    "Extra div ke bina multiple elements return karo."),

  E("What is React.StrictMode?", ["strictmode", "strict mode react", "react.strictmode"],
    "StrictMode is a development-only tool that finds potential problems. It runs effects twice in development to catch missing cleanups. It doesn't affect production.",
    "Sirf development mein bugs pakadne ke liye. Isliye API call do baar dikhti hai."),

  E("How do you identify and fix memory leaks in React?", ["memory leak react", "react memory leak"],
    "Memory leaks usually come from timers, event listeners or API calls not cleaned up after unmount. I fix them by returning a cleanup function from useEffect. I check with the Chrome Memory tab.",
    "useEffect cleanup mein timer/listener hatao.",
    { code: `useEffect(() => {
  const id = setInterval(loadData, 5000);
  return () => clearInterval(id);
}, []);`, norun: true }),

  E("How do you build React applications for production?", ["production build", "build react", "npm run build"],
    "We run npm run build. It creates an optimized, minified bundle in the dist or build folder, which we deploy on a server or platforms like Vercel.",
    "npm run build → dist folder → deploy."),

  E("What is Webpack?", ["webpack"],
    "Webpack is a module bundler. It combines all JavaScript, CSS and asset files into optimized bundles for the browser.",
    "Saari files ko bundle banata hai."),

  E("What is Babel?", ["babel"],
    "Babel is a JavaScript compiler. It converts JSX and modern JavaScript into code that older browsers can understand.",
    "Naya JS aur JSX ko purane browser ke liye convert karta hai."),

  E("How do you configure Webpack for React?", ["configure webpack", "webpack config"],
    "We set the entry file, output folder, babel-loader for JSX, css-loader and style-loader for CSS, and HtmlWebpackPlugin for the HTML. Today, tools like Vite do this setup for us.",
    "entry, output, loaders, plugins. Ab Vite khud kar deta hai."),

  E("How do you optimize a React application for performance?", ["optimize react", "react performance", "performance optimization"],
    "Lazy loading routes, React.memo, useMemo and useCallback, virtualization for long lists, debouncing search, caching API data with React Query, and optimizing images.",
    "Lazy load + memo + virtualization + caching."),

  E("What is the purpose of .env files in React?", [".env", "env file", "environment variables react"],
    "A .env file stores configuration like API URLs for different environments. In Vite, variables must start with VITE_. They're public in the build, so no secrets.",
    "Config alag rakho. Frontend env public hota hai."),

  E("What is lifting state up?", ["lift state up", "lifting state"],
    "Lifting state up means moving shared state to the closest common parent, so multiple children can use it through props.",
    "Shared state parent mein rakho."),

  E("What is conditional rendering?", ["conditional rendering"],
    "Showing different UI based on a condition, using if, the ternary operator, or &&.",
    "Condition ke hisaab se UI dikhana.",
    { code: `{isLoggedIn ? <Dashboard /> : <Login />}
{error && <p>{error}</p>}`, norun: true }),

  E("What is React Query?", ["react query", "tanstack query"],
    "React Query manages server data. It handles caching, background refetching, loading and error states, and retries automatically.",
    "API data ko cache aur manage karne wali library."),

  E("What is useLayoutEffect?", ["uselayouteffect"],
    "useLayoutEffect runs after the DOM updates but before the browser paints. It's used when we need to measure layout. useEffect runs after paint.",
    "Paint se pehle chalta hai, measure karne ke liye."),

  E("What are portals in React?", ["portal", "portals", "createportal"],
    "Portals render a component outside its parent DOM element, like modals and tooltips, using createPortal.",
    "Modal ko body mein render karna."),

  E("What is SSR, CSR and SSG?", ["ssr", "csr", "ssg", "server side rendering", "client side rendering"],
    "CSR renders the page in the browser with JavaScript. SSR renders HTML on the server for each request, which is better for SEO. SSG builds HTML at build time, which is the fastest. Next.js supports all three.",
    "CSR = browser mein. SSR = server pe har request. SSG = pehle se bana hua."),

  E("What is Next.js?", ["next.js", "nextjs", "next js"],
    "Next.js is a React framework that adds server-side rendering, static generation, file-based routing and API routes.",
    "React ka framework with SSR aur routing."),

  E("What is hydration?", ["hydration"],
    "Hydration is when React attaches event handlers to HTML that was already rendered on the server, making it interactive.",
    "Server ki HTML ko interactive banana."),
];
