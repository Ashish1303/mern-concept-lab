import type { Lesson } from '../lesson-types';

function example1() {
  function transform(values: number[], operation: (value: number) => number) { return values.map(operation); }
  return transform([1, 2, 3], value => value * value);
}

function example2() {
  let calls = 0;
  const track = (fn: (a: number, b: number) => number) => (a: number, b: number) => { calls++; return fn(a, b); };
  const sum = track((a, b) => a + b); return { result: sum(2, 3), calls };
}

export const lesson = {
  "id": "javascript-036",
  "description": "A higher-order function accepts functions, returns functions, or both.",
  "when": "Separate reusable control flow from the operation applied to each value.",
  "avoid": "Avoid wrappers that silently change the wrapped function’s contract.",
  "tradeoff": "Composition improves reuse but adds indirection that should remain readable.",
  "mistakes": [
    {
      "problem": "Forgetting to forward arguments or return a wrapped result.",
      "fix": "Forward parameters and return the callback result explicitly."
    }
  ],
  "examples": [
    {
      "title": "Inject a transformation",
      "expected": [
        1,
        4,
        9
      ],
      "explanation": "The higher-order function controls iteration and the callback supplies the calculation.",
      "runtime": "browser",
      "id": "javascript-036.e01",
      "run": example1
    },
    {
      "title": "Wrapper forwards arguments and return value",
      "expected": {
        "result": 5,
        "calls": 1
      },
      "explanation": "The wrapper adds observation without discarding the original result.",
      "runtime": "browser",
      "id": "javascript-036.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-036.q01",
      "level": "Basic",
      "question": "What does Higher-order functions mean here?",
      "answer": "A higher-order function accepts functions, returns functions, or both."
    },
    {
      "id": "javascript-036.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Inject a transformation”. Why?",
      "answer": "[1, 4, 9] The higher-order function controls iteration and the callback supplies the calculation."
    },
    {
      "id": "javascript-036.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The higher-order function controls iteration and the callback supplies the calculation. The wrapper adds observation without discarding the original result."
    },
    {
      "id": "javascript-036.q04",
      "level": "Debugging",
      "question": "Forgetting to forward arguments or return a wrapped result. How would you fix it?",
      "answer": "Forward parameters and return the callback result explicitly."
    },
    {
      "id": "javascript-036.q05",
      "level": "Senior",
      "question": "What constraints matter when using Higher-order functions in production?",
      "answer": "Avoid wrappers that silently change the wrapped function’s contract. Composition improves reuse but adds indirection that should remain readable."
    },
    {
      "id": "javascript-036.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Separate reusable control flow from the operation applied to each value. Composition improves reuse but adds indirection that should remain readable."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
