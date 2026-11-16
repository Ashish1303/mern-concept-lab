import type { Lesson, RunContext } from '../lesson-types';

async function example1(ctx: RunContext) {
  const trace: string[] = []; const timer = setTimeout(() => trace.push('unexpected'), 10);
  ctx.cleanup(() => clearTimeout(timer)); clearTimeout(timer); await ctx.delay(20); return trace;
}

async function example2(ctx: RunContext) {
  const ticks: number[] = [];
  await new Promise<void>(resolve => { const timer = setInterval(() => { ticks.push(ticks.length + 1); if (ticks.length === 3) { clearInterval(timer); resolve(); } }, 3); ctx.cleanup(() => { clearInterval(timer); resolve(); }); });
  return ticks;
}

export const lesson = {
  "id": "javascript-075",
  "description": "Timers schedule future callbacks after a minimum delay; interval callbacks repeat until cancelled.",
  "when": "Schedule bounded periodic work and cancel it when its owner ends.",
  "avoid": "Avoid relying on exact timing or leaving intervals running after unmount.",
  "tradeoff": "Busy event loops delay timers; requested delays are lower bounds rather than exact deadlines.",
  "mistakes": [
    {
      "problem": "Forgetting clearTimeout or clearInterval.",
      "fix": "Retain timer handles and register cleanup before starting long-lived work."
    }
  ],
  "examples": [
    {
      "title": "Cancelled timeout does not publish",
      "expected": [],
      "explanation": "Clearing the real handle removes the scheduled callback.",
      "runtime": "browser",
      "id": "javascript-075.e01",
      "run": example1
    },
    {
      "title": "Bounded interval stops after three ticks",
      "expected": [
        1,
        2,
        3
      ],
      "explanation": "The interval is explicitly stopped on completion and also registered for cancellation.",
      "runtime": "browser",
      "id": "javascript-075.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-075.q01",
      "level": "Basic",
      "question": "What does setTimeout and setInterval mean here?",
      "answer": "Timers schedule future callbacks after a minimum delay; interval callbacks repeat until cancelled."
    },
    {
      "id": "javascript-075.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Cancelled timeout does not publish”. Why?",
      "answer": "[] Clearing the real handle removes the scheduled callback."
    },
    {
      "id": "javascript-075.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Clearing the real handle removes the scheduled callback. The interval is explicitly stopped on completion and also registered for cancellation."
    },
    {
      "id": "javascript-075.q04",
      "level": "Debugging",
      "question": "Forgetting clearTimeout or clearInterval. How would you fix it?",
      "answer": "Retain timer handles and register cleanup before starting long-lived work."
    },
    {
      "id": "javascript-075.q05",
      "level": "Senior",
      "question": "What constraints matter when using setTimeout and setInterval in production?",
      "answer": "Avoid relying on exact timing or leaving intervals running after unmount. Busy event loops delay timers; requested delays are lower bounds rather than exact deadlines."
    },
    {
      "id": "javascript-075.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Schedule bounded periodic work and cancel it when its owner ends. Busy event loops delay timers; requested delays are lower bounds rather than exact deadlines."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
