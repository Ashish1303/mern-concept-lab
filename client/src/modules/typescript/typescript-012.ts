import type { Lesson, RunContext } from '../lesson-types';
import { integer } from '../runtime';

function example2(ctx: RunContext) {
  function double(value: number): number { return value * 2; } return double(integer(ctx.input));
}

export const lesson = {
  "id": "typescript-012",
  "description": "Function signatures describe parameter, optional/rest and return contracts checked at call sites.",
  "when": "Document boundary inputs and outputs and let implementation details infer naturally.",
  "avoid": "Avoid assuming a typed parameter sanitizes user input at runtime.",
  "tradeoff": "Signatures are erased, so runtime validation is still needed for untyped callers.",
  "mistakes": [
    {
      "problem": "Passing a string to a numeric function and expecting the annotation to convert it.",
      "fix": "Validate/convert before the call and keep the function contract precise."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-012.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-012.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": 6,
      "explanation": "The runtime parser checks input before the typed function is called.",
      "runtime": "browser",
      "input": {
        "label": "Integer 0–100",
        "initial": "3"
      },
      "id": "typescript-012.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-012.q01",
      "level": "Basic",
      "question": "What does Functions and parameter types mean here?",
      "answer": "Function signatures describe parameter, optional/rest and return contracts checked at call sites."
    },
    {
      "id": "typescript-012.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "6 The runtime parser checks input before the typed function is called."
    },
    {
      "id": "typescript-012.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The runtime parser checks input before the typed function is called."
    },
    {
      "id": "typescript-012.q04",
      "level": "Debugging",
      "question": "Passing a string to a numeric function and expecting the annotation to convert it. How would you fix it?",
      "answer": "Validate/convert before the call and keep the function contract precise."
    },
    {
      "id": "typescript-012.q05",
      "level": "Senior",
      "question": "What constraints matter when using Functions and parameter types in production?",
      "answer": "Avoid assuming a typed parameter sanitizes user input at runtime. Signatures are erased, so runtime validation is still needed for untyped callers."
    },
    {
      "id": "typescript-012.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Document boundary inputs and outputs and let implementation details infer naturally. Signatures are erased, so runtime validation is still needed for untyped callers."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
