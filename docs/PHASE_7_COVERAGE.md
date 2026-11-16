# Phase 7 Express.js

Status **APPROVED_COMPLETE**. The user approved Phase 7 and authorized Phase 8 on November 15, 2026.

Phase 7 covers 37 lessons, 102 API demos, and 222 interview questions. Each example exposes an editable request and the server implementation. Run the app with `npm run dev` and open **Express.js** in the sidebar.

| Area | Demonstrations |
| --- | --- |
| Fundamentals | Application startup, HTTP methods, path and query parameters, request bodies, status codes, routers, middleware, and response lifecycle |
| Middleware and APIs | Custom middleware, Express parsers, asynchronous errors, centralized error responses, REST resources, versioning, and request logging |
| Security and data | Public fixture authentication and authorization, input validation, CORS, security headers, rate limiting, cookies, sessions, bounded multipart uploads, pagination, filtering, and sorting |
| Testing | Live HTTP assertions and sanitized production-style error responses |

Every run starts a fresh Express application on an ephemeral loopback port. Demo requests use generated test data and fixed routes. The server caps both input size and concurrent runs. CRUD records and sessions live in memory for the duration of one run. The upload exercise generates its file from text input and parses the resulting multipart request in memory. Authentication examples use public teaching credentials.

## Required exercises

| Example | Stable ID |
| --- | --- |
| Create a server | express-038.e01 |
| Route handling | express-039.e01 |
| Dynamic route parameters | express-040.e01 |
| Query string handling | express-041.e01 |
| Request body validation | express-042.e01 |
| Custom middleware execution order | express-043.e01 |
| Authentication middleware | express-044.e01 |
| Authorization middleware | express-045.e01 |
| Centralized error handling | express-046.e01 |
| Full CRUD REST API | express-047.e01 |
| Pagination and filtering | express-048.e01 |
| Rate limiting | express-049.e01 |
| API tests | express-050.e01 |

## Verification

- All 1,788 tests passed, including compile and import checks for all 102 Express request snippets. TypeScript, lint, and the production build passed. The dependency audit found zero known vulnerabilities. [Full test run](evidence/phase-7/tests.txt)

- The 107 Express API tests exercise all 102 demos and assert key behavior for CRUD state isolation, authentication, authorization, rate limiting, file size validation, CORS, middleware order, and session revocation. [Focused tests](evidence/phase-7/target.txt)
- Development and production browser checks confirmed live CRUD, edited request output, syntax errors, Reset, interview answer disclosure, direct-route refresh, multipart upload validation, and HTTP 429. Both browser runs captured no console warnings or errors. [Browser results](evidence/phase-7/browser.json) · [CRUD preview](evidence/phase-7/crud-preview.jpg)
- The production build emits the existing React Router client-directive warning for the isolated preview bundle. The preview worked in browser testing. [Build](evidence/phase-7/build.txt) · [TypeScript](evidence/phase-7/typecheck.txt) · [Lint](evidence/phase-7/lint.txt) · [Dependency audit](evidence/phase-7/audit.json)


