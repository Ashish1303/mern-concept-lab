import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';

function example2(ctx: RunContext) {
  function lengthOf<T extends { length: number }>(value: T) { return value.length; } return [lengthOf(text(ctx.input)), lengthOf([1, 2])];
}

export const lesson = {
  "id": "typescript-015",
  "description": "Generic constraints require a type argument to support the operations used by the implementation.",
  "when": "Access a known property while preserving the full input type.",
  "avoid": "Avoid constraining more fields than the operation actually needs.",
  "tradeoff": "Constraints restrict accepted types; they do not generate or validate properties at runtime.",
  "mistakes": [
    {
      "problem": "Reading length on an unconstrained arbitrary type.",
      "fix": "Constrain to a length-bearing contract or narrow at runtime."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-015.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-015.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": [
        4,
        2
      ],
      "explanation": "Strings and arrays both satisfy the required property contract.",
      "runtime": "browser",
      "input": {
        "label": "Text",
        "initial": "MERN"
      },
      "id": "typescript-015.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-015.q01",
      "level": "Basic",
      "question": "What does Generic constraints mean here?",
      "answer": "Generic constraints require a type argument to support the operations used by the implementation."
    },
    {
      "id": "typescript-015.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "[4, 2] Strings and arrays both satisfy the required property contract."
    },
    {
      "id": "typescript-015.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. Strings and arrays both satisfy the required property contract."
    },
    {
      "id": "typescript-015.q04",
      "level": "Debugging",
      "question": "Reading length on an unconstrained arbitrary type. How would you fix it?",
      "answer": "Constrain to a length-bearing contract or narrow at runtime."
    },
    {
      "id": "typescript-015.q05",
      "level": "Senior",
      "question": "What constraints matter when using Generic constraints in production?",
      "answer": "Avoid constraining more fields than the operation actually needs. Constraints restrict accepted types; they do not generate or validate properties at runtime."
    },
    {
      "id": "typescript-015.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Access a known property while preserving the full input type. Constraints restrict accepted types; they do not generate or validate properties at runtime."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
