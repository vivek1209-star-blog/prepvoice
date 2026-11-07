// Object + nested object programs
const user = `const user = {
  name: "Vivek",
  address: {
    city: "Mumbai",
    location: { area: "Andheri", pin: 400053 }
  }
};`;

export default [
  {
    q: "Search a value in an object and return the key", tags: ["search value in object", "find key by value", "object search", "search in object", "object value search"],
    a: "I'll loop through the keys and return the key whose value matches.",
    hi: "Har key ki value compare karo.",
    out: "city", cx: "O(n)", sc: "O(1)",
    ex: "for...in gives each key, and I compare its value with the one I'm searching for.",
    ways: [
      ["Loop (for...in)", `function findKey(obj, value) {
  for (const key in obj) {
    if (obj[key] === value) return key;
  }
  return null;
}
const user = { name: "Vivek", city: "Mumbai" };
console.log(findKey(user, "Mumbai"));`],
      ["Without loop", `const user = { name: "Vivek", city: "Mumbai" };
console.log(Object.keys(user).find(k => user[k] === "Mumbai") ?? null);`],
      ["Object.entries", `const user = { name: "Vivek", city: "Mumbai" };
const found = Object.entries(user).find(([, v]) => v === "Mumbai");
console.log(found ? found[0] : null);`],
    ],
    cross: [
      ["Only need true/false?", "Object.values(obj).includes(value)."],
      ["What if two keys have the same value?", "This returns the first. To get all, use filter instead of find."],
      ["Why not for...in on arrays?", "for...in gives keys as strings and can include inherited properties. For objects it's fine."],
    ],
  },
  {
    q: "Search a value in a nested object and return the key", tags: ["nested object search", "object inside object", "search nested object", "deep search", "nested object", "object in object"],
    a: "I'll check every key. If the value is another object, I call the same function inside it. That's recursion.",
    hi: "Andar object mila toh wahi function dobara (recursion).",
    out: "area", cx: "O(n) total keys", sc: "O(depth)",
    ex: "Recursion goes inside each nested object. The null check is needed because typeof null is also object.",
    ways: [
      ["Recursion", `function findKey(obj, value) {
  for (const key in obj) {
    if (obj[key] === value) return key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const found = findKey(obj[key], value);
      if (found) return found;
    }
  }
  return null;
}
${user}
console.log(findKey(user, "Andheri"));`],
      ["Without recursion (stack)", `function findKey(obj, value) {
  const stack = [obj];
  while (stack.length) {
    const current = stack.pop();
    for (const key in current) {
      if (current[key] === value) return key;
      if (typeof current[key] === "object" && current[key] !== null) stack.push(current[key]);
    }
  }
  return null;
}
${user}
console.log(findKey(user, "Andheri"));`],
      ["Return full path", `function findPath(obj, value, path = "") {
  for (const key in obj) {
    const p = path ? path + "." + key : key;
    if (obj[key] === value) return p;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const found = findPath(obj[key], value, p);
      if (found) return found;
    }
  }
  return null;
}
${user}
console.log(findPath(user, "Andheri").split(".").pop());`],
    ],
    cross: [
      ["Can you do it without recursion?", "Yes, using a stack and a while loop, shown in the second tab."],
      ["Why check obj[key] !== null?", "Because typeof null returns 'object', and we can't loop over null."],
      ["How do you return the full path like address.location.area?", "Pass the path string while going deeper, shown in the third tab."],
      ["Does it work for any depth?", "Yes, recursion goes as deep as the object is."],
      ["Time complexity?", "O(n), where n is the total number of keys at all levels."],
    ],
  },
  {
    q: "Get a value from a nested object by path (address.city)", tags: ["get value by path", "nested value", "get nested value", "lodash get", "access nested property"],
    a: "I'll split the path by dots and go one level deeper for each key.",
    hi: "Path ko dot se todo, ek ek level andar jao.",
    out: "Andheri\nundefined", cx: "O(depth)", sc: "O(1)",
    ex: "Optional chaining stops safely if any level is missing.",
    ways: [
      ["Loop", `function get(obj, path) {
  let current = obj;
  for (const key of path.split(".")) {
    if (current == null) return undefined;
    current = current[key];
  }
  return current;
}
${user}
console.log(get(user, "address.location.area"));
console.log(get(user, "address.zip.code"));`],
      ["Without loop (reduce)", `const get = (obj, path) => path.split(".").reduce((acc, key) => acc?.[key], obj);
${user}
console.log(get(user, "address.location.area"));
console.log(get(user, "address.zip.code"));`],
    ],
    cross: [["What if a key in the middle is missing?", "It returns undefined instead of throwing an error, because of the null check or ?."]],
  },
  {
    q: "Count all keys in a nested object", tags: ["count nested keys", "count keys nested", "nested object length"],
    a: "I'll count the keys at each level and add the count from inner objects using recursion.",
    hi: "Har level ki keys gino, andar wali bhi.",
    out: "6", cx: "O(n)", sc: "O(depth)",
    ex: "Every key adds one, and if its value is an object, I add its inner count too.",
    ways: [
      ["Recursion", `function countKeys(obj) {
  let count = 0;
  for (const key in obj) {
    count++;
    if (typeof obj[key] === "object" && obj[key] !== null) count += countKeys(obj[key]);
  }
  return count;
}
${user}
console.log(countKeys(user));`],
      ["Without loop", `const countKeys = obj => Object.values(obj).reduce(
  (n, v) => n + 1 + (typeof v === "object" && v !== null ? countKeys(v) : 0), 0);
${user}
console.log(countKeys(user));`],
    ],
    cross: [["Only top-level keys?", "Object.keys(obj).length."]],
  },
  {
    q: "Flatten a nested object into dot keys", tags: ["flatten object", "flatten nested object", "dot notation keys"],
    a: "I'll go through each key. If the value is an object, I flatten it with the key as a prefix, otherwise I save it.",
    hi: "Nested ko ek level ka bana do: address.city.",
    out: '{"name":"Vivek","address.city":"Mumbai","address.location.area":"Andheri","address.location.pin":400053}', cx: "O(n)", sc: "O(n)",
    ex: "The prefix grows as I go deeper, so the final key shows the full path.",
    ways: [
      ["Recursion", `function flattenObj(obj, prefix = "", res = {}) {
  for (const key in obj) {
    const newKey = prefix ? prefix + "." + key : key;
    if (typeof obj[key] === "object" && obj[key] !== null) flattenObj(obj[key], newKey, res);
    else res[newKey] = obj[key];
  }
  return res;
}
${user}
console.log(flattenObj(user));`],
      ["reduce", `const flattenObj = (obj, prefix = "") =>
  Object.entries(obj).reduce((res, [k, v]) => {
    const key = prefix ? prefix + "." + k : k;
    return typeof v === "object" && v !== null ? { ...res, ...flattenObj(v, key) } : { ...res, [key]: v };
  }, {});
${user}
console.log(flattenObj(user));`],
    ],
    cross: [["Where is this useful?", "Form libraries, query filters, and comparing nested data."]],
  },
  {
    q: "Count properties in an object", tags: ["count properties", "object length", "count keys"],
    a: "Object.keys gives an array of keys, and its length is the count.",
    hi: "Object.keys(obj).length.",
    out: "3", cx: "O(n)", sc: "O(n)",
    ex: "Object.keys returns only the object's own keys.",
    ways: [
      ["Without loop", `const user = { name: "Vivek", age: 30, city: "Mumbai" };
console.log(Object.keys(user).length);`],
      ["Loop", `const user = { name: "Vivek", age: 30, city: "Mumbai" };
let count = 0;
for (const key in user) {
  if (Object.hasOwn(user, key)) count++;
}
console.log(count);`],
    ],
    cross: [["Why hasOwn in the loop?", "for...in also gives inherited keys from the prototype; hasOwn skips them."]],
  },
  {
    q: "Deep clone an object", tags: ["deep clone", "clone object", "copy object", "deep copy program"],
    a: "I'll use recursion: copy primitives directly, and for objects and arrays, copy each value again.",
    hi: "Primitive seedha, object ho toh andar bhi copy.",
    out: "Mumbai", cx: "O(n)", sc: "O(n)",
    ex: "Changing the clone's nested city doesn't change the original, so it's a deep copy.",
    ways: [
      ["Recursion", `function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  const copy = Array.isArray(obj) ? [] : {};
  for (const key in obj) copy[key] = deepClone(obj[key]);
  return copy;
}
const a = { name: "Vivek", addr: { city: "Mumbai" } };
const b = deepClone(a);
b.addr.city = "Pune";
console.log(a.addr.city);`],
      ["structuredClone", `const a = { name: "Vivek", addr: { city: "Mumbai" } };
const b = structuredClone(a);
b.addr.city = "Pune";
console.log(a.addr.city);`],
      ["JSON (limited)", `const a = { name: "Vivek", addr: { city: "Mumbai" } };
const b = JSON.parse(JSON.stringify(a));
b.addr.city = "Pune";
console.log(a.addr.city);`],
    ],
    cross: [
      ["Problem with the JSON way?", "It loses functions, undefined and Date objects, and fails on circular references."],
      ["Why not spread?", "Spread is a shallow copy, nested objects are still shared."],
    ],
  },
  {
    q: "Compare two objects (deep equal)", tags: ["deep equal", "compare objects", "object equality", "objects equal"],
    a: "Same number of keys, and every value must be equal. If a value is an object, I compare it with recursion.",
    hi: "Keys same + values same, andar tak.",
    out: "true false", cx: "O(n)", sc: "O(depth)",
    ex: "Primitives are compared with ===, objects go into recursion.",
    ways: [
      ["Recursion", `function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}
console.log(deepEqual({ x: 1, y: { z: 2 } }, { x: 1, y: { z: 2 } }), deepEqual({ x: 1 }, { x: 2 }));`],
      ["JSON (simple cases)", `const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
console.log(deepEqual({ x: 1, y: { z: 2 } }, { x: 1, y: { z: 2 } }), deepEqual({ x: 1 }, { x: 2 }));`],
    ],
    cross: [["Problem with JSON.stringify compare?", "Key order matters: {a:1,b:2} and {b:2,a:1} would be different."]],
  },
  {
    q: "Merge two objects", tags: ["merge objects", "merge two objects"],
    a: "I'll use the spread operator. If a key is in both, the second object's value wins.",
    hi: "Spread se jodo.",
    out: '{"name":"Vivek","city":"Pune","role":"Dev"}', cx: "O(n)", sc: "O(n)",
    ex: "city came from b because b is spread last.",
    ways: [
      ["Without loop (spread)", `const a = { name: "Vivek", city: "Mumbai" };
const b = { city: "Pune", role: "Dev" };
console.log({ ...a, ...b });`],
      ["Object.assign", `const a = { name: "Vivek", city: "Mumbai" };
const b = { city: "Pune", role: "Dev" };
console.log(Object.assign({}, a, b));`],
      ["Loop", `const a = { name: "Vivek", city: "Mumbai" };
const b = { city: "Pune", role: "Dev" };
const res = {};
for (const k in a) res[k] = a[k];
for (const k in b) res[k] = b[k];
console.log(res);`],
    ],
    cross: [["Deep merge?", "Spread is shallow. For nested objects, merge recursively when both values are objects."]],
  },
  {
    q: "Deep merge two nested objects", tags: ["deep merge", "merge nested objects"],
    a: "If both values are objects, I merge them recursively. Otherwise the second value wins.",
    hi: "Dono object hain toh andar bhi merge.",
    out: '{"name":"Vivek","address":{"city":"Pune","pin":400053}}', cx: "O(n)", sc: "O(n)",
    ex: "Spread would replace the whole address. Deep merge keeps pin and updates city.",
    ways: [
      ["Recursion", `function deepMerge(a, b) {
  const res = { ...a };
  for (const key in b) {
    if (typeof b[key] === "object" && b[key] !== null && typeof a[key] === "object" && a[key] !== null) {
      res[key] = deepMerge(a[key], b[key]);
    } else {
      res[key] = b[key];
    }
  }
  return res;
}
const a = { name: "Vivek", address: { city: "Mumbai", pin: 400053 } };
const b = { address: { city: "Pune" } };
console.log(deepMerge(a, b));`],
    ],
    cross: [["What would { ...a, ...b } give here?", "address would become { city: 'Pune' } and pin would be lost."]],
  },
  {
    q: "Update a nested value without mutating (immutable update)", tags: ["immutable update", "update nested state", "update nested object"],
    a: "I'll spread each level I change, so the original object stays the same. This is how we update nested state in React.",
    hi: "Har level spread karo, original same rahe.",
    out: "Mumbai Pune", cx: "O(depth)", sc: "O(depth)",
    ex: "Only the changed path gets new objects; everything else is shared.",
    ways: [
      ["Spread", `const user = { name: "Vivek", address: { city: "Mumbai", pin: 400053 } };
const updated = { ...user, address: { ...user.address, city: "Pune" } };
console.log(user.address.city, updated.address.city);`],
      ["structuredClone", `const user = { name: "Vivek", address: { city: "Mumbai", pin: 400053 } };
const updated = structuredClone(user);
updated.address.city = "Pune";
console.log(user.address.city, updated.address.city);`],
    ],
    cross: [["Why not change user.address.city directly in React state?", "React won't detect the change because the reference is the same, so the UI won't update."]],
  },
  {
    q: "Convert an array to an object", tags: ["array to object", "convert array to object"],
    a: "I'll set each item's id as a key and name as the value.",
    hi: "id ko key bana do.",
    out: '{"1":"A","2":"B"}', cx: "O(n)", sc: "O(n)",
    ex: "Now I can find a user by id directly without looping.",
    ways: [
      ["Loop", `const users = [{ id: 1, name: "A" }, { id: 2, name: "B" }];
const obj = {};
for (const u of users) obj[u.id] = u.name;
console.log(obj);`],
      ["Without loop (reduce)", `const users = [{ id: 1, name: "A" }, { id: 2, name: "B" }];
console.log(users.reduce((acc, u) => ({ ...acc, [u.id]: u.name }), {}));`],
      ["Object.fromEntries", `const users = [{ id: 1, name: "A" }, { id: 2, name: "B" }];
console.log(Object.fromEntries(users.map(u => [u.id, u.name])));`],
    ],
    cross: [["Object to array?", "Object.entries(obj) gives [key, value] pairs."]],
  },
  {
    q: "Swap keys and values of an object", tags: ["invert object", "swap keys and values"],
    a: "Each value becomes a key and each key becomes its value.",
    hi: "Key ↔ value.",
    out: '{"Vivek":"name","Mumbai":"city"}', cx: "O(n)", sc: "O(n)",
    ex: "Object.entries gives pairs, I flip them and build a new object.",
    ways: [
      ["Loop", `const obj = { name: "Vivek", city: "Mumbai" };
const res = {};
for (const k in obj) res[obj[k]] = k;
console.log(res);`],
      ["Without loop", `const obj = { name: "Vivek", city: "Mumbai" };
console.log(Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k])));`],
    ],
    cross: [],
  },
  {
    q: "Filter an object by value", tags: ["filter object", "filter object by value"],
    a: "I'll convert the object to entries, filter them, and convert back.",
    hi: "entries → filter → fromEntries.",
    out: '{"maths":80,"science":90}', cx: "O(n)", sc: "O(n)",
    ex: "Only subjects with marks above 50 are kept.",
    ways: [
      ["Without loop", `const marks = { maths: 80, english: 40, science: 90 };
console.log(Object.fromEntries(Object.entries(marks).filter(([, v]) => v > 50)));`],
      ["Loop", `const marks = { maths: 80, english: 40, science: 90 };
const res = {};
for (const k in marks) if (marks[k] > 50) res[k] = marks[k];
console.log(res);`],
    ],
    cross: [],
  },
  {
    q: "Sum all values of an object", tags: ["sum object values", "sum of object values", "total salary object"],
    a: "I'll take the values and add them up.",
    hi: "Object.values + sum.",
    out: "210", cx: "O(n)", sc: "O(n)",
    ex: "Object.values gives an array of numbers to add.",
    ways: [
      ["Without loop", `const marks = { maths: 80, english: 40, science: 90 };
console.log(Object.values(marks).reduce((a, b) => a + b, 0));`],
      ["Loop", `const marks = { maths: 80, english: 40, science: 90 };
let total = 0;
for (const k in marks) total += marks[k];
console.log(total);`],
    ],
    cross: [],
  },
  {
    q: "Group objects by a property", tags: ["group by", "groupby", "group objects", "group by department"],
    a: "The property becomes the key, and I push each item into its group.",
    hi: "Property ko key, items array mein.",
    out: '{"IT":["Amit","Vivek"],"HR":["Riya"]}', cx: "O(n)", sc: "O(n)",
    ex: "If the group doesn't exist yet, I create an empty array, then push the name.",
    ways: [
      ["Loop", `const emps = [{ name: "Amit", dept: "IT" }, { name: "Riya", dept: "HR" }, { name: "Vivek", dept: "IT" }];
const grouped = {};
for (const e of emps) {
  if (!grouped[e.dept]) grouped[e.dept] = [];
  grouped[e.dept].push(e.name);
}
console.log(grouped);`],
      ["Without loop (reduce)", `const emps = [{ name: "Amit", dept: "IT" }, { name: "Riya", dept: "HR" }, { name: "Vivek", dept: "IT" }];
const grouped = emps.reduce((acc, e) => {
  (acc[e.dept] = acc[e.dept] || []).push(e.name);
  return acc;
}, {});
console.log(grouped);`],
    ],
    cross: [["Count per department instead?", "Use acc[e.dept] = (acc[e.dept] || 0) + 1."]],
  },
  {
    q: "Total salary per department", tags: ["salary per department", "sum by group", "department wise salary"],
    a: "Same as group by, but I add the salary instead of pushing names.",
    hi: "Group karke salary jodo.",
    out: '{"IT":120000,"HR":40000}', cx: "O(n)", sc: "O(k)",
    ex: "Each department key keeps a running total.",
    ways: [
      ["Without loop", `const emps = [{ dept: "IT", salary: 50000 }, { dept: "HR", salary: 40000 }, { dept: "IT", salary: 70000 }];
console.log(emps.reduce((acc, e) => ({ ...acc, [e.dept]: (acc[e.dept] || 0) + e.salary }), {}));`],
      ["Loop", `const emps = [{ dept: "IT", salary: 50000 }, { dept: "HR", salary: 40000 }, { dept: "IT", salary: 70000 }];
const res = {};
for (const e of emps) res[e.dept] = (res[e.dept] || 0) + e.salary;
console.log(res);`],
    ],
    cross: [],
  },
  {
    q: "Sort employees by salary", tags: ["sort by salary", "sort objects", "sort employees", "sort array of objects"],
    a: "I'll use sort with a compare function: b minus a for descending.",
    hi: "sort((a, b) => b.salary − a.salary).",
    out: '["B","C","A"]', cx: "O(n log n)", sc: "O(n)",
    ex: "I copy the array first because sort changes the original.",
    ways: [
      ["Without loop (sort)", `const emps = [{ name: "A", salary: 30000 }, { name: "B", salary: 50000 }, { name: "C", salary: 40000 }];
const sorted = [...emps].sort((a, b) => b.salary - a.salary);
console.log(sorted.map(e => e.name));`],
      ["Loop (bubble)", `const emps = [{ name: "A", salary: 30000 }, { name: "B", salary: 50000 }, { name: "C", salary: 40000 }];
const arr = [...emps];
for (let i = 0; i < arr.length; i++)
  for (let j = 0; j < arr.length - 1 - i; j++)
    if (arr[j].salary < arr[j + 1].salary) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
console.log(arr.map(e => e.name));`],
    ],
    cross: [
      ["Sort by name?", "a.name.localeCompare(b.name)."],
      ["Same salary, then by name?", "b.salary - a.salary || a.name.localeCompare(b.name)."],
    ],
  },
  {
    q: "Find the employee with the highest salary", tags: ["highest salary employee", "max salary", "highest paid"],
    a: "I'll keep the employee with the biggest salary while looping.",
    hi: "Sabse zyada salary wala rakho.",
    out: "B", cx: "O(n)", sc: "O(1)",
    ex: "Each employee is compared with the current best.",
    ways: [
      ["Loop", `const emps = [{ name: "A", salary: 30000 }, { name: "B", salary: 50000 }, { name: "C", salary: 40000 }];
let top = emps[0];
for (const e of emps) if (e.salary > top.salary) top = e;
console.log(top.name);`],
      ["Without loop", `const emps = [{ name: "A", salary: 30000 }, { name: "B", salary: 50000 }, { name: "C", salary: 40000 }];
console.log(emps.reduce((a, b) => (b.salary > a.salary ? b : a)).name);`],
    ],
    cross: [["Why not sort?", "Sorting is O(n log n); one pass is O(n)."]],
  },
  {
    q: "Search in an array of objects", tags: ["search array of objects", "filter objects", "search users", "search by name"],
    a: "I'll filter and check if the name includes the search text, ignoring case.",
    hi: "filter + includes + lowercase.",
    out: '["Vivek","Vikas"]', cx: "O(n)", sc: "O(n)",
    ex: "Lowercasing both makes the search case-insensitive.",
    ways: [
      ["Without loop (filter)", `const users = [{ id: 1, name: "Vivek" }, { id: 2, name: "Rahul" }, { id: 3, name: "Vikas" }];
const search = (list, text) => list.filter(u => u.name.toLowerCase().includes(text.toLowerCase()));
console.log(search(users, "vi").map(u => u.name));`],
      ["Loop", `const users = [{ id: 1, name: "Vivek" }, { id: 2, name: "Rahul" }, { id: 3, name: "Vikas" }];
const res = [];
for (const u of users) if (u.name.toLowerCase().includes("vi")) res.push(u.name);
console.log(res);`],
      ["Search all fields", `const users = [{ id: 1, name: "Vivek", city: "Pune" }, { id: 2, name: "Rahul", city: "Delhi" }, { id: 3, name: "Vikas", city: "Mumbai" }];
const search = (list, text) => list.filter(o => Object.values(o).some(v => String(v).toLowerCase().includes(text)));
console.log(search(users, "vi").map(u => u.name));`],
    ],
    cross: [["Only the first match?", "Use find instead of filter."]],
  },
  {
    q: "Remove duplicate objects by id", tags: ["duplicate objects", "unique objects", "remove duplicate objects"],
    a: "Set can't compare objects, so I'll track ids in a Set.",
    hi: "id ko Set mein track karo.",
    out: '[{"id":1},{"id":2}]', cx: "O(n)", sc: "O(n)",
    ex: "If the id was already seen, that object is skipped.",
    ways: [
      ["Loop", `const arr = [{ id: 1 }, { id: 2 }, { id: 1 }];
const seen = new Set(), res = [];
for (const o of arr) {
  if (!seen.has(o.id)) { seen.add(o.id); res.push(o); }
}
console.log(res);`],
      ["Without loop", `const arr = [{ id: 1 }, { id: 2 }, { id: 1 }];
console.log(arr.filter((o, i) => arr.findIndex(x => x.id === o.id) === i));`],
      ["Map", `const arr = [{ id: 1 }, { id: 2 }, { id: 1 }];
console.log([...new Map(arr.map(o => [o.id, o])).values()]);`],
    ],
    cross: [["Why doesn't new Set(arr) work?", "Each object is a different reference, so Set sees them all as unique."]],
  },
  {
    q: "Remove a property from an object", tags: ["remove property", "delete property", "remove key"],
    a: "I'll use rest destructuring so the original object isn't changed.",
    hi: "Destructuring se hatao.",
    out: '{"name":"Vivek","city":"Mumbai"}', cx: "O(n)", sc: "O(n)",
    ex: "password is taken out, and the rest goes into safeUser.",
    ways: [
      ["Destructuring", `const user = { name: "Vivek", password: "123", city: "Mumbai" };
const { password, ...safeUser } = user;
console.log(safeUser);`],
      ["delete on a copy", `const user = { name: "Vivek", password: "123", city: "Mumbai" };
const copy = { ...user };
delete copy.password;
console.log(copy);`],
    ],
    cross: [["Why not delete user.password directly?", "It mutates the original, which causes bugs in React state."]],
  },
];
