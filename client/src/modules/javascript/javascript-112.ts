import type { Lesson } from '../lesson-types';
import { promiseAll } from '../helpers';

async function example1() {
  let first!: (value: number) => void; const delayed = new Promise<number>(resolve => { first = resolve; });
  const combined = promiseAll([delayed, 2]); first(1); return await combined;
}

async function example2() {
  try { await promiseAll([Promise.resolve(1), Promise.reject(new Error('failed'))]); return 'unexpected'; } catch (error) { return error instanceof Error ? error.message : 'unknown'; }
}

async function example3() {
  return await promiseAll<number>([]);
}

async function example4() {
  const thenable: PromiseLike<number> = { then: (resolve) => Promise.resolve(4).then(resolve) }; return await promiseAll<number>([thenable, 2]);
}

async function example5() {
  const iterable: Iterable<number> = { [Symbol.iterator]() { throw new Error('iteration failed'); } };
  try { await promiseAll(iterable); return 'unexpected'; } catch (error) { return error instanceof Error ? error.message : 'unknown'; }
}

export const lesson = {
  "id": "javascript-112",
  "description": "A Promise.all-like implementation must assimilate inputs, preserve input order, reject failures and handle empty iteration.",
  "when": "Practice promise coordination without claiming a complete native constructor/species polyfill.",
  "avoid": "Avoid an implementation that counts only fulfilled results and leaves rejection or empty input pending.",
  "tradeoff": "This implementation is O(n) coordination time/space and does not cancel or limit underlying work.",
  "mistakes": [
    {
      "problem": "Forgetting the empty-input branch or handling only actual Promise instances.",
      "fix": "Resolve empty arrays immediately and assimilate each value with Promise.resolve."
    }
  ],
  "examples": [
    {
      "title": "Preserve positions despite reverse completion",
      "expected": [
        1,
        2
      ],
      "explanation": "The helper assigns each result at the original input index.",
      "runtime": "browser",
      "id": "javascript-112.e01",
      "run": example1
    },
    {
      "title": "Propagate rejection",
      "expected": "failed",
      "explanation": "A rejection is forwarded to the combined promise.",
      "runtime": "browser",
      "id": "javascript-112.e02",
      "run": example2
    },
    {
      "title": "Resolve empty input",
      "expected": [],
      "explanation": "The helper resolves before installing any input handlers when remaining is zero.",
      "runtime": "browser",
      "id": "javascript-112.e03",
      "run": example3
    },
    {
      "title": "Assimilate a thenable",
      "expected": [
        4,
        2
      ],
      "explanation": "Promise.resolve accepts the thenable and the plain number through the same path.",
      "runtime": "browser",
      "id": "javascript-112.e04",
      "run": example4
    },
    {
      "title": "An iterator failure rejects the result",
      "expected": "iteration failed",
      "explanation": "Iteration runs inside the Promise executor, so an iterator throw rejects it; handlers are attached to already-yielded promises immediately.",
      "runtime": "browser",
      "id": "javascript-112.e05",
      "run": example5
    }
  ],
  "questions": [
    {
      "id": "javascript-112.q01",
      "level": "Basic",
      "question": "What does Implement Promise.all-like behavior mean here?",
      "answer": "A Promise.all-like implementation must assimilate inputs, preserve input order, reject failures and handle empty iteration."
    },
    {
      "id": "javascript-112.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Preserve positions despite reverse completion”. Why?",
      "answer": "[1, 2] The helper assigns each result at the original input index."
    },
    {
      "id": "javascript-112.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The helper assigns each result at the original input index. A rejection is forwarded to the combined promise."
    },
    {
      "id": "javascript-112.q04",
      "level": "Debugging",
      "question": "Forgetting the empty-input branch or handling only actual Promise instances. How would you fix it?",
      "answer": "Resolve empty arrays immediately and assimilate each value with Promise.resolve."
    },
    {
      "id": "javascript-112.q05",
      "level": "Senior",
      "question": "What constraints matter when using Implement Promise.all-like behavior in production?",
      "answer": "Avoid an implementation that counts only fulfilled results and leaves rejection or empty input pending. This implementation is O(n) coordination time/space and does not cancel or limit underlying work."
    },
    {
      "id": "javascript-112.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Practice promise coordination without claiming a complete native constructor/species polyfill. This implementation is O(n) coordination time/space and does not cancel or limit underlying work."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
