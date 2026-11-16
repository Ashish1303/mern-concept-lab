# Phase 9 End-to-End MERN

Phase 9 implements all 23 full-stack scenarios and 138 interview questions. It uses the local MongoDB replica set from [the Phase 8 setup](PHASE_8_COVERAGE.md).

| Area | Scenarios |
| --- | --- |
| Data and forms | React form submission, Express-to-MongoDB writes and reads, CRUD, search, sorting, pagination, client and server validation, and generated multipart uploads |
| Identity and access | Registration, login, salted scrypt verification, signed JWTs, refresh rotation, React route guards, and backend role enforcement |
| UI state and caching | RTK Query integration, tag invalidation, optimistic updates and rollback, loading states, and recoverable errors |
| Verification and operation | HTTP assertions, React integration tests, environment checks, and the local production-build walkthrough |

Open **End-to-End MERN** in the sidebar and select **Start workspace**. Changes persist across requests within that workspace. The editable preview creates an independent workspace and runs the same API. The code file selector includes the React controls, RTK Query slice, and request client. The implementation panel includes the Express routes.

Workspaces use randomized database names, synthetic accounts and files, per-workspace signing keys, and bounded input and lifetimes. Navigation and Reset request cleanup. Expiry and graceful shutdown also release demo databases. The sample accounts and three-minute workspaces are intended for local instruction.

## Run the production build locally

1. Start the dedicated MongoDB replica set and set `MONGO_LAB_PORT` as described in [Phase 8 setup](PHASE_8_COVERAGE.md).
2. Run `npm run build`. It builds the React application, Express server, and isolated preview runtime.
3. Run `npm start` and open **End-to-End MERN → Production build and deployment walkthrough** from the local server address.
4. Start a workspace and select **Check running server**. The result should show `mode: production` and `databaseReady: true`.
5. Open a direct lesson URL, refresh the page, and run an editable example to check static routing, API connectivity, and the separate preview origin.

For a hosted deployment, provision the application, database, and preview origins for the target environment. Supply database and server configuration through the deployment platform and run the same build and smoke checks before release. This lab's included server configuration serves the preview from a separate loopback origin and expects a dedicated local database.

## References

- [JSON Web Token specification](https://www.rfc-editor.org/rfc/rfc7519)
- [RTK Query manual cache updates](https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates)


## Verification

- Focused React tests exercised all 23 scenarios against a separate Express process and real MongoDB, with an extra check for the visible optimistic update and rollback. The HTTP tests verified isolated CRUD, literal search, role checks, refresh rotation, validation, and multipart upload. [React integration](evidence/phase-9/target-client-final.txt) · [HTTP contracts](evidence/phase-9/target-server.txt)
- Development browser checks verified edited CRUD and HTTP 204 handling in the preview, direct-route refresh, reset, syntax diagnostics, interview answer disclosure, optimistic rollback, and signed refresh rotation. The production browser verified the production runtime and persisted the upload from the edited preview. [Browser results](evidence/phase-9/browser.json) · [Full-stack preview](evidence/phase-9/full-stack-preview.jpg)
- TypeScript, lint, and the production build passed. The dependency audit found zero known vulnerabilities. The existing React Router client-directive warning appears in the isolated preview build. [TypeScript](evidence/phase-9/typecheck.txt) · [Lint](evidence/phase-9/lint.txt) · [Build](evidence/phase-9/build.txt) · [Dependency audit](evidence/phase-9/audit.json)
- The full client suite passed all 1,719 tests. An Express test worker exited unexpectedly during the combined run. The complete server suite passed all 404 tests on a separate run with one worker against the same replica set. [Client and initial server run](evidence/phase-9/tests.txt) · [Server rerun](evidence/phase-9/tests-server-final.txt)
