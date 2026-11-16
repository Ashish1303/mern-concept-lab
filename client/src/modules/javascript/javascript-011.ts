import type { Lesson, RunContext } from '../lesson-types';

function example1() {
  return [2 + 3 * 4, (2 + 3) * 4, 2 ** 3];
}

function example2(ctx: RunContext) {
  let calls = 0;
  const work = () => { calls++; return 'ran'; };
  const empty = ctx.input;
  const chosen = empty && work();
  return { chosen, boolean: Boolean(chosen), calls };
}

export const lesson = {
  "id": "javascript-011",
  "description": "Operators combine, compare and select values with precedence and short-circuit rules.",
  "when": "Use explicit grouping when arithmetic or logical precedence is easy to misread.",
  "avoid": "Avoid mixing logical operators and side effects in unreadable expressions.",
  "tradeoff": "Short-circuit operators skip evaluation and can prevent unnecessary work.",
  "mistakes": [
    {
      "problem": "Assuming && returns a boolean rather than one of its operands.",
      "fix": "Convert to Boolean when a boolean result is required."
    }
  ],
  "examples": [
    {
      "title": "Precedence and grouping",
      "expected": [
        14,
        20,
        8
      ],
      "explanation": "Multiplication binds tighter than addition unless parentheses change grouping.",
      "runtime": "browser",
      "id": "javascript-011.e01",
      "run": example1
    },
    {
      "title": "Short-circuit evaluation and operand values",
      "expected": {
        "chosen": "",
        "boolean": false,
        "calls": 0
      },
      "explanation": "An empty first operand stops && before the callback runs.",
      "runtime": "browser",
      "input": {
        "label": "Input",
        "initial": ""
      },
      "id": "javascript-011.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-011.q01",
      "level": "Basic",
      "question": "What does Operators mean here?",
      "answer": "Operators combine, compare and select values with precedence and short-circuit rules."
    },
    {
      "id": "javascript-011.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Precedence and grouping”. Why?",
      "answer": "[14, 20, 8] Multiplication binds tighter than addition unless parentheses change grouping."
    },
    {
      "id": "javascript-011.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Multiplication binds tighter than addition unless parentheses change grouping. An empty first operand stops && before the callback runs."
    },
    {
      "id": "javascript-011.q04",
      "level": "Debugging",
      "question": "Assuming && returns a boolean rather than one of its operands. How would you fix it?",
      "answer": "Convert to Boolean when a boolean result is required."
    },
    {
      "id": "javascript-011.q05",
      "level": "Senior",
      "question": "What constraints matter when using Operators in production?",
      "answer": "Avoid mixing logical operators and side effects in unreadable expressions. Short-circuit operators skip evaluation and can prevent unnecessary work."
    },
    {
      "id": "javascript-011.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use explicit grouping when arithmetic or logical precedence is easy to misread. Short-circuit operators skip evaluation and can prevent unnecessary work."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
