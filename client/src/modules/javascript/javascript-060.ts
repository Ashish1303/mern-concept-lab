import type { Lesson } from '../lesson-types';

function example1() {
  const items = [{ role: 'dev', name: 'Ada' }, { role: 'ops', name: 'Grace' }, { role: 'dev', name: 'Linus' }];
  const groups = new Map<string, string[]>();
  for (const item of items) { const bucket = groups.get(item.role) ?? []; bucket.push(item.name); groups.set(item.role, bucket); }
  return Object.fromEntries(groups);
}

function example2() {
  const groups = new Map<string, number[]>();
  for (const [key, value] of [['__proto__', 1], ['constructor', 2]] as const) groups.set(key, [...(groups.get(key) ?? []), value]);
  return [...groups.entries()];
}

export const lesson = {
  "id": "javascript-060",
  "description": "Grouping partitions records into buckets selected by a key function.",
  "when": "Build indexes, report groups and category lists.",
  "avoid": "Avoid accumulating arbitrary keys on a prototype-bearing object without protection.",
  "tradeoff": "One-pass grouping is O(n) time with output space proportional to grouped records.",
  "mistakes": [
    {
      "problem": "Using a key such as __proto__ with unsafe ordinary-object accumulation.",
      "fix": "Use Map or a null-prototype record and explicit initialization."
    }
  ],
  "examples": [
    {
      "title": "Group records using Map",
      "expected": {
        "dev": [
          "Ada",
          "Linus"
        ],
        "ops": [
          "Grace"
        ]
      },
      "explanation": "Each item is appended to a bucket under its group key.",
      "runtime": "browser",
      "id": "javascript-060.e01",
      "run": example1
    },
    {
      "title": "Prototype-looking keys are safe Map keys",
      "expected": [
        [
          "__proto__",
          [
            1
          ]
        ],
        [
          "constructor",
          [
            2
          ]
        ]
      ],
      "explanation": "Map keys do not interact with Object.prototype inheritance.",
      "runtime": "browser",
      "id": "javascript-060.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-060.q01",
      "level": "Basic",
      "question": "What does Grouping mean here?",
      "answer": "Grouping partitions records into buckets selected by a key function."
    },
    {
      "id": "javascript-060.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Group records using Map”. Why?",
      "answer": "{\"dev\": [\"Ada\", \"Linus\"], \"ops\": [\"Grace\"]} Each item is appended to a bucket under its group key."
    },
    {
      "id": "javascript-060.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Each item is appended to a bucket under its group key. Map keys do not interact with Object.prototype inheritance."
    },
    {
      "id": "javascript-060.q04",
      "level": "Debugging",
      "question": "Using a key such as __proto__ with unsafe ordinary-object accumulation. How would you fix it?",
      "answer": "Use Map or a null-prototype record and explicit initialization."
    },
    {
      "id": "javascript-060.q05",
      "level": "Senior",
      "question": "What constraints matter when using Grouping in production?",
      "answer": "Avoid accumulating arbitrary keys on a prototype-bearing object without protection. One-pass grouping is O(n) time with output space proportional to grouped records."
    },
    {
      "id": "javascript-060.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Build indexes, report groups and category lists. One-pass grouping is O(n) time with output space proportional to grouped records."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
