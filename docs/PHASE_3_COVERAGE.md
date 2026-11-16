# Phase 3 coverage and verification

Editable code enhancement: all existing examples now have source-backed Run/Reset/Stop editors alongside their original demos and interview questions. See [EDITABLE_SNIPPETS.md](EDITABLE_SNIPPETS.md) and evidence/snippets-tests.txt for the expanded acceptance run. The baseline phase evidence below is preserved.

Status **APPROVED_COMPLETE**. The user explicitly approved Phase 3 and the editable-snippet enhancement before authorizing Phase 4 on 2026-11-09.

46 concepts, 118 distinct component experiments, 27 stable aliases for mandatory requirements (145 tracked example IDs), 276 interview questions. All ten useState and seventeen useEffect cases are implemented. Ordinary concepts have two examples; useEffectEvent has five.

## Verification

The final required checks pass TypeScript, lint (zero warnings), production build and 551 tests: 514 client across eight files and 37 server across three files. The actual TypeScript compiler verifies 40 positive fixtures and 40 deliberate negative cases. npm audit reports zero known vulnerabilities. Final command logs are authoritative; see evidence/phase-3-typecheck.txt, phase-3-lint.txt, phase-3-tests.txt, phase-3-build.txt, phase-3-audit.json and phase-3-checks.txt.

Tests mount real React components, use actual controls, check committed output and observe lifecycle/resource behavior. Network cases use a temporary real Express listener. Geometry is explicitly stubbed in jsdom and separately verified in the actual browser at 160px and 260px. Every canonical example has its own named interaction test. Additional contracts cover state queues, immutable history, cleanup, cancellation, races, subscription changes, memoized child commits, imperative focus, unique IDs, nonce/style ownership, Action queueing and optimistic rollback/rebase.

## Completed browser acceptance

The earlier Chrome pass verified all ten state examples and the mandatory effect cases except the revised cancellation interaction. The resumed in-app browser pass completed the remaining development and production checks:

- The bounded 1000 ms request actually cancels; the UI reports cancelled instead of allowing a stale success.
- Real layout measures 160px and 260px. CSS-in-JS insertion changes computed color from rgb(20, 100, 60) to rgb(110, 40, 140), with independent owned-style cleanup. The actual layout callback verifies that the installed style nonce matches the production page nonce; no CSP weakening was added.
- Both timer examples stop visibly after five ticks, release resources and restart for another five ticks. The Effect Event example reads the latest step size. Two regression cases verify restart and zero retained timers after unmount.
- Real form Actions acknowledge, reject with HTTP 503, recover and accumulate queued results. Optimistic items appear while pending, confirm without duplicates, roll back on failure, and rebase on unrelated base updates.
- All five Effect Event scenarios retain genuine subscription dependencies while reading current notification data. Timers and subscriptions clean up.
- Transitions and deferred values show actual intermediate and final commits; no fixed scheduling delay is claimed. Conditional context use and stable Promise use work. Promise rejection reaches the boundary and a new resource recovers.
- Context readers, reducer dispatch, ref and imperative focus, memoized child commits, useId relationships, external-store unsubscription and real viewport resizing work. Custom-hook state remains independent and an actual Escape key closes the panel.
- Production direct refresh preserves mandatory aliases and search. Back/forward preserves example selections. Read-only source displays the compiled implementation. Reset remounts local state. Production StrictMode mounts each isolated root once without development replay.
- A 390 x 844 viewport check verifies the native resize snapshot, keyboard-operated mobile drawer, closing on topic selection, Enter activation and no horizontal overflow. The temporary viewport override was reset.
- Accessible disclosure and validation expose the correct ARIA state/relationships, focus the invalid input and recover after valid input.
- Fresh development and production console review shows no unexpected warnings/errors or unhandled API failures. Deliberately rejecting a Promise logs the expected React boundary message for HTTP 503, and the browser visibly recovers. This deliberate failure is recorded separately from the clean fresh-load checks.

Raw browser observations: evidence/phase-3-browser.json. Review screenshots: evidence/phase-3-desktop.jpg and evidence/phase-3-mobile.jpg. The initial browser interruption is resolved; no guard was bypassed. The earlier transient context/Fast Refresh errors did not recur in the resumed fresh-load checks.

## Issues resolved

The browser pass found that a completed timer could still display running=true, while the other timer could not restart after its automatic stop. Both now set running=false at the five-tick limit; each restarts correctly and cleans up. The insertion lesson now records nonce-required/matches booleans from its actual layout callback, making its production CSP behavior observable without exposing nonce values in output. Initial remote DOM nonce inspection omitted the security property; the actual callback and server header/HTML tests provide the accepted nonce evidence.

## Scope and practical limits

React Developer Tools is required to inspect useDebugValue labels. Both real hook registrations, changing state and formatter contracts are tested; the browser UI explicitly describes the prerequisite. No DevTools extension was installed and no external DevTools label presentation is claimed. This is an ordinary tooling prerequisite, not a simulated label or missing implementation.

Browser verification used the available in-app browser plus the earlier Chrome pass and a mobile viewport override. It is not a physical-device or cross-browser certification. Effects, layout and CSS observations are client-rendered; no SSR behavior is claimed. POST acknowledgements explicitly return persisted:false. No MongoDB operation, external publication, service change or Phase 4 curriculum was performed.

Production HTTP checks verify direct lesson/alias routes, nonce pairing, actual GET/POST results, controlled failures, request abort and JSON API/asset 404s. The numeric lesson glob excludes test code from the production build. The final file scan found no private-key/API-key signatures or real .env file; no Git repository or commit exists. Temporary servers are stopped after verification, with closed ports recorded in evidence/phase-3-ports.txt.

Important changed files: client/src/modules/react/*; client/src/app/registry.ts and navigation tests; client/src/routes/TopicPage.tsx and FoundationPage.tsx; client/src/components/layout/Sidebar.tsx; client/src/styles/app.css; server/src/routes/lab.ts; server/src/app.ts and their tests; README.md and the coverage/checklist/registry/progress documents.

## Topic and example ledger

### react-001

JSX describes React elements using JavaScript expressions; interpolated text is escaped, not interpreted as HTML.

Source: client/src/modules/react/react-001.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-001.e01 | Escaped JSX text | The literal angle-bracket text appears as text, with no bold element created. | — | READY_FOR_REVIEW |
| react-001.e02 | Expressions produce live elements | Increment changes both rendered expressions without manually editing DOM nodes. | — | READY_FOR_REVIEW |

### react-002

A function component returns a React element tree. React invokes it during rendering and owns its state by tree identity.

Source: client/src/modules/react/react-002.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-002.e01 | Reusable function component | Changing the parent input supplies a new prop and updates Greeting. | — | READY_FOR_REVIEW |
| react-002.e02 | Independent component instances | Incrementing First counter leaves Second counter at zero. | — | READY_FOR_REVIEW |

### react-003

Props are read-only inputs supplied by the parent; a new parent render can supply different values.

Source: client/src/modules/react/react-003.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-003.e01 | Parent changes a child prop | The child displays the latest score without its own duplicate state. | — | READY_FOR_REVIEW |
| react-003.e02 | Default prop versus explicit null | An omitted prop uses Guest; explicit null remains null. | — | READY_FOR_REVIEW |

### react-004

children is a prop containing nested React content. Slots can also be passed through explicitly named props.

Source: client/src/modules/react/react-004.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-004.e01 | Interactive children inside a panel | The nested button works through the children slot while its state belongs to the caller. | — | READY_FOR_REVIEW |
| react-004.e02 | Named content slots | Named slots render real elements and callbacks without a fixed layout-specific behavior. | — | READY_FOR_REVIEW |

### react-005

Fragments group sibling React elements without adding a wrapper DOM element. Explicit Fragment can carry a key.

Source: client/src/modules/react/react-005.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-005.e01 | No extra host wrapper | The measured div has two direct children, not a fragment wrapper element. | — | READY_FOR_REVIEW |
| react-005.e02 | Keyed fragment groups | Each keyed group moves its term and description together. | — | READY_FOR_REVIEW |

### react-006

Conditional rendering selects which elements exist in the React tree. false/null render nothing, while numeric zero is rendered.

Source: client/src/modules/react/react-006.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-006.e01 | Mount and remove a conditional branch | Toggle switches actual mounted elements. | — | READY_FOR_REVIEW |
| react-006.e02 | Zero guard bug and boolean correction | At zero the numeric guard renders 0; the boolean guard renders no badge. Both show a badge after increment. | — | READY_FOR_REVIEW |

### react-007

Lists are rendered by mapping data to elements with stable sibling keys. Filtering changes the rendered membership.

Source: client/src/modules/react/react-007.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-007.e01 | Filter and map a real list | Typing Grace leaves only its matching record in the DOM and output. | — | READY_FOR_REVIEW |
| react-007.e02 | Empty-list rendering | Removing all rows displays an explicit empty state; restoring produces keyed rows again. | — | READY_FOR_REVIEW |

### react-008

Keys identify siblings across reconciliation. Stable IDs preserve the state belonging to an item when its position changes.

Source: client/src/modules/react/react-008.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-008.e01 | Index-key state ownership bug | Edit Ada then reverse: the draft stays at index zero and now appears under Grace. | — | READY_FOR_REVIEW |
| react-008.e02 | Stable-key correction | Edit Ada then reverse: the edited draft stays attached to Ada. | — | READY_FOR_REVIEW |

### react-009

React handlers are callback functions invoked for events. Synthetic events expose the origin and the current handler owner.

Source: client/src/modules/react/react-009.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-009.e01 | Handler runs only on a click | Nothing increments until the user clicks. | — | READY_FOR_REVIEW |
| react-009.e02 | Capture event fields synchronously | currentTarget is BUTTON; target depends on the actual clicked node. The handler stores plain strings immediately. | — | READY_FOR_REVIEW |

### react-010

A controlled input gets its value or checked state from React and reports changes through an event handler.

Source: client/src/modules/react/react-010.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-010.e01 | Controlled text input | Every edit appears in React state and the rendered output. | — | READY_FOR_REVIEW |
| react-010.e02 | Controlled checkbox and select | Checkbox uses checked; select uses value. Both update the actual React state. | — | READY_FOR_REVIEW |

### react-011

Uncontrolled inputs keep their current value in the DOM. defaultValue initializes the field; refs or FormData read it when needed.

Source: client/src/modules/react/react-011.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-011.e01 | Read an uncontrolled ref on demand | Editing changes the DOM input immediately; captured stays unchanged until Read DOM value. | — | READY_FOR_REVIEW |
| react-011.e02 | Collect FormData on submit | Submitting reads the actual form controls, not a duplicate React copy of every field. | — | READY_FOR_REVIEW |

### react-012

Props are supplied by a parent for a render; state belongs to the mounted component instance and persists between its renders.

Source: client/src/modules/react/react-012.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-012.e01 | Initialized local state is independent from later props | The seed prop becomes three while existing local state stays two until its own update. | — | READY_FOR_REVIEW |
| react-012.e02 | Parent-owned value stays synchronized | Both parent and child actions update the one parent-owned value. | — | READY_FOR_REVIEW |

### react-013

Lifting state moves shared data to the nearest common parent so several children render a consistent source of truth.

Source: client/src/modules/react/react-013.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-013.e01 | Shared Celsius and Fahrenheit inputs | Celsius 30 derives Fahrenheit 86. Invalid numeric text is handled without passing NaN to an input. | — | READY_FOR_REVIEW |
| react-013.e02 | Sibling controls share one counter | Clicking either sibling updates the value passed to both. | — | READY_FOR_REVIEW |

### react-014

Composition builds a component from smaller components and caller-provided elements instead of an inheritance hierarchy.

Source: client/src/modules/react/react-014.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-014.e01 | Compose a configurable shell | The shell updates its title while rendering caller content through children. | — | READY_FOR_REVIEW |
| react-014.e02 | Change layout props without resetting a child | Increment the child, then change panel appearance: the child count stays one. | — | READY_FOR_REVIEW |

### react-015

Parent-child communication uses props for input and callback props for requests back to the owner.

Source: client/src/modules/react/react-015.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-015.e01 | A child renders changing parent data | The child follows parent data without storing a second name. | — | READY_FOR_REVIEW |
| react-015.e02 | A child requests a parent quantity change | The child’s request changes quantity and the parent’s derived subtotal. | — | READY_FOR_REVIEW |

### react-016

A callback prop lets a child report an event or validated value to its parent without owning parent state.

Source: client/src/modules/react/react-016.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-016.e01 | Report a selected record | Choosing Grace reports its ID/name to the parent’s selected state. | — | READY_FOR_REVIEW |
| react-016.e02 | Report a child-owned draft only on submit | Typing edits the child’s local draft; only Send to parent changes the parent result. | — | READY_FOR_REVIEW |

### react-017

Form handling combines input ownership, submit events and validation. Client checks improve feedback but do not establish server trust.

Source: client/src/modules/react/react-017.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-017.e01 | Controlled form with explicit validation | An empty submit is rejected; a name and ordinary valid email are accepted. No form data is sent externally. | — | READY_FOR_REVIEW |
| react-017.e02 | Browser constraint validation | The native validity API returns false for an empty required email and true for a valid address. | — | READY_FOR_REVIEW |

### react-018

A committed component can mount, update and unmount. Effects synchronize functional components; class lifecycles offer a useful historical comparison.

Source: client/src/modules/react/react-018.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-018.e01 | Function component lifecycle trace | Changing the prop cleans up the previous effect then sets up the new value; unmount also cleans up. | — | READY_FOR_REVIEW |
| react-018.e02 | Class lifecycle comparison | The actual class records mount/update/unmount lifecycle methods. This does not claim identical scheduling to passive effects. | — | READY_FOR_REVIEW |

### react-019

Unmounting removes a component instance and its state. Hiding a mounted DOM subtree preserves the component’s state.

Source: client/src/modules/react/react-019.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-019.e01 | Conditional removal resets local state | Increment, remove, then remount: the new child starts at zero. | — | READY_FOR_REVIEW |
| react-019.e02 | Hidden DOM preserves the mounted state | Increment, hide, then show: the retained child still has count one. | — | READY_FOR_REVIEW |

### react-020

React preserves state for matching component identity at a tree position. Changing a key or component type intentionally resets that subtree.

Source: client/src/modules/react/react-020.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-020.e01 | Stable position versus explicit key reset | Without an entity key, changing person preserves the old draft. With the key enabled, changing person initializes its own draft. | — | READY_FOR_REVIEW |
| react-020.e02 | Different component types reset at the same position | Increment the first type then switch: the other component type starts at zero. | — | READY_FOR_REVIEW |

### react-021

Rendering computes a new element description; reconciliation decides which committed DOM nodes can be reused.

Source: client/src/modules/react/react-021.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-021.e01 | Text updates reuse a DOM node | Remember the node, update text and compare: the same span node is retained. | — | READY_FOR_REVIEW |
| react-021.e02 | Changing the host type replaces the node | Remember a span, switch it to strong and compare: node identity differs. | — | READY_FOR_REVIEW |

### react-022

React elements are declarative JavaScript descriptions, not live DOM nodes. React uses them as input to reconciliation.

Source: client/src/modules/react/react-022.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-022.e01 | Inspect an actual React element | The description’s type is span and it is not an HTMLElement. The rendered span is a separate DOM node. | — | READY_FOR_REVIEW |
| react-022.e02 | JSX and createElement produce equivalent descriptions | Both descriptions render the same text, but they are separate element objects. | — | READY_FOR_REVIEW |

### react-023

React dispatches capture and bubble handlers through its event system. target is the origin; currentTarget is the component’s handler node.

Source: client/src/modules/react/react-023.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-023.e01 | React capture and bubbling order | Click records parent capture, child handler, then parent bubble. | — | READY_FOR_REVIEW |
| react-023.e02 | Stop bubble without undoing capture | Capture and child handlers run, but the parent bubble handler is suppressed. | — | READY_FOR_REVIEW |

### react-024

React batches compatible state updates from an event or asynchronous continuation into fewer commits. Rendering and committing are separate observations.

Source: client/src/modules/react/react-024.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-024.e01 | Batch updates from one event | One button updates two fields, and the commit probe records their actual pair. | — | READY_FOR_REVIEW |
| react-024.e02 | Batch updates after a promise continuation | After the real promise continuation, both counters become one and the committed pair is traced. | — | READY_FOR_REVIEW |

### react-025

StrictMode enables development checks for render purity, effect cleanup and ref cleanup. It does not duplicate production effects.

Source: client/src/modules/react/react-025.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-025.e01 | Actual strict versus ordinary root comparison | Development replays the strict root’s effect; production disables that development replay. | — | READY_FOR_REVIEW |
| react-025.e02 | Callback ref setup and cleanup | Removing the ref target records its cleanup. Development StrictMode can also replay the initial ref check. | — | READY_FOR_REVIEW |

### react-026

Accessible controls use semantic HTML, labels, keyboard behavior and accurate ARIA state.

Source: client/src/modules/react/react-026.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-026.e01 | Native disclosure with ARIA state | The button works with keyboard activation and exposes the same expanded value that controls the region. | — | READY_FOR_REVIEW |
| react-026.e02 | Accessible validation and focus | An empty submit marks the actual input invalid, exposes an associated error and moves focus to it. | — | READY_FOR_REVIEW |

### react-027

useState stores a component-local snapshot. Setters queue updates for a later render; updater functions compose with previous queued values.

Source: client/src/modules/react/react-027.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-027.e01 | Counter | Increment changes count by one; Decrement reverses it. Reset example remounts with zero. | react-064.e01 | READY_FOR_REVIEW |
| react-027.e02 | Functional updates | One click increments by three, because every updater receives the previous queued result. | react-065.e01 | READY_FOR_REVIEW |
| react-027.e03 | Consecutive state updates | The first queue ends at 42; a replacement followed by an updater ends at 43. | react-066.e01 | READY_FOR_REVIEW |
| react-027.e04 | Object updates | Editing the name preserves role; changing role preserves the entered name. | react-067.e01 | READY_FOR_REVIEW |
| react-027.e05 | Array updates | Add creates a new array; Remove filters by the stable ID. At most eight items are retained. | react-068.e01 | READY_FOR_REVIEW |
| react-027.e06 | Nested state updates | The shallow-copy bug changes saved history too. Copy the nested path increments current without changing saved history. | react-069.e01 | READY_FOR_REVIEW |
| react-027.e07 | State batching | One event changes two state fields. The commit trace shows the combined update; render-call counts are not inferred. | react-070.e01 | READY_FOR_REVIEW |
| react-027.e08 | State vs local variables | After a click, the event saw local 1 but the next render’s local is zero. State remains incremented. | react-071.e01 | READY_FOR_REVIEW |
| react-027.e09 | State initialization | Changing seed updates the prop but not the existing initial state. Remount uses the new seed. | react-072.e01 | READY_FOR_REVIEW |
| react-027.e10 | Stale state problems | Schedule captured, Add ten, Resolve produces 1. The functional version adds to the latest value instead. | react-073.e01 | READY_FOR_REVIEW |

### react-028

useEffect synchronizes a committed component with an external system. Dependencies select when synchronization restarts; cleanup releases the previous resources.

Source: client/src/modules/react/react-028.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-028.e01 | Effect after initial mount | Mount child records a setup; Remove child records cleanup. Development StrictMode may replay the initial check. | react-047.e01 | READY_FOR_REVIEW |
| react-028.e02 | Effect without a dependency array | The trace records an effect after each committed render, including updates. Logging only updates the separate trace observer. | react-048.e01 | READY_FOR_REVIEW |
| react-028.e03 | Effect with an empty dependency array | Changing the prop updates the child display but does not resubscribe its empty-array effect. Remounting does. | react-049.e01 | READY_FOR_REVIEW |
| react-028.e04 | Effect with specific dependencies | The count change cleans up the old count and sets up the new one. Unrelated state does not restart the effect. | react-050.e01 | READY_FOR_REVIEW |
| react-028.e05 | Fetching data from an API | The mounted effect performs a real Express GET and shows Ada after loading. Refetch starts a new request. | react-051.e01 | READY_FOR_REVIEW |
| react-028.e06 | Loading and error handling | Fail request produces a real HTTP 503 and a handled error. Retry returns to success; loading is derived from the active request key. | react-052.e01 | READY_FOR_REVIEW |
| react-028.e07 | Cleanup functions | Changing room removes the previous listener and registers the new one. A notice is delivered only to the current subscription. | react-053.e01 | READY_FOR_REVIEW |
| react-028.e08 | Timers and intervals | The real interval increments up to five, stops with running false and can restart for another five ticks. Stop or unmount clears its handle. | react-054.e01 | READY_FOR_REVIEW |
| react-028.e09 | Event listeners | Each dispatched real browser event increments once. Unmount removes the exact listener. | react-055.e01 | READY_FOR_REVIEW |
| react-028.e10 | Infinite loop scenarios | The bounded bad pattern repeatedly commits until count three. The doubled value is derived directly without another effect. | react-056.e01 | READY_FOR_REVIEW |
| react-028.e11 | Stale closure scenarios | After incrementing, the missing-dependency listener reads zero while the corrected listener reads the current count. | react-057.e01 | READY_FOR_REVIEW |
| react-028.e12 | Race conditions | Run starts actual old/new requests. Guarded results stay Grace; unchecked results reflect whichever response arrived last. The trace records actual order. | react-058.e01 | READY_FOR_REVIEW |
| react-028.e13 | Request cancellation | Cancel active request aborts the real transport. A fresh controller is created when retrying. | react-059.e01 | READY_FOR_REVIEW |
| react-028.e14 | StrictMode behavior | Isolated roots compare actual StrictMode and ordinary mounting. Development replays effect setup/cleanup; production does not. | react-060.e01 | READY_FOR_REVIEW |
| react-028.e15 | Fetching on search changes | Changing the controlled input triggers real requests; old requests are cancelled and old results are hidden. This is not a debounce. | react-061.e01 | READY_FOR_REVIEW |
| react-028.e16 | Correct async operation inside an effect | The inner async function reads actual Express data; the effect itself returns a synchronous cleanup function. | react-062.e01 | READY_FOR_REVIEW |
| react-028.e17 | Unnecessary effects and better alternatives | Both eventually match, but the effect-derived state needs an extra commit. The trace captures the earlier stale commit instead of fabricating a timing delay. | react-063.e01 | READY_FOR_REVIEW |

### react-029

useContext reads the nearest matching provider above the consumer and subscribes to that value.

Source: client/src/modules/react/react-029.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-029.e01 | Two readers of one theme | Both readers change to dark from one provider update. | — | READY_FOR_REVIEW |
| react-029.e02 | Nested override and default | Outside reads default, Inner reads inner, and only the outer reader follows changed outer. | — | READY_FOR_REVIEW |

### react-030

useReducer queues actions and derives the next state with a pure reducer.

Source: client/src/modules/react/react-030.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-030.e01 | Typed counter actions | Increment adds one; reset returns zero. | — | READY_FOR_REVIEW |
| react-030.e02 | Immutable todo transitions | Add, toggle and remove produce new arrays and preserve other items. | — | READY_FOR_REVIEW |

### react-031

useRef retains a mutable container across renders. Updating current does not request a render.

Source: client/src/modules/react/react-031.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-031.e01 | Focus the actual input | The button focuses the native input and its real focus handler updates output. | — | READY_FOR_REVIEW |
| react-031.e02 | Mutable value without rerender | Mutating retains one without updating the output; Read explicitly copies it to visible state. | — | READY_FOR_REVIEW |

### react-032

useMemo caches a calculation by Object.is comparisons of its dependencies. It is a performance optimization, not a semantic guarantee.

Source: client/src/modules/react/react-032.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-032.e01 | Stable array versus new array | After an unrelated update only the fresh-prop memo child commits; changing query updates both. | — | READY_FOR_REVIEW |
| react-032.e02 | Object dependency invalidation | The settings-object dependency invalidates its cache while the primitive query remains equal. | — | READY_FOR_REVIEW |

### react-033

useCallback caches a function identity while its dependencies remain equal. Its closure still belongs to a render.

Source: client/src/modules/react/react-033.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-033.e01 | Stable updater versus fresh callback | An unrelated update commits the fresh callback child; both callbacks still increment correctly. | — | READY_FOR_REVIEW |
| react-033.e02 | Retained callback captures a snapshot | The retained old callback reads zero; the current dependency-correct callback reads one. | — | READY_FOR_REVIEW |

### react-034

useLayoutEffect runs after DOM commit before the browser repaints, letting a component measure and synchronously correct its layout.

Source: client/src/modules/react/react-034.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-034.e01 | Measure committed browser geometry | A real browser measures the narrow box at 160px and the wide box at 260px; jsdom has no layout engine. | — | READY_FOR_REVIEW |
| react-034.e02 | Layout and passive effect order | The trace observes actual layout/passive setup and cleanup. It does not infer when a screen paint occurred. | — | READY_FOR_REVIEW |

### react-035

useImperativeHandle customizes the value exposed through a ref. React 19 function components can receive ref as a prop.

Source: client/src/modules/react/react-035.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-035.e01 | Expose focus and clear commands | Read returns the real input value; Clear empties that input and Focus moves native focus. | — | READY_FOR_REVIEW |
| react-035.e02 | Expose domain validation | Validation focuses an empty required control; a nonempty value validates true. | — | READY_FOR_REVIEW |

### react-036

useId generates a component-instance ID for accessibility relationships. The exact string format is an implementation detail.

Source: client/src/modules/react/react-036.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-036.e01 | Two independent accessible fields | The two label/input pairs have distinct actual IDs, visible in their output. | — | READY_FOR_REVIEW |
| react-036.e02 | Associate hint and error IDs | The same generated prefix connects the input, hint and changing error. | — | READY_FOR_REVIEW |

### react-037

useTransition marks nonurgent state updates and exposes whether its Actions are pending. Urgent input state stays outside the transition.

Source: client/src/modules/react/react-037.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-037.e01 | Urgent text and transition filter | The input stays urgent and the filtered list receives a transition update. Trace records actual pending commits rather than promising a delay. | — | READY_FOR_REVIEW |
| react-037.e02 | Async Action with actual API | The real HTTP acknowledgement resolves to Ada; pending follows the Action lifecycle and errors are shown. | — | READY_FOR_REVIEW |

### react-038

useDeferredValue allows a nonurgent view of a changing value to lag behind its urgent source.

Source: client/src/modules/react/react-038.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-038.e01 | Deferred result query | The urgent query updates first; the deferred result catches up. No fixed lag is guaranteed. | — | READY_FOR_REVIEW |
| react-038.e02 | Explicit initial deferred value | The initial commit can use the supplied empty value; later commits catch up to Ada and then Grace. | — | READY_FOR_REVIEW |

### react-039

useDebugValue registers a custom-hook label for React Developer Tools. It does not render text into the application.

Source: client/src/modules/react/react-039.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-039.e01 | Register the current hook value | The visible state increments; the custom hook separately registers its count with useDebugValue. | — | READY_FOR_REVIEW |
| react-039.e02 | Defer formatting until inspection | The state increments while the formatter is passed by reference for DevTools inspection. | — | READY_FOR_REVIEW |

### react-040

useSyncExternalStore subscribes React to an external mutable source through a stable cached snapshot.

Source: client/src/modules/react/react-040.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-040.e01 | Two subscribers to an external counter | Both readers see one. After removing the second reader, the inspected subscriber count is one. | — | READY_FOR_REVIEW |
| react-040.e02 | Subscribe to real viewport width | Output is window.innerWidth and changes on a real resize; dispatching a resize reads the current width without inventing one. | — | READY_FOR_REVIEW |

### react-041

useInsertionEffect provides CSS-in-JS libraries a phase for installing style rules before layout effects.

Source: client/src/modules/react/react-041.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-041.e01 | Insert style before observing layout | The text changes from green to purple; the layout trace reads the installed rule and actual computed color. | — | READY_FOR_REVIEW |
| react-041.e02 | Independent style ownership and removal | Two badges own two rules. Hiding the second removes only its rule; inspection reports one. | — | READY_FOR_REVIEW |

### react-042

useActionState manages the returned state and pending status of an Action, with each queued action receiving the previous result.

Source: client/src/modules/react/react-042.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-042.e01 | Real form Action with validation and failure | Submit receives a real acknowledgement; selecting Reject produces a displayed HTTP 503 result. Pending is supplied by React. | — | READY_FOR_REVIEW |
| react-042.e02 | Queued Actions consume previous results | Two actual sequential acknowledgements accumulate total three; an unmount aborts owned work. | — | READY_FOR_REVIEW |

### react-043

useOptimistic overlays temporary state during an Action and reverts to the base when the Action ends.

Source: client/src/modules/react/react-043.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-043.e01 | Optimistic item confirmation and rollback | The tentative item appears during real HTTP work, becomes confirmed on success and disappears on rejection. | — | READY_FOR_REVIEW |
| react-043.e02 | Rebase optimistic delta on a changing base | During pending, adding ten rebases the optimistic one to eleven. Rejection leaves ten; success confirms eleven. | — | READY_FOR_REVIEW |

### react-044

useEffectEvent reads the latest committed values from an event belonging to an Effect, without making those values reactive synchronization inputs.

Source: client/src/modules/react/react-044.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-044.e01 | Latest count in a persistent listener | Change count then dispatch: the effect-installed listener records one without resubscribing. | — | READY_FOR_REVIEW |
| react-044.e02 | Latest theme without reconnecting | Change theme then dispatch: dark is read without replacing the subscription. | — | READY_FOR_REVIEW |
| react-044.e03 | Reactive room still replaces subscription | Changing room cleans up A and subscribes B; changing notification theme alone does not. | — | READY_FOR_REVIEW |
| react-044.e04 | Timer reads latest increment | The installed timer reads the latest step size, stops after five ticks with running false, can restart, and is cleared on stop/unmount. | — | READY_FOR_REVIEW |
| react-044.e05 | Latest mute flag controls a notification | The listener reads muted true and records notified false after the toggle. | — | READY_FOR_REVIEW |

### react-045

React use reads a context or a stable Promise resource. Unlike Hooks, use may be called conditionally, but still only while a component or Hook renders.

Source: client/src/modules/react/react-045.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-045.e01 | Read context conditionally with use | The disabled branch does not read context; the enabled branch reads provided. | — | READY_FOR_REVIEW |
| react-045.e02 | Stable real Promise under Suspense | The actual request suspends, then displays three names. A rejected resource reaches the boundary; a new resource retries. | — | READY_FOR_REVIEW |

### react-046

Custom Hooks compose reusable stateful logic by calling Hooks. Each call has its own state unless it deliberately subscribes to a shared source.

Source: client/src/modules/react/react-046.tsx. Tests: client/src/modules/react/react-lessons.test.tsx. Questions: 6. Status: READY_FOR_REVIEW.

| ID | Experiment | Expected observation | Requirement alias | Status |
| --- | --- | --- | --- | --- |
| react-046.e01 | Two independent custom counter calls | Incrementing First leaves Second zero; the hook caps its own count at five. | — | READY_FOR_REVIEW |
| react-046.e02 | Reusable Escape listener lifecycle | Open shows the panel; the actual global Escape listener closes it and is removed on unmount. | — | READY_FOR_REVIEW |
