import type { Lesson } from '../lesson-types';

async function example1() {
  async function load() { return 4; }
  const pending = load(); return [pending instanceof Promise, await pending];
}

async function example2() {
  async function fail() { throw new Error('failed'); }
  try { await fail(); return 'unexpected'; } catch (error) { return error instanceof Error ? error.message : 'unknown'; }
}

export const lesson = {
  "id": "javascript-067",
  "description": "An async function always returns a promise; await pauses that function until the awaited value settles.",
  "when": "Write dependent asynchronous operations with readable try/catch handling.",
  "avoid": "Avoid serial awaiting when independent work can start together.",
  "tradeoff": "await suspends the async function, not the whole browser thread.",
  "mistakes": [
    {
      "problem": "Expecting a thrown error in an async function to be a synchronous caller exception.",
      "fix": "Await the returned promise inside try/catch or attach a rejection handler."
    }
  ],
  "examples": [
    {
      "title": "Async return and await",
      "expected": [
        true,
        4
      ],
      "explanation": "A plain returned number is wrapped by the async function’s promise.",
      "runtime": "browser",
      "id": "javascript-067.e01",
      "run": example1
    },
    {
      "title": "Async throw is a rejected promise",
      "expected": "failed",
      "explanation": "The rejection reaches the awaiting catch.",
      "runtime": "browser",
      "id": "javascript-067.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-067.q01",
      "level": "Basic",
      "question": "What does async/await mean here?",
      "answer": "An async function always returns a promise; await pauses that function until the awaited value settles."
    },
    {
      "id": "javascript-067.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Async return and await”. Why?",
      "answer": "[true, 4] A plain returned number is wrapped by the async function’s promise."
    },
    {
      "id": "javascript-067.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "A plain returned number is wrapped by the async function’s promise. The rejection reaches the awaiting catch."
    },
    {
      "id": "javascript-067.q04",
      "level": "Debugging",
      "question": "Expecting a thrown error in an async function to be a synchronous caller exception. How would you fix it?",
      "answer": "Await the returned promise inside try/catch or attach a rejection handler."
    },
    {
      "id": "javascript-067.q05",
      "level": "Senior",
      "question": "What constraints matter when using async/await in production?",
      "answer": "Avoid serial awaiting when independent work can start together. await suspends the async function, not the whole browser thread."
    },
    {
      "id": "javascript-067.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Write dependent asynchronous operations with readable try/catch handling. await suspends the async function, not the whole browser thread."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
