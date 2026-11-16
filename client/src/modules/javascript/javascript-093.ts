import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';

function example1(ctx: RunContext) {
  return [...text(ctx.input)].reverse().join('');
}

function example2(ctx: RunContext) {
  const value = text(ctx.input);
  const wrong = value.split('').reverse().join(''); const fixed = [...value].reverse().join('');
  return { wrongCodePoints: [...wrong].map(char => char.codePointAt(0)), fixedCodePoints: [...fixed].map(char => char.codePointAt(0)) };
}

export const lesson = {
  "id": "javascript-093",
  "description": "String reversal depends on whether the unit is a UTF-16 code unit, a Unicode code point or a grapheme cluster.",
  "when": "Reverse code-point sequences for a clearly documented coding exercise.",
  "avoid": "Avoid claiming code-point reversal preserves complex grapheme clusters such as combining sequences.",
  "tradeoff": "Code-point reversal is O(n) time and O(n) space; grapheme-aware requirements need Intl.Segmenter.",
  "mistakes": [
    {
      "problem": "Splitting with an empty string and breaking surrogate pairs.",
      "fix": "Iterate code points with Array.from or spread; use grapheme segmentation for user-perceived characters."
    }
  ],
  "examples": [
    {
      "title": "Reverse by Unicode code points",
      "expected": "B😊A",
      "explanation": "The emoji is treated as one code point.",
      "runtime": "browser",
      "input": {
        "label": "Text",
        "initial": "A😊B"
      },
      "id": "javascript-093.e01",
      "run": example1
    },
    {
      "title": "Expose the UTF-16 split bug",
      "expected": {
        "wrongCodePoints": [
          66,
          56842,
          55357,
          65
        ],
        "fixedCodePoints": [
          66,
          128522,
          65
        ]
      },
      "explanation": "The broken version leaves reversed surrogate code units instead of the original emoji.",
      "runtime": "browser",
      "input": {
        "label": "Text",
        "initial": "A😊B"
      },
      "id": "javascript-093.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-093.q01",
      "level": "Basic",
      "question": "What does Reverse string mean here?",
      "answer": "String reversal depends on whether the unit is a UTF-16 code unit, a Unicode code point or a grapheme cluster."
    },
    {
      "id": "javascript-093.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Reverse by Unicode code points”. Why?",
      "answer": "\"B😊A\" The emoji is treated as one code point."
    },
    {
      "id": "javascript-093.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The emoji is treated as one code point. The broken version leaves reversed surrogate code units instead of the original emoji."
    },
    {
      "id": "javascript-093.q04",
      "level": "Debugging",
      "question": "Splitting with an empty string and breaking surrogate pairs. How would you fix it?",
      "answer": "Iterate code points with Array.from or spread; use grapheme segmentation for user-perceived characters."
    },
    {
      "id": "javascript-093.q05",
      "level": "Senior",
      "question": "What constraints matter when using Reverse string in production?",
      "answer": "Avoid claiming code-point reversal preserves complex grapheme clusters such as combining sequences. Code-point reversal is O(n) time and O(n) space; grapheme-aware requirements need Intl.Segmenter."
    },
    {
      "id": "javascript-093.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Reverse code-point sequences for a clearly documented coding exercise. Code-point reversal is O(n) time and O(n) space; grapheme-aware requirements need Intl.Segmenter."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
