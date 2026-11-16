import type { Lesson } from '../lesson-types';

function example1() {
  const { name: label, ...rest } = { name: 'Ada', role: 'engineer', active: true };
  return { label, rest };
}

function example2() {
  const { first = 'guest', second = 'guest' } = { first: undefined, second: null };
  return [first, second, second ?? 'guest'];
}

export const lesson = {
  "id": "javascript-017",
  "description": "Destructuring extracts fields or positions and applies defaults only for undefined values.",
  "when": "Use destructuring to select fields and rename local bindings.",
  "avoid": "Avoid destructuring possibly null objects without checking them.",
  "tradeoff": "Rest properties copy remaining own enumerable properties and can add allocation.",
  "mistakes": [
    {
      "problem": "Expecting a destructuring default to replace null.",
      "fix": "Apply an explicit nullish fallback if null must be replaced."
    }
  ],
  "examples": [
    {
      "title": "Rename fields and gather remaining properties",
      "expected": {
        "label": "Ada",
        "rest": {
          "role": "engineer",
          "active": true
        }
      },
      "explanation": "Renaming changes the local binding while rest collects unselected properties.",
      "runtime": "browser",
      "id": "javascript-017.e01",
      "run": example1
    },
    {
      "title": "Undefined defaults differ from null",
      "expected": [
        "guest",
        null,
        "guest"
      ],
      "explanation": "Defaults activate for undefined; null remains an explicit value.",
      "runtime": "browser",
      "id": "javascript-017.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-017.q01",
      "level": "Basic",
      "question": "What does Destructuring mean here?",
      "answer": "Destructuring extracts fields or positions and applies defaults only for undefined values."
    },
    {
      "id": "javascript-017.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Rename fields and gather remaining properties”. Why?",
      "answer": "{\"label\": \"Ada\", \"rest\": {\"role\": \"engineer\", \"active\": true}} Renaming changes the local binding while rest collects unselected properties."
    },
    {
      "id": "javascript-017.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Renaming changes the local binding while rest collects unselected properties. Defaults activate for undefined; null remains an explicit value."
    },
    {
      "id": "javascript-017.q04",
      "level": "Debugging",
      "question": "Expecting a destructuring default to replace null. How would you fix it?",
      "answer": "Apply an explicit nullish fallback if null must be replaced."
    },
    {
      "id": "javascript-017.q05",
      "level": "Senior",
      "question": "What constraints matter when using Destructuring in production?",
      "answer": "Avoid destructuring possibly null objects without checking them. Rest properties copy remaining own enumerable properties and can add allocation."
    },
    {
      "id": "javascript-017.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use destructuring to select fields and rename local bindings. Rest properties copy remaining own enumerable properties and can add allocation."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
