import type { Lesson, RunContext } from '../lesson-types';

function example2(ctx: RunContext) {
  const value: unknown = JSON.parse(ctx.input); const valid = typeof value === 'object' && value !== null && 'name' in value && typeof value.name === 'string'; return { valid };
}

export const lesson = {
  "id": "typescript-034",
  "description": "Compile-time types check authored code, while runtime validation establishes a contract for external values.",
  "when": "Receive untrusted JSON as unknown and validate the fields actually consumed.",
  "avoid": "Avoid assuming satisfies or as validates a network payload.",
  "tradeoff": "Types improve development feedback; runtime guards protect real boundaries. Both are needed.",
  "mistakes": [
    {
      "problem": "Asserting an external payload’s shape without testing it.",
      "fix": "Use an executable guard or validation library and return a useful failure outcome."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-034.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-034.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "valid": false
      },
      "explanation": "The actual numeric name is rejected even though a blind cast could have compiled.",
      "runtime": "browser",
      "input": {
        "label": "JSON payload",
        "initial": "{\"name\":42}"
      },
      "id": "typescript-034.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-034.q01",
      "level": "Basic",
      "question": "What does Runtime validation vs compile-time types mean here?",
      "answer": "Compile-time types check authored code, while runtime validation establishes a contract for external values."
    },
    {
      "id": "typescript-034.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"valid\": false} The actual numeric name is rejected even though a blind cast could have compiled."
    },
    {
      "id": "typescript-034.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The actual numeric name is rejected even though a blind cast could have compiled."
    },
    {
      "id": "typescript-034.q04",
      "level": "Debugging",
      "question": "Asserting an external payload’s shape without testing it. How would you fix it?",
      "answer": "Use an executable guard or validation library and return a useful failure outcome."
    },
    {
      "id": "typescript-034.q05",
      "level": "Senior",
      "question": "What constraints matter when using Runtime validation vs compile-time types in production?",
      "answer": "Avoid assuming satisfies or as validates a network payload. Types improve development feedback; runtime guards protect real boundaries. Both are needed."
    },
    {
      "id": "typescript-034.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Receive untrusted JSON as unknown and validate the fields actually consumed. Types improve development feedback; runtime guards protect real boundaries. Both are needed."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
