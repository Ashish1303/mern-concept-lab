import type { Lesson, RunContext } from '../lesson-types';
import { throttle } from '../helpers';

async function example1(ctx: RunContext) {
  const values: number[] = []; const update = throttle((value: number) => values.push(value), 15); ctx.cleanup(update.cancel);
  update.call(1); update.call(2); update.call(3); await ctx.delay(30); return values;
}

function example2(ctx: RunContext) {
  const values: number[] = []; const update = throttle((value: number) => values.push(value), 15); ctx.cleanup(update.cancel);
  update.call(1); update.cancel(); update.call(2); return values;
}

export const lesson = {
  "id": "javascript-110",
  "description": "A leading throttle owns a time-window lock and suppresses calls until its timer releases the lock.",
  "when": "Implement a bounded update rate with explicit leading/trailing semantics.",
  "avoid": "Avoid assuming this leading-only implementation delivers the final suppressed input.",
  "tradeoff": "Calls and retained lock state are O(1); throttling does not make the callback itself cheaper.",
  "mistakes": [
    {
      "problem": "Resetting the lock too early or never releasing it.",
      "fix": "Release on the real timer and cancel/reset on disposal."
    }
  ],
  "examples": [
    {
      "title": "Implement leading update suppression",
      "expected": [
        1
      ],
      "explanation": "Only the first same-window update reaches the callback.",
      "runtime": "browser",
      "id": "javascript-110.e01",
      "run": example1
    },
    {
      "title": "Cancellation releases the throttle lock",
      "expected": [
        1,
        2
      ],
      "explanation": "Disposal clears the pending timer and resets the lock, permitting intentional reuse.",
      "runtime": "browser",
      "id": "javascript-110.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-110.q01",
      "level": "Basic",
      "question": "What does Implement throttle mean here?",
      "answer": "A leading throttle owns a time-window lock and suppresses calls until its timer releases the lock."
    },
    {
      "id": "javascript-110.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Implement leading update suppression”. Why?",
      "answer": "[1] Only the first same-window update reaches the callback."
    },
    {
      "id": "javascript-110.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Only the first same-window update reaches the callback. Disposal clears the pending timer and resets the lock, permitting intentional reuse."
    },
    {
      "id": "javascript-110.q04",
      "level": "Debugging",
      "question": "Resetting the lock too early or never releasing it. How would you fix it?",
      "answer": "Release on the real timer and cancel/reset on disposal."
    },
    {
      "id": "javascript-110.q05",
      "level": "Senior",
      "question": "What constraints matter when using Implement throttle in production?",
      "answer": "Avoid assuming this leading-only implementation delivers the final suppressed input. Calls and retained lock state are O(1); throttling does not make the callback itself cheaper."
    },
    {
      "id": "javascript-110.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Implement a bounded update rate with explicit leading/trailing semantics. Calls and retained lock state are O(1); throttling does not make the callback itself cheaper."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
