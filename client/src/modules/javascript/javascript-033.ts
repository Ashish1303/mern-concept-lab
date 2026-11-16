import type { Lesson } from '../lesson-types';

function example1() {
  const a = { id: 1 }; const b = { id: 1 }; const alias = a;
  return [a === b, a === alias, JSON.stringify(a) === JSON.stringify(b)];
}

function example2() {
  const key = { id: 1 }; const map = new Map<object, string>([[key, 'found']]);
  return [map.get(key), String(map.get({ id: 1 }))];
}

export const lesson = {
  "id": "javascript-033",
  "description": "Object references identify allocations, not object contents. Equal-looking objects can be different Map keys.",
  "when": "Use identity deliberately for caching and reference-based updates.",
  "avoid": "Avoid expecting structural equality from ===.",
  "tradeoff": "Identity comparisons are cheap; structural comparison needs a defined algorithm and can be expensive.",
  "mistakes": [
    {
      "problem": "Using a fresh object to retrieve a Map entry stored under another object.",
      "fix": "Retain the key identity or use a stable primitive key."
    }
  ],
  "examples": [
    {
      "title": "Equal values, different identities",
      "expected": [
        false,
        true,
        true
      ],
      "explanation": "Serialization equality in this tiny case does not change allocation identity.",
      "runtime": "browser",
      "id": "javascript-033.e01",
      "run": example1
    },
    {
      "title": "Object keys in Map",
      "expected": [
        "found",
        "undefined"
      ],
      "explanation": "Only the original reference identifies the stored key.",
      "runtime": "browser",
      "id": "javascript-033.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-033.q01",
      "level": "Basic",
      "question": "What does Object references mean here?",
      "answer": "Object references identify allocations, not object contents. Equal-looking objects can be different Map keys."
    },
    {
      "id": "javascript-033.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Equal values, different identities”. Why?",
      "answer": "[false, true, true] Serialization equality in this tiny case does not change allocation identity."
    },
    {
      "id": "javascript-033.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Serialization equality in this tiny case does not change allocation identity. Only the original reference identifies the stored key."
    },
    {
      "id": "javascript-033.q04",
      "level": "Debugging",
      "question": "Using a fresh object to retrieve a Map entry stored under another object. How would you fix it?",
      "answer": "Retain the key identity or use a stable primitive key."
    },
    {
      "id": "javascript-033.q05",
      "level": "Senior",
      "question": "What constraints matter when using Object references in production?",
      "answer": "Avoid expecting structural equality from ===. Identity comparisons are cheap; structural comparison needs a defined algorithm and can be expensive."
    },
    {
      "id": "javascript-033.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use identity deliberately for caching and reference-based updates. Identity comparisons are cheap; structural comparison needs a defined algorithm and can be expensive."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
