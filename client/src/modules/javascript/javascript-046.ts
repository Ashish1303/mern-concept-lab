import type { Lesson } from '../lesson-types';

function example1() {
  const visited: string[] = [];
  const result = [1, 2, 3].forEach(value => visited.push(`visit ${value}`));
  return { visited, returned: String(result) };
}

function example2() {
  const values = [1, 2]; const sideEffects: number[] = [];
  values.forEach(value => { sideEffects.push(value * 2); });
  return { effects: sideEffects, mapped: values.map(value => value * 2) };
}

export const lesson = {
  "id": "javascript-046",
  "description": "forEach visits present elements for side effects and returns undefined; it does not collect callback results.",
  "when": "Perform explicit synchronous side effects for each item.",
  "avoid": "Avoid forEach when you need transformed output or awaited sequential async work.",
  "tradeoff": "forEach cannot be broken with return; a for-of loop offers normal control flow.",
  "mistakes": [
    {
      "problem": "Expecting forEach to return a mapped array.",
      "fix": "Use map for returned values, or collect effects explicitly."
    }
  ],
  "examples": [
    {
      "title": "Collect observed side effects",
      "expected": {
        "visited": [
          "visit 1",
          "visit 2",
          "visit 3"
        ],
        "returned": "undefined"
      },
      "explanation": "push results are ignored; the outer method returns undefined.",
      "runtime": "browser",
      "id": "javascript-046.e01",
      "run": example1
    },
    {
      "title": "Transform with map instead",
      "expected": {
        "effects": [
          2,
          4
        ],
        "mapped": [
          2,
          4
        ]
      },
      "explanation": "Both can cause visible work, but map expresses the returned-list contract directly.",
      "runtime": "browser",
      "id": "javascript-046.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-046.q01",
      "level": "Basic",
      "question": "What does forEach mean here?",
      "answer": "forEach visits present elements for side effects and returns undefined; it does not collect callback results."
    },
    {
      "id": "javascript-046.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Collect observed side effects”. Why?",
      "answer": "{\"visited\": [\"visit 1\", \"visit 2\", \"visit 3\"], \"returned\": \"undefined\"} push results are ignored; the outer method returns undefined."
    },
    {
      "id": "javascript-046.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "push results are ignored; the outer method returns undefined. Both can cause visible work, but map expresses the returned-list contract directly."
    },
    {
      "id": "javascript-046.q04",
      "level": "Debugging",
      "question": "Expecting forEach to return a mapped array. How would you fix it?",
      "answer": "Use map for returned values, or collect effects explicitly."
    },
    {
      "id": "javascript-046.q05",
      "level": "Senior",
      "question": "What constraints matter when using forEach in production?",
      "answer": "Avoid forEach when you need transformed output or awaited sequential async work. forEach cannot be broken with return; a for-of loop offers normal control flow."
    },
    {
      "id": "javascript-046.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Perform explicit synchronous side effects for each item. forEach cannot be broken with return; a for-of loop offers normal control flow."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
