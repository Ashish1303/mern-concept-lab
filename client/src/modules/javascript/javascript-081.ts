import type { Lesson, RunContext } from '../lesson-types';
import { text, element } from '../runtime';

function example1(ctx: RunContext) {
  const node = element(ctx, 'p', text(ctx.input)); node.dataset.example = 'safe-text';
  return { text: node.textContent, childElements: node.children.length, connected: node.isConnected };
}

function example2(ctx: RunContext) {
  const list = element(ctx, 'ul', '');
  for (const name of ['Ada', 'Grace']) { const item = document.createElement('li'); item.textContent = name; list.append(item); }
  const before = list.children.length; list.firstElementChild?.remove(); return { before, after: list.children.length, remaining: list.textContent };
}

export const lesson = {
  "id": "javascript-081",
  "description": "DOM APIs create and update real document nodes. textContent displays text without interpreting markup.",
  "when": "Update a small isolated DOM region or understand browser node behavior.",
  "avoid": "Avoid injecting user input through innerHTML.",
  "tradeoff": "Manual DOM mutation should stay inside an owned region, especially when React manages the surrounding UI.",
  "mistakes": [
    {
      "problem": "Treating user-supplied text as executable markup.",
      "fix": "Set textContent or use safely escaped rendering; this example uses textContent."
    }
  ],
  "examples": [
    {
      "title": "Create a real text node",
      "expected": {
        "text": "<b>text only</b>",
        "childElements": 0,
        "connected": true
      },
      "explanation": "The literal markup remains text and the node is connected to the example’s DOM region.",
      "runtime": "browser",
      "input": {
        "label": "Text to display",
        "initial": "<b>text only</b>"
      },
      "id": "javascript-081.e01",
      "run": example1
    },
    {
      "title": "Append and remove owned nodes",
      "expected": {
        "before": 2,
        "after": 1,
        "remaining": "Grace"
      },
      "explanation": "Actual DOM children change through append and remove.",
      "runtime": "browser",
      "id": "javascript-081.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "javascript-081.q01",
      "level": "Basic",
      "question": "What does DOM manipulation mean here?",
      "answer": "DOM APIs create and update real document nodes. textContent displays text without interpreting markup."
    },
    {
      "id": "javascript-081.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Create a real text node”. Why?",
      "answer": "{\"text\": \"<b>text only</b>\", \"childElements\": 0, \"connected\": true} The literal markup remains text and the node is connected to the example’s DOM region."
    },
    {
      "id": "javascript-081.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The literal markup remains text and the node is connected to the example’s DOM region. Actual DOM children change through append and remove."
    },
    {
      "id": "javascript-081.q04",
      "level": "Debugging",
      "question": "Treating user-supplied text as executable markup. How would you fix it?",
      "answer": "Set textContent or use safely escaped rendering; this example uses textContent."
    },
    {
      "id": "javascript-081.q05",
      "level": "Senior",
      "question": "What constraints matter when using DOM manipulation in production?",
      "answer": "Avoid injecting user input through innerHTML. Manual DOM mutation should stay inside an owned region, especially when React manages the surrounding UI."
    },
    {
      "id": "javascript-081.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Update a small isolated DOM region or understand browser node behavior. Manual DOM mutation should stay inside an owned region, especially when React manages the surrounding UI."
    }
  ],
  "reference": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
} satisfies Lesson;
