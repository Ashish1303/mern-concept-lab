import type { Lesson } from '../lesson-types';

function example1() {
  const quantities = { apples: 2, pears: 3 }; return Object.values(quantities).reduce((sum, value) => sum + value, 0);
}

function example2() {
  const item = { visible: 1 }; Object.defineProperty(item, 'hidden', { value: 2, enumerable: false });
  return Object.values(item);
}

export const lesson = {
  "id": "javascript-054",
  "description": "Object.values returns values of own enumerable string-keyed properties.",
  "when": "Aggregate a record’s values without needing its keys.",
  "avoid": "Avoid relying on values to include inherited, hidden or symbol-keyed properties.",
  "tradeoff": "Enumeration allocates a new array and follows the same key ordering as Object.keys.",
  "mistakes": [
    {
      "problem": "Summing values without validating that they are numeric.",
      "fix": "Use typed/validated numeric records before arithmetic."
    }
  ],
  "examples": [
    {
      "title": "Sum a numeric record",
      "expected": 5,
      "explanation": "The own numeric values form a list for reduction.",
      "runtime": "browser",
      "id": "javascript-054.e01",
      "run": example1
    },
    {
      "title": "Non-enumerable values are absent",
      "expected": [
        1
      ],
      "explanation": "Object.values observes enumerability rather than every property descriptor.",
      "runtime": "browser",
      "id": "javascript-054.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-054.q01",
      "level": "Basic",
      "question": "What does Object.values mean here?",
      "answer": "Object.values returns values of own enumerable string-keyed properties."
    },
    {
      "id": "javascript-054.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Sum a numeric record”. Why?",
      "answer": "5 The own numeric values form a list for reduction."
    },
    {
      "id": "javascript-054.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The own numeric values form a list for reduction. Object.values observes enumerability rather than every property descriptor."
    },
    {
      "id": "javascript-054.q04",
      "level": "Debugging",
      "question": "Summing values without validating that they are numeric. How would you fix it?",
      "answer": "Use typed/validated numeric records before arithmetic."
    },
    {
      "id": "javascript-054.q05",
      "level": "Senior",
      "question": "What constraints matter when using Object.values in production?",
      "answer": "Avoid relying on values to include inherited, hidden or symbol-keyed properties. Enumeration allocates a new array and follows the same key ordering as Object.keys."
    },
    {
      "id": "javascript-054.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Aggregate a record’s values without needing its keys. Enumeration allocates a new array and follows the same key ordering as Object.keys."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
