import type { Lesson, RunContext } from '../lesson-types';
import { numbers } from '../runtime';
import { twoSum } from '../algorithms';

function example1(ctx: RunContext) {
  return twoSum(numbers(ctx.input), 9);
}

function example2(ctx: RunContext) {
  const values = numbers(ctx.input); for (let i = 0; i < values.length; i++) for (let j = i + 1; j < values.length; j++) if (values[i]! + values[j]! === 9) return [i, j]; return null;
}

export const lesson = {
  "id": "javascript-100",
  "description": "Two Sum finds two distinct positions whose values add to a target. The examples use target 9.",
  "when": "Compare brute-force pairs with a complement lookup map.",
  "avoid": "Avoid reusing the same index for both operands.",
  "tradeoff": "The map solution is typically O(n) time/O(n) space; brute force is O(n²) time/O(1) auxiliary space.",
  "mistakes": [
    {
      "problem": "Inserting the current value before checking and matching it to itself.",
      "fix": "Check the complement among earlier indices before storing the current index."
    }
  ],
  "examples": [
    {
      "title": "Single-pass complement map",
      "expected": [
        0,
        1
      ],
      "explanation": "Only earlier indices can satisfy the current complement.",
      "runtime": "browser",
      "input": {
        "label": "Number array, target 9",
        "initial": "[2,7,11,15]"
      },
      "id": "javascript-100.e01",
      "run": example1
    },
    {
      "title": "Brute-force distinct pairs",
      "expected": [
        0,
        1
      ],
      "explanation": "Starting j at i+1 prevents using a value twice.",
      "runtime": "browser",
      "input": {
        "label": "Number array, target 9",
        "initial": "[2,7,11,15]"
      },
      "id": "javascript-100.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-100.q01",
      "level": "Basic",
      "question": "What does Two Sum mean here?",
      "answer": "Two Sum finds two distinct positions whose values add to a target. The examples use target 9."
    },
    {
      "id": "javascript-100.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Single-pass complement map”. Why?",
      "answer": "[0, 1] Only earlier indices can satisfy the current complement."
    },
    {
      "id": "javascript-100.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Only earlier indices can satisfy the current complement. Starting j at i+1 prevents using a value twice."
    },
    {
      "id": "javascript-100.q04",
      "level": "Debugging",
      "question": "Inserting the current value before checking and matching it to itself. How would you fix it?",
      "answer": "Check the complement among earlier indices before storing the current index."
    },
    {
      "id": "javascript-100.q05",
      "level": "Senior",
      "question": "What constraints matter when using Two Sum in production?",
      "answer": "Avoid reusing the same index for both operands. The map solution is typically O(n) time/O(n) space; brute force is O(n²) time/O(1) auxiliary space."
    },
    {
      "id": "javascript-100.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Compare brute-force pairs with a complement lookup map. The map solution is typically O(n) time/O(n) space; brute force is O(n²) time/O(1) auxiliary space."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
