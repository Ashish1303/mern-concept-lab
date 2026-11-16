import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';

function example1(ctx: RunContext) {
  return `Hello, ${text(ctx.input)}!`;
}

function example2() {
  function tag(parts: TemplateStringsArray, value: number) { return { before: parts[0], value, after: parts[1] }; }
  return tag`Count: ${3} items`;
}

export const lesson = {
  "id": "javascript-018",
  "description": "Template literals interpolate expressions and preserve literal newlines; tagged templates receive raw string segments.",
  "when": "Build readable plain-text output using explicit values.",
  "avoid": "Avoid inserting interpolated untrusted strings as HTML.",
  "tradeoff": "Tags can implement escaping policies, but template literals alone provide none.",
  "mistakes": [
    {
      "problem": "Confusing string interpolation with HTML escaping.",
      "fix": "Render the returned string as text, as this lab does."
    }
  ],
  "examples": [
    {
      "title": "Interpolate user text safely",
      "expected": "Hello, Ada!",
      "explanation": "The UI renders the result as text rather than interpreting markup.",
      "runtime": "browser",
      "input": {
        "label": "Name",
        "initial": "Ada"
      },
      "id": "javascript-018.e01",
      "run": example1
    },
    {
      "title": "Tagged template receives segments and values",
      "expected": {
        "before": "Count: ",
        "value": 3,
        "after": " items"
      },
      "explanation": "The tag receives the literal parts separately from expression values.",
      "runtime": "browser",
      "id": "javascript-018.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-018.q01",
      "level": "Basic",
      "question": "What does Template literals mean here?",
      "answer": "Template literals interpolate expressions and preserve literal newlines; tagged templates receive raw string segments."
    },
    {
      "id": "javascript-018.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Interpolate user text safely”. Why?",
      "answer": "\"Hello, Ada!\" The UI renders the result as text rather than interpreting markup."
    },
    {
      "id": "javascript-018.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The UI renders the result as text rather than interpreting markup. The tag receives the literal parts separately from expression values."
    },
    {
      "id": "javascript-018.q04",
      "level": "Debugging",
      "question": "Confusing string interpolation with HTML escaping. How would you fix it?",
      "answer": "Render the returned string as text, as this lab does."
    },
    {
      "id": "javascript-018.q05",
      "level": "Senior",
      "question": "What constraints matter when using Template literals in production?",
      "answer": "Avoid inserting interpolated untrusted strings as HTML. Tags can implement escaping policies, but template literals alone provide none."
    },
    {
      "id": "javascript-018.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Build readable plain-text output using explicit values. Tags can implement escaping policies, but template literals alone provide none."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
