import type { Lesson } from '../lesson-types';

function example1() {
  function total(this: { base: number }, a: number, b: number) { return this.base + a + b; }
  return [total.call({ base: 10 }, 1, 2), total.apply({ base: 20 }, [1, 2])];
}

function example2() {
  function total(this: { base: number }, a: number, b: number) { return this.base + a + b; }
  const bound = total.bind({ base: 10 }, 2);
  return [bound(3), bound.call({ base: 99 }, 3)];
}

export const lesson = {
  "id": "javascript-026",
  "description": "call and apply invoke with an explicit receiver; bind creates a callable with receiver and optional arguments fixed.",
  "when": "Adapt a receiver-dependent function or partially supply arguments.",
  "avoid": "Avoid assuming a bound function can be rebound with call.",
  "tradeoff": "Bound function identity differs from the original, so retain it when removing listeners.",
  "mistakes": [
    {
      "problem": "Trying to replace this on an already bound function.",
      "fix": "Choose the correct receiver when binding or keep an unbound original."
    }
  ],
  "examples": [
    {
      "title": "call versus apply argument shapes",
      "expected": [
        13,
        23
      ],
      "explanation": "call receives positional arguments; apply receives an argument array.",
      "runtime": "browser",
      "id": "javascript-026.e01",
      "run": example1
    },
    {
      "title": "Partial arguments and fixed receiver",
      "expected": [
        15,
        15
      ],
      "explanation": "Both calls use the original bound receiver and first argument.",
      "runtime": "browser",
      "id": "javascript-026.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-026.q01",
      "level": "Basic",
      "question": "What does call, apply, bind mean here?",
      "answer": "call and apply invoke with an explicit receiver; bind creates a callable with receiver and optional arguments fixed."
    },
    {
      "id": "javascript-026.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “call versus apply argument shapes”. Why?",
      "answer": "[13, 23] call receives positional arguments; apply receives an argument array."
    },
    {
      "id": "javascript-026.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "call receives positional arguments; apply receives an argument array. Both calls use the original bound receiver and first argument."
    },
    {
      "id": "javascript-026.q04",
      "level": "Debugging",
      "question": "Trying to replace this on an already bound function. How would you fix it?",
      "answer": "Choose the correct receiver when binding or keep an unbound original."
    },
    {
      "id": "javascript-026.q05",
      "level": "Senior",
      "question": "What constraints matter when using call, apply, bind in production?",
      "answer": "Avoid assuming a bound function can be rebound with call. Bound function identity differs from the original, so retain it when removing listeners."
    },
    {
      "id": "javascript-026.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Adapt a receiver-dependent function or partially supply arguments. Bound function identity differs from the original, so retain it when removing listeners."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
