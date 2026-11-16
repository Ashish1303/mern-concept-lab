import type { Lesson } from '../lesson-types';
import { configureStore, createSlice } from '@reduxjs/toolkit';

function example2() {
  const counter = createSlice({ name: 'typedLocal', initialState: 0, reducers: { increment: state => state + 1 } }); const store = configureStore({ reducer: counter.reducer }); type State = ReturnType<typeof store.getState>; type Dispatch = typeof store.dispatch; const dispatch: Dispatch = store.dispatch; dispatch(counter.actions.increment()); const value: State = store.getState(); return value;
}

export const lesson = {
  "id": "typescript-031",
  "description": "Redux RootState and AppDispatch should be derived from the actual store; typed hooks preserve those contracts.",
  "when": "Keep state selectors and action payloads synchronized with configured reducers.",
  "avoid": "Avoid handwritten duplicate state shapes or untyped payload dispatches.",
  "tradeoff": "The small local store here demonstrates TypeScript integration only; full Redux behavior and RTK Query remain Phase 5 topics.",
  "mistakes": [
    {
      "problem": "Dispatching a string payload to a numeric reducer.",
      "fix": "Derive types with ReturnType<typeof store.getState> and typeof store.dispatch."
    }
  ],
  "examples": [
    {
      "title": "Compile-time contract: accepted and rejected code",
      "runtime": "typecheck",
      "fixture": "typescript/fixtures/typescript-031.e01.ts",
      "expected": "The valid statements typecheck. Removing the marked expected-error directives produces the recorded compiler diagnostics.",
      "explanation": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic.",
      "id": "typescript-031.e01"
    },
    {
      "title": "Runtime behavior after type erasure",
      "expected": 1,
      "explanation": "The actual isolated RTK store processes a correctly typed action. It is recreated for every run, not installed as application-global state.",
      "runtime": "browser",
      "id": "typescript-031.e02",
      "run": example2
    }
  ],
  "questions": [
    {
      "id": "typescript-031.q01",
      "level": "Basic",
      "question": "What does Redux state and dispatch typing mean here?",
      "answer": "Redux RootState and AppDispatch should be derived from the actual store; typed hooks preserve those contracts."
    },
    {
      "id": "typescript-031.q02",
      "level": "Output prediction",
      "question": "Predict the default result of “Runtime behavior after type erasure”. Why?",
      "answer": "1 The actual isolated RTK store processes a correctly typed action. It is recreated for every run, not installed as application-global state."
    },
    {
      "id": "typescript-031.q03",
      "level": "Intermediate",
      "question": "How do the first two examples differ?",
      "answer": "The build checks the actual fixture with TypeScript, then removes its expected-error directives to verify the negative diagnostic. The actual isolated RTK store processes a correctly typed action. It is recreated for every run, not installed as application-global state."
    },
    {
      "id": "typescript-031.q04",
      "level": "Debugging",
      "question": "Dispatching a string payload to a numeric reducer. How would you fix it?",
      "answer": "Derive types with ReturnType<typeof store.getState> and typeof store.dispatch."
    },
    {
      "id": "typescript-031.q05",
      "level": "Senior",
      "question": "What constraints matter when using Redux state and dispatch typing in production?",
      "answer": "Avoid handwritten duplicate state shapes or untyped payload dispatches. The small local store here demonstrates TypeScript integration only; full Redux behavior and RTK Query remain Phase 5 topics."
    },
    {
      "id": "typescript-031.q06",
      "level": "Scenario",
      "question": "Where would this approach fit in a real application?",
      "answer": "Keep state selectors and action payloads synchronized with configured reducers. The small local store here demonstrates TypeScript integration only; full Redux behavior and RTK Query remain Phase 5 topics."
    }
  ],
  "reference": "https://www.typescriptlang.org/docs/handbook/intro.html"
} satisfies Lesson;
