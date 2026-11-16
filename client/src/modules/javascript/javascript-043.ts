import type { Lesson, RunContext } from '../lesson-types';
import { numbers } from '../runtime';

function example1(ctx: RunContext) {
  return numbers(ctx.input).map(value => value * 2);
}

function example2() {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Intentional language-semantics example; compare the result with the corrected alternative.
  const wrong = [1, 2].map(value => { value * 2; });
  const fixed = [1, 2].map(value => value * 2);
  return { wrong: wrong.map(String), fixed };
}

export const lesson = {
  "id": "javascript-043",
  "description": "map transforms each present array element and returns a new array.",
  "when": "Project a list into another list of values.",
  "avoid": "Avoid map when no returned list is needed.",
  "tradeoff": "map is O(n) time and O(n) output space and skips sparse holes.",
  "mistakes": [
    {
      "problem": "Omitting return in a block-bodied callback.",
      "fix": "Return from the callback or use an expression body."
    }
  ],
  "examples": [
    {
      "title": "Transform numeric input",
      "expected": [
        2,
        4,
        6
      ],
      "explanation": "Each callback result occupies the corresponding output position.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[1,2,3]"
      },
      "id": "javascript-043.e01",
      "run": example1
    },
    {
      "title": "Missing callback return and correction",
      "expected": {
        "wrong": [
          "undefined",
          "undefined"
        ],
        "fixed": [
          2,
          4
        ]
      },
      "explanation": "Computing an expression without returning it yields undefined elements.",
      "runtime": "browser",
      "id": "javascript-043.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-043.q01",
      "level": "Basic",
      "question": "What does map mean here?",
      "answer": "map transforms each present array element and returns a new array."
    },
    {
      "id": "javascript-043.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Transform numeric input”. Why?",
      "answer": "[2, 4, 6] Each callback result occupies the corresponding output position."
    },
    {
      "id": "javascript-043.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Each callback result occupies the corresponding output position. Computing an expression without returning it yields undefined elements."
    },
    {
      "id": "javascript-043.q04",
      "level": "Debugging",
      "question": "Omitting return in a block-bodied callback. How would you fix it?",
      "answer": "Return from the callback or use an expression body."
    },
    {
      "id": "javascript-043.q05",
      "level": "Senior",
      "question": "What constraints matter when using map in production?",
      "answer": "Avoid map when no returned list is needed. map is O(n) time and O(n) output space and skips sparse holes."
    },
    {
      "id": "javascript-043.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Project a list into another list of values. map is O(n) time and O(n) output space and skips sparse holes."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
