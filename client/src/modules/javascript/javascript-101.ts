import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';
import { normalizeWords, anagram } from '../algorithms';

function example1(ctx: RunContext) {
  const parts = text(ctx.input).split('|'); if (parts.length !== 2) throw new Error('Enter two phrases separated by |.');
  return [...normalizeWords(parts[0]!)].sort().join('') === [...normalizeWords(parts[1]!)].sort().join('');
}

function example2(ctx: RunContext) {
  const parts = text(ctx.input).split('|'); if (parts.length !== 2) throw new Error('Enter two phrases separated by |.');
  const a = parts[0]!; const b = parts[1]!; const wrong = [...new Set(a)].sort().join('') === [...new Set(b)].sort().join(''); return { wrong, fixed: anagram(a, b) };
}

export const lesson = {
  "id": "javascript-101",
  "description": "Anagrams contain equal character multiplicities under a defined normalization rule.",
  "when": "Compare normalized phrases while keeping frequency counts.",
  "avoid": "Avoid Set-only checks, which discard repeated-character counts.",
  "tradeoff": "Sorting is O(n log n) time/O(n) space; frequency counting is typically O(n) time/O(k) space.",
  "mistakes": [
    {
      "problem": "Treating aab and abb as anagrams because both use a and b.",
      "fix": "Compare sorted normalized sequences or use a frequency map."
    }
  ],
  "examples": [
    {
      "title": "Sorted normalized comparison",
      "expected": true,
      "explanation": "Both inputs are normalized with the same rule before sorting.",
      "runtime": "browser",
      "input": {
        "label": "Two phrases separated by |",
        "initial": "listen|silent"
      },
      "id": "javascript-101.e01",
      "run": example1
    },
    {
      "title": "Set-only bug versus frequency-map fix",
      "expected": {
        "wrong": true,
        "fixed": false
      },
      "explanation": "The correct helper counts repeated characters instead of discarding them.",
      "runtime": "browser",
      "input": {
        "label": "Two phrases separated by |",
        "initial": "aab|abb"
      },
      "id": "javascript-101.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-101.q01",
      "level": "Basic",
      "question": "What does Anagram mean here?",
      "answer": "Anagrams contain equal character multiplicities under a defined normalization rule."
    },
    {
      "id": "javascript-101.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Sorted normalized comparison”. Why?",
      "answer": "true Both inputs are normalized with the same rule before sorting."
    },
    {
      "id": "javascript-101.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Both inputs are normalized with the same rule before sorting. The correct helper counts repeated characters instead of discarding them."
    },
    {
      "id": "javascript-101.q04",
      "level": "Debugging",
      "question": "Treating aab and abb as anagrams because both use a and b. How would you fix it?",
      "answer": "Compare sorted normalized sequences or use a frequency map."
    },
    {
      "id": "javascript-101.q05",
      "level": "Senior",
      "question": "What constraints matter when using Anagram in production?",
      "answer": "Avoid Set-only checks, which discard repeated-character counts. Sorting is O(n log n) time/O(n) space; frequency counting is typically O(n) time/O(k) space."
    },
    {
      "id": "javascript-101.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Compare normalized phrases while keeping frequency counts. Sorting is O(n log n) time/O(n) space; frequency counting is typically O(n) time/O(k) space."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
