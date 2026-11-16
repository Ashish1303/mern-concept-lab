import type { Lesson } from '../lesson-types';

function example1() {
  const total = (...values: number[]) => values.reduce((sum, value) => sum + value, 0);
  return total(...[1, 2, 3]);
}

function example2() {
  const original = { nested: { count: 1 } };
  const shallow = { ...original };
  shallow.nested.count = 2;
  const fixed = { ...original, nested: { ...original.nested, count: 3 } };
  return [original.nested.count, fixed.nested.count, shallow.nested === original.nested];
}

export const lesson = {
  "id": "javascript-016",
  "description": "Rest collects arguments; spread expands iterables or copies enumerable own object properties.",
  "when": "Use rest for variadic inputs and spread for shallow immutable updates.",
  "avoid": "Avoid assuming spread recursively clones nested objects or preserves prototypes.",
  "tradeoff": "Spread costs time proportional to copied entries and only copies one level.",
  "mistakes": [
    {
      "problem": "Mutating a nested object after a shallow spread.",
      "fix": "Copy the nested object as well when it must be independent."
    }
  ],
  "examples": [
    {
      "title": "Rest collection and iterable expansion",
      "expected": 6,
      "explanation": "Spread supplies arguments, then rest collects them into the function’s array.",
      "runtime": "browser",
      "id": "javascript-016.e01",
      "run": example1
    },
    {
      "title": "Shallow spread and nested correction",
      "expected": [
        2,
        3,
        true
      ],
      "explanation": "The shallow copy shares nested identity; the corrected update copies that level.",
      "runtime": "browser",
      "id": "javascript-016.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-016.q01",
      "level": "Basic",
      "question": "What does Rest and spread operators mean here?",
      "answer": "Rest collects arguments; spread expands iterables or copies enumerable own object properties."
    },
    {
      "id": "javascript-016.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Rest collection and iterable expansion”. Why?",
      "answer": "6 Spread supplies arguments, then rest collects them into the function’s array."
    },
    {
      "id": "javascript-016.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Spread supplies arguments, then rest collects them into the function’s array. The shallow copy shares nested identity; the corrected update copies that level."
    },
    {
      "id": "javascript-016.q04",
      "level": "Debugging",
      "question": "Mutating a nested object after a shallow spread. How would you fix it?",
      "answer": "Copy the nested object as well when it must be independent."
    },
    {
      "id": "javascript-016.q05",
      "level": "Senior",
      "question": "What constraints matter when using Rest and spread operators in production?",
      "answer": "Avoid assuming spread recursively clones nested objects or preserves prototypes. Spread costs time proportional to copied entries and only copies one level."
    },
    {
      "id": "javascript-016.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use rest for variadic inputs and spread for shallow immutable updates. Spread costs time proportional to copied entries and only copies one level."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
