import type { Lesson } from '../lesson-types';
import { capture } from '../runtime';
import { clonePlain } from '../algorithms';

function example1() {
  const original: { nested: { value: number }; self?: unknown } = { nested: { value: 1 } }; original.self = original;
  const copy = clonePlain(original); copy.nested.value = 2;
  return { before: original.nested.value, copied: copy.nested.value, cycle: copy.self === copy, separate: copy !== original };
}

function example2() {
  return { customDate: capture(() => clonePlain(new Date('2020-01-01'))), nativeDate: structuredClone(new Date('2020-01-01')).toISOString() };
}

export const lesson = {
  "id": "javascript-108",
  "description": "A deep clone must define supported types and preserve repeated-reference/cycle relationships when required.",
  "when": "Practice a bounded plain-data clone and compare it with structuredClone.",
  "avoid": "Avoid claiming a small recursive helper universally clones functions, accessors, DOM nodes or class instances.",
  "tradeoff": "The plain-data helper is O(n) time/space with O(depth) stack; UI inputs are bounded and richer objects are rejected.",
  "mistakes": [
    {
      "problem": "Naively recursing forever on a cyclic reference or assigning unsafe prototype keys.",
      "fix": "Track visited objects with WeakMap and define owned data properties explicitly."
    }
  ],
  "examples": [
    {
      "title": "Custom clone preserves a cycle and separates nested data",
      "expected": {
        "before": 1,
        "copied": 2,
        "cycle": true,
        "separate": true
      },
      "explanation": "WeakMap preserves a previously visited reference rather than recursing again.",
      "runtime": "browser",
      "id": "javascript-108.e01",
      "run": example1
    },
    {
      "title": "Reject unsupported classes; use the native clone for Date",
      "expected": {
        "customDate": "TypeError",
        "nativeDate": "2020-01-01T00:00:00.000Z"
      },
      "explanation": "Explicitly rejecting an unsupported type is safer than silently producing a broken plain object.",
      "runtime": "browser",
      "id": "javascript-108.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-108.q01",
      "level": "Basic",
      "question": "What does Deep clone mean here?",
      "answer": "A deep clone must define supported types and preserve repeated-reference/cycle relationships when required."
    },
    {
      "id": "javascript-108.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Custom clone preserves a cycle and separates nested data”. Why?",
      "answer": "{\"before\": 1, \"copied\": 2, \"cycle\": true, \"separate\": true} WeakMap preserves a previously visited reference rather than recursing again."
    },
    {
      "id": "javascript-108.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "WeakMap preserves a previously visited reference rather than recursing again. Explicitly rejecting an unsupported type is safer than silently producing a broken plain object."
    },
    {
      "id": "javascript-108.q04",
      "level": "Debugging",
      "question": "Naively recursing forever on a cyclic reference or assigning unsafe prototype keys. How would you fix it?",
      "answer": "Track visited objects with WeakMap and define owned data properties explicitly."
    },
    {
      "id": "javascript-108.q05",
      "level": "Senior",
      "question": "What constraints matter when using Deep clone in production?",
      "answer": "Avoid claiming a small recursive helper universally clones functions, accessors, DOM nodes or class instances. The plain-data helper is O(n) time/space with O(depth) stack; UI inputs are bounded and richer objects are rejected."
    },
    {
      "id": "javascript-108.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Practice a bounded plain-data clone and compare it with structuredClone. The plain-data helper is O(n) time/space with O(depth) stack; UI inputs are bounded and richer objects are rejected."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
