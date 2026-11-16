import type { Lesson, RunContext } from '../lesson-types';
import { numbers } from '../runtime';

function example1(ctx: RunContext) {
  const values = numbers(ctx.input);
  return { lexical: [...values].sort(), numeric: [...values].sort((a, b) => a - b), original: values };
}

function example2() {
  const values = [{ name: 'B', score: 1 }, { name: 'A', score: 1 }];
  return { stable: [...values].sort((a, b) => a.score - b.score).map(item => item.name), secondary: [...values].sort((a, b) => a.score - b.score || a.name.localeCompare(b.name)).map(item => item.name) };
}

export const lesson = {
  "id": "javascript-050",
  "description": "sort mutates an array and defaults to string comparison; numeric sorting requires a comparator.",
  "when": "Supply a consistent comparator and copy state arrays before sorting.",
  "avoid": "Avoid side effects inside comparators or depending on an inconsistent order.",
  "tradeoff": "Common sorting implementations are O(n log n); comparator correctness matters more than assuming a particular engine algorithm.",
  "mistakes": [
    {
      "problem": "Sorting numbers without a comparator and mutating the source.",
      "fix": "Copy the array and compare numerically."
    }
  ],
  "examples": [
    {
      "title": "Default order versus numeric order",
      "expected": {
        "lexical": [
          1,
          10,
          2
        ],
        "numeric": [
          1,
          2,
          10
        ],
        "original": [
          10,
          2,
          1
        ]
      },
      "explanation": "Default comparison orders string forms; copied numeric sorting preserves the input.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[10,2,1]"
      },
      "id": "javascript-050.e01",
      "run": example1
    },
    {
      "title": "Stable ties and a secondary key",
      "expected": {
        "stable": [
          "B",
          "A"
        ],
        "secondary": [
          "A",
          "B"
        ]
      },
      "explanation": "Stable sort preserves tie order unless a secondary comparator resolves the tie.",
      "runtime": "browser",
      "id": "javascript-050.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-050.q01",
      "level": "Basic",
      "question": "What does sort mean here?",
      "answer": "sort mutates an array and defaults to string comparison; numeric sorting requires a comparator."
    },
    {
      "id": "javascript-050.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Default order versus numeric order”. Why?",
      "answer": "{\"lexical\": [1, 10, 2], \"numeric\": [1, 2, 10], \"original\": [10, 2, 1]} Default comparison orders string forms; copied numeric sorting preserves the input."
    },
    {
      "id": "javascript-050.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Default comparison orders string forms; copied numeric sorting preserves the input. Stable sort preserves tie order unless a secondary comparator resolves the tie."
    },
    {
      "id": "javascript-050.q04",
      "level": "Debugging",
      "question": "Sorting numbers without a comparator and mutating the source. How would you fix it?",
      "answer": "Copy the array and compare numerically."
    },
    {
      "id": "javascript-050.q05",
      "level": "Senior",
      "question": "What constraints matter when using sort in production?",
      "answer": "Avoid side effects inside comparators or depending on an inconsistent order. Common sorting implementations are O(n log n); comparator correctness matters more than assuming a particular engine algorithm."
    },
    {
      "id": "javascript-050.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Supply a consistent comparator and copy state arrays before sorting. Common sorting implementations are O(n log n); comparator correctness matters more than assuming a particular engine algorithm."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
