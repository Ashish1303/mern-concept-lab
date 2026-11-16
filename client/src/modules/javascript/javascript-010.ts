import type { Lesson } from '../lesson-types';

function example1() {
  return { json: JSON.stringify({ missing: undefined, empty: null }), array: JSON.stringify([undefined, null]) };
}

function example2() {
  function greet(name: string | null | undefined = 'guest') { return name; }
  return [greet(undefined), greet(null), greet(null) ?? 'guest'];
}

export const lesson = {
  "id": "javascript-010",
  "description": "undefined usually represents an absent/uninitialized value; null is an explicit empty value. Both are nullish.",
  "when": "Choose a consistent absence contract for optional fields and API payloads.",
  "avoid": "Avoid relying on JSON to preserve undefined object properties.",
  "tradeoff": "JSON arrays turn undefined slots into null while object fields are omitted.",
  "mistakes": [
    {
      "problem": "Expecting undefined fields to survive serialization.",
      "fix": "Use null for an explicitly serialized empty field or omit fields intentionally."
    }
  ],
  "examples": [
    {
      "title": "Serialization treats missing and empty differently",
      "expected": {
        "json": "{\"empty\":null}",
        "array": "[null,null]"
      },
      "explanation": "The JSON serializer omits undefined object properties but preserves explicit null.",
      "runtime": "browser",
      "id": "javascript-010.e01",
      "run": example1
    },
    {
      "title": "Default parameter versus nullish default",
      "expected": [
        "guest",
        null,
        "guest"
      ],
      "explanation": "Default parameters trigger for undefined, not null; nullish coalescing handles both.",
      "runtime": "browser",
      "id": "javascript-010.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-010.q01",
      "level": "Basic",
      "question": "What does Null vs undefined mean here?",
      "answer": "undefined usually represents an absent/uninitialized value; null is an explicit empty value. Both are nullish."
    },
    {
      "id": "javascript-010.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Serialization treats missing and empty differently”. Why?",
      "answer": "{\"json\": \"{\\\"empty\\\":null}\", \"array\": \"[null,null]\"} The JSON serializer omits undefined object properties but preserves explicit null."
    },
    {
      "id": "javascript-010.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The JSON serializer omits undefined object properties but preserves explicit null. Default parameters trigger for undefined, not null; nullish coalescing handles both."
    },
    {
      "id": "javascript-010.q04",
      "level": "Debugging",
      "question": "Expecting undefined fields to survive serialization. How would you fix it?",
      "answer": "Use null for an explicitly serialized empty field or omit fields intentionally."
    },
    {
      "id": "javascript-010.q05",
      "level": "Senior",
      "question": "What constraints matter when using Null vs undefined in production?",
      "answer": "Avoid relying on JSON to preserve undefined object properties. JSON arrays turn undefined slots into null while object fields are omitted."
    },
    {
      "id": "javascript-010.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Choose a consistent absence contract for optional fields and API payloads. JSON arrays turn undefined slots into null while object fields are omitted."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
