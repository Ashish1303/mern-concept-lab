import type { Lesson } from '../lesson-types';

function example2() {
  enum Numeric { Ready, Done }
  const Literal = { Ready: 'ready', Done: 'done' } as const;
  return { numeric: Numeric.Ready, reverse: Numeric[0], literal: Literal.Ready, hasNumericReverse: Object.hasOwn(Literal, '0') };
}

export const lesson = {
  "id": "typescript-011",
  "description": "Enums emit runtime mappings; a const object plus a literal union can provide an alternative without enum reverse mappings.",
  "when": "Choose a finite-value representation whose runtime output is understood.",
  "avoid": "Avoid assuming string enums and numeric enums have identical reverse lookup behavior.",
  "tradeoff": "Numeric enums emit reverse names; const objects have only the properties explicitly supplied.",
  "mistakes": [
    {
      "problem": "Treating an enum-like const object as automatically runtime-validated input.",
      "fix": "Validate external values even when a type restricts application-authored values."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-011.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-011.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "numeric": 0,
        "reverse": "Ready",
        "literal": "ready",
        "hasNumericReverse": false
      },
      "explanation": "The real emitted enum has a reverse mapping while the const object does not.",
      "runtime": "browser",
      "id": "typescript-011.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-011.q01",
      "level": "Basic",
      "question": "What does Enums and enum alternatives mean here?",
      "answer": "Enums emit runtime mappings; a const object plus a literal union can provide an alternative without enum reverse mappings."
    },
    {
      "id": "typescript-011.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"numeric\": 0, \"reverse\": \"Ready\", \"literal\": \"ready\", \"hasNumericReverse\": false} The real emitted enum has a reverse mapping while the const object does not."
    },
    {
      "id": "typescript-011.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The real emitted enum has a reverse mapping while the const object does not."
    },
    {
      "id": "typescript-011.q04",
      "level": "Debugging",
      "question": "Treating an enum-like const object as automatically runtime-validated input. How would you fix it?",
      "answer": "Validate external values even when a type restricts application-authored values."
    },
    {
      "id": "typescript-011.q05",
      "level": "Senior",
      "question": "What constraints matter when using Enums and enum alternatives in production?",
      "answer": "Avoid assuming string enums and numeric enums have identical reverse lookup behavior. Numeric enums emit reverse names; const objects have only the properties explicitly supplied."
    },
    {
      "id": "typescript-011.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Choose a finite-value representation whose runtime output is understood. Numeric enums emit reverse names; const objects have only the properties explicitly supplied."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
