import type { Lesson } from '../lesson-types';

function example1() {
  const trace: string[] = [];
  function visit(level: number): void { trace.push(`enter ${level}`); if (level > 0) visit(level - 1); trace.push(`exit ${level}`); }
  visit(2); return trace;
}

function example2() {
  let recursiveCalls = 0;
  function recursive(n: number): number { recursiveCalls++; return n === 0 ? 0 : n + recursive(n - 1); }
  let iterative = 0; for (let n = 3; n > 0; n--) iterative += n;
  return { recursive: recursive(3), iterative, recursiveCalls };
}

export const lesson = {
  "id": "javascript-024",
  "description": "The call stack tracks active synchronous calls. Deep recursion consumes stack frames; iteration avoids that growth.",
  "when": "Use traces to explain recursion and nested synchronous work.",
  "avoid": "Avoid unbounded recursion on user input.",
  "tradeoff": "Recursion can be clear, but JavaScript engines do not offer a portable unlimited recursion depth.",
  "mistakes": [
    {
      "problem": "Using recursion without a reachable base case.",
      "fix": "Bound inputs and provide a base case, or use iteration for large workloads."
    }
  ],
  "examples": [
    {
      "title": "Bounded recursive stack trace",
      "expected": [
        "enter 2",
        "enter 1",
        "enter 0",
        "exit 0",
        "exit 1",
        "exit 2"
      ],
      "explanation": "Calls unwind in reverse order after reaching the base case.",
      "runtime": "browser",
      "id": "javascript-024.e01",
      "run": example1
    },
    {
      "title": "Iterative equivalent uses no recursive calls",
      "expected": {
        "recursive": 6,
        "iterative": 6,
        "recursiveCalls": 4
      },
      "explanation": "The same sum can be produced with a loop rather than one call per level.",
      "runtime": "browser",
      "id": "javascript-024.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-024.q01",
      "level": "Basic",
      "question": "What does Call stack mean here?",
      "answer": "The call stack tracks active synchronous calls. Deep recursion consumes stack frames; iteration avoids that growth."
    },
    {
      "id": "javascript-024.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Bounded recursive stack trace”. Why?",
      "answer": "[\"enter 2\", \"enter 1\", \"enter 0\", \"exit 0\", \"exit 1\", \"exit 2\"] Calls unwind in reverse order after reaching the base case."
    },
    {
      "id": "javascript-024.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Calls unwind in reverse order after reaching the base case. The same sum can be produced with a loop rather than one call per level."
    },
    {
      "id": "javascript-024.q04",
      "level": "Debugging",
      "question": "Using recursion without a reachable base case. How would you fix it?",
      "answer": "Bound inputs and provide a base case, or use iteration for large workloads."
    },
    {
      "id": "javascript-024.q05",
      "level": "Senior",
      "question": "What constraints matter when using Call stack in production?",
      "answer": "Avoid unbounded recursion on user input. Recursion can be clear, but JavaScript engines do not offer a portable unlimited recursion depth."
    },
    {
      "id": "javascript-024.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use traces to explain recursion and nested synchronous work. Recursion can be clear, but JavaScript engines do not offer a portable unlimited recursion depth."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
