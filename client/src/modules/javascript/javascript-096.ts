import type { Lesson, RunContext } from '../lesson-types';
import { integer } from '../runtime';
import { fibonacci } from '../algorithms';

function example1(ctx: RunContext) {
  return fibonacci(integer(ctx.input, 40));
}

function example2(ctx: RunContext) {
  const cache = new Map<number, number>([[0, 0], [1, 1]]); let calculations = 0;
  function fib(n: number): number { if (cache.has(n)) return cache.get(n)!; calculations++; const value = fib(n - 1) + fib(n - 2); cache.set(n, value); return value; }
  return { value: fib(integer(ctx.input, 40)), calculations };
}

export const lesson = {
  "id": "javascript-096",
  "description": "Fibonacci uses F(0)=0, F(1)=1 and F(n)=F(n−1)+F(n−2).",
  "when": "Compare iterative state with memoized recursion.",
  "avoid": "Avoid exponential naive recursion for user-controlled input.",
  "tradeoff": "Iteration takes O(n) time and O(1) auxiliary space; memoized recursion takes O(n) time and O(n) cache/stack space for these bounded Number inputs.",
  "mistakes": [
    {
      "problem": "Recomputing the same subproblems repeatedly.",
      "fix": "Carry two iterative values or memoize each subproblem."
    }
  ],
  "examples": [
    {
      "title": "Iterative nth Fibonacci",
      "expected": 55,
      "explanation": "The helper advances a pair of adjacent sequence values.",
      "runtime": "browser",
      "input": {
        "label": "Index 0–40",
        "initial": "10"
      },
      "id": "javascript-096.e01",
      "run": example1
    },
    {
      "title": "Memoized recursion computes each subproblem once",
      "expected": {
        "value": 55,
        "calculations": 9
      },
      "explanation": "The cache starts with both base cases and computes indices 2 through 10 once.",
      "runtime": "browser",
      "input": {
        "label": "Index 0–40",
        "initial": "10"
      },
      "id": "javascript-096.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-096.q01",
      "level": "Basic",
      "question": "What does Fibonacci mean here?",
      "answer": "Fibonacci uses F(0)=0, F(1)=1 and F(n)=F(n−1)+F(n−2)."
    },
    {
      "id": "javascript-096.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Iterative nth Fibonacci”. Why?",
      "answer": "55 The helper advances a pair of adjacent sequence values."
    },
    {
      "id": "javascript-096.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The helper advances a pair of adjacent sequence values. The cache starts with both base cases and computes indices 2 through 10 once."
    },
    {
      "id": "javascript-096.q04",
      "level": "Debugging",
      "question": "Recomputing the same subproblems repeatedly. How would you fix it?",
      "answer": "Carry two iterative values or memoize each subproblem."
    },
    {
      "id": "javascript-096.q05",
      "level": "Senior",
      "question": "What constraints matter when using Fibonacci in production?",
      "answer": "Avoid exponential naive recursion for user-controlled input. Iteration takes O(n) time and O(1) auxiliary space; memoized recursion takes O(n) time and O(n) cache/stack space for these bounded Number inputs."
    },
    {
      "id": "javascript-096.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Compare iterative state with memoized recursion. Iteration takes O(n) time and O(1) auxiliary space; memoized recursion takes O(n) time and O(n) cache/stack space for these bounded Number inputs."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
