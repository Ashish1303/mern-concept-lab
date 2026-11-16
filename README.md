# MERN Concept Lab

Learn interview concepts with editable TypeScript/TSX snippets, working demonstrations and interview questions. The MERN Concept Lab is complete. All 10 phases and the editable-snippet enhancement are approved. See the [final review](docs/PHASE_10_REVIEW.md) for coverage, checks, and local setup.

## Run locally

Requirements: Node.js 24.15+ within the supported 24.x line, npm, and a modern browser. Verified with Node 24.15.0 and npm 11.12.1. The MongoDB and End-to-End MERN modules use a dedicated local replica set.

From `E:\ReactNodeFullApp\mern-concept-lab`:

```powershell
npm ci
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173). Express runs on port 4000; the client proxies `/api` to it. The API process also serves the isolated snippet preview at http://127.0.0.2:4001. Keep the development command running for editable previews and API examples; Ctrl+C stops all its listeners.

For MongoDB and End-to-End MERN demos, follow the [Windows replica set setup](docs/PHASE_8_COVERAGE.md#start-the-local-database-lab-on-windows). Run `npm ci` before the initializer and set `MONGO_LAB_PORT` in the same PowerShell window that starts the lab or runs tests. For the local production build, run `npm run build` followed by `npm start` and open [http://127.0.0.1:4000](http://127.0.0.1:4000).

You may copy `.env.example` to a root `.env`. Existing process environment values take precedence. The local demos use sample data and credentials.

| Variable | Default | Purpose |
| --- | --- | --- |
| PORT | 4000 | API port, integer 1–65535; the client proxy uses the same setting. |
| PLAYGROUND_PORT | PORT + 1 | Isolated code preview on 127.0.0.2; must differ from PORT and stay within 1–65535. |
| CLIENT_PORT | 5173 | Vite port; an occupied port causes an explicit failure. |
| HOST | 127.0.0.1 | API bind address; localhost and 0.0.0.0 also supported. Keep loopback for local review. |
| NODE_ENV | development | development, production or test. npm start explicitly selects production serving. |
| MONGO_LAB_PORT | unset | Dedicated local MongoDB replica set port for the MongoDB and MERN demos. The setup uses 27180. |

If a port is occupied, change the root environment setting and restart. Never put secrets in frontend variables. Real .env files, node_modules, build output and runtime data are ignored by Git.

## Edit code and run it

Every implemented lesson now shows an editable snippet before its original demonstration. Change the code and click Run to execute your changes. Reset restores all code and input; Stop ends the preview and compilation. Use Code file for editable supporting implementations. The original demo, expected results, full source and interview questions remain available for comparison.

There are 979 editor views, including 939 executable examples and 40 TypeScript compiler exercises. Compiler exercises deliberately start with invalid statements: fix them and Run again. Runtime TSX is transpiled; full semantic type checks belong to the compiler exercises. Edits stay in memory for the selected example, including during search; changing examples or refreshing restores the original source.

Code runs locally in a separate loopback preview, not on Express or through an online code service. Network examples use the actual fixed lab API. Storage follows the preview origin and browser policy; SameSite cookie behavior can differ from the first-party reference demo. The preview uses production React, so development StrictMode replay can differ from the reference app.

npm run dev and npm run build generate the preview runtime and public compiler declarations. npm test also generates them for a clean checkout. PLAYGROUND_PORT defaults to PORT + 1; change it if occupied. If PORT is 65535, set an explicit different preview port. The preview binds only to 127.0.0.2, independent of the API HOST setting.

See the [editable-snippet report](docs/EDITABLE_SNIPPETS.md) for the original enhancement and the [Phase 4 report](docs/PHASE_4_COVERAGE.md) for the additional examples.

## Phase 9 End-to-End MERN

Open **End-to-End MERN** in the sidebar for 23 interactive scenarios and 138 interview questions. Start a workspace to run React, Express, and MongoDB together. The editable preview uses a separate workspace. [Setup, production walkthrough, and verification](docs/PHASE_9_COVERAGE.md)

## Phase 8 MongoDB and Mongoose

Open **MongoDB + Mongoose** in the sidebar for 59 lessons, 139 database demos, and 354 interview questions. The editor varies the request input, and the backend executes the displayed operation against a fresh fixture database. Start the dedicated local replica set and opt in with MONGO_LAB_PORT. [Local setup and verification](docs/PHASE_8_COVERAGE.md)

## Phase 7 Express.js

Open **Express.js** in the sidebar for 37 lessons, 102 API demos, and 222 interview questions. Each run shows HTTP status, selected headers, and response data from a fresh local Express fixture. The editor runs the request code and the source panel shows the server implementation. [Coverage and verification](docs/PHASE_7_COVERAGE.md)

## Phase 6 Node.js

Open **Node.js** in the sidebar for 46 lessons, 98 backend demos, and 276 interview questions. The editable snippet changes the request and its inputs. The server source is visible below each demo. [Coverage and verification](docs/PHASE_6_COVERAGE.md)

## Phase 5 Redux Toolkit and RTK Query

Open **Redux Toolkit** in the sidebar for 42 lessons, 112 editable demos, and 252 interview questions. Try the [shopping cart](http://127.0.0.1:5173/learn/redux/redux-012?example=redux-044.e01), [Express CRUD](http://127.0.0.1:5173/learn/redux/redux-027?example=redux-049.e01), and [optimistic rollback](http://127.0.0.1:5173/learn/redux/redux-037?example=redux-051.e01). The Express task API uses temporary in-memory workspaces. Its protected endpoint uses a public teaching value. [Phase 5 coverage and verification](docs/PHASE_5_COVERAGE.md).

## Phase 4 Advanced React

Open **React.js → Advanced React** in the sidebar. The 27 topics include 54 demos and 162 interview questions. Try [Suspense](http://127.0.0.1:5173/learn/react/react-083), [Protected routes](http://127.0.0.1:5173/learn/react/react-088), [Large-list virtualization](http://127.0.0.1:5173/learn/react/react-095), or [Context API vs Redux Toolkit](http://127.0.0.1:5173/learn/react/react-100). Every example includes an editable snippet and the original demo. See the [coverage and verification report](docs/PHASE_4_COVERAGE.md).

## Phase 3 React workflow

Choose a React topic, select an example, and use its actual controls. Reset remounts with fresh local state; Unmount lets you inspect cleanup in the retained trace. State and props are rendered by React, not a simulated runner. Commit/effect events are recorded by a separate subscriber so inspecting a trace does not rerender the component under test. Development StrictMode can add setup/cleanup probes; production does not replay them.

There are 46 topics, 118 distinct demos and 276 questions. [useState](http://127.0.0.1:5173/learn/react/react-027) has all ten cases; [useEffect](http://127.0.0.1:5173/learn/react/react-028) has all seventeen. Old mandatory-example links remain aliases to those implementations. See [the Phase 3 ledger](docs/PHASE_3_COVERAGE.md).

Network examples require Express. POST /api/v1/lab/ack validates a label up to 40 characters and optional boolean fail/slow flags, then returns a real acknowledgement (100 ms, or bounded 800 ms for visible pending behavior). It does not persist records. Cancellation requests use a bounded 1000 ms GET delay so a person can click Cancel.

The insertion-effect example is for CSS-in-JS library authors and copies the production HTML style nonce; no state update or attached-ref read occurs in that phase. Layout measurements require a real browser. useDebugValue labels require React Developer Tools; displayed output is ordinary state, and automated checks validate the real registration/formatter. React use reads a Promise created once per event above Suspense, never a new Promise each render. Effect Events are called only by effect-installed callbacks and retain real subscription dependencies.

## Phase 2 learning workflow

The sidebar has eight expandable categories and topic search. The sidebar includes working lessons for all eight categories.

Choose a topic, predict an example’s result, then run it. Examples with inputs accept bounded text, numeric JSON or a documented option. The expected output describes the default input; actual output is computed separately and can differ when inputs change. Reset cancels active work and restores the initial input. Output uses formatted JSON with explicit kind/value labels for non-JSON values, so NaN, negative zero and undefined are not silently converted to null, zero or missing fields. Every lesson includes purpose, usage/avoidance guidance, internal behavior, mistakes/fixes, six interview questions and actual implementation source.

Suggested review routes:

- [Closures](http://127.0.0.1:5173/learn/javascript/javascript-021): five independent experiments, including a real stale-snapshot comparison and var/let loop binding behavior.
- [Event loop](http://127.0.0.1:5173/learn/javascript/javascript-073): five browser task/microtask experiments.
- [Fetch API](http://127.0.0.1:5173/learn/javascript/javascript-077): actual Express requests and an intentional HTTP error.
- [AbortController](http://127.0.0.1:5173/learn/javascript/javascript-078): real request cancellation.
- [Two Sum](http://127.0.0.1:5173/learn/javascript/javascript-100): controlled numeric input and alternative algorithms.
- [Generics](http://127.0.0.1:5173/learn/typescript/typescript-014): real compiler diagnostics plus runtime behavior.
- [TypeScript configuration](http://127.0.0.1:5173/learn/typescript/typescript-035): compiler-option-sensitive fixtures.

Topic URL: `/learn/:category/:topicId?example=:exampleId&q=:search`. Refresh and back/forward retain topic/example selection. Local run results intentionally reset on reload or example changes. Invalid category/topic/example combinations show a recovery page. Search replaces the current history entry without changing the selected topic.

## What is implemented

- 114 JavaScript topics and 35 TypeScript topics.
- 331 named examples: 291 runtime experiments and 40 compiler fixtures.
- Six interview questions per topic, 894 in total, including output prediction, debugging, comparison, senior constraints and practical scenarios.
- All important closure, Promise/combinator and event-loop topics have five distinct examples. Simple concepts have at least two.
- Practical coding problems include alternative solutions, bounded inputs, edge cases and time/space complexity.
- Real DOM mutation/events, cookies, local/session storage, promises, timers, cancellation and race-condition comparisons. The DOM region is a snapshot from the completed fixed-event experiment; use Run to repeat it.
- Exact TypeScript implementation loaded from the files used by the build. Supporting helpers, server routes and compiler configuration are shown when relevant. Topics and source text load on demand.

There are 494 original syllabus requirements overall: 429 navigable topics/scenarios and 65 mandatory-example requirements linked to their parent topics. Only Phase 2’s 149 topics are ready for learning-content review; other syllabus requirements remain unfinished. Foundation checks remain separately accessible at `/foundation`.

## Compile-time TypeScript examples

These are real compiler experiments, not invented browser type behavior. Run:

```powershell
npm run check:types
```

The script checks the 40 actual fixtures with TypeScript 6.0.3, including their expected-error annotations. It then removes those annotations and requires diagnostics on the intended invalid lines. The report records 40 negative cases and 42 diagnostics, plus a SHA-256 hash of every fixture. Tests compare those hashes to the source displayed by the application.

**Show compiler verification** displays this build/validation-time evidence. The browser never compiles or executes invalid fixture code. The fixture configuration enables strict checking, noUncheckedIndexedAccess and exactOptionalPropertyTypes; both the fixture and base configurations are visible in the source viewer.

React, Redux, Express and Mongoose typing fixtures use the actual libraries. Mongoose schema/model/query fixtures are typechecked without connecting a database or running a query. The original Phase 2 RTK fixture demonstrates state and dispatch typing. React behavior is taught in Phases 3 and 4, Redux Toolkit and RTK Query in Phase 5, and live database lessons are in Phases 8 and 9.

## Real HTTP support and bounded resources

`GET /api/v1/lab/items` supplies a fixed, documented teaching dataset, not simulated database persistence. Optional query parameters: `q` up to 40 characters, `delay` from 0 to 1200 ms, and `fail=0|1`. Invalid parameters return 400; fail=1 returns a deliberate 503. These routes support actual fetch/cancellation lessons and allow no arbitrary URLs, code or database queries.

The runner limits a run to three seconds, validates inputs and cancels owned timers/listeners/requests on reset or navigation. Browser data examples touch only namespaced lab keys and restore their storage state. Cookies contain only non-sensitive lab text. GC lessons observe ownership and WeakRef’s same-job behavior; they never fabricate a collection event or precise heap measurement. Timing experiments assert ordering, not exact wall-clock delays or Node-specific phases.

## Checks and production build

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

Typecheck, test and build run the compiler-fixture check first. Tests use Vitest, React Testing Library/user-event and Supertest. Every default runtime result is checked, and network examples use an actual temporary Express listener. Supertest/network tests require local loopback access in restricted environments.

`npm start` serves the compiled client and API together at [http://127.0.0.1:4000](http://127.0.0.1:4000). Run the build first and stop the development API or choose another PORT. Production start explicitly selects production serving even if the development .env was copied. Direct client routes refresh through the SPA fallback; missing API and asset paths remain JSON 404s.

The original Phase 3 baseline passed 551 tests. The editable-snippet enhancement reruns TypeScript, lint, production build and all 1,029 tests (985 client, 44 server), recorded in docs/evidence/snippets-tests.txt; the dependency audit reports zero known vulnerabilities. Evidence is recorded in docs/evidence/phase-3-*. The resumed browser acceptance pass verifies actual layout, production CSS/nonce, cancellation, modern hooks, refresh/history, keyboard/mobile and clean fresh-load diagnostics. See docs/PHASE_3_COVERAGE.md for evidence and practical limits.

## Source organization

- `client/src/app`: typed syllabus catalog/registry, routing and status labels.
- `client/src/modules/javascript`: individual JavaScript lesson implementations and content.
- `client/src/modules/react`: interactive TSX examples, metadata, exact-source loading and component/resource tests.
- `client/src/modules/typescript`: individual TypeScript lessons, compiler fixtures and verification report.
- `client/src/modules/algorithms.ts`, `helpers.ts`, `runtime.ts`: bounded reusable implementations.
- `client/src/modules/LearningRunner.tsx`, `LearningTopicPage.tsx`, `load-lesson.ts`: controlled execution, lazy loading and source synchronization.
- `client/src/components`: shared sidebar, example, output, code, mistakes and Q&A panels.
- `scripts/check-type-examples.ts`: real positive/negative compiler verification.
- `server/src/routes/lab.ts`: actual fixed-data teaching endpoints.
- `server/src/app.ts`, `server.ts`, `config`, `middleware`: server foundation, production startup and safe public errors.

All dependencies are pinned in the package files and lockfile. The minimatch 11.0.1 override addresses [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) in lint tooling; lint passes with the override and the current audit reports zero known vulnerabilities. Reevaluate the override when upstream packages adopt the patch.

## Completion and verification

[Phase 10 final review](docs/PHASE_10_REVIEW.md)

See the [coverage/evidence ledger](docs/PHASE_2_COVERAGE.md), [progress report](docs/DEVELOPMENT_PROGRESS.md), [complete checklist](docs/TOPIC_CHECKLIST.md), [implementation plan](docs/IMPLEMENTATION_PLAN.md) and [registry specification](docs/TOPIC_REGISTRY_SPEC.md).
