import type { Lesson } from '../lesson-types';

function example1() {
  const add = (a: number) => (b: number) => a + b;
  const addTen = add(10); return [typeof addTen, addTen(3)];
}

function example2() {
  const prefix = (label: string) => (value: string) => `${label}: ${value}`;
  const error = prefix('Error'); return [error('offline'), prefix('Info')('ready')];
}

export const lesson = {
  "id": "javascript-035",
  "description": "Currying turns a multi-argument function into a chain of single-argument functions.",
  "when": "Specialize reusable transformations by fixing configuration first.",
  "avoid": "Avoid excessive currying when a normal multi-argument function is clearer.",
  "tradeoff": "Currying creates closures; partial application and currying are related but distinct.",
  "mistakes": [
    {
      "problem": "Calling only the first stage and expecting a final number.",
      "fix": "Invoke each stage or deliberately keep the returned function for reuse."
    }
  ],
  "examples": [
    {
      "title": "Curried addition",
      "expected": [
        "function",
        13
      ],
      "explanation": "The first call produces a function, and the second computes the number.",
      "runtime": "browser",
      "id": "javascript-035.e01",
      "run": example1
    },
    {
      "title": "Specialize a formatter",
      "expected": [
        "Error: offline",
        "Info: ready"
      ],
      "explanation": "Configuration is captured independently from the later value.",
      "runtime": "browser",
      "id": "javascript-035.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-035.q01",
      "level": "Basic",
      "question": "What does Currying mean here?",
      "answer": "Currying turns a multi-argument function into a chain of single-argument functions."
    },
    {
      "id": "javascript-035.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Curried addition”. Why?",
      "answer": "[\"function\", 13] The first call produces a function, and the second computes the number."
    },
    {
      "id": "javascript-035.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The first call produces a function, and the second computes the number. Configuration is captured independently from the later value."
    },
    {
      "id": "javascript-035.q04",
      "level": "Debugging",
      "question": "Calling only the first stage and expecting a final number. How would you fix it?",
      "answer": "Invoke each stage or deliberately keep the returned function for reuse."
    },
    {
      "id": "javascript-035.q05",
      "level": "Senior",
      "question": "What constraints matter when using Currying in production?",
      "answer": "Avoid excessive currying when a normal multi-argument function is clearer. Currying creates closures; partial application and currying are related but distinct."
    },
    {
      "id": "javascript-035.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Specialize reusable transformations by fixing configuration first. Currying creates closures; partial application and currying are related but distinct."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
