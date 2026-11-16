import type { Lesson } from '../lesson-types';

function example2() {
  interface User { name: string; active: boolean }
  const user: User = { name: 'Ada', active: true }; return { keys: Object.keys(user), greeting: `Hi ${user.name}` };
}

export const lesson = {
  "id": "typescript-003",
  "description": "Interfaces describe structural object contracts and can be extended or declaration-merged.",
  "when": "Describe object-shaped boundaries and extension points.",
  "avoid": "Avoid treating interfaces as runtime validators or nominal identities.",
  "tradeoff": "Structural compatibility accepts variables with additional fields, while fresh object literals undergo excess-property checks.",
  "mistakes": [
    {
      "problem": "Expecting the interface to create missing fields in received data.",
      "fix": "Construct or validate the required fields explicitly."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-003.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-003.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "keys": [
          "name",
          "active"
        ],
        "greeting": "Hi Ada"
      },
      "explanation": "The object has the fields supplied by its initializer, not by a runtime interface constructor.",
      "runtime": "browser",
      "id": "typescript-003.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-003.q01",
      "level": "Basic",
      "question": "What does Interfaces mean here?",
      "answer": "Interfaces describe structural object contracts and can be extended or declaration-merged."
    },
    {
      "id": "typescript-003.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"keys\": [\"name\", \"active\"], \"greeting\": \"Hi Ada\"} The object has the fields supplied by its initializer, not by a runtime interface constructor."
    },
    {
      "id": "typescript-003.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The object has the fields supplied by its initializer, not by a runtime interface constructor."
    },
    {
      "id": "typescript-003.q04",
      "level": "Debugging",
      "question": "Expecting the interface to create missing fields in received data. How would you fix it?",
      "answer": "Construct or validate the required fields explicitly."
    },
    {
      "id": "typescript-003.q05",
      "level": "Senior",
      "question": "What constraints matter when using Interfaces in production?",
      "answer": "Avoid treating interfaces as runtime validators or nominal identities. Structural compatibility accepts variables with additional fields, while fresh object literals undergo excess-property checks."
    },
    {
      "id": "typescript-003.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Describe object-shaped boundaries and extension points. Structural compatibility accepts variables with additional fields, while fresh object literals undergo excess-property checks."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
