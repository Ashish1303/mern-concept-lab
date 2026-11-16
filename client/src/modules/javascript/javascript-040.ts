import type { Lesson, RunContext } from '../lesson-types';
import { throttle } from '../helpers';

async function example1(ctx: RunContext) {
  const values: string[] = []; const throttled = throttle((value: string) => values.push(value), 15);
  ctx.cleanup(throttled.cancel); throttled.call('a'); throttled.call('b'); throttled.call('c'); await ctx.delay(30); return values;
}

async function example2(ctx: RunContext) {
  const values: string[] = []; const throttled = throttle((value: string) => values.push(value), 15);
  ctx.cleanup(throttled.cancel); throttled.call('first'); await ctx.delay(30); throttled.call('second'); return values;
}

export const lesson = {
  "id": "javascript-040",
  "description": "Throttling limits callback execution frequency. This implementation runs on the leading edge and has no trailing call.",
  "when": "Limit high-frequency telemetry or pointer updates to a bounded rate.",
  "avoid": "Avoid assuming a leading-only throttle guarantees the last value is delivered.",
  "tradeoff": "Throttle preserves periodic responsiveness while dropping intermediate work.",
  "mistakes": [
    {
      "problem": "Expecting suppressed values to run later without a trailing implementation.",
      "fix": "Choose a trailing policy explicitly or debounce when only the final value matters."
    }
  ],
  "examples": [
    {
      "title": "Leading throttle drops a burst",
      "expected": [
        "a"
      ],
      "explanation": "The lock is set synchronously and suppresses later calls in the same window.",
      "runtime": "browser",
      "id": "javascript-040.e01",
      "run": example1
    },
    {
      "title": "A later window can execute again",
      "expected": [
        "first",
        "second"
      ],
      "explanation": "The real timer releases the leading-edge lock before the later call.",
      "runtime": "browser",
      "id": "javascript-040.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-040.q01",
      "level": "Basic",
      "question": "What does Throttling mean here?",
      "answer": "Throttling limits callback execution frequency. This implementation runs on the leading edge and has no trailing call."
    },
    {
      "id": "javascript-040.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Leading throttle drops a burst”. Why?",
      "answer": "[\"a\"] The lock is set synchronously and suppresses later calls in the same window."
    },
    {
      "id": "javascript-040.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The lock is set synchronously and suppresses later calls in the same window. The real timer releases the leading-edge lock before the later call."
    },
    {
      "id": "javascript-040.q04",
      "level": "Debugging",
      "question": "Expecting suppressed values to run later without a trailing implementation. How would you fix it?",
      "answer": "Choose a trailing policy explicitly or debounce when only the final value matters."
    },
    {
      "id": "javascript-040.q05",
      "level": "Senior",
      "question": "What constraints matter when using Throttling in production?",
      "answer": "Avoid assuming a leading-only throttle guarantees the last value is delivered. Throttle preserves periodic responsiveness while dropping intermediate work."
    },
    {
      "id": "javascript-040.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Limit high-frequency telemetry or pointer updates to a bounded rate. Throttle preserves periodic responsiveness while dropping intermediate work."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
