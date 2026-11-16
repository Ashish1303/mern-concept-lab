import type { Lesson, RunContext } from '../lesson-types';

async function example1() {
  return await Promise.resolve(2).then(value => value * 3).then(value => value + 1);
}

async function example2() {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Intentional language-semantics example; compare the result with the corrected alternative.
  const wrong = await Promise.resolve(2).then(value => { value * 3; });
  const fixed = await Promise.resolve(2).then(value => value * 3); return [String(wrong), fixed];
}

async function example3() {
  return await Promise.resolve(1).then(() => { throw new Error('bad'); }).catch(error => error instanceof Error ? error.message : 'unknown');
}

async function example4(ctx: RunContext) {
  return await Promise.resolve(3).then(async value => { await ctx.delay(5); return value * 2; }).then(value => value + 1);
}

async function example5() {
  try { await Promise.resolve(7).finally(() => { throw new Error('cleanup failed'); }); return 'unexpected'; } catch (error) { return error instanceof Error ? error.message : 'unknown'; }
}

export const lesson = {
  "id": "javascript-066",
  "description": "Each then returns a new promise whose result depends on the handler’s return value, returned promise or thrown error.",
  "when": "Build dependent asynchronous transformations with one error path.",
  "avoid": "Avoid starting detached promises inside handlers when later stages depend on them.",
  "tradeoff": "A returned promise is flattened into the chain; finally is for cleanup and catch can recover.",
  "mistakes": [
    {
      "problem": "Failing to return a value or promise from a then handler.",
      "fix": "Return the dependent result so the next handler waits for it."
    }
  ],
  "examples": [
    {
      "title": "Transform through a chain",
      "expected": 7,
      "explanation": "Each returned value becomes the next handler’s input.",
      "runtime": "browser",
      "id": "javascript-066.e01",
      "run": example1
    },
    {
      "title": "Missing return versus returned value",
      "expected": [
        "undefined",
        6
      ],
      "explanation": "A block-bodied callback needs an explicit return.",
      "runtime": "browser",
      "id": "javascript-066.e02",
      "run": example2
    },
    {
      "title": "Throw propagates to catch",
      "expected": "bad",
      "explanation": "A synchronous throw inside then becomes rejection of the next promise.",
      "runtime": "browser",
      "id": "javascript-066.e03",
      "run": example3
    },
    {
      "title": "Returned promise is adopted",
      "expected": 7,
      "explanation": "The final handler waits for the promise returned by the asynchronous handler.",
      "runtime": "browser",
      "id": "javascript-066.e04",
      "run": example4
    },
    {
      "title": "Throwing in finally replaces the previous result",
      "expected": "cleanup failed",
      "explanation": "A failing cleanup rejects the chain even when the earlier value was fulfilled.",
      "runtime": "browser",
      "id": "javascript-066.e05",
      "run": example5
    }
  ],
  "questions": [
    {
      "id": "javascript-066.q01",
      "level": "Basic",
      "question": "What does Promise chaining mean here?",
      "answer": "Each then returns a new promise whose result depends on the handler’s return value, returned promise or thrown error."
    },
    {
      "id": "javascript-066.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Transform through a chain”. Why?",
      "answer": "7 Each returned value becomes the next handler’s input."
    },
    {
      "id": "javascript-066.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Each returned value becomes the next handler’s input. A block-bodied callback needs an explicit return."
    },
    {
      "id": "javascript-066.q04",
      "level": "Debugging",
      "question": "Failing to return a value or promise from a then handler. How would you fix it?",
      "answer": "Return the dependent result so the next handler waits for it."
    },
    {
      "id": "javascript-066.q05",
      "level": "Senior",
      "question": "What constraints matter when using Promise chaining in production?",
      "answer": "Avoid starting detached promises inside handlers when later stages depend on them. A returned promise is flattened into the chain; finally is for cleanup and catch can recover."
    },
    {
      "id": "javascript-066.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Build dependent asynchronous transformations with one error path. A returned promise is flattened into the chain; finally is for cleanup and catch can recover."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
