import type { Lesson } from '../lesson-types';

function example2() {
  const values = [1, 2]; values.push(3); return { values, kinds: values.map(value => typeof value) };
}

export const lesson = {
  "id": "typescript-002",
  "description": "Inference derives a type from an initializer and surrounding context without writing an annotation.",
  "when": "Keep clear local code concise while annotating public contracts when useful.",
  "avoid": "Avoid assuming an inferred numeric array will later accept strings.",
  "tradeoff": "Inference is compile-time reasoning; it does not add runtime collection checks.",
  "mistakes": [
    {
      "problem": "Pushing a string into an inferred number array.",
      "fix": "Preserve the homogeneous contract or declare an intentional union element type."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-002.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-002.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "values": [
          1,
          2,
          3
        ],
        "kinds": [
          "number",
          "number",
          "number"
        ]
      },
      "explanation": "The inferred type permits numeric pushes; normal JavaScript array behavior remains.",
      "runtime": "browser",
      "id": "typescript-002.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-002.q01",
      "level": "Basic",
      "question": "What does Type inference mean here?",
      "answer": "Inference derives a type from an initializer and surrounding context without writing an annotation."
    },
    {
      "id": "typescript-002.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"values\": [1, 2, 3], \"kinds\": [\"number\", \"number\", \"number\"]} The inferred type permits numeric pushes; normal JavaScript array behavior remains."
    },
    {
      "id": "typescript-002.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The inferred type permits numeric pushes; normal JavaScript array behavior remains."
    },
    {
      "id": "typescript-002.q04",
      "level": "Debugging",
      "question": "Pushing a string into an inferred number array. How would you fix it?",
      "answer": "Preserve the homogeneous contract or declare an intentional union element type."
    },
    {
      "id": "typescript-002.q05",
      "level": "Senior",
      "question": "What constraints matter when using Type inference in production?",
      "answer": "Avoid assuming an inferred numeric array will later accept strings. Inference is compile-time reasoning; it does not add runtime collection checks."
    },
    {
      "id": "typescript-002.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Keep clear local code concise while annotating public contracts when useful. Inference is compile-time reasoning; it does not add runtime collection checks."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
