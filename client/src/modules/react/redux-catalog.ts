import { reduxSummary } from './redux-summary';
import type { ReactExperiment, ReactLesson } from './react-types';

type Step = ReactExperiment['test'][number];
type Details = {
  when: string;
  avoid: string;
  tradeoff: string;
  fix: string;
  interview: [question: string, answer: string][];
  tests: Step[][];
};

const details: Record<string, Details> = {
  'redux-001': {
    when: "Coordinate state shared across features.",
    avoid: "Keep short-lived form state in its local owner.",
    tradeoff: "A central store improves observability but expands the set of shared dependencies.",
    fix: "Create the store once per application instance or isolated exercise.",
    interview: [
      ["What happens when you dispatch a plain action?", "The store calls its reducer synchronously, installs the result, and notifies subscribers."],
      ["Why create a fresh store for a test?", "It isolates prior state and subscriptions."],
      ["What does subscribe return?", "A function that removes that listener."],
    ],
    tests: [
      [{ action: "click", label: "Dispatch increment", expect: "\"value\": 1" }],
      [{ action: "click", label: "Inspect store", expect: "\"value\": 0" }],
    ]
  },
  'redux-002': {
    when: "Record something that happened in a feature.",
    avoid: "Avoid storing functions or DOM nodes in ordinary actions.",
    tradeoff: "Descriptive events make action histories easier to interpret.",
    fix: "Choose a stable, namespaced event type.",
    interview: [
      ["What does an action creator produce?", "A plain action object. Dispatching it is a separate step."],
      ["Why keep action data serializable?", "It supports replay, debugging, and consistent middleware behavior."],
      ["How does an action creator’s match method help?", "It narrows unknown actions to that creator’s payload type."],
    ],
    tests: [
      [{ action: "click", label: "Build action", expect: "counter/increment" }],
      [{ action: "click", label: "Check payload", expect: "\"matched\": true" }],
    ]
  },
  'redux-003': {
    when: "Keep state transitions predictable and testable.",
    avoid: "Avoid I/O, timers, or randomness inside reducers.",
    tradeoff: "Pure reducers move external work into handlers, thunks, or middleware.",
    fix: "Return the existing state for actions the reducer does not handle.",
    interview: [
      ["When does a reducer receive undefined?", "During initialization or when a caller explicitly requests the initial state."],
      ["Why preserve identity for ignored actions?", "Reference comparisons help selectors and views avoid redundant work."],
      ["What belongs in a reducer unit test?", "Assert the next state and verify that the original input stayed intact."],
    ],
    tests: [
      [{ action: "click", label: "Reduce increment", expect: "\"value\": 5" }],
      [{ action: "click", label: "Reduce unknown", expect: "\"sameState\": true" }],
    ]
  },
  'redux-004': {
    when: "Trigger a domain transition from UI or async logic.",
    avoid: "Avoid calling dispatch from a reducer.",
    tradeoff: "Middleware can alter accepted inputs and return values.",
    fix: "Await or unwrap a thunk when the next action depends on its outcome.",
    interview: [
      ["Is plain action dispatch synchronous?", "Yes, reducer processing and store notification are synchronous for the plain action path."],
      ["Why can a function be dispatched?", "Thunk middleware intercepts it and supplies dispatch and getState."],
      ["Does every middleware call reach the reducer?", "Middleware can consume, delay, or replace inputs before calling next."],
    ],
    tests: [
      [{ action: "click", label: "Dispatch add", expect: "\"value\": 4" }],
      [{ action: "click", label: "Dispatch thunk", expect: "\"value\": 2" }],
    ]
  },
  'redux-005': {
    when: "Encapsulate state shape or share derived calculations.",
    avoid: "Avoid storing values that can be cheaply derived.",
    tradeoff: "A derivation may need memoization if it is expensive or returns a new reference.",
    fix: "Keep input selectors simple and derive in an output selector.",
    interview: [
      ["What does a selector receive?", "Typically root state and any explicit parameters needed to derive its result."],
      ["Should a selector mutate state?", "Keep it pure so it can be evaluated repeatedly."],
      ["When does a derived total need to live in state?", "Usually derive it. Store it only when it is independently meaningful, such as an accepted historical quote."],
    ],
    tests: [
      [{ action: "click", label: "Read selector", expect: "7" }],
      [{ action: "click", label: "Compute total", expect: "15" }],
    ]
  },
  'redux-006': {
    when: "Render data that changes as the store updates.",
    avoid: "Avoid returning the entire root state from every selector.",
    tradeoff: "Narrow subscriptions reduce unrelated rerenders.",
    fix: "Select primitives or memoize derived objects with stable inputs.",
    interview: [
      ["How is the result compared by default?", "React Redux uses strict reference equality for the selected result."],
      ["Can a selector run more than once per render?", "Yes, keep it pure and independent of invocation count."],
      ["When can shallowEqual help?", "When a small object groups several fields and equal field identities are sufficient."],
    ],
    tests: [
      [{ action: "click", label: "Add 2", expect: "2" }],
      [{ action: "click", label: "Update note", expect: "0" }, { action: "click", label: "Update count", expect: "1" }],
    ]
  },
  'redux-007': {
    when: "Send an action from an event handler.",
    avoid: "Avoid performing a state transition directly during render.",
    tradeoff: "A dispatching component can stay independent of selected state.",
    fix: "Use a typed dispatch hook when dispatching thunks in TypeScript.",
    interview: [
      ["What store does useDispatch target?", "The store from its React Redux Provider context."],
      ["Does useDispatch subscribe to state?", "It returns dispatch. useSelector establishes a state subscription."],
      ["When might the dispatch reference change?", "If the Provider is switched to a different store."],
    ],
    tests: [
      [{ action: "click", label: "Add 3", expect: "3" }],
      [{ action: "click", label: "Add 5", expect: "5" }, { action: "click", label: "Clear counter", expect: "0" }],
    ]
  },
  'redux-008': {
    when: "Make shared transitions traceable across the application.",
    avoid: "Avoid reaching into a store snapshot and assigning fields.",
    tradeoff: "The same event can produce several derived view updates.",
    fix: "Use actions to describe events and keep selectors responsible for display derivation.",
    interview: [
      ["What happens before subscribers run?", "The root reducer finishes and the next snapshot becomes current."],
      ["Do subscribers receive the action object?", "Store subscribers read the latest snapshot. Middleware can inspect the action directly."],
      ["Why compute a cart total from selected items?", "It prevents drift between the cart contents and a second stored total."],
    ],
    tests: [
      [{ action: "click", label: "Trace action", expect: "counter/add" }],
      [{ action: "click", label: "Notify subscriber", expect: "\"observed\": 1" }],
      [{ action: "click", label: "Add two cart items", expect: "\"total\": 7" }],
      [{ action: "click", label: "Add 7", expect: "7" }],
      [{ action: "click", label: "Update one store", expect: "\"second\": 0" }],
      [{ action: "click", label: "Dispatch increment", expect: "\"value\": 1" }],
    ]
  },
  'redux-009': {
    when: "Preserve previous snapshots and make change detection cheap.",
    avoid: "Avoid copying the entire tree for a small nested update.",
    tradeoff: "Copying by hand is explicit and can become verbose for deep changes.",
    fix: "Copy every ancestor of the changed leaf or use an Immer draft in a Toolkit reducer.",
    interview: [
      ["Does a top-level spread copy nested objects?", "It copies only immediate fields and preserves their references."],
      ["What is structural sharing?", "Retaining unchanged branches across versions while replacing changed paths."],
      ["Why can mutation break UI updates?", "A changed value under the same reference can be missed by equality-based subscriptions."],
    ],
    tests: [
      [{ action: "click", label: "Rename immutably", expect: "Original" }],
      [{ action: "click", label: "Toggle row", expect: "\"sameUntouched\": true" }],
    ]
  },
  'redux-010': {
    when: "Use Context for scoped settings and a store for substantial shared domain workflows.",
    avoid: "Avoid putting every transient input in a global store.",
    tradeoff: "Redux adds conventions and debugging tools. Context has a smaller setup.",
    fix: "Separate low-frequency shared configuration from frequently changing domain data.",
    interview: [
      ["Does Context own state?", "It exposes a provider value supplied by state, props, or another source."],
      ["How does Redux support selective updates?", "Components subscribe to selector results and compare those results across store updates."],
      ["When can both coexist?", "Provide theme or locale through Context while storing shared business state in Redux."],
    ],
    tests: [
      [{ action: "click", label: "Toggle density", expect: "Compact" }],
      [{ action: "click", label: "Add 4", expect: "4" }],
      [{ action: "click", label: "Add 6", expect: "6" }],
    ]
  },
  'redux-011': {
    when: "Create a standard store with inferred types and useful defaults.",
    avoid: "Avoid discarding default middleware just to append a custom layer.",
    tradeoff: "Defaults catch development mistakes but can be customized for specific store needs.",
    fix: "Call the provided defaults callback and concatenate or prepend custom middleware.",
    interview: [
      ["What does a reducer map produce?", "configureStore combines the map and uses its keys as root state fields."],
      ["What is preloadedState?", "A starting snapshot used before normal reducer-driven transitions."],
      ["What default enables function dispatch?", "Redux Thunk is included by default."],
    ],
    tests: [
      [{ action: "click", label: "Inspect reducer map", expect: "\"counter\"" }],
      [{ action: "click", label: "Load initial count", expect: "9" }],
      [{ action: "click", label: "Run default thunk", expect: "8" }],
      [{ action: "click", label: "Run plain action", expect: "1" }],
      [{ action: "click", label: "Initialize combined store", expect: "\"online\": true" }],
    ]
  },
  'redux-012': {
    when: "Model a cohesive domain such as a cart or todo list.",
    avoid: "Avoid combining unrelated features in one large slice.",
    tradeoff: "The slice owns its state shape and exposes a clear action contract.",
    fix: "Keep reducers focused and move asynchronous effects outside normal case reducers.",
    interview: [
      ["How is an action type generated?", "The slice name and reducer key are combined into a namespaced type."],
      ["Can a reducer replace the whole state?", "Return the replacement without also modifying the Immer draft."],
      ["Where should you put a shared external action handler?", "Use extraReducers to respond without creating an action creator for it."],
    ],
    tests: [
      [{ action: "click", label: "Inspect slice action", expect: "counter/add" }],
      [{ action: "click", label: "Update slice", expect: "3" }],
      [{ action: "click", label: "Reset slice", expect: "\"value\": 0" }],
      [{ action: "click", label: "Read prefix", expect: "counter/note" }],
      [{ action: "click", label: "Add 9", expect: "9" }],
      [{ action: "click", label: "Add pencil", expect: "\"total\": 2" }, { action: "click", label: "Add mug", expect: "\"total\": 10" }],
      [{ action: "type", label: "Todo title", value: "Learn thunks" }, { action: "click", label: "Add todo", expect: "Learn thunks" }, { action: "click", label: "Learn thunks", expect: "\"done\": true" }],
    ]
  },
  'redux-013': {
    when: "Separate features such as session and preferences.",
    avoid: "Avoid reducers dispatching into one another.",
    tradeoff: "Independent reducers make ownership clearer while shared events coordinate cross-slice transitions.",
    fix: "Model a shared event with createAction and handle it in relevant extraReducers.",
    interview: [
      ["Can one action change two slices?", "Yes, the combined reducer passes the same action to each slice."],
      ["What determines the root state keys?", "The keys supplied in the store’s reducer map."],
      ["Where can a cross-slice derivation read both values?", "A selector over root state can derive data across slice boundaries."],
    ],
    tests: [
      [{ action: "click", label: "Increment only", expect: "\"user\": \"Ada\"" }],
      [{ action: "click", label: "Dispatch sign-out", expect: "comfortable" }],
    ]
  },
  'redux-014': {
    when: "Describe a specific amount, identifier, or edited field.",
    avoid: "Avoid sending a UI event or other nonserializable object as payload.",
    tradeoff: "Normalize input at the boundary so reducers receive predictable data.",
    fix: "Use PayloadAction and a prepare callback when the creator needs preprocessing.",
    interview: [
      ["What can prepare return?", "A payload and optional meta or error fields."],
      ["How do payload and meta differ?", "Payload holds event data. Meta carries supporting context such as origin."],
      ["Should a reducer trust payload type alone?", "TypeScript helps at compile time. Validate data from untrusted runtime sources."],
    ],
    tests: [
      [{ action: "click", label: "Inspect amount", expect: "\"payload\": 12" }],
      [{ action: "click", label: "Prepare title", expect: "\"title\": \"Write tests\"" }],
    ]
  },
  'redux-015': {
    when: "Express nested Redux Toolkit updates with direct field assignments.",
    avoid: "Avoid mutating the real store snapshot outside a draft.",
    tradeoff: "Draft syntax reduces manual copying but has rules around replacement and identity.",
    fix: "Either modify the draft or return a replacement, and keep the draft inside the reducer.",
    interview: [
      ["What happens to untouched nested branches?", "They retain their references in the resulting state."],
      ["Does Immer allow async mutation of a draft?", "Finish writes during the recipe. Do not keep the draft for later work."],
      ["How do you replace an array?", "Return the new array without mutating the original draft."],
    ],
    tests: [
      [{ action: "click", label: "Rename draft", expect: "Grace" }],
      [{ action: "click", label: "Compare branch identity", expect: "\"sameSettings\": true" }],
    ]
  },
  'redux-016': {
    when: "Model an async workflow that needs explicit Redux transitions.",
    avoid: "Use a query cache when the main need is data fetching and sharing.",
    tradeoff: "Thunks offer flexibility and require explicit lifecycle and concurrency handling.",
    fix: "Pass the thunk signal into fetch and guard state updates by request ID.",
    interview: [
      ["What action does dispatch return after a thunk settles?", "A fulfilled or rejected action, even if the underlying request failed."],
      ["How can a caller abort?", "Call abort on the dispatch result and pass the thunk signal through to the request."],
      ["When should you use rejectWithValue?", "Return a safe, meaningful rejection payload that reducers and callers can inspect."],
    ],
    tests: [
      [{ action: "click", label: "Fetch users", expect: "Grace" }],
      [{ action: "click", label: "Fetch failing users", expect: "pending" }, { action: "click", label: "Cancel request", expect: "cancelled" }],
      [{ action: "click", label: "Fetch users", expect: "Grace" }],
    ]
  },
  'redux-017': {
    when: "Handle a shared event or thunk lifecycle in a feature slice.",
    avoid: "Avoid duplicating action creators for another feature’s event.",
    tradeoff: "External handlers coordinate features while preserving state ownership.",
    fix: "Use the builder API with addCase for exact events and addMatcher for categories.",
    interview: [
      ["Does extraReducers generate actions?", "It responds to existing actions. Normal reducers generate slice action creators."],
      ["Can a case and matcher both run?", "Yes, matching handlers can both update the draft in registration order."],
      ["Why use action creators in addCase?", "The builder can infer action and payload types."],
    ],
    tests: [
      [{ action: "click", label: "Reset workspace", expect: "\"entries\": 0" }],
      [{ action: "click", label: "Count workspace actions", expect: "\"events\": 2" }],
    ]
  },
  'redux-018': {
    when: "Render progress and handle a rejected operation explicitly.",
    avoid: "Avoid treating every completion as a success.",
    tradeoff: "A status field simplifies UI decisions and must be paired with a stale-response policy.",
    fix: "Track request ID and handle abort separately from ordinary rejection.",
    interview: [
      ["What does pending normally clear?", "Prior error state and any flags that should apply only to the current request."],
      ["What is available on fulfilled?", "The payload creator’s returned value and request metadata."],
      ["How can a failure payload differ from an error?", "rejectWithValue provides a domain payload. A thrown error is serialized onto the action error."],
    ],
    tests: [
      [{ action: "click", label: "Fetch users", expect: "fulfilled" }],
      [{ action: "click", label: "Fetch failing users", expect: "pending" }, { action: "wait", label: "", expect: "HTTP 503" }],
      [{ action: "click", label: "Fetch failing users", expect: "pending" }, { action: "wait", label: "", expect: "Caught: HTTP 503" }],
    ]
  },
  'redux-019': {
    when: "Reuse expensive filters or preserve result references for subscribers.",
    avoid: "Avoid memoizing every cheap scalar field read.",
    tradeoff: "Memoization adds a cache and depends on stable inputs.",
    fix: "Return stable inputs and perform allocation in the result function.",
    interview: [
      ["Why can an input selector that creates an array hurt?", "A new identity can force the result computation every time."],
      ["What is the difference between input and result selectors?", "Inputs extract dependencies. The result function derives the output from them."],
      ["Should you create a selector inside every render?", "Reuse a selector instance or create a stable per-instance selector if the cache must be scoped."],
    ],
    tests: [
      [{ action: "click", label: "Compare result identity", expect: "\"sameResult\": true" }],
      [{ action: "click", label: "Compare categories", expect: "Notebook" }],
      [{ action: "click", label: "Show stationery", expect: "Notebook" }, { action: "click", label: "Show home products", expect: "Mug" }],
    ]
  },
  'redux-020': {
    when: "Look up or update records by stable ID.",
    avoid: "A small local array is enough for a simple ordered view.",
    tradeoff: "Normalization helps targeted updates and adds a layer between storage and display.",
    fix: "Select entity data through adapter selectors instead of depending on object traversal order.",
    interview: [
      ["What state shape does the adapter use?", "An IDs array and an entities lookup table."],
      ["What does sortComparer affect?", "It maintains the order of the IDs array according to the comparer."],
      ["What does updateOne do?", "It shallowly applies changes to the entity matching the supplied ID."],
    ],
    tests: [
      [{ action: "click", label: "Load normalized tasks", expect: "\"entities\"" }],
      [{ action: "click", label: "Rename task by ID", expect: "Archive" }],
    ]
  },
  'redux-021': {
    when: "Add logging, guards, async orchestration, or listeners.",
    avoid: "Avoid hiding ordinary reducer logic in middleware.",
    tradeoff: "Order matters and a layer may change both inputs and results.",
    fix: "Call next once unless deliberately intercepting, and return its result.",
    interview: [
      ["What happens if a layer never calls next?", "The remaining layers and reducer do not receive that input."],
      ["How does dispatch differ from next inside middleware?", "dispatch restarts the whole chain. next advances through the remaining chain."],
      ["What belongs in listener middleware?", "Work triggered by a matching action or state change, such as a follow-up effect."],
    ],
    tests: [
      [{ action: "click", label: "Observe middleware", expect: "\"after\": 1" }],
      [{ action: "click", label: "Reject negative amount", expect: "0" }],
      [{ action: "click", label: "Run listener", expect: "observed increment" }],
      [{ action: "click", label: "Inspect chain order", expect: "outer after" }],
      [{ action: "click", label: "Read dispatch result", expect: "counter/add" }],
    ]
  },
  'redux-022': {
    when: "Debug a surprising shared-state transition.",
    avoid: "Avoid exposing credentials or private fields in action histories.",
    tradeoff: "DevTools availability depends on the browser extension and store configuration.",
    fix: "Use descriptive action types and keep sensitive data out of debugging histories.",
    interview: [
      ["How does a named store help?", "It identifies the appropriate instance when multiple stores are registered."],
      ["What can time travel inspect?", "Recorded Redux snapshots. It does not reverse external effects such as HTTP writes."],
      ["What can you inspect without the extension?", "Middleware can record dispatched action types and actual snapshots in the lab."],
    ],
    tests: [
      [{ action: "click", label: "Dispatch in named store", expect: "counter/increment" }],
      [{ action: "click", label: "Record action timeline", expect: "counter/reset" }],
    ]
  },
  'redux-023': {
    when: "Catch invalid selectors and thunk dispatches in TypeScript.",
    avoid: "Avoid maintaining a duplicate handwritten type for the root state.",
    tradeoff: "Type inference follows the store but requires a typed hook setup.",
    fix: "Infer state from getState and dispatch from the configured store.",
    interview: [
      ["Why infer RootState?", "It follows reducer keys and state changes automatically."],
      ["Why is the default dispatch type insufficient for some thunks?", "It does not know the middleware-specific dispatch extensions."],
      ["What does withTypes do at runtime?", "It returns the same hook with a TypeScript type specialization."],
    ],
    tests: [
      [{ action: "click", label: "Add 11", expect: "11" }],
      [{ action: "click", label: "Set up typed reset", expect: "4" }, { action: "click", label: "Reset through typed dispatch", expect: "0" }],
    ]
  },
  'redux-024': {
    when: "Restore harmless preferences or an unfinished local draft.",
    avoid: "Avoid persisting secrets, live subscriptions, or stale API cache by default.",
    tradeoff: "Storage may be unavailable and data may outlive the current schema.",
    fix: "Validate saved data and fall back to known defaults on missing or invalid values.",
    interview: [
      ["Where can a persisted snapshot initialize Redux?", "Parse and validate it, then pass it as preloadedState."],
      ["Why should persisted state be versioned?", "Old snapshots need migration or rejection as the schema changes."],
      ["Why avoid storing RTK Query cache by default?", "It can restore stale data or obsolete subscription state."],
    ],
    tests: [
      [{ action: "click", label: "Restore saved count", expect: "\"value\": 6" }],
      [{ action: "click", label: "Restore invalid snapshot", expect: "\"value\": 0" }],
    ]
  },
  'redux-025': {
    when: "Give a user a useful recovery path after a request fails.",
    avoid: "Avoid presenting raw server diagnostics or swallowing every rejection.",
    tradeoff: "Reducer state and per-interaction feedback serve different audiences.",
    fix: "Use a safe rejectWithValue payload and unwrap in the UI when it needs an exception.",
    interview: [
      ["What does unwrap return on success?", "The fulfilled payload, or a rejection containing the domain payload or serialized error."],
      ["What is a useful distinction between rejected and aborted?", "An aborted request may be expected and does not always require an error alert."],
      ["Why clear an old error on retry?", "It keeps stale failure details from being presented as part of the new attempt."],
    ],
    tests: [
      [{ action: "click", label: "Fetch failing users", expect: "HTTP 503" }],
      [{ action: "click", label: "Fetch failing users", expect: "Caught: HTTP 503" }],
    ]
  },
  'redux-026': {
    when: "Verify shared-state behavior and guard against regressions.",
    avoid: "Avoid testing implementation details that do not affect observable state or UI.",
    tradeoff: "Focused reducer tests are fast. Store integration tests cover middleware and subscriptions.",
    fix: "Create a fresh store and assert the resulting behavior for each test.",
    interview: [
      ["How do you test reducer purity?", "Check the expected next state and compare the unchanged input."],
      ["Should a component integration test mock useSelector?", "A real Provider and store verify actual selector and dispatch wiring."],
      ["What belongs in a thunk integration test?", "The async outcome, lifecycle state, and response or error contract."],
    ],
    tests: [
      [{ action: "click", label: "Test reducer", expect: "PASS: reducer transition" }],
      [{ action: "click", label: "Test store", expect: "PASS: subscriber observed update" }],
    ]
  },
  'redux-027': {
    when: "Use it for server data shared by React screens.",
    avoid: "Avoid splitting closely related endpoints into separate API slices unnecessarily.",
    tradeoff: "A shared API slice centralizes cache and tag relationships.",
    fix: "Register both the API reducer at reducerPath and its middleware.",
    interview: [
      ["Which import generates React hooks?", "Use @reduxjs/toolkit/query/react for the React-integrated createApi."],
      ["How do you mount the API in the store?", "Add its reducer at reducerPath and concatenate its middleware."],
      ["Why keep related endpoints in one API slice?", "Automatic tag invalidation works within an API slice and each slice adds middleware."],
    ],
    tests: [
      [{ action: "click", label: "Load task list", expect: "Read Redux" }],
      [{ action: "click", label: "Load task detail", expect: "Try RTK Query" }],
      [{ action: "click", label: "Inspect API slice", expect: "taskApi" }],
      [{ action: "click", label: "Add task", expect: "Practice selectors" }],
      [{ action: "click", label: "Open second workspace", expect: "\"read\": 1" }],
      [{ action: "click", label: "Add task", expect: "Practice selectors" }, { action: "type", label: "Task title", value: "Renamed through Express" }, { action: "click", label: "Rename first task", expect: "Renamed through Express" }, { action: "click", label: "Delete first task", expect: "Deleted" }],
    ]
  },
  'redux-028': {
    when: "Use it for HTTP JSON APIs with standard request handling.",
    avoid: "Use a custom base query for incompatible transports or specialized error contracts.",
    tradeoff: "An adapter centralizes request defaults while endpoints define resource details.",
    fix: "Pass AbortSignal and handle HTTP statuses as structured errors.",
    interview: [
      ["How can you attach a header before a request?", "Set it in prepareHeaders using store state or endpoint information."],
      ["Does HTTP 503 normally throw out of fetchBaseQuery?", "It returns a structured error with a numeric status."],
      ["How do you override network transport for a test or isolated preview?", "Supply fetchFn that forwards the Request through the appropriate transport."],
    ],
    tests: [
      [{ action: "click", label: "Load page two", expect: "Review tests" }],
      [{ action: "click", label: "Request controlled failure", expect: "\"error\": 503" }],
    ]
  },
  'redux-029': {
    when: "Share data for a resource or a particular filter.",
    avoid: "Avoid running a query before the required identifier is available.",
    tradeoff: "Argument changes can use a different cache entry and request.",
    fix: "Use skip or skipToken while required inputs are missing.",
    interview: [
      ["How do query and queryFn differ?", "query describes input to baseQuery. queryFn implements the endpoint operation directly."],
      ["What does currentData represent?", "Data for the current argument rather than any prior successful result displayed by the hook."],
      ["How can a query transform a response?", "Use transformResponse to unwrap or reshape data before storing it."],
    ],
    tests: [
      [{ action: "click", label: "Select task 3", expect: "Review tests" }],
      [{ action: "click", label: "Open task 2", expect: "Try RTK Query" }],
    ]
  },
  'redux-030': {
    when: "Create, update, or delete server-side resources.",
    avoid: "Avoid assuming that write results automatically refresh all readers.",
    tradeoff: "Invalidating tags can refetch active queries after the write.",
    fix: "Call unwrap when a UI workflow must distinguish fulfillment from rejection.",
    interview: [
      ["How does useMutation differ from useQuery?", "It returns a trigger and result. Calling the hook alone does not issue the request."],
      ["How do you handle mutation errors locally?", "Await the trigger’s unwrap result and catch the structured error."],
      ["Can two mutation hook instances share a result?", "They are independent by default. A fixedCacheKey can share the result."],
    ],
    tests: [
      [{ action: "click", label: "Add task", expect: "Practice selectors" }],
      [{ action: "click", label: "Rename first task", expect: "Practice selectors" }],
    ]
  },
  'redux-031': {
    when: "Reuse data when views ask for the same resource.",
    avoid: "Avoid assuming component unmount immediately clears cached data.",
    tradeoff: "Retention reduces refetches and retains data for a configured duration.",
    fix: "Choose a keepUnusedDataFor period that suits the resource and freshness needs.",
    interview: [
      ["When does the unused-data timer start?", "After the last active subscription for that cache entry ends."],
      ["Do two separate stores share RTK Query cache?", "Each store owns its own API reducer state and subscriptions."],
      ["Why can a mounted reader return data without making a new request?", "An active or retained matching entry already has cached data."],
    ],
    tests: [
      [{ action: "wait", label: "", expect: "Read Redux" }, { action: "click", label: "Unmount query", expect: "fulfilled" }, { action: "wait", label: "", expect: "uninitialized" }],
      [{ action: "wait", label: "", expect: "Read Redux" }, { action: "click", label: "Mount second reader", expect: "\"read\": 1" }],
    ]
  },
  'redux-032': {
    when: "Update subscribed views after a mutation changes server state.",
    avoid: "Avoid invalidating unrelated resources after every successful write.",
    tradeoff: "Broad tags reduce mapping work but can create excessive refetches.",
    fix: "Invalidate the affected entity or collection after success.",
    interview: [
      ["What happens to an actively subscribed invalidated query?", "RTK Query refetches it."],
      ["What happens if the invalidated cache entry has no subscribers?", "RTK Query can remove it so the next subscription fetches fresh data."],
      ["Can you invalidate without a mutation?", "Dispatch the API utility invalidateTags with the relevant tags."],
    ],
    tests: [
      [{ action: "wait", label: "", expect: "Read Redux" }, { action: "click", label: "Invalidate list tag", expect: "\"read\": 2" }],
      [{ action: "click", label: "Add task", expect: "\"read\": 2" }],
      [{ action: "click", label: "Rename first task", expect: "Practice selectors" }],
    ]
  },
  'redux-033': {
    when: "Connect list and detail caches to the same entity changes.",
    avoid: "Avoid a shared list tag for every unrelated dataset.",
    tradeoff: "Specific IDs improve targeting and collection tags cover membership changes.",
    fix: "Give list and detail queries compatible resource tags.",
    interview: [
      ["What is a list tag?", "A conventional synthetic ID used to invalidate a collection entry."],
      ["Does providing an entity tag merge cached records?", "Tags connect entries for invalidation. Each query retains its own result."],
      ["Why tag paginated queries carefully?", "An affected item may not appear on the current page, while a membership change can affect page boundaries."],
    ],
    tests: [
      [{ action: "wait", label: "", expect: "Review tests" }, { action: "click", label: "Invalidate task 3", expect: "\"read\": 3" }],
      [{ action: "click", label: "Rename first task", expect: "Practice selectors" }],
    ]
  },
  'redux-034': {
    when: "Refresh data that changes independently of the current client.",
    avoid: "Avoid short polling intervals for rarely changing data or expensive endpoints.",
    tradeoff: "Polling improves freshness but consumes requests while active.",
    fix: "Choose an interval, stop when unnecessary, and consider focus-aware behavior.",
    interview: [
      ["How do you enable polling in a query hook?", "Pass a positive pollingInterval in its options."],
      ["How can you stop polling?", "Set the interval to zero or remove the subscription."],
      ["When might a subscription stream be preferable?", "When changes are frequent and the service can push updates efficiently."],
    ],
    tests: [
      [{ action: "wait", label: "", expect: "Read Redux" }, { action: "click", label: "Start polling", expect: "\"read\": 2" }],
      [{ action: "wait", label: "", expect: "Read Redux" }, { action: "click", label: "Start polling", expect: "\"read\": 2" }, { action: "click", label: "Stop polling", expect: "Read Redux" }],
    ]
  },
  'redux-035': {
    when: "Let users refresh stale data or opt into a fresh result on mount.",
    avoid: "Avoid unconditional refetching when cached data is sufficient.",
    tradeoff: "Refetch preserves existing data while a new response is in progress.",
    fix: "Distinguish first loading from background fetching in the UI.",
    interview: [
      ["What does refetch on the hook do?", "It requests fresh data for that query’s current argument."],
      ["How do isLoading and isFetching differ?", "isLoading signals an initial load with no data. isFetching can also be true during a refresh."],
      ["What can refetchOnMountOrArgChange accept?", "A boolean or a time threshold in seconds."],
    ],
    tests: [
      [{ action: "wait", label: "", expect: "Read Redux" }, { action: "click", label: "Refetch tasks", expect: "\"read\": 2" }],
      [{ action: "wait", label: "", expect: "Read Redux" }, { action: "click", label: "Open fresh reader", expect: "\"read\": 2" }],
    ]
  },
  'redux-036': {
    when: "Make a predictable, reversible edit visible immediately.",
    avoid: "Avoid optimistic presentation for irreversible or uncertain operations.",
    tradeoff: "The UI responds sooner and must recover if the server rejects the write.",
    fix: "Patch all affected cache entries and choose a rollback or refetch strategy.",
    interview: [
      ["Where can you patch before the response?", "Use onQueryStarted and dispatch updateQueryData."],
      ["Which entry does updateQueryData change?", "The existing cache entry for the exact endpoint and argument."],
      ["How do you reconcile a successful write?", "Apply authoritative server data or invalidate the affected entries."],
    ],
    tests: [
      [{ action: "click", label: "Rename first task", expect: "Practice selectors" }],
      [{ action: "click", label: "Rename first task", expect: "Practice selectors" }],
    ]
  },
  'redux-037': {
    when: "Recover when the server declines a visible temporary edit.",
    avoid: "Avoid applying inverse patches over overlapping writes without coordination.",
    tradeoff: "Undo is simple for isolated edits. Refetch is safer when patches may overlap.",
    fix: "Await queryFulfilled and undo owned patches or invalidate to reconcile.",
    interview: [
      ["What does the patch result contain?", "The result exposes undo alongside its forward and inverse patches."],
      ["Why can overlapping updates make undo unsafe?", "An inverse patch may restore values another write has since changed."],
      ["How does this exercise avoid overlap?", "The write controls remain disabled while the mutation and refresh are in progress."],
    ],
    tests: [
      [{ action: "click", label: "Rename first task", expect: "Practice selectors" }, { action: "wait", label: "", expect: "Rolled back (409)" }],
      [{ action: "click", label: "Rename first task", expect: "Practice selectors" }, { action: "wait", label: "", expect: "Rolled back (409)" }, { action: "wait", label: "", expect: "Read Redux" }],
      [{ action: "click", label: "Rename first task", expect: "Practice selectors" }, { action: "wait", label: "", expect: "Rolled back (409)" }, { action: "wait", label: "", expect: "Read Redux" }],
    ]
  },
  'redux-038': {
    when: "Load a large result set in manageable pieces.",
    avoid: "Avoid treating one server page as the complete collection.",
    tradeoff: "Page arguments simplify navigation but require attention to membership invalidation.",
    fix: "Use currentData so a new page cannot display the previous page as its own.",
    interview: [
      ["How does an argument affect pagination caching?", "Different serialized page arguments create different cache entries."],
      ["Why might a mutation affect other pages?", "Inserts or deletes can shift membership and total count across page boundaries."],
      ["When does a cursor help?", "A cursor can provide more stable navigation over changing ordered data."],
    ],
    tests: [
      [{ action: "click", label: "Next page", expect: "Review tests" }],
      [{ action: "wait", label: "", expect: "Try RTK Query" }, { action: "click", label: "Next page", expect: "Review tests" }, { action: "click", label: "Previous page", expect: "Try RTK Query" }],
    ]
  },
  'redux-039': {
    when: "Exercise protected data loading and cache cleanup at sign-out.",
    avoid: "Avoid storing real credentials in editable demos or logging authorization values.",
    tradeoff: "The lesson uses a public demo value checked by Express. Production session handling has a separate security design.",
    fix: "Clear user-specific cache when the session changes and let the server verify every protected request.",
    interview: [
      ["Where does the request header come from?", "prepareHeaders reads the demo session field in the Redux store."],
      ["What does a 401 tell the client?", "The request lacks valid authentication. The app can clear session state or prompt for sign-in."],
      ["Why reset protected cached data on sign-out?", "Previously fetched user-specific data should stop being visible."],
    ],
    tests: [
      [{ action: "click", label: "Request profile", expect: "\"http\": 401" }],
      [{ action: "click", label: "Request profile", expect: "reader" }],
      [{ action: "click", label: "Request profile", expect: "\"http\": 401" }],
      [{ action: "click", label: "Use demo session", expect: "Ada" }],
      [{ action: "wait", label: "", expect: "reader" }, { action: "click", label: "Clear demo session", expect: "uninitialized" }],
    ]
  },
  'redux-040': {
    when: "Show useful handling of missing data, service failures, and retries.",
    avoid: "Avoid displaying raw exception or backend internals to a user.",
    tradeoff: "Different failure categories call for different recovery actions.",
    fix: "Check the error shape and distinguish retryable failures from missing records.",
    interview: [
      ["Can error.status be a string?", "Yes, transport or parsing failures have named status values."],
      ["What does a 404 typically mean for a detail query?", "The requested resource was not found. Offer a way to select another resource."],
      ["How can you verify a retry cleared an error?", "Assert that a successful response is shown for the new request and old failure details disappear."],
    ],
    tests: [
      [{ action: "wait", label: "", expect: "503" }, { action: "click", label: "Try healthy endpoint", expect: "Read Redux" }],
      [{ action: "click", label: "Request missing task", expect: "Task not found" }],
    ]
  },
  'redux-041': {
    when: "Let multiple components subscribe to the same in-flight result.",
    avoid: "Avoid assuming two different endpoint arguments share a request.",
    tradeoff: "Deduplication reduces network traffic while preserving independent subscriptions.",
    fix: "Check endpoint name and serialized arguments when investigating duplicate requests.",
    interview: [
      ["Do new object instances always create different query keys?", "The default serializer derives a key from the argument contents."],
      ["Can two pages be deduplicated into one standard request?", "Different page arguments represent different cache entries."],
      ["Does deduplication imply a shared cache across stores?", "Each configured store has its own cache and middleware."],
    ],
    tests: [
      [{ action: "click", label: "Mount matching readers", expect: "\"read\": 1" }],
      [{ action: "click", label: "Mount different readers", expect: "\"read\": 2" }],
    ]
  },
  'redux-042': {
    when: "Verify real request paths and success or failure handling.",
    avoid: "Avoid stubbing the outcome when the request contract is under test.",
    tradeoff: "Network integration tests catch wiring failures but require controlled fixtures.",
    fix: "Use an isolated store and clean up subscriptions after assertions.",
    interview: [
      ["How can you start a query without a React hook?", "Dispatch endpoint.initiate and await or unwrap the returned result."],
      ["What needs to be configured for an integration test?", "The API reducer, middleware, and controlled HTTP transport."],
      ["Why unsubscribe and reset API state in cleanup?", "It releases subscriptions, cache timers, and shared test state."],
    ],
    tests: [
      [{ action: "click", label: "Run query assertion", expect: "PASS: fulfilled API data" }],
      [{ action: "click", label: "Run query assertion", expect: "PASS: rejected API data" }],
    ]
  },
};

const toolkit = 'https://redux-toolkit.js.org';
const levels = ['Basic', 'Basic', 'Intermediate', 'Intermediate', 'Debugging', 'Senior'];

export const reduxCatalog: ReactLesson[] = reduxSummary.map(summary => {
  const item = details[summary.id]!;
  const interview: Details['interview'] = [
    ['Where would you apply this approach?', item.when],
    ...item.interview,
    ['What would you look for in a code review?', item.fix],
    ['What tradeoff would you discuss with your team?', item.tradeoff]
  ];
  const topic = Number(summary.id.slice(6));
  return {
    id: summary.id,
    description: summary.description,
    when: item.when,
    avoid: item.avoid,
    tradeoff: item.tradeoff,
    mistakes: [{ problem: item.avoid, fix: item.fix }],
    reference: topic >= 27 ? toolkit + '/rtk-query/overview' : toolkit + '/usage/usage-guide',
    examples: summary.examples.map((example, index) => {
      const test = item.tests[index]!;
      const expected = test.flatMap(step => step.expect ? [step.expect] : []).join(' → ');
      const steps = test.map(step => {
        if (step.action === 'type') return 'Enter “' + step.value + '” in “' + step.label + '”.';
        if (step.action === 'wait') return 'Observe the output for “' + step.expect + '”.';
        return 'Activate “' + step.label + '”.';
      });
      return { ...example, component: 'Example0' + (index + 1), expected, steps, test };
    }),
    questions: summary.questions.map(({ id }, index) => {
      const [question, answer] = interview[index]!;
      return { id, level: levels[index]!, question, answer };
    })
  };
});
