// Programs — a = approach bolo, code = simple best solution, alt = doosra tareeka, ex = code explain (bolne layak), hi = Hinglish logic
const P = (q, tags, a, hi, code, out, ex, x = {}) => ({ q, tags, a, hi, code, out, ex, type: "program", ...x });

export default [
  // ---------- Strings ----------
  P("Reverse a string", ["reverse string", "reverse a string"],
    "I'll loop from the last character to the first and build a new string.",
    "Last se first tak chalo aur naya string banao.",
`function reverse(str) {
  let res = "";
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i];
  }
  return res;
}
console.log(reverse("hello"));`, "olleh",
    "The loop starts from the last index and adds each character to res, so the string comes out reversed.",
    { alt: `const reverse = s => s.split("").reverse().join("");
console.log(reverse("hello"));`, cx: "O(n)" }),

  P("Check if a string is a palindrome", ["palindrome", "palindrome string", "check palindrome"],
    "I'll compare characters from both ends moving towards the middle. If any pair doesn't match, it's not a palindrome.",
    "Dono side se compare karo, beech tak.",
`function isPalindrome(str) {
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}
console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));`, "true\nfalse",
    "left starts at the beginning, right at the end. If they ever differ, I return false, otherwise true.",
    { alt: `const isPalindrome = s => s === s.split("").reverse().join("");
console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));`, cx: "O(n)" }),

  P("Count vowels in a string", ["count vowels", "vowels"],
    "I'll loop through each character and check if it's a vowel.",
    "Har character check karo ki aeiou mein hai ya nahi.",
`function countVowels(str) {
  let count = 0;
  for (const ch of str.toLowerCase()) {
    if ("aeiou".includes(ch)) count++;
  }
  return count;
}
console.log(countVowels("JavaScript"));`, "3",
    "I lowercase the string so capital vowels also count, then increase count for every vowel.",
    { alt: `const countVowels = s => (s.match(/[aeiou]/gi) || []).length;
console.log(countVowels("JavaScript"));`, cx: "O(n)" }),

  P("Count frequency of each character", ["character frequency", "count characters", "char count", "frequency of characters"],
    "I'll use an object. For each character, if it exists I add one, otherwise I set it to one.",
    "Object mein har character ka count rakho.",
`function charCount(str) {
  const count = {};
  for (const ch of str) {
    count[ch] = (count[ch] || 0) + 1;
  }
  return count;
}
console.log(charCount("hello"));`, '{"h":1,"e":1,"l":2,"o":1}',
    "count[ch] || 0 gives zero the first time, then I add one each time the character appears.",
    { cx: "O(n)" }),

  P("Find duplicate characters in a string", ["duplicate characters", "repeated characters"],
    "First I count each character, then return the ones with count more than one.",
    "Count karo, jinka count 1 se zyada wahi duplicate.",
`function duplicateChars(str) {
  const count = {};
  for (const ch of str) count[ch] = (count[ch] || 0) + 1;
  return Object.keys(count).filter(ch => count[ch] > 1);
}
console.log(duplicateChars("programming"));`, '["r","g","m"]',
    "After counting, filter keeps only characters that appear more than once.",
    { cx: "O(n)" }),

  P("Find the first non-repeating character", ["first non repeating character", "first unique character"],
    "I'll count all characters first, then loop the string again and return the first one with count one.",
    "Pehle count, phir order mein dekho jiska count 1 hai.",
`function firstUnique(str) {
  const count = {};
  for (const ch of str) count[ch] = (count[ch] || 0) + 1;
  for (const ch of str) {
    if (count[ch] === 1) return ch;
  }
  return null;
}
console.log(firstUnique("aabbcdd"));`, "c",
    "The second loop goes in the original order, so I get the first unique character.",
    { cx: "O(n)" }),

  P("Check if two strings are anagrams", ["anagram", "anagrams"],
    "I'll sort the characters of both strings and compare. If they're equal, they're anagrams.",
    "Dono ko sort karke compare karo.",
`function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  return a.split("").sort().join("") === b.split("").sort().join("");
}
console.log(isAnagram("listen", "silent"));
console.log(isAnagram("hello", "world"));`, "true\nfalse",
    "If lengths differ, I return false early. Otherwise sorted strings must be the same.",
    { cx: "O(n log n)" }),

  P("Remove duplicate characters from a string", ["remove duplicate characters"],
    "A Set keeps only unique values, so I'll convert the string to a Set and join it back.",
    "Set duplicate hata deta hai.",
`function removeDuplicates(str) {
  return [...new Set(str)].join("");
}
console.log(removeDuplicates("programming"));`, "progamin",
    "new Set removes repeated characters, spread turns it into an array, and join makes it a string.",
    { cx: "O(n)" }),

  P("Find the longest word in a sentence", ["longest word"],
    "I'll split the sentence into words and keep track of the longest one.",
    "Words mein todo, sabse lamba rakho.",
`function longestWord(sentence) {
  let longest = "";
  for (const word of sentence.split(" ")) {
    if (word.length > longest.length) longest = word;
  }
  return longest;
}
console.log(longestWord("I love writing JavaScript code"));`, "JavaScript",
    "Each word is compared with the current longest and replaces it if it's longer.",
    { cx: "O(n)" }),

  P("Reverse the words in a sentence", ["reverse words", "reverse sentence"],
    "I'll split by space, reverse the array, and join it back.",
    "Words ka order ulta.",
`function reverseWords(str) {
  return str.split(" ").reverse().join(" ");
}
console.log(reverseWords("I love coding"));`, "coding love I",
    "split gives an array of words, reverse flips the order, join makes the sentence again.",
    { cx: "O(n)" }),

  P("Capitalize the first letter of each word", ["capitalize", "capitalize first letter", "title case"],
    "I'll split into words, make the first letter uppercase, and join them back.",
    "Har word ka pehla letter capital.",
`function capitalize(str) {
  return str
    .split(" ")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}
console.log(capitalize("hello world from vivek"));`, "Hello World From Vivek",
    "For each word, I uppercase the first character and add the rest with slice(1).",
    { cx: "O(n)" }),

  P("Count words in a sentence", ["count words", "word count"],
    "I'll trim the sentence, split by spaces and count the parts.",
    "Space se todo aur gino.",
`function countWords(str) {
  return str.trim().split(/\\s+/).length;
}
console.log(countWords("  I love   JavaScript "));`, "3",
    "trim removes extra spaces at the ends, and the regex splits on one or more spaces.",
    { cx: "O(n)" }),

  // ---------- Arrays ----------
  P("Reverse an array", ["reverse array", "reverse an array"],
    "I'll swap elements from both ends moving towards the middle.",
    "Pehla aur last swap karo, beech tak.",
`function reverseArray(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}
console.log(reverseArray([1, 2, 3, 4]));`, "[4,3,2,1]",
    "Destructuring swaps the two values in one line without a temp variable.",
    { alt: `console.log([1, 2, 3, 4].reverse());`, cx: "O(n)" }),

  P("Find the maximum and minimum in an array", ["max and min", "maximum minimum", "largest number", "smallest number"],
    "I'll start with the first element as both max and min, and compare the rest.",
    "Pehle element se start karo, baaki se compare.",
`function maxMin(arr) {
  let max = arr[0], min = arr[0];
  for (const n of arr) {
    if (n > max) max = n;
    if (n < min) min = n;
  }
  return { max, min };
}
console.log(maxMin([3, 7, 1, 9, 4]));`, '{"max":9,"min":1}',
    "I start with arr[0], not zero, so it also works for negative numbers.",
    { alt: `const arr = [3, 7, 1, 9, 4];
console.log({ max: Math.max(...arr), min: Math.min(...arr) });`, cx: "O(n)" }),

  P("Find the second largest number in an array", ["second largest", "2nd largest", "second highest number"],
    "I'll keep two variables, first and second, and update them in one loop.",
    "Do variable: first aur second.",
`function secondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  for (const n of arr) {
    if (n > first) {
      second = first;
      first = n;
    } else if (n > second && n !== first) {
      second = n;
    }
  }
  return second;
}
console.log(secondLargest([10, 5, 20, 8, 20]));`, "10",
    "When a bigger number comes, the old first becomes second. n !== first skips duplicates of the largest.",
    { alt: `const arr = [10, 5, 20, 8, 20];
console.log([...new Set(arr)].sort((a, b) => b - a)[1]);`, cx: "O(n)" }),

  P("Remove duplicates from an array", ["remove duplicates", "unique array", "remove duplicate array"],
    "I'll use a Set because it only keeps unique values.",
    "Set se duplicate hat jaate hain.",
`function unique(arr) {
  return [...new Set(arr)];
}
console.log(unique([1, 2, 2, 3, 4, 4, 5]));`, "[1,2,3,4,5]",
    "new Set removes duplicates and the spread operator converts it back to an array.",
    { alt: `function unique(arr) {
  const res = [];
  for (const n of arr) {
    if (!res.includes(n)) res.push(n);
  }
  return res;
}
console.log(unique([1, 2, 2, 3, 4, 4, 5]));`, cx: "O(n)" }),

  P("Find duplicate elements in an array", ["find duplicates", "duplicate elements", "duplicates in array"],
    "I'll count each element, and when the count becomes two, I add it to the result.",
    "Count 2 hote hi duplicate list mein daalo.",
`function findDuplicates(arr) {
  const count = {};
  const res = [];
  for (const n of arr) {
    count[n] = (count[n] || 0) + 1;
    if (count[n] === 2) res.push(n);
  }
  return res;
}
console.log(findDuplicates([1, 2, 3, 2, 4, 4, 5]));`, "[2,4]",
    "Checking count === 2 makes sure each duplicate is added only once.",
    { cx: "O(n)" }),

  P("Find the missing number from 1 to n", ["missing number"],
    "The sum of 1 to n is n into n plus one by two. Expected sum minus actual sum gives the missing number.",
    "Formula sum − actual sum = missing.",
`function missingNumber(arr) {
  const n = arr.length + 1;
  const expected = (n * (n + 1)) / 2;
  const actual = arr.reduce((sum, x) => sum + x, 0);
  return expected - actual;
}
console.log(missingNumber([1, 2, 4, 5, 6]));`, "3",
    "One number is missing, so n is length plus one. The difference of sums is the missing number.",
    { cx: "O(n)" }),

  P("Find common elements in two arrays", ["common elements", "intersection"],
    "I'll put the second array in a Set and filter the first array.",
    "Doosre array ko Set banao, pehle ko filter karo.",
`function common(a, b) {
  const setB = new Set(b);
  return a.filter(x => setB.has(x));
}
console.log(common([1, 2, 3, 4], [3, 4, 5]));`, "[3,4]",
    "Set.has is fast, so this is O(n) instead of a nested loop.",
    { cx: "O(n + m)" }),

  P("Flatten a nested array", ["flatten", "flatten array", "nested array"],
    "I'll loop through the array. If an item is an array, I flatten it again with recursion, otherwise I push it.",
    "Array mila toh dobara flatten (recursion).",
`function flatten(arr) {
  const res = [];
  for (const item of arr) {
    if (Array.isArray(item)) res.push(...flatten(item));
    else res.push(item);
  }
  return res;
}
console.log(flatten([1, [2, [3, [4]], 5]]));`, "[1,2,3,4,5]",
    "The function calls itself for inner arrays and spreads the result into res.",
    { alt: `console.log([1, [2, [3, [4]], 5]].flat(Infinity));`, cx: "O(n)" }),

  P("Sort an array without using sort()", ["sort without sort", "bubble sort", "sorting"],
    "I'll use bubble sort: compare neighbours and swap if they're in the wrong order, repeat until sorted.",
    "Pados wale compare karo, galat order toh swap.",
`function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
console.log(bubbleSort([5, 2, 9, 1, 3]));`, "[1,2,3,5,9]",
    "After each outer loop, the largest number moves to the end, so the inner loop can be shorter.",
    { cx: "O(n²)" }),

  P("Count frequency of elements in an array", ["frequency of elements", "count elements", "element frequency"],
    "I'll use an object to count how many times each element appears.",
    "Object mein count.",
`function frequency(arr) {
  const count = {};
  for (const n of arr) count[n] = (count[n] || 0) + 1;
  return count;
}
console.log(frequency([1, 2, 2, 3, 3, 3]));`, '{"1":1,"2":2,"3":3}',
    "Each element becomes a key and its value is how many times it appeared.",
    { cx: "O(n)" }),

  P("Move all zeros to the end", ["move zeros", "zeros to end"],
    "I'll keep a position pointer for the next non-zero, swap non-zero values forward, and zeros end up at the back.",
    "Non-zero aage, zeros apne aap peeche.",
`function moveZeros(arr) {
  let pos = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      [arr[pos], arr[i]] = [arr[i], arr[pos]];
      pos++;
    }
  }
  return arr;
}
console.log(moveZeros([0, 1, 0, 3, 12]));`, "[1,3,12,0,0]",
    "pos marks where the next non-zero goes. This keeps the order and uses no extra array.",
    { alt: `const a = [0, 1, 0, 3, 12];
console.log([...a.filter(x => x !== 0), ...a.filter(x => x === 0)]);`, cx: "O(n)" }),

  P("Rotate an array by k positions", ["rotate array", "rotate"],
    "Right rotation by k means the last k elements come to the front. I'll use slice.",
    "Last k elements aage le aao.",
`function rotate(arr, k) {
  k = k % arr.length;
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}
console.log(rotate([1, 2, 3, 4, 5], 2));`, "[4,5,1,2,3]",
    "k % length handles k bigger than the array. slice(-k) takes the last k items.",
    { cx: "O(n)" }),

  P("Find pairs with a given sum", ["pair sum", "pairs with sum", "two sum"],
    "I'll use a Set. For each number, I check if target minus that number was already seen.",
    "Set mein dekho ki (target − n) pehle aaya kya.",
`function pairSum(arr, target) {
  const seen = new Set();
  const pairs = [];
  for (const n of arr) {
    if (seen.has(target - n)) pairs.push([target - n, n]);
    seen.add(n);
  }
  return pairs;
}
console.log(pairSum([1, 2, 3, 4, 5, 6], 7));`, "[[3,4],[2,5],[1,6]]",
    "Instead of two loops, the Set lets me find the partner in one pass.",
    { cx: "O(n)" }),

  P("Merge two sorted arrays", ["merge sorted arrays", "merge two arrays"],
    "I'll use two pointers and always pick the smaller value.",
    "Do pointer, chhota pehle.",
`function merge(a, b) {
  const res = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) res.push(a[i++]);
    else res.push(b[j++]);
  }
  return [...res, ...a.slice(i), ...b.slice(j)];
}
console.log(merge([1, 3, 5], [2, 4, 6]));`, "[1,2,3,4,5,6]",
    "When one array finishes, slice adds the remaining items of the other.",
    { cx: "O(n + m)" }),

  P("Sum of all numbers in an array", ["sum of array", "array sum", "total"],
    "I'll use reduce to add every number to an accumulator starting at zero.",
    "reduce se sab jodo.",
`const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((total, n) => total + n, 0);
console.log(sum);`, "15",
    "total starts at 0 and each number is added to it.",
    { cx: "O(n)" }),

  P("Chunk an array into groups", ["chunk", "chunk array", "split array"],
    "I'll move in steps of size and slice each part.",
    "size ke steps mein slice.",
`function chunk(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}
console.log(chunk([1, 2, 3, 4, 5], 2));`, "[[1,2],[3,4],[5]]",
    "i jumps by size, and slice takes that many items.",
    { cx: "O(n)" }),

  // ---------- Objects ----------
  P("Search a value in an object and return the key", ["search value in object", "find key by value", "object search", "search in object"],
    "I'll loop through the keys and return the key whose value matches.",
    "Har key ki value compare karo.",
`function findKey(obj, value) {
  for (const key in obj) {
    if (obj[key] === value) return key;
  }
  return null;
}
const user = { name: "Vivek", city: "Mumbai" };
console.log(findKey(user, "Mumbai"));`, "city",
    "for...in gives each key, and I compare its value.",
    { alt: `const user = { name: "Vivek", city: "Mumbai" };
console.log(Object.keys(user).find(k => user[k] === "Mumbai"));`, cx: "O(n)" }),

  P("Search a value in a nested object and return the key", ["nested object search", "object inside object", "search nested object", "deep search"],
    "I'll check every key. If the value is another object, I call the same function inside it.",
    "Andar object mila toh wahi function dobara (recursion).",
`function findKey(obj, value) {
  for (const key in obj) {
    if (obj[key] === value) return key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const found = findKey(obj[key], value);
      if (found) return found;
    }
  }
  return null;
}
const user = {
  name: "Vivek",
  address: { city: "Mumbai", location: { area: "Andheri" } }
};
console.log(findKey(user, "Andheri"));`, "area",
    "Recursion goes inside each nested object. The null check is needed because typeof null is object.",
    { cx: "O(n)" }),

  P("Search in an array of objects", ["search array of objects", "filter objects", "search users"],
    "I'll use filter and check if the name includes the search text, ignoring case.",
    "filter + includes + lowercase.",
`const users = [
  { id: 1, name: "Vivek" },
  { id: 2, name: "Rahul" },
  { id: 3, name: "Vikas" }
];
function search(list, text) {
  return list.filter(u => u.name.toLowerCase().includes(text.toLowerCase()));
}
console.log(search(users, "vi").map(u => u.name));`, '["Vivek","Vikas"]',
    "Lowercasing both makes the search case-insensitive.",
    { cx: "O(n)" }),

  P("Count properties in an object", ["count properties", "object length", "count keys"],
    "Object.keys gives an array of keys, and its length is the count.",
    "Object.keys(obj).length.",
`const user = { name: "Vivek", age: 30, city: "Mumbai" };
console.log(Object.keys(user).length);`, "3",
    "Object.keys returns only the object's own keys.", { cx: "O(n)" }),

  P("Deep clone an object", ["deep clone", "clone object", "copy object"],
    "I'll use recursion: copy primitives directly, and for objects and arrays, copy each value again.",
    "Primitive seedha, object ho toh andar bhi copy.",
`function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  const copy = Array.isArray(obj) ? [] : {};
  for (const key in obj) copy[key] = deepClone(obj[key]);
  return copy;
}
const a = { name: "Vivek", addr: { city: "Mumbai" } };
const b = deepClone(a);
b.addr.city = "Pune";
console.log(a.addr.city);`, "Mumbai",
    "Changing the clone's nested city doesn't change the original, so it's a deep copy.",
    { alt: `const a = { name: "Vivek", addr: { city: "Mumbai" } };
const b = structuredClone(a);
b.addr.city = "Pune";
console.log(a.addr.city);`, cx: "O(n)" }),

  P("Merge two objects", ["merge objects", "merge two objects"],
    "I'll use the spread operator. If a key is in both, the second object's value wins.",
    "Spread se jodo.",
`const a = { name: "Vivek", city: "Mumbai" };
const b = { city: "Pune", role: "Dev" };
console.log({ ...a, ...b });`, '{"name":"Vivek","city":"Pune","role":"Dev"}',
    "city came from b because b is spread last.", { cx: "O(n)" }),

  P("Convert an array to an object", ["array to object", "convert array to object"],
    "I'll use reduce and set each id as a key.",
    "id ko key bana do.",
`const users = [{ id: 1, name: "A" }, { id: 2, name: "B" }];
const obj = users.reduce((acc, u) => {
  acc[u.id] = u.name;
  return acc;
}, {});
console.log(obj);`, '{"1":"A","2":"B"}',
    "Now I can find a user by id directly without looping.", { cx: "O(n)" }),

  P("Group objects by a property", ["group by", "groupby", "group objects"],
    "I'll use reduce. The property becomes the key, and I push each item into its group.",
    "Property ko key, items array mein.",
`const emps = [
  { name: "Amit", dept: "IT" },
  { name: "Riya", dept: "HR" },
  { name: "Vivek", dept: "IT" }
];
const grouped = emps.reduce((acc, e) => {
  if (!acc[e.dept]) acc[e.dept] = [];
  acc[e.dept].push(e.name);
  return acc;
}, {});
console.log(grouped);`, '{"IT":["Amit","Vivek"],"HR":["Riya"]}',
    "If the group doesn't exist, I create an empty array, then push the name.", { cx: "O(n)" }),

  P("Sort employees by salary", ["sort by salary", "sort objects", "sort employees"],
    "I'll use sort with a compare function, b minus a for descending.",
    "sort((a, b) => b.salary − a.salary).",
`const emps = [
  { name: "A", salary: 30000 },
  { name: "B", salary: 50000 },
  { name: "C", salary: 40000 }
];
const sorted = [...emps].sort((a, b) => b.salary - a.salary);
console.log(sorted.map(e => e.name));`, '["B","C","A"]',
    "I copy the array first because sort changes the original.", { cx: "O(n log n)" }),

  P("Remove duplicate objects by id", ["duplicate objects", "unique objects", "remove duplicate objects"],
    "Set can't compare objects, so I'll track ids in a Set.",
    "id ko Set mein track karo.",
`function uniqueById(arr) {
  const seen = new Set();
  return arr.filter(o => {
    if (seen.has(o.id)) return false;
    seen.add(o.id);
    return true;
  });
}
console.log(uniqueById([{ id: 1 }, { id: 2 }, { id: 1 }]));`, '[{"id":1},{"id":2}]',
    "If the id was already seen, filter removes that object.", { cx: "O(n)" }),

  P("Remove a property from an object", ["remove property", "delete property"],
    "I'll use rest destructuring so the original object isn't changed.",
    "Destructuring se hatao.",
`const user = { name: "Vivek", password: "123", city: "Mumbai" };
const { password, ...safeUser } = user;
console.log(safeUser);`, '{"name":"Vivek","city":"Mumbai"}',
    "password is taken out, and the rest goes into safeUser.", { cx: "O(n)" }),

  // ---------- Logic ----------
  P("FizzBuzz", ["fizzbuzz", "fizz buzz"],
    "For numbers 1 to n: divisible by 15 print FizzBuzz, by 3 Fizz, by 5 Buzz, otherwise the number.",
    "15 wala check pehle.",
`for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`, "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
    "I check 15 first, otherwise 15 would print only Fizz.", { cx: "O(n)" }),

  P("Factorial of a number", ["factorial"],
    "Factorial is the product of all numbers from 1 to n. I'll multiply in a loop.",
    "1 se n tak multiply.",
`function factorial(n) {
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}
console.log(factorial(5));`, "120",
    "res starts at 1 and gets multiplied by every number up to n.",
    { alt: `const factorial = n => (n <= 1 ? 1 : n * factorial(n - 1));
console.log(factorial(5));`, cx: "O(n)" }),

  P("Fibonacci series", ["fibonacci", "fibonacci series"],
    "Each number is the sum of the previous two. I'll start with 0 and 1.",
    "Pichle do ka sum.",
`function fibonacci(n) {
  const res = [0, 1];
  for (let i = 2; i < n; i++) {
    res.push(res[i - 1] + res[i - 2]);
  }
  return res.slice(0, n);
}
console.log(fibonacci(7));`, "[0,1,1,2,3,5,8]",
    "Every new value is made from the last two values in the array.", { cx: "O(n)" }),

  P("Check if a number is prime", ["prime", "prime number", "check prime"],
    "A prime number is only divisible by 1 and itself. I check divisors from 2 up to the square root.",
    "√n tak divide karke dekho.",
`function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
console.log(isPrime(29), isPrime(10));`, "true false",
    "Checking only up to the square root is enough and makes it faster.", { cx: "O(√n)" }),

  P("Check Armstrong number", ["armstrong", "armstrong number"],
    "Each digit raised to the power of the number of digits, added together, should equal the number.",
    "Har digit^digits ka sum = number.",
`function isArmstrong(n) {
  const digits = String(n).split("");
  const sum = digits.reduce((s, d) => s + Number(d) ** digits.length, 0);
  return sum === n;
}
console.log(isArmstrong(153), isArmstrong(123));`, "true false",
    "153 = 1³ + 5³ + 3³, so it's an Armstrong number.", { cx: "O(d)" }),

  P("Check palindrome number", ["palindrome number"],
    "I'll reverse the number using modulo and division, then compare with the original.",
    "Math se number ulta karo.",
`function isPalindromeNumber(n) {
  let rev = 0, temp = n;
  while (temp > 0) {
    rev = rev * 10 + (temp % 10);
    temp = Math.floor(temp / 10);
  }
  return rev === n;
}
console.log(isPalindromeNumber(121), isPalindromeNumber(123));`, "true false",
    "temp % 10 gives the last digit, and dividing by 10 removes it.", { cx: "O(d)" }),

  P("Swap two numbers", ["swap", "swap two numbers", "swap without third variable"],
    "I'll use array destructuring to swap in one line.",
    "Destructuring se swap.",
`let a = 5, b = 10;
[a, b] = [b, a];
console.log(a, b);`, "10 5",
    "Without a third variable, we can also use a = a + b, b = a - b, a = a - b.", { cx: "O(1)" }),

  P("Find GCD and LCM", ["gcd", "lcm", "hcf"],
    "GCD uses Euclid's method: repeat a % b until b is zero. LCM is a times b divided by GCD.",
    "Euclid se GCD, LCM = a×b/GCD.",
`function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}
const lcm = (a, b) => (a * b) / gcd(a, b);
console.log(gcd(12, 18), lcm(12, 18));`, "6 36",
    "When b becomes zero, a is the GCD.", { cx: "O(log n)" }),

  P("Sum of digits of a number", ["sum of digits", "digit sum"],
    "I'll take the last digit with % 10, add it, and remove it with division by 10.",
    "% 10 se digit, / 10 se hatao.",
`function sumDigits(n) {
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}
console.log(sumDigits(1234));`, "10",
    "1 + 2 + 3 + 4 = 10.", { cx: "O(d)" }),

  P("Check leap year", ["leap year"],
    "A year is a leap year if it's divisible by 4 but not by 100, or divisible by 400.",
    "4 se divide, 100 se nahi, ya 400 se.",
`function isLeap(y) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}
console.log(isLeap(2024), isLeap(1900), isLeap(2000));`, "true false true",
    "1900 is divisible by 100 but not 400, so it's not a leap year.", { cx: "O(1)" }),

  // ---------- Advanced ----------
  P("Implement debounce", ["implement debounce", "debounce program", "write debounce"],
    "I'll return a function that clears the old timer and starts a new one on every call.",
    "Har call pe purana timer cancel.",
`function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
const search = debounce(q => console.log("Search:", q), 100);
search("v"); search("vi"); search("viv");`, "Search: viv",
    "The timer is kept in a closure, so each call can cancel the previous one.", { cx: "O(1)" }),

  P("Implement throttle", ["implement throttle", "throttle program", "write throttle"],
    "I'll save the last run time and only run again if enough time has passed.",
    "Time limit se pehle dobara nahi.",
`function throttle(fn, limit) {
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
log(1); log(2); log(3);`, "Run 1",
    "Calls within one second are ignored.", { cx: "O(1)" }),

  P("Polyfill for map()", ["map polyfill", "custom map", "polyfill map"],
    "I'll add a function to Array.prototype that loops and pushes the callback's result.",
    "Loop + callback(item, index, array).",
`Array.prototype.myMap = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(cb(this[i], i, this));
  }
  return res;
};
console.log([1, 2, 3].myMap(x => x * 2));`, "[2,4,6]",
    "this is the array, so I use a normal function, not an arrow function.", { cx: "O(n)" }),

  P("Polyfill for filter()", ["filter polyfill", "custom filter", "polyfill filter"],
    "I'll push only the items where the callback returns true.",
    "true aaye toh push.",
`Array.prototype.myFilter = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) res.push(this[i]);
  }
  return res;
};
console.log([1, 2, 3, 4].myFilter(x => x % 2 === 0));`, "[2,4]",
    "Only even numbers pass the condition.", { cx: "O(n)" }),

  P("Polyfill for reduce()", ["reduce polyfill", "custom reduce", "polyfill reduce"],
    "If there's no initial value, I start with the first element. Then I pass the accumulator through each item.",
    "Initial nahi toh pehla element.",
`Array.prototype.myReduce = function (cb, initial) {
  let acc = initial !== undefined ? initial : this[0];
  let start = initial !== undefined ? 0 : 1;
  for (let i = start; i < this.length; i++) {
    acc = cb(acc, this[i], i, this);
  }
  return acc;
};
console.log([1, 2, 3, 4].myReduce((a, b) => a + b, 0));`, "10",
    "The accumulator keeps the running result and is returned at the end.", { cx: "O(n)" }),

  P("Polyfill for Promise.all()", ["promise.all polyfill", "custom promise all", "implement promise.all"],
    "I'll return a new Promise, store each result at its index, and resolve when all are done. If any fails, reject.",
    "Index pe result rakho, sab aaye toh resolve.",
`function myPromiseAll(promises) {
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
myPromiseAll([1, Promise.resolve(2), 3]).then(r => console.log(r));`, "[1,2,3]",
    "Saving at index i keeps the original order, even if promises finish at different times.", { cx: "O(n)" }),

  P("Polyfill for bind()", ["bind polyfill", "custom bind"],
    "I'll return a new function that calls the original with the saved this using apply.",
    "Naya function jo apply se call kare.",
`Function.prototype.myBind = function (ctx, ...args) {
  const fn = this;
  return function (...more) {
    return fn.apply(ctx, [...args, ...more]);
  };
};
function hi(city) { return this.name + " from " + city; }
console.log(hi.myBind({ name: "Vivek" })("Mumbai"));`, "Vivek from Mumbai",
    "ctx becomes this, and arguments from both calls are joined.", { cx: "O(1)" }),

  P("Implement memoize", ["implement memoize", "memoize program"],
    "I'll store results in a cache object using the argument as the key.",
    "Cache mein result rakho.",
`function memoize(fn) {
  const cache = {};
  return function (n) {
    if (cache[n] !== undefined) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}
const square = memoize(n => n * n);
console.log(square(5), square(5));`, "25 25",
    "The second call returns from the cache without calculating again.", { cx: "O(1) after first" }),

  P("Implement curry", ["implement curry", "curry program", "sum(1)(2)(3)"],
    "I'll return functions one by one until all arguments are collected.",
    "Sab arguments aane tak function return karo.",
`function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
  };
}
const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3));`, "6",
    "fn.length is the number of arguments the function needs.", { cx: "O(n)" }),

  P("Implement an event emitter", ["event emitter", "pub sub", "on emit"],
    "I'll keep an object of event names with a list of listeners. on adds a listener, emit calls them.",
    "Event name → listeners list.",
`class EventEmitter {
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
e.emit("greet", "Vivek");`, "Hello Vivek",
    "emit loops through all listeners of that event and calls them with the data.", { cx: "O(k)" }),

  P("Valid parentheses", ["valid parentheses", "balanced brackets", "brackets"],
    "I'll use a stack. Push opening brackets, and for a closing one, the top of the stack must match.",
    "Stack: open push, close pe match check.",
`function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if ("([{".includes(ch)) stack.push(ch);
    else if (stack.pop() !== pairs[ch]) return false;
  }
  return stack.length === 0;
}
console.log(isValid("({[]})"), isValid("(]"));`, "true false",
    "At the end, the stack must be empty, meaning every bracket was closed.", { cx: "O(n)" }),

  P("Longest substring without repeating characters", ["longest substring", "sliding window"],
    "I'll use a sliding window. When a character repeats, I move the left side past its last position.",
    "Repeat mila toh window ka left aage.",
`function longestUnique(s) {
  const last = {};
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    if (last[s[right]] >= left) left = last[s[right]] + 1;
    last[s[right]] = right;
    best = Math.max(best, right - left + 1);
  }
  return best;
}
console.log(longestUnique("abcabcbb"));`, "3",
    "The window always has unique characters, and best keeps the biggest size.", { cx: "O(n)" }),

  // ---------- React programs ----------
  P("Build a counter in React", ["counter", "react counter", "counter app"],
    "I'll keep count in useState and update it with buttons.",
    "useState + 2 buttons.",
`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  );
}`, null, "I use the function form c => c + 1 so it always uses the latest value.", { norun: true, cat: "react" }),

  P("Build a todo list in React", ["todo", "todo app", "todo list"],
    "I'll keep the input text and the list in state. Add pushes a new item, delete filters it out.",
    "Input state + list state + add/delete.",
`function Todo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const add = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text }]);
    setText("");
  };
  const remove = id => setTodos(todos.filter(t => t.id !== id));

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={add}>Add</button>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.text} <button onClick={() => remove(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`, null, "I create new arrays with spread and filter instead of changing state directly, and use id as the key.", { norun: true, cat: "react" }),

  P("Fetch and show API data in React", ["fetch api react", "show api data", "users list api"],
    "I'll call the API in useEffect and keep data, loading and error in state.",
    "useEffect + 3 states.",
`function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`, null, "The empty dependency array runs the fetch once, and I show loading and error states.", { norun: true, cat: "react" }),

  P("Search with debounce in React", ["search react", "debounce react", "search input react"],
    "I'll wait 500 ms after the user stops typing using setTimeout in useEffect, and clear it on every change.",
    "useEffect mein timer, cleanup mein clear.",
`function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return setResults([]);
    const timer = setTimeout(() => {
      fetch("/api/search?q=" + query)
        .then(r => r.json())
        .then(setResults);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`, null, "Every keystroke clears the old timer, so the API is called only after typing stops.", { norun: true, cat: "react" }),

  P("Toggle show/hide in React", ["toggle", "show hide", "toggle react"],
    "I'll keep a boolean in state and flip it on click.",
    "true/false flip.",
`function Toggle() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(s => !s)}>{show ? "Hide" : "Show"}</button>
      {show && <p>Hello Vivek</p>}
    </div>
  );
}`, null, "&& shows the text only when show is true.", { norun: true, cat: "react" }),

  P("Controlled form with validation in React", ["login form", "form react", "controlled form"],
    "I'll keep form fields in one state object, validate on submit and show errors.",
    "Ek state object + submit pe validate.",
`function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.email.includes("@")) return setError("Enter a valid email");
    if (form.password.length < 6) return setError("Password must be 6+ characters");
    setError("");
    console.log("Submitted", form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" value={form.password} onChange={handleChange} />
      {error && <p>{error}</p>}
      <button>Login</button>
    </form>
  );
}`, null, "[e.target.name] updates the right field, so one handler works for all inputs.", { norun: true, cat: "react" }),

  // ---------- Output-based ----------
  P("Output: var inside for loop with setTimeout", ["var setTimeout loop", "for loop settimeout", "output var loop"],
    "var is function-scoped, so all callbacks share the same i, which is 3 when they run. With let, each loop gets its own i.",
    "var = ek hi i shared. let = har round ka alag i.",
`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}`, "var 3\nvar 3\nvar 3\nlet 0\nlet 1\nlet 2",
    "By the time setTimeout runs, the var loop has finished and i is 3.", { cx: "" }),

  P("Output: hoisting with var, let and function", ["output hoisting", "hoisting output"],
    "var gives undefined, function declarations work, and let throws an error before declaration.",
    "var undefined, function chalega, let error.",
`console.log(a);
var a = 1;
console.log(sayHi());
function sayHi() { return "hi"; }
try { console.log(b); } catch (e) { console.log(e.name); }
let b = 2;`, "undefined\nhi\nReferenceError",
    "Declarations are hoisted, but let stays in the temporal dead zone.", { cx: "" }),

  P("Output: this inside arrow function vs normal function", ["output this", "this output"],
    "Normal method gets this as the object. Arrow function takes this from outside, so the name is undefined.",
    "Arrow ka apna this nahi.",
`const obj = {
  name: "Vivek",
  normal() { return this.name; },
  arrow: () => this?.name,
};
console.log(obj.normal());
console.log(obj.arrow());`, "Vivek\nundefined",
    "The arrow function's this isn't obj, so it doesn't find name.", { cx: "" }),

  P("Output: async/await order", ["output async await", "async output"],
    "Code before await runs immediately. Code after await runs later as a microtask.",
    "await se pehle turant, baad mein baad mein.",
`async function test() {
  console.log(1);
  await null;
  console.log(3);
}
test();
console.log(2);`, "1\n2\n3",
    "After await, the rest of the function waits until the current code finishes.", { cx: "" }),

  P("Output: type coercion tricks", ["output coercion", "coercion output", "tricky output"],
    "+ with a string joins as text. Other math operators convert to numbers.",
    "+ string jodta hai, - number banata hai.",
`console.log(1 + "2");
console.log("5" - 2);
console.log([1, 2] + [3]);
console.log(typeof null);`, "12\n3\n1,23\nobject",
    "Arrays become strings with + so [1,2] + [3] is '1,2' + '3'.", { cx: "" }),
];
