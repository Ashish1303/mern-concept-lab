import type { Lesson } from '../lesson-types';

function example1() {
  const key = { id: 1 }; const map = new Map<unknown, string>([[key, 'object'], ['name', 'Ada']]);
  return { found: map.get(key), fresh: String(map.get({ id: 1 })), values: [...map.values()] };
}

function example2() {
  const map = new Map<string, undefined>([['present', undefined]]);
  return { present: map.has('present'), missing: map.has('missing'), readPresent: String(map.get('present')), readMissing: String(map.get('missing')) };
}

export const lesson = {
  "id": "javascript-056",
  "description": "Map stores ordered key/value entries with keys of any supported value type and identity-based object keys.",
  "when": "Use non-string keys or frequent keyed insertion/deletion.",
  "avoid": "Avoid stringifying object identities accidentally when identity is the intended key.",
  "tradeoff": "Map avoids prototype-key collisions but still needs a cache size/eviction policy for long-lived use.",
  "mistakes": [
    {
      "problem": "Treating get returning undefined as proof that a key is absent.",
      "fix": "Use has when undefined itself can be a stored value."
    }
  ],
  "examples": [
    {
      "title": "Object identity and iteration order",
      "expected": {
        "found": "object",
        "fresh": "undefined",
        "values": [
          "object",
          "Ada"
        ]
      },
      "explanation": "The original reference retrieves its value and insertion order is retained.",
      "runtime": "browser",
      "id": "javascript-056.e01",
      "run": example1
    },
    {
      "title": "Missing versus stored undefined",
      "expected": {
        "present": true,
        "missing": false,
        "readPresent": "undefined",
        "readMissing": "undefined"
      },
      "explanation": "has distinguishes presence when get cannot.",
      "runtime": "browser",
      "id": "javascript-056.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-056.q01",
      "level": "Basic",
      "question": "What does Map mean here?",
      "answer": "Map stores ordered key/value entries with keys of any supported value type and identity-based object keys."
    },
    {
      "id": "javascript-056.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Object identity and iteration order”. Why?",
      "answer": "{\"found\": \"object\", \"fresh\": \"undefined\", \"values\": [\"object\", \"Ada\"]} The original reference retrieves its value and insertion order is retained."
    },
    {
      "id": "javascript-056.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The original reference retrieves its value and insertion order is retained. has distinguishes presence when get cannot."
    },
    {
      "id": "javascript-056.q04",
      "level": "Debugging",
      "question": "Treating get returning undefined as proof that a key is absent. How would you fix it?",
      "answer": "Use has when undefined itself can be a stored value."
    },
    {
      "id": "javascript-056.q05",
      "level": "Senior",
      "question": "What constraints matter when using Map in production?",
      "answer": "Avoid stringifying object identities accidentally when identity is the intended key. Map avoids prototype-key collisions but still needs a cache size/eviction policy for long-lived use."
    },
    {
      "id": "javascript-056.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use non-string keys or frequent keyed insertion/deletion. Map avoids prototype-key collisions but still needs a cache size/eviction policy for long-lived use."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
