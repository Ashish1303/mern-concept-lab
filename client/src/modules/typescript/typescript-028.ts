import type { Lesson } from '../lesson-types';

async function example2() {
  async function load(): Promise<number> { await Promise.resolve(); return 3; } const promise = load(); const value: Awaited<ReturnType<typeof load>> = await promise; return { isPromise: promise instanceof Promise, value };
}

export const lesson = {
  "id": "typescript-028",
  "description": "Promise<T> describes a future fulfillment value and Awaited<T> unwraps promise-like types. Rejection reasons are not encoded as a second Promise type parameter.",
  "when": "Type asynchronous boundaries and narrow caught unknown errors.",
  "avoid": "Avoid assuming Promise<number> prevents the transport from returning unvalidated data.",
  "tradeoff": "Async typing models fulfillment relationships; runtime rejection handling and cancellation remain separate.",
  "mistakes": [
    {
      "problem": "Assigning a promise of text to a promise of number.",
      "fix": "Convert or validate the fulfilled value and await at the consuming boundary."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-028.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-028.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "isPromise": true,
        "value": 3
      },
      "explanation": "The runtime promise fulfills with a number and await yields its value.",
      "runtime": "browser",
      "id": "typescript-028.e02",
      "run": example2
    },
    {
      "title": "Catch variables are unknown",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-028.e03.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "A rejection can carry any value. Narrow it before assuming Error fields.",
      "id": "typescript-028.e03"
    },
    {
      "title": "Generic asynchronous result preservation",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-028.e04.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The type parameter preserves the relationship through Promise<T>.",
      "id": "typescript-028.e04"
    },
    {
      "title": "Promise.all tuple inference",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-028.e05.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The tuple input preserves positional types after all promises fulfill.",
      "id": "typescript-028.e05"
    }
  ],
  "questions": [
    {
      "id": "typescript-028.q01",
      "level": "Basic",
      "question": "What does Async types and Promise typing mean here?",
      "answer": "Promise<T> describes a future fulfillment value and Awaited<T> unwraps promise-like types. Rejection reasons are not encoded as a second Promise type parameter."
    },
    {
      "id": "typescript-028.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"isPromise\": true, \"value\": 3} The runtime promise fulfills with a number and await yields its value."
    },
    {
      "id": "typescript-028.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The runtime promise fulfills with a number and await yields its value."
    },
    {
      "id": "typescript-028.q04",
      "level": "Debugging",
      "question": "Assigning a promise of text to a promise of number. How would you fix it?",
      "answer": "Convert or validate the fulfilled value and await at the consuming boundary."
    },
    {
      "id": "typescript-028.q05",
      "level": "Senior",
      "question": "What constraints matter when using Async types and Promise typing in production?",
      "answer": "Avoid assuming Promise<number> prevents the transport from returning unvalidated data. Async typing models fulfillment relationships; runtime rejection handling and cancellation remain separate."
    },
    {
      "id": "typescript-028.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Type asynchronous boundaries and narrow caught unknown errors. Async typing models fulfillment relationships; runtime rejection handling and cancellation remain separate."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
