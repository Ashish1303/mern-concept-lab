import type { Lesson } from '../lesson-types';

function example1() {
  const source = [{ score: 1 }]; const copied = [...source]; copied[0]!.score = 2;
  return { original: source[0]!.score, sameArray: source === copied, sameItem: source[0] === copied[0] };
}

function example2() {
  const source = [{ score: 1 }]; const copied = source.map(item => ({ ...item, score: 2 }));
  return [source[0]!.score, copied[0]!.score, source[0] === copied[0]];
}

export const lesson = {
  "id": "javascript-031",
  "description": "A shallow copy creates a new outer container while retaining references to nested values.",
  "when": "Copy one level when nested values are immutable or deliberately shared.",
  "avoid": "Avoid using shallow copies as a guarantee of nested independence.",
  "tradeoff": "Shallow copies are cheaper than copying the entire graph but require deliberate ownership.",
  "mistakes": [
    {
      "problem": "Changing a nested object through a copied array.",
      "fix": "Copy the affected nested object before mutating it."
    }
  ],
  "examples": [
    {
      "title": "Array copy still shares objects",
      "expected": {
        "original": 2,
        "sameArray": false,
        "sameItem": true
      },
      "explanation": "Only the outer array is new.",
      "runtime": "browser",
      "id": "javascript-031.e01",
      "run": example1
    },
    {
      "title": "Copy the modified path",
      "expected": [
        1,
        2,
        false
      ],
      "explanation": "Mapping to new objects breaks the specific nested sharing.",
      "runtime": "browser",
      "id": "javascript-031.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-031.q01",
      "level": "Basic",
      "question": "What does Shallow copy mean here?",
      "answer": "A shallow copy creates a new outer container while retaining references to nested values."
    },
    {
      "id": "javascript-031.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Array copy still shares objects”. Why?",
      "answer": "{\"original\": 2, \"sameArray\": false, \"sameItem\": true} Only the outer array is new."
    },
    {
      "id": "javascript-031.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Only the outer array is new. Mapping to new objects breaks the specific nested sharing."
    },
    {
      "id": "javascript-031.q04",
      "level": "Debugging",
      "question": "Changing a nested object through a copied array. How would you fix it?",
      "answer": "Copy the affected nested object before mutating it."
    },
    {
      "id": "javascript-031.q05",
      "level": "Senior",
      "question": "What constraints matter when using Shallow copy in production?",
      "answer": "Avoid using shallow copies as a guarantee of nested independence. Shallow copies are cheaper than copying the entire graph but require deliberate ownership."
    },
    {
      "id": "javascript-031.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Copy one level when nested values are immutable or deliberately shared. Shallow copies are cheaper than copying the entire graph but require deliberate ownership."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
