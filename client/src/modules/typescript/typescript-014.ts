import type { Lesson } from '../lesson-types';

function example2() {
  function first<T>(values: T[]): T | undefined { return values[0]; } return [first(['Ada', 'Grace']), first([3, 4]), String(first<number>([]))];
}

export const lesson = {
  "id": "typescript-014",
  "description": "Generics preserve relationships between input and output types rather than erasing them to any.",
  "when": "Write reusable containers and transformations whose result type follows the supplied input.",
  "avoid": "Avoid adding a generic parameter that has no relationship to the function’s arguments or result.",
  "tradeoff": "Generics provide compile-time reuse; they do not instantiate new runtime code per type argument.",
  "mistakes": [
    {
      "problem": "Assigning a number inferred from identity to a string variable.",
      "fix": "Preserve the inferred type or perform an actual conversion."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-014.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-014.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": [
        "Ada",
        3,
        "undefined"
      ],
      "explanation": "One implementation works for different values and accurately allows an empty list.",
      "runtime": "browser",
      "id": "typescript-014.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-014.q01",
      "level": "Basic",
      "question": "What does Generics mean here?",
      "answer": "Generics preserve relationships between input and output types rather than erasing them to any."
    },
    {
      "id": "typescript-014.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "[\"Ada\", 3, \"undefined\"] One implementation works for different values and accurately allows an empty list."
    },
    {
      "id": "typescript-014.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. One implementation works for different values and accurately allows an empty list."
    },
    {
      "id": "typescript-014.q04",
      "level": "Debugging",
      "question": "Assigning a number inferred from identity to a string variable. How would you fix it?",
      "answer": "Preserve the inferred type or perform an actual conversion."
    },
    {
      "id": "typescript-014.q05",
      "level": "Senior",
      "question": "What constraints matter when using Generics in production?",
      "answer": "Avoid adding a generic parameter that has no relationship to the function’s arguments or result. Generics provide compile-time reuse; they do not instantiate new runtime code per type argument."
    },
    {
      "id": "typescript-014.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Write reusable containers and transformations whose result type follows the supplied input. Generics provide compile-time reuse; they do not instantiate new runtime code per type argument."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
