import type { Lesson, RunContext } from '../lesson-types';
import { numbers } from '../runtime';

function example1(ctx: RunContext) {
  const seen = new Set<number>(); const repeated = new Set<number>();
  for (const value of numbers(ctx.input)) { if (seen.has(value)) repeated.add(value); seen.add(value); } return [...repeated];
}

function example2(ctx: RunContext) {
  const counts = new Map<number, number>(); for (const value of numbers(ctx.input)) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts].filter(([, count]) => count > 1).map(([value, count]) => ({ value, count }));
}

export const lesson = {
  "id": "javascript-099",
  "description": "Finding duplicates requires distinguishing repeated values from a list of unique representatives.",
  "when": "Report repeated IDs or numeric values with a clear occurrence policy.",
  "avoid": "Avoid returning the same duplicate repeatedly unless that is the contract.",
  "tradeoff": "A Set/Map pass is typically O(n) time and O(n) space; output ordering follows the chosen insertion policy.",
  "mistakes": [
    {
      "problem": "Pushing every repeated occurrence and presenting it as a unique duplicate list.",
      "fix": "Track duplicates separately from seen values or compute frequency counts."
    }
  ],
  "examples": [
    {
      "title": "Unique repeated values",
      "expected": [
        1,
        2
      ],
      "explanation": "The second Set emits each repeated value once.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[1,2,1,3,2,1]"
      },
      "id": "javascript-099.e01",
      "run": example1
    },
    {
      "title": "Frequency-based duplicate report",
      "expected": [
        {
          "value": 1,
          "count": 3
        },
        {
          "value": 2,
          "count": 2
        }
      ],
      "explanation": "Counting preserves multiplicity as well as duplicate identity.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[1,2,1,3,2,1]"
      },
      "id": "javascript-099.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-099.q01",
      "level": "Basic",
      "question": "What does Find duplicates mean here?",
      "answer": "Finding duplicates requires distinguishing repeated values from a list of unique representatives."
    },
    {
      "id": "javascript-099.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Unique repeated values”. Why?",
      "answer": "[1, 2] The second Set emits each repeated value once."
    },
    {
      "id": "javascript-099.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The second Set emits each repeated value once. Counting preserves multiplicity as well as duplicate identity."
    },
    {
      "id": "javascript-099.q04",
      "level": "Debugging",
      "question": "Pushing every repeated occurrence and presenting it as a unique duplicate list. How would you fix it?",
      "answer": "Track duplicates separately from seen values or compute frequency counts."
    },
    {
      "id": "javascript-099.q05",
      "level": "Senior",
      "question": "What constraints matter when using Find duplicates in production?",
      "answer": "Avoid returning the same duplicate repeatedly unless that is the contract. A Set/Map pass is typically O(n) time and O(n) space; output ordering follows the chosen insertion policy."
    },
    {
      "id": "javascript-099.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Report repeated IDs or numeric values with a clear occurrence policy. A Set/Map pass is typically O(n) time and O(n) space; output ordering follows the chosen insertion policy."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
