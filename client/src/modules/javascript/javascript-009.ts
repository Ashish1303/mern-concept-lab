import type { Lesson, RunContext } from '../lesson-types';

function example1() {
  return [Boolean([]), Boolean({}), Boolean(''), Boolean(0), Boolean('0'), Boolean(null)];
}

function example2(ctx: RunContext) {
  const value = Number(ctx.input);
  return { booleanDefault: value || 10, nullishDefault: value ?? 10 };
}

export const lesson = {
  "id": "javascript-009",
  "description": "Conditions use Boolean coercion. Empty arrays and objects are truthy, while empty text, zero, null and undefined are falsy.",
  "when": "Normalize optional inputs with an explicit condition matching the business rule.",
  "avoid": "Avoid using truthiness to distinguish missing values from valid zero or empty text.",
  "tradeoff": "Truthiness is compact but can hide legitimate falsy domain values.",
  "mistakes": [
    {
      "problem": "Replacing a valid zero with a fallback.",
      "fix": "Use nullish coalescing when only null and undefined mean missing."
    }
  ],
  "examples": [
    {
      "title": "Inspect common values",
      "expected": [
        true,
        true,
        false,
        false,
        true,
        false
      ],
      "explanation": "Collections are objects and therefore truthy regardless of their size.",
      "runtime": "browser",
      "id": "javascript-009.e01",
      "run": example1
    },
    {
      "title": "Falsy default versus missing default",
      "expected": {
        "booleanDefault": 10,
        "nullishDefault": 0
      },
      "explanation": "The || fallback replaces zero; ?? preserves it.",
      "runtime": "browser",
      "input": {
        "label": "Input",
        "initial": "0"
      },
      "id": "javascript-009.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-009.q01",
      "level": "Basic",
      "question": "What does Truthy and falsy values mean here?",
      "answer": "Conditions use Boolean coercion. Empty arrays and objects are truthy, while empty text, zero, null and undefined are falsy."
    },
    {
      "id": "javascript-009.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Inspect common values”. Why?",
      "answer": "[true, true, false, false, true, false] Collections are objects and therefore truthy regardless of their size."
    },
    {
      "id": "javascript-009.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Collections are objects and therefore truthy regardless of their size. The || fallback replaces zero; ?? preserves it."
    },
    {
      "id": "javascript-009.q04",
      "level": "Debugging",
      "question": "Replacing a valid zero with a fallback. How would you fix it?",
      "answer": "Use nullish coalescing when only null and undefined mean missing."
    },
    {
      "id": "javascript-009.q05",
      "level": "Senior",
      "question": "What constraints matter when using Truthy and falsy values in production?",
      "answer": "Avoid using truthiness to distinguish missing values from valid zero or empty text. Truthiness is compact but can hide legitimate falsy domain values."
    },
    {
      "id": "javascript-009.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Normalize optional inputs with an explicit condition matching the business rule. Truthiness is compact but can hide legitimate falsy domain values."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
