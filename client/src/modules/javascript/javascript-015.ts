import type { Lesson } from '../lesson-types';

function example1() {
  function label(value: string | null = 'default') { return value; }
  return [label(), label(undefined), label(null)];
}

function example2() {
  function append(value: number, list: number[] = []) { list.push(value); return list; }
  return [append(1), append(2)];
}

export const lesson = {
  "id": "javascript-015",
  "description": "Default parameters initialize an omitted or undefined argument at call time; null does not trigger the default.",
  "when": "Use defaults for a documented optional argument.",
  "avoid": "Avoid treating null as omitted or sharing mutable defaults unintentionally.",
  "tradeoff": "Default expressions execute for each call that needs them.",
  "mistakes": [
    {
      "problem": "Expecting null to activate a parameter default.",
      "fix": "Use a nullish fallback inside the function if null should count as missing."
    }
  ],
  "examples": [
    {
      "title": "Omitted, undefined and null arguments",
      "expected": [
        "default",
        "default",
        null
      ],
      "explanation": "Only omission and undefined select the parameter default.",
      "runtime": "browser",
      "id": "javascript-015.e01",
      "run": example1
    },
    {
      "title": "Fresh objects per default evaluation",
      "expected": [
        [
          1
        ],
        [
          2
        ]
      ],
      "explanation": "An array expression default creates a fresh array for each call.",
      "runtime": "browser",
      "id": "javascript-015.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-015.q01",
      "level": "Basic",
      "question": "What does Default parameters mean here?",
      "answer": "Default parameters initialize an omitted or undefined argument at call time; null does not trigger the default."
    },
    {
      "id": "javascript-015.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Omitted, undefined and null arguments”. Why?",
      "answer": "[\"default\", \"default\", null] Only omission and undefined select the parameter default."
    },
    {
      "id": "javascript-015.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Only omission and undefined select the parameter default. An array expression default creates a fresh array for each call."
    },
    {
      "id": "javascript-015.q04",
      "level": "Debugging",
      "question": "Expecting null to activate a parameter default. How would you fix it?",
      "answer": "Use a nullish fallback inside the function if null should count as missing."
    },
    {
      "id": "javascript-015.q05",
      "level": "Senior",
      "question": "What constraints matter when using Default parameters in production?",
      "answer": "Avoid treating null as omitted or sharing mutable defaults unintentionally. Default expressions execute for each call that needs them."
    },
    {
      "id": "javascript-015.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use defaults for a documented optional argument. Default expressions execute for each call that needs them."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
