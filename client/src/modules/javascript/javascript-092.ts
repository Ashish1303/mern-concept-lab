import type { Lesson, RunContext } from '../lesson-types';

function example1(ctx: RunContext) {
  const target = new EventTarget(); let calls = 0; const listener = () => calls++;
  target.addEventListener('tick', listener); ctx.cleanup(() => target.removeEventListener('tick', listener));
  target.dispatchEvent(new Event('tick')); const afterOwnerEndedWithoutCleanup = calls;
  target.removeEventListener('tick', listener); target.dispatchEvent(new Event('tick'));
  return { afterOwnerEndedWithoutCleanup, afterCleanup: calls };
}

function example2() {
  const cache = new Map<number, { payload: number[] }>(); for (let index = 0; index < 10; index++) cache.set(index, { payload: [index] });
  const retained = cache.size; cache.clear(); return { retained, afterCleanup: cache.size };
}

export const lesson = {
  "id": "javascript-092",
  "description": "A memory leak is unintended retention of objects or ongoing work beyond their useful owner lifetime.",
  "when": "Pair subscriptions, timers and caches with explicit ownership and disposal.",
  "avoid": "Avoid unsafe unbounded leak experiments on the main application.",
  "tradeoff": "This bounded experiment proves callbacks and entries remain retained, not a precise engine heap-size change.",
  "mistakes": [
    {
      "problem": "Leaving callbacks registered after a logical owner has ended.",
      "fix": "Remove the exact listener identity and bound/cache-clear retained entries."
    }
  ],
  "examples": [
    {
      "title": "Orphaned callback and explicit removal",
      "expected": {
        "afterOwnerEndedWithoutCleanup": 1,
        "afterCleanup": 1
      },
      "explanation": "The registered callback still executes until the exact function is removed.",
      "runtime": "browser",
      "id": "javascript-092.e01",
      "run": example1
    },
    {
      "title": "Bounded cache retention and release",
      "expected": {
        "retained": 10,
        "afterCleanup": 0
      },
      "explanation": "The real Map retains ten entries until explicit cleanup; this does not measure GC timing.",
      "runtime": "browser",
      "id": "javascript-092.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-092.q01",
      "level": "Basic",
      "question": "What does Memory leaks mean here?",
      "answer": "A memory leak is unintended retention of objects or ongoing work beyond their useful owner lifetime."
    },
    {
      "id": "javascript-092.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Orphaned callback and explicit removal”. Why?",
      "answer": "{\"afterOwnerEndedWithoutCleanup\": 1, \"afterCleanup\": 1} The registered callback still executes until the exact function is removed."
    },
    {
      "id": "javascript-092.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The registered callback still executes until the exact function is removed. The real Map retains ten entries until explicit cleanup; this does not measure GC timing."
    },
    {
      "id": "javascript-092.q04",
      "level": "Debugging",
      "question": "Leaving callbacks registered after a logical owner has ended. How would you fix it?",
      "answer": "Remove the exact listener identity and bound/cache-clear retained entries."
    },
    {
      "id": "javascript-092.q05",
      "level": "Senior",
      "question": "What constraints matter when using Memory leaks in production?",
      "answer": "Avoid unsafe unbounded leak experiments on the main application. This bounded experiment proves callbacks and entries remain retained, not a precise engine heap-size change."
    },
    {
      "id": "javascript-092.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Pair subscriptions, timers and caches with explicit ownership and disposal. This bounded experiment proves callbacks and entries remain retained, not a precise engine heap-size change."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
