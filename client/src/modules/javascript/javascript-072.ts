import type { Lesson, RunContext } from '../lesson-types';

function example1(ctx: RunContext) {
  try { return { parsed: JSON.parse(ctx.input) as unknown }; } catch (error) { return { error: error instanceof Error ? error.name : 'unknown' }; }
}

async function example2() {
  const trace: string[] = [];
  try { await Promise.reject(new Error('offline')); } catch { trace.push('recovered'); } finally { trace.push('released'); }
  return trace;
}

export const lesson = {
  "id": "javascript-072",
  "description": "Error handling follows synchronous throws and promise rejection paths; try/catch only covers awaited asynchronous work.",
  "when": "Catch at boundaries where recovery or a useful error contract is possible.",
  "avoid": "Avoid swallowing failures or exposing raw private errors to users.",
  "tradeoff": "finally should release resources; a thrown cleanup error can replace the original failure.",
  "mistakes": [
    {
      "problem": "Starting a rejected promise without awaiting or handling it.",
      "fix": "Await inside try/catch or return a promise with a rejection handler."
    }
  ],
  "examples": [
    {
      "title": "Parse failure becomes a controlled error result",
      "expected": {
        "error": "SyntaxError"
      },
      "explanation": "The actual parser throws and the boundary exposes only its error type.",
      "runtime": "browser",
      "input": {
        "label": "JSON text",
        "initial": "{bad json}"
      },
      "id": "javascript-072.e01",
      "run": example1
    },
    {
      "title": "Awaited rejection and finally cleanup",
      "expected": [
        "recovered",
        "released"
      ],
      "explanation": "The awaited rejection enters catch and finally still runs.",
      "runtime": "browser",
      "id": "javascript-072.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-072.q01",
      "level": "Basic",
      "question": "What does Error handling mean here?",
      "answer": "Error handling follows synchronous throws and promise rejection paths; try/catch only covers awaited asynchronous work."
    },
    {
      "id": "javascript-072.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Parse failure becomes a controlled error result”. Why?",
      "answer": "{\"error\": \"SyntaxError\"} The actual parser throws and the boundary exposes only its error type."
    },
    {
      "id": "javascript-072.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The actual parser throws and the boundary exposes only its error type. The awaited rejection enters catch and finally still runs."
    },
    {
      "id": "javascript-072.q04",
      "level": "Debugging",
      "question": "Starting a rejected promise without awaiting or handling it. How would you fix it?",
      "answer": "Await inside try/catch or return a promise with a rejection handler."
    },
    {
      "id": "javascript-072.q05",
      "level": "Senior",
      "question": "What constraints matter when using Error handling in production?",
      "answer": "Avoid swallowing failures or exposing raw private errors to users. finally should release resources; a thrown cleanup error can replace the original failure."
    },
    {
      "id": "javascript-072.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Catch at boundaries where recovery or a useful error contract is possible. finally should release resources; a thrown cleanup error can replace the original failure."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
