import type { Lesson, RunContext } from '../lesson-types';
import { itemsResponse } from '../helpers';

async function example2(ctx: RunContext) {
  const names = await itemsResponse(ctx.request); return { validatedNames: names };
}

export const lesson = {
  "id": "typescript-029",
  "description": "API response types describe the expected contract; discriminants narrow success/error variants and runtime validation establishes trust.",
  "when": "Model documented request/response payloads while validating received JSON.",
  "avoid": "Avoid casting response.json directly to a trusted domain type without checks.",
  "tradeoff": "Shared types reduce drift but cannot validate remote data or replace HTTP status handling.",
  "mistakes": [
    {
      "problem": "Reading success data on an error result.",
      "fix": "Check the discriminant and validate fields at the network boundary."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-029.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-029.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "validatedNames": [
          "Ada",
          "Grace",
          "Linus"
        ]
      },
      "explanation": "The helper validates actual server JSON before returning the names.",
      "runtime": "browser",
      "network": true,
      "id": "typescript-029.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-029.q01",
      "level": "Basic",
      "question": "What does API response typing mean here?",
      "answer": "API response types describe the expected contract; discriminants narrow success/error variants and runtime validation establishes trust."
    },
    {
      "id": "typescript-029.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"validatedNames\": [\"Ada\", \"Grace\", \"Linus\"]} The helper validates actual server JSON before returning the names."
    },
    {
      "id": "typescript-029.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The helper validates actual server JSON before returning the names."
    },
    {
      "id": "typescript-029.q04",
      "level": "Debugging",
      "question": "Reading success data on an error result. How would you fix it?",
      "answer": "Check the discriminant and validate fields at the network boundary."
    },
    {
      "id": "typescript-029.q05",
      "level": "Senior",
      "question": "What constraints matter when using API response typing in production?",
      "answer": "Avoid casting response.json directly to a trusted domain type without checks. Shared types reduce drift but cannot validate remote data or replace HTTP status handling."
    },
    {
      "id": "typescript-029.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Model documented request/response payloads while validating received JSON. Shared types reduce drift but cannot validate remote data or replace HTTP status handling."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
