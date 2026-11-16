import type { Lesson } from '../lesson-types';

function example1() {
  const source = [1, 2]; const append = (values: number[], value: number) => [...values, value];
  return { source, first: append(source, 3), second: append(source, 3) };
}

function example2() {
  const source = [3, 1, 2]; const wrong = source.sort((a, b) => a - b);
  const fresh = [3, 1, 2]; const fixed = [...fresh].sort((a, b) => a - b);
  return { mutated: source, sameReference: wrong === source, preserved: fresh, fixed };
}

export const lesson = {
  "id": "javascript-037",
  "description": "A pure function returns the same result for the same inputs and has no externally observable side effects.",
  "when": "Use pure transformations for predictable state updates and tests.",
  "avoid": "Avoid pretending time, randomness or shared mutation are pure dependencies.",
  "tradeoff": "Pure functions can be cached by stable inputs; allocating copies has a cost.",
  "mistakes": [
    {
      "problem": "Mutating an input array while presenting the function as a transformation.",
      "fix": "Return a copied array and leave the caller’s data unchanged."
    }
  ],
  "examples": [
    {
      "title": "Pure transformation preserves its input",
      "expected": {
        "source": [
          1,
          2
        ],
        "first": [
          1,
          2,
          3
        ],
        "second": [
          1,
          2,
          3
        ]
      },
      "explanation": "Neither call mutates source and both produce equivalent values.",
      "runtime": "browser",
      "id": "javascript-037.e01",
      "run": example1
    },
    {
      "title": "Mutation bug versus copied sort",
      "expected": {
        "mutated": [
          1,
          2,
          3
        ],
        "sameReference": true,
        "preserved": [
          3,
          1,
          2
        ],
        "fixed": [
          1,
          2,
          3
        ]
      },
      "explanation": "sort mutates; sorting a copied container preserves the original.",
      "runtime": "browser",
      "id": "javascript-037.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-037.q01",
      "level": "Basic",
      "question": "What does Pure functions mean here?",
      "answer": "A pure function returns the same result for the same inputs and has no externally observable side effects."
    },
    {
      "id": "javascript-037.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Pure transformation preserves its input”. Why?",
      "answer": "{\"source\": [1, 2], \"first\": [1, 2, 3], \"second\": [1, 2, 3]} Neither call mutates source and both produce equivalent values."
    },
    {
      "id": "javascript-037.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Neither call mutates source and both produce equivalent values. sort mutates; sorting a copied container preserves the original."
    },
    {
      "id": "javascript-037.q04",
      "level": "Debugging",
      "question": "Mutating an input array while presenting the function as a transformation. How would you fix it?",
      "answer": "Return a copied array and leave the caller’s data unchanged."
    },
    {
      "id": "javascript-037.q05",
      "level": "Senior",
      "question": "What constraints matter when using Pure functions in production?",
      "answer": "Avoid pretending time, randomness or shared mutation are pure dependencies. Pure functions can be cached by stable inputs; allocating copies has a cost."
    },
    {
      "id": "javascript-037.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use pure transformations for predictable state updates and tests. Pure functions can be cached by stable inputs; allocating copies has a cost."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
