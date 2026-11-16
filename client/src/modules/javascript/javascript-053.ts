import type { Lesson } from '../lesson-types';

function example1() {
  return Object.keys({ b: 1, 10: 'ten', 2: 'two', a: 2 });
}

function example2() {
  const item = Object.assign(Object.create({ inherited: 1 }) as object, { own: 2 });
  Object.defineProperty(item, 'hidden', { value: 3, enumerable: false });
  return { enumerable: Object.keys(item), allOwn: Object.getOwnPropertyNames(item) };
}

export const lesson = {
  "id": "javascript-053",
  "description": "Object.keys returns own enumerable string property names in specified key order.",
  "when": "Inspect record fields without traversing inherited data.",
  "avoid": "Avoid treating keys as a list of symbol or non-enumerable properties.",
  "tradeoff": "Integer-index keys precede other string keys; insertion order is not the whole ordering rule.",
  "mistakes": [
    {
      "problem": "Expecting Object.keys to include inherited properties.",
      "fix": "Choose Reflect.ownKeys for all own keys or inspect the prototype deliberately."
    }
  ],
  "examples": [
    {
      "title": "Numeric key ordering",
      "expected": [
        "2",
        "10",
        "b",
        "a"
      ],
      "explanation": "Integer-index keys sort numerically before other string keys.",
      "runtime": "browser",
      "id": "javascript-053.e01",
      "run": example1
    },
    {
      "title": "Ownership and enumerability",
      "expected": {
        "enumerable": [
          "own"
        ],
        "allOwn": [
          "own",
          "hidden"
        ]
      },
      "explanation": "Own non-enumerable properties need a different reflection API.",
      "runtime": "browser",
      "id": "javascript-053.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-053.q01",
      "level": "Basic",
      "question": "What does Object.keys mean here?",
      "answer": "Object.keys returns own enumerable string property names in specified key order."
    },
    {
      "id": "javascript-053.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Numeric key ordering”. Why?",
      "answer": "[\"2\", \"10\", \"b\", \"a\"] Integer-index keys sort numerically before other string keys."
    },
    {
      "id": "javascript-053.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Integer-index keys sort numerically before other string keys. Own non-enumerable properties need a different reflection API."
    },
    {
      "id": "javascript-053.q04",
      "level": "Debugging",
      "question": "Expecting Object.keys to include inherited properties. How would you fix it?",
      "answer": "Choose Reflect.ownKeys for all own keys or inspect the prototype deliberately."
    },
    {
      "id": "javascript-053.q05",
      "level": "Senior",
      "question": "What constraints matter when using Object.keys in production?",
      "answer": "Avoid treating keys as a list of symbol or non-enumerable properties. Integer-index keys precede other string keys; insertion order is not the whole ordering rule."
    },
    {
      "id": "javascript-053.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Inspect record fields without traversing inherited data. Integer-index keys precede other string keys; insertion order is not the whole ordering rule."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
