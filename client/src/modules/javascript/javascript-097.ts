import type { Lesson, RunContext } from '../lesson-types';
import { integer } from '../runtime';
import { isPrime } from '../algorithms';

function example1(ctx: RunContext) {
  return isPrime(integer(ctx.input, 100000));
}

function example2(ctx: RunContext) {
  const n = integer(ctx.input, 1000); const composite = new Array<boolean>(n + 1).fill(false);
  for (let p = 2; p * p <= n; p++) if (!composite[p]) for (let multiple = p * p; multiple <= n; multiple += p) composite[multiple] = true;
  const primes: number[] = []; for (let value = 2; value <= n; value++) if (!composite[value]) primes.push(value); return primes;
}

export const lesson = {
  "id": "javascript-097",
  "description": "A prime is an integer greater than one with no positive divisors other than one and itself.",
  "when": "Practice divisibility bounds and sieve-based batch computation.",
  "avoid": "Avoid treating zero or one as prime.",
  "tradeoff": "Trial division is O(√n) time/O(1) auxiliary space; the sieve uses O(n log log n) time/O(n) space for all primes up to n.",
  "mistakes": [
    {
      "problem": "Checking divisors only below sqrt(n) and missing a perfect square.",
      "fix": "Include divisor*divisor <= n and handle values below two."
    }
  ],
  "examples": [
    {
      "title": "Bounded trial division",
      "expected": true,
      "explanation": "Any composite number has a factor no larger than its square root.",
      "runtime": "browser",
      "input": {
        "label": "Integer 0–100000",
        "initial": "17"
      },
      "id": "javascript-097.e01",
      "run": example1
    },
    {
      "title": "Sieve generates every prime up to a bound",
      "expected": [
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19
      ],
      "explanation": "The sieve starts marking multiples at p² because smaller multiples were handled earlier.",
      "runtime": "browser",
      "input": {
        "label": "Upper bound 0–1000",
        "initial": "20"
      },
      "id": "javascript-097.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-097.q01",
      "level": "Basic",
      "question": "What does Prime number mean here?",
      "answer": "A prime is an integer greater than one with no positive divisors other than one and itself."
    },
    {
      "id": "javascript-097.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Bounded trial division”. Why?",
      "answer": "true Any composite number has a factor no larger than its square root."
    },
    {
      "id": "javascript-097.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Any composite number has a factor no larger than its square root. The sieve starts marking multiples at p² because smaller multiples were handled earlier."
    },
    {
      "id": "javascript-097.q04",
      "level": "Debugging",
      "question": "Checking divisors only below sqrt(n) and missing a perfect square. How would you fix it?",
      "answer": "Include divisor*divisor <= n and handle values below two."
    },
    {
      "id": "javascript-097.q05",
      "level": "Senior",
      "question": "What constraints matter when using Prime number in production?",
      "answer": "Avoid treating zero or one as prime. Trial division is O(√n) time/O(1) auxiliary space; the sieve uses O(n log log n) time/O(n) space for all primes up to n."
    },
    {
      "id": "javascript-097.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Practice divisibility bounds and sieve-based batch computation. Trial division is O(√n) time/O(1) auxiliary space; the sieve uses O(n log log n) time/O(n) space for all primes up to n."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
