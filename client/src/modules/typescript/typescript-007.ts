import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';

function example2(ctx: RunContext) {
  const states = ['idle', 'ready'] as const; const input = text(ctx.input); return { valid: states.some(state => state === input), supplied: input };
}

export const lesson = {
  "id": "typescript-007",
  "description": "Literal types restrict a value to exact strings, numbers or booleans; const assertions preserve narrow values.",
  "when": "Represent finite states and action names.",
  "avoid": "Avoid widening a domain state to arbitrary string when exhaustiveness matters.",
  "tradeoff": "Literal restrictions disappear at runtime; network values remain untrusted.",
  "mistakes": [
    {
      "problem": "Accepting a misspelled state outside the literal union.",
      "fix": "Use a finite literal contract and validate external strings against it."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-007.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-007.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "valid": true,
        "supplied": "ready"
      },
      "explanation": "A runtime membership check validates a string; as const alone cannot validate user input.",
      "runtime": "browser",
      "input": {
        "label": "State name",
        "initial": "ready"
      },
      "id": "typescript-007.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-007.q01",
      "level": "Basic",
      "question": "What does Literal types mean here?",
      "answer": "Literal types restrict a value to exact strings, numbers or booleans; const assertions preserve narrow values."
    },
    {
      "id": "typescript-007.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"valid\": true, \"supplied\": \"ready\"} A runtime membership check validates a string; as const alone cannot validate user input."
    },
    {
      "id": "typescript-007.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. A runtime membership check validates a string; as const alone cannot validate user input."
    },
    {
      "id": "typescript-007.q04",
      "level": "Debugging",
      "question": "Accepting a misspelled state outside the literal union. How would you fix it?",
      "answer": "Use a finite literal contract and validate external strings against it."
    },
    {
      "id": "typescript-007.q05",
      "level": "Senior",
      "question": "What constraints matter when using Literal types in production?",
      "answer": "Avoid widening a domain state to arbitrary string when exhaustiveness matters. Literal restrictions disappear at runtime; network values remain untrusted."
    },
    {
      "id": "typescript-007.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Represent finite states and action names. Literal restrictions disappear at runtime; network values remain untrusted."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
