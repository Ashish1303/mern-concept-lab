import type { Lesson } from '../lesson-types';

async function example1() {
  const trace: string[] = [];
  await new Promise<void>(resolve => { queueMicrotask(() => { trace.push('load'); queueMicrotask(() => { trace.push('transform'); queueMicrotask(() => { trace.push('save'); resolve(); }); }); }); });
  return trace;
}

async function example2() {
  const trace: string[] = [];
  async function stage(name: string) { await Promise.resolve(); trace.push(name); }
  await stage('load'); await stage('transform'); await stage('save'); return trace;
}

export const lesson = {
  "id": "javascript-064",
  "description": "Nested asynchronous callbacks can obscure sequencing, error propagation and cleanup. Promises make those contracts composable.",
  "when": "Recognize callback sequencing and refactor dependent work with promises.",
  "avoid": "Avoid deeply nested callbacks with separate unchecked error paths.",
  "tradeoff": "Promises improve composition without making dependent operations concurrent.",
  "mistakes": [
    {
      "problem": "Starting a dependent stage before its callback supplies a result.",
      "fix": "Represent completion as a promise and await each dependency explicitly."
    }
  ],
  "examples": [
    {
      "title": "Nested callback stages execute in dependency order",
      "expected": [
        "load",
        "transform",
        "save"
      ],
      "explanation": "Each callback schedules the next only after its own stage has run.",
      "runtime": "browser",
      "id": "javascript-064.e01",
      "run": example1
    },
    {
      "title": "Flatten dependent stages with await",
      "expected": [
        "load",
        "transform",
        "save"
      ],
      "explanation": "Sequential await preserves dependencies while flattening the code structure.",
      "runtime": "browser",
      "id": "javascript-064.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-064.q01",
      "level": "Basic",
      "question": "What does Callback hell mean here?",
      "answer": "Nested asynchronous callbacks can obscure sequencing, error propagation and cleanup. Promises make those contracts composable."
    },
    {
      "id": "javascript-064.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Nested callback stages execute in dependency order”. Why?",
      "answer": "[\"load\", \"transform\", \"save\"] Each callback schedules the next only after its own stage has run."
    },
    {
      "id": "javascript-064.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Each callback schedules the next only after its own stage has run. Sequential await preserves dependencies while flattening the code structure."
    },
    {
      "id": "javascript-064.q04",
      "level": "Debugging",
      "question": "Starting a dependent stage before its callback supplies a result. How would you fix it?",
      "answer": "Represent completion as a promise and await each dependency explicitly."
    },
    {
      "id": "javascript-064.q05",
      "level": "Senior",
      "question": "What constraints matter when using Callback hell in production?",
      "answer": "Avoid deeply nested callbacks with separate unchecked error paths. Promises improve composition without making dependent operations concurrent."
    },
    {
      "id": "javascript-064.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Recognize callback sequencing and refactor dependent work with promises. Promises improve composition without making dependent operations concurrent."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
