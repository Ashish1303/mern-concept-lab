import type { Lesson, RunContext } from '../lesson-types';

function example2(ctx: RunContext) {
  const value: unknown = JSON.parse(ctx.input); return { truthinessBranch: value ? 'present' : 'absent', precise: typeof value === 'string' ? `STRING:${value.toUpperCase()}` : 'not a string' };
}

export const lesson = {
  "id": "typescript-023",
  "description": "Control-flow narrowing refines a union after runtime checks and assignments. Truthiness is only one possible check.",
  "when": "Use typeof, in, instanceof or discriminants to select safe operations.",
  "avoid": "Avoid truthiness when empty strings and zero are valid members.",
  "tradeoff": "Narrowing follows code paths, not a permanent mutation of the declared variable type.",
  "mistakes": [
    {
      "problem": "Treating an empty string as if it were absent.",
      "fix": "Narrow by typeof or explicit null checks according to the contract."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-023.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-023.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "truthinessBranch": "absent",
        "precise": "STRING:"
      },
      "explanation": "The empty string is falsy but still safely narrowed as a string.",
      "runtime": "browser",
      "input": {
        "label": "JSON value",
        "initial": "\"\""
      },
      "id": "typescript-023.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-023.q01",
      "level": "Basic",
      "question": "What does Type narrowing mean here?",
      "answer": "Control-flow narrowing refines a union after runtime checks and assignments. Truthiness is only one possible check."
    },
    {
      "id": "typescript-023.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"truthinessBranch\": \"absent\", \"precise\": \"STRING:\"} The empty string is falsy but still safely narrowed as a string."
    },
    {
      "id": "typescript-023.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The empty string is falsy but still safely narrowed as a string."
    },
    {
      "id": "typescript-023.q04",
      "level": "Debugging",
      "question": "Treating an empty string as if it were absent. How would you fix it?",
      "answer": "Narrow by typeof or explicit null checks according to the contract."
    },
    {
      "id": "typescript-023.q05",
      "level": "Senior",
      "question": "What constraints matter when using Type narrowing in production?",
      "answer": "Avoid truthiness when empty strings and zero are valid members. Narrowing follows code paths, not a permanent mutation of the declared variable type."
    },
    {
      "id": "typescript-023.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use typeof, in, instanceof or discriminants to select safe operations. Narrowing follows code paths, not a permanent mutation of the declared variable type."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
