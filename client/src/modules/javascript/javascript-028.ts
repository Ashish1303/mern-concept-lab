import type { Lesson } from '../lesson-types';

function example1() {
  const base = { greet(this: { name: string }) { return `Hi ${this.name}`; } };
  const child = Object.assign(Object.create(base) as { name: string; greet(): string }, { name: 'Ada' });
  return [child.greet(), Object.getPrototypeOf(child) === base];
}

function example2() {
  class Base { greet() { return 'hello'; } }
  class Child extends Base { override greet() { return `${super.greet()} child`; } }
  return new Child().greet();
}

export const lesson = {
  "id": "javascript-028",
  "description": "Prototypal inheritance delegates property lookup to another object; class extends builds on that mechanism.",
  "when": "Share behavior across related objects while keeping own instance state.",
  "avoid": "Avoid deep inheritance trees where composition expresses the relationship more clearly.",
  "tradeoff": "Inherited behavior is shared; mutations to a shared prototype can affect every descendant.",
  "mistakes": [
    {
      "problem": "Overriding a method while unintentionally discarding base behavior.",
      "fix": "Call super explicitly when the override should extend the base method."
    }
  ],
  "examples": [
    {
      "title": "Delegate to an object prototype",
      "expected": [
        "Hi Ada",
        true
      ],
      "explanation": "The child owns name and inherits greet through delegation.",
      "runtime": "browser",
      "id": "javascript-028.e01",
      "run": example1
    },
    {
      "title": "Override with super",
      "expected": "hello child",
      "explanation": "The override explicitly invokes the base implementation before extending its output.",
      "runtime": "browser",
      "id": "javascript-028.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-028.q01",
      "level": "Basic",
      "question": "What does Prototypal inheritance mean here?",
      "answer": "Prototypal inheritance delegates property lookup to another object; class extends builds on that mechanism."
    },
    {
      "id": "javascript-028.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Delegate to an object prototype”. Why?",
      "answer": "[\"Hi Ada\", true] The child owns name and inherits greet through delegation."
    },
    {
      "id": "javascript-028.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The child owns name and inherits greet through delegation. The override explicitly invokes the base implementation before extending its output."
    },
    {
      "id": "javascript-028.q04",
      "level": "Debugging",
      "question": "Overriding a method while unintentionally discarding base behavior. How would you fix it?",
      "answer": "Call super explicitly when the override should extend the base method."
    },
    {
      "id": "javascript-028.q05",
      "level": "Senior",
      "question": "What constraints matter when using Prototypal inheritance in production?",
      "answer": "Avoid deep inheritance trees where composition expresses the relationship more clearly. Inherited behavior is shared; mutations to a shared prototype can affect every descendant."
    },
    {
      "id": "javascript-028.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Share behavior across related objects while keeping own instance state. Inherited behavior is shared; mutations to a shared prototype can affect every descendant."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
