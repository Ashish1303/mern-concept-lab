import type { Lesson } from '../lesson-types';

function example1() {
  function makeCounter() { let count = 0; return () => ++count; }
  const a = makeCounter(); const b = makeCounter();
  return [a(), a(), b()];
}

function example2() {
  function account() { let balance = 0; return { add: () => ++balance, read: () => balance }; }
  const item = account(); item.add(); item.add(); return item.read();
}

function example3() {
  let count = 0;
  const message = `Count: ${count}`;
  const snapshot = () => message;
  const live = () => `Count: ${count}`;
  count = 3;
  return [snapshot(), live()];
}

function example4() {
  const wrong: (() => number)[] = [];
  // eslint-disable-next-line no-var -- Intentional language-semantics example; compare the result with the corrected alternative.
  for (var index = 0; index < 3; index++) wrong.push(() => index);
  const fixed: (() => number)[] = [];
  for (let index = 0; index < 3; index++) fixed.push(() => index);
  return { wrong: wrong.map(fn => fn()), fixed: fixed.map(fn => fn()) };
}

function example5() {
  const multiplyBy = (factor: number) => (value: number) => factor * value;
  const twice = multiplyBy(2); const threeTimes = multiplyBy(3);
  return [twice(4), threeTimes(4)];
}

export const lesson = {
  "id": "javascript-021",
  "description": "Closures retain access to their defining lexical bindings after the outer call has returned.",
  "when": "Build private state, callbacks and function factories.",
  "avoid": "Avoid retaining large objects in long-lived closures without lifecycle cleanup.",
  "tradeoff": "Each factory call creates an independent environment; closures can also intentionally share one environment.",
  "mistakes": [
    {
      "problem": "Confusing a captured binding with a one-time value snapshot.",
      "fix": "Read the live binding when needed, or deliberately capture a snapshot and name it accordingly."
    }
  ],
  "examples": [
    {
      "title": "Independent counter factories",
      "expected": [
        1,
        2,
        1
      ],
      "explanation": "Each factory invocation has its own count binding.",
      "runtime": "browser",
      "id": "javascript-021.e01",
      "run": example1
    },
    {
      "title": "Shared binding across two callbacks",
      "expected": 2,
      "explanation": "Both callbacks refer to the same balance environment.",
      "runtime": "browser",
      "id": "javascript-021.e02",
      "run": example2
    },
    {
      "title": "Stale snapshot versus live read",
      "expected": [
        "Count: 0",
        "Count: 3"
      ],
      "explanation": "The formatted string is computed before mutation; the live callback formats when called.",
      "runtime": "browser",
      "id": "javascript-021.e03",
      "run": example3
    },
    {
      "title": "Loop binding bug and block-scoped fix",
      "expected": {
        "wrong": [
          3,
          3,
          3
        ],
        "fixed": [
          0,
          1,
          2
        ]
      },
      "explanation": "var shares one loop binding; let creates a binding for each iteration.",
      "runtime": "browser",
      "id": "javascript-021.e04",
      "run": example4
    },
    {
      "title": "Function factory retains a configuration",
      "expected": [
        8,
        12
      ],
      "explanation": "Returned functions retain their separate factor parameters.",
      "runtime": "browser",
      "id": "javascript-021.e05",
      "run": example5
    }
  ],
  "questions": [
    {
      "id": "javascript-021.q01",
      "level": "Basic",
      "question": "What does Closures mean here?",
      "answer": "Closures retain access to their defining lexical bindings after the outer call has returned."
    },
    {
      "id": "javascript-021.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Independent counter factories”. Why?",
      "answer": "[1, 2, 1] Each factory invocation has its own count binding."
    },
    {
      "id": "javascript-021.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Each factory invocation has its own count binding. Both callbacks refer to the same balance environment."
    },
    {
      "id": "javascript-021.q04",
      "level": "Debugging",
      "question": "Confusing a captured binding with a one-time value snapshot. How would you fix it?",
      "answer": "Read the live binding when needed, or deliberately capture a snapshot and name it accordingly."
    },
    {
      "id": "javascript-021.q05",
      "level": "Senior",
      "question": "What constraints matter when using Closures in production?",
      "answer": "Avoid retaining large objects in long-lived closures without lifecycle cleanup. Each factory call creates an independent environment; closures can also intentionally share one environment."
    },
    {
      "id": "javascript-021.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Build private state, callbacks and function factories. Each factory call creates an independent environment; closures can also intentionally share one environment."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
