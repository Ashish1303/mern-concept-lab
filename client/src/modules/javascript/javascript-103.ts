import type { Lesson } from '../lesson-types';

function example1() {
  const items = [{ team: 'A', name: 'Ada' }, { team: 'B', name: 'Grace' }, { team: 'A', name: 'Linus' }]; const result = new Map<string, string[]>();
  for (const item of items) { const bucket = result.get(item.team) ?? []; bucket.push(item.name); result.set(item.team, bucket); } return [...result];
}

function example2() {
  const items = [{ team: 'A', name: 'Ada' }, { team: 'A', name: 'Linus' }];
  return { wrong: Object.fromEntries(items.map(item => [item.team, item.name])), fixed: items.reduce<Record<string, string[]>>((groups, item) => { (groups[item.team] ??= []).push(item.name); return groups; }, Object.create(null) as Record<string, string[]>) };
}

export const lesson = {
  "id": "javascript-103",
  "description": "Grouping objects accumulates records under a selected domain key without losing records.",
  "when": "Build a per-team list or report index.",
  "avoid": "Avoid indexing each key to one object when several objects can share it.",
  "tradeoff": "Map grouping is typically O(n) time/O(n) space; repeated array spreading can add copying cost.",
  "mistakes": [
    {
      "problem": "Overwriting earlier records with the same grouping key.",
      "fix": "Accumulate arrays per key rather than assigning one final object."
    }
  ],
  "examples": [
    {
      "title": "Group objects without overwriting members",
      "expected": [
        [
          "A",
          [
            "Ada",
            "Linus"
          ]
        ],
        [
          "B",
          [
            "Grace"
          ]
        ]
      ],
      "explanation": "Each team receives every matching object’s name.",
      "runtime": "browser",
      "id": "javascript-103.e01",
      "run": example1
    },
    {
      "title": "Index overwrite versus grouped values",
      "expected": {
        "wrong": {
          "A": "Linus"
        },
        "fixed": {
          "A": [
            "Ada",
            "Linus"
          ]
        }
      },
      "explanation": "A null-prototype grouped record retains both members and avoids prototype-key collisions.",
      "runtime": "browser",
      "id": "javascript-103.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-103.q01",
      "level": "Basic",
      "question": "What does Group objects mean here?",
      "answer": "Grouping objects accumulates records under a selected domain key without losing records."
    },
    {
      "id": "javascript-103.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Group objects without overwriting members”. Why?",
      "answer": "[[\"A\", [\"Ada\", \"Linus\"]], [\"B\", [\"Grace\"]]] Each team receives every matching object’s name."
    },
    {
      "id": "javascript-103.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Each team receives every matching object’s name. A null-prototype grouped record retains both members and avoids prototype-key collisions."
    },
    {
      "id": "javascript-103.q04",
      "level": "Debugging",
      "question": "Overwriting earlier records with the same grouping key. How would you fix it?",
      "answer": "Accumulate arrays per key rather than assigning one final object."
    },
    {
      "id": "javascript-103.q05",
      "level": "Senior",
      "question": "What constraints matter when using Group objects in production?",
      "answer": "Avoid indexing each key to one object when several objects can share it. Map grouping is typically O(n) time/O(n) space; repeated array spreading can add copying cost."
    },
    {
      "id": "javascript-103.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Build a per-team list or report index. Map grouping is typically O(n) time/O(n) space; repeated array spreading can add copying cost."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
