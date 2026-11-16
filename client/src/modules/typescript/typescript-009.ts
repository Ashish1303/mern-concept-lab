import type { Lesson } from '../lesson-types';

function example2() {
  const mutable = { count: 1 }; const readonlyView: Readonly<typeof mutable> = mutable; mutable.count = 2;
  const frozen = Object.freeze({ count: 1 }); return { throughReadonlyAlias: readonlyView.count, frozenWrite: Reflect.set(frozen, 'count', 2) };
}

export const lesson = {
  "id": "typescript-009",
  "description": "Readonly properties prevent assignments through that typed reference, but do not inherently freeze runtime objects or nested values.",
  "when": "Express ownership intent at typed API boundaries.",
  "avoid": "Avoid using readonly as a security or runtime immutability boundary.",
  "tradeoff": "Readonly is shallow unless deeper types are constructed; Object.freeze is also shallow.",
  "mistakes": [
    {
      "problem": "Assuming another mutable alias cannot update the same object.",
      "fix": "Use runtime freezing when required and design ownership to avoid mutable aliases."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-009.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-009.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "throughReadonlyAlias": 2,
        "frozenWrite": false
      },
      "explanation": "The mutable alias changes the first object; the runtime freeze rejects a write to the second.",
      "runtime": "browser",
      "id": "typescript-009.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-009.q01",
      "level": "Basic",
      "question": "What does Readonly properties mean here?",
      "answer": "Readonly properties prevent assignments through that typed reference, but do not inherently freeze runtime objects or nested values."
    },
    {
      "id": "typescript-009.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"throughReadonlyAlias\": 2, \"frozenWrite\": false} The mutable alias changes the first object; the runtime freeze rejects a write to the second."
    },
    {
      "id": "typescript-009.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The mutable alias changes the first object; the runtime freeze rejects a write to the second."
    },
    {
      "id": "typescript-009.q04",
      "level": "Debugging",
      "question": "Assuming another mutable alias cannot update the same object. How would you fix it?",
      "answer": "Use runtime freezing when required and design ownership to avoid mutable aliases."
    },
    {
      "id": "typescript-009.q05",
      "level": "Senior",
      "question": "What constraints matter when using Readonly properties in production?",
      "answer": "Avoid using readonly as a security or runtime immutability boundary. Readonly is shallow unless deeper types are constructed; Object.freeze is also shallow."
    },
    {
      "id": "typescript-009.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Express ownership intent at typed API boundaries. Readonly is shallow unless deeper types are constructed; Object.freeze is also shallow."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
