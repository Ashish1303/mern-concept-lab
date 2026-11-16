import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';

function example2(ctx: RunContext) {
  const user = { name: 'Ada', score: 5 }; const key = text(ctx.input); if (key !== 'name' && key !== 'score') throw new Error('Choose name or score.');
  function get<T, K extends keyof T>(value: T, selected: K): T[K] { return value[selected]; } return get(user, key);
}

export const lesson = {
  "id": "typescript-016",
  "description": "keyof creates the union of a type’s permitted property keys and can constrain safe generic access.",
  "when": "Link a selected key to the exact property type returned.",
  "avoid": "Avoid casting arbitrary unvalidated strings to keyof a trusted type.",
  "tradeoff": "keyof is a compile-time union; Object.keys supplies actual runtime keys and can have wider ownership considerations.",
  "mistakes": [
    {
      "problem": "Using a misspelled key and obtaining undefined at runtime.",
      "fix": "Constrain authored keys and validate user-supplied key strings."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-016.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-016.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": "Ada",
      "explanation": "The runtime key check narrows the external string before generic property access.",
      "runtime": "browser",
      "input": {
        "label": "Property: name or score",
        "initial": "name"
      },
      "id": "typescript-016.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-016.q01",
      "level": "Basic",
      "question": "What does keyof mean here?",
      "answer": "keyof creates the union of a type’s permitted property keys and can constrain safe generic access."
    },
    {
      "id": "typescript-016.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "\"Ada\" The runtime key check narrows the external string before generic property access."
    },
    {
      "id": "typescript-016.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The runtime key check narrows the external string before generic property access."
    },
    {
      "id": "typescript-016.q04",
      "level": "Debugging",
      "question": "Using a misspelled key and obtaining undefined at runtime. How would you fix it?",
      "answer": "Constrain authored keys and validate user-supplied key strings."
    },
    {
      "id": "typescript-016.q05",
      "level": "Senior",
      "question": "What constraints matter when using keyof in production?",
      "answer": "Avoid casting arbitrary unvalidated strings to keyof a trusted type. keyof is a compile-time union; Object.keys supplies actual runtime keys and can have wider ownership considerations."
    },
    {
      "id": "typescript-016.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Link a selected key to the exact property type returned. keyof is a compile-time union; Object.keys supplies actual runtime keys and can have wider ownership considerations."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
