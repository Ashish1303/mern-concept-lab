import type { Lesson, RunContext } from '../lesson-types';

function example1(ctx: RunContext) {
  const value: unknown = ctx.input;
  return { looseZero: value == 0, strictZero: value === 0 };
}

function example2() {
  const invalid = Number('not-a-number');
  const a = { n: 1 }; const b = { n: 1 }; const negativeZero = -0;
  return [invalid === invalid, Object.is(invalid, invalid), 0 === negativeZero, Object.is(0, -0), a === b];
}

export const lesson = {
  "id": "javascript-008",
  "description": "Strict equality avoids cross-type coercion; Object.is differs for NaN and signed zero.",
  "when": "Use strict equality for ordinary application comparisons.",
  "avoid": "Avoid loose equality unless its exact coercion is intentional and documented.",
  "tradeoff": "Object equality compares identity, not structural content.",
  "mistakes": [
    {
      "problem": "Expecting NaN === NaN or treating all numeric identity rules as identical.",
      "fix": "Use Number.isNaN for invalid numbers and Object.is when signed zero or NaN identity matters."
    }
  ],
  "examples": [
    {
      "title": "Loose and strict comparisons",
      "expected": {
        "looseZero": true,
        "strictZero": false
      },
      "explanation": "String zero loosely equals numeric zero, but their types differ.",
      "runtime": "browser",
      "input": {
        "label": "Input",
        "initial": "0"
      },
      "id": "javascript-008.e01",
      "run": example1
    },
    {
      "title": "NaN and signed zero",
      "expected": [
        false,
        true,
        true,
        false,
        false
      ],
      "explanation": "Object.is treats NaN as equal to itself and distinguishes signed zeros; two objects have different identity.",
      "runtime": "browser",
      "id": "javascript-008.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-008.q01",
      "level": "Basic",
      "question": "What does Equality operators mean here?",
      "answer": "Strict equality avoids cross-type coercion; Object.is differs for NaN and signed zero."
    },
    {
      "id": "javascript-008.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Loose and strict comparisons”. Why?",
      "answer": "{\"looseZero\": true, \"strictZero\": false} String zero loosely equals numeric zero, but their types differ."
    },
    {
      "id": "javascript-008.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "String zero loosely equals numeric zero, but their types differ. Object.is treats NaN as equal to itself and distinguishes signed zeros; two objects have different identity."
    },
    {
      "id": "javascript-008.q04",
      "level": "Debugging",
      "question": "Expecting NaN === NaN or treating all numeric identity rules as identical. How would you fix it?",
      "answer": "Use Number.isNaN for invalid numbers and Object.is when signed zero or NaN identity matters."
    },
    {
      "id": "javascript-008.q05",
      "level": "Senior",
      "question": "What constraints matter when using Equality operators in production?",
      "answer": "Avoid loose equality unless its exact coercion is intentional and documented. Object equality compares identity, not structural content."
    },
    {
      "id": "javascript-008.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use strict equality for ordinary application comparisons. Object equality compares identity, not structural content."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
