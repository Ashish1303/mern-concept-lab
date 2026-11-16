import type { Lesson, RunContext } from '../lesson-types';

async function example1(ctx: RunContext) {
  const trace = ['start'];
  const pending = ctx.delay(5).then(() => trace.push('timer'));
  trace.push('end'); await pending; return trace;
}

async function example2() {
  let value = 'pending'; const pending = Promise.resolve().then(() => { value = 'ready'; });
  const early = value; await pending; return [early, value];
}

export const lesson = {
  "id": "javascript-062",
  "description": "Synchronous code runs to completion in the current task; asynchronous callbacks resume later through scheduled work.",
  "when": "Keep the UI responsive while waiting for I/O or timers.",
  "avoid": "Avoid assuming asynchronous callbacks run immediately after scheduling.",
  "tradeoff": "Asynchronous waiting does not itself parallelize CPU-heavy JavaScript on the main thread.",
  "mistakes": [
    {
      "problem": "Reading a result before its asynchronous producer has completed.",
      "fix": "Await the promise or perform dependent work inside the continuation."
    }
  ],
  "examples": [
    {
      "title": "Synchronous prefix, asynchronous continuation",
      "expected": [
        "start",
        "end",
        "timer"
      ],
      "explanation": "Scheduling a timer does not interrupt the current synchronous task.",
      "runtime": "browser",
      "id": "javascript-062.e01",
      "run": example1
    },
    {
      "title": "Await the value before consuming it",
      "expected": [
        "pending",
        "ready"
      ],
      "explanation": "The early read precedes the microtask that writes ready.",
      "runtime": "browser",
      "id": "javascript-062.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-062.q01",
      "level": "Basic",
      "question": "What does Synchronous vs asynchronous mean here?",
      "answer": "Synchronous code runs to completion in the current task; asynchronous callbacks resume later through scheduled work."
    },
    {
      "id": "javascript-062.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Synchronous prefix, asynchronous continuation”. Why?",
      "answer": "[\"start\", \"end\", \"timer\"] Scheduling a timer does not interrupt the current synchronous task."
    },
    {
      "id": "javascript-062.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Scheduling a timer does not interrupt the current synchronous task. The early read precedes the microtask that writes ready."
    },
    {
      "id": "javascript-062.q04",
      "level": "Debugging",
      "question": "Reading a result before its asynchronous producer has completed. How would you fix it?",
      "answer": "Await the promise or perform dependent work inside the continuation."
    },
    {
      "id": "javascript-062.q05",
      "level": "Senior",
      "question": "What constraints matter when using Synchronous vs asynchronous in production?",
      "answer": "Avoid assuming asynchronous callbacks run immediately after scheduling. Asynchronous waiting does not itself parallelize CPU-heavy JavaScript on the main thread."
    },
    {
      "id": "javascript-062.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Keep the UI responsive while waiting for I/O or timers. Asynchronous waiting does not itself parallelize CPU-heavy JavaScript on the main thread."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
