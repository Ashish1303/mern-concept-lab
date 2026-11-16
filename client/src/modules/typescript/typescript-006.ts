import type { Lesson } from '../lesson-types';

function example2() {
  type Combined = { name: string } & { active: boolean }; const value: Combined = Object.assign({ name: 'Ada' }, { active: true }); return value;
}

export const lesson = {
  "id": "typescript-006",
  "description": "Intersection types require all member contracts simultaneously rather than choosing one alternative.",
  "when": "Combine independent fields of one value.",
  "avoid": "Avoid intersecting incompatible property types and expecting a useful constructible value.",
  "tradeoff": "Intersections describe constraints; they do not merge objects at runtime.",
  "mistakes": [
    {
      "problem": "Supplying only one half of a combined contract.",
      "fix": "Construct a value satisfying both sides or use a union for alternatives."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-006.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-006.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "name": "Ada",
        "active": true
      },
      "explanation": "Object.assign performs the runtime merge; the intersection checks the resulting contract.",
      "runtime": "browser",
      "id": "typescript-006.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-006.q01",
      "level": "Basic",
      "question": "What does Intersection types mean here?",
      "answer": "Intersection types require all member contracts simultaneously rather than choosing one alternative."
    },
    {
      "id": "typescript-006.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"name\": \"Ada\", \"active\": true} Object.assign performs the runtime merge; the intersection checks the resulting contract."
    },
    {
      "id": "typescript-006.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. Object.assign performs the runtime merge; the intersection checks the resulting contract."
    },
    {
      "id": "typescript-006.q04",
      "level": "Debugging",
      "question": "Supplying only one half of a combined contract. How would you fix it?",
      "answer": "Construct a value satisfying both sides or use a union for alternatives."
    },
    {
      "id": "typescript-006.q05",
      "level": "Senior",
      "question": "What constraints matter when using Intersection types in production?",
      "answer": "Avoid intersecting incompatible property types and expecting a useful constructible value. Intersections describe constraints; they do not merge objects at runtime."
    },
    {
      "id": "typescript-006.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Combine independent fields of one value. Intersections describe constraints; they do not merge objects at runtime."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
