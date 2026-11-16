import type { Lesson } from '../lesson-types';

function example2() {
  const pair: [string, number] = ['Ada', 5]; const [name, score] = pair; const empty: number[] = []; return { name, score, missing: String(empty[0]) };
}

export const lesson = {
  "id": "typescript-010",
  "description": "Arrays describe collections of elements; tuples describe a fixed or patterned positional contract.",
  "when": "Use tuples for meaningful positions and arrays for variable collections.",
  "avoid": "Avoid indexing an unchecked array and assuming an element exists.",
  "tradeoff": "noUncheckedIndexedAccess adds undefined to unchecked array reads; it does not add runtime bounds checks.",
  "mistakes": [
    {
      "problem": "Swapping the element types of a typed tuple.",
      "fix": "Use named tuple positions or an object when positional meaning becomes unclear."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-010.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-010.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "name": "Ada",
        "score": 5,
        "missing": "undefined"
      },
      "explanation": "Tuple destructuring reads the declared positions; an out-of-range array read still returns undefined.",
      "runtime": "browser",
      "id": "typescript-010.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-010.q01",
      "level": "Basic",
      "question": "What does Arrays and tuples mean here?",
      "answer": "Arrays describe collections of elements; tuples describe a fixed or patterned positional contract."
    },
    {
      "id": "typescript-010.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"name\": \"Ada\", \"score\": 5, \"missing\": \"undefined\"} Tuple destructuring reads the declared positions; an out-of-range array read still returns undefined."
    },
    {
      "id": "typescript-010.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. Tuple destructuring reads the declared positions; an out-of-range array read still returns undefined."
    },
    {
      "id": "typescript-010.q04",
      "level": "Debugging",
      "question": "Swapping the element types of a typed tuple. How would you fix it?",
      "answer": "Use named tuple positions or an object when positional meaning becomes unclear."
    },
    {
      "id": "typescript-010.q05",
      "level": "Senior",
      "question": "What constraints matter when using Arrays and tuples in production?",
      "answer": "Avoid indexing an unchecked array and assuming an element exists. noUncheckedIndexedAccess adds undefined to unchecked array reads; it does not add runtime bounds checks."
    },
    {
      "id": "typescript-010.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use tuples for meaningful positions and arrays for variable collections. noUncheckedIndexedAccess adds undefined to unchecked array reads; it does not add runtime bounds checks."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
