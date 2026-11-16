import type { Lesson } from '../lesson-types';

function example1() {
  const before = { user: { name: 'Ada' }, active: true };
  const after = { ...before, user: { ...before.user, name: 'Grace' } };
  return [before.user.name, after.user.name, before.user === after.user];
}

function example2() {
  const shallow = Object.freeze({ nested: { count: 1 } }); shallow.nested.count = 2;
  const protectedValue = Object.freeze({ nested: Object.freeze({ count: 1 }) });
  return [shallow.nested.count, Reflect.set(protectedValue.nested, 'count', 3), protectedValue.nested.count];
}

export const lesson = {
  "id": "javascript-034",
  "description": "Immutable updates produce new values while preserving the previous observable data. Object.freeze is shallow.",
  "when": "Keep state transitions and cached inputs predictable.",
  "avoid": "Avoid assuming a shallow freeze protects an entire object graph.",
  "tradeoff": "Copying every level costs allocations; structural sharing copies only changed paths.",
  "mistakes": [
    {
      "problem": "Mutating a nested object in a frozen outer object.",
      "fix": "Freeze the relevant nested object or create a copied update path."
    }
  ],
  "examples": [
    {
      "title": "Immutable path update",
      "expected": [
        "Ada",
        "Grace",
        false
      ],
      "explanation": "A new nested user preserves the old state.",
      "runtime": "browser",
      "id": "javascript-034.e01",
      "run": example1
    },
    {
      "title": "Shallow freeze and deeper protection",
      "expected": [
        2,
        false,
        1
      ],
      "explanation": "Only the separately frozen nested object rejects its write.",
      "runtime": "browser",
      "id": "javascript-034.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-034.q01",
      "level": "Basic",
      "question": "What does Immutability mean here?",
      "answer": "Immutable updates produce new values while preserving the previous observable data. Object.freeze is shallow."
    },
    {
      "id": "javascript-034.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Immutable path update”. Why?",
      "answer": "[\"Ada\", \"Grace\", false] A new nested user preserves the old state."
    },
    {
      "id": "javascript-034.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "A new nested user preserves the old state. Only the separately frozen nested object rejects its write."
    },
    {
      "id": "javascript-034.q04",
      "level": "Debugging",
      "question": "Mutating a nested object in a frozen outer object. How would you fix it?",
      "answer": "Freeze the relevant nested object or create a copied update path."
    },
    {
      "id": "javascript-034.q05",
      "level": "Senior",
      "question": "What constraints matter when using Immutability in production?",
      "answer": "Avoid assuming a shallow freeze protects an entire object graph. Copying every level costs allocations; structural sharing copies only changed paths."
    },
    {
      "id": "javascript-034.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Keep state transitions and cached inputs predictable. Copying every level costs allocations; structural sharing copies only changed paths."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
