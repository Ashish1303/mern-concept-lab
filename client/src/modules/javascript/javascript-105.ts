import type { Lesson, RunContext } from '../lesson-types';
import { numbers } from '../runtime';
import { missingNumber } from '../algorithms';

function example1(ctx: RunContext) {
  return missingNumber(numbers(ctx.input));
}

function example2(ctx: RunContext) {
  const values = numbers(ctx.input); missingNumber(values); let result = values.length;
  for (let index = 0; index < values.length; index++) result ^= index ^ values[index]!; return result;
}

export const lesson = {
  "id": "javascript-105",
  "description": "The missing-number problem assumes n distinct values from 0 through n with exactly one omitted value.",
  "when": "Practice contract validation and algebraic or bitwise solutions.",
  "avoid": "Avoid applying the formula to duplicate or out-of-range inputs.",
  "tradeoff": "Sum and XOR scans are O(n) time; validation here uses O(n) Set space. XOR is safe here because the UI bounds the domain to at most 30.",
  "mistakes": [
    {
      "problem": "Returning a plausible number from invalid input with duplicates.",
      "fix": "Validate uniqueness and the 0..n domain first."
    }
  ],
  "examples": [
    {
      "title": "Validated arithmetic sum",
      "expected": 2,
      "explanation": "The validated complete-range sum minus the actual sum identifies the missing value.",
      "runtime": "browser",
      "input": {
        "label": "Distinct integers from 0 through n",
        "initial": "[3,0,1]"
      },
      "id": "javascript-105.e01",
      "run": example1
    },
    {
      "title": "XOR alternative after the same validation",
      "expected": 2,
      "explanation": "Equal index/value contributions cancel under XOR.",
      "runtime": "browser",
      "input": {
        "label": "Distinct integers from 0 through n",
        "initial": "[3,0,1]"
      },
      "id": "javascript-105.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-105.q01",
      "level": "Basic",
      "question": "What does Find missing number mean here?",
      "answer": "The missing-number problem assumes n distinct values from 0 through n with exactly one omitted value."
    },
    {
      "id": "javascript-105.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Validated arithmetic sum”. Why?",
      "answer": "2 The validated complete-range sum minus the actual sum identifies the missing value."
    },
    {
      "id": "javascript-105.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The validated complete-range sum minus the actual sum identifies the missing value. Equal index/value contributions cancel under XOR."
    },
    {
      "id": "javascript-105.q04",
      "level": "Debugging",
      "question": "Returning a plausible number from invalid input with duplicates. How would you fix it?",
      "answer": "Validate uniqueness and the 0..n domain first."
    },
    {
      "id": "javascript-105.q05",
      "level": "Senior",
      "question": "What constraints matter when using Find missing number in production?",
      "answer": "Avoid applying the formula to duplicate or out-of-range inputs. Sum and XOR scans are O(n) time; validation here uses O(n) Set space. XOR is safe here because the UI bounds the domain to at most 30."
    },
    {
      "id": "javascript-105.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Practice contract validation and algebraic or bitwise solutions. Sum and XOR scans are O(n) time; validation here uses O(n) Set space. XOR is safe here because the UI bounds the domain to at most 30."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
