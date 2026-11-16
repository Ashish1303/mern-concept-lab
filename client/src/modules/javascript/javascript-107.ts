import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';

function example1(ctx: RunContext) {
  const counts = new Map<string, number>(); for (const character of text(ctx.input)) counts.set(character, (counts.get(character) ?? 0) + 1); return [...counts];
}

function example2(ctx: RunContext) {
  const value = text(ctx.input); const count = (source: string) => { const result = new Map<string, number>(); for (const character of source) result.set(character, (result.get(character) ?? 0) + 1); return [...result]; };
  return { sensitive: count(value), lower: count(value.normalize('NFC').toLowerCase()) };
}

export const lesson = {
  "id": "javascript-107",
  "description": "Character frequency counts code-point occurrences under an explicit case and normalization policy.",
  "when": "Build histograms and compare string multiplicities.",
  "avoid": "Avoid indexing arbitrary keys on an unsafe object or confusing code units with code points.",
  "tradeoff": "The scan is O(n) time/O(k) space; code-point counts still differ from grapheme-cluster counts.",
  "mistakes": [
    {
      "problem": "Counting emoji as two independent UTF-16 units.",
      "fix": "Iterate code points with for-of and use Map for keys."
    }
  ],
  "examples": [
    {
      "title": "Count Unicode code points",
      "expected": [
        [
          "a",
          2
        ],
        [
          "😊",
          1
        ]
      ],
      "explanation": "for-of keeps the emoji’s surrogate pair together.",
      "runtime": "browser",
      "input": {
        "label": "Text",
        "initial": "a😊a"
      },
      "id": "javascript-107.e01",
      "run": example1
    },
    {
      "title": "Case-sensitive versus normalized counts",
      "expected": {
        "sensitive": [
          [
            "A",
            1
          ],
          [
            "a",
            1
          ]
        ],
        "lower": [
          [
            "a",
            2
          ]
        ]
      },
      "explanation": "A counting rule must state whether case should be preserved.",
      "runtime": "browser",
      "input": {
        "label": "Text",
        "initial": "Aa"
      },
      "id": "javascript-107.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-107.q01",
      "level": "Basic",
      "question": "What does Character frequency mean here?",
      "answer": "Character frequency counts code-point occurrences under an explicit case and normalization policy."
    },
    {
      "id": "javascript-107.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Count Unicode code points”. Why?",
      "answer": "[[\"a\", 2], [\"😊\", 1]] for-of keeps the emoji’s surrogate pair together."
    },
    {
      "id": "javascript-107.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "for-of keeps the emoji’s surrogate pair together. A counting rule must state whether case should be preserved."
    },
    {
      "id": "javascript-107.q04",
      "level": "Debugging",
      "question": "Counting emoji as two independent UTF-16 units. How would you fix it?",
      "answer": "Iterate code points with for-of and use Map for keys."
    },
    {
      "id": "javascript-107.q05",
      "level": "Senior",
      "question": "What constraints matter when using Character frequency in production?",
      "answer": "Avoid indexing arbitrary keys on an unsafe object or confusing code units with code points. The scan is O(n) time/O(k) space; code-point counts still differ from grapheme-cluster counts."
    },
    {
      "id": "javascript-107.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Build histograms and compare string multiplicities. The scan is O(n) time/O(k) space; code-point counts still differ from grapheme-cluster counts."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
