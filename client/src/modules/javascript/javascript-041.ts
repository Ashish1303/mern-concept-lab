import type { Lesson } from '../lesson-types';

function example1() {
  let calls = 0; const cache = new Map<number, number>();
  const square = (value: number) => { if (cache.has(value)) return cache.get(value)!; calls++; const result = value * value; cache.set(value, result); return result; };
  return { values: [square(3), square(3), square(4)], calls };
}

function example2() {
  let wrongCalls = 0; let fixedCalls = 0;
  const wrong = new Map<number, number>(); const fixed = new Map<number, number>();
  for (let i = 0; i < 2; i++) { if (!wrong.get(0)) { wrongCalls++; wrong.set(0, 0); } if (!fixed.has(0)) { fixedCalls++; fixed.set(0, 0); } }
  return { wrongCalls, fixedCalls };
}

export const lesson = {
  "id": "javascript-041",
  "description": "Memoization reuses a function result for a previously seen key, trading memory for repeated-work savings.",
  "when": "Cache expensive pure computations with a bounded key space.",
  "avoid": "Avoid caching mutable, time-dependent or unbounded inputs without an eviction policy.",
  "tradeoff": "Cache key design must reflect every dependency; otherwise cached answers become stale.",
  "mistakes": [
    {
      "problem": "Testing a cached result for truthiness and recomputing valid zero values.",
      "fix": "Use Map.has to distinguish a missing entry from a falsy cached result."
    }
  ],
  "examples": [
    {
      "title": "Repeated inputs skip computation",
      "expected": {
        "values": [
          9,
          9,
          16
        ],
        "calls": 2
      },
      "explanation": "The second call for 3 reads the existing key.",
      "runtime": "browser",
      "id": "javascript-041.e01",
      "run": example1
    },
    {
      "title": "Falsy cache bug and has fix",
      "expected": {
        "wrongCalls": 2,
        "fixedCalls": 1
      },
      "explanation": "Zero is a valid cache hit even though it is falsy.",
      "runtime": "browser",
      "id": "javascript-041.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-041.q01",
      "level": "Basic",
      "question": "What does Memoization mean here?",
      "answer": "Memoization reuses a function result for a previously seen key, trading memory for repeated-work savings."
    },
    {
      "id": "javascript-041.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Repeated inputs skip computation”. Why?",
      "answer": "{\"values\": [9, 9, 16], \"calls\": 2} The second call for 3 reads the existing key."
    },
    {
      "id": "javascript-041.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The second call for 3 reads the existing key. Zero is a valid cache hit even though it is falsy."
    },
    {
      "id": "javascript-041.q04",
      "level": "Debugging",
      "question": "Testing a cached result for truthiness and recomputing valid zero values. How would you fix it?",
      "answer": "Use Map.has to distinguish a missing entry from a falsy cached result."
    },
    {
      "id": "javascript-041.q05",
      "level": "Senior",
      "question": "What constraints matter when using Memoization in production?",
      "answer": "Avoid caching mutable, time-dependent or unbounded inputs without an eviction policy. Cache key design must reflect every dependency; otherwise cached answers become stale."
    },
    {
      "id": "javascript-041.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Cache expensive pure computations with a bounded key space. Cache key design must reflect every dependency; otherwise cached answers become stale."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
