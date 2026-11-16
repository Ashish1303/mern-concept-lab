import type { Lesson, RunContext } from '../lesson-types';
import { numbers } from '../runtime';

function example1(ctx: RunContext) {
  const values = numbers(ctx.input);
  return [String(values.find(value => value > 2)), String(values.find(value => value > 100))];
}

function example2() {
  const index = ['Ada', 'Grace'].findIndex(value => value === 'Ada');
  return { index, wrongFound: Boolean(index), fixedFound: index !== -1 };
}

export const lesson = {
  "id": "javascript-047",
  "description": "find returns the first matching value or undefined; findIndex returns its index or -1.",
  "when": "Retrieve one matching item without scanning the rest once found.",
  "avoid": "Avoid treating an index as a boolean.",
  "tradeoff": "Early termination is O(k) for the visited prefix and O(n) in the worst case.",
  "mistakes": [
    {
      "problem": "Rejecting a match at index zero because zero is falsy.",
      "fix": "Compare findIndex results with -1 explicitly."
    }
  ],
  "examples": [
    {
      "title": "First match and absent result",
      "expected": [
        "3",
        "undefined"
      ],
      "explanation": "The search stops at the first match and returns undefined when none exists.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[1,3,5]"
      },
      "id": "javascript-047.e01",
      "run": example1
    },
    {
      "title": "Index zero is a valid match",
      "expected": {
        "index": 0,
        "wrongFound": false,
        "fixedFound": true
      },
      "explanation": "An explicit sentinel comparison preserves the first element.",
      "runtime": "browser",
      "id": "javascript-047.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-047.q01",
      "level": "Basic",
      "question": "What does find mean here?",
      "answer": "find returns the first matching value or undefined; findIndex returns its index or -1."
    },
    {
      "id": "javascript-047.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “First match and absent result”. Why?",
      "answer": "[\"3\", \"undefined\"] The search stops at the first match and returns undefined when none exists."
    },
    {
      "id": "javascript-047.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The search stops at the first match and returns undefined when none exists. An explicit sentinel comparison preserves the first element."
    },
    {
      "id": "javascript-047.q04",
      "level": "Debugging",
      "question": "Rejecting a match at index zero because zero is falsy. How would you fix it?",
      "answer": "Compare findIndex results with -1 explicitly."
    },
    {
      "id": "javascript-047.q05",
      "level": "Senior",
      "question": "What constraints matter when using find in production?",
      "answer": "Avoid treating an index as a boolean. Early termination is O(k) for the visited prefix and O(n) in the worst case."
    },
    {
      "id": "javascript-047.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Retrieve one matching item without scanning the rest once found. Early termination is O(k) for the visited prefix and O(n) in the worst case."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
