# MERN Concept Lab — implementation plan

Prepared and updated 2026-11-08 (Asia/Calcutta). Phases 1 and 2 are explicitly approved. Phase 3 — React fundamentals and hooks — is READY_FOR_REVIEW following implementation, browser acceptance and required checks. Stop for user approval before Phase 4. This document preserves the original plan; current results are in DEVELOPMENT_PROGRESS.md.

## Goal and scope

Build a simple interview learning application with actual, observable demonstrations across JavaScript, TypeScript, React, Redux Toolkit, Node.js, Express.js, MongoDB/Mongoose and end-to-end MERN. Every example includes its real TypeScript source, expected and actual output, internal behavior, mistakes and corrected behavior, and interview questions. A link or explanation alone never completes a topic.

The workspace was empty at inspection. Place everything in `E:\ReactNodeFullApp\mern-concept-lab` to maintain a distinct project boundary from DeepLearner and future neighboring projects. The original planning step authorized documentation only. The user then explicitly approved Phase 1 source implementation, dependency installation and necessary local verification. Database mutation and later learning phases remain outside Phase 1.

## Proposed final folder structure

```text
mern-concept-lab/
  client/
    src/
      app/                      # bootstrap, providers, typed registry
      components/
        layout/                 # grouped searchable sidebar and content shell
        examples/               # demo, output, mistakes, interview panels
        code/                   # plain-text exact source viewer
      modules/
        javascript/
        typescript/
        react/
        redux/
        node/
        express/
        mongodb/
        mern/
      hooks/
      store/                    # typed hooks and appropriate global examples
      services/                 # API client and RTK Query endpoints
      routes/
      styles/
      test/
    package.json
    vite.config.ts
    tsconfig.json
  server/
    src/
      app.ts                    # importable Express app, no listen side effect
      server.ts                 # startup, shutdown and production SPA fallback
      config/
      routes/
      controllers/
      services/
      models/
      middleware/
      examples/                 # fixed experiments, workers and source manifest
      validation/
      tests/
      scripts/                  # allowlisted sandbox seed/reset
    package.json
    tsconfig.json
  docs/
    IMPLEMENTATION_PLAN.md
    TOPIC_REGISTRY_SPEC.md
    TOPIC_CHECKLIST.md
    DEVELOPMENT_PROGRESS.md
  .env.example
  .gitignore
  eslint.config.js
  tsconfig.base.json
  package.json                  # private npm workspace; client and server
  package-lock.json
  README.md
```

The tree describes the final planned structure. Phase 1 creates only the directories needed for the foundation, avoiding empty architectural layers. Controllers and services are introduced when they clarify real logic. Use ESM, strict TypeScript, browser-specific client settings and NodeNext server settings. Explicit file extensions in server imports must resolve correctly after compilation. Shared request types can start as small explicit contracts; add a shared package only if actual duplication warrants it.

## Two-column learning interface

Left: eight expandable categories, expandable groups, labeled topic links and search by title, alias or group. Use accessible buttons and links, keyboard focus indicators and `aria-expanded`. On narrow screens the sidebar becomes a toggleable navigation panel. Right: topic purpose and use/avoid guidance, example selector, live controls, exact source, expected/actual output, internal explanation, bug/fix comparison and Q&A. No dashboard, animation system or component library.

Use React Router declarative routing. Canonical route: `/learn/:category/:topicId?example=:exampleId`. IDs survive title changes. Selecting a topic or example updates history; direct loads, refresh, back and forward restore selection. Search may use `q` in the URL; search must not silently change the selected topic. Unknown topic/example IDs produce an accessible recovery view. Planned topics display their honest implementation status and cannot show an invented demo.

## Runnable demonstrations

### Browser and React

Each registered example has a predefined React component or TypeScript function and controlled inputs. No arbitrary code editor execution or dynamic evaluation. Local-state examples use React local state. Redux appears where the example actually needs it. Each example can reset its own state; changing examples resets only the intended demo boundary.

Use actual `import './Example.tsx?raw'`-style Vite source imports beside the runnable import. Multi-file demos list every implementation file. Trace panels record real events with per-run IDs, cancellation and bounded logs. Expected observations are separate from actual output; a passing-looking message is never prefilled as an execution result.

Effects demonstrate real mount/update/cleanup behavior, request cancellation and controlled latency. Infinite-loop and leak mistakes run for a bounded number of iterations and clean up on unmount. StrictMode remains enabled, and tests distinguish development checks from production behavior without asserting brittle universal event counts. React performance examples show observable render counts and profiler measurements; they do not claim fixed speedups across machines.

TypeScript examples pair positive fixtures with expected compile-time failures checked by `tsc --noEmit` and `@ts-expect-error` where appropriate. The UI labels compiler diagnostics separately from runtime behavior. Do not build a browser compiler merely to show type errors. Incorrect runtime input still needs server-side validation.

Newer hooks require compatible stable React and types. `useEffectEvent` is restricted to effects and their local logic, never used to suppress dependencies. `useInsertionEffect` uses a small CSS-in-JS style insertion demonstration; `useDebugValue` uses a custom hook plus a DevTools verification step. `useImperativeHandle` and ref forwarding explain current ref-as-prop conventions as well as older code. `useActionState` and `useOptimistic` use actual actions and success/failure paths. `use` uses a stable cached resource under Suspense/error boundaries; no promise creation on every render or unsupported browser Server Component claims.

### Express and Node.js

Browser requests go through `/api/v1` to the real Express app (Vite proxy during development, same-origin deployment by default). Foundation adds only `/api/v1/health` and a controlled request smoke check. Later examples use allowlisted endpoints for user fetching, middleware traces, CRUD, errors and experiment runs. Validation failures, offline requests and server failures remain observable.

Separate `app.ts` from `server.ts` so Supertest exercises actual Express routing without a manually started server. Use a consistent success/error envelope with request IDs, safe public messages and no production stack traces. Database-independent endpoints continue to work when MongoDB is unavailable; readiness explicitly states database availability rather than silently using memory.

Node experiments run predefined TypeScript-built worker/child entry points. CPU work and event-loop experiments run outside the primary request loop with bounded input sizes, one active experiment per lab session, timeouts and forced termination. The main server stays responsive. Event-order tests assert only guaranteed ordering in a documented context; do not promise a universal ordering between timers and `setImmediate`. File examples stay in a dedicated lab directory. No user-selected shell commands, arbitrary paths, unrestricted URLs or arbitrary JavaScript.

Serve public example source from a fixed build-time allowlist of source artifacts. Never expose arbitrary server file reads, private configuration, auth secrets or filesystem paths. Verify the source artifact is generated from the exact implementation shipped in the same build.

### MongoDB and Mongoose

Use real MongoDB, through Mongoose or the native collection API as the topic requires. All learning mutations are scoped to a dedicated database and session-owned seed records. The default proposed name is `mern_concept_lab_dev`; tests use `mern_concept_lab_test`. URI database names must match a strict lab allowlist. Seed/reset scripts refuse production mode, missing database names or non-lab names and only affect lab-owned collections/records. Never drop the server or an unrelated database.

Show the actual predefined query and bounded parameters, result JSON and before/after documents for writes. Provide real schema validation, duplicate-key errors, populate, grouping, lookup, index creation and `explain` evidence. Wait for index readiness before unique-constraint tests. Transactions require a dedicated replica set (a single-node development replica set suffices); show commit and rollback. Unsupported topology is a blocker, not simulated success. TTL expiration is asynchronous and must not promise instant removal. Query-plan examples demonstrate observed plans on seeded data without claiming an index must always win.

### Authentication and end-to-end behavior

Introduce real users, password hashing and server authorization in Phase 9. Prefer Node crypto scrypt with per-password salts and reviewed parameters, using constant-time comparisons. Use a maintained JWT verification library with explicit algorithms, issuer, audience and expiration. Keep short-lived access tokens in memory; put rotating refresh tokens in HttpOnly cookies with Secure in production and appropriate SameSite settings. Store only hashed refresh-token records; enforce reuse detection/revocation and logout invalidation. Apply CSRF/origin protection to cookie-authenticated actions, explicit CORS policy if cross-origin deployment is needed, throttling and generic auth errors. No plaintext passwords, committed secrets, or reliance on frontend route guards.

Protect private APIs on the server and scope records to their owner. Uploads have strict size/type limits, generated filenames, safe storage outside executable/static source, authorization and cleanup. Demonstrate rollback using actual backend rejection. Test role denial, expired tokens, validation failures and optimistic-update recovery, not just successful clicks.

## Dependencies and version policy

Use stable releases only. During approved Phase 1, resolve exact versions from package metadata, verify Node engines and peer dependencies, install together and commit the resulting lockfile. Do not claim compatibility has passed before installation/typechecking/builds. Later dependencies are added in the phase that needs them.

| Area | Proposed baseline | Compatibility evidence / decision |
| --- | --- | --- |
| Runtime | Installed Node 24.15.0 and npm 11.12.1; supported Node 24 line | Confirm current security patch before installation; no automatic system upgrade. Node's official release schedule identifies supported lines. |
| React | Current stable React/React DOM 19.x, matching types; docs currently list 19.3 | At least 19.2 for the requested Effect Event API; keep React and React DOM aligned. |
| Client build | Current stable Vite and matching React plugin; strict TypeScript | Check actual engine/peer ranges against the selected Node release. |
| Navigation | Current stable React Router declarative mode | No framework/SSR stack required for this application. |
| State | Stable Redux Toolkit and React Redux | RTK Query is included in Redux Toolkit; avoid redundant Redux/Thunk installs. |
| API | Express 5.x and matching TypeScript definitions | Express 5 requires Node >=18; validate actual package engines at install time. |
| Database | Installed MongoDB 8.2 binary; Mongoose 9.x candidate | Official compatibility table permits Mongoose 9 with MongoDB 8.x; check driver/Node requirements too. |
| Tests | Current stable Vitest, React Testing Library, user-event, jest-dom, jsdom and Supertest | Official Vitest guide currently requires Node >=22.12 and Vite >=6.4; verify chosen package ranges. |
| Tooling | ESLint flat config, TypeScript ESLint, React Hooks/Refresh linting, tsx for server development | Use compatible stable majors; no bespoke lint or build framework. |
| Later security | Small reviewed validation, JWT, headers, rate-limit and multipart libraries where necessary | Select stable maintained packages in the relevant phase; do not add unused dependencies. |

Official documentation checked 2026-11-08:

- [Node release schedule](https://github.com/nodejs/Release)
- [React versions](https://react.dev/versions) and [useEffectEvent constraints](https://react.dev/reference/react/useEffectEvent)
- [Vite getting started](https://vite.dev/guide/)
- [React Router declarative installation](https://reactrouter.com/start/declarative/installation)
- [Redux installation](https://redux.js.org/introduction/installation)
- [Express 5 migration and requirements](https://expressjs.com/en/guide/migrating-5/)
- [Mongoose/MongoDB compatibility](https://mongoosejs.com/docs/compatibility.html)
- [Vitest getting started](https://vitest.dev/guide/)
- [MongoDB transactions](https://www.mongodb.com/docs/manual/core/transactions/)

## Setup observations and risks

| Observation or risk | Consequence and next action |
| --- | --- |
| Workspace contains zero entries; no existing AGENTS.md file was found at the inspected workspace/drive ancestor | Preserve the supplied conversation instructions; create only the separate project folder. |
| Node 24.15.0, npm 11.12.1, Git 2.54.0.windows.1, Python 3.14.4 available | Node/npm/Git are sufficient for initial implementation; Python was only used to prepare documentation. |
| mongod and mongosh exist on PATH; binary path indicates MongoDB 8.2 | Installation does not establish server version, credentials, connectivity or replica-set topology. |
| No listener detected at 127.0.0.1:27017 | Database scenarios are not currently runnable. Phase 1 needs no MongoDB startup; database-backed work later needs a dedicated instance/URI. |
| Windows service inventory could not be read with current privileges | Service status is unverified. No service changes were attempted. |
| Docker absent from PATH | Use the installed MongoDB directly or an explicitly configured dedicated external cluster; Docker is optional. |
| Package registry access and exact dependency installation not tested | Validate during Phase 1; document any network/permission blocker without claiming a build passed. |
| Syllabus has 494 requirement rows | Deliver incrementally. Expand named examples per topic and never infer completion from navigation coverage. |
| RTK network examples precede the dedicated database phase | Phase 5 adds a narrow real Express/Mongoose todo/user API and minimum connection/schema support using the lab database. Full database teaching remains Phase 8. If MongoDB is unavailable, block those examples; do not use an in-memory substitute. |
| Frontend/backend typed examples appear in the TypeScript phase before their feature phases | Use isolated compile fixtures with appropriate library types; actual database/auth/runtime behavior is verified in its owning feature phase. |
| Browser timing, GC, WeakMap collection, profiler costs and TTL are environment-dependent | Clearly label constraints and observe actual behavior; no deterministic GC or timing claims. |
| Deep-link serving differs between Vite and production | Add production SPA fallback after API routing, preserving JSON API 404s; verify built-server refresh behavior. |
| New React APIs and toolchains evolve | Recheck official constraints and resolved package versions at implementation; never use canary-only APIs as stable. |

Proposed ports: client 5173, API 4000; detect conflicts and document configured alternatives. Environment examples contain safe defaults only: `PORT`, `NODE_ENV`, `CLIENT_ORIGIN`, `MONGODB_URI`, lab database name, JWT secret placeholders and token lifetimes as needed. No private value in a `VITE_` variable. Ignore `.env` variants except deliberate example templates, node_modules, build outputs, coverage, uploads and runtime lab files.

## Phases and approval gates

| Phase | Deliverables | Acceptance focus |
| --- | --- | --- |
| 1 — Application Foundation | npm workspaces; React/Vite and Express TypeScript setup; environment validation; router; sidebar; registry; reusable example/source/output/Q&A panels; health API; infrastructure smoke checks; tests and README | Working browser shell, all planned topics visible with honest status, exact smoke-demo source, real health request and successful checks. No syllabus topic claimed complete. |
| 2 — JavaScript + TypeScript | Every listed language/browser/coding/type topic and corresponding examples | Real browser behavior and compiler fixtures; complexity for coding problems; isolation/cleanup and meaningful Q&A. |
| 3 — React Fundamentals and Hooks | Fundamentals, every requested hook, all 10 useState and 17 useEffect examples | Observable state/render/effect behavior, bounded bugs, cleanup/cancellation and supported newer APIs. |
| 4 — Advanced React | Memoization, composition patterns, portals/boundaries/Suspense, routing, performance, testing and comparisons | Visible render preservation/optimization, nested/dynamic/protected routing; distinguish demo guards from final server authentication. |
| 5 — Redux Toolkit + RTK Query | All Redux/RTK/Query topics and 10 projects; narrow real Express/Mongoose persistence prerequisite | Real request lifecycle, cache deduplication/invalidation and rollback; no simulated backend. |
| 6 — Node.js | All core and advanced topics with isolated backend experiments | Responsive main server, bounded experiments, real streams/files/workers/event traces and cleanup. |
| 7 — Express.js | All routing/middleware/security topics and 13 mandatory demos | Real HTTP traces, validation, error paths, middleware/authentication/authorization tests. Use actual restricted demo credentials for middleware lessons; full account lifecycle comes in Phase 9. |
| 8 — MongoDB + Mongoose | All DB topics and 15 required demonstrations; seed/reset and replica-set operations | Real query/write evidence, indexes, joins, validation and commit/rollback; no unrelated database writes. |
| 9 — End-to-End MERN | All 23 scenarios including auth, refresh, upload, CRUD and production walkthrough | Full request/DB/UI flow; secure failure paths, ownership/roles and integration tests. |
| 10 — Final Review | Reconcile every requirement and example, security review, all checks and deployment documentation | No unexplained omissions; explicit blockers, evidence and user approval status. |

At the end of each phase, stop and request approval before entering the next. Phase approval does not automatically approve unreviewed individual topics. Only explicit user confirmation permits APPROVED_COMPLETE. If a phase cannot meet its gate, report IN_PROGRESS or BLOCKED with exact evidence, not READY_FOR_REVIEW.

## Phase 1 concrete proposal

1. Resolve and record stable package versions and compatibility; create private npm workspaces and safe configuration.
2. Implement React shell, eight-category navigation generated from the typed registry, searchable collapsible groups, route selection, planned-status pages and recovery behavior.
3. Build reusable example layout with controls, exact source, expected/actual output, internal behavior, mistakes and Q&A slots. Add one explicitly labeled infrastructure interaction to validate the layout without declaring useState teaching complete.
4. Implement Express health route, startup environment checks, safe errors, development proxy and production static/SPA routing. Add a real health-request panel to verify frontend/API connectivity.
5. Add meaningful registry/URL/search tests, interaction/source pairing tests and Supertest health/404/error tests. Test built-server deep links with API fallback separation.
6. Run checks, verify browser behavior, document startup and report evidence. Stop for approval; do not start language examples.

## Validation and reporting

Proposed root commands, implemented only after approval: `npm run dev`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm start`. Later add clearly scoped `npm run db:seed` and `npm run db:reset`; neither runs implicitly at startup. Client and server have independent TypeScript/build/test targets under the root commands.

Every review gate requires TypeScript, lint, relevant automated tests, production build and actual behavior verification. Browser checks cover console errors, HTTP errors, keyboard navigation, direct-route refresh and history. Network topics require real Express requests; database topics require real MongoDB changes. Tests may isolate failures with test doubles, but test doubles do not count as a runtime demonstration. Use disposable lab fixtures and clean up after tests; never point tests at a production or personal database.

Verify client bundles and tracked files contain no secrets; distinguish required environment variable names from private values. Never send user files, source or personal content to third-party services without task necessity and authorization. This plan requires no external hosting, publication or account connection.

Per-phase report follows the requested format: Phase; Completed (features/topics/examples); Verification (tests, TypeScript, lint, build, behavior); Pending (remaining work, issues, environment blockers); Files Changed; Status; Approval Required. Record the results and user approvals in DEVELOPMENT_PROGRESS.md. Keep TOPIC_CHECKLIST.md synchronized with evidence, not optimistic estimates.

## Authorized editable-snippet enhancement before Phase 4

The user requested editable Run/Reset/error snippets for existing lessons after the Phase 3 baseline. The source-backed editor covers all 449 implemented curriculum examples and two foundation checks, while preserving demonstrations and interview questions. Full acceptance and local preview setup are documented in EDITABLE_SNIPPETS.md. This enhancement does not start Phase 4 or approve Phase 3 on the user’s behalf.
