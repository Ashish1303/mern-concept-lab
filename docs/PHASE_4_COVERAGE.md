# Phase 4 Advanced React

Status **APPROVED_COMPLETE**. The user explicitly approved Phase 4 before authorizing Phase 5 on 2026-11-09.

## Coverage

The [topic checklist](TOPIC_CHECKLIST.md) tracks all 27 topics from `react-074` through `react-100`. Each has two distinct interactive demos, editable TypeScript or TSX with Run, Reset, Stop and error output, expected and actual results, usage guidance, common mistakes, and six interview questions. Phase 4 adds 54 demos and 162 questions, bringing the application to 505 editor views.

| Topic range | Working examples |
| --- | --- |
| 074–081 | Memoized child updates, higher-order wrappers, render props, scoped Context, prop forwarding and composition, ref focus and imperative handles, portal placement and bubbling, and boundary fallback and retry |
| 082–084 | Lazy default and named exports, Suspense fallback and transition, and separate report and utility modules |
| 085–091 | Link and active navigation, dynamic and nested routes, simulated route guards, imperative history, inherited parameters, and query state |
| 092–095 | Deferred computation, Profiler traces, debouncing, throttling, and a 10,000-row virtual list |
| 096–100 | DOM assertions, Express integration checks, state placement, memoization comparisons, Context settings, and a real Redux Toolkit slice |

The routing exercises have independent memory history. Protected routes simulate sign-in and role state. Real authorization belongs on the server. The standard production build shows actual commit markers in the Profiler lesson. React reports timing callbacks in development and profiling-enabled builds. The built application splits optional report and calculator modules into separate assets. The isolated editor resolves those same modules from its compiled source bundle.

## Verification

- TypeScript, lint, and production build passed. TypeScript verified all 40 positive and 40 negative compiler fixtures. The browser-only preview bundle emits a React Router client-directive build warning. The dependency audit reports zero known vulnerabilities. [TypeScript](evidence/phase-4/typecheck.txt) · [Lint](evidence/phase-4/lint.txt) · [Build](evidence/phase-4/build.txt) · [Audit](evidence/phase-4/audit.json)
- All 1,147 tests passed across the client and server. Every Phase 4 demo has an interaction test, and all 54 Phase 4 snippets have compiler and import coverage. The final focused rerun passed 68 Advanced React and registry checks. [Full suite](evidence/phase-4/tests.txt) · [Focused suite](evidence/phase-4/focused-tests.txt)
- The development browser pass exercised route guards in both views, modified source, syntax diagnostics and reset, interview answer disclosure, direct refresh and history, Suspense fallback and reveal, Profiler timing, dynamic import, virtualization, Redux, and the Express API in both views. The narrow viewport showed five mounted rows at row 5,000. [Development browser observations](evidence/phase-4/development-browser.json)
- The production browser pass exercised the separately built report and calculation modules, portal placement, Profiler commit markers, direct refresh of the handled HTTP 503 demo, and Redux in the isolated preview. The browser console captured no warning or error messages in either pass. [Production browser observations](evidence/phase-4/production-browser.json) · [Redux preview screenshot](evidence/phase-4/redux-preview.jpg)
