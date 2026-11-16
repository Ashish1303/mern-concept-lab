import type { Lesson, RunContext } from '../lesson-types';
import { integer } from '../runtime';

function example1(ctx: RunContext) {
  const cache = new Map<number, number>(); let calculations = 0; const square = (value: number) => { if (cache.has(value)) return cache.get(value)!; calculations++; const result = value * value; cache.set(value, result); return result; };
  const n = integer(ctx.input); return { first: square(n), second: square(n), calculations };
}

function example2() {
  const first = ['1', '23']; const second = ['12', '3'];
  return { wrongCollision: first.join('') === second.join(''), safeCollision: JSON.stringify(first) === JSON.stringify(second) };
}

export const lesson = {
  "id": "javascript-111",
  "description": "A memoization implementation caches results under a key that represents every relevant argument.",
  "when": "Reuse a pure result while observing actual computation counts.",
  "avoid": "Avoid ambiguous concatenated keys or unbounded caches.",
  "tradeoff": "Typical lookups are sublinear; cache space is O(k), so production caches need eviction.",
  "mistakes": [
    {
      "problem": "Colliding argument tuples when concatenating their string representations.",
      "fix": "Use an unambiguous tuple encoding for the deliberately supported primitive arguments."
    }
  ],
  "examples": [
    {
      "title": "Compute once per numeric key",
      "expected": {
        "first": 25,
        "second": 25,
        "calculations": 1
      },
      "explanation": "The second call retrieves the stored result.",
      "runtime": "browser",
      "input": {
        "label": "Integer 0–100",
        "initial": "5"
      },
      "id": "javascript-111.e01",
      "run": example1
    },
    {
      "title": "Ambiguous key bug versus tuple encoding",
      "expected": {
        "wrongCollision": true,
        "safeCollision": false
      },
      "explanation": "JSON tuple encoding distinguishes these supported string argument sequences.",
      "runtime": "browser",
      "id": "javascript-111.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-111.q01",
      "level": "Basic",
      "question": "What does Implement memoization mean here?",
      "answer": "A memoization implementation caches results under a key that represents every relevant argument."
    },
    {
      "id": "javascript-111.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Compute once per numeric key”. Why?",
      "answer": "{\"first\": 25, \"second\": 25, \"calculations\": 1} The second call retrieves the stored result."
    },
    {
      "id": "javascript-111.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The second call retrieves the stored result. JSON tuple encoding distinguishes these supported string argument sequences."
    },
    {
      "id": "javascript-111.q04",
      "level": "Debugging",
      "question": "Colliding argument tuples when concatenating their string representations. How would you fix it?",
      "answer": "Use an unambiguous tuple encoding for the deliberately supported primitive arguments."
    },
    {
      "id": "javascript-111.q05",
      "level": "Senior",
      "question": "What constraints matter when using Implement memoization in production?",
      "answer": "Avoid ambiguous concatenated keys or unbounded caches. Typical lookups are sublinear; cache space is O(k), so production caches need eviction."
    },
    {
      "id": "javascript-111.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Reuse a pure result while observing actual computation counts. Typical lookups are sublinear; cache space is O(k), so production caches need eviction."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
