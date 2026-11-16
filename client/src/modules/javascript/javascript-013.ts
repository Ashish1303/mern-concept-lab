import type { Lesson } from '../lesson-types';

function example1() {
  const double = function double(value: number) { return value * 2; };
  return [1, 2, 3].map(double);
}

function example2() {
  const factorial = function recur(value: number): number { return value < 2 ? 1 : value * recur(value - 1); };
  return factorial(5);
}

export const lesson = {
  "id": "javascript-013",
  "description": "A function expression creates a function value during expression evaluation and can keep a private recursive name.",
  "when": "Pass function values to callbacks or assign a named expression for readable recursion.",
  "avoid": "Avoid treating const-bound function expressions as hoisted function declarations.",
  "tradeoff": "Named expressions improve stack traces without adding their private name to the surrounding scope.",
  "mistakes": [
    {
      "problem": "Calling a function-expression binding before initialization.",
      "fix": "Initialize the function value before invoking it."
    }
  ],
  "examples": [
    {
      "title": "Function expression as a callback",
      "expected": [
        2,
        4,
        6
      ],
      "explanation": "The function value is passed to map after initialization.",
      "runtime": "browser",
      "id": "javascript-013.e01",
      "run": example1
    },
    {
      "title": "Private recursive function name",
      "expected": 120,
      "explanation": "The expression’s own name allows recursion without depending on an outer alias.",
      "runtime": "browser",
      "id": "javascript-013.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-013.q01",
      "level": "Basic",
      "question": "What does Function expressions mean here?",
      "answer": "A function expression creates a function value during expression evaluation and can keep a private recursive name."
    },
    {
      "id": "javascript-013.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Function expression as a callback”. Why?",
      "answer": "[2, 4, 6] The function value is passed to map after initialization."
    },
    {
      "id": "javascript-013.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The function value is passed to map after initialization. The expression’s own name allows recursion without depending on an outer alias."
    },
    {
      "id": "javascript-013.q04",
      "level": "Debugging",
      "question": "Calling a function-expression binding before initialization. How would you fix it?",
      "answer": "Initialize the function value before invoking it."
    },
    {
      "id": "javascript-013.q05",
      "level": "Senior",
      "question": "What constraints matter when using Function expressions in production?",
      "answer": "Avoid treating const-bound function expressions as hoisted function declarations. Named expressions improve stack traces without adding their private name to the surrounding scope."
    },
    {
      "id": "javascript-013.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Pass function values to callbacks or assign a named expression for readable recursion. Named expressions improve stack traces without adding their private name to the surrounding scope."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
