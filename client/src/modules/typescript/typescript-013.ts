import type { Lesson } from '../lesson-types';

function example2() {
  function convert(value: string): number;
  function convert(value: number): string;
  function convert(value: string | number) { return typeof value === 'string' ? Number(value) : String(value); }
  return [convert('3'), convert(3)];
}

export const lesson = {
  "id": "typescript-013",
  "description": "Overload signatures describe permitted call/result relationships while one implementation handles all supported cases.",
  "when": "Model different outputs for distinct input forms.",
  "avoid": "Avoid assuming the implementation signature is an extra public overload.",
  "tradeoff": "A simpler union signature is preferable when callers do not need correlated return types.",
  "mistakes": [
    {
      "problem": "Calling an overloaded function with an unsupported boolean.",
      "fix": "Publish a matching overload only when the implementation truly handles that input."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-013.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-013.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": [
        3,
        "3"
      ],
      "explanation": "The runtime branch implements both overload contracts.",
      "runtime": "browser",
      "id": "typescript-013.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-013.q01",
      "level": "Basic",
      "question": "What does Function overloads mean here?",
      "answer": "Overload signatures describe permitted call/result relationships while one implementation handles all supported cases."
    },
    {
      "id": "typescript-013.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "[3, \"3\"] The runtime branch implements both overload contracts."
    },
    {
      "id": "typescript-013.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The runtime branch implements both overload contracts."
    },
    {
      "id": "typescript-013.q04",
      "level": "Debugging",
      "question": "Calling an overloaded function with an unsupported boolean. How would you fix it?",
      "answer": "Publish a matching overload only when the implementation truly handles that input."
    },
    {
      "id": "typescript-013.q05",
      "level": "Senior",
      "question": "What constraints matter when using Function overloads in production?",
      "answer": "Avoid assuming the implementation signature is an extra public overload. A simpler union signature is preferable when callers do not need correlated return types."
    },
    {
      "id": "typescript-013.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Model different outputs for distinct input forms. A simpler union signature is preferable when callers do not need correlated return types."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
