import type { Lesson } from '../lesson-types';

function example1() {
  const values = [1, [2, [3]]];
  return { one: values.flat(), full: values.flat(2) };
}

function example2() {
  const sparse = new Array<number>(3); sparse[1] = 2;
  return { length: sparse.length, flattened: sparse.flat(), mappedLength: sparse.map(value => value * 2).length };
}

export const lesson = {
  "id": "javascript-051",
  "description": "flat returns a new array flattened to a specified depth and removes holes at flattened levels.",
  "when": "Flatten known-depth nested arrays without writing a custom traversal.",
  "avoid": "Avoid unlimited untrusted depth or assuming flat clones nested objects.",
  "tradeoff": "Flattening visits produced entries and allocates a new outer array.",
  "mistakes": [
    {
      "problem": "Using the default depth and expecting every nested array to disappear.",
      "fix": "Specify the required depth, bounded by the data contract."
    }
  ],
  "examples": [
    {
      "title": "One level versus complete known nesting",
      "expected": {
        "one": [
          1,
          2,
          [
            3
          ]
        ],
        "full": [
          1,
          2,
          3
        ]
      },
      "explanation": "The default depth is one; depth two reaches the inner array.",
      "runtime": "browser",
      "id": "javascript-051.e01",
      "run": example1
    },
    {
      "title": "Sparse holes are skipped",
      "expected": {
        "length": 3,
        "flattened": [
          2
        ],
        "mappedLength": 3
      },
      "explanation": "flat removes holes at that level whereas map preserves their positions.",
      "runtime": "browser",
      "id": "javascript-051.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-051.q01",
      "level": "Basic",
      "question": "What does flat mean here?",
      "answer": "flat returns a new array flattened to a specified depth and removes holes at flattened levels."
    },
    {
      "id": "javascript-051.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “One level versus complete known nesting”. Why?",
      "answer": "{\"one\": [1, 2, [3]], \"full\": [1, 2, 3]} The default depth is one; depth two reaches the inner array."
    },
    {
      "id": "javascript-051.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The default depth is one; depth two reaches the inner array. flat removes holes at that level whereas map preserves their positions."
    },
    {
      "id": "javascript-051.q04",
      "level": "Debugging",
      "question": "Using the default depth and expecting every nested array to disappear. How would you fix it?",
      "answer": "Specify the required depth, bounded by the data contract."
    },
    {
      "id": "javascript-051.q05",
      "level": "Senior",
      "question": "What constraints matter when using flat in production?",
      "answer": "Avoid unlimited untrusted depth or assuming flat clones nested objects. Flattening visits produced entries and allocates a new outer array."
    },
    {
      "id": "javascript-051.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Flatten known-depth nested arrays without writing a custom traversal. Flattening visits produced entries and allocates a new outer array."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
