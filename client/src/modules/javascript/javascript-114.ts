import type { Lesson, RunContext } from '../lesson-types';

async function example1() {
  // eslint-disable-next-line no-var -- Intentional language-semantics example; compare the result with the corrected alternative.
  const tasks: Promise<number>[] = []; for (var index = 0; index < 3; index++) tasks.push(Promise.resolve().then(() => index)); return await Promise.all(tasks);
}

async function example2() {
  const tasks: Promise<number>[] = []; for (let index = 0; index < 3; index++) tasks.push(Promise.resolve().then(() => index)); return await Promise.all(tasks);
}

async function example3() {
  let value = 'before'; const pending = Promise.resolve().then(() => value); value = 'after'; return await pending;
}

async function example4() {
  const output: number[] = []; const work: Promise<void>[] = [];
  [1, 2].forEach(value => { work.push(Promise.resolve().then(() => { output.push(value); })); });
  const early = [...output]; await Promise.all(work); return { early, joined: output };
}

async function example5(ctx: RunContext) {
  const trace: string[] = []; function inner() { trace.push('inner'); queueMicrotask(() => trace.push('microtask')); }
  trace.push('outer'); inner(); trace.push('after inner'); await ctx.delay(5); trace.push('timer'); return trace;
}

export const lesson = {
  "id": "javascript-114",
  "description": "Output prediction combines lexical bindings, synchronous execution and queued continuations.",
  "when": "Trace real callbacks and compare an explicit prediction with observed execution.",
  "avoid": "Avoid memorizing one output pattern without identifying when bindings are read.",
  "tradeoff": "These bounded browser experiments do not imply Node phase ordering or exact timer latency.",
  "mistakes": [
    {
      "problem": "Assuming each var-loop callback captures a separate value or that forEach waits for async callbacks.",
      "fix": "Use per-iteration bindings and join returned promises when the caller depends on completion."
    }
  ],
  "examples": [
    {
      "title": "var loop read after microtasks",
      "expected": [
        3,
        3,
        3
      ],
      "explanation": "Every reaction reads the shared binding after the synchronous loop finishes.",
      "runtime": "browser",
      "id": "javascript-114.e01",
      "run": example1
    },
    {
      "title": "let loop isolates the captured value",
      "expected": [
        0,
        1,
        2
      ],
      "explanation": "Each iteration has a separate lexical binding.",
      "runtime": "browser",
      "id": "javascript-114.e02",
      "run": example2
    },
    {
      "title": "Mutation before a queued read",
      "expected": "after",
      "explanation": "The closure reads when the reaction runs, after the synchronous mutation.",
      "runtime": "browser",
      "id": "javascript-114.e03",
      "run": example3
    },
    {
      "title": "Async forEach returns before work completes",
      "expected": {
        "early": [],
        "joined": [
          1,
          2
        ]
      },
      "explanation": "forEach itself does not join promises; explicit collection and Promise.all do.",
      "runtime": "browser",
      "id": "javascript-114.e04",
      "run": example4
    },
    {
      "title": "Nested call, microtask and timer trace",
      "expected": [
        "outer",
        "inner",
        "after inner",
        "microtask",
        "timer"
      ],
      "explanation": "The stack completes before its queued microtask and later timer continuation.",
      "runtime": "browser",
      "id": "javascript-114.e05",
      "run": example5
    }
  ],
  "questions": [
    {
      "id": "javascript-114.q01",
      "level": "Basic",
      "question": "What does Output prediction using closures and event loop mean here?",
      "answer": "Output prediction combines lexical bindings, synchronous execution and queued continuations."
    },
    {
      "id": "javascript-114.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “var loop read after microtasks”. Why?",
      "answer": "[3, 3, 3] Every reaction reads the shared binding after the synchronous loop finishes."
    },
    {
      "id": "javascript-114.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Every reaction reads the shared binding after the synchronous loop finishes. Each iteration has a separate lexical binding."
    },
    {
      "id": "javascript-114.q04",
      "level": "Debugging",
      "question": "Assuming each var-loop callback captures a separate value or that forEach waits for async callbacks. How would you fix it?",
      "answer": "Use per-iteration bindings and join returned promises when the caller depends on completion."
    },
    {
      "id": "javascript-114.q05",
      "level": "Senior",
      "question": "What constraints matter when using Output prediction using closures and event loop in production?",
      "answer": "Avoid memorizing one output pattern without identifying when bindings are read. These bounded browser experiments do not imply Node phase ordering or exact timer latency."
    },
    {
      "id": "javascript-114.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Trace real callbacks and compare an explicit prediction with observed execution. These bounded browser experiments do not imply Node phase ordering or exact timer latency."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
