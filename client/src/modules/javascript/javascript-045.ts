import type { Lesson, RunContext } from '../lesson-types';
import { capture, numbers } from '../runtime';

function example1(ctx: RunContext) {
  return numbers(ctx.input).reduce((sum, value) => sum + value, 0);
}

function example2() {
  const empty: number[] = [];
  return [capture(() => empty.reduce((sum, value) => sum + value)), empty.reduce((sum, value) => sum + value, 0)];
}

export const lesson = {
  "id": "javascript-045",
  "description": "reduce folds a sequence into an accumulator, using the initial value when provided.",
  "when": "Compute totals, indexes or grouped results in one pass.",
  "avoid": "Avoid an unreadable reducer when a simple map/filter pipeline is clearer.",
  "tradeoff": "A reducer can be O(n), but repeatedly spreading a growing accumulator can make it O(n²).",
  "mistakes": [
    {
      "problem": "Reducing an empty array without an initial value.",
      "fix": "Supply the correct identity value such as zero for addition."
    }
  ],
  "examples": [
    {
      "title": "Accumulate a sum",
      "expected": 6,
      "explanation": "The initial accumulator is zero.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[1,2,3]"
      },
      "id": "javascript-045.e01",
      "run": example1
    },
    {
      "title": "Empty reduction error and identity fix",
      "expected": [
        "TypeError",
        0
      ],
      "explanation": "Without an initial value there is no first accumulator on an empty list.",
      "runtime": "browser",
      "id": "javascript-045.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-045.q01",
      "level": "Basic",
      "question": "What does reduce mean here?",
      "answer": "reduce folds a sequence into an accumulator, using the initial value when provided."
    },
    {
      "id": "javascript-045.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Accumulate a sum”. Why?",
      "answer": "6 The initial accumulator is zero."
    },
    {
      "id": "javascript-045.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The initial accumulator is zero. Without an initial value there is no first accumulator on an empty list."
    },
    {
      "id": "javascript-045.q04",
      "level": "Debugging",
      "question": "Reducing an empty array without an initial value. How would you fix it?",
      "answer": "Supply the correct identity value such as zero for addition."
    },
    {
      "id": "javascript-045.q05",
      "level": "Senior",
      "question": "What constraints matter when using reduce in production?",
      "answer": "Avoid an unreadable reducer when a simple map/filter pipeline is clearer. A reducer can be O(n), but repeatedly spreading a growing accumulator can make it O(n²)."
    },
    {
      "id": "javascript-045.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Compute totals, indexes or grouped results in one pass. A reducer can be O(n), but repeatedly spreading a growing accumulator can make it O(n²)."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
