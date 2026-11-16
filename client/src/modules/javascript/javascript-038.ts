import type { Lesson } from '../lesson-types';

function example1() {
  const double = (n: number) => n * 2; const increment = (n: number) => n + 1;
  return [double(increment(3)), increment(double(3))];
}

function example2() {
  const pipeline = (...steps: ((value: string) => string)[]) => (input: string) => steps.reduce((value, step) => step(value), input);
  return pipeline(value => value.trim(), value => value.toLowerCase())('  MERN  ');
}

export const lesson = {
  "id": "javascript-038",
  "description": "Function composition connects the output of one operation to the input of another. Order changes behavior.",
  "when": "Build small, testable transformation pipelines.",
  "avoid": "Avoid composing incompatible input/output contracts.",
  "tradeoff": "Composed pure operations can be reused, but intermediate allocations can matter on large data.",
  "mistakes": [
    {
      "problem": "Reversing composition order and assuming operations commute.",
      "fix": "Trace intermediate results and make left-to-right or right-to-left order explicit."
    }
  ],
  "examples": [
    {
      "title": "Composition order changes the result",
      "expected": [
        8,
        7
      ],
      "explanation": "Increment-then-double differs from double-then-increment.",
      "runtime": "browser",
      "id": "javascript-038.e01",
      "run": example1
    },
    {
      "title": "Left-to-right pipeline",
      "expected": "mern",
      "explanation": "Each operation receives the previous operation’s output.",
      "runtime": "browser",
      "id": "javascript-038.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-038.q01",
      "level": "Basic",
      "question": "What does Function composition mean here?",
      "answer": "Function composition connects the output of one operation to the input of another. Order changes behavior."
    },
    {
      "id": "javascript-038.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Composition order changes the result”. Why?",
      "answer": "[8, 7] Increment-then-double differs from double-then-increment."
    },
    {
      "id": "javascript-038.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Increment-then-double differs from double-then-increment. Each operation receives the previous operation’s output."
    },
    {
      "id": "javascript-038.q04",
      "level": "Debugging",
      "question": "Reversing composition order and assuming operations commute. How would you fix it?",
      "answer": "Trace intermediate results and make left-to-right or right-to-left order explicit."
    },
    {
      "id": "javascript-038.q05",
      "level": "Senior",
      "question": "What constraints matter when using Function composition in production?",
      "answer": "Avoid composing incompatible input/output contracts. Composed pure operations can be reused, but intermediate allocations can matter on large data."
    },
    {
      "id": "javascript-038.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Build small, testable transformation pipelines. Composed pure operations can be reused, but intermediate allocations can matter on large data."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
