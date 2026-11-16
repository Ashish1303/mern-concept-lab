import type { Lesson } from '../lesson-types';

function example1() {
  return ['hello world', 'MERN lab'].flatMap(line => line.split(' '));
}

function example2() {
  return { expanded: [-1, 2, 3].flatMap(value => value < 0 ? [] : [value, value * 10]), nested: [1].flatMap(value => [[value]]) };
}

export const lesson = {
  "id": "javascript-052",
  "description": "flatMap maps each present element and flattens each returned array one level.",
  "when": "Expand or remove values in one transformation.",
  "avoid": "Avoid expecting recursive flattening or returning a non-array iterable expecting expansion.",
  "tradeoff": "flatMap can avoid a separate mapped-array pass, though output allocation remains.",
  "mistakes": [
    {
      "problem": "Assuming nested arrays are flattened arbitrarily deeply.",
      "fix": "Return a one-level list or apply an explicit later flattening step."
    }
  ],
  "examples": [
    {
      "title": "Split text into words",
      "expected": [
        "hello",
        "world",
        "MERN",
        "lab"
      ],
      "explanation": "Each callback’s word array is flattened one level.",
      "runtime": "browser",
      "id": "javascript-052.e01",
      "run": example1
    },
    {
      "title": "Filter and expand while respecting one-level depth",
      "expected": {
        "expanded": [
          2,
          20,
          3,
          30
        ],
        "nested": [
          [
            1
          ]
        ]
      },
      "explanation": "An empty array removes an item; a nested array inside the returned array remains.",
      "runtime": "browser",
      "id": "javascript-052.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-052.q01",
      "level": "Basic",
      "question": "What does flatMap mean here?",
      "answer": "flatMap maps each present element and flattens each returned array one level."
    },
    {
      "id": "javascript-052.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Split text into words”. Why?",
      "answer": "[\"hello\", \"world\", \"MERN\", \"lab\"] Each callback’s word array is flattened one level."
    },
    {
      "id": "javascript-052.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Each callback’s word array is flattened one level. An empty array removes an item; a nested array inside the returned array remains."
    },
    {
      "id": "javascript-052.q04",
      "level": "Debugging",
      "question": "Assuming nested arrays are flattened arbitrarily deeply. How would you fix it?",
      "answer": "Return a one-level list or apply an explicit later flattening step."
    },
    {
      "id": "javascript-052.q05",
      "level": "Senior",
      "question": "What constraints matter when using flatMap in production?",
      "answer": "Avoid expecting recursive flattening or returning a non-array iterable expecting expansion. flatMap can avoid a separate mapped-array pass, though output allocation remains."
    },
    {
      "id": "javascript-052.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Expand or remove values in one transformation. flatMap can avoid a separate mapped-array pass, though output allocation remains."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
