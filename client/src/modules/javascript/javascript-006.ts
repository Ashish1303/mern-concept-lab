import type { Lesson } from '../lesson-types';

function example1() {
  const primitive = 1;
  let copy = primitive;
  copy += 1;
  const original = { count: 1 };
  const alias = original;
  alias.count += 1;
  return { primitive, copy, original: original.count, same: alias === original };
}

function example2() {
  const original = { count: 1 };
  const copy = { ...original };
  copy.count = 2;
  return [original.count, copy.count, original === copy];
}

export const lesson = {
  "id": "javascript-006",
  "description": "Primitive assignments copy values; object assignments copy references to the same object.",
  "when": "Distinguish independent values from aliases before updating data.",
  "avoid": "Avoid assuming an object assignment clones its contents.",
  "tradeoff": "Object copies add allocation; reference sharing is useful only when intentional.",
  "mistakes": [
    {
      "problem": "Mutating an alias and expecting the original object to stay unchanged.",
      "fix": "Create the required new object and copy nested levels that need isolation."
    }
  ],
  "examples": [
    {
      "title": "Value copy and object alias",
      "expected": {
        "primitive": 1,
        "copy": 2,
        "original": 2,
        "same": true
      },
      "explanation": "Primitive updates do not change the other binding; aliases point at the same object.",
      "runtime": "browser",
      "id": "javascript-006.e01",
      "run": example1
    },
    {
      "title": "Separate the object before updating",
      "expected": [
        1,
        2,
        false
      ],
      "explanation": "Spreading creates a distinct outer object.",
      "runtime": "browser",
      "id": "javascript-006.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-006.q01",
      "level": "Basic",
      "question": "What does Primitive and reference values mean here?",
      "answer": "Primitive assignments copy values; object assignments copy references to the same object."
    },
    {
      "id": "javascript-006.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Value copy and object alias”. Why?",
      "answer": "{\"primitive\": 1, \"copy\": 2, \"original\": 2, \"same\": true} Primitive updates do not change the other binding; aliases point at the same object."
    },
    {
      "id": "javascript-006.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Primitive updates do not change the other binding; aliases point at the same object. Spreading creates a distinct outer object."
    },
    {
      "id": "javascript-006.q04",
      "level": "Debugging",
      "question": "Mutating an alias and expecting the original object to stay unchanged. How would you fix it?",
      "answer": "Create the required new object and copy nested levels that need isolation."
    },
    {
      "id": "javascript-006.q05",
      "level": "Senior",
      "question": "What constraints matter when using Primitive and reference values in production?",
      "answer": "Avoid assuming an object assignment clones its contents. Object copies add allocation; reference sharing is useful only when intentional."
    },
    {
      "id": "javascript-006.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Distinguish independent values from aliases before updating data. Object copies add allocation; reference sharing is useful only when intentional."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
