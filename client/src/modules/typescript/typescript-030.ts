import type { Lesson } from '../lesson-types';

function example2() {
  type Props = { label: string; onSelect: (id: number) => void }; const received: number[] = []; function select(props: Props) { props.onSelect(3); return props.label; } return { label: select({ label: 'Select', onSelect: id => received.push(id) }), received };
}

export const lesson = {
  "id": "typescript-030",
  "description": "React prop, event and hook types describe component boundaries and state updates without changing React’s runtime behavior.",
  "when": "Type props, callback parameters, state and DOM events using React’s actual types.",
  "avoid": "Avoid implementing a React hook lesson through a TypeScript type assertion; runtime hook behavior belongs to Phase 3.",
  "tradeoff": "The compile fixture imports real React types and is never mounted or executed as a browser demo.",
  "mistakes": [
    {
      "problem": "Supplying a string update to numeric state.",
      "fix": "Choose the correct useState type and validate external input before dispatching an update."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-030.e01.tsx",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-030.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": {
        "label": "Select",
        "received": [
          3
        ]
      },
      "explanation": "A typed callback contract is exercised as an ordinary function; no React curriculum topic is marked complete.",
      "runtime": "browser",
      "id": "typescript-030.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-030.q01",
      "level": "Basic",
      "question": "What does React component and hook typing mean here?",
      "answer": "React prop, event and hook types describe component boundaries and state updates without changing React’s runtime behavior."
    },
    {
      "id": "typescript-030.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "{\"label\": \"Select\", \"received\": [3]} A typed callback contract is exercised as an ordinary function; no React curriculum topic is marked complete."
    },
    {
      "id": "typescript-030.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. A typed callback contract is exercised as an ordinary function; no React curriculum topic is marked complete."
    },
    {
      "id": "typescript-030.q04",
      "level": "Debugging",
      "question": "Supplying a string update to numeric state. How would you fix it?",
      "answer": "Choose the correct useState type and validate external input before dispatching an update."
    },
    {
      "id": "typescript-030.q05",
      "level": "Senior",
      "question": "What constraints matter when using React component and hook typing in production?",
      "answer": "Avoid implementing a React hook lesson through a TypeScript type assertion; runtime hook behavior belongs to Phase 3. The compile fixture imports real React types and is never mounted or executed as a browser demo."
    },
    {
      "id": "typescript-030.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Type props, callback parameters, state and DOM events using React’s actual types. The compile fixture imports real React types and is never mounted or executed as a browser demo."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
