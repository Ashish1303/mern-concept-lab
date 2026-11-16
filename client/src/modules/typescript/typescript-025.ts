import type { Lesson, RunContext } from '../lesson-types';
import { capture } from '../runtime';

function example2(ctx: RunContext) {
  const value: unknown = JSON.parse(ctx.input); const asserted = value as { name: string }; const wrong = capture(() => asserted.name.toUpperCase());
  const fixed = typeof value === 'object' && value !== null && 'name' in value && typeof value.name === 'string' ? value.name.toUpperCase() : 'invalid name'; return { wrong, fixed };
}

export const lesson = {
  "id": "typescript-025",
  "description": "unknown requires narrowing before use, any opts out of checking, and never represents an unreachable value set.",
  "when": "Accept untrusted boundaries as unknown and prove the operations needed.",
  "avoid": "Avoid using any simply to make incompatible data compile.",
  "tradeoff": "any can propagate unchecked operations. unknown preserves the need for validation.",
  "mistakes": [
    {
      "problem": "Accessing a property on unvalidated data and calling a method that may not exist.",
      "fix": "Check the shape and property type before using it; reserve never for exhaustiveness."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-025.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-025.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "wrong": "TypeError",
        "fixed": "invalid name"
      },
      "explanation": "The unchecked claim fails on the actual numeric field; the runtime guard safely rejects it.",
      "runtime": "browser",
      "input": {
        "label": "JSON value",
        "initial": "{\"name\":1}"
      },
      "id": "typescript-025.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-025.q01",
      "level": "Basic",
      "question": "What does unknown vs any vs never mean here?",
      "answer": "unknown requires narrowing before use, any opts out of checking, and never represents an unreachable value set."
    },
    {
      "id": "typescript-025.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"wrong\": \"TypeError\", \"fixed\": \"invalid name\"} The unchecked claim fails on the actual numeric field; the runtime guard safely rejects it."
    },
    {
      "id": "typescript-025.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The unchecked claim fails on the actual numeric field; the runtime guard safely rejects it."
    },
    {
      "id": "typescript-025.q04",
      "level": "Debugging",
      "question": "Accessing a property on unvalidated data and calling a method that may not exist. How would you fix it?",
      "answer": "Check the shape and property type before using it; reserve never for exhaustiveness."
    },
    {
      "id": "typescript-025.q05",
      "level": "Senior",
      "question": "What constraints matter when using unknown vs any vs never in production?",
      "answer": "Avoid using any simply to make incompatible data compile. any can propagate unchecked operations. unknown preserves the need for validation."
    },
    {
      "id": "typescript-025.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Accept untrusted boundaries as unknown and prove the operations needed. any can propagate unchecked operations. unknown preserves the need for validation."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
