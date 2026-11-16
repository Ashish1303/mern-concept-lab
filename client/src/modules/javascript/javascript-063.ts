import type { Lesson, RunContext } from '../lesson-types';

function example1() {
  const trace: string[] = [];
  [1, 2].forEach(value => trace.push(`callback ${value}`)); trace.push('after'); return trace;
}

async function example2(ctx: RunContext) {
  const trace: string[] = [];
  const pending = ctx.delay(5).then(() => trace.push('callback')); trace.push('after schedule'); await pending; return trace;
}

export const lesson = {
  "id": "javascript-063",
  "description": "Callbacks supply behavior for another operation to invoke. Their timing is part of the receiving API’s contract.",
  "when": "Pass behavior into synchronous transformations or asynchronous event handlers.",
  "avoid": "Avoid assuming all callbacks run asynchronously.",
  "tradeoff": "A callback is a function value; scheduling behavior belongs to the API invoking it.",
  "mistakes": [
    {
      "problem": "Treating a synchronous map callback like a later timer callback.",
      "fix": "Read the API timing contract and trace calls before relying on their order."
    }
  ],
  "examples": [
    {
      "title": "Synchronous callback invocation",
      "expected": [
        "callback 1",
        "callback 2",
        "after"
      ],
      "explanation": "forEach invokes callbacks before returning.",
      "runtime": "browser",
      "id": "javascript-063.e01",
      "run": example1
    },
    {
      "title": "Asynchronous callback timing",
      "expected": [
        "after schedule",
        "callback"
      ],
      "explanation": "The callback waits for the promise returned by the real timer.",
      "runtime": "browser",
      "id": "javascript-063.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-063.q01",
      "level": "Basic",
      "question": "What does Callback functions mean here?",
      "answer": "Callbacks supply behavior for another operation to invoke. Their timing is part of the receiving API’s contract."
    },
    {
      "id": "javascript-063.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Synchronous callback invocation”. Why?",
      "answer": "[\"callback 1\", \"callback 2\", \"after\"] forEach invokes callbacks before returning."
    },
    {
      "id": "javascript-063.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "forEach invokes callbacks before returning. The callback waits for the promise returned by the real timer."
    },
    {
      "id": "javascript-063.q04",
      "level": "Debugging",
      "question": "Treating a synchronous map callback like a later timer callback. How would you fix it?",
      "answer": "Read the API timing contract and trace calls before relying on their order."
    },
    {
      "id": "javascript-063.q05",
      "level": "Senior",
      "question": "What constraints matter when using Callback functions in production?",
      "answer": "Avoid assuming all callbacks run asynchronously. A callback is a function value; scheduling behavior belongs to the API invoking it."
    },
    {
      "id": "javascript-063.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Pass behavior into synchronous transformations or asynchronous event handlers. A callback is a function value; scheduling behavior belongs to the API invoking it."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
