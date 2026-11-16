import type { Lesson, RunContext } from '../lesson-types';
import { parseTree, flatten } from '../algorithms';

function example1(ctx: RunContext) {
  return flatten(parseTree(ctx.input));
}

function example2(ctx: RunContext) {
  const values = parseTree(ctx.input); return { oneLevel: values.flat(), allAllowedLevels: values.flat(5) };
}

export const lesson = {
  "id": "javascript-102",
  "description": "Flattening traverses nested arrays and emits their leaf values in order.",
  "when": "Practice recursive traversal over bounded numeric trees.",
  "avoid": "Avoid accepting unbounded depth or claiming JSON inputs preserve sparse-array holes.",
  "tradeoff": "Both solutions visit O(n) nodes and allocate O(n) output; recursion uses O(depth) stack space.",
  "mistakes": [
    {
      "problem": "Using only one level of flattening for deeper trees.",
      "fix": "Use explicit depth or a bounded recursive traversal."
    }
  ],
  "examples": [
    {
      "title": "Bounded recursive traversal",
      "expected": [
        1,
        2,
        3,
        4
      ],
      "explanation": "The helper visits every numeric leaf and preserves left-to-right order.",
      "runtime": "browser",
      "input": {
        "label": "Nested numeric array",
        "initial": "[1,[2,[3]],4]"
      },
      "id": "javascript-102.e01",
      "run": example1
    },
    {
      "title": "Native flattening versus default-depth bug",
      "expected": {
        "oneLevel": [
          1,
          2,
          [
            3
          ],
          4
        ],
        "allAllowedLevels": [
          1,
          2,
          3,
          4
        ]
      },
      "explanation": "Input validation caps nesting at five, so the explicit flattening depth covers the contract.",
      "runtime": "browser",
      "input": {
        "label": "Nested numeric array",
        "initial": "[1,[2,[3]],4]"
      },
      "id": "javascript-102.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-102.q01",
      "level": "Basic",
      "question": "What does Flatten arrays mean here?",
      "answer": "Flattening traverses nested arrays and emits their leaf values in order."
    },
    {
      "id": "javascript-102.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Bounded recursive traversal”. Why?",
      "answer": "[1, 2, 3, 4] The helper visits every numeric leaf and preserves left-to-right order."
    },
    {
      "id": "javascript-102.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The helper visits every numeric leaf and preserves left-to-right order. Input validation caps nesting at five, so the explicit flattening depth covers the contract."
    },
    {
      "id": "javascript-102.q04",
      "level": "Debugging",
      "question": "Using only one level of flattening for deeper trees. How would you fix it?",
      "answer": "Use explicit depth or a bounded recursive traversal."
    },
    {
      "id": "javascript-102.q05",
      "level": "Senior",
      "question": "What constraints matter when using Flatten arrays in production?",
      "answer": "Avoid accepting unbounded depth or claiming JSON inputs preserve sparse-array holes. Both solutions visit O(n) nodes and allocate O(n) output; recursion uses O(depth) stack space."
    },
    {
      "id": "javascript-102.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Practice recursive traversal over bounded numeric trees. Both solutions visit O(n) nodes and allocate O(n) output; recursion uses O(depth) stack space."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
