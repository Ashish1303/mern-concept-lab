import type { Lesson, RunContext } from '../lesson-types';
import { text } from '../runtime';

function example2(ctx: RunContext) {
  type State = { kind: 'loading' } | { kind: 'ready'; value: string } | { kind: 'error'; message: string };
  const input = text(ctx.input); let state: State;
  if (input === 'ready') state = { kind: 'ready', value: 'Ada' }; else if (input === 'error') state = { kind: 'error', message: 'offline' }; else if (input === 'loading') state = { kind: 'loading' }; else throw new Error('Choose ready, error or loading.');
  switch (state.kind) { case 'ready': return state.value; case 'error': return state.message; case 'loading': return 'waiting'; }
}

export const lesson = {
  "id": "typescript-024",
  "description": "A discriminated union uses a shared literal field to select a specific payload shape.",
  "when": "Model request states or domain alternatives with exhaustive handling.",
  "avoid": "Avoid multiple unrelated optional fields that permit impossible combinations.",
  "tradeoff": "An assertNever boundary catches missing cases at compile time but external state still needs runtime validation.",
  "mistakes": [
    {
      "problem": "Reading a ready-only payload while the state is loading.",
      "fix": "Check the discriminant and use an exhaustive switch for every member."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-024.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-024.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": "Ada",
      "explanation": "The selected state carries only the payload allowed by its literal discriminant.",
      "runtime": "browser",
      "input": {
        "label": "State: ready, error or loading",
        "initial": "ready"
      },
      "id": "typescript-024.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-024.q01",
      "level": "Basic",
      "question": "What does Discriminated unions mean here?",
      "answer": "A discriminated union uses a shared literal field to select a specific payload shape."
    },
    {
      "id": "typescript-024.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "\"Ada\" The selected state carries only the payload allowed by its literal discriminant."
    },
    {
      "id": "typescript-024.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The selected state carries only the payload allowed by its literal discriminant."
    },
    {
      "id": "typescript-024.q04",
      "level": "Debugging",
      "question": "Reading a ready-only payload while the state is loading. How would you fix it?",
      "answer": "Check the discriminant and use an exhaustive switch for every member."
    },
    {
      "id": "typescript-024.q05",
      "level": "Senior",
      "question": "What constraints matter when using Discriminated unions in production?",
      "answer": "Avoid multiple unrelated optional fields that permit impossible combinations. An assertNever boundary catches missing cases at compile time but external state still needs runtime validation."
    },
    {
      "id": "typescript-024.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Model request states or domain alternatives with exhaustive handling. An assertNever boundary catches missing cases at compile time but external state still needs runtime validation."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
