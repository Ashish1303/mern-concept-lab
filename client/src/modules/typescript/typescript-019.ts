import type { Lesson } from '../lesson-types';

function example2() {
  type Flags<T> = { [K in keyof T]: boolean }; const flags: Flags<{ name: string; score: number }> = { name: true, score: false }; return { flags, keys: Object.keys(flags) };
}

export const lesson = {
  "id": "typescript-019",
  "description": "Mapped types transform properties over a key union, optionally adding or removing readonly/optional modifiers.",
  "when": "Derive flags or configuration contracts from an existing shape.",
  "avoid": "Avoid assuming a mapped type creates corresponding runtime properties.",
  "tradeoff": "Mapped types stay synchronized at compile time but runtime key enumeration still requires real values.",
  "mistakes": [
    {
      "problem": "Assigning string values to a boolean flag mapping.",
      "fix": "Construct the mapped fields with compatible values or generate runtime entries explicitly."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-019.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-019.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "flags": {
          "name": true,
          "score": false
        },
        "keys": [
          "name",
          "score"
        ]
      },
      "explanation": "The object literal creates properties; the mapped type only checks them.",
      "runtime": "browser",
      "id": "typescript-019.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-019.q01",
      "level": "Basic",
      "question": "What does Mapped types mean here?",
      "answer": "Mapped types transform properties over a key union, optionally adding or removing readonly/optional modifiers."
    },
    {
      "id": "typescript-019.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"flags\": {\"name\": true, \"score\": false}, \"keys\": [\"name\", \"score\"]} The object literal creates properties; the mapped type only checks them."
    },
    {
      "id": "typescript-019.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The object literal creates properties; the mapped type only checks them."
    },
    {
      "id": "typescript-019.q04",
      "level": "Debugging",
      "question": "Assigning string values to a boolean flag mapping. How would you fix it?",
      "answer": "Construct the mapped fields with compatible values or generate runtime entries explicitly."
    },
    {
      "id": "typescript-019.q05",
      "level": "Senior",
      "question": "What constraints matter when using Mapped types in production?",
      "answer": "Avoid assuming a mapped type creates corresponding runtime properties. Mapped types stay synchronized at compile time but runtime key enumeration still requires real values."
    },
    {
      "id": "typescript-019.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Derive flags or configuration contracts from an existing shape. Mapped types stay synchronized at compile time but runtime key enumeration still requires real values."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
