import type { Lesson, RunContext } from '../lesson-types';
import { element } from '../runtime';

function example1(ctx: RunContext) {
  const trace: number[] = []; const parent = element(ctx, 'div', 'Parent '); const child = document.createElement('button'); child.textContent = 'Child'; parent.append(child);
  const record = (event: Event) => trace.push(event.eventPhase);
  parent.addEventListener('click', record, true); child.addEventListener('click', record); parent.addEventListener('click', record);
  ctx.cleanup(() => { parent.removeEventListener('click', record, true); child.removeEventListener('click', record); parent.removeEventListener('click', record); }); child.click(); return trace;
}

function example2(ctx: RunContext) {
  const trace: string[] = []; const button = element(ctx, 'button', 'Target');
  const captureListener = (event: Event) => trace.push(`capture:${event.eventPhase}`); const bubbleListener = (event: Event) => trace.push(`bubble:${event.eventPhase}`);
  button.addEventListener('click', captureListener, true); button.addEventListener('click', bubbleListener);
  ctx.cleanup(() => { button.removeEventListener('click', captureListener, true); button.removeEventListener('click', bubbleListener); }); button.click(); return trace;
}

export const lesson = {
  "id": "javascript-083",
  "description": "Capture listeners run on ancestors before the target; target and bubble phases follow.",
  "when": "Observe or coordinate descendant events before their target handlers.",
  "avoid": "Avoid using capture to bypass clear ownership of event behavior.",
  "tradeoff": "At the target, both capture and bubble listeners report AT_TARGET rather than an ancestor phase.",
  "mistakes": [
    {
      "problem": "Expecting a capture listener to run after the target handler.",
      "fix": "Choose capture deliberately and match the capture flag when removing the listener."
    }
  ],
  "examples": [
    {
      "title": "Capture, target and bubble phases",
      "expected": [
        1,
        2,
        3
      ],
      "explanation": "The trace comes from the browser’s actual eventPhase values.",
      "runtime": "browser",
      "id": "javascript-083.e01",
      "run": example1
    },
    {
      "title": "Capture and bubble listeners on the target",
      "expected": [
        "capture:2",
        "bubble:2"
      ],
      "explanation": "Both handlers execute at the target, with target-capture before target-bubble.",
      "runtime": "browser",
      "id": "javascript-083.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-083.q01",
      "level": "Basic",
      "question": "What does Event capturing mean here?",
      "answer": "Capture listeners run on ancestors before the target; target and bubble phases follow."
    },
    {
      "id": "javascript-083.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Capture, target and bubble phases”. Why?",
      "answer": "[1, 2, 3] The trace comes from the browser’s actual eventPhase values."
    },
    {
      "id": "javascript-083.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The trace comes from the browser’s actual eventPhase values. Both handlers execute at the target, with target-capture before target-bubble."
    },
    {
      "id": "javascript-083.q04",
      "level": "Debugging",
      "question": "Expecting a capture listener to run after the target handler. How would you fix it?",
      "answer": "Choose capture deliberately and match the capture flag when removing the listener."
    },
    {
      "id": "javascript-083.q05",
      "level": "Senior",
      "question": "What constraints matter when using Event capturing in production?",
      "answer": "Avoid using capture to bypass clear ownership of event behavior. At the target, both capture and bubble listeners report AT_TARGET rather than an ancestor phase."
    },
    {
      "id": "javascript-083.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Observe or coordinate descendant events before their target handlers. At the target, both capture and bubble listeners report AT_TARGET rather than an ancestor phase."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
