import type { Lesson } from '../lesson-types';

async function example1() {
  const trace: string[] = [];
  const chain = Promise.resolve().then(() => trace.push('A')).then(() => trace.push('C'));
  queueMicrotask(() => trace.push('B')); await chain; return trace;
}

async function example2() {
  const trace: string[] = [];
  async function run() { trace.push('start'); await Promise.resolve(); trace.push('resume'); }
  const pending = run(); trace.push('outside'); await pending; trace.push('joined'); return trace;
}

export const lesson = {
  "id": "javascript-076",
  "description": "Queue order depends on the current task, the order reactions become ready and the microtask checkpoint.",
  "when": "Work through output questions by tracing the queues rather than guessing from indentation.",
  "avoid": "Avoid importing Node-specific nextTick rules into a browser explanation.",
  "tradeoff": "Registration order applies to ready microtasks, not to arbitrary network completion order.",
  "mistakes": [
    {
      "problem": "Placing an await continuation before synchronous code in the caller.",
      "fix": "Record the synchronous prefix first and enqueue the continuation at the await boundary."
    }
  ],
  "examples": [
    {
      "title": "Promise chain interleaves with another microtask",
      "expected": [
        "A",
        "B",
        "C"
      ],
      "explanation": "C is only enqueued after A finishes, behind the already queued B.",
      "runtime": "browser",
      "id": "javascript-076.e01",
      "run": example1
    },
    {
      "title": "Async function returns before its continuation",
      "expected": [
        "start",
        "outside",
        "resume",
        "joined"
      ],
      "explanation": "The caller proceeds until it awaits the returned promise.",
      "runtime": "browser",
      "id": "javascript-076.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-076.q01",
      "level": "Basic",
      "question": "What does Queue execution order mean here?",
      "answer": "Queue order depends on the current task, the order reactions become ready and the microtask checkpoint."
    },
    {
      "id": "javascript-076.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Promise chain interleaves with another microtask”. Why?",
      "answer": "[\"A\", \"B\", \"C\"] C is only enqueued after A finishes, behind the already queued B."
    },
    {
      "id": "javascript-076.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "C is only enqueued after A finishes, behind the already queued B. The caller proceeds until it awaits the returned promise."
    },
    {
      "id": "javascript-076.q04",
      "level": "Debugging",
      "question": "Placing an await continuation before synchronous code in the caller. How would you fix it?",
      "answer": "Record the synchronous prefix first and enqueue the continuation at the await boundary."
    },
    {
      "id": "javascript-076.q05",
      "level": "Senior",
      "question": "What constraints matter when using Queue execution order in production?",
      "answer": "Avoid importing Node-specific nextTick rules into a browser explanation. Registration order applies to ready microtasks, not to arbitrary network completion order."
    },
    {
      "id": "javascript-076.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Work through output questions by tracing the queues rather than guessing from indentation. Registration order applies to ready microtasks, not to arbitrary network completion order."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
