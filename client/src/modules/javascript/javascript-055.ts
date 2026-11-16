import type { Lesson } from '../lesson-types';

function example1() {
  return Object.fromEntries(Object.entries({ a: 1, b: 2 }).map(([key, value]) => [key, value * 10]));
}

function example2() {
  return Object.fromEntries([['name', 'first'], ['name', 'second']]);
}

export const lesson = {
  "id": "javascript-055",
  "description": "Object.entries returns own enumerable string-key/value pairs; fromEntries builds a record from pairs.",
  "when": "Transform record keys or values through explicit entries.",
  "avoid": "Avoid assuming duplicate keys survive fromEntries.",
  "tradeoff": "fromEntries uses the last value for a repeated key.",
  "mistakes": [
    {
      "problem": "Expecting multiple entries for one key to remain separate in an object.",
      "fix": "Use an array or Map of lists when duplicates are meaningful."
    }
  ],
  "examples": [
    {
      "title": "Transform record values",
      "expected": {
        "a": 10,
        "b": 20
      },
      "explanation": "The key/value pair shape makes transformations explicit.",
      "runtime": "browser",
      "id": "javascript-055.e01",
      "run": example1
    },
    {
      "title": "Duplicate keys overwrite",
      "expected": {
        "name": "second"
      },
      "explanation": "The later entry replaces the earlier property value.",
      "runtime": "browser",
      "id": "javascript-055.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-055.q01",
      "level": "Basic",
      "question": "What does Object.entries mean here?",
      "answer": "Object.entries returns own enumerable string-key/value pairs; fromEntries builds a record from pairs."
    },
    {
      "id": "javascript-055.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Transform record values”. Why?",
      "answer": "{\"a\": 10, \"b\": 20} The key/value pair shape makes transformations explicit."
    },
    {
      "id": "javascript-055.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The key/value pair shape makes transformations explicit. The later entry replaces the earlier property value."
    },
    {
      "id": "javascript-055.q04",
      "level": "Debugging",
      "question": "Expecting multiple entries for one key to remain separate in an object. How would you fix it?",
      "answer": "Use an array or Map of lists when duplicates are meaningful."
    },
    {
      "id": "javascript-055.q05",
      "level": "Senior",
      "question": "What constraints matter when using Object.entries in production?",
      "answer": "Avoid assuming duplicate keys survive fromEntries. fromEntries uses the last value for a repeated key."
    },
    {
      "id": "javascript-055.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Transform record keys or values through explicit entries. fromEntries uses the last value for a repeated key."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
