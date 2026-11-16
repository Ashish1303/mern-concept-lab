import type { Lesson } from '../lesson-types';

function example1() {
  let produced = 0;
  function* sequence() { produced++; yield 1; produced++; yield 2; }
  const iterator = sequence(); const before = produced; const first = iterator.next();
  return { before, first, produced, remaining: [...iterator] };
}

function example2() {
  const trace: string[] = [];
  function* sequence() { try { yield 1; yield 2; } finally { trace.push('closed'); } }
  for (const value of sequence()) { trace.push(String(value)); break; }
  return trace;
}

export const lesson = {
  "id": "javascript-042",
  "description": "Generators suspend execution at yield and implement the iterator protocol; iteration requests values lazily.",
  "when": "Produce values incrementally or model a controlled sequence.",
  "avoid": "Avoid assuming generator creation executes its body immediately.",
  "tradeoff": "Laziness avoids materializing a full list, but each next resumes generator execution.",
  "mistakes": [
    {
      "problem": "Failing to close an iterator whose finally block owns cleanup.",
      "fix": "Use for-of or call return when stopping iteration early."
    }
  ],
  "examples": [
    {
      "title": "Lazy next calls",
      "expected": {
        "before": 0,
        "first": {
          "value": 1,
          "done": false
        },
        "produced": 1,
        "remaining": [
          2
        ]
      },
      "explanation": "The body starts on next, not when the generator object is created.",
      "runtime": "browser",
      "id": "javascript-042.e01",
      "run": example1
    },
    {
      "title": "Early loop break closes a generator",
      "expected": [
        "1",
        "closed"
      ],
      "explanation": "for-of invokes return on an early break, which executes finally.",
      "runtime": "browser",
      "id": "javascript-042.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-042.q01",
      "level": "Basic",
      "question": "What does Generators and iterators mean here?",
      "answer": "Generators suspend execution at yield and implement the iterator protocol; iteration requests values lazily."
    },
    {
      "id": "javascript-042.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Lazy next calls”. Why?",
      "answer": "{\"before\": 0, \"first\": {\"value\": 1, \"done\": false}, \"produced\": 1, \"remaining\": [2]} The body starts on next, not when the generator object is created."
    },
    {
      "id": "javascript-042.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The body starts on next, not when the generator object is created. for-of invokes return on an early break, which executes finally."
    },
    {
      "id": "javascript-042.q04",
      "level": "Debugging",
      "question": "Failing to close an iterator whose finally block owns cleanup. How would you fix it?",
      "answer": "Use for-of or call return when stopping iteration early."
    },
    {
      "id": "javascript-042.q05",
      "level": "Senior",
      "question": "What constraints matter when using Generators and iterators in production?",
      "answer": "Avoid assuming generator creation executes its body immediately. Laziness avoids materializing a full list, but each next resumes generator execution."
    },
    {
      "id": "javascript-042.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Produce values incrementally or model a controlled sequence. Laziness avoids materializing a full list, but each next resumes generator execution."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
