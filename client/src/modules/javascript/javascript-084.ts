import type { Lesson, RunContext } from '../lesson-types';
import { element } from '../runtime';

function example1(ctx: RunContext) {
  const list = element(ctx, 'div', ''); const values: string[] = [];
  const listener = (event: Event) => { const target = event.target; if (target instanceof HTMLButtonElement && list.contains(target)) values.push(target.dataset.id ?? 'missing'); };
  list.addEventListener('click', listener); ctx.cleanup(() => list.removeEventListener('click', listener));
  const button = document.createElement('button'); button.textContent = 'Added later'; button.dataset.id = 'new'; list.append(button); button.click(); return values;
}

function example2(ctx: RunContext) {
  const list = element(ctx, 'div', ''); const values: string[] = [];
  const button = document.createElement('button'); button.dataset.id = 'nested'; const span = document.createElement('span'); span.textContent = 'Nested label'; button.append(span); list.append(button);
  const listener = (event: Event) => { if (!(event.target instanceof Element)) return; const action = event.target.closest('button'); if (action && list.contains(action)) values.push(action.dataset.id ?? 'missing'); };
  list.addEventListener('click', listener); ctx.cleanup(() => list.removeEventListener('click', listener)); span.click(); return values;
}

export const lesson = {
  "id": "javascript-084",
  "description": "Event delegation uses an ancestor listener to handle events from current and future descendants.",
  "when": "Handle lists whose items are added or replaced dynamically.",
  "avoid": "Avoid assuming the exact event target is the actionable element when it contains nested markup.",
  "tradeoff": "One listener reduces per-item registration but relies on bubbling and correct target filtering.",
  "mistakes": [
    {
      "problem": "Checking only target.tagName and missing clicks on a nested span.",
      "fix": "Resolve closest actionable ancestor and confirm it belongs to the owned container."
    }
  ],
  "examples": [
    {
      "title": "Delegate to a dynamically added child",
      "expected": [
        "new"
      ],
      "explanation": "The listener was installed before the child existed and still handles its bubbling click.",
      "runtime": "browser",
      "id": "javascript-084.e01",
      "run": example1
    },
    {
      "title": "Nested target requires closest",
      "expected": [
        "nested"
      ],
      "explanation": "closest finds the button even though the actual clicked node is its span.",
      "runtime": "browser",
      "id": "javascript-084.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-084.q01",
      "level": "Basic",
      "question": "What does Event delegation mean here?",
      "answer": "Event delegation uses an ancestor listener to handle events from current and future descendants."
    },
    {
      "id": "javascript-084.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Delegate to a dynamically added child”. Why?",
      "answer": "[\"new\"] The listener was installed before the child existed and still handles its bubbling click."
    },
    {
      "id": "javascript-084.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The listener was installed before the child existed and still handles its bubbling click. closest finds the button even though the actual clicked node is its span."
    },
    {
      "id": "javascript-084.q04",
      "level": "Debugging",
      "question": "Checking only target.tagName and missing clicks on a nested span. How would you fix it?",
      "answer": "Resolve closest actionable ancestor and confirm it belongs to the owned container."
    },
    {
      "id": "javascript-084.q05",
      "level": "Senior",
      "question": "What constraints matter when using Event delegation in production?",
      "answer": "Avoid assuming the exact event target is the actionable element when it contains nested markup. One listener reduces per-item registration but relies on bubbling and correct target filtering."
    },
    {
      "id": "javascript-084.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Handle lists whose items are added or replaced dynamically. One listener reduces per-item registration but relies on bubbling and correct target filtering."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
