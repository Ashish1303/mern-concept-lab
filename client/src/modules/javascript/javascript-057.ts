import type { Lesson, RunContext } from '../lesson-types';
import { numbers } from '../runtime';

function example1(ctx: RunContext) {
  return [...new Set(numbers(ctx.input))];
}

function example2() {
  const a = { id: 1 }; const b = { id: 1 };
  return { byIdentity: new Set([a, b]).size, byId: new Map([a, b].map(item => [item.id, item])).size };
}

export const lesson = {
  "id": "javascript-057",
  "description": "Set stores unique values using SameValueZero equality; objects are unique by identity.",
  "when": "Deduplicate primitive values or perform membership checks.",
  "avoid": "Avoid assuming Set compares object contents structurally.",
  "tradeoff": "Set membership is typically sublinear; specification guarantees average sublinear access rather than a fixed hash implementation.",
  "mistakes": [
    {
      "problem": "Trying to deduplicate equal-looking objects by constructing a Set.",
      "fix": "Choose a stable domain key and deduplicate by that key."
    }
  ],
  "examples": [
    {
      "title": "Deduplicate primitives",
      "expected": [
        1,
        2,
        3
      ],
      "explanation": "Insertion order is preserved for the first occurrence of each value.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[1,2,1,3,2]"
      },
      "id": "javascript-057.e01",
      "run": example1
    },
    {
      "title": "Object identity versus ID-based deduplication",
      "expected": {
        "byIdentity": 2,
        "byId": 1
      },
      "explanation": "A Map keyed by ID implements domain equality explicitly.",
      "runtime": "browser",
      "id": "javascript-057.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-057.q01",
      "level": "Basic",
      "question": "What does Set mean here?",
      "answer": "Set stores unique values using SameValueZero equality; objects are unique by identity."
    },
    {
      "id": "javascript-057.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Deduplicate primitives”. Why?",
      "answer": "[1, 2, 3] Insertion order is preserved for the first occurrence of each value."
    },
    {
      "id": "javascript-057.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Insertion order is preserved for the first occurrence of each value. A Map keyed by ID implements domain equality explicitly."
    },
    {
      "id": "javascript-057.q04",
      "level": "Debugging",
      "question": "Trying to deduplicate equal-looking objects by constructing a Set. How would you fix it?",
      "answer": "Choose a stable domain key and deduplicate by that key."
    },
    {
      "id": "javascript-057.q05",
      "level": "Senior",
      "question": "What constraints matter when using Set in production?",
      "answer": "Avoid assuming Set compares object contents structurally. Set membership is typically sublinear; specification guarantees average sublinear access rather than a fixed hash implementation."
    },
    {
      "id": "javascript-057.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Deduplicate primitive values or perform membership checks. Set membership is typically sublinear; specification guarantees average sublinear access rather than a fixed hash implementation."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
