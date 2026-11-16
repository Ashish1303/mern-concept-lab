import type { Lesson, RunContext } from '../lesson-types';
import { numbers } from '../runtime';

function example1(ctx: RunContext) {
  return [...new Set(numbers(ctx.input))];
}

function example2(ctx: RunContext) {
  const values = numbers(ctx.input); return values.filter((value, index) => values.indexOf(value) === index);
}

export const lesson = {
  "id": "javascript-098",
  "description": "Deduplication retains one representative per equality rule while optionally preserving first-occurrence order.",
  "when": "Remove repeated finite primitive numbers in a documented order.",
  "avoid": "Avoid assuming primitive deduplication also deduplicates objects structurally.",
  "tradeoff": "Set-based output is typically O(n) time/O(n) space; filter/indexOf is O(n²) time.",
  "mistakes": [
    {
      "problem": "Sorting only to deduplicate and accidentally changing first-occurrence order.",
      "fix": "Use Set for ordered primitive uniqueness or explicitly document sorting."
    }
  ],
  "examples": [
    {
      "title": "Ordered Set solution",
      "expected": [
        3,
        1,
        2
      ],
      "explanation": "The first occurrence determines output position.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[3,1,3,2,1]"
      },
      "id": "javascript-098.e01",
      "run": example1
    },
    {
      "title": "Alternative filter and first-index solution",
      "expected": [
        3,
        1,
        2
      ],
      "explanation": "For finite numbers this preserves the first matching index, with repeated linear searches.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[3,1,3,2,1]"
      },
      "id": "javascript-098.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-098.q01",
      "level": "Basic",
      "question": "What does Remove duplicates mean here?",
      "answer": "Deduplication retains one representative per equality rule while optionally preserving first-occurrence order."
    },
    {
      "id": "javascript-098.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Ordered Set solution”. Why?",
      "answer": "[3, 1, 2] The first occurrence determines output position."
    },
    {
      "id": "javascript-098.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The first occurrence determines output position. For finite numbers this preserves the first matching index, with repeated linear searches."
    },
    {
      "id": "javascript-098.q04",
      "level": "Debugging",
      "question": "Sorting only to deduplicate and accidentally changing first-occurrence order. How would you fix it?",
      "answer": "Use Set for ordered primitive uniqueness or explicitly document sorting."
    },
    {
      "id": "javascript-098.q05",
      "level": "Senior",
      "question": "What constraints matter when using Remove duplicates in production?",
      "answer": "Avoid assuming primitive deduplication also deduplicates objects structurally. Set-based output is typically O(n) time/O(n) space; filter/indexOf is O(n²) time."
    },
    {
      "id": "javascript-098.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Remove repeated finite primitive numbers in a documented order. Set-based output is typically O(n) time/O(n) space; filter/indexOf is O(n²) time."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
