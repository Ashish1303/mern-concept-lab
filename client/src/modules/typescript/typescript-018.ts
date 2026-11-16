import type { Lesson } from '../lesson-types';

function example2() {
  type User = { profile: { name: string } }; const user: User = { profile: { name: 'Ada' } }; const name: User['profile']['name'] = user.profile.name; return name;
}

export const lesson = {
  "id": "typescript-018",
  "description": "Indexed access types extract a property or element type from another type.",
  "when": "Keep dependent contracts synchronized when a source type changes.",
  "avoid": "Avoid confusing a type-level property lookup with a runtime value read.",
  "tradeoff": "Type-level lookup cannot guarantee an external object actually has that field.",
  "mistakes": [
    {
      "problem": "Assigning an incompatible value to an extracted nested-property type.",
      "fix": "Derive the property type and provide a genuinely compatible value."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-018.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-018.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": "Ada",
      "explanation": "The type expression checks the assignment while ordinary property access reads the value.",
      "runtime": "browser",
      "id": "typescript-018.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-018.q01",
      "level": "Basic",
      "question": "What does Indexed access types mean here?",
      "answer": "Indexed access types extract a property or element type from another type."
    },
    {
      "id": "typescript-018.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "\"Ada\" The type expression checks the assignment while ordinary property access reads the value."
    },
    {
      "id": "typescript-018.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The type expression checks the assignment while ordinary property access reads the value."
    },
    {
      "id": "typescript-018.q04",
      "level": "Debugging",
      "question": "Assigning an incompatible value to an extracted nested-property type. How would you fix it?",
      "answer": "Derive the property type and provide a genuinely compatible value."
    },
    {
      "id": "typescript-018.q05",
      "level": "Senior",
      "question": "What constraints matter when using Indexed access types in production?",
      "answer": "Avoid confusing a type-level property lookup with a runtime value read. Type-level lookup cannot guarantee an external object actually has that field."
    },
    {
      "id": "typescript-018.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Keep dependent contracts synchronized when a source type changes. Type-level lookup cannot guarantee an external object actually has that field."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
