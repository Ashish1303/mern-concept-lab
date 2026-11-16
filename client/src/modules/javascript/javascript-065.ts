import type { Lesson } from '../lesson-types';

async function example1() {
  const trace: string[] = [];
  const pending = new Promise<number>(resolve => { trace.push('executor'); resolve(1); trace.push('after resolve'); });
  pending.then(value => trace.push(`then ${value}`)); trace.push('sync end'); await pending; await Promise.resolve(); return trace;
}

async function example2() {
  const promise = new Promise<number>((resolve, reject) => { resolve(1); resolve(2); reject(new Error('ignored')); }); return await promise;
}

async function example3() {
  return await Promise.reject(new Error('offline')).catch(() => 'fallback').then(value => value.toUpperCase());
}

async function example4() {
  const trace: string[] = []; const value = await Promise.resolve(7).finally(() => { trace.push('cleanup'); return 99; }); return { value, trace };
}

async function example5() {
  const thenable = { then(resolve: (value: number) => void) { resolve(9); } };
  return await Promise.resolve(thenable);
}

export const lesson = {
  "id": "javascript-065",
  "description": "A Promise represents one eventual settlement. Its executor runs synchronously; reactions run as microtasks.",
  "when": "Compose asynchronous success and failure without losing error propagation.",
  "avoid": "Avoid creating promises around values that are already promises without adding behavior.",
  "tradeoff": "Settled state is immutable, but promises do not automatically cancel the underlying work.",
  "mistakes": [
    {
      "problem": "Assuming resolve interrupts the executor or that finally changes a successful value.",
      "fix": "Treat resolve as settlement, return through then for transformations, and reserve finally for cleanup."
    }
  ],
  "examples": [
    {
      "title": "Executor is synchronous; reactions are deferred",
      "expected": [
        "executor",
        "after resolve",
        "sync end",
        "then 1"
      ],
      "explanation": "resolve does not stop the executor and then handlers wait for the current stack.",
      "runtime": "browser",
      "id": "javascript-065.e01",
      "run": example1
    },
    {
      "title": "Only the first settlement counts",
      "expected": 1,
      "explanation": "Later resolve/reject calls cannot replace the settled result.",
      "runtime": "browser",
      "id": "javascript-065.e02",
      "run": example2
    },
    {
      "title": "Catch recovers with a returned value",
      "expected": "FALLBACK",
      "explanation": "Returning from catch changes the chain to fulfillment.",
      "runtime": "browser",
      "id": "javascript-065.e03",
      "run": example3
    },
    {
      "title": "Finally preserves fulfillment",
      "expected": {
        "value": 7,
        "trace": [
          "cleanup"
        ]
      },
      "explanation": "A normally completing finally callback cannot replace the fulfillment value.",
      "runtime": "browser",
      "id": "javascript-065.e04",
      "run": example4
    },
    {
      "title": "Resolution adopts a thenable",
      "expected": 9,
      "explanation": "Promise resolution assimilates a thenable rather than fulfilling with the wrapper object.",
      "runtime": "browser",
      "id": "javascript-065.e05",
      "run": example5
    }
  ],
  "questions": [
    {
      "id": "javascript-065.q01",
      "level": "Basic",
      "question": "What does Promises mean here?",
      "answer": "A Promise represents one eventual settlement. Its executor runs synchronously; reactions run as microtasks."
    },
    {
      "id": "javascript-065.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Executor is synchronous; reactions are deferred”. Why?",
      "answer": "[\"executor\", \"after resolve\", \"sync end\", \"then 1\"] resolve does not stop the executor and then handlers wait for the current stack."
    },
    {
      "id": "javascript-065.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "resolve does not stop the executor and then handlers wait for the current stack. Later resolve/reject calls cannot replace the settled result."
    },
    {
      "id": "javascript-065.q04",
      "level": "Debugging",
      "question": "Assuming resolve interrupts the executor or that finally changes a successful value. How would you fix it?",
      "answer": "Treat resolve as settlement, return through then for transformations, and reserve finally for cleanup."
    },
    {
      "id": "javascript-065.q05",
      "level": "Senior",
      "question": "What constraints matter when using Promises in production?",
      "answer": "Avoid creating promises around values that are already promises without adding behavior. Settled state is immutable, but promises do not automatically cancel the underlying work."
    },
    {
      "id": "javascript-065.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Compose asynchronous success and failure without losing error propagation. Settled state is immutable, but promises do not automatically cancel the underlying work."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
