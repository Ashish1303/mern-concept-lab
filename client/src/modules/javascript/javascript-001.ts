import type { Lesson } from '../lesson-types';
import { capture } from '../runtime';

function example1() {
  // eslint-disable-next-line prefer-const -- Intentional language-semantics example; compare the result with the corrected alternative.
  let outer = 1;
  // eslint-disable-next-line no-var, prefer-const -- Intentional language-semantics example; compare the result with the corrected alternative.
  { let outer = 2; var escaped = outer; }
  return { outer, escaped };
}

function example2() {
  const settings = { theme: 'light' };
  settings.theme = 'dark';
  const frozen = Object.freeze({ theme: 'light' });
  const failure = capture(() => Reflect.set(frozen, 'theme', 'dark'));
  return { mutable: settings.theme, frozen: frozen.theme, writeSucceeded: failure };
}

export const lesson = {
  "id": "javascript-001",
  "description": "var is function-scoped; let and const are block-scoped. const prevents rebinding, not mutation.",
  "when": "Use const by default and let for intentional reassignment.",
  "avoid": "Avoid var in new code when a value must remain inside a block.",
  "tradeoff": "Block scope reduces accidental name sharing; freezing is a separate runtime operation.",
  "mistakes": [
    {
      "problem": "Treating const as a deep freeze.",
      "fix": "Update a const-bound object deliberately or freeze the required level; do not reassign the binding."
    }
  ],
  "examples": [
    {
      "title": "Block scope versus function scope",
      "expected": {
        "outer": 1,
        "escaped": 2
      },
      "explanation": "The inner let shadows the outer binding. var remains visible after the block.",
      "runtime": "browser",
      "id": "javascript-001.e01",
      "run": example1
    },
    {
      "title": "Constant binding, mutable contents",
      "expected": {
        "mutable": "dark",
        "frozen": "light",
        "writeSucceeded": false
      },
      "explanation": "const permits property mutation; freezing rejects the separate object write.",
      "runtime": "browser",
      "id": "javascript-001.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-001.q01",
      "level": "Basic",
      "question": "What does var, let, const mean here?",
      "answer": "var is function-scoped; let and const are block-scoped. const prevents rebinding, not mutation."
    },
    {
      "id": "javascript-001.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Block scope versus function scope”. Why?",
      "answer": "{\"outer\": 1, \"escaped\": 2} The inner let shadows the outer binding. var remains visible after the block."
    },
    {
      "id": "javascript-001.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The inner let shadows the outer binding. var remains visible after the block. const permits property mutation; freezing rejects the separate object write."
    },
    {
      "id": "javascript-001.q04",
      "level": "Debugging",
      "question": "Treating const as a deep freeze. How would you fix it?",
      "answer": "Update a const-bound object deliberately or freeze the required level; do not reassign the binding."
    },
    {
      "id": "javascript-001.q05",
      "level": "Senior",
      "question": "What constraints matter when using var, let, const in production?",
      "answer": "Avoid var in new code when a value must remain inside a block. Block scope reduces accidental name sharing; freezing is a separate runtime operation."
    },
    {
      "id": "javascript-001.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use const by default and let for intentional reassignment. Block scope reduces accidental name sharing; freezing is a separate runtime operation."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
