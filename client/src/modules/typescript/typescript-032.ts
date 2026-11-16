import type { Lesson, RunContext } from '../lesson-types';
import { itemsResponse } from '../helpers';

async function example2(ctx: RunContext) {
  return await itemsResponse(ctx.request, '/api/v1/lab/items?q=Ada');
}

export const lesson = {
  "id": "typescript-032",
  "description": "Express RequestHandler generics model parameters, response bodies, request bodies and query shapes. They do not validate incoming HTTP values.",
  "when": "Describe route contracts alongside real runtime input validation.",
  "avoid": "Avoid assuming typed query parameters are already safe numbers or trusted strings.",
  "tradeoff": "The compile fixture uses actual Express types; the network example calls the real bounded lab route.",
  "mistakes": [
    {
      "problem": "Assigning a route parameter string directly to a number.",
      "fix": "Parse and validate at runtime; use the handler generics to describe the parsed/public contract."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-032.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-032.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": [
        "Ada"
      ],
      "explanation": "The actual route validates q before filtering its fixed teaching data; this is not database persistence.",
      "runtime": "browser",
      "network": true,
      "id": "typescript-032.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-032.q01",
      "level": "Basic",
      "question": "What does Express request/response typing mean here?",
      "answer": "Express RequestHandler generics model parameters, response bodies, request bodies and query shapes. They do not validate incoming HTTP values."
    },
    {
      "id": "typescript-032.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "[\"Ada\"] The actual route validates q before filtering its fixed teaching data; this is not database persistence."
    },
    {
      "id": "typescript-032.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The actual route validates q before filtering its fixed teaching data; this is not database persistence."
    },
    {
      "id": "typescript-032.q04",
      "level": "Debugging",
      "question": "Assigning a route parameter string directly to a number. How would you fix it?",
      "answer": "Parse and validate at runtime; use the handler generics to describe the parsed/public contract."
    },
    {
      "id": "typescript-032.q05",
      "level": "Senior",
      "question": "What constraints matter when using Express request/response typing in production?",
      "answer": "Avoid assuming typed query parameters are already safe numbers or trusted strings. The compile fixture uses actual Express types; the network example calls the real bounded lab route."
    },
    {
      "id": "typescript-032.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Describe route contracts alongside real runtime input validation. The compile fixture uses actual Express types; the network example calls the real bounded lab route."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
