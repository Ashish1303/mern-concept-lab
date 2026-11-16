import type { Lesson } from '../lesson-types';

function example1() {
  const name = 'outer';
  function inner() { const name = 'inner'; return name; }
  return [inner(), name];
}

function example2() {
  let selected: string;
  { const candidate = 'Ada'; selected = candidate; }
  return selected;
}

export const lesson = {
  "id": "javascript-002",
  "description": "Scope controls where a binding can be resolved. A nearer binding shadows an outer one.",
  "when": "Keep temporary values inside the smallest useful function or block.",
  "avoid": "Avoid unrelated variables with the same name in large nested scopes.",
  "tradeoff": "Smaller scopes reduce accidental coupling without making data globally accessible.",
  "mistakes": [
    {
      "problem": "Expecting a block-local name outside its block.",
      "fix": "Return the needed value explicitly or declare the receiving binding in the enclosing scope."
    }
  ],
  "examples": [
    {
      "title": "Nested shadowing",
      "expected": [
        "inner",
        "outer"
      ],
      "explanation": "The function finds its own name first.",
      "runtime": "browser",
      "id": "javascript-002.e01",
      "run": example1
    },
    {
      "title": "Returning a block result",
      "expected": "Ada",
      "explanation": "An outer binding carries the result without exposing the temporary candidate.",
      "runtime": "browser",
      "id": "javascript-002.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-002.q01",
      "level": "Basic",
      "question": "What does Scope mean here?",
      "answer": "Scope controls where a binding can be resolved. A nearer binding shadows an outer one."
    },
    {
      "id": "javascript-002.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Nested shadowing”. Why?",
      "answer": "[\"inner\", \"outer\"] The function finds its own name first."
    },
    {
      "id": "javascript-002.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The function finds its own name first. An outer binding carries the result without exposing the temporary candidate."
    },
    {
      "id": "javascript-002.q04",
      "level": "Debugging",
      "question": "Expecting a block-local name outside its block. How would you fix it?",
      "answer": "Return the needed value explicitly or declare the receiving binding in the enclosing scope."
    },
    {
      "id": "javascript-002.q05",
      "level": "Senior",
      "question": "What constraints matter when using Scope in production?",
      "answer": "Avoid unrelated variables with the same name in large nested scopes. Smaller scopes reduce accidental coupling without making data globally accessible."
    },
    {
      "id": "javascript-002.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Keep temporary values inside the smallest useful function or block. Smaller scopes reduce accidental coupling without making data globally accessible."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
