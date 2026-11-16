import type { Lesson, RunContext } from '../lesson-types';
import { element } from '../runtime';

function example1(ctx: RunContext) {
  const anchor = element(ctx, 'a', 'Stay in this example'); anchor.href = '#lab-never-navigate';
  const listener = (event: Event) => event.preventDefault(); anchor.addEventListener('click', listener); ctx.cleanup(() => anchor.removeEventListener('click', listener));
  const event = new MouseEvent('click', { bubbles: true, cancelable: true }); const allowed = anchor.dispatchEvent(event);
  return { defaultPrevented: event.defaultPrevented, dispatchAllowed: allowed };
}

function example2(ctx: RunContext) {
  const node = element(ctx, 'div', 'Noncancelable event'); const listener = (event: Event) => event.preventDefault();
  node.addEventListener('lab-event', listener); ctx.cleanup(() => node.removeEventListener('lab-event', listener));
  const event = new Event('lab-event', { cancelable: false }); node.dispatchEvent(event); return event.defaultPrevented;
}

export const lesson = {
  "id": "javascript-085",
  "description": "preventDefault cancels a cancelable event’s default action; it does not stop propagation.",
  "when": "Take ownership of a form submit or navigation while providing an alternative behavior.",
  "avoid": "Avoid cancelling noncancelable events or assuming propagation stops too.",
  "tradeoff": "Passive listeners cannot cancel a default action.",
  "mistakes": [
    {
      "problem": "Confusing default cancellation with stopPropagation.",
      "fix": "Check cancelable/defaultPrevented and use propagation controls separately when needed."
    }
  ],
  "examples": [
    {
      "title": "Cancel a real anchor event without navigation",
      "expected": {
        "defaultPrevented": true,
        "dispatchAllowed": false
      },
      "explanation": "dispatchEvent returns false when a cancelable event was cancelled.",
      "runtime": "browser",
      "id": "javascript-085.e01",
      "run": example1
    },
    {
      "title": "Noncancelable event ignores preventDefault",
      "expected": false,
      "explanation": "The event’s contract forbids default cancellation.",
      "runtime": "browser",
      "id": "javascript-085.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-085.q01",
      "level": "Basic",
      "question": "What does preventDefault mean here?",
      "answer": "preventDefault cancels a cancelable event’s default action; it does not stop propagation."
    },
    {
      "id": "javascript-085.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Cancel a real anchor event without navigation”. Why?",
      "answer": "{\"defaultPrevented\": true, \"dispatchAllowed\": false} dispatchEvent returns false when a cancelable event was cancelled."
    },
    {
      "id": "javascript-085.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "dispatchEvent returns false when a cancelable event was cancelled. The event’s contract forbids default cancellation."
    },
    {
      "id": "javascript-085.q04",
      "level": "Debugging",
      "question": "Confusing default cancellation with stopPropagation. How would you fix it?",
      "answer": "Check cancelable/defaultPrevented and use propagation controls separately when needed."
    },
    {
      "id": "javascript-085.q05",
      "level": "Senior",
      "question": "What constraints matter when using preventDefault in production?",
      "answer": "Avoid cancelling noncancelable events or assuming propagation stops too. Passive listeners cannot cancel a default action."
    },
    {
      "id": "javascript-085.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Take ownership of a form submit or navigation while providing an alternative behavior. Passive listeners cannot cancel a default action."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
