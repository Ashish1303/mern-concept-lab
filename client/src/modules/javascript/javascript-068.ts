import type { Lesson, RunContext } from '../lesson-types';

async function example1() {
  let finishA!: (value: string) => void; let finishB!: (value: string) => void;
  const a = new Promise<string>(resolve => { finishA = resolve; }); const b = new Promise<string>(resolve => { finishB = resolve; });
  const combined = Promise.all([a, b]); finishB('B'); finishA('A'); return await combined;
}

async function example2() {
  try { await Promise.all([Promise.resolve(1), Promise.reject(new Error('required failed'))]); return 'unexpected'; } catch (error) { return error instanceof Error ? error.message : 'unknown'; }
}

async function example3() {
  return await Promise.all([1, Promise.resolve(2), 3]);
}

async function example4() {
  return await Promise.all([]);
}

async function example5(ctx: RunContext) {
  const trace: string[] = [];
  const slow = ctx.delay(10).then(() => trace.push('slow finished'));
  await Promise.all([Promise.reject(new Error('fail')), slow]).catch(() => trace.push('rejected'));
  await slow; return trace;
}

export const lesson = {
  "id": "javascript-068",
  "description": "Promise.all fulfills with results in input order when every input fulfills and rejects on the first observed rejection.",
  "when": "Wait for independent operations when every result is required.",
  "avoid": "Avoid all when partial success must be preserved as individual outcomes.",
  "tradeoff": "Results preserve input order, not completion order; all has no built-in concurrency limit.",
  "mistakes": [
    {
      "problem": "Assuming rejection cancels the other operations.",
      "fix": "Add explicit cancellation when needed or await allSettled for per-operation outcomes."
    }
  ],
  "examples": [
    {
      "title": "Input order survives opposite completion order",
      "expected": [
        "A",
        "B"
      ],
      "explanation": "The result index is tied to the input position.",
      "runtime": "browser",
      "id": "javascript-068.e01",
      "run": example1
    },
    {
      "title": "Reject when any required input fails",
      "expected": "required failed",
      "explanation": "A single rejection rejects the combined promise.",
      "runtime": "browser",
      "id": "javascript-068.e02",
      "run": example2
    },
    {
      "title": "Non-promise inputs are accepted",
      "expected": [
        1,
        2,
        3
      ],
      "explanation": "Each input is assimilated through promise resolution.",
      "runtime": "browser",
      "id": "javascript-068.e03",
      "run": example3
    },
    {
      "title": "Empty input fulfills with an empty array",
      "expected": [],
      "explanation": "With no required operations there are no pending outcomes.",
      "runtime": "browser",
      "id": "javascript-068.e04",
      "run": example4
    },
    {
      "title": "Rejected all does not cancel another task",
      "expected": [
        "rejected",
        "slow finished"
      ],
      "explanation": "The remaining real timer continues even after the combined promise rejects.",
      "runtime": "browser",
      "id": "javascript-068.e05",
      "run": example5
    }
  ],
  "questions": [
    {
      "id": "javascript-068.q01",
      "level": "Basic",
      "question": "What does Promise.all mean here?",
      "answer": "Promise.all fulfills with results in input order when every input fulfills and rejects on the first observed rejection."
    },
    {
      "id": "javascript-068.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Input order survives opposite completion order”. Why?",
      "answer": "[\"A\", \"B\"] The result index is tied to the input position."
    },
    {
      "id": "javascript-068.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The result index is tied to the input position. A single rejection rejects the combined promise."
    },
    {
      "id": "javascript-068.q04",
      "level": "Debugging",
      "question": "Assuming rejection cancels the other operations. How would you fix it?",
      "answer": "Add explicit cancellation when needed or await allSettled for per-operation outcomes."
    },
    {
      "id": "javascript-068.q05",
      "level": "Senior",
      "question": "What constraints matter when using Promise.all in production?",
      "answer": "Avoid all when partial success must be preserved as individual outcomes. Results preserve input order, not completion order; all has no built-in concurrency limit."
    },
    {
      "id": "javascript-068.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Wait for independent operations when every result is required. Results preserve input order, not completion order; all has no built-in concurrency limit."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
