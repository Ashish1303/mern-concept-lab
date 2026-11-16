import type { Lesson } from '../lesson-types';

function example1() {
  function add(a: number, b: number) { return a + b; }
  return add(2, 3);
}

function example2() {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Intentional language-semantics example; compare the result with the corrected alternative.
  function missing(value: number) { value * 2; }
  function corrected(value: number) { return value * 2; }
  return [String(missing(3)), corrected(3)];
}

export const lesson = {
  "id": "javascript-012",
  "description": "A function packages reusable behavior with parameters, a return value and its own execution context.",
  "when": "Extract repeated transformations into small functions with explicit inputs.",
  "avoid": "Avoid hidden shared mutations when a simple return value suffices.",
  "tradeoff": "Pure small functions are easier to test, though real effects still belong at clear boundaries.",
  "mistakes": [
    {
      "problem": "Forgetting to return from a block-bodied function.",
      "fix": "Return the result explicitly or use an expression body."
    }
  ],
  "examples": [
    {
      "title": "Parameters and returned values",
      "expected": 5,
      "explanation": "Parameters bind arguments for each call.",
      "runtime": "browser",
      "id": "javascript-012.e01",
      "run": example1
    },
    {
      "title": "Missing return versus explicit return",
      "expected": [
        "undefined",
        6
      ],
      "explanation": "A block body with no return produces undefined even if it computes an expression.",
      "runtime": "browser",
      "id": "javascript-012.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-012.q01",
      "level": "Basic",
      "question": "What does Functions mean here?",
      "answer": "A function packages reusable behavior with parameters, a return value and its own execution context."
    },
    {
      "id": "javascript-012.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Parameters and returned values”. Why?",
      "answer": "5 Parameters bind arguments for each call."
    },
    {
      "id": "javascript-012.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Parameters bind arguments for each call. A block body with no return produces undefined even if it computes an expression."
    },
    {
      "id": "javascript-012.q04",
      "level": "Debugging",
      "question": "Forgetting to return from a block-bodied function. How would you fix it?",
      "answer": "Return the result explicitly or use an expression body."
    },
    {
      "id": "javascript-012.q05",
      "level": "Senior",
      "question": "What constraints matter when using Functions in production?",
      "answer": "Avoid hidden shared mutations when a simple return value suffices. Pure small functions are easier to test, though real effects still belong at clear boundaries."
    },
    {
      "id": "javascript-012.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Extract repeated transformations into small functions with explicit inputs. Pure small functions are easier to test, though real effects still belong at clear boundaries."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
