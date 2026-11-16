import type { Lesson, RunContext } from '../lesson-types';

async function example1(ctx: RunContext) {
  const controller = new AbortController(); controller.abort();
  try { await ctx.request('/api/v1/lab/items', { signal: controller.signal }); return 'unexpected'; } catch (error) { return error instanceof Error ? error.name : 'unknown'; }
}

async function example2(ctx: RunContext) {
  const controller = new AbortController(); ctx.cleanup(() => controller.abort());
  const pending = ctx.request('/api/v1/lab/items?delay=100', { signal: controller.signal }); queueMicrotask(() => controller.abort());
  try { await pending; return 'unexpected'; } catch (error) { return error instanceof Error ? error.name : 'unknown'; }
}

export const lesson = {
  "id": "javascript-078",
  "description": "AbortController signals cancellation to supported APIs such as fetch. It does not automatically undo completed side effects.",
  "when": "Cancel obsolete requests and work whose owner has gone away.",
  "avoid": "Avoid treating abort as a universal transaction rollback or reusing an already-aborted signal for fresh work.",
  "tradeoff": "Cancellation can stop waiting/transport work while a server may already have begun processing.",
  "mistakes": [
    {
      "problem": "Reusing a cancelled controller for another request.",
      "fix": "Create a new controller for each new operation and handle AbortError."
    }
  ],
  "examples": [
    {
      "title": "An already-aborted signal rejects fetch",
      "expected": "AbortError",
      "explanation": "The signal is already cancelled before the request can complete.",
      "runtime": "browser",
      "network": true,
      "id": "javascript-078.e01",
      "run": example1
    },
    {
      "title": "Cancel an in-flight delayed request",
      "expected": "AbortError",
      "explanation": "The controller aborts after request creation and before the deliberately delayed response.",
      "runtime": "browser",
      "network": true,
      "id": "javascript-078.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-078.q01",
      "level": "Basic",
      "question": "What does AbortController mean here?",
      "answer": "AbortController signals cancellation to supported APIs such as fetch. It does not automatically undo completed side effects."
    },
    {
      "id": "javascript-078.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “An already-aborted signal rejects fetch”. Why?",
      "answer": "\"AbortError\" The signal is already cancelled before the request can complete."
    },
    {
      "id": "javascript-078.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The signal is already cancelled before the request can complete. The controller aborts after request creation and before the deliberately delayed response."
    },
    {
      "id": "javascript-078.q04",
      "level": "Debugging",
      "question": "Reusing a cancelled controller for another request. How would you fix it?",
      "answer": "Create a new controller for each new operation and handle AbortError."
    },
    {
      "id": "javascript-078.q05",
      "level": "Senior",
      "question": "What constraints matter when using AbortController in production?",
      "answer": "Avoid treating abort as a universal transaction rollback or reusing an already-aborted signal for fresh work. Cancellation can stop waiting/transport work while a server may already have begun processing."
    },
    {
      "id": "javascript-078.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Cancel obsolete requests and work whose owner has gone away. Cancellation can stop waiting/transport work while a server may already have begun processing."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
