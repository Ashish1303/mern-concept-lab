import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';
import { debounce } from '../helpers';

async function example1(ctx: RunContext) {
  const values: string[] = []; const search = debounce((value: string) => values.push(value), 15); ctx.cleanup(search.cancel);
  search.call('M'); search.call('ME'); search.call(text(ctx.input)); await ctx.delay(30); return values;
}

async function example2(ctx: RunContext) {
  const values: string[] = []; const search = debounce((value: string) => values.push(value), 15); ctx.cleanup(search.cancel);
  search.call('obsolete'); search.cancel(); await ctx.delay(30); return { published: values, cancelled: true };
}

export const lesson = {
  "id": "javascript-109",
  "description": "A debounce implementation owns one replaceable timeout and exposes cancellation.",
  "when": "Implement trailing search-input work without leaving stale timers.",
  "avoid": "Avoid claiming leading-edge or maxWait behavior in this trailing-only implementation.",
  "tradeoff": "Each call is O(1); one pending handle is O(1) retained state, excluding captured input.",
  "mistakes": [
    {
      "problem": "Forgetting to clear the previous handle on each call.",
      "fix": "Replace the pending timeout and expose cancel for owner cleanup."
    }
  ],
  "examples": [
    {
      "title": "Implement trailing input coalescing",
      "expected": [
        "MERN"
      ],
      "explanation": "The actual implementation is included in helpers.ts beside this call site.",
      "runtime": "browser",
      "input": {
        "label": "Final query",
        "initial": "MERN"
      },
      "id": "javascript-109.e01",
      "run": example1
    },
    {
      "title": "Dispose before publishing",
      "expected": {
        "published": [],
        "cancelled": true
      },
      "explanation": "The cancelled timeout never publishes its captured query.",
      "runtime": "browser",
      "id": "javascript-109.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-109.q01",
      "level": "Basic",
      "question": "What does Implement debounce mean here?",
      "answer": "A debounce implementation owns one replaceable timeout and exposes cancellation."
    },
    {
      "id": "javascript-109.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Implement trailing input coalescing”. Why?",
      "answer": "[\"MERN\"] The actual implementation is included in helpers.ts beside this call site."
    },
    {
      "id": "javascript-109.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The actual implementation is included in helpers.ts beside this call site. The cancelled timeout never publishes its captured query."
    },
    {
      "id": "javascript-109.q04",
      "level": "Debugging",
      "question": "Forgetting to clear the previous handle on each call. How would you fix it?",
      "answer": "Replace the pending timeout and expose cancel for owner cleanup."
    },
    {
      "id": "javascript-109.q05",
      "level": "Senior",
      "question": "What constraints matter when using Implement debounce in production?",
      "answer": "Avoid claiming leading-edge or maxWait behavior in this trailing-only implementation. Each call is O(1); one pending handle is O(1) retained state, excluding captured input."
    },
    {
      "id": "javascript-109.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Implement trailing search-input work without leaving stale timers. Each call is O(1); one pending handle is O(1) retained state, excluding captured input."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
