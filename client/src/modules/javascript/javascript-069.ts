import type { Lesson } from '../lesson-types';

async function example1() {
  const results = await Promise.allSettled([Promise.resolve('ok'), Promise.reject('offline')]);
  return results.map(result => result.status === 'fulfilled' ? { status: result.status, value: result.value } : { status: result.status, reason: result.reason as unknown });
}

async function example2() {
  let finish!: (value: string) => void; const first = new Promise<string>(resolve => { finish = resolve; });
  const combined = Promise.allSettled([first, Promise.resolve('second')]); finish('first');
  return (await combined).map(result => result.status === 'fulfilled' ? result.value : 'failed');
}

async function example3() {
  return await Promise.allSettled([]);
}

async function example4() {
  return await Promise.allSettled([1, 2]);
}

async function example5() {
  let attempts = 0; const task = async () => { if (++attempts === 1) throw new Error('retryable'); return 'ok'; };
  const first = await Promise.allSettled([task()]);
  const retries = await Promise.all(first.map(result => result.status === 'rejected' ? task() : Promise.resolve(result.value)));
  return { first: first.map(result => result.status), retries, attempts };
}

export const lesson = {
  "id": "javascript-069",
  "description": "Promise.allSettled waits for every input and returns fulfillment/rejection records in input order.",
  "when": "Report independent partial outcomes such as batch import results.",
  "avoid": "Avoid discarding each rejected reason simply because the combined promise fulfills.",
  "tradeoff": "It waits for the slowest operation and does not itself retry or limit concurrency.",
  "mistakes": [
    {
      "problem": "Reading value on a rejected settlement without checking status.",
      "fix": "Narrow the status discriminant before reading value or reason."
    }
  ],
  "examples": [
    {
      "title": "Mixed outcomes retain individual status",
      "expected": [
        {
          "status": "fulfilled",
          "value": "ok"
        },
        {
          "status": "rejected",
          "reason": "offline"
        }
      ],
      "explanation": "The combined operation fulfills with both outcomes.",
      "runtime": "browser",
      "id": "javascript-069.e01",
      "run": example1
    },
    {
      "title": "Input order is stable",
      "expected": [
        "first",
        "second"
      ],
      "explanation": "Faster second completion does not move its output index.",
      "runtime": "browser",
      "id": "javascript-069.e02",
      "run": example2
    },
    {
      "title": "Empty input",
      "expected": [],
      "explanation": "There are no outcomes to wait for.",
      "runtime": "browser",
      "id": "javascript-069.e03",
      "run": example3
    },
    {
      "title": "Plain values produce fulfilled records",
      "expected": [
        {
          "status": "fulfilled",
          "value": 1
        },
        {
          "status": "fulfilled",
          "value": 2
        }
      ],
      "explanation": "Non-promises are treated as fulfilled inputs.",
      "runtime": "browser",
      "id": "javascript-069.e04",
      "run": example4
    },
    {
      "title": "Retry only rejected work",
      "expected": {
        "first": [
          "rejected"
        ],
        "retries": [
          "ok"
        ],
        "attempts": 2
      },
      "explanation": "Application code chooses a retry policy after inspecting each status.",
      "runtime": "browser",
      "id": "javascript-069.e05",
      "run": example5
    }
  ],
  "questions": [
    {
      "id": "javascript-069.q01",
      "level": "Basic",
      "question": "What does Promise.allSettled mean here?",
      "answer": "Promise.allSettled waits for every input and returns fulfillment/rejection records in input order."
    },
    {
      "id": "javascript-069.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Mixed outcomes retain individual status”. Why?",
      "answer": "[{\"status\": \"fulfilled\", \"value\": \"ok\"}, {\"status\": \"rejected\", \"reason\": \"offline\"}] The combined operation fulfills with both outcomes."
    },
    {
      "id": "javascript-069.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The combined operation fulfills with both outcomes. Faster second completion does not move its output index."
    },
    {
      "id": "javascript-069.q04",
      "level": "Debugging",
      "question": "Reading value on a rejected settlement without checking status. How would you fix it?",
      "answer": "Narrow the status discriminant before reading value or reason."
    },
    {
      "id": "javascript-069.q05",
      "level": "Senior",
      "question": "What constraints matter when using Promise.allSettled in production?",
      "answer": "Avoid discarding each rejected reason simply because the combined promise fulfills. It waits for the slowest operation and does not itself retry or limit concurrency."
    },
    {
      "id": "javascript-069.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Report independent partial outcomes such as batch import results. It waits for the slowest operation and does not itself retry or limit concurrency."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
