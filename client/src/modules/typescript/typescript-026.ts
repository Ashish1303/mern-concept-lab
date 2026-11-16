import type { Lesson, RunContext } from '../lesson-types';
import { capture } from '../runtime';

function example2(ctx: RunContext) {
  const value: unknown = JSON.parse(ctx.input); const claim = value as { name: string }; const wrong = capture(() => claim.name.toUpperCase());
  function assertUser(item: unknown): asserts item is { name: string } { if (typeof item !== 'object' || item === null || !('name' in item) || typeof item.name !== 'string') throw new Error('Invalid user'); }
  const validation = capture(() => { assertUser(value); return value.name.toUpperCase(); }); return { wrong, validation };
}

export const lesson = {
  "id": "typescript-026",
  "description": "A type assertion changes the compiler’s view but performs no runtime validation or conversion. Assertion functions can combine checks with narrowing.",
  "when": "Use assertions only when evidence outside the checker establishes the contract.",
  "avoid": "Avoid double assertions or blind casts on received JSON.",
  "tradeoff": "Assertions are erased and can create false confidence without executable evidence.",
  "mistakes": [
    {
      "problem": "Casting a numeric name to a string shape and expecting string methods to work.",
      "fix": "Validate before access, or use an assertion function that actually throws on a bad shape."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-026.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-026.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "wrong": "TypeError",
        "validation": "Error"
      },
      "explanation": "The assertion function executes a real check; the as expression does not.",
      "runtime": "browser",
      "input": {
        "label": "JSON user",
        "initial": "{\"name\":4}"
      },
      "id": "typescript-026.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-026.q01",
      "level": "Basic",
      "question": "What does Type assertions mean here?",
      "answer": "A type assertion changes the compiler’s view but performs no runtime validation or conversion. Assertion functions can combine checks with narrowing."
    },
    {
      "id": "typescript-026.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"wrong\": \"TypeError\", \"validation\": \"Error\"} The assertion function executes a real check; the as expression does not."
    },
    {
      "id": "typescript-026.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The assertion function executes a real check; the as expression does not."
    },
    {
      "id": "typescript-026.q04",
      "level": "Debugging",
      "question": "Casting a numeric name to a string shape and expecting string methods to work. How would you fix it?",
      "answer": "Validate before access, or use an assertion function that actually throws on a bad shape."
    },
    {
      "id": "typescript-026.q05",
      "level": "Senior",
      "question": "What constraints matter when using Type assertions in production?",
      "answer": "Avoid double assertions or blind casts on received JSON. Assertions are erased and can create false confidence without executable evidence."
    },
    {
      "id": "typescript-026.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use assertions only when evidence outside the checker establishes the contract. Assertions are erased and can create false confidence without executable evidence."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
