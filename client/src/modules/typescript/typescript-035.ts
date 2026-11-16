import type { Lesson } from '../lesson-types';



export const lesson = {
  "id": "typescript-035",
  "description": "TypeScript configuration selects checking, module-resolution, emit and runtime-library assumptions. Compiler options change which programs are accepted.",
  "when": "Use strict checks and environment-specific projects for browser, server and fixtures.",
  "avoid": "Avoid choosing lib or target settings as if they installed runtime polyfills.",
  "tradeoff": "The actual fixture configuration is displayed with its real compiler result; enabling DOM types does not create a browser at runtime.",
  "mistakes": [
    {
      "problem": "Assuming an unchecked array access is guaranteed to return a number.",
      "fix": "Enable noUncheckedIndexedAccess and handle missing values explicitly."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-035.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-035.e01"
    },
    {
      "title": "Exact optional fields differ from explicit undefined",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-035.e02.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The actual fixture configuration enables exactOptionalPropertyTypes and strictNullChecks. The compiler checks absence separately from explicit undefined.",
      "id": "typescript-035.e02"
    }
  ],
  "questions": [
    {
      "id": "typescript-035.q01",
      "level": "Basic",
      "question": "What does TypeScript configuration mean here?",
      "answer": "TypeScript configuration selects checking, module-resolution, emit and runtime-library assumptions. Compiler options change which programs are accepted."
    },
    {
      "id": "typescript-035.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Compile-time contract: accepted and rejected code”. Why?",
      "answer": "\"The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.\" The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic."
    },
    {
      "id": "typescript-035.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The actual fixture configuration enables exactOptionalPropertyTypes and strictNullChecks. The compiler checks absence separately from explicit undefined."
    },
    {
      "id": "typescript-035.q04",
      "level": "Debugging",
      "question": "Assuming an unchecked array access is guaranteed to return a number. How would you fix it?",
      "answer": "Enable noUncheckedIndexedAccess and handle missing values explicitly."
    },
    {
      "id": "typescript-035.q05",
      "level": "Senior",
      "question": "What constraints matter when using TypeScript configuration in production?",
      "answer": "Avoid choosing lib or target settings as if they installed runtime polyfills. The actual fixture configuration is displayed with its real compiler result; enabling DOM types does not create a browser at runtime."
    },
    {
      "id": "typescript-035.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use strict checks and environment-specific projects for browser, server and fixtures. The actual fixture configuration is displayed with its real compiler result; enabling DOM types does not create a browser at runtime."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
