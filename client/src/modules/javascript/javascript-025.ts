import type { Lesson } from '../lesson-types';
import { capture } from '../runtime';

function example1() {
  const owner = { name: 'Ada', read() { return this.name; } };
  const detached = owner.read;
  const wrong = capture(() => Reflect.apply(detached, undefined, []));
  return [wrong, detached.bind(owner)()];
}

function example2() {
  function read(this: { value: number }) { return this.value; }
  return [read.call({ value: 1 }), read.call({ value: 2 })];
}

export const lesson = {
  "id": "javascript-025",
  "description": "Ordinary functions get this from their call form; arrows retain lexical this. Modules execute in strict mode.",
  "when": "Bind methods passed as callbacks when they need their original receiver.",
  "avoid": "Avoid detaching receiver-dependent methods without rebinding.",
  "tradeoff": "Binding creates a new function identity, which matters for listener cleanup.",
  "mistakes": [
    {
      "problem": "Passing an unbound method and losing this.",
      "fix": "Use bind or a wrapper that calls the method on its owner."
    }
  ],
  "examples": [
    {
      "title": "Detached method failure and bind fix",
      "expected": [
        "TypeError",
        "Ada"
      ],
      "explanation": "Strict-mode unbound invocation has undefined this; bind supplies the required owner.",
      "runtime": "browser",
      "id": "javascript-025.e01",
      "run": example1
    },
    {
      "title": "Receiver chosen at call time",
      "expected": [
        1,
        2
      ],
      "explanation": "The same function observes different receivers.",
      "runtime": "browser",
      "id": "javascript-025.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-025.q01",
      "level": "Basic",
      "question": "What does this keyword mean here?",
      "answer": "Ordinary functions get this from their call form; arrows retain lexical this. Modules execute in strict mode."
    },
    {
      "id": "javascript-025.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Detached method failure and bind fix”. Why?",
      "answer": "[\"TypeError\", \"Ada\"] Strict-mode unbound invocation has undefined this; bind supplies the required owner."
    },
    {
      "id": "javascript-025.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Strict-mode unbound invocation has undefined this; bind supplies the required owner. The same function observes different receivers."
    },
    {
      "id": "javascript-025.q04",
      "level": "Debugging",
      "question": "Passing an unbound method and losing this. How would you fix it?",
      "answer": "Use bind or a wrapper that calls the method on its owner."
    },
    {
      "id": "javascript-025.q05",
      "level": "Senior",
      "question": "What constraints matter when using this keyword in production?",
      "answer": "Avoid detaching receiver-dependent methods without rebinding. Binding creates a new function identity, which matters for listener cleanup."
    },
    {
      "id": "javascript-025.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Bind methods passed as callbacks when they need their original receiver. Binding creates a new function identity, which matters for listener cleanup."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
