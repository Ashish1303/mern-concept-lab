import type { Lesson, RunContext } from '../lesson-types';

async function example1(ctx: RunContext) {
  const trace: string[] = []; Promise.resolve().then(() => trace.push('promise')); queueMicrotask(() => trace.push('queued')); await ctx.delay(5); return trace;
}

async function example2(ctx: RunContext) {
  const trace: string[] = []; queueMicrotask(() => { trace.push('outer'); queueMicrotask(() => trace.push('inner')); });
  await ctx.delay(5); trace.push('timer continuation'); return trace;
}

export const lesson = {
  "id": "javascript-074",
  "description": "Promise reactions and queueMicrotask callbacks share microtask ordering; timers schedule later tasks.",
  "when": "Reason about deferred consistency work that must finish before the next task.",
  "avoid": "Avoid unbounded recursive microtask scheduling, which can starve rendering and tasks.",
  "tradeoff": "Microtasks are not an alternative worker thread.",
  "mistakes": [
    {
      "problem": "Believing a nested microtask must wait for the next timer.",
      "fix": "Drain the current microtask queue, including newly appended callbacks, before the next task."
    }
  ],
  "examples": [
    {
      "title": "Registration order across promise and queueMicrotask",
      "expected": [
        "promise",
        "queued"
      ],
      "explanation": "The callbacks run in the order they entered the microtask queue.",
      "runtime": "browser",
      "id": "javascript-074.e01",
      "run": example1
    },
    {
      "title": "Nested microtasks drain before a timer",
      "expected": [
        "outer",
        "inner",
        "timer continuation"
      ],
      "explanation": "The inner callback runs in the current checkpoint rather than after the timer.",
      "runtime": "browser",
      "id": "javascript-074.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-074.q01",
      "level": "Basic",
      "question": "What does Microtasks and macrotasks mean here?",
      "answer": "Promise reactions and queueMicrotask callbacks share microtask ordering; timers schedule later tasks."
    },
    {
      "id": "javascript-074.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Registration order across promise and queueMicrotask”. Why?",
      "answer": "[\"promise\", \"queued\"] The callbacks run in the order they entered the microtask queue."
    },
    {
      "id": "javascript-074.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The callbacks run in the order they entered the microtask queue. The inner callback runs in the current checkpoint rather than after the timer."
    },
    {
      "id": "javascript-074.q04",
      "level": "Debugging",
      "question": "Believing a nested microtask must wait for the next timer. How would you fix it?",
      "answer": "Drain the current microtask queue, including newly appended callbacks, before the next task."
    },
    {
      "id": "javascript-074.q05",
      "level": "Senior",
      "question": "What constraints matter when using Microtasks and macrotasks in production?",
      "answer": "Avoid unbounded recursive microtask scheduling, which can starve rendering and tasks. Microtasks are not an alternative worker thread."
    },
    {
      "id": "javascript-074.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Reason about deferred consistency work that must finish before the next task. Microtasks are not an alternative worker thread."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
