import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';
import { normalizeWords } from '../algorithms';

function example1(ctx: RunContext) {
  const normalized = normalizeWords(text(ctx.input)); return normalized === [...normalized].reverse().join('');
}

function example2(ctx: RunContext) {
  const value = text(ctx.input); const literal = value === [...value].reverse().join(''); const characters = [...normalizeWords(value)];
  let fixed = true; for (let left = 0, right = characters.length - 1; left < right; left++, right--) if (characters[left] !== characters[right]) { fixed = false; break; }
  return { literal, fixed };
}

export const lesson = {
  "id": "javascript-094",
  "description": "A palindrome reads identically in both directions under a chosen normalization rule.",
  "when": "Compare phrases after documenting case, punctuation and Unicode normalization.",
  "avoid": "Avoid silently changing normalization requirements for passwords or identifiers.",
  "tradeoff": "The normalized reverse method is O(n) time/space; two-pointer comparison itself is O(1) extra space after normalization.",
  "mistakes": [
    {
      "problem": "Comparing the original punctuated phrase when the problem ignores punctuation and case.",
      "fix": "Normalize first, then compare code points or use a two-pointer scan."
    }
  ],
  "examples": [
    {
      "title": "Normalized reverse comparison",
      "expected": true,
      "explanation": "The rule ignores punctuation and case and normalizes composed Unicode text.",
      "runtime": "browser",
      "input": {
        "label": "Phrase",
        "initial": "A man, a plan, a canal: Panama"
      },
      "id": "javascript-094.e01",
      "run": example1
    },
    {
      "title": "Literal bug versus two-pointer normalized scan",
      "expected": {
        "literal": false,
        "fixed": true
      },
      "explanation": "The second algorithm uses the same explicit normalization contract.",
      "runtime": "browser",
      "input": {
        "label": "Phrase",
        "initial": "A man, a plan, a canal: Panama"
      },
      "id": "javascript-094.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-094.q01",
      "level": "Basic",
      "question": "What does Palindrome mean here?",
      "answer": "A palindrome reads identically in both directions under a chosen normalization rule."
    },
    {
      "id": "javascript-094.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Normalized reverse comparison”. Why?",
      "answer": "true The rule ignores punctuation and case and normalizes composed Unicode text."
    },
    {
      "id": "javascript-094.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The rule ignores punctuation and case and normalizes composed Unicode text. The second algorithm uses the same explicit normalization contract."
    },
    {
      "id": "javascript-094.q04",
      "level": "Debugging",
      "question": "Comparing the original punctuated phrase when the problem ignores punctuation and case. How would you fix it?",
      "answer": "Normalize first, then compare code points or use a two-pointer scan."
    },
    {
      "id": "javascript-094.q05",
      "level": "Senior",
      "question": "What constraints matter when using Palindrome in production?",
      "answer": "Avoid silently changing normalization requirements for passwords or identifiers. The normalized reverse method is O(n) time/space; two-pointer comparison itself is O(1) extra space after normalization."
    },
    {
      "id": "javascript-094.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Compare phrases after documenting case, punctuation and Unicode normalization. The normalized reverse method is O(n) time/space; two-pointer comparison itself is O(1) extra space after normalization."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
