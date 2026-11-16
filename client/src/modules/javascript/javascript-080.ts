import type { Lesson, RunContext } from '../lesson-types';

async function example1(ctx: RunContext) {
  let active = 0; let peak = 0;
  async function task() { active++; peak = Math.max(peak, active); await ctx.delay(5); active--; }
  await task(); await task(); const serial = peak; peak = 0;
  await Promise.all([task(), task()]); return { serial, concurrent: peak };
}

async function example2(ctx: RunContext) {
  const input = [1, 2, 3, 4]; const output: number[] = []; let index = 0; let active = 0; let peak = 0;
  async function worker() { while (index < input.length) { const own = index++; active++; peak = Math.max(peak, active); await ctx.delay(5); output[own] = input[own]! * 2; active--; } }
  await Promise.all([worker(), worker()]); return { peak, output };
}

export const lesson = {
  "id": "javascript-080",
  "description": "Concurrency overlaps waiting operations; a pool limits how many are active at once. It is distinct from CPU parallelism.",
  "when": "Overlap independent I/O while respecting resource limits.",
  "avoid": "Avoid starting an unbounded number of operations with Promise.all on huge inputs.",
  "tradeoff": "A smaller pool reduces load but can increase total waiting time.",
  "mistakes": [
    {
      "problem": "Assuming Promise.all imposes a concurrency limit.",
      "fix": "Use a bounded worker pool or a limiter with explicit ownership and cancellation."
    }
  ],
  "examples": [
    {
      "title": "Serial awaiting versus concurrent start",
      "expected": {
        "serial": 1,
        "concurrent": 2
      },
      "explanation": "The second pair overlaps pending waits because both tasks start before joining.",
      "runtime": "browser",
      "id": "javascript-080.e01",
      "run": example1
    },
    {
      "title": "A two-worker pool bounds active tasks",
      "expected": {
        "peak": 2,
        "output": [
          2,
          4,
          6,
          8
        ]
      },
      "explanation": "Two worker loops share an index and preserve each result’s input position.",
      "runtime": "browser",
      "id": "javascript-080.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-080.q01",
      "level": "Basic",
      "question": "What does Concurrency basics mean here?",
      "answer": "Concurrency overlaps waiting operations; a pool limits how many are active at once. It is distinct from CPU parallelism."
    },
    {
      "id": "javascript-080.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Serial awaiting versus concurrent start”. Why?",
      "answer": "{\"serial\": 1, \"concurrent\": 2} The second pair overlaps pending waits because both tasks start before joining."
    },
    {
      "id": "javascript-080.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The second pair overlaps pending waits because both tasks start before joining. Two worker loops share an index and preserve each result’s input position."
    },
    {
      "id": "javascript-080.q04",
      "level": "Debugging",
      "question": "Assuming Promise.all imposes a concurrency limit. How would you fix it?",
      "answer": "Use a bounded worker pool or a limiter with explicit ownership and cancellation."
    },
    {
      "id": "javascript-080.q05",
      "level": "Senior",
      "question": "What constraints matter when using Concurrency basics in production?",
      "answer": "Avoid starting an unbounded number of operations with Promise.all on huge inputs. A smaller pool reduces load but can increase total waiting time."
    },
    {
      "id": "javascript-080.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Overlap independent I/O while respecting resource limits. A smaller pool reduces load but can increase total waiting time."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
