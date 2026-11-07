// Number / logic programs
export default [
  {
    q: "FizzBuzz", tags: ["fizzbuzz", "fizz buzz"],
    a: "For 1 to n: divisible by 15 print FizzBuzz, by 3 Fizz, by 5 Buzz, otherwise the number.",
    hi: "15 wala check pehle.",
    out: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz", cx: "O(n)", sc: "O(1)",
    ex: "I check 15 first, otherwise 15 would only print Fizz.",
    ways: [
      ["Loop", `for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`],
      ["Without loop", `Array.from({ length: 15 }, (_, k) => k + 1)
  .map(i => (i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i)
  .forEach(x => console.log(x));`],
    ],
    cross: [["Why check 15 first?", "Because 15 is divisible by 3 too, and the 3 check would catch it first."]],
  },
  {
    q: "Factorial of a number", tags: ["factorial"],
    a: "Factorial is the product of all numbers from 1 to n. I multiply in a loop, or use recursion.",
    hi: "1 se n tak multiply.",
    out: "120", cx: "O(n)", sc: "O(1) loop / O(n) recursion",
    ex: "res starts at 1 and gets multiplied by every number up to n.",
    ways: [
      ["Loop", `function factorial(n) {
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}
console.log(factorial(5));`],
      ["Recursion (without loop)", `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5));`],
      ["reduce", `const factorial = n => Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1);
console.log(factorial(5));`],
    ],
    cross: [
      ["What is the base case in recursion?", "n <= 1 returns 1. Without it, the function never stops."],
      ["Factorial of 0?", "It's 1."],
      ["Very large numbers?", "Use BigInt, because normal numbers lose precision after about 20!."],
    ],
  },
  {
    q: "Fibonacci series", tags: ["fibonacci", "fibonacci series", "fibonacci program"],
    a: "Each number is the sum of the previous two. I start with 0 and 1.",
    hi: "Pichle do ka sum.",
    out: "[0,1,1,2,3,5,8]", cx: "O(n)", sc: "O(n)",
    ex: "Every new value is made from the last two values.",
    ways: [
      ["Loop", `function fibonacci(n) {
  const res = [0, 1];
  for (let i = 2; i < n; i++) res.push(res[i - 1] + res[i - 2]);
  return res.slice(0, n);
}
console.log(fibonacci(7));`],
      ["Two variables", `function fibonacci(n) {
  const res = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    res.push(a);
    [a, b] = [b, a + b];
  }
  return res;
}
console.log(fibonacci(7));`],
      ["Recursion (without loop)", `const fib = n => (n < 2 ? n : fib(n - 1) + fib(n - 2));
console.log(Array.from({ length: 7 }, (_, i) => fib(i)));`],
    ],
    cross: [
      ["Problem with plain recursion?", "It's O(2ⁿ) because it recalculates the same values. Memoization makes it O(n)."],
      ["Only the nth number?", "Use two variables and return a, which is O(1) space."],
    ],
  },
  {
    q: "Check if a number is prime", tags: ["prime", "prime number", "check prime"],
    a: "A prime number is divisible only by 1 and itself. I check divisors from 2 up to the square root.",
    hi: "√n tak divide karke dekho.",
    out: "true false", cx: "O(√n)", sc: "O(1)",
    ex: "Checking up to the square root is enough and makes it faster.",
    ways: [
      ["Loop", `function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
console.log(isPrime(29), isPrime(10));`],
      ["Without loop", `const isPrime = n => n > 1 && Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, i) => i + 2).every(d => n % d !== 0);
console.log(isPrime(29), isPrime(10));`],
    ],
    cross: [
      ["Why only up to √n?", "If n has a factor bigger than √n, its pair is smaller than √n, so we'd already have found it."],
      ["Is 1 prime?", "No."],
      ["Print primes from 1 to 50?", "Loop 1 to 50 and print where isPrime is true."],
    ],
  },
  {
    q: "Print prime numbers in a range", tags: ["primes in range", "print prime numbers", "prime numbers 1 to 50"],
    a: "I loop through the range and print the numbers that are prime.",
    hi: "Range mein har number ka prime check.",
    out: "[2,3,5,7,11,13,17,19]", cx: "O(n√n)", sc: "O(k)",
    ex: "I reuse the isPrime check for each number.",
    ways: [
      ["Loop", `function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}
const res = [];
for (let i = 1; i <= 20; i++) if (isPrime(i)) res.push(i);
console.log(res);`],
      ["Without loop", `const isPrime = n => n > 1 && [...Array(Math.floor(Math.sqrt(n)) + 1).keys()].slice(2).every(d => n % d);
console.log([...Array(21).keys()].filter(isPrime));`],
    ],
    cross: [],
  },
  {
    q: "Check Armstrong number", tags: ["armstrong", "armstrong number"],
    a: "Each digit raised to the number of digits, added together, should equal the number.",
    hi: "Har digit^digits ka sum = number.",
    out: "true false", cx: "O(d)", sc: "O(1)",
    ex: "153 = 1³ + 5³ + 3³, so it's an Armstrong number.",
    ways: [
      ["Loop", `function isArmstrong(n) {
  const digits = String(n).length;
  let sum = 0, temp = n;
  while (temp > 0) {
    sum += (temp % 10) ** digits;
    temp = Math.floor(temp / 10);
  }
  return sum === n;
}
console.log(isArmstrong(153), isArmstrong(123));`],
      ["Without loop", `const isArmstrong = n => {
  const d = String(n).split("");
  return d.reduce((s, x) => s + Number(x) ** d.length, 0) === n;
};
console.log(isArmstrong(153), isArmstrong(123));`],
    ],
    cross: [["Why power = number of digits, not always 3?", "For a 4-digit number like 9474, each digit is raised to 4."]],
  },
  {
    q: "Reverse a number", tags: ["reverse number", "reverse a number", "reverse integer"],
    a: "I take the last digit with % 10, add it to the result, and remove it with division by 10.",
    hi: "% 10 se last digit, / 10 se hatao.",
    out: "4321", cx: "O(d)", sc: "O(1)",
    ex: "rev * 10 shifts digits left, and the new digit is added at the end.",
    ways: [
      ["Loop", `function reverseNumber(n) {
  let rev = 0;
  while (n > 0) {
    rev = rev * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  return rev;
}
console.log(reverseNumber(1234));`],
      ["Without loop", `const reverseNumber = n => Number(String(n).split("").reverse().join(""));
console.log(reverseNumber(1234));`],
    ],
    cross: [["Negative numbers?", "Reverse Math.abs(n) and multiply by Math.sign(n)."]],
  },
  {
    q: "Check palindrome number", tags: ["palindrome number"],
    a: "I reverse the number using modulo and division, then compare with the original.",
    hi: "Math se number ulta karo.",
    out: "true false", cx: "O(d)", sc: "O(1)",
    ex: "temp % 10 gives the last digit, dividing by 10 removes it.",
    ways: [
      ["Loop", `function isPalindromeNumber(n) {
  let rev = 0, temp = n;
  while (temp > 0) {
    rev = rev * 10 + (temp % 10);
    temp = Math.floor(temp / 10);
  }
  return rev === n;
}
console.log(isPalindromeNumber(121), isPalindromeNumber(123));`],
      ["Without loop", `const isPalindromeNumber = n => String(n) === String(n).split("").reverse().join("");
console.log(isPalindromeNumber(121), isPalindromeNumber(123));`],
    ],
    cross: [["Without converting to string?", "Use the math loop version."]],
  },
  {
    q: "Count digits in a number", tags: ["count digits", "number of digits"],
    a: "I divide by 10 until the number becomes 0, counting each step.",
    hi: "10 se divide karte raho, gino.",
    out: "5", cx: "O(d)", sc: "O(1)",
    ex: "Each division removes one digit.",
    ways: [
      ["Loop", `function countDigits(n) {
  let count = 0;
  do { count++; n = Math.floor(n / 10); } while (n > 0);
  return count;
}
console.log(countDigits(12345));`],
      ["Without loop", `console.log(String(Math.abs(12345)).length);`],
    ],
    cross: [["Why do...while?", "So 0 is counted as 1 digit."]],
  },
  {
    q: "Sum of digits of a number", tags: ["sum of digits", "digit sum"],
    a: "I take the last digit with % 10, add it, and remove it with division by 10.",
    hi: "% 10 se digit, / 10 se hatao.",
    out: "10", cx: "O(d)", sc: "O(1)",
    ex: "1 + 2 + 3 + 4 = 10.",
    ways: [
      ["Loop", `function sumDigits(n) {
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}
console.log(sumDigits(1234));`],
      ["Without loop", `const sumDigits = n => String(n).split("").reduce((s, d) => s + Number(d), 0);
console.log(sumDigits(1234));`],
    ],
    cross: [],
  },
  {
    q: "Swap two numbers", tags: ["swap", "swap two numbers", "swap without third variable"],
    a: "I can use a temp variable, destructuring, or plus and minus without a third variable.",
    hi: "3 tareeke.",
    out: "10 5", cx: "O(1)", sc: "O(1)",
    ex: "Destructuring swaps both in one line.",
    ways: [
      ["Destructuring", `let a = 5, b = 10;
[a, b] = [b, a];
console.log(a, b);`],
      ["Temp variable", `let a = 5, b = 10;
let temp = a;
a = b;
b = temp;
console.log(a, b);`],
      ["Without third variable", `let a = 5, b = 10;
a = a + b;
b = a - b;
a = a - b;
console.log(a, b);`],
    ],
    cross: [["Without a third variable?", "a = a + b; b = a - b; a = a - b; or destructuring."]],
  },
  {
    q: "Find GCD and LCM", tags: ["gcd", "lcm", "hcf"],
    a: "GCD uses Euclid's method: repeat a % b until b is zero. LCM is a times b divided by GCD.",
    hi: "Euclid se GCD, LCM = a×b/GCD.",
    out: "6 36", cx: "O(log n)", sc: "O(1)",
    ex: "When b becomes zero, a is the GCD.",
    ways: [
      ["Loop", `function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}
const lcm = (a, b) => (a * b) / gcd(a, b);
console.log(gcd(12, 18), lcm(12, 18));`],
      ["Recursion", `const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);
console.log(gcd(12, 18), lcm(12, 18));`],
    ],
    cross: [],
  },
  {
    q: "Check leap year", tags: ["leap year"],
    a: "A year is a leap year if it's divisible by 4 but not by 100, or divisible by 400.",
    hi: "4 se divide, 100 se nahi, ya 400 se.",
    out: "true false true", cx: "O(1)", sc: "O(1)",
    ex: "1900 is divisible by 100 but not 400, so it's not a leap year.",
    ways: [["Code", `function isLeap(y) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}
console.log(isLeap(2024), isLeap(1900), isLeap(2000));`]],
    cross: [],
  },
  {
    q: "Check even or odd", tags: ["even odd", "even or odd"],
    a: "If the number divided by 2 has remainder 0, it's even, otherwise odd.",
    hi: "% 2 === 0 → even.",
    out: "even odd", cx: "O(1)", sc: "O(1)",
    ex: "The % operator gives the remainder.",
    ways: [["Code", `const evenOdd = n => (n % 2 === 0 ? "even" : "odd");
console.log(evenOdd(4), evenOdd(7));`]],
    cross: [["Without % operator?", "Use (n & 1) === 0 for even, a bitwise check."]],
  },
  {
    q: "Sum of first n natural numbers", tags: ["sum of n numbers", "sum of natural numbers", "sum 1 to n"],
    a: "With a loop I add 1 to n. Without a loop, the formula is n times n plus one, divided by two.",
    hi: "Formula n(n+1)/2.",
    out: "55", cx: "Loop O(n), formula O(1)", sc: "O(1)",
    ex: "The formula gives the answer directly.",
    ways: [
      ["Loop", `let sum = 0;
for (let i = 1; i <= 10; i++) sum += i;
console.log(sum);`],
      ["Without loop (formula)", `const n = 10;
console.log((n * (n + 1)) / 2);`],
      ["Recursion", `const sum = n => (n === 0 ? 0 : n + sum(n - 1));
console.log(sum(10));`],
    ],
    cross: [["Best way?", "The formula, O(1)."]],
  },
  {
    q: "Print multiplication table", tags: ["multiplication table", "table of a number", "print table"],
    a: "I loop from 1 to 10 and print the number times i.",
    hi: "1 se 10 tak multiply.",
    out: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15", cx: "O(n)", sc: "O(1)",
    ex: "Each line prints the number, i, and their product.",
    ways: [
      ["Loop", `const n = 5;
for (let i = 1; i <= 3; i++) console.log(n + " x " + i + " = " + n * i);`],
      ["Without loop", `const n = 5;
Array.from({ length: 3 }, (_, i) => i + 1).forEach(i => console.log(n + " x " + i + " = " + n * i));`],
    ],
    cross: [],
  },
  {
    q: "Print a star pattern (pyramid)", tags: ["star pattern", "pyramid pattern", "pattern program"],
    a: "For each row, I print spaces and then stars, using repeat.",
    hi: "Har row: spaces + stars.",
    out: "  *\n ***\n*****", cx: "O(n²)", sc: "O(n)",
    ex: "Row i has n - i spaces and 2i - 1 stars.",
    ways: [
      ["Loop", `const n = 3;
for (let i = 1; i <= n; i++) {
  console.log(" ".repeat(n - i) + "*".repeat(2 * i - 1));
}`],
      ["Nested loop (no repeat)", `const n = 3;
for (let i = 1; i <= n; i++) {
  let row = "";
  for (let s = 0; s < n - i; s++) row += " ";
  for (let k = 0; k < 2 * i - 1; k++) row += "*";
  console.log(row);
}`],
    ],
    cross: [["Right triangle?", "console.log('*'.repeat(i)) for each row."]],
  },
];
