import type { Lesson } from '../lesson-types';

function example1() {
  const rows = [{ name: 'B', score: 2 }, { name: 'C', score: 1 }, { name: 'A', score: 2 }];
  return { sorted: [...rows].sort((a, b) => a.score - b.score || a.name.localeCompare(b.name)).map(row => row.name), original: rows.map(row => row.name) };
}

function example2() {
  const rows = [{ id: 'old', date: '2020-01-01' }, { id: 'new', date: '2023-01-01' }];
  return [...rows].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).map(row => row.id);
}

export const lesson = {
  "id": "javascript-104",
  "description": "Object sorting needs a comparator over selected fields and a defined policy for ties and mutation.",
  "when": "Sort view data by score, name or date while preserving the source when needed.",
  "avoid": "Avoid comparators that return only true/false instead of negative/zero/positive.",
  "tradeoff": "Sorting commonly takes O(n log n) comparisons and a copied input adds O(n) container space.",
  "mistakes": [
    {
      "problem": "Using a boolean comparison as a numeric comparator.",
      "fix": "Return a signed difference or a proper lexical comparison."
    }
  ],
  "examples": [
    {
      "title": "Sort a copy by score with a tie-breaker",
      "expected": {
        "sorted": [
          "C",
          "A",
          "B"
        ],
        "original": [
          "B",
          "C",
          "A"
        ]
      },
      "explanation": "A secondary name key makes tied scores deterministic.",
      "runtime": "browser",
      "id": "javascript-104.e01",
      "run": example1
    },
    {
      "title": "Descending validated ISO dates",
      "expected": [
        "new",
        "old"
      ],
      "explanation": "A signed timestamp difference reverses chronological order for these valid ISO dates.",
      "runtime": "browser",
      "id": "javascript-104.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-104.q01",
      "level": "Basic",
      "question": "What does Sort objects mean here?",
      "answer": "Object sorting needs a comparator over selected fields and a defined policy for ties and mutation."
    },
    {
      "id": "javascript-104.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Sort a copy by score with a tie-breaker”. Why?",
      "answer": "{\"sorted\": [\"C\", \"A\", \"B\"], \"original\": [\"B\", \"C\", \"A\"]} A secondary name key makes tied scores deterministic."
    },
    {
      "id": "javascript-104.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "A secondary name key makes tied scores deterministic. A signed timestamp difference reverses chronological order for these valid ISO dates."
    },
    {
      "id": "javascript-104.q04",
      "level": "Debugging",
      "question": "Using a boolean comparison as a numeric comparator. How would you fix it?",
      "answer": "Return a signed difference or a proper lexical comparison."
    },
    {
      "id": "javascript-104.q05",
      "level": "Senior",
      "question": "What constraints matter when using Sort objects in production?",
      "answer": "Avoid comparators that return only true/false instead of negative/zero/positive. Sorting commonly takes O(n log n) comparisons and a copied input adds O(n) container space."
    },
    {
      "id": "javascript-104.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Sort view data by score, name or date while preserving the source when needed. Sorting commonly takes O(n log n) comparisons and a copied input adds O(n) container space."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
