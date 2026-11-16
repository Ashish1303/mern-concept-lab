import { advancedSummary } from './advanced-summary';
import type { ReactExperiment, ReactLesson } from './react-types';

type Step = ReactExperiment['test'][number];
type TopicDetails = {
  when: string;
  avoid: string;
  tradeoff: string;
  mistake: [string, string];
  reference: string;
  examples: [expected: string, test: Step[]][];
  interview: [question: string, answer: string][];
};

const details: Record<string, TopicDetails> = {
  'react-074': {
    when: "Measured child work recurs on unrelated parent updates.",
    avoid: "The child is cheap or its inputs change every time.",
    tradeoff: "Shallow comparison has a cost and is a performance optimization.",
    mistake: ["Passing freshly created objects to a memoized child.", "Pass primitives or stabilize a measured identity bottleneck."],
    reference: "https://react.dev/reference/react/memo",
    examples: [
      ["The parent count advances while greeting.commit stays unchanged.", [{ action: "click", label: "Update parent (0)", expect: "Ada" }]],
      ["The same name is displayed, but badge.commit records the new object.", [{ action: "click", label: "Recreate props (0)", expect: "Ada" }]],
    ],
    interview: [
      ["Which comparison does memo use?", "Each prop is compared with Object.is."],
      ["Can state or Context still trigger a render?", "Yes, memo only addresses renders from unchanged parent props."],
      ["What must a custom comparator include?", "Compare every prop, including callbacks that may capture changed state."],
    ]
  },
  'react-075': {
    when: "Several components need an existing wrapper contract.",
    avoid: "A hook or ordinary composition expresses the same behavior more directly.",
    tradeoff: "Wrappers add a component layer and can obscure where props originate.",
    mistake: ["Constructing the HOC inside render.", "Create the wrapped component at module scope to preserve its identity."],
    reference: "https://react.dev/learn/passing-props-to-a-component",
    examples: [
      ["The wrapper reveals the report when allowed.", [{ action: "click", label: "Toggle access", expect: "Revenue report" }]],
      ["The wrapped view displays state owned by the wrapper.", [{ action: "click", label: "Increase score", expect: "1" }]],
    ],
    interview: [
      ["What does a HOC return?", "A component that wraps or enhances the input component."],
      ["Why define the wrapper outside render?", "A new component type at each render remounts its subtree."],
      ["How should injected props be typed?", "Require them on the inner view and omit them from the public wrapper contract."],
    ]
  },
  'react-076': {
    when: "A reusable owner needs customizable markup.",
    avoid: "The caller only needs reusable logic and can use a custom hook.",
    tradeoff: "Function children make control flow explicit but can deepen JSX nesting.",
    mistake: ["Calling hooks inside a render callback.", "Use a component inside the callback when the rendered UI needs hooks."],
    reference: "https://react.dev/reference/react/Children",
    examples: [
      ["The callback receives the updated open state.", [{ action: "click", label: "Toggle panel", expect: "Panel open" }]],
      ["Typing Grace gives the caller one matching row.", [{ action: "type", label: "Filter names", value: "Grace", expect: "\"Grace\"" }]],
    ],
    interview: [
      ["What does a render prop receive?", "The owner supplies data or actions and the callback returns React nodes."],
      ["Can children be a function?", "Yes, type it as a callback returning ReactNode."],
      ["Why can a render prop defeat memo?", "A newly created callback changes prop identity."],
    ]
  },
  'react-077': {
    when: "Many descendants need a scoped setting such as a theme.",
    avoid: "Each consumer needs a different high-frequency slice of a large state object.",
    tradeoff: "Changing a provider value can update its consumers.",
    mistake: ["Creating a fresh provider object on every unrelated render.", "Split independent values and stabilize provider objects where measured."],
    reference: "https://react.dev/reference/react/useContext",
    examples: [
      ["The descendant updates through the provider.", [{ action: "click", label: "Toggle theme", expect: "Dark" }]],
      ["The inner provider overrides the outer value for its subtree.", [{ action: "click", label: "Toggle preview scope", expect: "Preview" }]],
    ],
    interview: [
      ["Which provider wins?", "The nearest matching ancestor provider supplies the value."],
      ["When does React use the default?", "Only when there is no matching provider above the consumer."],
      ["Does memo prevent a Context update?", "A memoized consumer still receives changed Context."],
    ]
  },
  'react-078': {
    when: "The path is short and explicit ownership helps readers.",
    avoid: "Several layers forward props they do not consume.",
    tradeoff: "Explicit props show dependencies but add forwarding code as the tree grows.",
    mistake: ["Introducing Context for every two-level dependency.", "Try a composition slot when intermediate layers only need to place content."],
    reference: "https://react.dev/learn/passing-data-deeply-with-context",
    examples: [
      ["The rename handler travels through layout and header.", [{ action: "click", label: "Rename profile", expect: "Grace" }]],
      ["The owner passes a ready-made profile element into the shell.", [{ action: "click", label: "Rename profile", expect: "Linus" }]],
    ],
    interview: [
      ["What makes drilling different from ordinary props?", "Intermediates forward data they do not use."],
      ["How can composition remove a forwarding chain?", "The owner passes a fully configured element into a layout slot."],
      ["What is the upside of forwarding?", "Dependencies stay visible in component signatures and easy to substitute in tests."],
    ]
  },
  'react-079': {
    when: "An interaction must focus, scroll, or control a child imperatively.",
    avoid: "Declarative props describe the needed state change.",
    tradeoff: "Exposing an entire node couples callers to implementation details.",
    mistake: ["Reading ref.current before the element commits.", "Use an event handler or effect after React attaches the ref."],
    reference: "https://react.dev/reference/react/forwardRef",
    examples: [
      ["Focus moves to the actual input element.", [{ action: "click", label: "Focus input", expect: "Input focused" }]],
      ["The parent clears the input through a single exposed method.", [{ action: "click", label: "Clear through ref", expect: "Empty field" }]],
    ],
    interview: [
      ["How do refs differ between React 18 and 19?", "React 18 uses forwardRef for function components. React 19 supports ref as a prop."],
      ["Why expose a handle?", "It limits the parent to supported methods without exposing a whole DOM node."],
      ["Does ref.current update the UI?", "Ref changes do not trigger rendering. Use state when rendered output depends on the value."],
    ]
  },
  'react-080': {
    when: "An overlay needs to escape clipping or stacking constraints.",
    avoid: "Ordinary DOM placement already provides the right layout.",
    tradeoff: "Portals preserve React bubbling and require deliberate focus management for dialogs.",
    mistake: ["Assuming a portal click only bubbles to DOM ancestors.", "Account for React ancestors or stop propagation when appropriate."],
    reference: "https://react.dev/reference/react-dom/createPortal",
    examples: [
      ["The panel appears in the sibling target.", [{ action: "click", label: "Open portal", expect: "In the portal target" }]],
      ["The portaled button receives Context and its click reaches the React parent.", [{ action: "click", label: "Click portal child", expect: "1" }]],
    ],
    interview: [
      ["Does a portal create a separate React tree?", "It moves DOM placement but retains its React ancestors."],
      ["Where does a portal click bubble?", "It bubbles through the React component tree."],
      ["What does a modal need beyond a portal?", "Accessible dialog semantics, focus handling, and keyboard behavior."],
    ]
  },
  'react-081': {
    when: "A failure-prone panel should recover independently of its siblings.",
    avoid: "An event handler or async callback can catch and handle its own failure.",
    tradeoff: "Boundary placement controls how much state is discarded after a failure.",
    mistake: ["Retrying while the same failing input remains in place.", "Repair the trigger and remount the failed boundary."],
    reference: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
    examples: [
      ["The boundary replaces the failed panel and preserves its sibling.", [{ action: "click", label: "Break panel", expect: "Panel recovered with fallback" }]],
      ["Break the panel, then choose Retry panel to restore healthy content.", [{ action: "click", label: "Break panel", expect: "Panel recovered with fallback" }, { action: "click", label: "Retry panel", expect: "Panel healthy" }]],
    ],
    interview: [
      ["What does an error boundary catch?", "Failures in descendant rendering and lifecycle work. Handle ordinary events and timers at their source."],
      ["How do the two boundary APIs differ?", "getDerivedStateFromError selects fallback state. componentDidCatch reports the error and stack."],
      ["What if the boundary itself throws?", "A higher boundary must handle the failure."],
    ]
  },
  'react-082': {
    when: "A large component is only needed on demand.",
    avoid: "A small component is required in the first paint.",
    tradeoff: "A separate chunk trades initial bundle size for later loading latency.",
    mistake: ["Declaring the lazy component inside a rendering component.", "Declare it at module scope so its identity and resolved module persist."],
    reference: "https://react.dev/reference/react/lazy",
    examples: [
      ["React resolves a default export before showing the report.", [{ action: "click", label: "Toggle report", expect: "Report loaded" }]],
      ["The loader maps Details to the default export expected by lazy.", [{ action: "click", label: "Toggle details", expect: "Details loaded" }]],
    ],
    interview: [
      ["What must the loader resolve to?", "An object whose default property contains a component."],
      ["When does React invoke the loader?", "On the first attempt to render that lazy type. React caches the promise and result."],
      ["Where does a rejection go?", "React throws it to the nearest error boundary."],
    ]
  },
  'react-083': {
    when: "Lazy code or a Suspense-aware data source can suspend.",
    avoid: "Fetching occurs only in an ordinary effect without a suspending resource.",
    tradeoff: "Boundary granularity determines how much content reveals together.",
    mistake: ["Assuming Suspense detects any promise started in an effect.", "Use a supported source and place a boundary around the loading region."],
    reference: "https://react.dev/reference/react/Suspense",
    examples: [
      ["Start loading, then finish it to replace the fallback.", [{ action: "click", label: "Load panel", expect: "Loading fallback" }, { action: "click", label: "Finish loading", expect: "New panel ready" }]],
      ["The prior panel stays visible until the replacement can commit.", [{ action: "click", label: "Start transition", expect: "Previous panel stays visible" }, { action: "click", label: "Finish loading", expect: "New panel ready" }]],
    ],
    interview: [
      ["What triggers the fallback?", "A descendant suspends during render through a supported resource."],
      ["Why use a transition?", "It can keep previously revealed content visible while the replacement suspends."],
      ["Does state survive an initially suspended mount?", "React retries from scratch before the first successful mount."],
    ]
  },
  'react-084': {
    when: "A route or optional feature can load on demand.",
    avoid: "A critical small module is required immediately.",
    tradeoff: "More chunks can reduce initial bytes while adding request and coordination overhead.",
    mistake: ["Equating a dynamic import in the editor with a browser network request.", "Inspect the built app for chunk requests. The editor resolves compiled modules in memory."],
    reference: "https://vite.dev/guide/features.html#dynamic-import",
    examples: [
      ["The reference demo lazily imports a separate report module.", [{ action: "click", label: "Show reports", expect: "Report loaded" }]],
      ["The handler loads a calculation module before computing the total.", [{ action: "click", label: "Calculate invoice", expect: "44" }]],
    ],
    interview: [
      ["How does import() differ from a static import?", "It returns a promise and gives the bundler a split point."],
      ["What makes a good split boundary?", "Start with optional routes or features and measure the initial savings and later latency."],
      ["Why can a deployment break a chunk request?", "An old page can refer to a removed asset. Retain assets during rollout or offer safe reload."],
    ]
  },
  'react-085': {
    when: "Screens need shareable URLs and navigation history.",
    avoid: "A transient local toggle has no URL or history meaning.",
    tradeoff: "URL modeling adds structure and requires a fallback for unmatched paths.",
    mistake: ["Using click handlers for ordinary links.", "Use Link or NavLink so users retain standard link behavior."],
    reference: "https://reactrouter.com/start/declarative/routing",
    examples: [
      ["The exercise navigates to About within its own history.", [{ action: "click", label: "About", expect: "About page" }]],
      ["A wildcard route renders recovery content.", [{ action: "click", label: "Unknown page", expect: "Page not found" }]],
    ],
    interview: [
      ["What does a router track?", "It maps locations in history to matched route branches."],
      ["What does NavLink expose?", "Its active state and an aria-current marker for the active destination."],
      ["When should you use MemoryRouter?", "Use it when a test or exercise needs history without changing the browser URL."],
    ]
  },
  'react-086': {
    when: "Multiple records share one detail layout.",
    avoid: "A fixed action needs a static URL such as /products/new.",
    tradeoff: "Matching the route and finding a real record are separate steps.",
    mistake: ["Assuming every matched identifier exists.", "Validate identifiers and provide a resource-level missing state."],
    reference: "https://reactrouter.com/start/declarative/routing#dynamic-segments",
    examples: [
      ["The same component selects a different product.", [{ action: "click", label: "Open notebook", expect: "Notebook" }, { action: "click", label: "Open missing product", expect: "Product not found" }]],
      ["The static new route wins over the dynamic SKU route.", [{ action: "click", label: "Create product", expect: "Create product form" }]],
    ],
    interview: [
      ["How do you declare a dynamic segment?", "Use a colon prefix such as :sku and read its match as a parameter."],
      ["Which route wins for /products/new?", "The static segment ranks above a dynamic segment."],
      ["How should you build URLs from record IDs?", "Validate and encode values before interpolating a path segment."],
    ]
  },
  'react-087': {
    when: "A section shares navigation or settings across subpages.",
    avoid: "Screens have no shared layout or relative path relationship.",
    tradeoff: "A parent controls the layout and the outlet placement.",
    mistake: ["Declaring children and forgetting to render Outlet.", "Put Outlet exactly where child content should appear."],
    reference: "https://reactrouter.com/start/declarative/routing#nested-routes",
    examples: [
      ["The layout stays while the index is replaced by Settings.", [{ action: "click", label: "Settings tab", expect: "Dashboard settings" }]],
      ["The child reads the value supplied by the parent outlet.", [{ action: "click", label: "Show members", expect: "Team Orbit" }]],
    ],
    interview: [
      ["When does an index route match?", "It supplies default child content at the parent URL."],
      ["Why can a matched child fail to appear?", "Its parent may be missing an Outlet."],
      ["When is outlet context useful?", "It shares route-layout values with the matched child branch."],
    ]
  },
  'react-088': {
    when: "A signed-out user should reach a sign-in screen before continuing.",
    avoid: "Client state is the only gate protecting private data.",
    tradeoff: "This exercise simulates session state. Real applications must enforce authorization on the server.",
    mistake: ["Trusting a client role to authorize an API request.", "Check the authenticated session and permission server-side for every protected operation."],
    reference: "https://reactrouter.com/api/components/Navigate",
    examples: [
      ["Open the account as a guest, then simulate sign-in to resume.", [{ action: "click", label: "Open account", expect: "Sign-in required" }, { action: "click", label: "Simulate sign-in", expect: "Account page" }]],
      ["Only the simulated admin sees the admin tools.", [{ action: "click", label: "Toggle demo role", expect: "Admin tools" }]],
    ],
    interview: [
      ["How do authentication and authorization differ?", "Authentication establishes identity. Authorization checks permission."],
      ["How can a guard resume the requested page?", "Carry a validated internal destination to sign-in, then replace the login entry."],
      ["What if the client role is tampered with?", "The server must validate the session and permission independently."],
    ]
  },
  'react-089': {
    when: "Navigation depends on successful submission or workflow completion.",
    avoid: "An ordinary link can express the destination.",
    tradeoff: "Push, replace, and history deltas have different Back behavior.",
    mistake: ["Calling navigate during render.", "Navigate from an event or effect or render a Navigate element."],
    reference: "https://reactrouter.com/api/hooks/useNavigate",
    examples: [
      ["Type a draft name, then submit to navigate with history state.", [{ action: "type", label: "Draft name", value: "Interview notes" }, { action: "click", label: "Save draft", expect: "Saved Interview notes" }]],
      ["Replace the current entry, then go back to the original start entry.", [{ action: "click", label: "Replace current entry", expect: "/replacement" }, { action: "click", label: "Go back", expect: "/start" }]],
    ],
    interview: [
      ["How does replace affect Back?", "It rewrites the current history entry so Back skips the replaced entry."],
      ["Why is navigate(-1) risky on a deep link?", "The earlier entry may be missing or belong to a different site."],
      ["What should ordinary menu links use?", "Use Link or NavLink for standard link semantics, including opening another tab."],
    ]
  },
  'react-090': {
    when: "A component needs route identifiers or parent route params.",
    avoid: "The value belongs to the query string rather than the path.",
    tradeoff: "URL parameters arrive as strings and may be absent.",
    mistake: ["Treating a TypeScript parameter type as runtime validation.", "Check the value before querying or coercing it."],
    reference: "https://reactrouter.com/api/hooks/useParams",
    examples: [
      ["The route matches, but validation rejects the identifier.", [{ action: "click", label: "Open invalid order", expect: "Invalid order ID" }]],
      ["The issue child sees both the project and issue parameters.", [{ action: "click", label: "Open issue 2", expect: "orbit / 2" }]],
    ],
    interview: [
      ["What is the runtime type of a matched ID?", "A matched value is a string and absent parameters can be undefined."],
      ["Do child routes inherit parameters?", "Yes, they inherit matched parent parameters."],
      ["How should an ID change affect fetching?", "Use the validated ID as a dependency or cache key and guard against stale responses."],
    ]
  },
  'react-091': {
    when: "A filter or sort selection should survive sharing and navigation.",
    avoid: "A value is sensitive or only relevant to a transient interaction.",
    tradeoff: "Query values are strings and writes change history unless replaced.",
    mistake: ["Mutating the current URLSearchParams without calling the setter.", "Clone the current values and commit the next query with the setter."],
    reference: "https://reactrouter.com/api/hooks/useSearchParams",
    examples: [
      ["Changing sort retains the current page.", [{ action: "select", label: "Sort order", value: "price", expect: "page=2&sort=price" }]],
      ["Repeated keys retain both tags and a history entry.", [{ action: "click", label: "Add router tag", expect: "router" }]],
    ],
    interview: [
      ["Why clone the query before updating?", "It preserves unrelated keys and avoids mutating the current snapshot."],
      ["How do you read repeated keys?", "Use getAll. Write with append or an array-valued setter input."],
      ["When should query updates replace history?", "Replace intermediate edits if each entry would make Back tedious."],
    ]
  },
  'react-092': {
    when: "An interaction performs avoidable computation or update work.",
    avoid: "The baseline is already fast or the extra cache is more expensive.",
    tradeoff: "Deferral changes scheduling, while precomputation reduces repeated work.",
    mistake: ["Treating a deferred value as request rate control.", "Use deferral for render priority and separate request throttling where needed."],
    reference: "https://react.dev/reference/react/useDeferredValue",
    examples: [
      ["Typing 1234 updates input first and the results settle on one match.", [{ action: "type", label: "Search items", value: "1234", expect: "Item 1234" }]],
      ["Selection changes without rebuilding the 2,000-item dataset.", [{ action: "click", label: "Select next", expect: "Item 1" }]],
    ],
    interview: [
      ["What should you measure first?", "Measure the slow interaction and identify which work takes time."],
      ["Does deferral reduce the work itself?", "It changes render priority. Optimize the cost separately if the work is too expensive."],
      ["When can precomputation hurt?", "It shifts cost and memory to startup even when the feature is unused."],
    ]
  },
  'react-093': {
    when: "You need to compare the work of one subtree across a reproducible interaction.",
    avoid: "You need network or layout cost rather than React render duration.",
    tradeoff: "Profiling adds overhead and default production builds omit timing callbacks.",
    mistake: ["Treating one sample as a benchmark.", "Compare repeat runs in comparable builds and inspect which subtrees committed."],
    reference: "https://react.dev/reference/react/Profiler",
    examples: [
      ["Counter.commit records the change. Profiling-enabled builds also record timings.", [{ action: "click", label: "Profile update", expect: "1" }]],
      ["Only the Right region commits after a Right update.", [{ action: "click", label: "Update Right", expect: "1" }]],
    ],
    interview: [
      ["How do actualDuration and baseDuration differ?", "Actual duration measures the performed render work. Base duration estimates work without memoized skips."],
      ["Why might onRender be absent in production?", "The default production build omits profiling instrumentation."],
      ["Why compare commit timestamps?", "Multiple profiler IDs can share a commit time, which groups their samples."],
    ]
  },
  'react-094': {
    when: "Fast events would otherwise cause unnecessary requests or updates.",
    avoid: "Each event must be handled individually without delay.",
    tradeoff: "Leading, trailing, and cancellation policies change the delivered events.",
    mistake: ["Creating a new timer helper on every keystroke.", "Keep the helper stable and cancel pending work when the owner unmounts."],
    reference: "https://react.dev/reference/react/useEffect",
    examples: [
      ["The result updates after the input has been quiet for 250 ms.", [{ action: "type", label: "Debounced search", value: "grace", expect: "grace" }]],
      ["Only the leading sample is accepted within the 250 ms window.", [{ action: "click", label: "Send burst", expect: "1" }]],
    ],
    interview: [
      ["Which helper fits search after typing stops?", "A trailing debounce runs after a quiet period with the latest value."],
      ["What does leading-only throttle drop?", "It takes the first call and drops the rest within the blocked interval."],
      ["Does debounce cancel an issued request?", "Use AbortController or a stale-response guard for in-flight requests."],
    ]
  },
  'react-095': {
    when: "A long list would otherwise put thousands of rows into the DOM.",
    avoid: "The list is small or all content must be present at once.",
    tradeoff: "Overscan adds a few mounted rows to reduce gaps when scrolling.",
    mistake: ["Using fixed-height offsets for variable-height rows.", "Measure variable rows or use a virtualizer that supports them."],
    reference: "https://web.dev/articles/virtualize-long-lists-react-window",
    examples: [
      ["The viewport moves to row 5000 and mounts five rows.", [{ action: "click", label: "Jump to row 5000", expect: "5000" }]],
      ["The window includes two extra rows on each side and still mounts only nine.", [{ action: "click", label: "Jump to row 5000", expect: "5000" }]],
    ],
    interview: [
      ["How do fixed-height rows map from scroll offset?", "Divide scrollTop by row height and round down for the first visible index."],
      ["Why keep a full-height spacer?", "It preserves scrollbar geometry and each row's position in the entire list."],
      ["How should you handle focus?", "Keep keyboard focus predictable when rows mount or unmount."],
    ]
  },
  'react-096': {
    when: "A UI contract can be checked through DOM roles, input or output.",
    avoid: "Correctness depends on a real server or external service.",
    tradeoff: "Focused tests diagnose regressions quickly while leaving cross-boundary behavior to integration tests.",
    mistake: ["Asserting an internal state variable instead of the resulting UI.", "Interact through the rendered controls and check observable output."],
    reference: "https://testing-library.com/docs/react-testing-library/intro/",
    examples: [
      ["The check clicks a real button and verifies the rendered quantity.", [{ action: "click", label: "Run component check", expect: "PASS: click increases quantity" }]],
      ["The browser validity API rejects an invalid email.", [{ action: "click", label: "Run component check", expect: "PASS: invalid email is rejected" }]],
    ],
    interview: [
      ["Why query accessible roles and names?", "These reflect how people identify controls and surface accessibility regressions."],
      ["When should a test await a visible result?", "When output depends on asynchronous work or a later commit."],
      ["What makes a useful failure message?", "Name the action and the visible outcome the test expected."],
    ]
  },
  'react-097': {
    when: "A filter, serialization rule or failure handler crosses a boundary.",
    avoid: "A pure function alone can express the entire contract.",
    tradeoff: "Real integration catches shape and wiring errors with more setup than a unit check.",
    mistake: ["Replacing the boundary you intend to verify with a fixed result.", "Use the real lab endpoint and assert both data and failure handling."],
    reference: "https://testing-library.com/docs/react-testing-library/intro/",
    examples: [
      ["The browser checks a real Express response filtered to Grace.", [{ action: "click", label: "Run integration check", expect: "PASS: filtered API response" }]],
      ["The client handles the controlled HTTP 503 from Express.", [{ action: "click", label: "Run integration check", expect: "PASS: API failure handled" }]],
    ],
    interview: [
      ["What makes a check an integration check?", "It exercises collaborating pieces such as UI, HTTP handling and serialization."],
      ["What should a failure case assert?", "Check the intended status and the client response. An unrelated outage should fail."],
      ["How do you keep API checks repeatable?", "Use deterministic fixtures, isolated state and explicit contract assertions."],
    ]
  },
  'react-098': {
    when: "A local update causes unrelated sibling work.",
    avoid: "A subtree actually needs to reflect the updated state.",
    tradeoff: "State placement often provides a simpler isolation boundary than memoizing every child.",
    mistake: ["Moving all interaction state to a distant shared parent.", "Keep local state in the smallest owner that needs it."],
    reference: "https://react.dev/learn/choosing-the-state-structure",
    examples: [
      ["The counter commits without another independent summary commit.", [{ action: "click", label: "Update local counter", expect: "1" }]],
      ["The plain summary commits again while the memo summary retains stable props.", [{ action: "click", label: "Update parent counter", expect: "1" }]],
    ],
    interview: [
      ["Why move local state down?", "Updates then start in a smaller owner and can avoid unrelated sibling work."],
      ["Which events can you compare?", "Observe commits in the affected subtrees for the same interaction."],
      ["When can a memo child still commit?", "Props, local state or consumed Context may change."],
    ]
  },
  'react-099': {
    when: "A measured bottleneck depends on expensive calculation or changing prop identity.",
    avoid: "There is no expensive work or identity-sensitive consumer.",
    tradeoff: "These optimizations require correct dependencies and have comparison or cache overhead.",
    mistake: ["Adding useCallback while omitting a dependency that the callback reads.", "Declare dependencies or use a functional updater when only prior state is needed."],
    reference: "https://react.dev/reference/react/useMemo",
    examples: [
      ["A quantity change updates the total. An unrelated note toggle preserves the object.", [{ action: "click", label: "Toggle note", expect: "60" }, { action: "click", label: "Add bundle", expect: "120" }]],
      ["The stable callback updates the parent without another memoized child commit.", [{ action: "click", label: "Increment from child", expect: "1" }]],
    ],
    interview: [
      ["When do you use useMemo versus useCallback?", "Use useMemo for a computed value and useCallback for a stable function identity."],
      ["What does a fresh prop object do?", "It can defeat memo even with equal field values."],
      ["Can correctness depend on a memo cache?", "Keep the calculation pure and correct even if React discards the cache."],
    ]
  },
  'react-100': {
    when: "A scoped setting fits Context, while shared domain transitions can benefit from a Redux store.",
    avoid: "The data belongs to one component and local state suffices.",
    tradeoff: "Redux adds structure and tooling. Context has a smaller setup for simple scoped values.",
    mistake: ["Using one changing Context object for unrelated, frequently updated data.", "Split providers or use a store with selectors where independent subscriptions matter."],
    reference: "https://redux-toolkit.js.org/introduction/getting-started",
    examples: [
      ["A toolbar reads the new value from its nearest provider.", [{ action: "click", label: "Toggle density", expect: "Compact" }]],
      ["The cart reducer updates quantity and the subscribed component renders it.", [{ action: "click", label: "Dispatch cart/add", expect: "1" }]],
    ],
    interview: [
      ["Does Context own state?", "It distributes a value. State can live in a provider or store."],
      ["How does useSelector decide to rerender?", "It compares the latest selected result to the previous one by strict reference equality by default."],
      ["What does createSlice produce?", "It generates a reducer and action creators. Immer turns draft edits into immutable updates."],
    ]
  },
};

export const advancedCatalog: ReactLesson[] = advancedSummary.map(summary => {
  const topic = details[summary.id]!;
  const [problem, fix] = topic.mistake;
  const interview: TopicDetails['interview'] = [
    ['When would you apply this pattern?', topic.when],
    ...topic.interview,
    ['What common mistake should a reviewer look for?', problem + ' ' + fix],
    ['What tradeoff would you explain before choosing this approach?', topic.tradeoff]
  ];
  const levels = ['Basic', 'Basic', 'Intermediate', 'Intermediate', 'Debugging', 'Senior'];
  return {
    id: summary.id,
    description: summary.description,
    when: topic.when,
    avoid: topic.avoid,
    tradeoff: topic.tradeoff,
    mistakes: [{ problem, fix }],
    reference: topic.reference,
    examples: summary.examples.map((example, index) => {
      const [expected, test] = topic.examples[index]!;
      const steps = test.map(({ action, label, value }) => {
        if (action === 'type') return 'Enter “' + value + '” in “' + label + '”.';
        if (action === 'select') return 'Choose “' + value + '” in “' + label + '”.';
        return 'Activate “' + label + '”.';
      });
      return { ...example, component: 'Example0' + (index + 1), expected, steps, test };
    }),
    questions: summary.questions.map(({ id }, index) => {
      const [question, answer] = interview[index]!;
      return { id, level: levels[index]!, question, answer };
    })
  };
});
