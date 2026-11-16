import type { Lesson } from '../lesson-types';

function example2() {
  function format(value: string | number) { return typeof value === 'string' ? value.toUpperCase() : value.toFixed(1); } return [format('mern'), format(3)];
}

export const lesson = {
  "id": "typescript-005",
  "description": "A union permits a value from any member type; operations must be safe for the currently narrowed member.",
  "when": "Represent alternatives and branch with runtime checks.",
  "avoid": "Avoid using a string-only method on an unnarrowed string-or-number value.",
  "tradeoff": "Narrowing improves precision without changing the actual JavaScript representation.",
  "mistakes": [
    {
      "problem": "Calling toUpperCase before checking which union member is present.",
      "fix": "Use typeof or a discriminant before the operation."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-005.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-005.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": [
        "MERN",
        "3.0"
      ],
      "explanation": "The same runtime typeof check selects the safe operation in each branch.",
      "runtime": "browser",
      "id": "typescript-005.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-005.q01",
      "level": "Basic",
      "question": "What does Union types mean here?",
      "answer": "A union permits a value from any member type; operations must be safe for the currently narrowed member."
    },
    {
      "id": "typescript-005.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "[\"MERN\", \"3.0\"] The same runtime typeof check selects the safe operation in each branch."
    },
    {
      "id": "typescript-005.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The same runtime typeof check selects the safe operation in each branch."
    },
    {
      "id": "typescript-005.q04",
      "level": "Debugging",
      "question": "Calling toUpperCase before checking which union member is present. How would you fix it?",
      "answer": "Use typeof or a discriminant before the operation."
    },
    {
      "id": "typescript-005.q05",
      "level": "Senior",
      "question": "What constraints matter when using Union types in production?",
      "answer": "Avoid using a string-only method on an unnarrowed string-or-number value. Narrowing improves precision without changing the actual JavaScript representation."
    },
    {
      "id": "typescript-005.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Represent alternatives and branch with runtime checks. Narrowing improves precision without changing the actual JavaScript representation."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
