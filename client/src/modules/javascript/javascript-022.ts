import type { Lesson } from '../lesson-types';

function example1() {
  const outer = 'global';
  function create() { const outer = 'factory'; return () => outer; }
  return [create()(), outer];
}

function example2() {
  function create() { let current = 1; return { set: (value: number) => { current = value; }, get: () => current }; }
  const state = create(); const first = state.get(); state.set(5); return [first, state.get()];
}

export const lesson = {
  "id": "javascript-022",
  "description": "A lexical environment associates identifiers with bindings and an outer environment reference.",
  "when": "Reason about nested name resolution and retained state.",
  "avoid": "Avoid assuming that shadowed names update the outer binding.",
  "tradeoff": "Environment records are conceptual specification machinery, not objects application code can enumerate.",
  "mistakes": [
    {
      "problem": "Treating same-spelled names as one shared variable.",
      "fix": "Follow the environment chain from the current scope and distinguish shadowed declarations."
    }
  ],
  "examples": [
    {
      "title": "Nearest binding wins",
      "expected": [
        "factory",
        "global"
      ],
      "explanation": "The closure resolves its nearest outer environment before the global/module binding.",
      "runtime": "browser",
      "id": "javascript-022.e01",
      "run": example1
    },
    {
      "title": "Mutation of a retained binding",
      "expected": [
        1,
        5
      ],
      "explanation": "The environment remains reachable through the returned functions.",
      "runtime": "browser",
      "id": "javascript-022.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-022.q01",
      "level": "Basic",
      "question": "What does Lexical environment mean here?",
      "answer": "A lexical environment associates identifiers with bindings and an outer environment reference."
    },
    {
      "id": "javascript-022.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Nearest binding wins”. Why?",
      "answer": "[\"factory\", \"global\"] The closure resolves its nearest outer environment before the global/module binding."
    },
    {
      "id": "javascript-022.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The closure resolves its nearest outer environment before the global/module binding. The environment remains reachable through the returned functions."
    },
    {
      "id": "javascript-022.q04",
      "level": "Debugging",
      "question": "Treating same-spelled names as one shared variable. How would you fix it?",
      "answer": "Follow the environment chain from the current scope and distinguish shadowed declarations."
    },
    {
      "id": "javascript-022.q05",
      "level": "Senior",
      "question": "What constraints matter when using Lexical environment in production?",
      "answer": "Avoid assuming that shadowed names update the outer binding. Environment records are conceptual specification machinery, not objects application code can enumerate."
    },
    {
      "id": "javascript-022.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Reason about nested name resolution and retained state. Environment records are conceptual specification machinery, not objects application code can enumerate."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
