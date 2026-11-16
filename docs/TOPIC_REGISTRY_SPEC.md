# Topic registry specification

The Phase 1 registry tracks all 494 requirements. All ten project phases are approved. Phase 3 has 46 topics and 145 tracked example IDs, including 27 mandatory aliases. Phase 4 has 27 Advanced React topics and 54 demos. Phase 5 has 42 topics and 112 demos, including all 10 mandatory Redux projects. Phase 6 has 46 topics and 98 demos. Phase 7 has 37 topics and 102 demos, including 13 mandatory exercises. Phase 8 has 59 topics and 139 demos, including 15 required exercises. Phase 9 has 23 approved full-stack scenarios.

## Identity and hierarchy

Eight fixed category IDs: `javascript`, `typescript`, `react`, `redux`, `node`, `express`, `mongodb`, `mern`. Their display names are JavaScript Fundamentals, TypeScript Fundamentals, React.js, Redux Toolkit, Node.js, Express.js, MongoDB + Mongoose and End-to-End MERN, in that order.

Category -> group -> concept topic -> examples is the navigation hierarchy. Group IDs are category-prefixed normalized slugs; catalog titles retain original names. Catalog IDs are stable requirement identities, separate from display titles. A concept topic uses its requirement ID as topic ID. A numbered mandatory demonstration remains an independent acceptance requirement but is attached to its parent topic as an example; it is not another sidebar topic. The End-to-End MERN scenarios form navigable scenario topics under a Full-stack Scenarios group and each has multiple examples where needed.

Canonical topic route: `/learn/:category/:topicId`; optional `example` and `q` query parameters. Validate category/topic ownership and example/topic ownership on every resolution. Use an explicit order field; do not sort alphabetically and accidentally reorder the curriculum. Add aliases for terminology and common hook spellings without creating duplicate topic IDs. Preserve repeated titles in distinct groups/modules as distinct requirements and cross-link them.

## Data contracts (design, not application source)

| Record | Required fields and constraints |
| --- | --- |
| Category | id (eight-member union), title, order, groupIds (unique existing group IDs). |
| Group | id, categoryId, title, order, topicIds (unique existing concept/scenario IDs), defaultDifficulty. |
| Topic | id, categoryId, groupId, title, description, aliases, difficulty, phase, exampleIds, requirementIds, interviewQuestionIds, status, prerequisites, content, verification. |
| Example | id, topicId, requirementIds, title, objective, runtime, difficulty, order, status, prerequisites, inputContract, implementationKey, sourceFiles, expectedOutput, observationContract, internalSteps, mistakeIds, questionIds, resetPolicy, resourceLimits, verification. |
| Concept content | what, why, whenToUse, whenToAvoid, internalWorking, references (official source links and review date). |
| Interview question | id, topicId, exampleIds, level (basic/intermediate/senior), kind (internal/output/debugging/comparison/scenario/performance/security), prompt, answer, reasoning, relatedSourceIds, status. |
| Mistake | id, topicId, exampleIds, problemSourceIds, symptom, cause, fixSourceIds, expectedCorrection, boundedReproduction, verification. |
| Source file | id, public display path, language (ts/tsx), build-loaded source text, implementation module key, source provenance/version. Never an arbitrary server path. |
| Prerequisite | kind (runtime/package/service/topology/devtools/approval), description, check method, available/unverified/unavailable state, blocked example IDs. |
| Verification | description/examples/source/behavior/questions/mistakes/tests acceptance booleans; check commands or procedures; observed results; environment/build identifier; evidence links; verifiedAt; reviewedAt and approval reference when approved. |
| Requirement | stable catalog id, module, group, title, phase, kind (concept/required-example/scenario), linked topic/example IDs, seven acceptance flags, status, evidence links, blocker details. |

`description` must be a short accurate explanation, not a generic filler string. All content can be absent while a discriminated record has NOT_STARTED status. A runnable record must include real content and an existing implementation/source key. TypeScript should distinguish planned records from implemented records; avoid empty strings, fake functions or type assertions just to satisfy a schema.

Difficulty is a union of basic/intermediate/advanced/senior. Default: fundamentals/basic language topics -> basic; arrays/browser/React hooks/TypeScript typing/Redux -> intermediate; advanced groups/async/RTK Query/Node core -> advanced; production auth, transactions, security, query optimization, performance and end-to-end integration -> senior. Explicit per-topic overrides take precedence and must be reviewed; difficulty is educational guidance, not a completion gate.

Runtime is a discriminated union:

- browser: registered React component or pure TypeScript runner and browser capability requirements.
- typecheck: positive/negative compiler fixture paths, expected diagnostics and typecheck command; no claim of browser runtime type checking.
- api: fixed HTTP method and route, bounded request schema, response schema and registered Express implementation key.
- mongodb: fixed API route and operation template, lab dataset identifier, before/after projection and required topology.
- node-worker: fixed registered experiment key, validated bounded inputs, wall-clock/output/size limits and cancellation method.
- devtools: working hook/component plus the external tool needed to observe metadata; manual evidence cannot be replaced by a fake UI value.

## Loading and source synchronization

Keep metadata small and eager for sidebar search and direct routes. A separate static implementation map uses literal, lazy imports of allowlisted examples. No user-supplied module paths or `eval`. Each example module exports the demo and source references together; the viewer consumes the same implementation files through raw build imports. Multi-file examples list their supporting hooks, slices, request clients or server handlers. Build checks detect a missing source or implementation key.

Backend example source uses a build-time public-source manifest created from explicitly approved example files. Serve those artifacts by registered source ID; reject every other request. Configuration, credentials and arbitrary filesystem reads are outside this manifest. Compare artifact provenance to the built implementation, and test a representative file pairing in each backend example family.

The app registry is authoritative for navigation and runtime capability. The checklist is the review ledger for coverage/evidence. At Phase 1, generate or validate the runtime metadata from the catalog below so IDs and titles match. Later add a small validation command that reconciles checklist requirement IDs with registry requirementIds and reports omissions, unknown IDs, duplicate links and unmet example counts. Do not maintain a second handwritten sidebar tree.

## Mandatory requirement mapping

| Catalog subsection | Owning topic / mapping rule |
| --- | --- |
| React mandatory useEffect examples (17) | Attach all to the React Hooks useEffect topic; preserve each requirement ID in its example record. |
| React mandatory useState examples (10) | Attach all to the React Hooks useState topic. |
| Redux required projects (10) | Counter/cart/filter/todo/data-fetch/loading examples attach to the relevant store/slice/thunk topic; CRUD/cache/optimistic examples attach to RTK Query topics; Redux-vs-Context attaches to the comparison topic. Cross-link rather than duplicate implementations. |
| Express mandatory examples (13) | Link to setup/routes/parameters/query/validation/middleware/authentication/authorization/errors/CRUD/pagination/rate-limits/testing topics respectively. A CRUD example can satisfy separate HTTP-method requirements only with distinct verified interactions. |
| Database mandatory demonstrations (15) | Link to CRUD/query/sort/pagination/validation/indexes/relationships/populate/aggregation/lookup/explain/transactions owners; preserve every ID even when two requirements share one implementation. |
| End-to-End MERN scenarios (23) | One navigable scenario per requirement, linked to supporting React/Express/DB topics. Include multiple meaningful behavior paths; auth and refresh need success/denial/expiration/revocation cases. |

An example may satisfy several requirements if its behavior and evidence really cover each; a requirement can link to several examples. All links must resolve and evidence is evaluated independently. Dedicated examples take precedence over a broad umbrella demo.

## Example count and Q&A policy

Ordinary topics require 2–3 meaningful examples. The checklist initially reserves two IDs per ordinary concept and one per mandatory named behavior. Those are unimplemented planning records, not placeholder components. Before implementing a topic, replace its reserved records with concrete titled behavior specifications and allocate more IDs as needed. Major topics require at least five meaningful Q&A entries; include basic, intermediate and senior reasoning and practical output/debug/scenario questions.

Minimum overrides: useState 10, useEffect 17, closures 5+, event-loop topics 5+, promises and their combinators 5+ where distinct behavior applies, middleware 5+, authentication 5+, aggregation 5+, and the core Redux store/slice/query/data-flow topics 5+. Count distinct observable behaviors rather than cosmetic variations. Required project counts do not cap teaching coverage.

Coding solutions specify input validation, edge cases, algorithm alternatives when useful, time and space complexity. TypeScript compile-time-only examples still include checked positive and negative fixtures plus an explicit explanation of erased types. Environment-dependent examples define the capability requirement and verification procedure before implementation.

## Status transitions and integrity rules

Allowed statuses: NOT_STARTED, IN_PROGRESS, READY_FOR_REVIEW, APPROVED_COMPLETE, BLOCKED. Begin with NOT_STARTED; active work moves to IN_PROGRESS. Missing dependencies can move to BLOCKED with an explicit reason. Unblocking returns to IN_PROGRESS. READY_FOR_REVIEW requires all acceptance flags and relevant checks. Only explicit user confirmation permits APPROVED_COMPLETE; record its reference. If an approved implementation changes materially, return it to IN_PROGRESS and reverify affected evidence.

Phase gates are separate from topic gates: a foundation phase can be ready with every syllabus topic still NOT_STARTED. No inference of approval from a successful test or an approved plan.

Validation must enforce:

1. Unique IDs and valid categories/groups; consistent parent references and explicit order.
2. Every catalog requirement has an owning topic or linked example; no orphan or silently omitted mandatory requirement.
3. Every example and question references existing owners and source IDs; all implemented demos have matching source and reset/cleanup behavior.
4. Planned examples have no runnable control; blocked examples expose their exact prerequisite.
5. Reviewed topics meet the example/Q&A minimum and all acceptance flags, with recorded evidence.
6. APPROVED_COMPLETE has a user approval reference; software never auto-promotes it.
7. Routes resolve safely and refuse cross-category/cross-topic IDs; search links remain canonical.
8. Backend inputs select only registered operations; output rendering uses escaped text, bounded arrays/logs and no raw HTML injection.

## Representative planned records

- Numeric IDs follow the original syllabus order. Resolve titles and owners from metadata rather than inferring meaning from sequence numbers.
- A useEffect example record links its mandatory requirement, the actual component module, exact raw source, API prerequisites when applicable, expected dependency/cleanup observations, bounded event traces and passing tests before review.
- A MongoDB transaction example links its own scenario, actual Express handler, service/model source, dedicated replica-set prerequisite, seeded before/after documents and commit/rollback evidence. Without a replica set it remains BLOCKED.

The catalog below is the complete list of original syllabus requirements; the implementation map is intentionally not created before approval.

## Complete initial registry catalog

The checklist is the acceptance ledger. This catalog is the complete planning input to the future TypeScript registry. Each row initializes description/content as pending, difficulty as the group default, status NOT_STARTED and examples from the checklist. No sidebar entry implies completion.

| ID | Category | Group | Title | Phase | Kind |
| --- | --- | --- | --- | --- | --- |
| javascript-001 | javascript | Variables and Language Fundamentals | var, let, const | 2 | concept |
| javascript-002 | javascript | Variables and Language Fundamentals | Scope | 2 | concept |
| javascript-003 | javascript | Variables and Language Fundamentals | Lexical scope | 2 | concept |
| javascript-004 | javascript | Variables and Language Fundamentals | Hoisting | 2 | concept |
| javascript-005 | javascript | Variables and Language Fundamentals | Temporal Dead Zone | 2 | concept |
| javascript-006 | javascript | Variables and Language Fundamentals | Primitive and reference values | 2 | concept |
| javascript-007 | javascript | Variables and Language Fundamentals | Type coercion | 2 | concept |
| javascript-008 | javascript | Variables and Language Fundamentals | Equality operators | 2 | concept |
| javascript-009 | javascript | Variables and Language Fundamentals | Truthy and falsy values | 2 | concept |
| javascript-010 | javascript | Variables and Language Fundamentals | Null vs undefined | 2 | concept |
| javascript-011 | javascript | Variables and Language Fundamentals | Operators | 2 | concept |
| javascript-012 | javascript | Variables and Language Fundamentals | Functions | 2 | concept |
| javascript-013 | javascript | Variables and Language Fundamentals | Function expressions | 2 | concept |
| javascript-014 | javascript | Variables and Language Fundamentals | Arrow functions | 2 | concept |
| javascript-015 | javascript | Variables and Language Fundamentals | Default parameters | 2 | concept |
| javascript-016 | javascript | Variables and Language Fundamentals | Rest and spread operators | 2 | concept |
| javascript-017 | javascript | Variables and Language Fundamentals | Destructuring | 2 | concept |
| javascript-018 | javascript | Variables and Language Fundamentals | Template literals | 2 | concept |
| javascript-019 | javascript | Variables and Language Fundamentals | Optional chaining | 2 | concept |
| javascript-020 | javascript | Variables and Language Fundamentals | Nullish coalescing | 2 | concept |
| javascript-021 | javascript | Advanced JavaScript | Closures | 2 | concept |
| javascript-022 | javascript | Advanced JavaScript | Lexical environment | 2 | concept |
| javascript-023 | javascript | Advanced JavaScript | Execution context | 2 | concept |
| javascript-024 | javascript | Advanced JavaScript | Call stack | 2 | concept |
| javascript-025 | javascript | Advanced JavaScript | this keyword | 2 | concept |
| javascript-026 | javascript | Advanced JavaScript | call, apply, bind | 2 | concept |
| javascript-027 | javascript | Advanced JavaScript | Prototype chain | 2 | concept |
| javascript-028 | javascript | Advanced JavaScript | Prototypal inheritance | 2 | concept |
| javascript-029 | javascript | Advanced JavaScript | Classes | 2 | concept |
| javascript-030 | javascript | Advanced JavaScript | Object methods | 2 | concept |
| javascript-031 | javascript | Advanced JavaScript | Shallow copy | 2 | concept |
| javascript-032 | javascript | Advanced JavaScript | Deep copy | 2 | concept |
| javascript-033 | javascript | Advanced JavaScript | Object references | 2 | concept |
| javascript-034 | javascript | Advanced JavaScript | Immutability | 2 | concept |
| javascript-035 | javascript | Advanced JavaScript | Currying | 2 | concept |
| javascript-036 | javascript | Advanced JavaScript | Higher-order functions | 2 | concept |
| javascript-037 | javascript | Advanced JavaScript | Pure functions | 2 | concept |
| javascript-038 | javascript | Advanced JavaScript | Function composition | 2 | concept |
| javascript-039 | javascript | Advanced JavaScript | Debouncing | 2 | concept |
| javascript-040 | javascript | Advanced JavaScript | Throttling | 2 | concept |
| javascript-041 | javascript | Advanced JavaScript | Memoization | 2 | concept |
| javascript-042 | javascript | Advanced JavaScript | Generators and iterators | 2 | concept |
| javascript-043 | javascript | Arrays and Objects | map | 2 | concept |
| javascript-044 | javascript | Arrays and Objects | filter | 2 | concept |
| javascript-045 | javascript | Arrays and Objects | reduce | 2 | concept |
| javascript-046 | javascript | Arrays and Objects | forEach | 2 | concept |
| javascript-047 | javascript | Arrays and Objects | find | 2 | concept |
| javascript-048 | javascript | Arrays and Objects | some | 2 | concept |
| javascript-049 | javascript | Arrays and Objects | every | 2 | concept |
| javascript-050 | javascript | Arrays and Objects | sort | 2 | concept |
| javascript-051 | javascript | Arrays and Objects | flat | 2 | concept |
| javascript-052 | javascript | Arrays and Objects | flatMap | 2 | concept |
| javascript-053 | javascript | Arrays and Objects | Object.keys | 2 | concept |
| javascript-054 | javascript | Arrays and Objects | Object.values | 2 | concept |
| javascript-055 | javascript | Arrays and Objects | Object.entries | 2 | concept |
| javascript-056 | javascript | Arrays and Objects | Map | 2 | concept |
| javascript-057 | javascript | Arrays and Objects | Set | 2 | concept |
| javascript-058 | javascript | Arrays and Objects | WeakMap | 2 | concept |
| javascript-059 | javascript | Arrays and Objects | WeakSet | 2 | concept |
| javascript-060 | javascript | Arrays and Objects | Grouping | 2 | concept |
| javascript-061 | javascript | Arrays and Objects | Array and object transformation | 2 | concept |
| javascript-062 | javascript | Asynchronous JavaScript | Synchronous vs asynchronous | 2 | concept |
| javascript-063 | javascript | Asynchronous JavaScript | Callback functions | 2 | concept |
| javascript-064 | javascript | Asynchronous JavaScript | Callback hell | 2 | concept |
| javascript-065 | javascript | Asynchronous JavaScript | Promises | 2 | concept |
| javascript-066 | javascript | Asynchronous JavaScript | Promise chaining | 2 | concept |
| javascript-067 | javascript | Asynchronous JavaScript | async/await | 2 | concept |
| javascript-068 | javascript | Asynchronous JavaScript | Promise.all | 2 | concept |
| javascript-069 | javascript | Asynchronous JavaScript | Promise.allSettled | 2 | concept |
| javascript-070 | javascript | Asynchronous JavaScript | Promise.race | 2 | concept |
| javascript-071 | javascript | Asynchronous JavaScript | Promise.any | 2 | concept |
| javascript-072 | javascript | Asynchronous JavaScript | Error handling | 2 | concept |
| javascript-073 | javascript | Asynchronous JavaScript | Event loop | 2 | concept |
| javascript-074 | javascript | Asynchronous JavaScript | Microtasks and macrotasks | 2 | concept |
| javascript-075 | javascript | Asynchronous JavaScript | setTimeout and setInterval | 2 | concept |
| javascript-076 | javascript | Asynchronous JavaScript | Queue execution order | 2 | concept |
| javascript-077 | javascript | Asynchronous JavaScript | Fetch API | 2 | concept |
| javascript-078 | javascript | Asynchronous JavaScript | AbortController | 2 | concept |
| javascript-079 | javascript | Asynchronous JavaScript | Race conditions | 2 | concept |
| javascript-080 | javascript | Asynchronous JavaScript | Concurrency basics | 2 | concept |
| javascript-081 | javascript | Browser JavaScript | DOM manipulation | 2 | concept |
| javascript-082 | javascript | Browser JavaScript | Event bubbling | 2 | concept |
| javascript-083 | javascript | Browser JavaScript | Event capturing | 2 | concept |
| javascript-084 | javascript | Browser JavaScript | Event delegation | 2 | concept |
| javascript-085 | javascript | Browser JavaScript | preventDefault | 2 | concept |
| javascript-086 | javascript | Browser JavaScript | stopPropagation | 2 | concept |
| javascript-087 | javascript | Browser JavaScript | localStorage | 2 | concept |
| javascript-088 | javascript | Browser JavaScript | sessionStorage | 2 | concept |
| javascript-089 | javascript | Browser JavaScript | Cookies | 2 | concept |
| javascript-090 | javascript | Browser JavaScript | Browser events | 2 | concept |
| javascript-091 | javascript | Browser JavaScript | Garbage collection basics | 2 | concept |
| javascript-092 | javascript | Browser JavaScript | Memory leaks | 2 | concept |
| javascript-093 | javascript | Practical Coding Problems | Reverse string | 2 | concept |
| javascript-094 | javascript | Practical Coding Problems | Palindrome | 2 | concept |
| javascript-095 | javascript | Practical Coding Problems | Factorial | 2 | concept |
| javascript-096 | javascript | Practical Coding Problems | Fibonacci | 2 | concept |
| javascript-097 | javascript | Practical Coding Problems | Prime number | 2 | concept |
| javascript-098 | javascript | Practical Coding Problems | Remove duplicates | 2 | concept |
| javascript-099 | javascript | Practical Coding Problems | Find duplicates | 2 | concept |
| javascript-100 | javascript | Practical Coding Problems | Two Sum | 2 | concept |
| javascript-101 | javascript | Practical Coding Problems | Anagram | 2 | concept |
| javascript-102 | javascript | Practical Coding Problems | Flatten arrays | 2 | concept |
| javascript-103 | javascript | Practical Coding Problems | Group objects | 2 | concept |
| javascript-104 | javascript | Practical Coding Problems | Sort objects | 2 | concept |
| javascript-105 | javascript | Practical Coding Problems | Find missing number | 2 | concept |
| javascript-106 | javascript | Practical Coding Problems | Second-largest number | 2 | concept |
| javascript-107 | javascript | Practical Coding Problems | Character frequency | 2 | concept |
| javascript-108 | javascript | Practical Coding Problems | Deep clone | 2 | concept |
| javascript-109 | javascript | Practical Coding Problems | Implement debounce | 2 | concept |
| javascript-110 | javascript | Practical Coding Problems | Implement throttle | 2 | concept |
| javascript-111 | javascript | Practical Coding Problems | Implement memoization | 2 | concept |
| javascript-112 | javascript | Practical Coding Problems | Implement Promise.all-like behavior | 2 | concept |
| javascript-113 | javascript | Practical Coding Problems | Implement map/filter/reduce | 2 | concept |
| javascript-114 | javascript | Practical Coding Problems | Output prediction using closures and event loop | 2 | concept |
| typescript-001 | typescript | Fundamentals | Basic types | 2 | concept |
| typescript-002 | typescript | Fundamentals | Type inference | 2 | concept |
| typescript-003 | typescript | Fundamentals | Interfaces | 2 | concept |
| typescript-004 | typescript | Fundamentals | Type aliases | 2 | concept |
| typescript-005 | typescript | Fundamentals | Union types | 2 | concept |
| typescript-006 | typescript | Fundamentals | Intersection types | 2 | concept |
| typescript-007 | typescript | Fundamentals | Literal types | 2 | concept |
| typescript-008 | typescript | Fundamentals | Optional properties | 2 | concept |
| typescript-009 | typescript | Fundamentals | Readonly properties | 2 | concept |
| typescript-010 | typescript | Fundamentals | Arrays and tuples | 2 | concept |
| typescript-011 | typescript | Fundamentals | Enums and enum alternatives | 2 | concept |
| typescript-012 | typescript | Fundamentals | Functions and parameter types | 2 | concept |
| typescript-013 | typescript | Fundamentals | Function overloads | 2 | concept |
| typescript-014 | typescript | Fundamentals | Generics | 2 | concept |
| typescript-015 | typescript | Fundamentals | Generic constraints | 2 | concept |
| typescript-016 | typescript | Fundamentals | keyof | 2 | concept |
| typescript-017 | typescript | Fundamentals | typeof | 2 | concept |
| typescript-018 | typescript | Fundamentals | Indexed access types | 2 | concept |
| typescript-019 | typescript | Fundamentals | Mapped types | 2 | concept |
| typescript-020 | typescript | Fundamentals | Conditional types | 2 | concept |
| typescript-021 | typescript | Fundamentals | Utility types | 2 | concept |
| typescript-022 | typescript | Fundamentals | Type guards | 2 | concept |
| typescript-023 | typescript | Fundamentals | Type narrowing | 2 | concept |
| typescript-024 | typescript | Fundamentals | Discriminated unions | 2 | concept |
| typescript-025 | typescript | Fundamentals | unknown vs any vs never | 2 | concept |
| typescript-026 | typescript | Fundamentals | Type assertions | 2 | concept |
| typescript-027 | typescript | Fundamentals | Classes and access modifiers | 2 | concept |
| typescript-028 | typescript | Fundamentals | Async types and Promise typing | 2 | concept |
| typescript-029 | typescript | Fundamentals | API response typing | 2 | concept |
| typescript-030 | typescript | Fundamentals | React component and hook typing | 2 | concept |
| typescript-031 | typescript | Fundamentals | Redux state and dispatch typing | 2 | concept |
| typescript-032 | typescript | Fundamentals | Express request/response typing | 2 | concept |
| typescript-033 | typescript | Fundamentals | Mongoose document and model typing | 2 | concept |
| typescript-034 | typescript | Fundamentals | Runtime validation vs compile-time types | 2 | concept |
| typescript-035 | typescript | Fundamentals | TypeScript configuration | 2 | concept |
| react-001 | react | Fundamentals | JSX | 3 | concept |
| react-002 | react | Fundamentals | Functional components | 3 | concept |
| react-003 | react | Fundamentals | Props | 3 | concept |
| react-004 | react | Fundamentals | Children props | 3 | concept |
| react-005 | react | Fundamentals | Fragments | 3 | concept |
| react-006 | react | Fundamentals | Conditional rendering | 3 | concept |
| react-007 | react | Fundamentals | List rendering | 3 | concept |
| react-008 | react | Fundamentals | Keys | 3 | concept |
| react-009 | react | Fundamentals | Event handling | 3 | concept |
| react-010 | react | Fundamentals | Controlled components | 3 | concept |
| react-011 | react | Fundamentals | Uncontrolled components | 3 | concept |
| react-012 | react | Fundamentals | State vs props | 3 | concept |
| react-013 | react | Fundamentals | Lifting state up | 3 | concept |
| react-014 | react | Fundamentals | Component composition | 3 | concept |
| react-015 | react | Fundamentals | Parent-child communication | 3 | concept |
| react-016 | react | Fundamentals | Child-to-parent callbacks | 3 | concept |
| react-017 | react | Fundamentals | Forms and validation | 3 | concept |
| react-018 | react | Fundamentals | Component lifecycle behavior | 3 | concept |
| react-019 | react | Fundamentals | Mounting and unmounting | 3 | concept |
| react-020 | react | Fundamentals | State preservation and resetting | 3 | concept |
| react-021 | react | Fundamentals | React rendering and reconciliation | 3 | concept |
| react-022 | react | Fundamentals | Virtual DOM concepts | 3 | concept |
| react-023 | react | Fundamentals | Event propagation | 3 | concept |
| react-024 | react | Fundamentals | Automatic batching | 3 | concept |
| react-025 | react | Fundamentals | StrictMode | 3 | concept |
| react-026 | react | Fundamentals | Accessibility basics | 3 | concept |
| react-027 | react | React Hooks | useState | 3 | concept |
| react-028 | react | React Hooks | useEffect | 3 | concept |
| react-029 | react | React Hooks | useContext | 3 | concept |
| react-030 | react | React Hooks | useReducer | 3 | concept |
| react-031 | react | React Hooks | useRef | 3 | concept |
| react-032 | react | React Hooks | useMemo | 3 | concept |
| react-033 | react | React Hooks | useCallback | 3 | concept |
| react-034 | react | React Hooks | useLayoutEffect | 3 | concept |
| react-035 | react | React Hooks | useImperativeHandle | 3 | concept |
| react-036 | react | React Hooks | useId | 3 | concept |
| react-037 | react | React Hooks | useTransition | 3 | concept |
| react-038 | react | React Hooks | useDeferredValue | 3 | concept |
| react-039 | react | React Hooks | useDebugValue | 3 | concept |
| react-040 | react | React Hooks | useSyncExternalStore | 3 | concept |
| react-041 | react | React Hooks | useInsertionEffect | 3 | concept |
| react-042 | react | React Hooks | useActionState | 3 | concept |
| react-043 | react | React Hooks | useOptimistic | 3 | concept |
| react-044 | react | React Hooks | useEffectEvent | 3 | concept |
| react-045 | react | React Hooks | React use API | 3 | concept |
| react-046 | react | React Hooks | Custom Hooks | 3 | concept |
| react-047 | react | Mandatory useEffect Examples | Effect after initial mount | 3 | required-example |
| react-048 | react | Mandatory useEffect Examples | Effect without a dependency array | 3 | required-example |
| react-049 | react | Mandatory useEffect Examples | Effect with an empty dependency array | 3 | required-example |
| react-050 | react | Mandatory useEffect Examples | Effect with specific dependencies | 3 | required-example |
| react-051 | react | Mandatory useEffect Examples | Fetching data from an API | 3 | required-example |
| react-052 | react | Mandatory useEffect Examples | Loading and error handling | 3 | required-example |
| react-053 | react | Mandatory useEffect Examples | Cleanup functions | 3 | required-example |
| react-054 | react | Mandatory useEffect Examples | Timers and intervals | 3 | required-example |
| react-055 | react | Mandatory useEffect Examples | Event listeners | 3 | required-example |
| react-056 | react | Mandatory useEffect Examples | Infinite loop scenarios | 3 | required-example |
| react-057 | react | Mandatory useEffect Examples | Stale closure scenarios | 3 | required-example |
| react-058 | react | Mandatory useEffect Examples | Race conditions | 3 | required-example |
| react-059 | react | Mandatory useEffect Examples | Request cancellation | 3 | required-example |
| react-060 | react | Mandatory useEffect Examples | StrictMode behavior | 3 | required-example |
| react-061 | react | Mandatory useEffect Examples | Fetching on search changes | 3 | required-example |
| react-062 | react | Mandatory useEffect Examples | Correct async operation inside an effect | 3 | required-example |
| react-063 | react | Mandatory useEffect Examples | Unnecessary effects and better alternatives | 3 | required-example |
| react-064 | react | Mandatory useState Examples | Counter | 3 | required-example |
| react-065 | react | Mandatory useState Examples | Functional updates | 3 | required-example |
| react-066 | react | Mandatory useState Examples | Consecutive state updates | 3 | required-example |
| react-067 | react | Mandatory useState Examples | Object updates | 3 | required-example |
| react-068 | react | Mandatory useState Examples | Array updates | 3 | required-example |
| react-069 | react | Mandatory useState Examples | Nested state updates | 3 | required-example |
| react-070 | react | Mandatory useState Examples | State batching | 3 | required-example |
| react-071 | react | Mandatory useState Examples | State vs local variables | 3 | required-example |
| react-072 | react | Mandatory useState Examples | State initialization | 3 | required-example |
| react-073 | react | Mandatory useState Examples | Stale state problems | 3 | required-example |
| react-074 | react | Advanced React | React.memo | 4 | concept |
| react-075 | react | Advanced React | Higher-order components | 4 | concept |
| react-076 | react | Advanced React | Render props | 4 | concept |
| react-077 | react | Advanced React | Context API | 4 | concept |
| react-078 | react | Advanced React | Prop drilling | 4 | concept |
| react-079 | react | Advanced React | Ref forwarding | 4 | concept |
| react-080 | react | Advanced React | React Portals | 4 | concept |
| react-081 | react | Advanced React | Error Boundaries | 4 | concept |
| react-082 | react | Advanced React | React.lazy | 4 | concept |
| react-083 | react | Advanced React | Suspense | 4 | concept |
| react-084 | react | Advanced React | Code splitting | 4 | concept |
| react-085 | react | Advanced React | React Router | 4 | concept |
| react-086 | react | Advanced React | Dynamic routes | 4 | concept |
| react-087 | react | Advanced React | Nested routes | 4 | concept |
| react-088 | react | Advanced React | Protected routes | 4 | concept |
| react-089 | react | Advanced React | useNavigate | 4 | concept |
| react-090 | react | Advanced React | useParams | 4 | concept |
| react-091 | react | Advanced React | useSearchParams | 4 | concept |
| react-092 | react | Advanced React | Performance optimization | 4 | concept |
| react-093 | react | Advanced React | React Profiler | 4 | concept |
| react-094 | react | Advanced React | Debouncing and throttling | 4 | concept |
| react-095 | react | Advanced React | Large-list virtualization | 4 | concept |
| react-096 | react | Advanced React | Component testing | 4 | concept |
| react-097 | react | Advanced React | Integration testing | 4 | concept |
| react-098 | react | Advanced React | Rendering optimization | 4 | concept |
| react-099 | react | Advanced React | useMemo vs useCallback vs React.memo | 4 | concept |
| react-100 | react | Advanced React | Context API vs Redux Toolkit | 4 | concept |
| redux-001 | redux | Redux Fundamentals | Store | 5 | concept |
| redux-002 | redux | Redux Fundamentals | Actions | 5 | concept |
| redux-003 | redux | Redux Fundamentals | Reducers | 5 | concept |
| redux-004 | redux | Redux Fundamentals | Dispatch | 5 | concept |
| redux-005 | redux | Redux Fundamentals | Selectors | 5 | concept |
| redux-006 | redux | Redux Fundamentals | useSelector | 5 | concept |
| redux-007 | redux | Redux Fundamentals | useDispatch | 5 | concept |
| redux-008 | redux | Redux Fundamentals | Redux data flow | 5 | concept |
| redux-009 | redux | Redux Fundamentals | Immutable updates | 5 | concept |
| redux-010 | redux | Redux Fundamentals | Redux vs Context API | 5 | concept |
| redux-011 | redux | Redux Toolkit | configureStore | 5 | concept |
| redux-012 | redux | Redux Toolkit | createSlice | 5 | concept |
| redux-013 | redux | Redux Toolkit | Multiple slices | 5 | concept |
| redux-014 | redux | Redux Toolkit | Action payloads | 5 | concept |
| redux-015 | redux | Redux Toolkit | Immer | 5 | concept |
| redux-016 | redux | Redux Toolkit | createAsyncThunk | 5 | concept |
| redux-017 | redux | Redux Toolkit | extraReducers | 5 | concept |
| redux-018 | redux | Redux Toolkit | Pending/fulfilled/rejected | 5 | concept |
| redux-019 | redux | Redux Toolkit | createSelector | 5 | concept |
| redux-020 | redux | Redux Toolkit | createEntityAdapter | 5 | concept |
| redux-021 | redux | Redux Toolkit | Middleware | 5 | concept |
| redux-022 | redux | Redux Toolkit | Redux DevTools | 5 | concept |
| redux-023 | redux | Redux Toolkit | Typed hooks | 5 | concept |
| redux-024 | redux | Redux Toolkit | State persistence | 5 | concept |
| redux-025 | redux | Redux Toolkit | Error handling | 5 | concept |
| redux-026 | redux | Redux Toolkit | Testing Redux | 5 | concept |
| redux-027 | redux | RTK Query | createApi | 5 | concept |
| redux-028 | redux | RTK Query | fetchBaseQuery | 5 | concept |
| redux-029 | redux | RTK Query | Query endpoints | 5 | concept |
| redux-030 | redux | RTK Query | Mutation endpoints | 5 | concept |
| redux-031 | redux | RTK Query | Cache behavior | 5 | concept |
| redux-032 | redux | RTK Query | Cache invalidation | 5 | concept |
| redux-033 | redux | RTK Query | Tags | 5 | concept |
| redux-034 | redux | RTK Query | Polling | 5 | concept |
| redux-035 | redux | RTK Query | Refetching | 5 | concept |
| redux-036 | redux | RTK Query | Optimistic updates | 5 | concept |
| redux-037 | redux | RTK Query | Undo and rollback | 5 | concept |
| redux-038 | redux | RTK Query | Pagination | 5 | concept |
| redux-039 | redux | RTK Query | Authentication | 5 | concept |
| redux-040 | redux | RTK Query | Error handling | 5 | concept |
| redux-041 | redux | RTK Query | Request deduplication | 5 | concept |
| redux-042 | redux | RTK Query | RTK Query testing | 5 | concept |
| redux-043 | redux | Mandatory Redux Projects | Counter using Redux | 5 | required-example |
| redux-044 | redux | Mandatory Redux Projects | Shopping cart | 5 | required-example |
| redux-045 | redux | Mandatory Redux Projects | Product filters | 5 | required-example |
| redux-046 | redux | Mandatory Redux Projects | Todo application | 5 | required-example |
| redux-047 | redux | Mandatory Redux Projects | Async user fetching | 5 | required-example |
| redux-048 | redux | Mandatory Redux Projects | Loading/error states | 5 | required-example |
| redux-049 | redux | Mandatory Redux Projects | CRUD using RTK Query and Express | 5 | required-example |
| redux-050 | redux | Mandatory Redux Projects | Cache invalidation | 5 | required-example |
| redux-051 | redux | Mandatory Redux Projects | Optimistic updates with rollback | 5 | required-example |
| redux-052 | redux | Mandatory Redux Projects | Redux vs Context comparison | 5 | required-example |
| node-001 | node | Fundamentals | Node.js architecture | 6 | concept |
| node-002 | node | Fundamentals | V8 engine | 6 | concept |
| node-003 | node | Fundamentals | Event loop | 6 | concept |
| node-004 | node | Fundamentals | Call stack | 6 | concept |
| node-005 | node | Fundamentals | Microtask queue | 6 | concept |
| node-006 | node | Fundamentals | Timers | 6 | concept |
| node-007 | node | Fundamentals | Nonblocking I/O | 6 | concept |
| node-008 | node | Fundamentals | CommonJS | 6 | concept |
| node-009 | node | Fundamentals | ES Modules | 6 | concept |
| node-010 | node | Fundamentals | process | 6 | concept |
| node-011 | node | Fundamentals | Environment variables | 6 | concept |
| node-012 | node | Fundamentals | Buffers | 6 | concept |
| node-013 | node | Fundamentals | Error handling | 6 | concept |
| node-014 | node | Core Modules | fs | 6 | concept |
| node-015 | node | Core Modules | path | 6 | concept |
| node-016 | node | Core Modules | http | 6 | concept |
| node-017 | node | Core Modules | events | 6 | concept |
| node-018 | node | Core Modules | streams | 6 | concept |
| node-019 | node | Core Modules | crypto | 6 | concept |
| node-020 | node | Core Modules | url | 6 | concept |
| node-021 | node | Core Modules | os | 6 | concept |
| node-022 | node | Core Modules | child_process | 6 | concept |
| node-023 | node | Core Modules | worker_threads | 6 | concept |
| node-024 | node | Advanced Concepts | Callback vs Promise vs async/await | 6 | concept |
| node-025 | node | Advanced Concepts | EventEmitter | 6 | concept |
| node-026 | node | Advanced Concepts | Readable streams | 6 | concept |
| node-027 | node | Advanced Concepts | Writable streams | 6 | concept |
| node-028 | node | Advanced Concepts | Transform streams | 6 | concept |
| node-029 | node | Advanced Concepts | Backpressure | 6 | concept |
| node-030 | node | Advanced Concepts | File operations | 6 | concept |
| node-031 | node | Advanced Concepts | Large file processing | 6 | concept |
| node-032 | node | Advanced Concepts | Memory leaks | 6 | concept |
| node-033 | node | Advanced Concepts | Garbage collection | 6 | concept |
| node-034 | node | Advanced Concepts | CPU-intensive operations | 6 | concept |
| node-035 | node | Advanced Concepts | Worker Threads | 6 | concept |
| node-036 | node | Advanced Concepts | Child processes | 6 | concept |
| node-037 | node | Advanced Concepts | Clustering concepts | 6 | concept |
| node-038 | node | Advanced Concepts | Logging | 6 | concept |
| node-039 | node | Advanced Concepts | Caching | 6 | concept |
| node-040 | node | Advanced Concepts | WebSockets | 6 | concept |
| node-041 | node | Advanced Concepts | Graceful shutdown | 6 | concept |
| node-042 | node | Advanced Concepts | Error handling | 6 | concept |
| node-043 | node | Advanced Concepts | Environment configuration | 6 | concept |
| node-044 | node | Advanced Concepts | Security | 6 | concept |
| node-045 | node | Advanced Concepts | Testing | 6 | concept |
| node-046 | node | Advanced Concepts | Performance optimization | 6 | concept |
| express-001 | express | Fundamentals | Express setup | 7 | concept |
| express-002 | express | Fundamentals | GET | 7 | concept |
| express-003 | express | Fundamentals | POST | 7 | concept |
| express-004 | express | Fundamentals | PUT | 7 | concept |
| express-005 | express | Fundamentals | PATCH | 7 | concept |
| express-006 | express | Fundamentals | DELETE | 7 | concept |
| express-007 | express | Fundamentals | Request parameters | 7 | concept |
| express-008 | express | Fundamentals | Query parameters | 7 | concept |
| express-009 | express | Fundamentals | Request body | 7 | concept |
| express-010 | express | Fundamentals | HTTP status codes | 7 | concept |
| express-011 | express | Fundamentals | Express Router | 7 | concept |
| express-012 | express | Fundamentals | Middleware | 7 | concept |
| express-013 | express | Fundamentals | next() | 7 | concept |
| express-014 | express | Fundamentals | Request-response lifecycle | 7 | concept |
| express-015 | express | Advanced | Custom middleware | 7 | concept |
| express-016 | express | Advanced | Built-in middleware | 7 | concept |
| express-017 | express | Advanced | Error-handling middleware | 7 | concept |
| express-018 | express | Advanced | Async error handling | 7 | concept |
| express-019 | express | Advanced | Centralized error handling | 7 | concept |
| express-020 | express | Advanced | REST API architecture | 7 | concept |
| express-021 | express | Advanced | API versioning | 7 | concept |
| express-022 | express | Advanced | Authentication middleware | 7 | concept |
| express-023 | express | Advanced | Authorization | 7 | concept |
| express-024 | express | Advanced | Role-based access control | 7 | concept |
| express-025 | express | Advanced | Input validation | 7 | concept |
| express-026 | express | Advanced | CORS | 7 | concept |
| express-027 | express | Advanced | Security headers | 7 | concept |
| express-028 | express | Advanced | Rate limiting | 7 | concept |
| express-029 | express | Advanced | Cookies | 7 | concept |
| express-030 | express | Advanced | Sessions | 7 | concept |
| express-031 | express | Advanced | File uploads | 7 | concept |
| express-032 | express | Advanced | Pagination | 7 | concept |
| express-033 | express | Advanced | Filtering | 7 | concept |
| express-034 | express | Advanced | Sorting | 7 | concept |
| express-035 | express | Advanced | Logging | 7 | concept |
| express-036 | express | Advanced | API testing | 7 | concept |
| express-037 | express | Advanced | Production error handling | 7 | concept |
| express-038 | express | Mandatory Express Examples | Create a server | 7 | required-example |
| express-039 | express | Mandatory Express Examples | Route handling | 7 | required-example |
| express-040 | express | Mandatory Express Examples | Dynamic route parameters | 7 | required-example |
| express-041 | express | Mandatory Express Examples | Query string handling | 7 | required-example |
| express-042 | express | Mandatory Express Examples | Request body validation | 7 | required-example |
| express-043 | express | Mandatory Express Examples | Custom middleware execution order | 7 | required-example |
| express-044 | express | Mandatory Express Examples | Authentication middleware | 7 | required-example |
| express-045 | express | Mandatory Express Examples | Authorization middleware | 7 | required-example |
| express-046 | express | Mandatory Express Examples | Centralized error handling | 7 | required-example |
| express-047 | express | Mandatory Express Examples | Full CRUD REST API | 7 | required-example |
| express-048 | express | Mandatory Express Examples | Pagination and filtering | 7 | required-example |
| express-049 | express | Mandatory Express Examples | Rate limiting | 7 | required-example |
| express-050 | express | Mandatory Express Examples | API tests | 7 | required-example |
| mongodb-001 | mongodb | MongoDB Fundamentals | Databases | 8 | concept |
| mongodb-002 | mongodb | MongoDB Fundamentals | Collections | 8 | concept |
| mongodb-003 | mongodb | MongoDB Fundamentals | Documents | 8 | concept |
| mongodb-004 | mongodb | MongoDB Fundamentals | BSON | 8 | concept |
| mongodb-005 | mongodb | MongoDB Fundamentals | ObjectId | 8 | concept |
| mongodb-006 | mongodb | MongoDB Fundamentals | CRUD operations | 8 | concept |
| mongodb-007 | mongodb | MongoDB Fundamentals | find | 8 | concept |
| mongodb-008 | mongodb | MongoDB Fundamentals | findOne | 8 | concept |
| mongodb-009 | mongodb | MongoDB Fundamentals | insertOne | 8 | concept |
| mongodb-010 | mongodb | MongoDB Fundamentals | insertMany | 8 | concept |
| mongodb-011 | mongodb | MongoDB Fundamentals | updateOne | 8 | concept |
| mongodb-012 | mongodb | MongoDB Fundamentals | updateMany | 8 | concept |
| mongodb-013 | mongodb | MongoDB Fundamentals | deleteOne | 8 | concept |
| mongodb-014 | mongodb | MongoDB Fundamentals | deleteMany | 8 | concept |
| mongodb-015 | mongodb | MongoDB Fundamentals | Query operators | 8 | concept |
| mongodb-016 | mongodb | MongoDB Fundamentals | Logical operators | 8 | concept |
| mongodb-017 | mongodb | MongoDB Fundamentals | Comparison operators | 8 | concept |
| mongodb-018 | mongodb | MongoDB Fundamentals | Projection | 8 | concept |
| mongodb-019 | mongodb | MongoDB Fundamentals | Sorting | 8 | concept |
| mongodb-020 | mongodb | MongoDB Fundamentals | skip and limit | 8 | concept |
| mongodb-021 | mongodb | MongoDB Fundamentals | Pagination | 8 | concept |
| mongodb-022 | mongodb | MongoDB Advanced | Embedded documents | 8 | concept |
| mongodb-023 | mongodb | MongoDB Advanced | References | 8 | concept |
| mongodb-024 | mongodb | MongoDB Advanced | Data modeling | 8 | concept |
| mongodb-025 | mongodb | MongoDB Advanced | Indexes | 8 | concept |
| mongodb-026 | mongodb | MongoDB Advanced | Unique indexes | 8 | concept |
| mongodb-027 | mongodb | MongoDB Advanced | Compound indexes | 8 | concept |
| mongodb-028 | mongodb | MongoDB Advanced | Query optimization | 8 | concept |
| mongodb-029 | mongodb | MongoDB Advanced | explain() | 8 | concept |
| mongodb-030 | mongodb | MongoDB Advanced | Aggregation pipeline | 8 | concept |
| mongodb-031 | mongodb | MongoDB Advanced | $match | 8 | concept |
| mongodb-032 | mongodb | MongoDB Advanced | $group | 8 | concept |
| mongodb-033 | mongodb | MongoDB Advanced | $project | 8 | concept |
| mongodb-034 | mongodb | MongoDB Advanced | $lookup | 8 | concept |
| mongodb-035 | mongodb | MongoDB Advanced | $unwind | 8 | concept |
| mongodb-036 | mongodb | MongoDB Advanced | $sort | 8 | concept |
| mongodb-037 | mongodb | MongoDB Advanced | $facet | 8 | concept |
| mongodb-038 | mongodb | MongoDB Advanced | Transactions | 8 | concept |
| mongodb-039 | mongodb | MongoDB Advanced | Array operators | 8 | concept |
| mongodb-040 | mongodb | MongoDB Advanced | Text search | 8 | concept |
| mongodb-041 | mongodb | MongoDB Advanced | TTL indexes | 8 | concept |
| mongodb-042 | mongodb | MongoDB Advanced | Connection pooling | 8 | concept |
| mongodb-043 | mongodb | Mongoose | Connection | 8 | concept |
| mongodb-044 | mongodb | Mongoose | Schema | 8 | concept |
| mongodb-045 | mongodb | Mongoose | Model | 8 | concept |
| mongodb-046 | mongodb | Mongoose | Field validation | 8 | concept |
| mongodb-047 | mongodb | Mongoose | Required fields | 8 | concept |
| mongodb-048 | mongodb | Mongoose | Defaults | 8 | concept |
| mongodb-049 | mongodb | Mongoose | Schema types | 8 | concept |
| mongodb-050 | mongodb | Mongoose | Timestamps | 8 | concept |
| mongodb-051 | mongodb | Mongoose | Middleware/hooks | 8 | concept |
| mongodb-052 | mongodb | Mongoose | populate() | 8 | concept |
| mongodb-053 | mongodb | Mongoose | Virtuals | 8 | concept |
| mongodb-054 | mongodb | Mongoose | Instance methods | 8 | concept |
| mongodb-055 | mongodb | Mongoose | Static methods | 8 | concept |
| mongodb-056 | mongodb | Mongoose | lean() | 8 | concept |
| mongodb-057 | mongodb | Mongoose | Indexes | 8 | concept |
| mongodb-058 | mongodb | Mongoose | Transactions | 8 | concept |
| mongodb-059 | mongodb | Mongoose | Error handling | 8 | concept |
| mongodb-060 | mongodb | Mandatory Database Demonstrations | Insert documents | 8 | required-example |
| mongodb-061 | mongodb | Mandatory Database Demonstrations | Find documents | 8 | required-example |
| mongodb-062 | mongodb | Mandatory Database Demonstrations | Update documents | 8 | required-example |
| mongodb-063 | mongodb | Mandatory Database Demonstrations | Delete documents | 8 | required-example |
| mongodb-064 | mongodb | Mandatory Database Demonstrations | Filter records | 8 | required-example |
| mongodb-065 | mongodb | Mandatory Database Demonstrations | Sort records | 8 | required-example |
| mongodb-066 | mongodb | Mandatory Database Demonstrations | Paginate records | 8 | required-example |
| mongodb-067 | mongodb | Mandatory Database Demonstrations | Schema validation | 8 | required-example |
| mongodb-068 | mongodb | Mandatory Database Demonstrations | Unique constraint errors | 8 | required-example |
| mongodb-069 | mongodb | Mandatory Database Demonstrations | One-to-many relationships | 8 | required-example |
| mongodb-070 | mongodb | Mandatory Database Demonstrations | populate() | 8 | required-example |
| mongodb-071 | mongodb | Mandatory Database Demonstrations | Aggregation and grouping | 8 | required-example |
| mongodb-072 | mongodb | Mandatory Database Demonstrations | Lookup/join | 8 | required-example |
| mongodb-073 | mongodb | Mandatory Database Demonstrations | Index behavior and query plans | 8 | required-example |
| mongodb-074 | mongodb | Mandatory Database Demonstrations | Transactions | 8 | required-example |
| mern-001 | mern | Fundamentals | React form calling Express | 9 | required-example |
| mern-002 | mern | Fundamentals | Express reading/writing MongoDB | 9 | required-example |
| mern-003 | mern | Fundamentals | Full CRUD application | 9 | required-example |
| mern-004 | mern | Fundamentals | Registration | 9 | required-example |
| mern-005 | mern | Fundamentals | Login | 9 | required-example |
| mern-006 | mern | Fundamentals | Password hashing | 9 | required-example |
| mern-007 | mern | Fundamentals | JWT authentication | 9 | required-example |
| mern-008 | mern | Fundamentals | Access and refresh token flows | 9 | required-example |
| mern-009 | mern | Fundamentals | Protected routes | 9 | required-example |
| mern-010 | mern | Fundamentals | Backend role-based authorization | 9 | required-example |
| mern-011 | mern | Fundamentals | RTK Query integration | 9 | required-example |
| mern-012 | mern | Fundamentals | Search | 9 | required-example |
| mern-013 | mern | Fundamentals | Sorting | 9 | required-example |
| mern-014 | mern | Fundamentals | Pagination | 9 | required-example |
| mern-015 | mern | Fundamentals | Form validation | 9 | required-example |
| mern-016 | mern | Fundamentals | File uploads | 9 | required-example |
| mern-017 | mern | Fundamentals | Optimistic updates | 9 | required-example |
| mern-018 | mern | Fundamentals | Error handling | 9 | required-example |
| mern-019 | mern | Fundamentals | Loading states | 9 | required-example |
| mern-020 | mern | Fundamentals | API testing | 9 | required-example |
| mern-021 | mern | Fundamentals | React integration testing | 9 | required-example |
| mern-022 | mern | Fundamentals | Environment configuration | 9 | required-example |
| mern-023 | mern | Fundamentals | Production build and deployment walkthrough | 9 | required-example |

## Phase 3 alias contract

react-047.e01 through react-063.e01 resolve to useEffect examples react-028.e01 through e17. react-064.e01 through react-073.e01 resolve to useState examples react-027.e01 through e10. Canonical menus show each implementation once; mandatory deep links retain their original IDs and resolve to the same component/source. The 27 alias records are not counted as additional implementations.

## Editable-source view contract

Each implemented canonical example now resolves a SnippetDefinition from its actual lesson source. Mandatory aliases reuse the canonical editor. Future placeholders do not create fake snippets. Focused runtime functions and their required imports/helpers are editable; compiler fixtures are checked with the actual declaration graph. Original demos/source and interview questions remain separate reference material. Edits are ephemeral per selected example; no new topic approval is inferred. See EDITABLE_SNIPPETS.md.
