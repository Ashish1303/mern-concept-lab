# Phase 10 production browser checks

Chrome on Windows, compiled app at 127.0.0.1:4590 and isolated preview at 127.0.0.2:4591. Some unaffected lessons were sampled before the final build restart. The foundation correction and the MongoDB and MERN samples were confirmed after the restart.

- Foundation: original counter reached 2 and reset to 0. The preview counter reached 1. The real health route returned healthy and database.status = not_checked. The stale Phase 9 status text was gone.
- JavaScript: the scope demo returned outer = 1 and escaped = 2. Changing the block value to 9 caused edited output escaped = 9. Reset restored the original code.
- TypeScript: the intentionally invalid fixture displayed TS2322. Editing the assignment to a number passed the live type check. Reset restored the invalid exercise.
- React hooks: the no-dependency useEffect recorded count = 1 on the original and count = 3 in the edited preview. Both traces included the initial effect and the effect after the button click.
- Advanced React: the render-props panel opened in the original and preview.
- Redux Toolkit and RTK Query: the original and preview both added Practice selectors through real Express and reported two reads and Saved.
- Node.js: real API output from both controls reported Node 24.15.0, V8, and libuv.
- Express: original and snippet both returned HTTP 200 with ready = true and the JSON content type.
- MongoDB: original and snippet confirmed the dedicated lab and listed authors and books. The Mongoose connection example reported readyState = 1 and hasDriver = true in both.
- End-to-End MERN: original and preview workspaces both returned databaseReady = true and mode = production.
- Interview answers opened on the sampled lessons. The Express direct route survived reload. Sidebar search opened useEffect, Back restored Basic types, and Forward restored useEffect.
- The tab recorded zero console warnings or errors at the end of the walkthrough. The intentional TypeScript diagnostic was visible in the editor.

See the previous phase reports for their per-example verification and screenshots.
