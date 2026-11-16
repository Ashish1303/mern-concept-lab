# Phase 5 Redux Toolkit and RTK Query

Status **APPROVED_COMPLETE**. The user approved Phase 5 and authorized Phase 6 on November 15, 2026.

## Coverage

The [topic checklist](TOPIC_CHECKLIST.md) tracks all 42 lessons and 10 required projects. Phase 5 adds 112 demos and 252 interview questions. Each demo includes editable source, Run, Reset, Stop, error output, and a separate reference implementation. Network lessons also show the Express route source.

| Area | Practical coverage |
| --- | --- |
| Redux fundamentals | Store snapshots, actions, reducers, dispatch, selectors, typed hooks, immutable transitions, and Context comparison |
| Redux Toolkit | Slice composition, carts and todos, selectors and normalization, middleware, thunk lifecycle, cancellation, persistence, errors, and tests |
| RTK Query | Generated hooks, request configuration, queries and mutations, cache retention and invalidation, tags, polling, refetch, optimism and rollback, pagination, demo authentication, deduplication, and HTTP assertions |

| Required project | Lesson and example ID |
| --- | --- |
| Counter using Redux | Redux data flow · redux-043.e01 |
| Shopping cart | createSlice · redux-044.e01 |
| Product filters | createSelector · redux-045.e01 |
| Todo application | createSlice · redux-046.e01 |
| Async user fetching | createAsyncThunk · redux-047.e01 |
| Loading and error states | Pending/fulfilled/rejected · redux-048.e01 |
| CRUD using RTK Query and Express | createApi · redux-049.e01 |
| Cache invalidation | Cache invalidation · redux-050.e01 |
| Optimistic updates with rollback | Undo and rollback · redux-051.e01 |
| Redux vs Context comparison | Redux vs Context API · redux-052.e01 |

The real Express task API stores teaching data in bounded in-memory workspaces. The reference demo and each editor run receive separate workspaces. Refreshing or resetting starts a new workspace. The profile endpoint validates a public teaching value and exercises HTTP 401 handling and cache clearing on sign-out. Redux DevTools configuration is executable, and the recorded action timeline works without installing the extension.

## Verification

- TypeScript, lint, and production build passed. The browser-only preview build emits a React Router client-directive warning. Dependency audit reports zero known vulnerabilities. [TypeScript](evidence/phase-5/typecheck.txt) · [Lint](evidence/phase-5/lint.txt) · [Build](evidence/phase-5/build.txt) · [Audit](evidence/phase-5/audit.json)
- All 1,381 tests passed across the full run and focused reruns. Two earlier-phase tests timed out in the batch and passed when rerun separately. Every Phase 5 interaction and snippet definition passed in the full run. The suite also verifies HTTP CRUD, workspace isolation, request deduplication, rollback, and profile removal on sign-out. [Full run](evidence/phase-5/tests.txt) · [Phase 2 UI rerun](evidence/phase-5/phase-2-ui-recheck.txt) · [Compiler rerun](evidence/phase-5/compiler-recheck.txt)
- Development browser checks covered local state, modified code and output, a syntax diagnostic, reset, narrow layout, sidebar navigation, and successful rollback in both views. [Development browser results](evidence/phase-5/development-browser.json)
- Production browser checks covered direct refresh, CRUD in both views, isolated task state, HTTP 401, authenticated profile requests in both views, and sign-out. [Production browser results](evidence/phase-5/production-browser.json) · [CRUD screenshot](evidence/phase-5/crud-preview.jpg)

