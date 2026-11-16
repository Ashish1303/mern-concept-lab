import type { Lesson, RunContext } from '../lesson-types';
import { element } from '../runtime';

function example1(ctx: RunContext) {
  const trace: string[] = []; const parent = element(ctx, 'div', 'Parent '); const child = document.createElement('button'); child.textContent = 'Child'; parent.append(child);
  const target = (event: Event) => { trace.push('child'); event.stopPropagation(); }; const ancestor = () => trace.push('parent');
  child.addEventListener('click', target); parent.addEventListener('click', ancestor); ctx.cleanup(() => { child.removeEventListener('click', target); parent.removeEventListener('click', ancestor); }); child.click(); return trace;
}

function example2(ctx: RunContext) {
  const trace: string[] = [];
  for (const immediate of [false, true]) { const button = element(ctx, 'button', immediate ? 'Immediate stop' : 'Propagation stop');
   const first = (event: Event) => { trace.push(immediate ? 'immediate first' : 'normal first'); if (immediate) event.stopImmediatePropagation(); else event.stopPropagation(); };
   const second = () => trace.push('second'); button.addEventListener('click', first); button.addEventListener('click', second);
   ctx.cleanup(() => { button.removeEventListener('click', first); button.removeEventListener('click', second); }); button.click(); }
  return trace;
}

export const lesson = {
  "id": "javascript-086",
  "description": "stopPropagation prevents travel to later nodes; stopImmediatePropagation also stops later listeners on the current node.",
  "when": "Prevent a specific descendant action from invoking an ancestor’s unrelated action.",
  "avoid": "Avoid broadly stopping propagation when coordinated event handling is possible.",
  "tradeoff": "Stopping propagation does not cancel a default action.",
  "mistakes": [
    {
      "problem": "Expecting stopPropagation to suppress another listener on the same node.",
      "fix": "Use stopImmediatePropagation only if suppressing same-node listeners is intentional."
    }
  ],
  "examples": [
    {
      "title": "Stop bubbling after the target",
      "expected": [
        "child"
      ],
      "explanation": "The ancestor bubble listener is not invoked.",
      "runtime": "browser",
      "id": "javascript-086.e01",
      "run": example1
    },
    {
      "title": "Same-node listener behavior differs",
      "expected": [
        "normal first",
        "second",
        "immediate first"
      ],
      "explanation": "Only the immediate variant suppresses the second listener on that same button.",
      "runtime": "browser",
      "id": "javascript-086.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-086.q01",
      "level": "Basic",
      "question": "What does stopPropagation mean here?",
      "answer": "stopPropagation prevents travel to later nodes; stopImmediatePropagation also stops later listeners on the current node."
    },
    {
      "id": "javascript-086.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Stop bubbling after the target”. Why?",
      "answer": "[\"child\"] The ancestor bubble listener is not invoked."
    },
    {
      "id": "javascript-086.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The ancestor bubble listener is not invoked. Only the immediate variant suppresses the second listener on that same button."
    },
    {
      "id": "javascript-086.q04",
      "level": "Debugging",
      "question": "Expecting stopPropagation to suppress another listener on the same node. How would you fix it?",
      "answer": "Use stopImmediatePropagation only if suppressing same-node listeners is intentional."
    },
    {
      "id": "javascript-086.q05",
      "level": "Senior",
      "question": "What constraints matter when using stopPropagation in production?",
      "answer": "Avoid broadly stopping propagation when coordinated event handling is possible. Stopping propagation does not cancel a default action."
    },
    {
      "id": "javascript-086.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Prevent a specific descendant action from invoking an ancestor’s unrelated action. Stopping propagation does not cancel a default action."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
