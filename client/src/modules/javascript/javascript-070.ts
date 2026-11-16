import type { Lesson, RunContext } from '../lesson-types';

async function example1() {
  let finish!: (value: string) => void; const pending = new Promise<string>(resolve => { finish = resolve; });
  const result = Promise.race([pending, Promise.resolve('ready')]); const value = await result; finish('late'); return value;
}

async function example2(ctx: RunContext) {
  try { await Promise.race([Promise.reject(new Error('early failure')), ctx.delay(5).then(() => 'later success')]); return 'unexpected'; } catch (error) { return error instanceof Error ? error.message : 'unknown'; }
}

async function example3() {
  return await Promise.race([Promise.resolve('first'), 'second']);
}

async function example4(ctx: RunContext) {
  let settled = false; Promise.race([]).then(() => { settled = true; }); await ctx.delay(5); return { settled };
}

async function example5(ctx: RunContext) {
  const trace: string[] = []; const slow = ctx.delay(10).then(() => trace.push('loser finished'));
  trace.push(await Promise.race([Promise.resolve('winner'), slow.then(() => 'slow')])); await slow; return trace;
}

export const lesson = {
  "id": "javascript-070",
  "description": "Promise.race adopts the first input to settle, whether fulfillment or rejection. Empty input remains pending.",
  "when": "Choose an earliest outcome while handling cancellation of losing work separately.",
  "avoid": "Avoid assuming race chooses the first success or cancels the losers.",
  "tradeoff": "Timeout races need timer cleanup and often AbortController for underlying I/O.",
  "mistakes": [
    {
      "problem": "Using race for redundant successful reads and losing to an early rejection.",
      "fix": "Use Promise.any for first fulfillment or catch failures according to the desired policy."
    }
  ],
  "examples": [
    {
      "title": "First settlement wins",
      "expected": "ready",
      "explanation": "The ready input settles the combined promise before the controlled late input.",
      "runtime": "browser",
      "id": "javascript-070.e01",
      "run": example1
    },
    {
      "title": "An early rejection wins too",
      "expected": "early failure",
      "explanation": "race is not a first-success combinator.",
      "runtime": "browser",
      "id": "javascript-070.e02",
      "run": example2
    },
    {
      "title": "Already fulfilled inputs use reaction order",
      "expected": "first",
      "explanation": "Both inputs are ready, so their queued resolution reactions preserve registration order.",
      "runtime": "browser",
      "id": "javascript-070.e03",
      "run": example3
    },
    {
      "title": "Empty race stays pending without awaiting forever",
      "expected": {
        "settled": false
      },
      "explanation": "The bounded observation does not await the permanently pending promise.",
      "runtime": "browser",
      "id": "javascript-070.e04",
      "run": example4
    },
    {
      "title": "The losing task still runs",
      "expected": [
        "winner",
        "loser finished"
      ],
      "explanation": "Selecting a result does not terminate the other task.",
      "runtime": "browser",
      "id": "javascript-070.e05",
      "run": example5
    }
  ],
  "questions": [
    {
      "id": "javascript-070.q01",
      "level": "Basic",
      "question": "What does Promise.race mean here?",
      "answer": "Promise.race adopts the first input to settle, whether fulfillment or rejection. Empty input remains pending."
    },
    {
      "id": "javascript-070.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “First settlement wins”. Why?",
      "answer": "\"ready\" The ready input settles the combined promise before the controlled late input."
    },
    {
      "id": "javascript-070.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The ready input settles the combined promise before the controlled late input. race is not a first-success combinator."
    },
    {
      "id": "javascript-070.q04",
      "level": "Debugging",
      "question": "Using race for redundant successful reads and losing to an early rejection. How would you fix it?",
      "answer": "Use Promise.any for first fulfillment or catch failures according to the desired policy."
    },
    {
      "id": "javascript-070.q05",
      "level": "Senior",
      "question": "What constraints matter when using Promise.race in production?",
      "answer": "Avoid assuming race chooses the first success or cancels the losers. Timeout races need timer cleanup and often AbortController for underlying I/O."
    },
    {
      "id": "javascript-070.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Choose an earliest outcome while handling cancellation of losing work separately. Timeout races need timer cleanup and often AbortController for underlying I/O."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
