import type { Lesson, RunContext } from '../lesson-types';
import { element } from '../runtime';

function example1(ctx: RunContext) {
  const trace: string[] = []; const parent = element(ctx, 'div', 'Parent '); const child = document.createElement('button'); child.textContent = 'Child'; parent.append(child);
  const target = () => trace.push('child'); const bubble = () => trace.push('parent');
  child.addEventListener('click', target); parent.addEventListener('click', bubble);
  ctx.cleanup(() => { child.removeEventListener('click', target); parent.removeEventListener('click', bubble); }); child.click(); return trace;
}

function example2(ctx: RunContext) {
  const parent = element(ctx, 'div', ''); parent.id = 'lab-parent'; const child = document.createElement('button'); child.id = 'lab-child'; child.textContent = 'Click target'; parent.append(child);
  const trace: string[] = []; const listener = (event: Event) => trace.push(`${(event.target as HTMLElement).id}:${(event.currentTarget as HTMLElement).id}`);
  parent.addEventListener('click', listener); ctx.cleanup(() => parent.removeEventListener('click', listener)); child.click(); return trace;
}

export const lesson = {
  "id": "javascript-082",
  "description": "A bubbling event travels from its target through ancestor listeners after the target phase.",
  "when": "Handle descendant events at an appropriate ancestor.",
  "avoid": "Avoid assuming event.target and event.currentTarget refer to the same node.",
  "tradeoff": "Only events configured to bubble reach ancestor bubble listeners.",
  "mistakes": [
    {
      "problem": "Reading the listening ancestor as if it were always the clicked target.",
      "fix": "Use target for origin and currentTarget for the listener owner."
    }
  ],
  "examples": [
    {
      "title": "Target then ancestor bubble listener",
      "expected": [
        "child",
        "parent"
      ],
      "explanation": "The actual click reaches the target listener before the ancestor bubble listener.",
      "runtime": "browser",
      "id": "javascript-082.e01",
      "run": example1
    },
    {
      "title": "Origin versus listener owner",
      "expected": [
        "lab-child:lab-parent"
      ],
      "explanation": "target stays the child while currentTarget identifies the ancestor handling the event.",
      "runtime": "browser",
      "id": "javascript-082.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-082.q01",
      "level": "Basic",
      "question": "What does Event bubbling mean here?",
      "answer": "A bubbling event travels from its target through ancestor listeners after the target phase."
    },
    {
      "id": "javascript-082.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Target then ancestor bubble listener”. Why?",
      "answer": "[\"child\", \"parent\"] The actual click reaches the target listener before the ancestor bubble listener."
    },
    {
      "id": "javascript-082.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The actual click reaches the target listener before the ancestor bubble listener. target stays the child while currentTarget identifies the ancestor handling the event."
    },
    {
      "id": "javascript-082.q04",
      "level": "Debugging",
      "question": "Reading the listening ancestor as if it were always the clicked target. How would you fix it?",
      "answer": "Use target for origin and currentTarget for the listener owner."
    },
    {
      "id": "javascript-082.q05",
      "level": "Senior",
      "question": "What constraints matter when using Event bubbling in production?",
      "answer": "Avoid assuming event.target and event.currentTarget refer to the same node. Only events configured to bubble reach ancestor bubble listeners."
    },
    {
      "id": "javascript-082.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Handle descendant events at an appropriate ancestor. Only events configured to bubble reach ancestor bubble listeners."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
