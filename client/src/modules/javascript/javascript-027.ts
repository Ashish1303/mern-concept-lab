import type { Lesson } from '../lesson-types';

function example1() {
  const prototype = { label: 'inherited' };
  const item = Object.create(prototype) as { label?: string };
  const before = item.label; item.label = 'own'; const own = Object.hasOwn(item, 'label'); delete item.label;
  return [before, own, item.label];
}

function example2() {
  const item = Object.assign(Object.create({ hidden: 1 }) as object, { visible: 2 });
  return { keys: Object.keys(item), inherited: 'hidden' in item, own: Object.hasOwn(item, 'hidden') };
}

export const lesson = {
  "id": "javascript-027",
  "description": "Property lookup checks an object’s own properties before following its prototype chain.",
  "when": "Understand inherited methods, shadowing and own-property checks.",
  "avoid": "Avoid mutating shared built-in prototypes.",
  "tradeoff": "Prototype methods can be shared across instances without copying functions.",
  "mistakes": [
    {
      "problem": "Mistaking inherited properties for own data fields.",
      "fix": "Use Object.hasOwn when ownership matters; avoid trusting arbitrary prototype keys."
    }
  ],
  "examples": [
    {
      "title": "Shadow and reveal an inherited value",
      "expected": [
        "inherited",
        true,
        "inherited"
      ],
      "explanation": "Deleting the own shadow exposes the prototype’s value again.",
      "runtime": "browser",
      "id": "javascript-027.e01",
      "run": example1
    },
    {
      "title": "Own keys exclude prototype fields",
      "expected": {
        "keys": [
          "visible"
        ],
        "inherited": true,
        "own": false
      },
      "explanation": "in checks the chain; Object.keys and Object.hasOwn restrict ownership.",
      "runtime": "browser",
      "id": "javascript-027.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-027.q01",
      "level": "Basic",
      "question": "What does Prototype chain mean here?",
      "answer": "Property lookup checks an object’s own properties before following its prototype chain."
    },
    {
      "id": "javascript-027.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Shadow and reveal an inherited value”. Why?",
      "answer": "[\"inherited\", true, \"inherited\"] Deleting the own shadow exposes the prototype’s value again."
    },
    {
      "id": "javascript-027.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Deleting the own shadow exposes the prototype’s value again. in checks the chain; Object.keys and Object.hasOwn restrict ownership."
    },
    {
      "id": "javascript-027.q04",
      "level": "Debugging",
      "question": "Mistaking inherited properties for own data fields. How would you fix it?",
      "answer": "Use Object.hasOwn when ownership matters; avoid trusting arbitrary prototype keys."
    },
    {
      "id": "javascript-027.q05",
      "level": "Senior",
      "question": "What constraints matter when using Prototype chain in production?",
      "answer": "Avoid mutating shared built-in prototypes. Prototype methods can be shared across instances without copying functions."
    },
    {
      "id": "javascript-027.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Understand inherited methods, shadowing and own-property checks. Prototype methods can be shared across instances without copying functions."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
