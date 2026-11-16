import type { Lesson, RunContext } from '../lesson-types';
import { itemsResponse } from '../helpers';

async function example1() {
  let oldDone!: (value: string) => void; let newDone!: (value: string) => void;
  const old = new Promise<string>(resolve => { oldDone = resolve; }); const latest = new Promise<string>(resolve => { newDone = resolve; });
  let wrong = ''; let fixed = ''; let generation = 0;
  const apply = (pending: Promise<string>) => { const own = ++generation; return pending.then(value => { wrong = value; if (own === generation) fixed = value; }); };
  const tasks = [apply(old), apply(latest)]; newDone('new'); await Promise.resolve(); oldDone('old'); await Promise.all(tasks); return { wrong, fixed };
}

async function example2(ctx: RunContext) {
  const controller = new AbortController(); ctx.cleanup(() => controller.abort());
  const obsolete = ctx.request('/api/v1/lab/items?q=Ada&delay=100', { signal: controller.signal }).then(() => 'completed', error => error instanceof Error ? error.name : 'unknown');
  controller.abort(); const fresh = await itemsResponse(ctx.request, '/api/v1/lab/items?q=Grace');
  return { obsolete: await obsolete, fresh };
}

export const lesson = {
  "id": "javascript-079",
  "description": "A race condition occurs when final state depends on completion order instead of the intended request ordering.",
  "when": "Guard search results so obsolete completions cannot replace the latest intent.",
  "avoid": "Avoid assuming a request started last must finish last.",
  "tradeoff": "Tokens protect commits even when work cannot be cancelled; cancellation additionally saves resources.",
  "mistakes": [
    {
      "problem": "Letting an older completion overwrite the newest result.",
      "fix": "Use a generation token or cancel obsolete requests before committing results."
    }
  ],
  "examples": [
    {
      "title": "Controlled stale overwrite and generation-token fix",
      "expected": {
        "wrong": "old",
        "fixed": "new"
      },
      "explanation": "Manually resolved real promises make the bad completion order reproducible without timing assumptions.",
      "runtime": "browser",
      "id": "javascript-079.e01",
      "run": example1
    },
    {
      "title": "Abort obsolete HTTP work and keep the fresh result",
      "expected": {
        "obsolete": "AbortError",
        "fresh": [
          "Grace"
        ]
      },
      "explanation": "The obsolete fetch is cancelled while the current request returns actual Express data.",
      "runtime": "browser",
      "network": true,
      "id": "javascript-079.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-079.q01",
      "level": "Basic",
      "question": "What does Race conditions mean here?",
      "answer": "A race condition occurs when final state depends on completion order instead of the intended request ordering."
    },
    {
      "id": "javascript-079.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Controlled stale overwrite and generation-token fix”. Why?",
      "answer": "{\"wrong\": \"old\", \"fixed\": \"new\"} Manually resolved real promises make the bad completion order reproducible without timing assumptions."
    },
    {
      "id": "javascript-079.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Manually resolved real promises make the bad completion order reproducible without timing assumptions. The obsolete fetch is cancelled while the current request returns actual Express data."
    },
    {
      "id": "javascript-079.q04",
      "level": "Debugging",
      "question": "Letting an older completion overwrite the newest result. How would you fix it?",
      "answer": "Use a generation token or cancel obsolete requests before committing results."
    },
    {
      "id": "javascript-079.q05",
      "level": "Senior",
      "question": "What constraints matter when using Race conditions in production?",
      "answer": "Avoid assuming a request started last must finish last. Tokens protect commits even when work cannot be cancelled; cancellation additionally saves resources."
    },
    {
      "id": "javascript-079.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Guard search results so obsolete completions cannot replace the latest intent. Tokens protect commits even when work cannot be cancelled; cancellation additionally saves resources."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
