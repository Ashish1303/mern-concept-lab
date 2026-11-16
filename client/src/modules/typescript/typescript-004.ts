import type { Lesson } from '../lesson-types';

function example2() {
  type Identifier = string | number; const identifiers: Identifier[] = ['user-1', 2]; return identifiers.map(value => ({ value, kind: typeof value }));
}

export const lesson = {
  "id": "typescript-004",
  "description": "Type aliases name arbitrary types, including unions, tuples and object shapes.",
  "when": "Name a reusable type expression or a domain union.",
  "avoid": "Avoid expecting alias declarations to produce runtime values.",
  "tradeoff": "Aliases cannot be reopened through declaration merging like interfaces, but can describe more than object shapes.",
  "mistakes": [
    {
      "problem": "Assigning a value outside the named union.",
      "fix": "Narrow the input or extend the union only if the domain actually permits it."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-004.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-004.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": [
        {
          "value": "user-1",
          "kind": "string"
        },
        {
          "value": 2,
          "kind": "number"
        }
      ],
      "explanation": "The alias disappears; the supplied JavaScript values retain their normal runtime kinds.",
      "runtime": "browser",
      "id": "typescript-004.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-004.q01",
      "level": "Basic",
      "question": "What does Type aliases mean here?",
      "answer": "Type aliases name arbitrary types, including unions, tuples and object shapes."
    },
    {
      "id": "typescript-004.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "[{\"value\": \"user-1\", \"kind\": \"string\"}, {\"value\": 2, \"kind\": \"number\"}] The alias disappears; the supplied JavaScript values retain their normal runtime kinds."
    },
    {
      "id": "typescript-004.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The alias disappears; the supplied JavaScript values retain their normal runtime kinds."
    },
    {
      "id": "typescript-004.q04",
      "level": "Debugging",
      "question": "Assigning a value outside the named union. How would you fix it?",
      "answer": "Narrow the input or extend the union only if the domain actually permits it."
    },
    {
      "id": "typescript-004.q05",
      "level": "Senior",
      "question": "What constraints matter when using Type aliases in production?",
      "answer": "Avoid expecting alias declarations to produce runtime values. Aliases cannot be reopened through declaration merging like interfaces, but can describe more than object shapes."
    },
    {
      "id": "typescript-004.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Name a reusable type expression or a domain union. Aliases cannot be reopened through declaration merging like interfaces, but can describe more than object shapes."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
