import type { Lesson } from '../lesson-types';

function example1() {
  let reads = 0;
  const source = { get value() { reads++; return 7; } };
  const copied = Object.assign({}, source);
  return { value: copied.value, reads, accessor: Boolean(Object.getOwnPropertyDescriptor(copied, 'value')?.get) };
}

function example2() {
  const source = { get value() { return 7; } };
  const copied = Object.defineProperties({}, Object.getOwnPropertyDescriptors(source));
  return { accessor: Boolean(Object.getOwnPropertyDescriptor(copied, 'value')?.get), value: Reflect.get(copied, 'value') };
}

export const lesson = {
  "id": "javascript-030",
  "description": "Object helpers enumerate, copy, freeze and describe properties with different ownership and descriptor rules.",
  "when": "Choose a helper based on whether you need values, keys or descriptors.",
  "avoid": "Avoid assuming Object.assign preserves getters as getters.",
  "tradeoff": "Value copying invokes getters; descriptor copying retains accessors and their behavior.",
  "mistakes": [
    {
      "problem": "Copying a getter with Object.assign and expecting laziness to remain.",
      "fix": "Use property descriptors when preserving accessor semantics is required."
    }
  ],
  "examples": [
    {
      "title": "assign reads a getter value",
      "expected": {
        "value": 7,
        "reads": 1,
        "accessor": false
      },
      "explanation": "assign invokes the getter once and writes a normal data property.",
      "runtime": "browser",
      "id": "javascript-030.e01",
      "run": example1
    },
    {
      "title": "Preserve descriptors",
      "expected": {
        "accessor": true,
        "value": 7
      },
      "explanation": "defineProperties copies the accessor descriptor rather than evaluating it during copying.",
      "runtime": "browser",
      "id": "javascript-030.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-030.q01",
      "level": "Basic",
      "question": "What does Object methods mean here?",
      "answer": "Object helpers enumerate, copy, freeze and describe properties with different ownership and descriptor rules."
    },
    {
      "id": "javascript-030.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “assign reads a getter value”. Why?",
      "answer": "{\"value\": 7, \"reads\": 1, \"accessor\": false} assign invokes the getter once and writes a normal data property."
    },
    {
      "id": "javascript-030.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "assign invokes the getter once and writes a normal data property. defineProperties copies the accessor descriptor rather than evaluating it during copying."
    },
    {
      "id": "javascript-030.q04",
      "level": "Debugging",
      "question": "Copying a getter with Object.assign and expecting laziness to remain. How would you fix it?",
      "answer": "Use property descriptors when preserving accessor semantics is required."
    },
    {
      "id": "javascript-030.q05",
      "level": "Senior",
      "question": "What constraints matter when using Object methods in production?",
      "answer": "Avoid assuming Object.assign preserves getters as getters. Value copying invokes getters; descriptor copying retains accessors and their behavior."
    },
    {
      "id": "javascript-030.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Choose a helper based on whether you need values, keys or descriptors. Value copying invokes getters; descriptor copying retains accessors and their behavior."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
