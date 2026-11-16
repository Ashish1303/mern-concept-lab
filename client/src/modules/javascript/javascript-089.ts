import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';

function example1(ctx: RunContext) {
  const name = 'mern_concept_lab_phase2'; const previous = document.cookie.split('; ').find(item => item.startsWith(`${name}=`));
  ctx.cleanup(() => { document.cookie = previous ? `${previous}; Path=/; SameSite=Strict` : `${name}=; Max-Age=0; Path=/; SameSite=Strict`; });
  document.cookie = `${name}=${encodeURIComponent(text(ctx.input))}; Path=/; SameSite=Strict`;
  const found = document.cookie.split('; ').find(item => item.startsWith(`${name}=`)); return found ? decodeURIComponent(found.slice(name.length + 1)) : 'Cookie unavailable';
}

function example2(ctx: RunContext) {
  const name = 'mern_concept_lab_phase2_delete'; document.cookie = `${name}=temporary; Path=/; SameSite=Strict`;
  ctx.cleanup(() => { document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Strict`; });
  const before = document.cookie.split('; ').some(item => item.startsWith(`${name}=`)); document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Strict`;
  return { before, after: document.cookie.split('; ').some(item => item.startsWith(`${name}=`)) };
}

export const lesson = {
  "id": "javascript-089",
  "description": "Cookies are path/domain-scoped browser state sent with matching requests; script-visible cookies are distinct from HttpOnly cookies.",
  "when": "Understand encoding, lifetime and server-managed cookie security.",
  "avoid": "Avoid placing authentication secrets in JavaScript-readable cookies; this lesson stores only fixed lab data.",
  "tradeoff": "JavaScript cannot create HttpOnly cookies; secure authentication belongs to the later server-auth phase.",
  "mistakes": [
    {
      "problem": "Failing to encode cookie values or match the path when deleting them.",
      "fix": "Encode values and delete with the same path and appropriate expiry."
    }
  ],
  "examples": [
    {
      "title": "Encode and read an owned cookie",
      "expected": "hello world",
      "explanation": "Only the lab cookie is returned; unrelated cookie values are never displayed.",
      "runtime": "browser",
      "input": {
        "label": "Cookie value",
        "initial": "hello world"
      },
      "id": "javascript-089.e01",
      "run": example1
    },
    {
      "title": "Delete with matching path",
      "expected": {
        "before": true,
        "after": false
      },
      "explanation": "Max-Age zero removes the matching owned cookie.",
      "runtime": "browser",
      "id": "javascript-089.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-089.q01",
      "level": "Basic",
      "question": "What does Cookies mean here?",
      "answer": "Cookies are path/domain-scoped browser state sent with matching requests; script-visible cookies are distinct from HttpOnly cookies."
    },
    {
      "id": "javascript-089.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Encode and read an owned cookie”. Why?",
      "answer": "\"hello world\" Only the lab cookie is returned; unrelated cookie values are never displayed."
    },
    {
      "id": "javascript-089.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Only the lab cookie is returned; unrelated cookie values are never displayed. Max-Age zero removes the matching owned cookie."
    },
    {
      "id": "javascript-089.q04",
      "level": "Debugging",
      "question": "Failing to encode cookie values or match the path when deleting them. How would you fix it?",
      "answer": "Encode values and delete with the same path and appropriate expiry."
    },
    {
      "id": "javascript-089.q05",
      "level": "Senior",
      "question": "What constraints matter when using Cookies in production?",
      "answer": "Avoid placing authentication secrets in JavaScript-readable cookies; this lesson stores only fixed lab data. JavaScript cannot create HttpOnly cookies; secure authentication belongs to the later server-auth phase."
    },
    {
      "id": "javascript-089.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Understand encoding, lifetime and server-managed cookie security. JavaScript cannot create HttpOnly cookies; secure authentication belongs to the later server-auth phase."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
