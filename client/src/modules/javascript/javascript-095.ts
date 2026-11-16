import type { Lesson, RunContext } from '../lesson-types';
import { integer } from '../runtime';
import { factorial } from '../algorithms';

function example1(ctx: RunContext) {
  return factorial(integer(ctx.input, 100)).toString();
}

function example2(ctx: RunContext) {
  function recursive(value: number): bigint { return value < 2 ? 1n : BigInt(value) * recursive(value - 1); }
  const n = integer(ctx.input, 30); return { zero: recursive(0).toString(), result: recursive(n).toString() };
}

export const lesson = {
  "id": "javascript-095",
  "description": "Factorial multiplies positive integers up to n, with 0! equal to one. BigInt avoids Number precision loss.",
  "when": "Practice base cases, iteration and bounded recursion.",
  "avoid": "Avoid unbounded inputs or Number arithmetic for large exact factorials.",
  "tradeoff": "Iteration is O(n) multiplications and O(1) auxiliary slots; recursion adds O(n) stack space. BigInt operation cost grows with result size.",
  "mistakes": [
    {
      "problem": "Using zero as the initial product or forgetting the zero base case.",
      "fix": "Start from one and use BigInt for exact integer multiplication."
    }
  ],
  "examples": [
    {
      "title": "Iterative exact factorial",
      "expected": "120",
      "explanation": "The helper multiplies BigInt values, starting from one.",
      "runtime": "browser",
      "input": {
        "label": "Integer 0–100",
        "initial": "5"
      },
      "id": "javascript-095.e01",
      "run": example1
    },
    {
      "title": "Recursive base case",
      "expected": {
        "zero": "1",
        "result": "120"
      },
      "explanation": "The bounded recursion terminates at zero or one.",
      "runtime": "browser",
      "input": {
        "label": "Integer 0–30",
        "initial": "5"
      },
      "id": "javascript-095.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-095.q01",
      "level": "Basic",
      "question": "What does Factorial mean here?",
      "answer": "Factorial multiplies positive integers up to n, with 0! equal to one. BigInt avoids Number precision loss."
    },
    {
      "id": "javascript-095.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Iterative exact factorial”. Why?",
      "answer": "\"120\" The helper multiplies BigInt values, starting from one."
    },
    {
      "id": "javascript-095.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The helper multiplies BigInt values, starting from one. The bounded recursion terminates at zero or one."
    },
    {
      "id": "javascript-095.q04",
      "level": "Debugging",
      "question": "Using zero as the initial product or forgetting the zero base case. How would you fix it?",
      "answer": "Start from one and use BigInt for exact integer multiplication."
    },
    {
      "id": "javascript-095.q05",
      "level": "Senior",
      "question": "What constraints matter when using Factorial in production?",
      "answer": "Avoid unbounded inputs or Number arithmetic for large exact factorials. Iteration is O(n) multiplications and O(1) auxiliary slots; recursion adds O(n) stack space. BigInt operation cost grows with result size."
    },
    {
      "id": "javascript-095.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Practice base cases, iteration and bounded recursion. Iteration is O(n) multiplications and O(1) auxiliary slots; recursion adds O(n) stack space. BigInt operation cost grows with result size."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
