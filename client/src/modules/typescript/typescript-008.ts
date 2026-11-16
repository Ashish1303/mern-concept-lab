import type { Lesson } from '../lesson-types';

function example2() {
  const user: { name: string; city?: string } = { name: 'Ada' }; return { hasCity: Object.hasOwn(user, 'city'), display: user.city ?? 'Unknown city' };
}

export const lesson = {
  "id": "typescript-008",
  "description": "Optional properties may be absent; a read must account for undefined. Exact optional property rules can distinguish absence from explicit undefined.",
  "when": "Model genuinely optional fields with safe access.",
  "avoid": "Avoid marking required data optional merely to silence an error.",
  "tradeoff": "The fixture compiler enables strict checking and exactOptionalPropertyTypes.",
  "mistakes": [
    {
      "problem": "Reading an optional string as if it were always present.",
      "fix": "Guard the field or use an explicitly chosen fallback."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-008.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-008.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "hasCity": false,
        "display": "Unknown city"
      },
      "explanation": "The missing property stays absent; the display fallback is an explicit runtime choice.",
      "runtime": "browser",
      "id": "typescript-008.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-008.q01",
      "level": "Basic",
      "question": "What does Optional properties mean here?",
      "answer": "Optional properties may be absent; a read must account for undefined. Exact optional property rules can distinguish absence from explicit undefined."
    },
    {
      "id": "typescript-008.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"hasCity\": false, \"display\": \"Unknown city\"} The missing property stays absent; the display fallback is an explicit runtime choice."
    },
    {
      "id": "typescript-008.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The missing property stays absent; the display fallback is an explicit runtime choice."
    },
    {
      "id": "typescript-008.q04",
      "level": "Debugging",
      "question": "Reading an optional string as if it were always present. How would you fix it?",
      "answer": "Guard the field or use an explicitly chosen fallback."
    },
    {
      "id": "typescript-008.q05",
      "level": "Senior",
      "question": "What constraints matter when using Optional properties in production?",
      "answer": "Avoid marking required data optional merely to silence an error. The fixture compiler enables strict checking and exactOptionalPropertyTypes."
    },
    {
      "id": "typescript-008.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Model genuinely optional fields with safe access. The fixture compiler enables strict checking and exactOptionalPropertyTypes."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
