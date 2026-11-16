type ExampleSummary = { id: string; title: string; aliases: string[] };

const introductions: [string, string, string, string][] = [
  ["074", "React.memo can skip a child render when its props retain their identities.", "Stable primitive props", "Fresh object props"],
  ["075", "A higher-order component wraps a component to reuse behavior or inject props.", "Access wrapper", "Injected counter behavior"],
  ["076", "A render prop lets a caller choose the UI for state owned by another component.", "Named render function", "Function as children"],
  ["077", "Context reads the nearest provider value without forwarding props through every layer.", "Deep theme consumer", "Closest provider wins"],
  ["078", "Prop drilling passes data through components that only forward it.", "Forward through a layout", "Compose through a slot"],
  ["079", "Ref forwarding gives a parent imperative access to a child DOM node or a limited handle.", "Forward a DOM ref", "Expose a restricted handle"],
  ["080", "A portal changes where DOM nodes mount while preserving their React ancestry.", "Mount into another target", "Context and event bubbling"],
  ["081", "An error boundary replaces a failed descendant tree with fallback UI.", "Contain a render failure", "Recover by remounting"],
  ["082", "React.lazy defers requesting a component until React first tries to render it.", "Lazy default export", "Adapt a named export"],
  ["083", "Suspense coordinates fallback and reveal for descendants that suspend during render.", "Reveal after a fallback", "Keep prior content during a transition"],
  ["084", "Code splitting moves optional work into separately loadable modules.", "Split an optional screen", "Split a non-UI utility"],
  ["085", "React Router maps locations to UI and provides accessible navigation links.", "Navigate with links", "Handle unmatched paths"],
  ["086", "A dynamic segment matches many concrete URLs using a named placeholder.", "Look up a product by SKU", "Static route ranking"],
  ["087", "Nested routes compose persistent layout UI with a child rendered at an Outlet.", "Layout and index child", "Pass outlet context"],
  ["088", "Protected routes guide the UI based on a session or role.", "Redirect and resume", "Show a role-specific gate"],
  ["089", "useNavigate changes the route after an imperative event or outcome.", "Navigate after form submission", "Replace and go back"],
  ["090", "useParams returns the dynamic values matched by the current route branch.", "Validate an order identifier", "Read inherited route params"],
  ["091", "useSearchParams reads and updates URL query state.", "Preserve other query keys", "Store repeated tags"],
  ["092", "Performance optimization begins with measured work and a clear interaction target.", "Defer a derived result", "Precompute invariant data"],
  ["093", "Profiler observes commits of a named React subtree and reports timings in profiling-enabled builds.", "Record a subtree update", "Compare separate profilers"],
  ["094", "Debouncing waits for a quiet period and throttling limits how often work begins.", "Debounce a search value", "Throttle an event burst"],
  ["095", "Virtualization mounts rows near the scroll viewport while preserving the full scroll range.", "Mount the visible window", "Add overscan"],
  ["096", "A component test exercises one rendered component and asserts its observable behavior.", "Check a rendered click", "Check invalid input"],
  ["097", "An integration check exercises the contract between cooperating pieces such as UI and API.", "Check filtered server data", "Check an HTTP failure"],
  ["098", "Rendering optimization reduces unnecessary tree work through state placement and stable inputs.", "Isolate state in its owner", "Compare plain and memo children"],
  ["099", "useMemo caches a value, useCallback caches a function identity, and memo can skip a component render.", "Cache a calculated object", "Preserve a callback identity"],
  ["100", "Context distributes a provider value. Redux Toolkit provides a store, actions, reducers, and selective subscriptions.", "Read scoped Context settings", "Dispatch to a Redux Toolkit slice"],
];

export const advancedSummary = introductions.map(([number, description, first, second]) => {
  const id = 'react-' + number;
  const examples: ExampleSummary[] = [first, second].map((title, index) => ({
    id: id + '.e0' + (index + 1), title, aliases: []
  }));
  const questions = Array.from({ length: 6 }, (_, index) => ({ id: id + '.q0' + (index + 1) }));
  return { id, description, examples, questions };
});
