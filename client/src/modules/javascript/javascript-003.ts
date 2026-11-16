import type { Lesson } from '../lesson-types';

function example1() {
  const name = 'definition';
  function read() { return name; }
  function caller() { const name = 'caller'; return [name, read()]; }
  return caller();
}

function example2() {
  const build = (label: string) => () => label;
  const first = build('first');
  const second = build('second');
  return [first(), second()];
}

export const lesson = {
  "id": "javascript-003",
  "description": "Lexical scope resolves identifiers from where a function is defined, not where it is called.",
  "when": "Use lexical bindings to supply stable dependencies to callbacks.",
  "avoid": "Avoid assuming the caller can replace a function’s captured variables.",
  "tradeoff": "Lexical lookup is predictable; captured references can still retain objects.",
  "mistakes": [
    {
      "problem": "Expecting a caller-local variable to change a callee’s free variable.",
      "fix": "Pass the dependency as a parameter or create a new closure in the desired scope."
    }
  ],
  "examples": [
    {
      "title": "Definition site wins",
      "expected": [
        "caller",
        "definition"
      ],
      "explanation": "read resolves name through its definition environment.",
      "runtime": "browser",
      "id": "javascript-003.e01",
      "run": example1
    },
    {
      "title": "Explicit dependency injection",
      "expected": [
        "first",
        "second"
      ],
      "explanation": "Each closure receives a separate lexical environment.",
      "runtime": "browser",
      "id": "javascript-003.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-003.q01",
      "level": "Basic",
      "question": "What does Lexical scope mean here?",
      "answer": "Lexical scope resolves identifiers from where a function is defined, not where it is called."
    },
    {
      "id": "javascript-003.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Definition site wins”. Why?",
      "answer": "[\"caller\", \"definition\"] read resolves name through its definition environment."
    },
    {
      "id": "javascript-003.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "read resolves name through its definition environment. Each closure receives a separate lexical environment."
    },
    {
      "id": "javascript-003.q04",
      "level": "Debugging",
      "question": "Expecting a caller-local variable to change a callee’s free variable. How would you fix it?",
      "answer": "Pass the dependency as a parameter or create a new closure in the desired scope."
    },
    {
      "id": "javascript-003.q05",
      "level": "Senior",
      "question": "What constraints matter when using Lexical scope in production?",
      "answer": "Avoid assuming the caller can replace a function’s captured variables. Lexical lookup is predictable; captured references can still retain objects."
    },
    {
      "id": "javascript-003.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use lexical bindings to supply stable dependencies to callbacks. Lexical lookup is predictable; captured references can still retain objects."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
