import type { Lesson, RunContext } from '../lesson-types';
import { element } from '../runtime';

function example1(ctx: RunContext) {
  const input = element(ctx, 'input', ''); let events = 0; const listener = () => events++;
  input.addEventListener('input', listener); ctx.cleanup(() => input.removeEventListener('input', listener)); input.value = 'Ada'; const afterAssignment = events;
  input.dispatchEvent(new Event('input', { bubbles: true })); return { afterAssignment, afterDispatch: events, value: input.value };
}

function example2(ctx: RunContext) {
  const node = element(ctx, 'div', 'Custom event target'); const values: unknown[] = [];
  const listener = (event: Event) => { if (event instanceof CustomEvent) values.push(event.detail as unknown); };
  node.addEventListener('lab-message', listener); ctx.cleanup(() => node.removeEventListener('lab-message', listener));
  node.dispatchEvent(new CustomEvent('lab-message', { detail: { count: 2 } })); return values;
}

export const lesson = {
  "id": "javascript-090",
  "description": "Browser events notify listeners about user or programmatic actions. Setting a property does not necessarily dispatch its corresponding event.",
  "when": "Observe input and custom component integration through documented event contracts.",
  "avoid": "Avoid assuming programmatic input.value assignment fires input.",
  "tradeoff": "Synthetic events are not trusted user activation and cannot bypass browser permissions.",
  "mistakes": [
    {
      "problem": "Updating an input value without notifying event-based consumers.",
      "fix": "Dispatch an explicit event when simulating a browser input contract; real user typing generates events itself."
    }
  ],
  "examples": [
    {
      "title": "Property assignment versus input event",
      "expected": {
        "afterAssignment": 0,
        "afterDispatch": 1,
        "value": "Ada"
      },
      "explanation": "The real input listener runs only after event dispatch.",
      "runtime": "browser",
      "id": "javascript-090.e01",
      "run": example1
    },
    {
      "title": "Custom event carries detail",
      "expected": [
        {
          "count": 2
        }
      ],
      "explanation": "A CustomEvent carries structured detail to its registered listener.",
      "runtime": "browser",
      "id": "javascript-090.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-090.q01",
      "level": "Basic",
      "question": "What does Browser events mean here?",
      "answer": "Browser events notify listeners about user or programmatic actions. Setting a property does not necessarily dispatch its corresponding event."
    },
    {
      "id": "javascript-090.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Property assignment versus input event”. Why?",
      "answer": "{\"afterAssignment\": 0, \"afterDispatch\": 1, \"value\": \"Ada\"} The real input listener runs only after event dispatch."
    },
    {
      "id": "javascript-090.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The real input listener runs only after event dispatch. A CustomEvent carries structured detail to its registered listener."
    },
    {
      "id": "javascript-090.q04",
      "level": "Debugging",
      "question": "Updating an input value without notifying event-based consumers. How would you fix it?",
      "answer": "Dispatch an explicit event when simulating a browser input contract; real user typing generates events itself."
    },
    {
      "id": "javascript-090.q05",
      "level": "Senior",
      "question": "What constraints matter when using Browser events in production?",
      "answer": "Avoid assuming programmatic input.value assignment fires input. Synthetic events are not trusted user activation and cannot bypass browser permissions."
    },
    {
      "id": "javascript-090.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Observe input and custom component integration through documented event contracts. Synthetic events are not trusted user activation and cannot bypass browser permissions."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
