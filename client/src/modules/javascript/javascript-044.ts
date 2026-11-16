import type { Lesson, RunContext } from '../lesson-types';
import { numbers } from '../runtime';

function example1(ctx: RunContext) {
  return numbers(ctx.input).filter(value => value % 2 === 0);
}

function example2() {
  const values = [0, 1, null, 2];
  return { wrong: values.filter(Boolean), fixed: values.filter(value => value !== null) };
}

export const lesson = {
  "id": "javascript-044",
  "description": "filter keeps elements whose predicate result is truthy without transforming their values.",
  "when": "Select a subset with an explicit business predicate.",
  "avoid": "Avoid Boolean filtering if valid falsy values must remain.",
  "tradeoff": "filter is O(n) and allocates an output list while retaining original object references.",
  "mistakes": [
    {
      "problem": "Using filter(Boolean) to remove null and unintentionally dropping zero.",
      "fix": "Check specifically for null when zero is valid."
    }
  ],
  "examples": [
    {
      "title": "Select even numbers",
      "expected": [
        2,
        4
      ],
      "explanation": "Only elements matching the predicate are retained.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[1,2,3,4]"
      },
      "id": "javascript-044.e01",
      "run": example1
    },
    {
      "title": "Truthiness filter drops valid values",
      "expected": {
        "wrong": [
          1,
          2
        ],
        "fixed": [
          0,
          1,
          2
        ]
      },
      "explanation": "An exact null check expresses the intended absence rule.",
      "runtime": "browser",
      "id": "javascript-044.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-044.q01",
      "level": "Basic",
      "question": "What does filter mean here?",
      "answer": "filter keeps elements whose predicate result is truthy without transforming their values."
    },
    {
      "id": "javascript-044.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Select even numbers”. Why?",
      "answer": "[2, 4] Only elements matching the predicate are retained."
    },
    {
      "id": "javascript-044.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Only elements matching the predicate are retained. An exact null check expresses the intended absence rule."
    },
    {
      "id": "javascript-044.q04",
      "level": "Debugging",
      "question": "Using filter(Boolean) to remove null and unintentionally dropping zero. How would you fix it?",
      "answer": "Check specifically for null when zero is valid."
    },
    {
      "id": "javascript-044.q05",
      "level": "Senior",
      "question": "What constraints matter when using filter in production?",
      "answer": "Avoid Boolean filtering if valid falsy values must remain. filter is O(n) and allocates an output list while retaining original object references."
    },
    {
      "id": "javascript-044.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Select a subset with an explicit business predicate. filter is O(n) and allocates an output list while retaining original object references."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
