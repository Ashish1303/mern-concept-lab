import type { Lesson } from '../lesson-types';
import { capture } from '../runtime';

function example1() {
  const key = {}; const metadata = new WeakMap<object, string>(); metadata.set(key, 'cached');
  const before = metadata.get(key); metadata.delete(key); return [before, metadata.has(key)];
}

function example2() {
  const metadata = new WeakMap<object, string>();
  return { primitive: capture(() => Reflect.apply(WeakMap.prototype.set, metadata, ['text', 'value'])), size: String(Reflect.get(metadata, 'size')) };
}

export const lesson = {
  "id": "javascript-058",
  "description": "WeakMap associates metadata with weakly held object keys without exposing key enumeration or size.",
  "when": "Attach private metadata to object lifetimes without retaining keys solely through the map.",
  "avoid": "Avoid WeakMap when you need enumeration, primitive string keys or observable collection timing.",
  "tradeoff": "Weak references help ownership but do not prove an object has been collected.",
  "mistakes": [
    {
      "problem": "Expecting keys(), size or deterministic garbage collection.",
      "fix": "Use has/get/delete for a retained key and label GC timing as nondeterministic."
    }
  ],
  "examples": [
    {
      "title": "Attach and delete metadata",
      "expected": [
        "cached",
        false
      ],
      "explanation": "Deletion is directly observable without claiming a garbage collection event.",
      "runtime": "browser",
      "id": "javascript-058.e01",
      "run": example1
    },
    {
      "title": "Primitive key rejection and non-enumerability",
      "expected": {
        "primitive": "TypeError",
        "size": "undefined"
      },
      "explanation": "A string cannot be weakly held as a key, and WeakMap has no public size property.",
      "runtime": "browser",
      "id": "javascript-058.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-058.q01",
      "level": "Basic",
      "question": "What does WeakMap mean here?",
      "answer": "WeakMap associates metadata with weakly held object keys without exposing key enumeration or size."
    },
    {
      "id": "javascript-058.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Attach and delete metadata”. Why?",
      "answer": "[\"cached\", false] Deletion is directly observable without claiming a garbage collection event."
    },
    {
      "id": "javascript-058.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Deletion is directly observable without claiming a garbage collection event. A string cannot be weakly held as a key, and WeakMap has no public size property."
    },
    {
      "id": "javascript-058.q04",
      "level": "Debugging",
      "question": "Expecting keys(), size or deterministic garbage collection. How would you fix it?",
      "answer": "Use has/get/delete for a retained key and label GC timing as nondeterministic."
    },
    {
      "id": "javascript-058.q05",
      "level": "Senior",
      "question": "What constraints matter when using WeakMap in production?",
      "answer": "Avoid WeakMap when you need enumeration, primitive string keys or observable collection timing. Weak references help ownership but do not prove an object has been collected."
    },
    {
      "id": "javascript-058.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Attach private metadata to object lifetimes without retaining keys solely through the map. Weak references help ownership but do not prove an object has been collected."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
