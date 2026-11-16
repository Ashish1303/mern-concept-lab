import type { Lesson, RunContext } from '../lesson-types';
import { integer } from '../runtime';

function example2(ctx: RunContext) {
  const value: number = integer(ctx.input); return { value, runtimeType: typeof value };
}

export const lesson = {
  "id": "typescript-001",
  "description": "Type annotations constrain permitted values before execution; JavaScript values still have runtime types.",
  "when": "Annotate boundaries and let local obvious values infer their types.",
  "avoid": "Avoid assuming an annotation converts external text into a number.",
  "tradeoff": "Type checking catches incompatible assignments but types are erased from emitted JavaScript.",
  "mistakes": [
    {
      "problem": "Assigning numeric text to a number variable without conversion.",
      "fix": "Parse and validate external input; keep the number annotation as a compile-time contract."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-001.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-001.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "value": 3,
        "runtimeType": "number"
      },
      "explanation": "The parser performs the runtime conversion; the annotation alone does not.",
      "runtime": "browser",
      "input": {
        "label": "Integer 0–100",
        "initial": "3"
      },
      "id": "typescript-001.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-001.q01",
      "level": "Basic",
      "question": "What does Basic types mean here?",
      "answer": "Type annotations constrain permitted values before execution; JavaScript values still have runtime types."
    },
    {
      "id": "typescript-001.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"value\": 3, \"runtimeType\": \"number\"} The parser performs the runtime conversion; the annotation alone does not."
    },
    {
      "id": "typescript-001.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The parser performs the runtime conversion; the annotation alone does not."
    },
    {
      "id": "typescript-001.q04",
      "level": "Debugging",
      "question": "Assigning numeric text to a number variable without conversion. How would you fix it?",
      "answer": "Parse and validate external input; keep the number annotation as a compile-time contract."
    },
    {
      "id": "typescript-001.q05",
      "level": "Senior",
      "question": "What constraints matter when using Basic types in production?",
      "answer": "Avoid assuming an annotation converts external text into a number. Type checking catches incompatible assignments but types are erased from emitted JavaScript."
    },
    {
      "id": "typescript-001.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Annotate boundaries and let local obvious values infer their types. Type checking catches incompatible assignments but types are erased from emitted JavaScript."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
