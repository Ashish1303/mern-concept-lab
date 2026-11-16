import type { Lesson, RunContext } from '../lesson-types';

function example1(ctx: RunContext) {
  const count = Number(ctx.input);
  return [count || 10, count ?? 10];
}

function example2() {
  let calls = 0;
  const fallback = () => { calls++; return 9; };
  const present: number | undefined = 0;
  const missing: number | undefined = undefined;
  return { present: present ?? fallback(), missing: missing ?? fallback(), calls };
}

export const lesson = {
  "id": "javascript-020",
  "description": "Nullish coalescing chooses the fallback only for null or undefined, preserving zero, false and empty text.",
  "when": "Default optional configuration where falsy values are valid.",
  "avoid": "Avoid replacing validation with a fallback for malformed input.",
  "tradeoff": "?? does not evaluate its right-hand side when the left side is present.",
  "mistakes": [
    {
      "problem": "Using || and accidentally discarding zero.",
      "fix": "Use ?? for absence and a separate validation rule for invalid values."
    }
  ],
  "examples": [
    {
      "title": "Compare logical and nullish defaults",
      "expected": [
        10,
        0
      ],
      "explanation": "The zero input is falsy but not nullish.",
      "runtime": "browser",
      "input": {
        "label": "Input",
        "initial": "0"
      },
      "id": "javascript-020.e01",
      "run": example1
    },
    {
      "title": "Lazy fallback evaluation",
      "expected": {
        "present": 0,
        "missing": 9,
        "calls": 1
      },
      "explanation": "Only the missing value evaluates the fallback.",
      "runtime": "browser",
      "id": "javascript-020.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-020.q01",
      "level": "Basic",
      "question": "What does Nullish coalescing mean here?",
      "answer": "Nullish coalescing chooses the fallback only for null or undefined, preserving zero, false and empty text."
    },
    {
      "id": "javascript-020.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Compare logical and nullish defaults”. Why?",
      "answer": "[10, 0] The zero input is falsy but not nullish."
    },
    {
      "id": "javascript-020.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The zero input is falsy but not nullish. Only the missing value evaluates the fallback."
    },
    {
      "id": "javascript-020.q04",
      "level": "Debugging",
      "question": "Using || and accidentally discarding zero. How would you fix it?",
      "answer": "Use ?? for absence and a separate validation rule for invalid values."
    },
    {
      "id": "javascript-020.q05",
      "level": "Senior",
      "question": "What constraints matter when using Nullish coalescing in production?",
      "answer": "Avoid replacing validation with a fallback for malformed input. ?? does not evaluate its right-hand side when the left side is present."
    },
    {
      "id": "javascript-020.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Default optional configuration where falsy values are valid. ?? does not evaluate its right-hand side when the left side is present."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
