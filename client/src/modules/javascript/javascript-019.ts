import type { Lesson } from '../lesson-types';

function example1() {
  const user: { address?: { city: string } } = {};
  return String(user.address?.city);
}

function example2() {
  const data = { text: '', count: 0 };
  return [data.text?.length, data.count?.toFixed(1)];
}

export const lesson = {
  "id": "javascript-019",
  "description": "Optional chaining stops on null or undefined; it does not validate arbitrary runtime shapes.",
  "when": "Read legitimately optional nested fields and call optional callbacks.",
  "avoid": "Avoid using optional chaining to hide required-data contract failures.",
  "tradeoff": "A missing intermediate value yields undefined without evaluating the rest of that chain.",
  "mistakes": [
    {
      "problem": "Expecting ?. to treat every falsy value as absent.",
      "fix": "Use nullish-aware access and explicitly validate required properties."
    }
  ],
  "examples": [
    {
      "title": "Missing nested fields",
      "expected": "undefined",
      "explanation": "The missing address short-circuits the chain.",
      "runtime": "browser",
      "id": "javascript-019.e01",
      "run": example1
    },
    {
      "title": "Falsy values are preserved",
      "expected": [
        0,
        "0.0"
      ],
      "explanation": "Empty strings and zero are not nullish and their methods/properties are accessed.",
      "runtime": "browser",
      "id": "javascript-019.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-019.q01",
      "level": "Basic",
      "question": "What does Optional chaining mean here?",
      "answer": "Optional chaining stops on null or undefined; it does not validate arbitrary runtime shapes."
    },
    {
      "id": "javascript-019.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Missing nested fields”. Why?",
      "answer": "\"undefined\" The missing address short-circuits the chain."
    },
    {
      "id": "javascript-019.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The missing address short-circuits the chain. Empty strings and zero are not nullish and their methods/properties are accessed."
    },
    {
      "id": "javascript-019.q04",
      "level": "Debugging",
      "question": "Expecting ?. to treat every falsy value as absent. How would you fix it?",
      "answer": "Use nullish-aware access and explicitly validate required properties."
    },
    {
      "id": "javascript-019.q05",
      "level": "Senior",
      "question": "What constraints matter when using Optional chaining in production?",
      "answer": "Avoid using optional chaining to hide required-data contract failures. A missing intermediate value yields undefined without evaluating the rest of that chain."
    },
    {
      "id": "javascript-019.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Read legitimately optional nested fields and call optional callbacks. A missing intermediate value yields undefined without evaluating the rest of that chain."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
