import type { Lesson } from '../lesson-types';

function example1() {
  let visited = 0; const result = [2, 4, 5, 6].every(value => { visited++; return value % 2 === 0; });
  return { result, visited };
}

function example2() {
  const values: number[] = [];
  return { wrongAccepted: values.every(value => value > 0), fixedAccepted: values.length > 0 && values.every(value => value > 0) };
}

export const lesson = {
  "id": "javascript-049",
  "description": "every answers whether all visited elements satisfy a predicate; an empty list returns true.",
  "when": "Validate all entries while specifying any nonempty requirement separately.",
  "avoid": "Avoid treating every as proof that a collection contains an item.",
  "tradeoff": "every short-circuits at the first failure and has constant auxiliary space.",
  "mistakes": [
    {
      "problem": "Accepting an empty submission because every returns true.",
      "fix": "Require length > 0 in addition to the per-item predicate."
    }
  ],
  "examples": [
    {
      "title": "Stop on the first failure",
      "expected": {
        "result": false,
        "visited": 3
      },
      "explanation": "The odd value stops further predicate calls.",
      "runtime": "browser",
      "id": "javascript-049.e01",
      "run": example1
    },
    {
      "title": "Vacuous truth and a nonempty guard",
      "expected": {
        "wrongAccepted": true,
        "fixedAccepted": false
      },
      "explanation": "Universal conditions are true for an empty list unless nonemptiness is checked separately.",
      "runtime": "browser",
      "id": "javascript-049.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-049.q01",
      "level": "Basic",
      "question": "What does every mean here?",
      "answer": "every answers whether all visited elements satisfy a predicate; an empty list returns true."
    },
    {
      "id": "javascript-049.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Stop on the first failure”. Why?",
      "answer": "{\"result\": false, \"visited\": 3} The odd value stops further predicate calls."
    },
    {
      "id": "javascript-049.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The odd value stops further predicate calls. Universal conditions are true for an empty list unless nonemptiness is checked separately."
    },
    {
      "id": "javascript-049.q04",
      "level": "Debugging",
      "question": "Accepting an empty submission because every returns true. How would you fix it?",
      "answer": "Require length > 0 in addition to the per-item predicate."
    },
    {
      "id": "javascript-049.q05",
      "level": "Senior",
      "question": "What constraints matter when using every in production?",
      "answer": "Avoid treating every as proof that a collection contains an item. every short-circuits at the first failure and has constant auxiliary space."
    },
    {
      "id": "javascript-049.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Validate all entries while specifying any nonempty requirement separately. every short-circuits at the first failure and has constant auxiliary space."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
