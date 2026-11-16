import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';

function example1(ctx: RunContext) {
  const value = text(ctx.input);
  return { concatenate: value + 1, numeric: Number(value) + 1, multiply: Number(value) * 2 };
}

function example2() {
  return [Number('12px').toString(), parseInt('12px', 10), Number('')];
}

export const lesson = {
  "id": "javascript-007",
  "description": "Coercion converts values according to an operator’s rules. Addition can concatenate while multiplication requests numbers.",
  "when": "Convert form strings explicitly before arithmetic.",
  "avoid": "Avoid implicit coercion at API and validation boundaries.",
  "tradeoff": "Number rejects malformed numeric text; parseInt accepts prefixes and has a different contract.",
  "mistakes": [
    {
      "problem": "Adding numeric input as text.",
      "fix": "Parse and validate numbers before using arithmetic."
    }
  ],
  "examples": [
    {
      "title": "String input through different operators",
      "expected": {
        "concatenate": "51",
        "numeric": 6,
        "multiply": 10
      },
      "explanation": "The input is a string until an explicit conversion.",
      "runtime": "browser",
      "input": {
        "label": "Numeric text",
        "initial": "5"
      },
      "id": "javascript-007.e01",
      "run": example1
    },
    {
      "title": "Whole-number conversion versus prefix parsing",
      "expected": [
        "NaN",
        12,
        0
      ],
      "explanation": "Number validates the whole string; parseInt reads a numeric prefix and empty text converts to zero.",
      "runtime": "browser",
      "id": "javascript-007.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-007.q01",
      "level": "Basic",
      "question": "What does Type coercion mean here?",
      "answer": "Coercion converts values according to an operator’s rules. Addition can concatenate while multiplication requests numbers."
    },
    {
      "id": "javascript-007.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “String input through different operators”. Why?",
      "answer": "{\"concatenate\": \"51\", \"numeric\": 6, \"multiply\": 10} The input is a string until an explicit conversion."
    },
    {
      "id": "javascript-007.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The input is a string until an explicit conversion. Number validates the whole string; parseInt reads a numeric prefix and empty text converts to zero."
    },
    {
      "id": "javascript-007.q04",
      "level": "Debugging",
      "question": "Adding numeric input as text. How would you fix it?",
      "answer": "Parse and validate numbers before using arithmetic."
    },
    {
      "id": "javascript-007.q05",
      "level": "Senior",
      "question": "What constraints matter when using Type coercion in production?",
      "answer": "Avoid implicit coercion at API and validation boundaries. Number rejects malformed numeric text; parseInt accepts prefixes and has a different contract."
    },
    {
      "id": "javascript-007.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Convert form strings explicitly before arithmetic. Number rejects malformed numeric text; parseInt accepts prefixes and has a different contract."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
