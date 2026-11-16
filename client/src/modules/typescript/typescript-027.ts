import type { Lesson } from '../lesson-types';

function example2() {
  class Soft { private balance = 4; read() { return this.balance; } } class Hard { #balance = 5; read() { return this.#balance; } }
  const soft = new Soft(); const hard = new Hard(); return { softRead: soft.read(), reflectedSoft: Reflect.get(soft, 'balance'), hardRead: hard.read(), reflectedHard: String(Reflect.get(hard, '#balance')) };
}

export const lesson = {
  "id": "typescript-027",
  "description": "TypeScript private/protected modifiers constrain typed access; JavaScript #private fields additionally enforce runtime privacy.",
  "when": "Express visibility and inheritance rules, choosing runtime private fields when needed.",
  "avoid": "Avoid treating the TypeScript private keyword as a security boundary against arbitrary JavaScript reflection.",
  "tradeoff": "Protected permits subclass access in typed code; public/private keywords do not by themselves rewrite ordinary property storage.",
  "mistakes": [
    {
      "problem": "Assuming erased access modifiers prevent runtime reflection.",
      "fix": "Use #private for runtime-enforced encapsulation and validate external data separately."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-027.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-027.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "softRead": 4,
        "reflectedSoft": 4,
        "hardRead": 5,
        "reflectedHard": "undefined"
      },
      "explanation": "The ordinary private-keyword property still exists, while a #private slot is not a string-named property.",
      "runtime": "browser",
      "id": "typescript-027.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-027.q01",
      "level": "Basic",
      "question": "What does Classes and access modifiers mean here?",
      "answer": "TypeScript private/protected modifiers constrain typed access; JavaScript #private fields additionally enforce runtime privacy."
    },
    {
      "id": "typescript-027.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"softRead\": 4, \"reflectedSoft\": 4, \"hardRead\": 5, \"reflectedHard\": \"undefined\"} The ordinary private-keyword property still exists, while a #private slot is not a string-named property."
    },
    {
      "id": "typescript-027.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The ordinary private-keyword property still exists, while a #private slot is not a string-named property."
    },
    {
      "id": "typescript-027.q04",
      "level": "Debugging",
      "question": "Assuming erased access modifiers prevent runtime reflection. How would you fix it?",
      "answer": "Use #private for runtime-enforced encapsulation and validate external data separately."
    },
    {
      "id": "typescript-027.q05",
      "level": "Senior",
      "question": "What constraints matter when using Classes and access modifiers in production?",
      "answer": "Avoid treating the TypeScript private keyword as a security boundary against arbitrary JavaScript reflection. Protected permits subclass access in typed code; public/private keywords do not by themselves rewrite ordinary property storage."
    },
    {
      "id": "typescript-027.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Express visibility and inheritance rules, choosing runtime private fields when needed. Protected permits subclass access in typed code; public/private keywords do not by themselves rewrite ordinary property storage."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
