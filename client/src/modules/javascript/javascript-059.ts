import type { Lesson } from '../lesson-types';
import { capture } from '../runtime';

function example1() {
  const item = {}; const visited = new WeakSet<object>(); visited.add(item);
  return [visited.has(item), visited.has({}), visited.delete(item), visited.has(item)];
}

function example2() {
  const visited = new WeakSet<object>();
  return { primitive: capture(() => Reflect.apply(WeakSet.prototype.add, visited, ['name'])), size: String(Reflect.get(visited, 'size')) };
}

export const lesson = {
  "id": "javascript-059",
  "description": "WeakSet tracks weakly held object membership without enumeration or a public size.",
  "when": "Mark objects as visited without making the set their sole lifetime owner.",
  "avoid": "Avoid WeakSet when a count or persistent primitive membership list is needed.",
  "tradeoff": "Weak collection behavior does not make explicit listener or timer cleanup unnecessary.",
  "mistakes": [
    {
      "problem": "Assuming membership enumeration or deterministic GC can be observed.",
      "fix": "Use retained object identities for has/delete and a normal Set when enumeration is required."
    }
  ],
  "examples": [
    {
      "title": "Track membership by object identity",
      "expected": [
        true,
        false,
        true,
        false
      ],
      "explanation": "Only the retained identity matches membership.",
      "runtime": "browser",
      "id": "javascript-059.e01",
      "run": example1
    },
    {
      "title": "Reject string members",
      "expected": {
        "primitive": "TypeError",
        "size": "undefined"
      },
      "explanation": "Strings are invalid weak members; no size API reveals collection state.",
      "runtime": "browser",
      "id": "javascript-059.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-059.q01",
      "level": "Basic",
      "question": "What does WeakSet mean here?",
      "answer": "WeakSet tracks weakly held object membership without enumeration or a public size."
    },
    {
      "id": "javascript-059.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Track membership by object identity”. Why?",
      "answer": "[true, false, true, false] Only the retained identity matches membership."
    },
    {
      "id": "javascript-059.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Only the retained identity matches membership. Strings are invalid weak members; no size API reveals collection state."
    },
    {
      "id": "javascript-059.q04",
      "level": "Debugging",
      "question": "Assuming membership enumeration or deterministic GC can be observed. How would you fix it?",
      "answer": "Use retained object identities for has/delete and a normal Set when enumeration is required."
    },
    {
      "id": "javascript-059.q05",
      "level": "Senior",
      "question": "What constraints matter when using WeakSet in production?",
      "answer": "Avoid WeakSet when a count or persistent primitive membership list is needed. Weak collection behavior does not make explicit listener or timer cleanup unnecessary."
    },
    {
      "id": "javascript-059.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Mark objects as visited without making the set their sole lifetime owner. Weak collection behavior does not make explicit listener or timer cleanup unnecessary."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
