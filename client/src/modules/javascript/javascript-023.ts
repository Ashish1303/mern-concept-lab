import type { Lesson } from '../lesson-types';

function example1() {
  const trace: string[] = [];
  function inner() { trace.push('inner'); }
  function outer() { trace.push('enter outer'); inner(); trace.push('leave outer'); }
  outer(); return trace;
}

function example2() {
  const trace: string[] = [];
  function child() { try { trace.push('child'); throw new Error('bounded'); } finally { trace.push('cleanup'); } }
  try { child(); } catch { trace.push('caught'); }
  return trace;
}

export const lesson = {
  "id": "javascript-023",
  "description": "Each function call creates an execution context; contexts run on a stack until returning or throwing.",
  "when": "Trace nested calls and exception unwinding.",
  "avoid": "Avoid assuming asynchronous work creates a second synchronous stack within the same callback.",
  "tradeoff": "A trace shows observable call order rather than exposing engine-private context objects.",
  "mistakes": [
    {
      "problem": "Expecting code after a thrown exception to execute normally.",
      "fix": "Catch at the intended boundary and use finally for cleanup."
    }
  ],
  "examples": [
    {
      "title": "Enter and leave nested calls",
      "expected": [
        "enter outer",
        "inner",
        "leave outer"
      ],
      "explanation": "The outer call pauses while the inner call runs.",
      "runtime": "browser",
      "id": "javascript-023.e01",
      "run": example1
    },
    {
      "title": "Unwind through finally",
      "expected": [
        "child",
        "cleanup",
        "caught"
      ],
      "explanation": "finally executes while the stack unwinds before the caller’s catch.",
      "runtime": "browser",
      "id": "javascript-023.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-023.q01",
      "level": "Basic",
      "question": "What does Execution context mean here?",
      "answer": "Each function call creates an execution context; contexts run on a stack until returning or throwing."
    },
    {
      "id": "javascript-023.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Enter and leave nested calls”. Why?",
      "answer": "[\"enter outer\", \"inner\", \"leave outer\"] The outer call pauses while the inner call runs."
    },
    {
      "id": "javascript-023.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The outer call pauses while the inner call runs. finally executes while the stack unwinds before the caller’s catch."
    },
    {
      "id": "javascript-023.q04",
      "level": "Debugging",
      "question": "Expecting code after a thrown exception to execute normally. How would you fix it?",
      "answer": "Catch at the intended boundary and use finally for cleanup."
    },
    {
      "id": "javascript-023.q05",
      "level": "Senior",
      "question": "What constraints matter when using Execution context in production?",
      "answer": "Avoid assuming asynchronous work creates a second synchronous stack within the same callback. A trace shows observable call order rather than exposing engine-private context objects."
    },
    {
      "id": "javascript-023.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Trace nested calls and exception unwinding. A trace shows observable call order rather than exposing engine-private context objects."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
