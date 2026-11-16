import type { Lesson } from '../lesson-types';



export const lesson = {
  "id": "typescript-033",
  "description": "Mongoose schema inference, hydrated document types and Model query types describe actual library contracts without performing a database operation.",
  "when": "Derive document fields from a schema instead of maintaining conflicting interfaces.",
  "avoid": "Avoid treating constructor typing as runtime schema validation or claiming a typecheck executed a database query.",
  "tradeoff": "These are compile-only fixtures against real Mongoose. No connection or MongoDB behavior is simulated.",
  "mistakes": [
    {
      "problem": "Assigning numeric data to an inferred required string property.",
      "fix": "Use InferSchemaType and distinguish HydratedDocument from lean data; validate writes in the actual database phase."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-033.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-033.e01"
    },
    {
      "title": "Hydrated fields and lean query inference",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-033.e02.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The query function is typechecked but never called. No database is connected; the report proves the real library typing only.",
      "id": "typescript-033.e02"
    }
  ],
  "questions": [
    {
      "id": "typescript-033.q01",
      "level": "Basic",
      "question": "What does Mongoose document and model typing mean here?",
      "answer": "Mongoose schema inference, hydrated document types and Model query types describe actual library contracts without performing a database operation."
    },
    {
      "id": "typescript-033.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Compile-time contract: accepted and rejected code”. Why?",
      "answer": "\"The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.\" The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic."
    },
    {
      "id": "typescript-033.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The query function is typechecked but never called. No database is connected; the report proves the real library typing only."
    },
    {
      "id": "typescript-033.q04",
      "level": "Debugging",
      "question": "Assigning numeric data to an inferred required string property. How would you fix it?",
      "answer": "Use InferSchemaType and distinguish HydratedDocument from lean data; validate writes in the actual database phase."
    },
    {
      "id": "typescript-033.q05",
      "level": "Senior",
      "question": "What constraints matter when using Mongoose document and model typing in production?",
      "answer": "Avoid treating constructor typing as runtime schema validation or claiming a typecheck executed a database query. These are compile-only fixtures against real Mongoose. No connection or MongoDB behavior is simulated."
    },
    {
      "id": "typescript-033.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Derive document fields from a schema instead of maintaining conflicting interfaces. These are compile-only fixtures against real Mongoose. No connection or MongoDB behavior is simulated."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
