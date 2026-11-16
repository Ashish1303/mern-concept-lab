type ExampleSummary = { id: string; title: string; aliases: string[] };
type Introduction = [number: string, description: string, examples: [title: string, requirement?: string][]];

const introductions: Introduction[] = [
  ["001", "A Redux store holds current state, dispatches actions, and notifies subscribers.", [["Observe store updates"], ["Inspect the initial state"]]],
  ["002", "An action is an object describing an event, with a string type and optional payload.", [["Create a plain action"], ["Match a typed action"]]],
  ["003", "A reducer computes the next state from the current state and an action.", [["Apply a reducer directly"], ["Ignore unknown actions"]]],
  ["004", "Dispatch submits actions to the middleware chain and ultimately to the store reducer.", [["Dispatch a typed payload"], ["Dispatch a thunk"]]],
  ["005", "A selector reads or derives values from the current state.", [["Read one state field"], ["Derive a total"]]],
  ["006", "useSelector subscribes a React component to a selected portion of store state.", [["Subscribe to the count"], ["Skip unrelated updates"]]],
  ["007", "useDispatch returns the dispatch function from the nearest React Redux Provider.", [["Dispatch from a control"], ["Dispatch from a sibling"]]],
  ["008", "Redux data flows from an event to dispatch, through reducers, and back to subscribed views.", [["Trace action through store"], ["Read the subscriber snapshot"], ["Follow derived cart total"], ["Render a Provider update"], ["Compare two independent stores"], ["Counter using Redux","redux-043"]]],
  ["009", "Immutable updates copy changed paths and retain references to unchanged branches.", [["Copy a nested update path"], ["Replace one list element"]]],
  ["010", "Context distributes a value by tree scope, while a Redux store defines shared transitions and subscriptions.", [["Read a scoped setting"], ["Dispatch to a store"], ["Redux vs Context comparison","redux-052"]]],
  ["011", "configureStore combines reducers, configures middleware, and connects Redux DevTools.", [["Mount a slice reducer"], ["Set preloaded state"], ["Use the default thunk middleware"], ["Turn off thunk for an action-only store"], ["Combine independently owned state"]]],
  ["012", "createSlice groups state transitions and generates action creators and a reducer.", [["Generate an action creator"], ["Use the generated reducer"], ["Reset by returning replacement state"], ["Derive a prefixed action type"], ["Wire a slice into React"], ["Shopping cart","redux-044"], ["Todo application","redux-046"]]],
  ["013", "Multiple slices independently own state and can respond to the same event.", [["Update one slice"], ["Respond to a shared action"]]],
  ["014", "An action payload carries the data needed to apply a transition.", [["Carry a numeric payload"], ["Prepare a structured action"]]],
  ["015", "Immer turns writes to a draft into immutable updates with structural sharing.", [["Update a nested Immer draft"], ["Observe structural sharing"]]],
  ["016", "createAsyncThunk dispatches lifecycle actions around an asynchronous payload creator.", [["Dispatch an async thunk"], ["Abort a running thunk"], ["Async user fetching","redux-047"]]],
  ["017", "extraReducers lets a slice respond to actions it did not generate.", [["Handle another feature’s action"], ["Match multiple actions"]]],
  ["018", "Thunk lifecycle actions represent a request in progress, successful result, or failure.", [["See pending and fulfilled"], ["Read a rejected payload"], ["Loading/error states","redux-048"]]],
  ["019", "createSelector memoizes derivation using values returned by its input selectors.", [["Reuse a memoized result"], ["Change an input selector"], ["Product filters","redux-045"]]],
  ["020", "createEntityAdapter manages normalized collections with IDs, entities, CRUD reducers, and selectors.", [["Normalize and sort entities"], ["Update and select an entity"]]],
  ["021", "Redux middleware wraps dispatch to observe actions, change behavior, or run side effects.", [["Log before and after dispatch"], ["Block an invalid action"], ["React to a specific action"], ["Observe middleware order"], ["Preserve the dispatch return value"]]],
  ["022", "Redux DevTools helps inspect actions and state snapshots over time.", [["Name a store for Redux DevTools"], ["Compare an action timeline and state"]]],
  ["023", "Typed hooks connect React Redux to the application’s state and dispatch types.", [["Use typed selector and dispatch"], ["Dispatch a typed reset"]]],
  ["024", "Persistence serializes selected durable state and validates it before rehydration.", [["Serialize and rehydrate a store"], ["Reject malformed saved state"]]],
  ["025", "Redux error handling represents failure in state and lets callers react to rejected operations.", [["Read a rejected Redux action"], ["Catch a rejected thunk with unwrap"]]],
  ["026", "Redux tests can assert reducer transitions or exercise a real store with subscribers.", [["Assert a reducer transition"], ["Assert store dispatch and subscription"]]],
  ["027", "createApi defines endpoints, generates caching logic, and produces React hooks.", [["Use the generated list hook"], ["Use the generated detail hook"], ["Inspect configured endpoints"], ["Call a generated mutation"], ["Mount an independent API store"], ["CRUD using RTK Query and Express","redux-049"]]],
  ["028", "fetchBaseQuery adapts fetch to RTK Query and supports URLs, parameters, headers, and errors.", [["Serialize query parameters"], ["Read the structured HTTP error"]]],
  ["029", "A query endpoint describes a read operation and caches its result by serialized argument.", [["Skip until a valid argument exists"], ["Switch an endpoint argument"]]],
  ["030", "A mutation endpoint triggers an explicit server write and exposes its outcome.", [["Create an Express task"], ["Patch an existing task"]]],
  ["031", "RTK Query retains entries by serialized endpoint argument and tracks subscribers.", [["Observe a cache entry after unmount"], ["Reuse an active cache entry"]]],
  ["032", "Cache invalidation marks related query entries stale and can refetch active subscriptions.", [["Invalidate a subscribed list"], ["Invalidate after a mutation"], ["Cache invalidation","redux-050"]]],
  ["033", "Tags associate cached query entries with resources that writes can invalidate.", [["Target the tag a page provides"], ["Refetch list and detail for one entity"]]],
  ["034", "Polling refetches a subscribed query on an interval.", [["Poll the API on an interval"], ["Stop an active polling interval"]]],
  ["035", "Refetching starts another request for a cached query on demand or according to a policy.", [["Refetch from a button"], ["Force a new request on mount"]]],
  ["036", "Optimistic updates patch the cache before a server write completes.", [["Patch the list before confirmation"], ["Patch list and detail together"]]],
  ["037", "Rollback restores cached data after a rejected optimistic mutation.", [["Roll back a rejected list update"], ["Undo the detail cache patch too"], ["Optimistic updates with rollback","redux-051"]]],
  ["038", "Pagination includes page or cursor in the request and cache identity.", [["Read the second server page"], ["Return to the cached first page"]]],
  ["039", "An API can read a session value when preparing protected requests and handle unauthorized responses.", [["Request without a session"], ["Attach an authorization header"], ["Handle an expired demo value"], ["Skip protected data until sign-in"], ["Clear cached data on sign-out"]]],
  ["040", "RTK Query exposes structured error and loading state for server and transport failures.", [["Recover after a service failure"], ["Handle a missing record"]]],
  ["041", "RTK Query deduplicates active requests that share one serialized query key.", [["Share one request for equal arguments"], ["Make separate requests for different arguments"]]],
  ["042", "RTK Query testing exercises the configured API store, endpoint contracts, and observable results.", [["Assert a fulfilled query against Express"], ["Assert a rejected query against Express"]]],
];

export const reduxSummary = introductions.map(([number, description, entries]) => {
  const id = 'redux-' + number;
  let exampleNumber = 0;
  const examples: ExampleSummary[] = entries.map(([title, requirement]) => {
    const idPart = requirement ? requirement + '.e01' : id + '.e0' + ++exampleNumber;
    return { id: idPart, title, aliases: [] };
  });
  const questions = Array.from({ length: 6 }, (_, index) => ({ id: id + '.q0' + (index + 1) }));
  return { id, description, examples, questions };
});
