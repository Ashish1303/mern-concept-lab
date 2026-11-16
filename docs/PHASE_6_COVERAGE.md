# Phase 6 Node.js

Status **APPROVED_COMPLETE**. The user approved Phase 6 and authorized Phase 7 on November 15, 2026. Phase 6 covers all 46 Node.js lessons with 98 demos and 276 interview questions.

| Group | What the demos execute |
| --- | --- |
| Fundamentals | Runtime inspection, V8 serialization, event loop and microtask ordering, timers, nonblocking file reads, CommonJS caching, ES module bindings, process lifecycle, configuration, Buffers, and error handling |
| Core modules | Scoped filesystem operations, cross-platform path parsing, loopback HTTP, events, stream pipelines, crypto, URL parsing, OS information, child processes, and workers |
| Advanced concepts | Async styles, backpressure, transforms, large files, memory retention, isolated garbage collection, concurrency and clustering, structured logging, caching, loopback WebSockets, shutdown, configuration, validation, assertions, and performance measurement |

## Run the examples

Start the app with `npm run dev`. Open **Node.js** in the sidebar and choose an example. **Run backend demo** sends the displayed input to Node.js. The snippet editor runs the browser-side request code, where learners can change the input and inspect the output. The implementation panel shows the actual server TypeScript for the lesson and the shared tools it uses.

The backend selects a fixed implementation by example ID and caps request input and simultaneous runs. File operations use generated temporary fixtures, network demos bind to loopback, and child and worker demonstrations run lesson-owned programs. Timing, heap measurements, and random output can vary between runs.

## Verification

- The backend suite exercises the starting input for each of the 98 demos and checks edited input validation, event-loop order, worker transfer, cluster IPC, and WebSocket output. [Backend tests](evidence/phase-6/target.txt)
- All 1,579 tests passed in the final run, including compile and import checks for all 98 editable requests. An earlier run timed out in a React test that passed in isolation and again in the full rerun. [Final test run](evidence/phase-6/final-tests.txt) · [Isolated React rerun](evidence/phase-6/react-recheck.txt)
- [TypeScript](evidence/phase-6/typecheck.txt) · [Lint](evidence/phase-6/lint.txt) · [Build](evidence/phase-6/build.txt) · [Dependency audit](evidence/phase-6/audit.json)

- Browser verification ran the Buffer lesson in development and the WebSocket lesson against the production build. Confirmed edited output, syntax errors, Reset, interview answer disclosure, and direct example refresh. The browser reported no warnings or errors during these passes. [Browser results](evidence/phase-6/browser.json) · [WebSocket preview](evidence/phase-6/websocket-preview.jpg)
- The preview bundle emits the existing React Router client-directive warning. The preview and both demonstrated requests worked in the browser.

