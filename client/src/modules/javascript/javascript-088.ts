import type { Lesson, RunContext } from '../lesson-types';
import { integer } from '../runtime';

function example1(ctx: RunContext) {
  const key = 'mern-concept-lab:phase2:session'; const previous = sessionStorage.getItem(key);
  ctx.cleanup(() => { if (previous === null) sessionStorage.removeItem(key); else sessionStorage.setItem(key, previous); });
  sessionStorage.setItem(key, String(integer(ctx.input))); return { text: sessionStorage.getItem(key), numeric: Number(sessionStorage.getItem(key)) };
}

function example2(ctx: RunContext) {
  const key = 'mern-concept-lab:phase2:separate'; const a = localStorage.getItem(key); const b = sessionStorage.getItem(key);
  ctx.cleanup(() => { if (a === null) localStorage.removeItem(key); else localStorage.setItem(key, a); if (b === null) sessionStorage.removeItem(key); else sessionStorage.setItem(key, b); });
  localStorage.setItem(key, 'local'); sessionStorage.setItem(key, 'session'); return [localStorage.getItem(key), sessionStorage.getItem(key)];
}

export const lesson = {
  "id": "javascript-088",
  "description": "sessionStorage stores strings within an origin and top-level browsing context for that tab session.",
  "when": "Keep temporary tab-scoped non-sensitive state.",
  "avoid": "Avoid assuming sessionStorage is a cross-tab synchronization mechanism or a secret vault.",
  "tradeoff": "It survives reload within the session; a newly opened tab may start with a copy from an opener before diverging.",
  "mistakes": [
    {
      "problem": "Treating stored text as a typed object.",
      "fix": "Serialize/validate explicitly and scope keys to the application."
    }
  ],
  "examples": [
    {
      "title": "Tab-session value is still a string",
      "expected": {
        "text": "5",
        "numeric": 5
      },
      "explanation": "The browser storage API returns a string even for numeric data.",
      "runtime": "browser",
      "input": {
        "label": "Non-negative integer",
        "initial": "5"
      },
      "id": "javascript-088.e01",
      "run": example1
    },
    {
      "title": "Local and session stores are separate",
      "expected": [
        "local",
        "session"
      ],
      "explanation": "An identical key name refers to different values in the two storage areas.",
      "runtime": "browser",
      "id": "javascript-088.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-088.q01",
      "level": "Basic",
      "question": "What does sessionStorage mean here?",
      "answer": "sessionStorage stores strings within an origin and top-level browsing context for that tab session."
    },
    {
      "id": "javascript-088.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Tab-session value is still a string”. Why?",
      "answer": "{\"text\": \"5\", \"numeric\": 5} The browser storage API returns a string even for numeric data."
    },
    {
      "id": "javascript-088.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The browser storage API returns a string even for numeric data. An identical key name refers to different values in the two storage areas."
    },
    {
      "id": "javascript-088.q04",
      "level": "Debugging",
      "question": "Treating stored text as a typed object. How would you fix it?",
      "answer": "Serialize/validate explicitly and scope keys to the application."
    },
    {
      "id": "javascript-088.q05",
      "level": "Senior",
      "question": "What constraints matter when using sessionStorage in production?",
      "answer": "Avoid assuming sessionStorage is a cross-tab synchronization mechanism or a secret vault. It survives reload within the session; a newly opened tab may start with a copy from an opener before diverging."
    },
    {
      "id": "javascript-088.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Keep temporary tab-scoped non-sensitive state. It survives reload within the session; a newly opened tab may start with a copy from an opener before diverging."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
