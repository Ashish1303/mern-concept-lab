import type { Lesson, RunContext } from '../lesson-types';
import { debounce } from '../helpers';

async function example1(ctx: RunContext) {
  const values: string[] = []; const debounced = debounce((value: string) => values.push(value), 15);
  ctx.cleanup(debounced.cancel); debounced.call('a'); debounced.call('b'); debounced.call('c');
  await ctx.delay(30); return values;
}

async function example2(ctx: RunContext) {
  const values: string[] = []; const debounced = debounce((value: string) => values.push(value), 15);
  ctx.cleanup(debounced.cancel); debounced.call('pending'); debounced.cancel(); await ctx.delay(30); return values;
}

export const lesson = {
  "id": "javascript-039",
  "description": "Debouncing delays a callback until a quiet period has elapsed, replacing earlier scheduled calls.",
  "when": "Reduce search or resize work after bursts.",
  "avoid": "Avoid debounce for actions that must execute immediately or continuously.",
  "tradeoff": "Trailing debounce improves burst efficiency while deliberately adding latency.",
  "mistakes": [
    {
      "problem": "Leaving a pending callback alive after its owner is disposed.",
      "fix": "Cancel the timeout during cleanup; the second example verifies cancellation."
    }
  ],
  "examples": [
    {
      "title": "Trailing debounce keeps only the last call",
      "expected": [
        "c"
      ],
      "explanation": "Each call clears the previous timer; the final timer publishes c.",
      "runtime": "browser",
      "id": "javascript-039.e01",
      "run": example1
    },
    {
      "title": "Cancel pending debounce",
      "expected": [],
      "explanation": "Cancelling removes the real pending timer before it fires.",
      "runtime": "browser",
      "id": "javascript-039.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-039.q01",
      "level": "Basic",
      "question": "What does Debouncing mean here?",
      "answer": "Debouncing delays a callback until a quiet period has elapsed, replacing earlier scheduled calls."
    },
    {
      "id": "javascript-039.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Trailing debounce keeps only the last call”. Why?",
      "answer": "[\"c\"] Each call clears the previous timer; the final timer publishes c."
    },
    {
      "id": "javascript-039.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Each call clears the previous timer; the final timer publishes c. Cancelling removes the real pending timer before it fires."
    },
    {
      "id": "javascript-039.q04",
      "level": "Debugging",
      "question": "Leaving a pending callback alive after its owner is disposed. How would you fix it?",
      "answer": "Cancel the timeout during cleanup; the second example verifies cancellation."
    },
    {
      "id": "javascript-039.q05",
      "level": "Senior",
      "question": "What constraints matter when using Debouncing in production?",
      "answer": "Avoid debounce for actions that must execute immediately or continuously. Trailing debounce improves burst efficiency while deliberately adding latency."
    },
    {
      "id": "javascript-039.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Reduce search or resize work after bursts. Trailing debounce improves burst efficiency while deliberately adding latency."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
