import type { Lesson } from '../lesson-types';

function example1() {
  let object: { value: number } | null = { value: 1 }; const roots = new Map<string, object>(); roots.set('retained', object); object = null;
  const before = roots.size; roots.delete('retained'); return { local: object, before, after: roots.size, collectionObserved: false };
}

function example2() {
  let object: object | null = { value: 1 }; const reference = new WeakRef(object); object = null;
  return { local: object, availableInSameJob: reference.deref() !== undefined, collectionForced: false };
}

export const lesson = {
  "id": "javascript-091",
  "description": "Garbage collectors reclaim unreachable allocations according to engine policy. Reachability can be reasoned about, but collection timing is not deterministic.",
  "when": "Identify strong ownership and avoid retaining unnecessary data.",
  "avoid": "Avoid claiming delete, null assignment or WeakRef proves immediate memory reclamation.",
  "tradeoff": "The lab observes references and WeakRef’s same-job guarantee; it never fabricates heap counts or forces GC.",
  "mistakes": [
    {
      "problem": "Treating removal of one reference as proof that no other strong reference remains.",
      "fix": "Inspect ownership paths and describe release separately from collection."
    }
  ],
  "examples": [
    {
      "title": "A strong container retains an object until removal",
      "expected": {
        "local": null,
        "before": 1,
        "after": 0,
        "collectionObserved": false
      },
      "explanation": "The explicit ownership count changes, but that does not assert when the engine reclaims memory.",
      "runtime": "browser",
      "id": "javascript-091.e01",
      "run": example1
    },
    {
      "title": "WeakRef is kept alive within the current job",
      "expected": {
        "local": null,
        "availableInSameJob": true,
        "collectionForced": false
      },
      "explanation": "WeakRef construction keeps its target alive through this job; later collection remains nondeterministic.",
      "runtime": "browser",
      "id": "javascript-091.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-091.q01",
      "level": "Basic",
      "question": "What does Garbage collection basics mean here?",
      "answer": "Garbage collectors reclaim unreachable allocations according to engine policy. Reachability can be reasoned about, but collection timing is not deterministic."
    },
    {
      "id": "javascript-091.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “A strong container retains an object until removal”. Why?",
      "answer": "{\"local\": null, \"before\": 1, \"after\": 0, \"collectionObserved\": false} The explicit ownership count changes, but that does not assert when the engine reclaims memory."
    },
    {
      "id": "javascript-091.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The explicit ownership count changes, but that does not assert when the engine reclaims memory. WeakRef construction keeps its target alive through this job; later collection remains nondeterministic."
    },
    {
      "id": "javascript-091.q04",
      "level": "Debugging",
      "question": "Treating removal of one reference as proof that no other strong reference remains. How would you fix it?",
      "answer": "Inspect ownership paths and describe release separately from collection."
    },
    {
      "id": "javascript-091.q05",
      "level": "Senior",
      "question": "What constraints matter when using Garbage collection basics in production?",
      "answer": "Avoid claiming delete, null assignment or WeakRef proves immediate memory reclamation. The lab observes references and WeakRef’s same-job guarantee; it never fabricates heap counts or forces GC."
    },
    {
      "id": "javascript-091.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Identify strong ownership and avoid retaining unnecessary data. The lab observes references and WeakRef’s same-job guarantee; it never fabricates heap counts or forces GC."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
