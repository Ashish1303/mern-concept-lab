import type { Lesson } from '../lesson-types';
import { capture } from '../runtime';

function example1() {
  const read = () => value;
  const before = capture(read);
  const value = 7;
  return [before, read()];
}

function example2() {
  const inspect = () => typeof status;
  const before = capture(inspect);
  const status = 'ready';
  return [before, inspect()];
}

export const lesson = {
  "id": "javascript-005",
  "description": "A let or const binding exists from scope entry but cannot be accessed until its initialization executes.",
  "when": "Use the TDZ to explain initialization errors, including typeof on lexical bindings.",
  "avoid": "Avoid invoking closures before the values they read are initialized.",
  "tradeoff": "TDZ checks expose ordering bugs rather than silently yielding undefined.",
  "mistakes": [
    {
      "problem": "Assuming typeof is always safe for an uninitialized lexical variable.",
      "fix": "Move the call after initialization; typeof only safely handles undeclared names outside the TDZ."
    }
  ],
  "examples": [
    {
      "title": "Early closure read and corrected order",
      "expected": [
        "ReferenceError",
        7
      ],
      "explanation": "The first closure call enters the TDZ; the second follows initialization.",
      "runtime": "browser",
      "id": "javascript-005.e01",
      "run": example1
    },
    {
      "title": "typeof also observes the TDZ",
      "expected": [
        "ReferenceError",
        "string"
      ],
      "explanation": "typeof does not bypass an existing lexical binding’s TDZ.",
      "runtime": "browser",
      "id": "javascript-005.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-005.q01",
      "level": "Basic",
      "question": "What does Temporal Dead Zone mean here?",
      "answer": "A let or const binding exists from scope entry but cannot be accessed until its initialization executes."
    },
    {
      "id": "javascript-005.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Early closure read and corrected order”. Why?",
      "answer": "[\"ReferenceError\", 7] The first closure call enters the TDZ; the second follows initialization."
    },
    {
      "id": "javascript-005.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The first closure call enters the TDZ; the second follows initialization. typeof does not bypass an existing lexical binding’s TDZ."
    },
    {
      "id": "javascript-005.q04",
      "level": "Debugging",
      "question": "Assuming typeof is always safe for an uninitialized lexical variable. How would you fix it?",
      "answer": "Move the call after initialization; typeof only safely handles undeclared names outside the TDZ."
    },
    {
      "id": "javascript-005.q05",
      "level": "Senior",
      "question": "What constraints matter when using Temporal Dead Zone in production?",
      "answer": "Avoid invoking closures before the values they read are initialized. TDZ checks expose ordering bugs rather than silently yielding undefined."
    },
    {
      "id": "javascript-005.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use the TDZ to explain initialization errors, including typeof on lexical bindings. TDZ checks expose ordering bugs rather than silently yielding undefined."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
