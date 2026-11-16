import type { Lesson } from '../lesson-types';
import { capture } from '../runtime';

function example1() {
  const original = { nested: { count: 1 } }; const copy = structuredClone(original); copy.nested.count = 2;
  return [original.nested.count, copy.nested.count, original.nested === copy.nested];
}

function example2() {
  const original: { date: Date; self?: unknown } = { date: new Date('2020-01-01T00:00:00Z') }; original.self = original;
  const copy = structuredClone(original);
  return { date: copy.date.toISOString(), cycle: copy.self === copy, jsonCycle: capture(() => JSON.stringify(original)) };
}

export const lesson = {
  "id": "javascript-032",
  "description": "Deep copying duplicates supported reachable data; structuredClone supports cycles and several built-in data types.",
  "when": "Clone structured data when independent ownership is genuinely required.",
  "avoid": "Avoid treating JSON round trips as a universal clone or cloning functions/DOM nodes with structuredClone.",
  "tradeoff": "Deep copying takes time and memory proportional to the cloned graph and does not preserve arbitrary class behavior.",
  "mistakes": [
    {
      "problem": "Losing dates and special values through JSON serialization.",
      "fix": "Use structuredClone for supported data and define explicit serialization for domain classes."
    }
  ],
  "examples": [
    {
      "title": "Nested independence",
      "expected": [
        1,
        2,
        false
      ],
      "explanation": "Both the outer object and nested data are copied.",
      "runtime": "browser",
      "id": "javascript-032.e01",
      "run": example1
    },
    {
      "title": "Date and cycle behavior",
      "expected": {
        "date": "2020-01-01T00:00:00.000Z",
        "cycle": true,
        "jsonCycle": "TypeError"
      },
      "explanation": "structuredClone retains the cycle and Date; JSON rejects the cyclic graph.",
      "runtime": "browser",
      "id": "javascript-032.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-032.q01",
      "level": "Basic",
      "question": "What does Deep copy mean here?",
      "answer": "Deep copying duplicates supported reachable data; structuredClone supports cycles and several built-in data types."
    },
    {
      "id": "javascript-032.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Nested independence”. Why?",
      "answer": "[1, 2, false] Both the outer object and nested data are copied."
    },
    {
      "id": "javascript-032.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Both the outer object and nested data are copied. structuredClone retains the cycle and Date; JSON rejects the cyclic graph."
    },
    {
      "id": "javascript-032.q04",
      "level": "Debugging",
      "question": "Losing dates and special values through JSON serialization. How would you fix it?",
      "answer": "Use structuredClone for supported data and define explicit serialization for domain classes."
    },
    {
      "id": "javascript-032.q05",
      "level": "Senior",
      "question": "What constraints matter when using Deep copy in production?",
      "answer": "Avoid treating JSON round trips as a universal clone or cloning functions/DOM nodes with structuredClone. Deep copying takes time and memory proportional to the cloned graph and does not preserve arbitrary class behavior."
    },
    {
      "id": "javascript-032.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Clone structured data when independent ownership is genuinely required. Deep copying takes time and memory proportional to the cloned graph and does not preserve arbitrary class behavior."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
