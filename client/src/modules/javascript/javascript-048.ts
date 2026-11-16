import type { Lesson } from '../lesson-types';

function example1() {
  let visited = 0; const result = [1, 2, 3, 4].some(value => { visited++; return value % 2 === 0; });
  return { result, visited };
}

function example2() {
  const values: number[] = [];
  return { anyPositive: values.some(value => value > 0), nonempty: values.length > 0 };
}

export const lesson = {
  "id": "javascript-048",
  "description": "some answers whether at least one element satisfies a predicate and short-circuits on the first success.",
  "when": "Check existence without constructing a filtered list.",
  "avoid": "Avoid using some when every item must pass.",
  "tradeoff": "some short-circuits and uses constant auxiliary space.",
  "mistakes": [
    {
      "problem": "Assuming an empty list contains a successful match.",
      "fix": "Treat empty-list semantics explicitly in business rules."
    }
  ],
  "examples": [
    {
      "title": "Existence with early exit",
      "expected": {
        "result": true,
        "visited": 2
      },
      "explanation": "The first even value stops iteration.",
      "runtime": "browser",
      "id": "javascript-048.e01",
      "run": example1
    },
    {
      "title": "Empty list and corrected nonempty rule",
      "expected": {
        "anyPositive": false,
        "nonempty": false
      },
      "explanation": "No predicate call can succeed when no elements exist.",
      "runtime": "browser",
      "id": "javascript-048.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-048.q01",
      "level": "Basic",
      "question": "What does some mean here?",
      "answer": "some answers whether at least one element satisfies a predicate and short-circuits on the first success."
    },
    {
      "id": "javascript-048.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Existence with early exit”. Why?",
      "answer": "{\"result\": true, \"visited\": 2} The first even value stops iteration."
    },
    {
      "id": "javascript-048.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The first even value stops iteration. No predicate call can succeed when no elements exist."
    },
    {
      "id": "javascript-048.q04",
      "level": "Debugging",
      "question": "Assuming an empty list contains a successful match. How would you fix it?",
      "answer": "Treat empty-list semantics explicitly in business rules."
    },
    {
      "id": "javascript-048.q05",
      "level": "Senior",
      "question": "What constraints matter when using some in production?",
      "answer": "Avoid using some when every item must pass. some short-circuits and uses constant auxiliary space."
    },
    {
      "id": "javascript-048.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Check existence without constructing a filtered list. some short-circuits and uses constant auxiliary space."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
