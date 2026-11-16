import type { Lesson } from '../lesson-types';

function example2() {
  return { number: typeof 3, null: typeof null, array: typeof [], isArray: Array.isArray([]) };
}

export const lesson = {
  "id": "typescript-017",
  "description": "In a type position typeof derives a type from a value declaration; runtime typeof returns broad JavaScript category strings.",
  "when": "Reuse a configuration value’s shape in another contract.",
  "avoid": "Avoid assuming runtime typeof precisely distinguishes arrays, null or domain objects.",
  "tradeoff": "A type query is erased; the runtime operator still follows JavaScript rules.",
  "mistakes": [
    {
      "problem": "Treating typeof null as a null-specific validator.",
      "fix": "Check null explicitly and use Array.isArray for array detection."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-017.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-017.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "number": "number",
        "null": "object",
        "array": "object",
        "isArray": true
      },
      "explanation": "Runtime category inspection is deliberately broader than a structural TypeScript type.",
      "runtime": "browser",
      "id": "typescript-017.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-017.q01",
      "level": "Basic",
      "question": "What does typeof mean here?",
      "answer": "In a type position typeof derives a type from a value declaration; runtime typeof returns broad JavaScript category strings."
    },
    {
      "id": "typescript-017.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"number\": \"number\", \"null\": \"object\", \"array\": \"object\", \"isArray\": true} Runtime category inspection is deliberately broader than a structural TypeScript type."
    },
    {
      "id": "typescript-017.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. Runtime category inspection is deliberately broader than a structural TypeScript type."
    },
    {
      "id": "typescript-017.q04",
      "level": "Debugging",
      "question": "Treating typeof null as a null-specific validator. How would you fix it?",
      "answer": "Check null explicitly and use Array.isArray for array detection."
    },
    {
      "id": "typescript-017.q05",
      "level": "Senior",
      "question": "What constraints matter when using typeof in production?",
      "answer": "Avoid assuming runtime typeof precisely distinguishes arrays, null or domain objects. A type query is erased; the runtime operator still follows JavaScript rules."
    },
    {
      "id": "typescript-017.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Reuse a configuration value’s shape in another contract. A type query is erased; the runtime operator still follows JavaScript rules."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
