import type { Lesson, RunContext } from '../lesson-types';

async function example1(ctx: RunContext) {
  const trace = ['sync']; const timer = ctx.delay(5).then(() => trace.push('timer'));
  Promise.resolve().then(() => trace.push('promise')); trace.push('end'); await timer; return trace;
}

async function example2(ctx: RunContext) {
  const trace: string[] = [];
  queueMicrotask(() => { trace.push('first'); queueMicrotask(() => trace.push('nested')); });
  queueMicrotask(() => trace.push('second')); await ctx.delay(5); return trace;
}

async function example3() {
  const trace: string[] = [];
  async function work() { trace.push('before await'); await 0; trace.push('after await'); }
  const pending = work(); trace.push('caller'); await pending; return trace;
}

async function example4(ctx: RunContext) {
  const trace: string[] = [];
  await new Promise<void>(resolve => {
   const first = setTimeout(() => { trace.push('timer A'); queueMicrotask(() => trace.push('microtask')); }, 0);
   const second = setTimeout(() => { trace.push('timer B'); resolve(); }, 0);
   ctx.cleanup(() => { clearTimeout(first); clearTimeout(second); resolve(); });
  }); return trace;
}

async function example5() {
  const trace: string[] = []; Promise.resolve().then(() => trace.push('reaction'));
  let sum = 0; for (let index = 0; index <= 100; index++) sum += index;
  trace.push(`sum ${sum}`); await Promise.resolve(); return trace;
}

export const lesson = {
  "id": "javascript-073",
  "description": "The browser event loop runs tasks to completion and drains queued microtasks at checkpoints before the next task.",
  "when": "Predict promise, await and timer ordering in a documented browser context.",
  "avoid": "Avoid using zero-delay timers as exact-time guarantees or recursively flooding the microtask queue.",
  "tradeoff": "Browser ordering is distinct from Node-specific phases; rendering timing is not inferred from these traces.",
  "mistakes": [
    {
      "problem": "Assuming a timer runs before pending promise reactions.",
      "fix": "Trace synchronous work first, then the microtask checkpoint, then later tasks."
    }
  ],
  "examples": [
    {
      "title": "Synchronous work, promise reaction, timer",
      "expected": [
        "sync",
        "end",
        "promise",
        "timer"
      ],
      "explanation": "The synchronous prefix finishes before microtasks and timer continuation.",
      "runtime": "browser",
      "id": "javascript-073.e01",
      "run": example1
    },
    {
      "title": "Nested microtasks join the same checkpoint",
      "expected": [
        "first",
        "second",
        "nested"
      ],
      "explanation": "The nested microtask is appended behind the already queued second microtask.",
      "runtime": "browser",
      "id": "javascript-073.e02",
      "run": example2
    },
    {
      "title": "await schedules a continuation",
      "expected": [
        "before await",
        "caller",
        "after await"
      ],
      "explanation": "Even awaiting a plain value suspends the remainder of the async function.",
      "runtime": "browser",
      "id": "javascript-073.e03",
      "run": example3
    },
    {
      "title": "Microtasks between timer tasks",
      "expected": [
        "timer A",
        "microtask",
        "timer B"
      ],
      "explanation": "The microtask queued by timer A runs before the next eligible timer task.",
      "runtime": "browser",
      "id": "javascript-073.e04",
      "run": example4
    },
    {
      "title": "Bounded synchronous work runs before reactions",
      "expected": [
        "sum 5050",
        "reaction"
      ],
      "explanation": "A promise reaction cannot interrupt a synchronous bounded loop.",
      "runtime": "browser",
      "id": "javascript-073.e05",
      "run": example5
    }
  ],
  "questions": [
    {
      "id": "javascript-073.q01",
      "level": "Basic",
      "question": "What does Event loop mean here?",
      "answer": "The browser event loop runs tasks to completion and drains queued microtasks at checkpoints before the next task."
    },
    {
      "id": "javascript-073.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Synchronous work, promise reaction, timer”. Why?",
      "answer": "[\"sync\", \"end\", \"promise\", \"timer\"] The synchronous prefix finishes before microtasks and timer continuation."
    },
    {
      "id": "javascript-073.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The synchronous prefix finishes before microtasks and timer continuation. The nested microtask is appended behind the already queued second microtask."
    },
    {
      "id": "javascript-073.q04",
      "level": "Debugging",
      "question": "Assuming a timer runs before pending promise reactions. How would you fix it?",
      "answer": "Trace synchronous work first, then the microtask checkpoint, then later tasks."
    },
    {
      "id": "javascript-073.q05",
      "level": "Senior",
      "question": "What constraints matter when using Event loop in production?",
      "answer": "Avoid using zero-delay timers as exact-time guarantees or recursively flooding the microtask queue. Browser ordering is distinct from Node-specific phases; rendering timing is not inferred from these traces."
    },
    {
      "id": "javascript-073.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Predict promise, await and timer ordering in a documented browser context. Browser ordering is distinct from Node-specific phases; rendering timing is not inferred from these traces."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
