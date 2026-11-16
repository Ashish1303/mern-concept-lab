import type { Lesson } from '../lesson-types';

function example1() {
  return greeting();
  function greeting() { return 'hello'; }
}

function example2() {
  const read = () => value;
  const before = read();
  // eslint-disable-next-line no-var -- Intentional language-semantics example; compare the result with the corrected alternative.
  var value = 3;
  return [String(before), read()];
}

export const lesson = {
  "id": "javascript-004",
  "description": "Declarations are instantiated before execution, but initialization rules differ between functions, var and lexical bindings.",
  "when": "Understand declaration timing when reading legacy code and output questions.",
  "avoid": "Avoid relying on hoisting to obscure initialization order.",
  "tradeoff": "Function declarations can be called early; var reads undefined and let/const remain in the TDZ.",
  "mistakes": [
    {
      "problem": "Reading a lexical value before initialization.",
      "fix": "Initialize before calling code that reads the binding."
    }
  ],
  "examples": [
    {
      "title": "Function declaration before its line",
      "expected": "hello",
      "explanation": "The function declaration is available when its enclosing scope starts executing.",
      "runtime": "browser",
      "id": "javascript-004.e01",
      "run": example1
    },
    {
      "title": "var starts undefined",
      "expected": [
        "undefined",
        3
      ],
      "explanation": "The var binding exists before assignment, unlike a lexical binding in the TDZ.",
      "runtime": "browser",
      "id": "javascript-004.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-004.q01",
      "level": "Basic",
      "question": "What does Hoisting mean here?",
      "answer": "Declarations are instantiated before execution, but initialization rules differ between functions, var and lexical bindings."
    },
    {
      "id": "javascript-004.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Function declaration before its line”. Why?",
      "answer": "\"hello\" The function declaration is available when its enclosing scope starts executing."
    },
    {
      "id": "javascript-004.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The function declaration is available when its enclosing scope starts executing. The var binding exists before assignment, unlike a lexical binding in the TDZ."
    },
    {
      "id": "javascript-004.q04",
      "level": "Debugging",
      "question": "Reading a lexical value before initialization. How would you fix it?",
      "answer": "Initialize before calling code that reads the binding."
    },
    {
      "id": "javascript-004.q05",
      "level": "Senior",
      "question": "What constraints matter when using Hoisting in production?",
      "answer": "Avoid relying on hoisting to obscure initialization order. Function declarations can be called early; var reads undefined and let/const remain in the TDZ."
    },
    {
      "id": "javascript-004.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Understand declaration timing when reading legacy code and output questions. Function declarations can be called early; var reads undefined and let/const remain in the TDZ."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
