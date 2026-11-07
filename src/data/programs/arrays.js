// Array programs
export default [
  {
    q: "Reverse an array", tags: ["reverse array", "reverse an array", "array reverse"],
    a: "I'll swap elements from both ends moving to the middle. Without a loop, I can use reverse.",
    hi: "Pehla aur last swap karo, beech tak.",
    out: "[4,3,2,1]", cx: "O(n)", sc: "O(1)",
    ex: "Destructuring swaps two values in one line without a temp variable.",
    ways: [
      ["Loop (two pointers)", `function reverseArray(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}
console.log(reverseArray([1, 2, 3, 4]));`],
      ["Without loop", `const arr = [1, 2, 3, 4];
console.log([...arr].reverse());`],
      ["New array loop", `function reverseArray(arr) {
  const res = [];
  for (let i = arr.length - 1; i >= 0; i--) res.push(arr[i]);
  return res;
}
console.log(reverseArray([1, 2, 3, 4]));`],
    ],
    cross: [
      ["Does reverse() change the original array?", "Yes, it mutates. So I copy first with [...arr] or use toReversed()."],
      ["Space complexity of the two-pointer way?", "O(1), because it reverses in place."],
    ],
  },
  {
    q: "Find the maximum and minimum in an array", tags: ["max and min", "maximum minimum", "largest number", "smallest number", "max min"],
    a: "I'll start with the first element as both max and min, and compare the rest.",
    hi: "Pehle element se start karo, baaki se compare.",
    out: '{"max":9,"min":1}', cx: "O(n)", sc: "O(1)",
    ex: "I start with arr[0], not zero, so it also works for negative numbers.",
    ways: [
      ["Loop", `function maxMin(arr) {
  let max = arr[0], min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
  }
  return { max, min };
}
console.log(maxMin([3, 7, 1, 9, 4]));`],
      ["Without loop (Math)", `const arr = [3, 7, 1, 9, 4];
console.log({ max: Math.max(...arr), min: Math.min(...arr) });`],
      ["reduce", `const arr = [3, 7, 1, 9, 4];
const max = arr.reduce((a, b) => (b > a ? b : a));
const min = arr.reduce((a, b) => (b < a ? b : a));
console.log({ max, min });`],
    ],
    cross: [
      ["Why not start max with 0?", "If all numbers are negative, 0 would be wrong. Start with arr[0]."],
      ["Any problem with Math.max(...arr)?", "For very large arrays, spread can exceed the call stack. The loop is safer."],
      ["Empty array?", "Math.max() gives -Infinity. I'd return null for an empty array."],
    ],
  },
  {
    q: "Find the second largest number in an array", tags: ["second largest", "2nd largest", "second highest number", "second largest number"],
    a: "I'll keep two variables, first and second, and update them in one loop.",
    hi: "Do variable: first aur second.",
    out: "10", cx: "O(n)", sc: "O(1)",
    ex: "When a bigger number comes, the old first becomes second. n !== first skips duplicates of the largest.",
    ways: [
      ["Loop (single pass)", `function secondLargest(arr) {
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
console.log(secondLargest([10, 5, 20, 8, 20]));`],
      ["Without loop (sort)", `const arr = [10, 5, 20, 8, 20];
const unique = [...new Set(arr)].sort((a, b) => b - a);
console.log(unique[1]);`],
      ["Without loop (filter)", `const arr = [10, 5, 20, 8, 20];
const max = Math.max(...arr);
console.log(Math.max(...arr.filter(n => n !== max)));`],
    ],
    cross: [
      ["Why sort((a, b) => b - a) and not just sort()?", "Default sort compares as strings, so [10, 9, 100] sorts wrong."],
      ["Why Set before sort?", "To remove duplicates, otherwise [20, 20, 10] would give 20 as second."],
      ["Which approach is best?", "Single loop: O(n) time and O(1) space. Sort is O(n log n)."],
      ["What if all numbers are the same?", "There's no second largest, so it returns -Infinity. I'd return null in that case."],
      ["How do you find the second smallest?", "Same logic with Infinity and < instead of >."],
    ],
  },
  {
    q: "Find the second smallest number in an array", tags: ["second smallest", "2nd smallest"],
    a: "Same as second largest, but I track the smallest two values.",
    hi: "first aur second smallest track karo.",
    out: "3", cx: "O(n)", sc: "O(1)",
    ex: "When a smaller number comes, the old first becomes second.",
    ways: [
      ["Loop", `function secondSmallest(arr) {
  let first = Infinity, second = Infinity;
  for (const n of arr) {
    if (n < first) { second = first; first = n; }
    else if (n < second && n !== first) second = n;
  }
  return second;
}
console.log(secondSmallest([5, 1, 8, 3, 1]));`],
      ["Without loop", `const arr = [5, 1, 8, 3, 1];
console.log([...new Set(arr)].sort((a, b) => a - b)[1]);`],
    ],
    cross: [],
  },
  {
    q: "Remove duplicates from an array", tags: ["remove duplicates", "unique array", "remove duplicate array", "remove duplicate elements"],
    a: "I'll use a Set because it keeps only unique values. With a loop, I add an item only if it's not already in the result.",
    hi: "Set se duplicate hat jaate hain.",
    out: "[1,2,3,4,5]", cx: "O(n) with Set", sc: "O(n)",
    ex: "new Set removes duplicates and the spread operator turns it back into an array.",
    ways: [
      ["Loop", `function unique(arr) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!res.includes(arr[i])) res.push(arr[i]);
  }
  return res;
}
console.log(unique([1, 2, 2, 3, 4, 4, 5]));`],
      ["Without loop (Set)", `const unique = arr => [...new Set(arr)];
console.log(unique([1, 2, 2, 3, 4, 4, 5]));`],
      ["filter + indexOf", `const unique = arr => arr.filter((x, i) => arr.indexOf(x) === i);
console.log(unique([1, 2, 2, 3, 4, 4, 5]));`],
      ["reduce", `const unique = arr => arr.reduce((acc, x) => (acc.includes(x) ? acc : [...acc, x]), []);
console.log(unique([1, 2, 2, 3, 4, 4, 5]));`],
      ["Object (O(n) loop)", `function unique(arr) {
  const seen = {}, res = [];
  for (const x of arr) {
    if (!seen[x]) { seen[x] = true; res.push(x); }
  }
  return res;
}
console.log(unique([1, 2, 2, 3, 4, 4, 5]));`],
    ],
    cross: [
      ["Can you do it without Set?", "Yes, with a loop and includes, filter with indexOf, or an object to remember seen values."],
      ["Which is fastest?", "Set or the object version, both O(n). includes and indexOf are O(n²) because they loop inside a loop."],
      ["Does it work for objects?", "No, Set compares objects by reference. For objects, I check a unique key like id."],
    ],
  },
  {
    q: "Find duplicate elements in an array", tags: ["find duplicates", "duplicate elements", "duplicates in array", "duplicate numbers"],
    a: "I'll count each element, and when the count becomes two, I add it to the result.",
    hi: "Count 2 hote hi duplicate list mein daalo.",
    out: "[2,4]", cx: "O(n)", sc: "O(n)",
    ex: "Checking count === 2 makes sure each duplicate is added only once.",
    ways: [
      ["Loop", `function findDuplicates(arr) {
  const count = {}, res = [];
  for (const n of arr) {
    count[n] = (count[n] || 0) + 1;
    if (count[n] === 2) res.push(n);
  }
  return res;
}
console.log(findDuplicates([1, 2, 3, 2, 4, 4, 5]));`],
      ["Without loop", `const arr = [1, 2, 3, 2, 4, 4, 5];
console.log([...new Set(arr.filter((x, i) => arr.indexOf(x) !== i))]);`],
    ],
    cross: [["What if a number appears 3 times?", "It's still added once, because I push only when the count is exactly 2."]],
  },
  {
    q: "Find the missing number from 1 to n", tags: ["missing number", "find missing number"],
    a: "The sum of 1 to n is n times n plus one, divided by two. Expected sum minus actual sum gives the missing number.",
    hi: "Formula sum − actual sum = missing.",
    out: "3", cx: "O(n)", sc: "O(1)",
    ex: "One number is missing, so n is length plus one. The difference of the sums is the answer.",
    ways: [
      ["Loop", `function missingNumber(arr) {
  const n = arr.length + 1;
  let actual = 0;
  for (const x of arr) actual += x;
  return (n * (n + 1)) / 2 - actual;
}
console.log(missingNumber([1, 2, 4, 5, 6]));`],
      ["Without loop", `const missingNumber = arr => {
  const n = arr.length + 1;
  return (n * (n + 1)) / 2 - arr.reduce((a, b) => a + b, 0);
};
console.log(missingNumber([1, 2, 4, 5, 6]));`],
      ["Set lookup", `function missingNumber(arr) {
  const set = new Set(arr);
  for (let i = 1; i <= arr.length + 1; i++) if (!set.has(i)) return i;
}
console.log(missingNumber([1, 2, 4, 5, 6]));`],
    ],
    cross: [
      ["Does it work if the array isn't sorted?", "Yes, the sum doesn't depend on order."],
      ["What if more than one number is missing?", "Use the Set approach and collect every missing number."],
    ],
  },
  {
    q: "Find common elements in two arrays", tags: ["common elements", "intersection", "intersection of arrays"],
    a: "I'll put the second array in a Set and filter the first array.",
    hi: "Doosre array ko Set banao, pehle ko filter karo.",
    out: "[3,4]", cx: "O(n + m)", sc: "O(m)",
    ex: "Set.has is fast, so this avoids a nested loop.",
    ways: [
      ["Nested loop", `function common(a, b) {
  const res = [];
  for (const x of a) {
    for (const y of b) {
      if (x === y && !res.includes(x)) res.push(x);
    }
  }
  return res;
}
console.log(common([1, 2, 3, 4], [3, 4, 5]));`],
      ["Without loop (Set + filter)", `const common = (a, b) => {
  const setB = new Set(b);
  return a.filter(x => setB.has(x));
};
console.log(common([1, 2, 3, 4], [3, 4, 5]));`],
    ],
    cross: [
      ["Optimize the nested loop?", "Use a Set for the second array: O(n + m) instead of O(n × m)."],
      ["How do you get the union?", "[...new Set([...a, ...b])]."],
    ],
  },
  {
    q: "Union of two arrays", tags: ["union", "union of arrays", "merge unique"],
    a: "I'll join both arrays and remove duplicates with a Set.",
    hi: "Dono jodo, duplicate hatao.",
    out: "[1,2,3,4,5]", cx: "O(n + m)", sc: "O(n + m)",
    ex: "Spread joins the arrays, Set keeps unique values.",
    ways: [
      ["Without loop", `const union = (a, b) => [...new Set([...a, ...b])];
console.log(union([1, 2, 3], [3, 4, 5]));`],
      ["Loop", `function union(a, b) {
  const res = [...a];
  for (const x of b) if (!res.includes(x)) res.push(x);
  return res;
}
console.log(union([1, 2, 3], [3, 4, 5]));`],
    ],
    cross: [],
  },
  {
    q: "Flatten a nested array", tags: ["flatten", "flatten array", "nested array", "flat array"],
    a: "I'll loop through the array. If an item is an array, I flatten it again with recursion, otherwise I push it.",
    hi: "Array mila toh dobara flatten (recursion).",
    out: "[1,2,3,4,5]", cx: "O(n)", sc: "O(n)",
    ex: "The function calls itself for inner arrays and spreads the result into res.",
    ways: [
      ["Recursion (loop)", `function flatten(arr) {
  const res = [];
  for (const item of arr) {
    if (Array.isArray(item)) res.push(...flatten(item));
    else res.push(item);
  }
  return res;
}
console.log(flatten([1, [2, [3, [4]], 5]]));`],
      ["Without loop (flat)", `console.log([1, [2, [3, [4]], 5]].flat(Infinity));`],
      ["reduce", `const flatten = arr =>
  arr.reduce((acc, x) => acc.concat(Array.isArray(x) ? flatten(x) : x), []);
console.log(flatten([1, [2, [3, [4]], 5]]));`],
      ["Stack (no recursion)", `function flatten(arr) {
  const stack = [...arr], res = [];
  while (stack.length) {
    const x = stack.pop();
    if (Array.isArray(x)) stack.push(...x);
    else res.unshift(x);
  }
  return res;
}
console.log(flatten([1, [2, [3, [4]], 5]]));`],
    ],
    cross: [
      ["Can you do it without flat()?", "Yes, with recursion or reduce."],
      ["Only one level deep?", "arr.flat() or [].concat(...arr)."],
      ["Without recursion?", "Use a stack and a while loop."],
    ],
  },
  {
    q: "Sort an array without using sort()", tags: ["sort without sort", "bubble sort", "sorting", "sort array"],
    a: "I'll use bubble sort: compare neighbours and swap if they're in the wrong order.",
    hi: "Pados wale compare karo, galat order toh swap.",
    out: "[1,2,3,5,9]", cx: "O(n²)", sc: "O(1)",
    ex: "After each outer loop, the largest number moves to the end, so the inner loop can be shorter.",
    ways: [
      ["Bubble sort", `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
console.log(bubbleSort([5, 2, 9, 1, 3]));`],
      ["Selection sort", `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) if (arr[j] < arr[min]) min = j;
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}
console.log(selectionSort([5, 2, 9, 1, 3]));`],
      ["Built-in (for comparison)", `console.log([5, 2, 9, 1, 3].sort((a, b) => a - b));`],
    ],
    cross: [
      ["Time complexity of bubble sort?", "O(n²). Built-in sort is O(n log n)."],
      ["How do you make bubble sort faster for sorted input?", "Add a swapped flag and break if no swap happened in a pass."],
      ["Descending order?", "Change > to <."],
    ],
  },
  {
    q: "Count frequency of elements in an array", tags: ["frequency of elements", "count elements", "element frequency", "count occurrences in array"],
    a: "I'll use an object to count how many times each element appears.",
    hi: "Object mein count.",
    out: '{"1":1,"2":2,"3":3}', cx: "O(n)", sc: "O(k)",
    ex: "Each element becomes a key and its value is how many times it appeared.",
    ways: [
      ["Loop", `function frequency(arr) {
  const count = {};
  for (const n of arr) count[n] = (count[n] || 0) + 1;
  return count;
}
console.log(frequency([1, 2, 2, 3, 3, 3]));`],
      ["Without loop", `const frequency = arr => arr.reduce((acc, n) => {
  acc[n] = (acc[n] || 0) + 1;
  return acc;
}, {});
console.log(frequency([1, 2, 2, 3, 3, 3]));`],
    ],
    cross: [["Which element appears most?", "Loop over the object and keep the key with the highest count."]],
  },
  {
    q: "Move all zeros to the end", tags: ["move zeros", "zeros to end", "move zeroes"],
    a: "I'll keep a position pointer for the next non-zero and swap non-zero values forward.",
    hi: "Non-zero aage, zeros apne aap peeche.",
    out: "[1,3,12,0,0]", cx: "O(n)", sc: "O(1)",
    ex: "pos marks where the next non-zero goes. Order is kept and no extra array is used.",
    ways: [
      ["Loop (in place)", `function moveZeros(arr) {
  let pos = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      [arr[pos], arr[i]] = [arr[i], arr[pos]];
      pos++;
    }
  }
  return arr;
}
console.log(moveZeros([0, 1, 0, 3, 12]));`],
      ["Without loop", `const a = [0, 1, 0, 3, 12];
console.log([...a.filter(x => x !== 0), ...a.filter(x => x === 0)]);`],
    ],
    cross: [["Can you do it without extra space?", "Yes, the two-pointer loop swaps in place, O(1) space."]],
  },
  {
    q: "Rotate an array by k positions", tags: ["rotate array", "rotate", "array rotation"],
    a: "Right rotation by k means the last k elements come to the front.",
    hi: "Last k elements aage le aao.",
    out: "[4,5,1,2,3]", cx: "O(n)", sc: "O(n)",
    ex: "k % length handles k bigger than the array. slice(-k) takes the last k items.",
    ways: [
      ["Without loop (slice)", `function rotate(arr, k) {
  k = k % arr.length;
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}
console.log(rotate([1, 2, 3, 4, 5], 2));`],
      ["Loop", `function rotate(arr, k) {
  const res = [...arr];
  for (let i = 0; i < k % arr.length; i++) res.unshift(res.pop());
  return res;
}
console.log(rotate([1, 2, 3, 4, 5], 2));`],
    ],
    cross: [
      ["What if k is bigger than the length?", "k % length handles it."],
      ["Left rotation?", "[...arr.slice(k), ...arr.slice(0, k)]."],
    ],
  },
  {
    q: "Find pairs with a given sum (Two Sum)", tags: ["pair sum", "pairs with sum", "two sum", "target sum"],
    a: "Brute force checks every pair. Better: I use a Set and check if target minus the number was already seen.",
    hi: "Set mein dekho ki (target − n) pehle aaya kya.",
    out: "[[3,4],[2,5],[1,6]]", cx: "O(n) with Set", sc: "O(n)",
    ex: "Instead of two loops, the Set finds the partner in one pass.",
    ways: [
      ["Set (one loop)", `function pairSum(arr, target) {
  const seen = new Set(), pairs = [];
  for (const n of arr) {
    if (seen.has(target - n)) pairs.push([target - n, n]);
    seen.add(n);
  }
  return pairs;
}
console.log(pairSum([1, 2, 3, 4, 5, 6], 7));`],
      ["Nested loop (brute)", `function pairSum(arr, target) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] + arr[j] === target) pairs.unshift([arr[i], arr[j]]);
  return pairs.sort((a, b) => b[0] - a[0]);
}
console.log(pairSum([1, 2, 3, 4, 5, 6], 7));`],
    ],
    cross: [
      ["Optimize the brute force?", "Use a Set or Map: O(n) instead of O(n²)."],
      ["Return indexes instead?", "Use a Map of value to index and return [map.get(target - n), i]."],
    ],
  },
  {
    q: "Merge two sorted arrays", tags: ["merge sorted arrays", "merge two arrays"],
    a: "I'll use two pointers and always pick the smaller value.",
    hi: "Do pointer, chhota pehle.",
    out: "[1,2,3,4,5,6]", cx: "O(n + m)", sc: "O(n + m)",
    ex: "When one array finishes, slice adds the remaining items of the other.",
    ways: [
      ["Loop (two pointers)", `function merge(a, b) {
  const res = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) res.push(a[i++]);
    else res.push(b[j++]);
  }
  return [...res, ...a.slice(i), ...b.slice(j)];
}
console.log(merge([1, 3, 5], [2, 4, 6]));`],
      ["Without loop", `const merge = (a, b) => [...a, ...b].sort((x, y) => x - y);
console.log(merge([1, 3, 5], [2, 4, 6]));`],
    ],
    cross: [["Why not just concat and sort?", "That's O(n log n). Two pointers use the fact they're already sorted, so it's O(n + m)."]],
  },
  {
    q: "Sum of all numbers in an array", tags: ["sum of array", "array sum", "total of array", "sum array"],
    a: "I'll add every number to a total starting at zero.",
    hi: "Sab jodo.",
    out: "15", cx: "O(n)", sc: "O(1)",
    ex: "total starts at 0 and each number is added to it.",
    ways: [
      ["Loop", `const nums = [1, 2, 3, 4, 5];
let sum = 0;
for (const n of nums) sum += n;
console.log(sum);`],
      ["Without loop", `const nums = [1, 2, 3, 4, 5];
console.log(nums.reduce((total, n) => total + n, 0));`],
      ["Recursion", `const sum = arr => (arr.length === 0 ? 0 : arr[0] + sum(arr.slice(1)));
console.log(sum([1, 2, 3, 4, 5]));`],
    ],
    cross: [["Why pass 0 to reduce?", "So an empty array returns 0 instead of throwing an error."]],
  },
  {
    q: "Sum of even numbers in an array", tags: ["sum of even numbers", "even numbers sum", "even numbers"],
    a: "I'll add only the numbers divisible by 2.",
    hi: "Sirf even jodo.",
    out: "12", cx: "O(n)", sc: "O(1)",
    ex: "n % 2 === 0 checks if a number is even.",
    ways: [
      ["Loop", `const nums = [1, 2, 3, 4, 5, 6];
let sum = 0;
for (const n of nums) if (n % 2 === 0) sum += n;
console.log(sum);`],
      ["Without loop", `const nums = [1, 2, 3, 4, 5, 6];
console.log(nums.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0));`],
    ],
    cross: [["Odd numbers?", "Use n % 2 !== 0."]],
  },
  {
    q: "Chunk an array into groups", tags: ["chunk", "chunk array", "split array into groups"],
    a: "I'll move in steps of size and slice each part.",
    hi: "size ke steps mein slice.",
    out: "[[1,2],[3,4],[5]]", cx: "O(n)", sc: "O(n)",
    ex: "i jumps by size, and slice takes that many items.",
    ways: [
      ["Loop", `function chunk(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}
console.log(chunk([1, 2, 3, 4, 5], 2));`],
      ["Without loop", `const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
console.log(chunk([1, 2, 3, 4, 5], 2));`],
    ],
    cross: [["Real use?", "Sending bulk data to an API in batches, like 500 rows at a time."]],
  },
  {
    q: "Check if two arrays are equal", tags: ["array equal", "compare arrays", "arrays equal"],
    a: "Lengths must match, and every element at the same index must be equal.",
    hi: "Length same + har index same.",
    out: "true false", cx: "O(n)", sc: "O(1)",
    ex: "every stops at the first mismatch.",
    ways: [
      ["Loop", `function isEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}
console.log(isEqual([1, 2, 3], [1, 2, 3]), isEqual([1, 2], [2, 1]));`],
      ["Without loop", `const isEqual = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
console.log(isEqual([1, 2, 3], [1, 2, 3]), isEqual([1, 2], [2, 1]));`],
    ],
    cross: [["Why not a === b?", "That compares references, so two different arrays with the same values give false."]],
  },
  {
    q: "Linear search and binary search", tags: ["binary search", "linear search", "search in array", "find index"],
    a: "Linear search checks each element. Binary search works on a sorted array: check the middle and drop half each time.",
    hi: "Binary = sorted array, har baar aadha.",
    out: "3 3", cx: "Linear O(n), Binary O(log n)", sc: "O(1)",
    ex: "Binary search moves left or right depending on whether the middle is smaller or bigger.",
    ways: [
      ["Binary search (loop)", `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
const arr = [1, 3, 5, 7, 9];
console.log(binarySearch(arr, 7), arr.indexOf(7));`],
      ["Linear search (loop)", `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) if (arr[i] === target) return i;
  return -1;
}
const arr = [1, 3, 5, 7, 9];
console.log(linearSearch(arr, 7), arr.indexOf(7));`],
    ],
    cross: [
      ["When can you use binary search?", "Only on a sorted array."],
      ["Complexity?", "Binary O(log n), linear O(n)."],
    ],
  },
  {
    q: "Maximum subarray sum (Kadane's algorithm)", tags: ["kadane", "maximum subarray", "max subarray sum"],
    a: "At each number I decide: add it to the current sum or start fresh from it. I keep the best sum seen.",
    hi: "Current sum + ya naya start, jo bada ho.",
    out: "6", cx: "O(n)", sc: "O(1)",
    ex: "For [-2,1,-3,4,-1,2,1,-5,4] the best subarray is [4,-1,2,1] = 6.",
    ways: [
      ["Kadane (loop)", `function maxSubArray(arr) {
  let current = arr[0], best = arr[0];
  for (let i = 1; i < arr.length; i++) {
    current = Math.max(arr[i], current + arr[i]);
    best = Math.max(best, current);
  }
  return best;
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));`],
      ["Brute force", `function maxSubArray(arr) {
  let best = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = i; j < arr.length; j++) { sum += arr[j]; best = Math.max(best, sum); }
  }
  return best;
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));`],
    ],
    cross: [["All negative numbers?", "It returns the largest single number, because we start with arr[0], not 0."]],
  },
  {
    q: "Cumulative (running) sum of an array", tags: ["cumulative sum", "running sum", "prefix sum"],
    a: "Each position holds the sum of all numbers up to that index.",
    hi: "Har step pe ab tak ka total.",
    out: "[1,3,6,10]", cx: "O(n)", sc: "O(n)",
    ex: "I keep a running total and push it after adding each number.",
    ways: [
      ["Loop", `function runningSum(arr) {
  const res = [];
  let total = 0;
  for (const n of arr) { total += n; res.push(total); }
  return res;
}
console.log(runningSum([1, 2, 3, 4]));`],
      ["Without loop", `const arr = [1, 2, 3, 4];
let total = 0;
console.log(arr.map(n => (total += n)));`],
    ],
    cross: [],
  },
];
