import type { Lesson } from '../lesson-types';

function example1() {
  const rows = [{ id: 'a', name: 'Ada' }, { id: 'b', name: 'Grace' }];
  return Object.fromEntries(rows.map(row => [row.id, row.name]));
}

function example2() {
  const rows = [{ id: 'a', value: 1 }, { id: 'a', value: 2 }];
  const seen = new Set<string>(); const duplicates: string[] = [];
  for (const row of rows) { if (seen.has(row.id)) duplicates.push(row.id); seen.add(row.id); }
  return { overwritten: Object.fromEntries(rows.map(row => [row.id, row.value])), duplicates };
}

export const lesson = {
  "id": "javascript-061",
  "description": "Transformations reshape data while preserving the information and identity rules required by the next consumer.",
  "when": "Normalize arrays into indexed records or derive view data.",
  "avoid": "Avoid lossy transformations that silently overwrite duplicate domain IDs.",
  "tradeoff": "Index building is O(n); repeated lookups can then avoid rescanning the original list.",
  "mistakes": [
    {
      "problem": "Indexing duplicate IDs and assuming all rows remain represented.",
      "fix": "Reject duplicates or intentionally group them; name the overwrite policy."
    }
  ],
  "examples": [
    {
      "title": "Normalize by stable ID",
      "expected": {
        "a": "Ada",
        "b": "Grace"
      },
      "explanation": "Stable IDs become record keys for direct lookup.",
      "runtime": "browser",
      "id": "javascript-061.e01",
      "run": example1
    },
    {
      "title": "Detect duplicate IDs instead of silently losing rows",
      "expected": {
        "overwritten": {
          "a": 2
        },
        "duplicates": [
          "a"
        ]
      },
      "explanation": "fromEntries overwrites; the explicit validation pass surfaces the data-contract violation.",
      "runtime": "browser",
      "id": "javascript-061.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-061.q01",
      "level": "Basic",
      "question": "What does Array and object transformation mean here?",
      "answer": "Transformations reshape data while preserving the information and identity rules required by the next consumer."
    },
    {
      "id": "javascript-061.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Normalize by stable ID”. Why?",
      "answer": "{\"a\": \"Ada\", \"b\": \"Grace\"} Stable IDs become record keys for direct lookup."
    },
    {
      "id": "javascript-061.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Stable IDs become record keys for direct lookup. fromEntries overwrites; the explicit validation pass surfaces the data-contract violation."
    },
    {
      "id": "javascript-061.q04",
      "level": "Debugging",
      "question": "Indexing duplicate IDs and assuming all rows remain represented. How would you fix it?",
      "answer": "Reject duplicates or intentionally group them; name the overwrite policy."
    },
    {
      "id": "javascript-061.q05",
      "level": "Senior",
      "question": "What constraints matter when using Array and object transformation in production?",
      "answer": "Avoid lossy transformations that silently overwrite duplicate domain IDs. Index building is O(n); repeated lookups can then avoid rescanning the original list."
    },
    {
      "id": "javascript-061.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Normalize arrays into indexed records or derive view data. Index building is O(n); repeated lookups can then avoid rescanning the original list."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
