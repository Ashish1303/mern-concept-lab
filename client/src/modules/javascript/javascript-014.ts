import type { Lesson } from '../lesson-types';

function example1() {
  const project = (name: string) => ({ name });
  return project('Ada');
}

function example2() {
  const owner = { name: 'owner', make() { return () => this.name; } };
  const arrow = owner.make();
  function regular(this: { name: string }) { return this.name; }
  return [arrow.call({ name: 'other' }), regular.call({ name: 'other' })];
}

export const lesson = {
  "id": "javascript-014",
  "description": "Arrow functions provide lexical this and expression-body syntax; they are not constructors.",
  "when": "Use arrows for callbacks that should retain the enclosing this.",
  "avoid": "Avoid arrows for methods requiring a dynamic receiver or constructor behavior.",
  "tradeoff": "Arrows have no own arguments binding; rest parameters are explicit alternatives.",
  "mistakes": [
    {
      "problem": "Forgetting parentheses when returning an object literal.",
      "fix": "Wrap the object expression in parentheses, as the second transformation demonstrates."
    }
  ],
  "examples": [
    {
      "title": "Expression body returns an object",
      "expected": {
        "name": "Ada"
      },
      "explanation": "Parentheses make the braces an object expression rather than a function block.",
      "runtime": "browser",
      "id": "javascript-014.e01",
      "run": example1
    },
    {
      "title": "Arrow captures this; ordinary callback accepts a receiver",
      "expected": [
        "owner",
        "other"
      ],
      "explanation": "call cannot replace an arrow’s lexical this, while it binds an ordinary function’s this.",
      "runtime": "browser",
      "id": "javascript-014.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-014.q01",
      "level": "Basic",
      "question": "What does Arrow functions mean here?",
      "answer": "Arrow functions provide lexical this and expression-body syntax; they are not constructors."
    },
    {
      "id": "javascript-014.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Expression body returns an object”. Why?",
      "answer": "{\"name\": \"Ada\"} Parentheses make the braces an object expression rather than a function block."
    },
    {
      "id": "javascript-014.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "Parentheses make the braces an object expression rather than a function block. call cannot replace an arrow’s lexical this, while it binds an ordinary function’s this."
    },
    {
      "id": "javascript-014.q04",
      "level": "Debugging",
      "question": "Forgetting parentheses when returning an object literal. How would you fix it?",
      "answer": "Wrap the object expression in parentheses, as the second transformation demonstrates."
    },
    {
      "id": "javascript-014.q05",
      "level": "Senior",
      "question": "What constraints matter when using Arrow functions in production?",
      "answer": "Avoid arrows for methods requiring a dynamic receiver or constructor behavior. Arrows have no own arguments binding; rest parameters are explicit alternatives."
    },
    {
      "id": "javascript-014.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Use arrows for callbacks that should retain the enclosing this. Arrows have no own arguments binding; rest parameters are explicit alternatives."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
