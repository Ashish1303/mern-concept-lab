import type { Lesson, RunContext } from '../lesson-types';
import { numbers } from '../runtime';
import { mapNumbers, filterNumbers, reduceNumbers } from '../algorithms';

function example1(ctx: RunContext) {
  const values = numbers(ctx.input);
  return { mapped: mapNumbers(values, value => value * 2), filtered: filterNumbers(values, value => value % 2 === 0), total: reduceNumbers(values, (sum, value) => sum + value, 0) };
}

function example2() {
  const sparse = new Array<number>(3); sparse[1] = 2; let calls = 0; const mapped = mapNumbers(sparse, value => { calls++; return value * 2; });
  return { calls, holePreserved: !(0 in mapped), length: mapped.length, filtered: filterNumbers(sparse, value => value > 0), emptySum: reduceNumbers([], (sum, value) => sum + value, 0) };
}

export const lesson = {
  "id": "javascript-113",
  "description": "Custom map/filter/reduce loops demonstrate indexing, sparse holes, output allocation and accumulation.",
  "when": "Practice restricted numeric-array implementations and compare them with native results.",
  "avoid": "Avoid advertising these helpers as universal Array.prototype polyfills with species, proxies and thisArg support.",
  "tradeoff": "Each helper is O(n); map/filter allocate O(n) output and reduce uses O(1) auxiliary state. This reduce deliberately requires an initial value.",
  "mistakes": [
    {
      "problem": "Visiting sparse holes as if they were actual values.",
      "fix": "Capture the starting length and test index ownership with index in array before invoking callbacks."
    }
  ],
  "examples": [
    {
      "title": "Map, filter and reduce implementations",
      "expected": {
        "mapped": [
          2,
          4,
          6
        ],
        "filtered": [
          2
        ],
        "total": 6
      },
      "explanation": "The included algorithms.ts source contains the loops, not calls to the native methods.",
      "runtime": "browser",
      "input": {
        "label": "Number array",
        "initial": "[1,2,3]"
      },
      "id": "javascript-113.e01",
      "run": example1
    },
    {
      "title": "Sparse and empty edge cases",
      "expected": {
        "calls": 1,
        "holePreserved": true,
        "length": 3,
        "filtered": [
          2
        ],
        "emptySum": 0
      },
      "explanation": "Only present indices invoke callbacks; the initial accumulator handles empty reduction.",
      "runtime": "browser",
      "id": "javascript-113.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-113.q01",
      "level": "Basic",
      "question": "What does Implement map/filter/reduce mean here?",
      "answer": "Custom map/filter/reduce loops demonstrate indexing, sparse holes, output allocation and accumulation."
    },
    {
      "id": "javascript-113.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Map, filter and reduce implementations”. Why?",
      "answer": "{\"mapped\": [2, 4, 6], \"filtered\": [2], \"total\": 6} The included algorithms.ts source contains the loops, not calls to the native methods."
    },
    {
      "id": "javascript-113.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The included algorithms.ts source contains the loops, not calls to the native methods. Only present indices invoke callbacks; the initial accumulator handles empty reduction."
    },
    {
      "id": "javascript-113.q04",
      "level": "Debugging",
      "question": "Visiting sparse holes as if they were actual values. How would you fix it?",
      "answer": "Capture the starting length and test index ownership with index in array before invoking callbacks."
    },
    {
      "id": "javascript-113.q05",
      "level": "Senior",
      "question": "What constraints matter when using Implement map/filter/reduce in production?",
      "answer": "Avoid advertising these helpers as universal Array.prototype polyfills with species, proxies and thisArg support. Each helper is O(n); map/filter allocate O(n) output and reduce uses O(1) auxiliary state. This reduce deliberately requires an initial value."
    },
    {
      "id": "javascript-113.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Practice restricted numeric-array implementations and compare them with native results. Each helper is O(n); map/filter allocate O(n) output and reduce uses O(1) auxiliary state. This reduce deliberately requires an initial value."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
