import type { Lesson, RunContext } from '../lesson-types';
import { numbers } from '../runtime';
import { secondLargest } from '../algorithms';

function example1(ctx: RunContext) {
  return secondLargest(numbers(ctx.input));
}

function example2(ctx: RunContext) {
  const values = [...new Set(numbers(ctx.input))].sort((a, b) => b - a); return values[1] ?? null;
}

export const lesson = {
  "id": "javascript-106",
  "description": "Second-largest means the second distinct numeric value, with no answer when fewer than two distinct values exist.",
  "when": "Track a top-two summary without sorting the entire collection.",
  "avoid": "Avoid using zero as an initial maximum when negatives are valid.",
  "tradeoff": "One pass takes O(n) time/O(1) auxiliary space; sorting distinct values costs O(n log n) time/O(n) space.",
  "mistakes": [
    {
      "problem": "Counting a repeated maximum as the second-largest distinct value.",
      "fix": "Track strict inequalities and return null for insufficient distinct values."
    }
  ],
  "examples": [
    {
      "title": "One-pass distinct maxima",
      "expected": 4,
      "explanation": "The helper preserves separate first and second distinct candidates.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[5,1,5,4]"
      },
      "id": "javascript-106.e01",
      "run": example1
    },
    {
      "title": "Set and sort alternative, including missing answers",
      "expected": -3,
      "explanation": "Null is distinct from a valid zero or negative second value.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[-1,-3,-1,-5]"
      },
      "id": "javascript-106.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-106.q01",
      "level": "Basic",
      "question": "What does Second-largest number mean here?",
      "answer": "Second-largest means the second distinct numeric value, with no answer when fewer than two distinct values exist."
    },
    {
      "id": "javascript-106.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “One-pass distinct maxima”. Why?",
      "answer": "4 The helper preserves separate first and second distinct candidates."
    },
    {
      "id": "javascript-106.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The helper preserves separate first and second distinct candidates. Null is distinct from a valid zero or negative second value."
    },
    {
      "id": "javascript-106.q04",
      "level": "Debugging",
      "question": "Counting a repeated maximum as the second-largest distinct value. How would you fix it?",
      "answer": "Track strict inequalities and return null for insufficient distinct values."
    },
    {
      "id": "javascript-106.q05",
      "level": "Senior",
      "question": "What constraints matter when using Second-largest number in production?",
      "answer": "Avoid using zero as an initial maximum when negatives are valid. One pass takes O(n) time/O(1) auxiliary space; sorting distinct values costs O(n log n) time/O(n) space."
    },
    {
      "id": "javascript-106.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Track a top-two summary without sorting the entire collection. One pass takes O(n) time/O(1) auxiliary space; sorting distinct values costs O(n log n) time/O(n) space."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
