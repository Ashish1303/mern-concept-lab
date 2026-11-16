import type { Lesson, RunContext } from '../lesson-types';

function example2(ctx: RunContext) {
  const value: unknown = JSON.parse(ctx.input); function isUser(item: unknown): item is { name: string } { return typeof item === 'object' && item !== null && 'name' in item && typeof item.name === 'string'; } return isUser(value) ? { valid: true, name: value.name.toUpperCase() } : { valid: false };
}

export const lesson = {
  "id": "typescript-022",
  "description": "A type guard uses runtime checks to narrow unknown data; a user-defined predicate tells the compiler what those checks establish.",
  "when": "Validate a boundary before accessing required fields.",
  "avoid": "Avoid predicates that claim a shape without checking every field the consumer needs.",
  "tradeoff": "A precise guard is executable validation, while a predicate annotation alone can be unsound.",
  "mistakes": [
    {
      "problem": "Declaring a predicate that returns true without validating the data.",
      "fix": "Implement and test the actual checks; the annotation itself is trusted by the compiler."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-022.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-022.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "valid": true,
        "name": "ADA"
      },
      "explanation": "The property access is reached only after the actual shape check.",
      "runtime": "browser",
      "input": {
        "label": "JSON user",
        "initial": "{\"name\":\"Ada\"}"
      },
      "id": "typescript-022.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-022.q01",
      "level": "Basic",
      "question": "What does Type guards mean here?",
      "answer": "A type guard uses runtime checks to narrow unknown data; a user-defined predicate tells the compiler what those checks establish."
    },
    {
      "id": "typescript-022.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"valid\": true, \"name\": \"ADA\"} The property access is reached only after the actual shape check."
    },
    {
      "id": "typescript-022.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The property access is reached only after the actual shape check."
    },
    {
      "id": "typescript-022.q04",
      "level": "Debugging",
      "question": "Declaring a predicate that returns true without validating the data. How would you fix it?",
      "answer": "Implement and test the actual checks; the annotation itself is trusted by the compiler."
    },
    {
      "id": "typescript-022.q05",
      "level": "Senior",
      "question": "What constraints matter when using Type guards in production?",
      "answer": "Avoid predicates that claim a shape without checking every field the consumer needs. A precise guard is executable validation, while a predicate annotation alone can be unsound."
    },
    {
      "id": "typescript-022.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Validate a boundary before accessing required fields. A precise guard is executable validation, while a predicate annotation alone can be unsound."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
