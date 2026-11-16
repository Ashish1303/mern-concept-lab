import type { Lesson } from '../lesson-types';

function example1() {
  class Counter { count = 0; increment() { return ++this.count; } }
  const a = new Counter(); const b = new Counter();
  return [a.increment(), a.increment(), b.increment(), a.increment === b.increment];
}

function example2() {
  class Account { #balance = 4; read() { return this.#balance; } }
  const account = new Account();
  return { balance: account.read(), keys: Object.keys(account), copiedHasRead: Object.hasOwn({ ...account }, 'read') };
}

export const lesson = {
  "id": "javascript-029",
  "description": "Classes define constructors, instance fields and prototype methods. JavaScript private fields enforce runtime access.",
  "when": "Group state with behavior and enforce invariants through methods.",
  "avoid": "Avoid classes when a plain value or small function is sufficient.",
  "tradeoff": "Class method functions are shared; per-instance fields have separate storage.",
  "mistakes": [
    {
      "problem": "Expecting a copied plain object to preserve a class’s prototype methods.",
      "fix": "Keep the instance or explicitly reconstruct the class from serialized data."
    }
  ],
  "examples": [
    {
      "title": "Shared method, independent fields",
      "expected": [
        1,
        2,
        1,
        true
      ],
      "explanation": "Instance fields differ while the prototype holds a shared method.",
      "runtime": "browser",
      "id": "javascript-029.e01",
      "run": example1
    },
    {
      "title": "Private state and serialization boundary",
      "expected": {
        "balance": 4,
        "keys": [],
        "copiedHasRead": false
      },
      "explanation": "Private fields are not enumerable and prototype methods are not copied by object spread.",
      "runtime": "browser",
      "id": "javascript-029.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-029.q01",
      "level": "Basic",
      "question": "What does Classes mean here?",
      "answer": "Classes define constructors, instance fields and prototype methods. JavaScript private fields enforce runtime access."
    },
    {
      "id": "javascript-029.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Shared method, independent fields”. Why?",
      "answer": "[1, 2, 1, true] Instance fields differ while the prototype holds a shared method."
    },
    {
      "id": "javascript-029.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Instance fields differ while the prototype holds a shared method. Private fields are not enumerable and prototype methods are not copied by object spread."
    },
    {
      "id": "javascript-029.q04",
      "level": "Debugging",
      "question": "Expecting a copied plain object to preserve a class’s prototype methods. How would you fix it?",
      "answer": "Keep the instance or explicitly reconstruct the class from serialized data."
    },
    {
      "id": "javascript-029.q05",
      "level": "Senior",
      "question": "What constraints matter when using Classes in production?",
      "answer": "Avoid classes when a plain value or small function is sufficient. Class method functions are shared; per-instance fields have separate storage."
    },
    {
      "id": "javascript-029.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Group state with behavior and enforce invariants through methods. Class method functions are shared; per-instance fields have separate storage."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
