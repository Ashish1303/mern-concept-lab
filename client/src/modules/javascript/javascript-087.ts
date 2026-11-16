import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';

function example1(ctx: RunContext) {
  const key = 'mern-concept-lab:phase2:local'; const previous = localStorage.getItem(key);
  ctx.cleanup(() => { if (previous === null) localStorage.removeItem(key); else localStorage.setItem(key, previous); });
  localStorage.setItem(key, JSON.stringify({ label: text(ctx.input) })); return { storedType: typeof localStorage.getItem(key), parsed: JSON.parse(localStorage.getItem(key)!) as unknown };
}

function example2(ctx: RunContext) {
  const key = 'mern-concept-lab:phase2:remove'; const previous = localStorage.getItem(key);
  ctx.cleanup(() => { if (previous === null) localStorage.removeItem(key); else localStorage.setItem(key, previous); });
  localStorage.setItem(key, 'value'); const before = localStorage.getItem(key); localStorage.removeItem(key); return [before, localStorage.getItem(key)];
}

export const lesson = {
  "id": "javascript-087",
  "description": "localStorage stores origin-scoped strings across page sessions until removed or cleared.",
  "when": "Persist small non-sensitive preferences with an explicit versioned key.",
  "avoid": "Avoid storing secrets, large data or assuming storage is always permitted.",
  "tradeoff": "Storage is synchronous and shared by origin, not by application port or component; these runs restore only their own lab key.",
  "mistakes": [
    {
      "problem": "Storing an object without serialization and reading back an object.",
      "fix": "Serialize validated data and handle parse/storage failures."
    }
  ],
  "examples": [
    {
      "title": "Round-trip a serialized value in real localStorage",
      "expected": {
        "storedType": "string",
        "parsed": {
          "label": "MERN"
        }
      },
      "explanation": "The browser stores text; JSON parsing reconstructs the intended value. Only this namespaced key is touched.",
      "runtime": "browser",
      "input": {
        "label": "Preference label",
        "initial": "MERN"
      },
      "id": "javascript-087.e01",
      "run": example1
    },
    {
      "title": "Remove an owned key explicitly",
      "expected": [
        "value",
        null
      ],
      "explanation": "Removal is observable immediately; cleanup never clears unrelated storage.",
      "runtime": "browser",
      "id": "javascript-087.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-087.q01",
      "level": "Basic",
      "question": "What does localStorage mean here?",
      "answer": "localStorage stores origin-scoped strings across page sessions until removed or cleared."
    },
    {
      "id": "javascript-087.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Round-trip a serialized value in real localStorage”. Why?",
      "answer": "{\"storedType\": \"string\", \"parsed\": {\"label\": \"MERN\"}} The browser stores text; JSON parsing reconstructs the intended value. Only this namespaced key is touched."
    },
    {
      "id": "javascript-087.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The browser stores text; JSON parsing reconstructs the intended value. Only this namespaced key is touched. Removal is observable immediately; cleanup never clears unrelated storage."
    },
    {
      "id": "javascript-087.q04",
      "level": "Debugging",
      "question": "Storing an object without serialization and reading back an object. How would you fix it?",
      "answer": "Serialize validated data and handle parse/storage failures."
    },
    {
      "id": "javascript-087.q05",
      "level": "Senior",
      "question": "What constraints matter when using localStorage in production?",
      "answer": "Avoid storing secrets, large data or assuming storage is always permitted. Storage is synchronous and shared by origin, not by application port or component; these runs restore only their own lab key."
    },
    {
      "id": "javascript-087.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Persist small non-sensitive preferences with an explicit versioned key. Storage is synchronous and shared by origin, not by application port or component; these runs restore only their own lab key."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
