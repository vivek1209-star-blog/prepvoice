// Polyfills + advanced JS programs
export default [
  {
    q: "Implement debounce", tags: ["implement debounce", "debounce program", "write debounce", "debounce function"],
    a: "I return a function that clears the old timer and starts a new one on every call.",
    hi: "Har call pe purana timer cancel.",
    out: "Search: viv", cx: "O(1) per call", sc: "O(1)",
    ex: "The timer lives in a closure, so each call can cancel the previous one. Only the last call runs.",
    ways: [
      ["Code", `function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
const search = debounce(q => console.log("Search:", q), 100);
search("v");
search("vi");
search("viv");`],
    ],
    cross: [
      ["Why use apply?", "To keep the original this and pass all arguments."],
      ["Where does the timer live?", "In a closure, so every call shares the same timer."],
      ["How do you use it in React?", "Create it once with useMemo or useRef, and clear the timer on unmount."],
      ["Debounce vs throttle?", "Debounce waits for the user to stop; throttle runs at most once per interval."],
    ],
  },
  {
    q: "Implement throttle", tags: ["implement throttle", "throttle program", "write throttle", "throttle function"],
    a: "I save the last run time and only run again if enough time has passed.",
    hi: "Time limit se pehle dobara nahi.",
    out: "Run 1", cx: "O(1)", sc: "O(1)",
    ex: "Calls within the time limit are ignored.",
    ways: [
      ["Timestamp", `function throttle(fn, limit) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      fn.apply(this, args);
    }
  };
}
const log = throttle(n => console.log("Run", n), 1000);
log(1); log(2); log(3);`],
      ["Flag + setTimeout", `function throttle(fn, limit) {
  let waiting = false;
  return (...args) => {
    if (waiting) return;
    fn(...args);
    waiting = true;
    setTimeout(() => (waiting = false), limit);
  };
}
const log = throttle(n => console.log("Run", n), 1000);
log(1); log(2); log(3);`],
    ],
    cross: [["Where do you use throttle?", "Scroll, resize, and mouse move events."]],
  },
  {
    q: "Polyfill for map()", tags: ["map polyfill", "custom map", "polyfill map", "implement map"],
    a: "I add a function to Array.prototype that loops and pushes the callback's result.",
    hi: "Loop + callback(item, index, array).",
    out: "[2,4,6]", cx: "O(n)", sc: "O(n)",
    ex: "this is the array, so I use a normal function, not an arrow function.",
    ways: [["Code", `Array.prototype.myMap = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(cb(this[i], i, this));
  }
  return res;
};
console.log([1, 2, 3].myMap(x => x * 2));`]],
    cross: [
      ["Why not an arrow function?", "Arrow functions don't have their own this, so we wouldn't get the array."],
      ["What arguments does the callback get?", "element, index and the whole array."],
    ],
  },
  {
    q: "Polyfill for filter()", tags: ["filter polyfill", "custom filter", "polyfill filter", "implement filter"],
    a: "I push only the items where the callback returns true.",
    hi: "true aaye toh push.",
    out: "[2,4]", cx: "O(n)", sc: "O(n)",
    ex: "Only even numbers pass the condition.",
    ways: [["Code", `Array.prototype.myFilter = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) res.push(this[i]);
  }
  return res;
};
console.log([1, 2, 3, 4].myFilter(x => x % 2 === 0));`]],
    cross: [],
  },
  {
    q: "Polyfill for reduce()", tags: ["reduce polyfill", "custom reduce", "polyfill reduce", "implement reduce"],
    a: "If there's no initial value, I start with the first element. Then I pass the accumulator through each item.",
    hi: "Initial nahi toh pehla element.",
    out: "10", cx: "O(n)", sc: "O(1)",
    ex: "The accumulator keeps the running result and is returned at the end.",
    ways: [["Code", `Array.prototype.myReduce = function (cb, initial) {
  let acc = initial !== undefined ? initial : this[0];
  let start = initial !== undefined ? 0 : 1;
  for (let i = start; i < this.length; i++) {
    acc = cb(acc, this[i], i, this);
  }
  return acc;
};
console.log([1, 2, 3, 4].myReduce((a, b) => a + b, 0));`]],
    cross: [["Empty array without initial value?", "The real reduce throws a TypeError, so I'd add that check."]],
  },
  {
    q: "Polyfill for forEach()", tags: ["foreach polyfill", "custom foreach"],
    a: "I loop and call the callback for each item. It returns nothing.",
    hi: "Sirf callback chalao.",
    out: "1\n2", cx: "O(n)", sc: "O(1)",
    ex: "Unlike map, forEach doesn't build a new array.",
    ways: [["Code", `Array.prototype.myForEach = function (cb) {
  for (let i = 0; i < this.length; i++) cb(this[i], i, this);
};
[1, 2].myForEach(x => console.log(x));`]],
    cross: [],
  },
  {
    q: "Polyfill for Promise.all()", tags: ["promise.all polyfill", "custom promise all", "implement promise.all"],
    a: "I return a new Promise, store each result at its index, and resolve when all are done. If any fails, I reject.",
    hi: "Index pe result rakho, sab aaye toh resolve.",
    out: "[1,2,3]", cx: "O(n)", sc: "O(n)",
    ex: "Saving at index i keeps the original order even if promises finish at different times.",
    ways: [["Code", `function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        results[i] = val;
        done++;
        if (done === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}
myPromiseAll([1, Promise.resolve(2), 3]).then(r => console.log(r));`]],
    cross: [
      ["Why results[i] and not push?", "push would put results in finishing order, not the original order."],
      ["Why Promise.resolve(p)?", "So normal values like 1 also work."],
    ],
  },
  {
    q: "Polyfill for bind()", tags: ["bind polyfill", "custom bind", "implement bind"],
    a: "I return a new function that calls the original with the saved this, using apply.",
    hi: "Naya function jo apply se call kare.",
    out: "Vivek from Mumbai", cx: "O(1)", sc: "O(1)",
    ex: "ctx becomes this, and arguments from both calls are joined.",
    ways: [["Code", `Function.prototype.myBind = function (ctx, ...args) {
  const fn = this;
  return function (...more) {
    return fn.apply(ctx, [...args, ...more]);
  };
};
function hi(city) { return this.name + " from " + city; }
console.log(hi.myBind({ name: "Vivek" })("Mumbai"));`]],
    cross: [],
  },
  {
    q: "Implement memoize", tags: ["implement memoize", "memoize program", "memoization program"],
    a: "I store results in a cache object using the argument as the key.",
    hi: "Cache mein result rakho.",
    out: "calc\n25 25", cx: "O(1) after first call", sc: "O(n)",
    ex: "The second call returns from the cache without calculating again.",
    ways: [["Code", `function memoize(fn) {
  const cache = {};
  return function (n) {
    if (n in cache) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}
const square = memoize(n => { console.log("calc"); return n * n; });
console.log(square(5), square(5));`]],
    cross: [["Multiple arguments?", "Use JSON.stringify(args) as the cache key."]],
  },
  {
    q: "Implement curry", tags: ["implement curry", "curry program", "sum(1)(2)(3)", "infinite currying"],
    a: "I return functions one by one until all arguments are collected.",
    hi: "Sab arguments aane tak function return karo.",
    out: "6\n6", cx: "O(n)", sc: "O(n)",
    ex: "fn.length is the number of arguments the function needs.",
    ways: [
      ["Generic curry", `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
  };
}
const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));`],
      ["Infinite sum(1)(2)(3)()", `const sum = a => b => (b === undefined ? a : sum(a + b));
console.log(sum(1)(2)(3)());
console.log(sum(2)(4)());`],
    ],
    cross: [],
  },
  {
    q: "Implement an event emitter", tags: ["event emitter", "pub sub", "on emit"],
    a: "I keep an object of event names with a list of listeners. on adds, emit calls them, off removes.",
    hi: "Event name → listeners list.",
    out: "Hello Vivek", cx: "O(k) per emit", sc: "O(n)",
    ex: "emit loops through all listeners of that event and calls them with the data.",
    ways: [["Code", `class EventEmitter {
  constructor() { this.events = {}; }
  on(name, fn) {
    (this.events[name] = this.events[name] || []).push(fn);
  }
  emit(name, data) {
    (this.events[name] || []).forEach(fn => fn(data));
  }
  off(name, fn) {
    this.events[name] = (this.events[name] || []).filter(f => f !== fn);
  }
}
const e = new EventEmitter();
e.on("greet", n => console.log("Hello " + n));
e.emit("greet", "Vivek");`]],
    cross: [],
  },
  {
    q: "Valid parentheses", tags: ["valid parentheses", "balanced brackets", "brackets"],
    a: "I use a stack. Push opening brackets, and for a closing one, the top of the stack must match.",
    hi: "Stack: open push, close pe match check.",
    out: "true false", cx: "O(n)", sc: "O(n)",
    ex: "At the end the stack must be empty, meaning every bracket was closed.",
    ways: [["Stack", `function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if ("([{".includes(ch)) stack.push(ch);
    else if (stack.pop() !== pairs[ch]) return false;
  }
  return stack.length === 0;
}
console.log(isValid("({[]})"), isValid("(]"));`]],
    cross: [],
  },
  {
    q: "Longest substring without repeating characters", tags: ["longest substring", "sliding window"],
    a: "I use a sliding window. When a character repeats, I move the left side past its last position.",
    hi: "Repeat mila toh window ka left aage.",
    out: "3", cx: "O(n)", sc: "O(k)",
    ex: "The window always has unique characters, and best keeps the biggest size.",
    ways: [["Sliding window", `function longestUnique(s) {
  const last = {};
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    if (last[s[right]] >= left) left = last[s[right]] + 1;
    last[s[right]] = right;
    best = Math.max(best, right - left + 1);
  }
  return best;
}
console.log(longestUnique("abcabcbb"));`]],
    cross: [],
  },
];
