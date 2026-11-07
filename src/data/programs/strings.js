// String programs — har program: loop + bina loop + cross questions
export default [
  {
    q: "Reverse a string", tags: ["reverse", "reverse string", "reverse a string", "string reverse"],
    a: "I'll loop from the last character to the first and build a new string. Without a loop, I can use split, reverse and join.",
    hi: "Last se first tak chalo aur naya string banao.",
    out: "olleh", cx: "O(n)", sc: "O(n)",
    ex: "The loop starts at the last index and adds each character to the result, so the string comes out reversed.",
    ways: [
      ["For loop", `function reverse(str) {
  let res = "";
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i];
  }
  return res;
}
console.log(reverse("hello"));`],
      ["Without loop", `const reverse = str => str.split("").reverse().join("");
console.log(reverse("hello"));`],
      ["reduce", `const reverse = str => [...str].reduce((acc, ch) => ch + acc, "");
console.log(reverse("hello"));`],
      ["Recursion", `function reverse(str) {
  if (str === "") return "";
  return reverse(str.slice(1)) + str[0];
}
console.log(reverse("hello"));`],
    ],
    cross: [
      ["Can you do it without a loop?", "Yes, str.split('').reverse().join('') — split makes an array, reverse flips it, join makes it a string again."],
      ["Can you do it without built-in methods?", "Yes, the for loop version uses no built-in methods."],
      ["Why can't we reverse the string directly?", "Strings are immutable in JavaScript, and they don't have a reverse method, so we convert to an array first."],
      ["What is the time complexity?", "O(n), because we visit every character once."],
      ["What happens with an empty string?", "It returns an empty string, no error."],
    ],
  },
  {
    q: "Check if a string is a palindrome", tags: ["palindrome", "palindrome string", "check palindrome", "palindrome program"],
    a: "I'll compare characters from both ends moving to the middle. If any pair doesn't match, it's not a palindrome.",
    hi: "Dono side se compare karo, beech tak.",
    out: "true\nfalse", cx: "O(n)", sc: "O(1)",
    ex: "left starts at the beginning and right at the end. If they ever differ I return false, otherwise true.",
    ways: [
      ["While loop", `function isPalindrome(str) {
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}
console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));`],
      ["Without loop", `const isPalindrome = str => str === str.split("").reverse().join("");
console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));`],
      ["every()", `const isPalindrome = str => [...str].every((ch, i) => ch === str[str.length - 1 - i]);
console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));`],
      ["Recursion", `function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}
console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));`],
    ],
    cross: [
      ["Can you do it without a loop?", "Yes, compare the string with its reversed version using split, reverse and join."],
      ["Which approach is better?", "Two pointers, because it uses O(1) extra space and stops early on the first mismatch."],
      ["How do you ignore case and spaces?", "First clean it: str.toLowerCase().replace(/[^a-z0-9]/g, ''), then check."],
      ["What is the time complexity?", "O(n)."],
    ],
  },
  {
    q: "Count vowels in a string", tags: ["count vowels", "vowels", "vowel count"],
    a: "I'll loop through each character and check if it's a vowel.",
    hi: "Har character check karo ki aeiou mein hai ya nahi.",
    out: "3", cx: "O(n)", sc: "O(1)",
    ex: "I lowercase the string so capital vowels also count, then increase count for each vowel.",
    ways: [
      ["for...of", `function countVowels(str) {
  let count = 0;
  for (const ch of str.toLowerCase()) {
    if ("aeiou".includes(ch)) count++;
  }
  return count;
}
console.log(countVowels("JavaScript"));`],
      ["Without loop (regex)", `const countVowels = str => (str.match(/[aeiou]/gi) || []).length;
console.log(countVowels("JavaScript"));`],
      ["filter", `const countVowels = str => [...str.toLowerCase()].filter(ch => "aeiou".includes(ch)).length;
console.log(countVowels("JavaScript"));`],
    ],
    cross: [
      ["Why || [] in the regex version?", "match returns null when nothing matches, and null.length would throw an error."],
      ["How do you count consonants?", "Count letters that are alphabets but not vowels: /[a-z]/ and not in 'aeiou'."],
      ["Time complexity?", "O(n)."],
    ],
  },
  {
    q: "Count frequency of each character", tags: ["character frequency", "count characters", "char count", "frequency of characters", "occurrence of characters"],
    a: "I'll use an object. For each character, if it exists I add one, otherwise I set it to one.",
    hi: "Object mein har character ka count rakho.",
    out: '{"h":1,"e":1,"l":2,"o":1}', cx: "O(n)", sc: "O(k)",
    ex: "count[ch] || 0 gives zero the first time, then I add one every time the character appears.",
    ways: [
      ["for...of", `function charCount(str) {
  const count = {};
  for (const ch of str) {
    count[ch] = (count[ch] || 0) + 1;
  }
  return count;
}
console.log(charCount("hello"));`],
      ["Without loop (reduce)", `const charCount = str => [...str].reduce((acc, ch) => {
  acc[ch] = (acc[ch] || 0) + 1;
  return acc;
}, {});
console.log(charCount("hello"));`],
      ["Map", `function charCount(str) {
  const map = new Map();
  for (const ch of str) map.set(ch, (map.get(ch) || 0) + 1);
  return Object.fromEntries(map);
}
console.log(charCount("hello"));`],
    ],
    cross: [
      ["How do you find the most frequent character?", "After counting, loop over the object and keep the key with the highest value."],
      ["Why use an object and not nested loops?", "Nested loops are O(n²). The object gives O(n)."],
      ["Object vs Map here?", "Both work. Map keeps any key type and order, object is simpler for characters."],
    ],
  },
  {
    q: "Find the most frequent character", tags: ["most frequent character", "max occurring character", "maximum occurring character"],
    a: "First I count each character, then I pick the one with the highest count.",
    hi: "Count karo, phir sabse bada count wala.",
    out: "l", cx: "O(n)", sc: "O(k)",
    ex: "The first loop counts, the second loop keeps track of the character with the biggest count.",
    ways: [
      ["Loop", `function mostFrequent(str) {
  const count = {};
  for (const ch of str) count[ch] = (count[ch] || 0) + 1;
  let best = "", max = 0;
  for (const ch in count) {
    if (count[ch] > max) { max = count[ch]; best = ch; }
  }
  return best;
}
console.log(mostFrequent("hello world"));`],
      ["Without loop", `const mostFrequent = str => {
  const count = [...str].reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), {});
  return Object.keys(count).reduce((a, b) => (count[b] > count[a] ? b : a));
};
console.log(mostFrequent("hello world"));`],
    ],
    cross: [
      ["What if there's a tie?", "This returns the first one found. I can return all with the max count if needed."],
      ["Should spaces count?", "I'd ask the interviewer. To ignore them, remove spaces first with replace(/\\s/g, '')."],
    ],
  },
  {
    q: "Find duplicate characters in a string", tags: ["duplicate characters", "repeated characters", "duplicate char"],
    a: "First I count each character, then return the ones with count more than one.",
    hi: "Count karo, jinka count 1 se zyada wahi duplicate.",
    out: '["r","g","m"]', cx: "O(n)", sc: "O(k)",
    ex: "After counting, I keep only characters that appear more than once.",
    ways: [
      ["Loop", `function duplicateChars(str) {
  const count = {};
  for (const ch of str) count[ch] = (count[ch] || 0) + 1;
  const res = [];
  for (const ch in count) {
    if (count[ch] > 1) res.push(ch);
  }
  return res;
}
console.log(duplicateChars("programming"));`],
      ["Without loop", `const duplicateChars = str =>
  [...new Set([...str].filter(ch => str.indexOf(ch) !== str.lastIndexOf(ch)))];
console.log(duplicateChars("programming"));`],
    ],
    cross: [
      ["Which is faster?", "The counting version is O(n). The indexOf version is O(n²) because indexOf is also a loop."],
      ["Return counts too?", "Return Object.entries(count).filter(([, n]) => n > 1)."],
    ],
  },
  {
    q: "Find the first non-repeating character", tags: ["first non repeating character", "first unique character", "non repeating"],
    a: "I'll count all characters first, then loop the string again and return the first one with count one.",
    hi: "Pehle count, phir order mein dekho jiska count 1 hai.",
    out: "c", cx: "O(n)", sc: "O(k)",
    ex: "The second loop goes in the original order, so I get the first unique character.",
    ways: [
      ["Loop", `function firstUnique(str) {
  const count = {};
  for (const ch of str) count[ch] = (count[ch] || 0) + 1;
  for (const ch of str) {
    if (count[ch] === 1) return ch;
  }
  return null;
}
console.log(firstUnique("aabbcdd"));`],
      ["Without loop", `const firstUnique = str =>
  [...str].find(ch => str.indexOf(ch) === str.lastIndexOf(ch)) ?? null;
console.log(firstUnique("aabbcdd"));`],
    ],
    cross: [
      ["Why loop the string again and not the object?", "To keep the original order of the string."],
      ["Can you optimize the find version?", "Yes, it's O(n²). The count version is O(n)."],
      ["What if all characters repeat?", "It returns null."],
    ],
  },
  {
    q: "Check if two strings are anagrams", tags: ["anagram", "anagrams", "check anagram"],
    a: "I'll sort the characters of both strings and compare. If they're equal, they're anagrams.",
    hi: "Dono ko sort karke compare karo.",
    out: "true\nfalse", cx: "O(n log n) sort / O(n) count", sc: "O(n)",
    ex: "If lengths differ I return false early. Otherwise the sorted strings must be the same.",
    ways: [
      ["Without loop (sort)", `function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  return a.split("").sort().join("") === b.split("").sort().join("");
}
console.log(isAnagram("listen", "silent"));
console.log(isAnagram("hello", "world"));`],
      ["Loop (count) — optimized", `function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const count = {};
  for (const ch of a) count[ch] = (count[ch] || 0) + 1;
  for (const ch of b) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}
console.log(isAnagram("listen", "silent"));
console.log(isAnagram("hello", "world"));`],
    ],
    cross: [
      ["Can you optimize it?", "Yes, counting characters is O(n) instead of sorting which is O(n log n)."],
      ["How do you ignore case and spaces?", "Lowercase both and remove spaces before checking."],
    ],
  },
  {
    q: "Remove duplicate characters from a string", tags: ["remove duplicate characters", "unique characters"],
    a: "A Set keeps only unique values, so I'll convert the string to a Set and join it back.",
    hi: "Set duplicate hata deta hai.",
    out: "progamin", cx: "O(n)", sc: "O(n)",
    ex: "new Set removes repeated characters, spread turns it into an array, and join makes a string.",
    ways: [
      ["Loop", `function removeDuplicates(str) {
  let res = "";
  for (const ch of str) {
    if (!res.includes(ch)) res += ch;
  }
  return res;
}
console.log(removeDuplicates("programming"));`],
      ["Without loop (Set)", `const removeDuplicates = str => [...new Set(str)].join("");
console.log(removeDuplicates("programming"));`],
      ["filter", `const removeDuplicates = str => [...str].filter((ch, i) => str.indexOf(ch) === i).join("");
console.log(removeDuplicates("programming"));`],
    ],
    cross: [
      ["Without Set?", "Use the loop with includes, or an object to remember seen characters."],
      ["Does Set keep the order?", "Yes, Set keeps insertion order."],
    ],
  },
  {
    q: "Find the longest word in a sentence", tags: ["longest word"],
    a: "I'll split the sentence into words and keep track of the longest one.",
    hi: "Words mein todo, sabse lamba rakho.",
    out: "JavaScript", cx: "O(n)", sc: "O(n)",
    ex: "Each word is compared with the current longest and replaces it if it's longer.",
    ways: [
      ["Loop", `function longestWord(sentence) {
  let longest = "";
  for (const word of sentence.split(" ")) {
    if (word.length > longest.length) longest = word;
  }
  return longest;
}
console.log(longestWord("I love writing JavaScript code"));`],
      ["Without loop", `const longestWord = s => s.split(" ").reduce((a, b) => (b.length > a.length ? b : a), "");
console.log(longestWord("I love writing JavaScript code"));`],
    ],
    cross: [
      ["Why not sort by length?", "Sorting is O(n log n). One pass is O(n)."],
      ["What if two words have the same length?", "This keeps the first one."],
    ],
  },
  {
    q: "Reverse the words in a sentence", tags: ["reverse words", "reverse sentence", "reverse each word"],
    a: "I'll split by space, reverse the array, and join it back.",
    hi: "Words ka order ulta.",
    out: "coding love I", cx: "O(n)", sc: "O(n)",
    ex: "split makes an array of words, reverse flips the order, join makes the sentence again.",
    ways: [
      ["Loop", `function reverseWords(str) {
  const words = str.split(" ");
  let res = [];
  for (let i = words.length - 1; i >= 0; i--) res.push(words[i]);
  return res.join(" ");
}
console.log(reverseWords("I love coding"));`],
      ["Without loop", `const reverseWords = str => str.split(" ").reverse().join(" ");
console.log(reverseWords("I love coding"));`],
    ],
    cross: [
      ["Reverse each word but keep the order?", "str.split(' ').map(w => w.split('').reverse().join('')).join(' ') gives 'I evol gnidoc'."],
      ["Extra spaces?", "Use str.trim().split(/\\s+/)."],
    ],
  },
  {
    q: "Capitalize the first letter of each word", tags: ["capitalize", "capitalize first letter", "title case"],
    a: "I'll split into words, make the first letter uppercase, and join them back.",
    hi: "Har word ka pehla letter capital.",
    out: "Hello World From Vivek", cx: "O(n)", sc: "O(n)",
    ex: "For each word I uppercase the first character and add the rest with slice(1).",
    ways: [
      ["Loop", `function capitalize(str) {
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
}
console.log(capitalize("hello world from vivek"));`],
      ["Without loop", `const capitalize = str => str.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
console.log(capitalize("hello world from vivek"));`],
    ],
    cross: [["What if a word is empty (double space)?", "w[0] would be undefined. I'd filter empty words or use w.charAt(0), which returns ''."]],
  },
  {
    q: "Count words in a sentence", tags: ["count words", "word count"],
    a: "I'll trim the sentence, split by spaces and count the parts.",
    hi: "Space se todo aur gino.",
    out: "3", cx: "O(n)", sc: "O(n)",
    ex: "trim removes spaces at the ends, and the regex splits on one or more spaces.",
    ways: [
      ["Loop", `function countWords(str) {
  let count = 0, inWord = false;
  for (const ch of str) {
    if (ch !== " " && !inWord) { count++; inWord = true; }
    else if (ch === " ") inWord = false;
  }
  return count;
}
console.log(countWords("  I love   JavaScript "));`],
      ["Without loop", `const countWords = str => str.trim().split(/\\s+/).length;
console.log(countWords("  I love   JavaScript "));`],
    ],
    cross: [["Empty string?", "''.trim().split(/\\s+/) gives [''], length 1, so I'd return 0 if the trimmed string is empty."]],
  },
  {
    q: "String compression (aaabbc → a3b2c1)", tags: ["string compression", "compress string", "run length encoding"],
    a: "I'll count consecutive same characters and add the character with its count.",
    hi: "Lagatar same character gino.",
    out: "a3b2c1", cx: "O(n)", sc: "O(n)",
    ex: "When the next character is different, I add the current character and its count to the result.",
    ways: [
      ["Loop", `function compress(str) {
  let res = "", count = 1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) count++;
    else { res += str[i] + count; count = 1; }
  }
  return res;
}
console.log(compress("aaabbc"));`],
      ["Without loop (regex)", `const compress = str => str.replace(/(.)\\1*/g, m => m[0] + m.length);
console.log(compress("aaabbc"));`],
    ],
    cross: [["What does (.)\\1* mean?", "It matches a character and all its repeats right after it."]],
  },
  {
    q: "Toggle case of a string", tags: ["toggle case", "swap case"],
    a: "For every character, if it's uppercase I make it lowercase, otherwise uppercase.",
    hi: "Capital ko small, small ko capital.",
    out: "hELLO wORLD", cx: "O(n)", sc: "O(n)",
    ex: "Comparing a character with its uppercase version tells me if it's already uppercase.",
    ways: [
      ["Loop", `function toggleCase(str) {
  let res = "";
  for (const ch of str) {
    res += ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase();
  }
  return res;
}
console.log(toggleCase("Hello World"));`],
      ["Without loop", `const toggleCase = s => [...s].map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join("");
console.log(toggleCase("Hello World"));`],
    ],
    cross: [],
  },
  {
    q: "Count occurrences of a character in a string", tags: ["count occurrences", "count a character", "count specific character"],
    a: "I'll loop and count how many times the given character appears.",
    hi: "Ek character kitni baar aaya.",
    out: "4", cx: "O(n)", sc: "O(1)",
    ex: "Every time the character matches, count goes up by one.",
    ways: [
      ["Loop", `function countChar(str, target) {
  let count = 0;
  for (const ch of str) if (ch === target) count++;
  return count;
}
console.log(countChar("javascript java", "a"));`],
      ["Without loop", `const countChar = (str, t) => str.split(t).length - 1;
console.log(countChar("javascript java", "a"));`],
    ],
    cross: [["How does split work here?", "Splitting by the character creates one more piece than the number of times it appears."]],
  },
];
