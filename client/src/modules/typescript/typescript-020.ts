import type { Lesson, RunContext } from '../lesson-types';

function example2(ctx: RunContext) {
  type Kind<T> = T extends string ? 'text' : 'other'; const label: Kind<string> = 'text'; const value: unknown = JSON.parse(ctx.input); return { authoredLabel: label, runtimeBranch: typeof value === 'string' ? 'text' : 'other' };
}

export const lesson = {
  "id": "typescript-020",
  "description": "Conditional types select a type based on assignability, and infer can extract a component type.",
  "when": "Describe reusable type relationships such as an array’s element type.",
  "avoid": "Avoid expecting conditional types to execute runtime branches.",
  "tradeoff": "Distributive conditional types operate across naked type-parameter unions; tuple-wrapping can disable distribution.",
  "mistakes": [
    {
      "problem": "Assigning a string to an extracted numeric element type.",
      "fix": "Respect the selected type and implement any runtime branch separately."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-020.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-020.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "authoredLabel": "text",
        "runtimeBranch": "text"
      },
      "explanation": "The conditional type checks authoredLabel; typeof performs the separate actual runtime classification.",
      "runtime": "browser",
      "input": {
        "label": "JSON value",
        "initial": "\"Ada\""
      },
      "id": "typescript-020.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-020.q01",
      "level": "Basic",
      "question": "What does Conditional types mean here?",
      "answer": "Conditional types select a type based on assignability, and infer can extract a component type."
    },
    {
      "id": "typescript-020.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"authoredLabel\": \"text\", \"runtimeBranch\": \"text\"} The conditional type checks authoredLabel; typeof performs the separate actual runtime classification."
    },
    {
      "id": "typescript-020.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The conditional type checks authoredLabel; typeof performs the separate actual runtime classification."
    },
    {
      "id": "typescript-020.q04",
      "level": "Debugging",
      "question": "Assigning a string to an extracted numeric element type. How would you fix it?",
      "answer": "Respect the selected type and implement any runtime branch separately."
    },
    {
      "id": "typescript-020.q05",
      "level": "Senior",
      "question": "What constraints matter when using Conditional types in production?",
      "answer": "Avoid expecting conditional types to execute runtime branches. Distributive conditional types operate across naked type-parameter unions; tuple-wrapping can disable distribution."
    },
    {
      "id": "typescript-020.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Describe reusable type relationships such as an array’s element type. Distributive conditional types operate across naked type-parameter unions; tuple-wrapping can disable distribution."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
