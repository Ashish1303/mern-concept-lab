import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';

function example2(ctx: RunContext) {
  type User = { id: number; name: string }; const original: User = { id: 1, name: 'Ada' }; const patch: Partial<User> = { name: text(ctx.input) }; const updated = { ...original, ...patch }; const projection: Pick<User, 'name'> = { name: updated.name }; return { original, updated, projection };
}

export const lesson = {
  "id": "typescript-021",
  "description": "Utility types derive common contracts such as subsets, optional updates, required fields and function results.",
  "when": "Reuse Pick, Omit, Partial, Required, Readonly, Record and related transformations instead of duplicating shapes.",
  "avoid": "Avoid interpreting utility types as runtime filtering, freezing or validation.",
  "tradeoff": "Utility types are erased; a runtime object can still contain additional fields through structural assignment.",
  "mistakes": [
    {
      "problem": "Expecting Pick or Omit to remove properties from a real object.",
      "fix": "Explicitly construct the runtime projection or update."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-021.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-021.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "original": {
          "id": 1,
          "name": "Ada"
        },
        "updated": {
          "id": 1,
          "name": "Grace"
        },
        "projection": {
          "name": "Grace"
        }
      },
      "explanation": "Spread performs the update and the object literal performs the projection.",
      "runtime": "browser",
      "input": {
        "label": "New name",
        "initial": "Grace"
      },
      "id": "typescript-021.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-021.q01",
      "level": "Basic",
      "question": "What does Utility types mean here?",
      "answer": "Utility types derive common contracts such as subsets, optional updates, required fields and function results."
    },
    {
      "id": "typescript-021.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"original\": {\"id\": 1, \"name\": \"Ada\"}, \"updated\": {\"id\": 1, \"name\": \"Grace\"}, \"projection\": {\"name\": \"Grace\"}} Spread performs the update and the object literal performs the projection."
    },
    {
      "id": "typescript-021.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. Spread performs the update and the object literal performs the projection."
    },
    {
      "id": "typescript-021.q04",
      "level": "Debugging",
      "question": "Expecting Pick or Omit to remove properties from a real object. How would you fix it?",
      "answer": "Explicitly construct the runtime projection or update."
    },
    {
      "id": "typescript-021.q05",
      "level": "Senior",
      "question": "What constraints matter when using Utility types in production?",
      "answer": "Avoid interpreting utility types as runtime filtering, freezing or validation. Utility types are erased; a runtime object can still contain additional fields through structural assignment."
    },
    {
      "id": "typescript-021.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Reuse Pick, Omit, Partial, Required, Readonly, Record and related transformations instead of duplicating shapes. Utility types are erased; a runtime object can still contain additional fields through structural assignment."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
