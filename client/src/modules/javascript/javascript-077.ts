import type { Lesson, RunContext } from '../lesson-types';
import { itemsResponse } from '../helpers';

async function example1(ctx: RunContext) {
  return await itemsResponse(ctx.request);
}

async function example2(ctx: RunContext) {
  const response = await ctx.request('/api/v1/lab/items?fail=1');
  return { ok: response.ok, status: response.status };
}

export const lesson = {
  "id": "javascript-077",
  "description": "fetch performs a real request and fulfills with a Response even for HTTP error statuses; body parsing is another asynchronous step.",
  "when": "Request validated data from a fixed API and check both HTTP and payload contracts.",
  "avoid": "Avoid trusting a type assertion as validation of received JSON.",
  "tradeoff": "Requests need cancellation, bounds and a clear server contract.",
  "mistakes": [
    {
      "problem": "Assuming HTTP 503 makes fetch reject automatically.",
      "fix": "Check response.ok/status and handle errors before consuming a success contract."
    }
  ],
  "examples": [
    {
      "title": "Fetch and validate actual Express data",
      "expected": [
        "Ada",
        "Grace",
        "Linus"
      ],
      "explanation": "The names arrive from the real fixed-data Express route; they are not a mocked response.",
      "runtime": "browser",
      "network": true,
      "id": "javascript-077.e01",
      "run": example1
    },
    {
      "title": "HTTP failure still returns a Response",
      "expected": {
        "ok": false,
        "status": 503
      },
      "explanation": "fetch fulfills at the transport level; the status communicates the controlled server failure.",
      "runtime": "browser",
      "network": true,
      "id": "javascript-077.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-077.q01",
      "level": "Basic",
      "question": "What does Fetch API mean here?",
      "answer": "fetch performs a real request and fulfills with a Response even for HTTP error statuses; body parsing is another asynchronous step."
    },
    {
      "id": "javascript-077.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Fetch and validate actual Express data”. Why?",
      "answer": "[\"Ada\", \"Grace\", \"Linus\"] The names arrive from the real fixed-data Express route; they are not a mocked response."
    },
    {
      "id": "javascript-077.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The names arrive from the real fixed-data Express route; they are not a mocked response. fetch fulfills at the transport level; the status communicates the controlled server failure."
    },
    {
      "id": "javascript-077.q04",
      "level": "Debugging",
      "question": "Assuming HTTP 503 makes fetch reject automatically. How would you fix it?",
      "answer": "Check response.ok/status and handle errors before consuming a success contract."
    },
    {
      "id": "javascript-077.q05",
      "level": "Senior",
      "question": "What constraints matter when using Fetch API in production?",
      "answer": "Avoid trusting a type assertion as validation of received JSON. Requests need cancellation, bounds and a clear server contract."
    },
    {
      "id": "javascript-077.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Request validated data from a fixed API and check both HTTP and payload contracts. Requests need cancellation, bounds and a clear server contract."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
