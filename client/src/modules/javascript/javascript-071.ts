import type { Lesson, RunContext } from '../lesson-types';

async function example1() {
  return await Promise.any([Promise.reject(new Error('offline')), Promise.resolve('available')]);
}

async function example2() {
  try { await Promise.any([Promise.reject('A'), Promise.reject('B')]); return 'unexpected'; } catch (error) { return error instanceof AggregateError ? { name: error.name, errors: error.errors as unknown[] } : 'unknown'; }
}

async function example3() {
  try { await Promise.any([]); return 'unexpected'; } catch (error) { return error instanceof AggregateError ? error.errors.length : -1; }
}

async function example4() {
  return await Promise.any([Promise.reject('failure'), 0]);
}

async function example5(ctx: RunContext) {
  const trace: string[] = []; const slow = ctx.delay(10).then(() => trace.push('slow completed'));
  trace.push(await Promise.any([Promise.resolve('first success'), slow.then(() => 'late')])); await slow; return trace;
}

export const lesson = {
  "id": "javascript-071",
  "description": "Promise.any fulfills with the first fulfillment and rejects with AggregateError only if every input rejects.",
  "when": "Use redundant independent sources when any successful result is sufficient.",
  "avoid": "Avoid ignoring the resource cost of losing operations.",
  "tradeoff": "AggregateError.errors follows input order; underlying operations are not automatically cancelled.",
  "mistakes": [
    {
      "problem": "Assuming an empty any stays pending like an empty race.",
      "fix": "Handle AggregateError, including the empty-input case."
    }
  ],
  "examples": [
    {
      "title": "Ignore early rejection and use a success",
      "expected": "available",
      "explanation": "An early failure does not prevent another input from fulfilling.",
      "runtime": "browser",
      "id": "javascript-071.e01",
      "run": example1
    },
    {
      "title": "All failures produce ordered AggregateError reasons",
      "expected": {
        "name": "AggregateError",
        "errors": [
          "A",
          "B"
        ]
      },
      "explanation": "Only after all inputs reject is the aggregate error produced.",
      "runtime": "browser",
      "id": "javascript-071.e02",
      "run": example2
    },
    {
      "title": "Empty input rejects with no reasons",
      "expected": 0,
      "explanation": "No input can fulfill, so the aggregate rejection has an empty errors list.",
      "runtime": "browser",
      "id": "javascript-071.e03",
      "run": example3
    },
    {
      "title": "Plain values count as fulfillment",
      "expected": 0,
      "explanation": "Zero is a valid fulfillment value, not a failure signal.",
      "runtime": "browser",
      "id": "javascript-071.e04",
      "run": example4
    },
    {
      "title": "Losing operations continue",
      "expected": [
        "first success",
        "slow completed"
      ],
      "explanation": "Cancellation is a separate responsibility from first-success selection.",
      "runtime": "browser",
      "id": "javascript-071.e05",
      "run": example5
    }
  ],
  "questions": [
    {
      "id": "javascript-071.q01",
      "level": "Basic",
      "question": "What does Promise.any mean here?",
      "answer": "Promise.any fulfills with the first fulfillment and rejects with AggregateError only if every input rejects."
    },
    {
      "id": "javascript-071.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Ignore early rejection and use a success”. Why?",
      "answer": "\"available\" An early failure does not prevent another input from fulfilling."
    },
    {
      "id": "javascript-071.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "An early failure does not prevent another input from fulfilling. Only after all inputs reject is the aggregate error produced."
    },
    {
      "id": "javascript-071.q04",
      "level": "Debugging",
      "question": "Assuming an empty any stays pending like an empty race. How would you fix it?",
      "answer": "Handle AggregateError, including the empty-input case."
    },
    {
      "id": "javascript-071.q05",
      "level": "Senior",
      "question": "What constraints matter when using Promise.any in production?",
      "answer": "Avoid ignoring the resource cost of losing operations. AggregateError.errors follows input order; underlying operations are not automatically cancelled."
    },
    {
      "id": "javascript-071.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use redundant independent sources when any successful result is sufficient. AggregateError.errors follows input order; underlying operations are not automatically cancelled."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
