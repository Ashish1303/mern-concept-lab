# Topic checklist

Updated 2026-11-15. All ten phases are explicitly approved, and the MERN Concept Lab is complete. Phase 9 implements all 23 End-to-End MERN scenarios. See [Phase 9 coverage](PHASE_9_COVERAGE.md).

[Phase 10 final review](PHASE_10_REVIEW.md) records the project-wide verification.

Every syllabus bullet and every numbered mandatory demonstration has its own requirement ID. The Phase 2 per-example ledger is in [PHASE_2_COVERAGE.md](PHASE_2_COVERAGE.md). Repeated concepts in different modules retain separate rows because their runtime and learning outcomes differ. These IDs remain stable after approval; titles and routes may change without changing identity.

Editable snippets cover 979 views, including two foundation checks. See [Phase 9](PHASE_9_COVERAGE.md) for the end-to-end editor workflow.

## Status and acceptance rules

- NOT_STARTED: no implementation evidence.
- IN_PROGRESS: active implementation; at least one acceptance item is unfinished.
- READY_FOR_REVIEW: all acceptance items pass and evidence is linked; awaits user review.
- APPROVED_COMPLETE: only after explicit user confirmation.
- BLOCKED: record dependency, affected example, and next action; do not substitute a simulation.

Column legend: D = description including what/why/when/avoid; P = runnable practical examples; S = exact TypeScript source; V = real behavior verified; Q = interview questions and answers; M = problematic and corrected examples; T = relevant tests passing. All boxes start unchecked. Each row has an independent review status.

Every ordinary concept requires at least 2–3 meaningful examples. Major concepts require at least five meaningful Q&A entries covering basic, intermediate, senior, output/scenario and debugging reasoning. Important behavioral topics require 5–10+ distinct examples; useState requires all 10 listed examples and useEffect all 17. Mandatory demonstration rows are acceptance requirements, not additional topics; link them to a parent example without deleting rows.

Before each topic starts, expand it into named example records using the template below. The initial two planned records for each ordinary topic are independently tracked in the final section. This keeps unimplemented work visible without inventing hundreds of generic demos.

| Example ID | Concrete behavior and controlled input | Expected observation | Actual result / evidence | Runtime | Source path | Tests | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| topic-id.e01 | Define before implementation | Define before implementation | Unverified | browser / typecheck / API / MongoDB | Pending | Pending | NOT_STARTED |

## Syllabus requirements

### javascript — Variables and Language Fundamentals

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| javascript-001 | var, let, const | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-002 | Scope | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-003 | Lexical scope | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-004 | Hoisting | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-005 | Temporal Dead Zone | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-006 | Primitive and reference values | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-007 | Type coercion | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-008 | Equality operators | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-009 | Truthy and falsy values | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-010 | Null vs undefined | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-011 | Operators | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-012 | Functions | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-013 | Function expressions | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-014 | Arrow functions | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-015 | Default parameters | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-016 | Rest and spread operators | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-017 | Destructuring | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-018 | Template literals | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-019 | Optional chaining | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-020 | Nullish coalescing | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### javascript — Advanced JavaScript

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| javascript-021 | Closures | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-022 | Lexical environment | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-023 | Execution context | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-024 | Call stack | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-025 | this keyword | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-026 | call, apply, bind | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-027 | Prototype chain | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-028 | Prototypal inheritance | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-029 | Classes | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-030 | Object methods | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-031 | Shallow copy | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-032 | Deep copy | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-033 | Object references | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-034 | Immutability | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-035 | Currying | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-036 | Higher-order functions | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-037 | Pure functions | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-038 | Function composition | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-039 | Debouncing | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-040 | Throttling | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-041 | Memoization | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-042 | Generators and iterators | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### javascript — Arrays and Objects

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| javascript-043 | map | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-044 | filter | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-045 | reduce | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-046 | forEach | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-047 | find | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-048 | some | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-049 | every | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-050 | sort | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-051 | flat | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-052 | flatMap | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-053 | Object.keys | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-054 | Object.values | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-055 | Object.entries | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-056 | Map | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-057 | Set | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-058 | WeakMap | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-059 | WeakSet | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-060 | Grouping | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-061 | Array and object transformation | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### javascript — Asynchronous JavaScript

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| javascript-062 | Synchronous vs asynchronous | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-063 | Callback functions | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-064 | Callback hell | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-065 | Promises | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-066 | Promise chaining | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-067 | async/await | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-068 | Promise.all | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-069 | Promise.allSettled | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-070 | Promise.race | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-071 | Promise.any | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-072 | Error handling | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-073 | Event loop | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-074 | Microtasks and macrotasks | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-075 | setTimeout and setInterval | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-076 | Queue execution order | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-077 | Fetch API | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-078 | AbortController | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-079 | Race conditions | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-080 | Concurrency basics | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### javascript — Browser JavaScript

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| javascript-081 | DOM manipulation | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-082 | Event bubbling | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-083 | Event capturing | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-084 | Event delegation | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-085 | preventDefault | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-086 | stopPropagation | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-087 | localStorage | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-088 | sessionStorage | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-089 | Cookies | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-090 | Browser events | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-091 | Garbage collection basics | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-092 | Memory leaks | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### javascript — Practical Coding Problems

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| javascript-093 | Reverse string | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-094 | Palindrome | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-095 | Factorial | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-096 | Fibonacci | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-097 | Prime number | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-098 | Remove duplicates | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-099 | Find duplicates | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-100 | Two Sum | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-101 | Anagram | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-102 | Flatten arrays | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-103 | Group objects | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-104 | Sort objects | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-105 | Find missing number | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-106 | Second-largest number | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-107 | Character frequency | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-108 | Deep clone | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-109 | Implement debounce | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-110 | Implement throttle | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-111 | Implement memoization | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-112 | Implement Promise.all-like behavior | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-113 | Implement map/filter/reduce | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| javascript-114 | Output prediction using closures and event loop | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### typescript — Fundamentals

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| typescript-001 | Basic types | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-002 | Type inference | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-003 | Interfaces | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-004 | Type aliases | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-005 | Union types | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-006 | Intersection types | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-007 | Literal types | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-008 | Optional properties | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-009 | Readonly properties | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-010 | Arrays and tuples | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-011 | Enums and enum alternatives | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-012 | Functions and parameter types | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-013 | Function overloads | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-014 | Generics | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-015 | Generic constraints | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-016 | keyof | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-017 | typeof | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-018 | Indexed access types | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-019 | Mapped types | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-020 | Conditional types | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-021 | Utility types | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-022 | Type guards | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-023 | Type narrowing | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-024 | Discriminated unions | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-025 | unknown vs any vs never | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-026 | Type assertions | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-027 | Classes and access modifiers | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-028 | Async types and Promise typing | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-029 | API response typing | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-030 | React component and hook typing | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-031 | Redux state and dispatch typing | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-032 | Express request/response typing | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-033 | Mongoose document and model typing | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-034 | Runtime validation vs compile-time types | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| typescript-035 | TypeScript configuration | 2 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### react — Fundamentals

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| react-001 | JSX | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-002 | Functional components | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-003 | Props | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-004 | Children props | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-005 | Fragments | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-006 | Conditional rendering | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-007 | List rendering | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-008 | Keys | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-009 | Event handling | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-010 | Controlled components | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-011 | Uncontrolled components | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-012 | State vs props | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-013 | Lifting state up | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-014 | Component composition | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-015 | Parent-child communication | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-016 | Child-to-parent callbacks | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-017 | Forms and validation | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-018 | Component lifecycle behavior | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-019 | Mounting and unmounting | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-020 | State preservation and resetting | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-021 | React rendering and reconciliation | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-022 | Virtual DOM concepts | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-023 | Event propagation | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-024 | Automatic batching | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-025 | StrictMode | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-026 | Accessibility basics | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### react — React Hooks

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| react-027 | useState | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-028 | useEffect | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-029 | useContext | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-030 | useReducer | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-031 | useRef | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-032 | useMemo | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-033 | useCallback | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-034 | useLayoutEffect | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-035 | useImperativeHandle | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-036 | useId | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-037 | useTransition | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-038 | useDeferredValue | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-039 | useDebugValue | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-040 | useSyncExternalStore | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-041 | useInsertionEffect | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-042 | useActionState | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-043 | useOptimistic | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-044 | useEffectEvent | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-045 | React use API | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-046 | Custom Hooks | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### react — Mandatory useEffect Examples

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| react-047 | Effect after initial mount | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-048 | Effect without a dependency array | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-049 | Effect with an empty dependency array | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-050 | Effect with specific dependencies | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-051 | Fetching data from an API | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-052 | Loading and error handling | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-053 | Cleanup functions | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-054 | Timers and intervals | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-055 | Event listeners | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-056 | Infinite loop scenarios | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-057 | Stale closure scenarios | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-058 | Race conditions | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-059 | Request cancellation | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-060 | StrictMode behavior | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-061 | Fetching on search changes | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-062 | Correct async operation inside an effect | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-063 | Unnecessary effects and better alternatives | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### react — Mandatory useState Examples

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| react-064 | Counter | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-065 | Functional updates | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-066 | Consecutive state updates | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-067 | Object updates | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-068 | Array updates | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-069 | Nested state updates | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-070 | State batching | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-071 | State vs local variables | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-072 | State initialization | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-073 | Stale state problems | 3 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### react — Advanced React

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| react-074 | React.memo | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-075 | Higher-order components | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-076 | Render props | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-077 | Context API | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-078 | Prop drilling | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-079 | Ref forwarding | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-080 | React Portals | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-081 | Error Boundaries | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-082 | React.lazy | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-083 | Suspense | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-084 | Code splitting | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-085 | React Router | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-086 | Dynamic routes | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-087 | Nested routes | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-088 | Protected routes | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-089 | useNavigate | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-090 | useParams | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-091 | useSearchParams | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-092 | Performance optimization | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-093 | React Profiler | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-094 | Debouncing and throttling | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-095 | Large-list virtualization | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-096 | Component testing | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-097 | Integration testing | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-098 | Rendering optimization | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-099 | useMemo vs useCallback vs React.memo | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| react-100 | Context API vs Redux Toolkit | 4 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### redux — Redux Fundamentals

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| redux-001 | Store | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-002 | Actions | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-003 | Reducers | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-004 | Dispatch | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-005 | Selectors | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-006 | useSelector | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-007 | useDispatch | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-008 | Redux data flow | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-009 | Immutable updates | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-010 | Redux vs Context API | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### redux — Redux Toolkit

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| redux-011 | configureStore | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-012 | createSlice | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-013 | Multiple slices | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-014 | Action payloads | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-015 | Immer | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-016 | createAsyncThunk | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-017 | extraReducers | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-018 | Pending/fulfilled/rejected | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-019 | createSelector | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-020 | createEntityAdapter | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-021 | Middleware | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-022 | Redux DevTools | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-023 | Typed hooks | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-024 | State persistence | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-025 | Error handling | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-026 | Testing Redux | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### redux — RTK Query

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| redux-027 | createApi | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-028 | fetchBaseQuery | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-029 | Query endpoints | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-030 | Mutation endpoints | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-031 | Cache behavior | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-032 | Cache invalidation | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-033 | Tags | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-034 | Polling | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-035 | Refetching | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-036 | Optimistic updates | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-037 | Undo and rollback | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-038 | Pagination | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-039 | Authentication | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-040 | Error handling | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-041 | Request deduplication | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-042 | RTK Query testing | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### redux — Mandatory Redux Projects

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| redux-043 | Counter using Redux | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-044 | Shopping cart | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-045 | Product filters | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-046 | Todo application | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-047 | Async user fetching | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-048 | Loading/error states | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-049 | CRUD using RTK Query and Express | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-050 | Cache invalidation | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-051 | Optimistic updates with rollback | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| redux-052 | Redux vs Context comparison | 5 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### node — Fundamentals

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| node-001 | Node.js architecture | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-002 | V8 engine | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-003 | Event loop | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-004 | Call stack | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-005 | Microtask queue | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-006 | Timers | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-007 | Nonblocking I/O | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-008 | CommonJS | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-009 | ES Modules | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-010 | process | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-011 | Environment variables | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-012 | Buffers | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-013 | Error handling | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### node — Core Modules

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| node-014 | fs | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-015 | path | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-016 | http | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-017 | events | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-018 | streams | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-019 | crypto | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-020 | url | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-021 | os | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-022 | child_process | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-023 | worker_threads | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### node — Advanced Concepts

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| node-024 | Callback vs Promise vs async/await | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-025 | EventEmitter | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-026 | Readable streams | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-027 | Writable streams | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-028 | Transform streams | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-029 | Backpressure | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-030 | File operations | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-031 | Large file processing | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-032 | Memory leaks | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-033 | Garbage collection | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-034 | CPU-intensive operations | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-035 | Worker Threads | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-036 | Child processes | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-037 | Clustering concepts | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-038 | Logging | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-039 | Caching | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-040 | WebSockets | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-041 | Graceful shutdown | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-042 | Error handling | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-043 | Environment configuration | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-044 | Security | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-045 | Testing | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| node-046 | Performance optimization | 6 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### express — Fundamentals

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| express-001 | Express setup | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-002 | GET | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-003 | POST | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-004 | PUT | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-005 | PATCH | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-006 | DELETE | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-007 | Request parameters | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-008 | Query parameters | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-009 | Request body | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-010 | HTTP status codes | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-011 | Express Router | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-012 | Middleware | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-013 | next() | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-014 | Request-response lifecycle | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### express — Advanced

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| express-015 | Custom middleware | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-016 | Built-in middleware | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-017 | Error-handling middleware | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-018 | Async error handling | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-019 | Centralized error handling | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-020 | REST API architecture | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-021 | API versioning | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-022 | Authentication middleware | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-023 | Authorization | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-024 | Role-based access control | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-025 | Input validation | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-026 | CORS | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-027 | Security headers | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-028 | Rate limiting | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-029 | Cookies | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-030 | Sessions | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-031 | File uploads | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-032 | Pagination | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-033 | Filtering | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-034 | Sorting | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-035 | Logging | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-036 | API testing | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-037 | Production error handling | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### express — Mandatory Express Examples

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| express-038 | Create a server | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-039 | Route handling | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-040 | Dynamic route parameters | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-041 | Query string handling | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-042 | Request body validation | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-043 | Custom middleware execution order | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-044 | Authentication middleware | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-045 | Authorization middleware | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-046 | Centralized error handling | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-047 | Full CRUD REST API | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-048 | Pagination and filtering | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-049 | Rate limiting | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| express-050 | API tests | 7 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### mongodb — MongoDB Fundamentals

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mongodb-001 | Databases | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-002 | Collections | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-003 | Documents | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-004 | BSON | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-005 | ObjectId | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-006 | CRUD operations | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-007 | find | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-008 | findOne | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-009 | insertOne | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-010 | insertMany | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-011 | updateOne | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-012 | updateMany | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-013 | deleteOne | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-014 | deleteMany | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-015 | Query operators | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-016 | Logical operators | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-017 | Comparison operators | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-018 | Projection | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-019 | Sorting | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-020 | skip and limit | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-021 | Pagination | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### mongodb — MongoDB Advanced

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mongodb-022 | Embedded documents | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-023 | References | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-024 | Data modeling | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-025 | Indexes | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-026 | Unique indexes | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-027 | Compound indexes | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-028 | Query optimization | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-029 | explain() | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-030 | Aggregation pipeline | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-031 | $match | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-032 | $group | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-033 | $project | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-034 | $lookup | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-035 | $unwind | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-036 | $sort | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-037 | $facet | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-038 | Transactions | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-039 | Array operators | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-040 | Text search | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-041 | TTL indexes | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-042 | Connection pooling | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### mongodb — Mongoose

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mongodb-043 | Connection | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-044 | Schema | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-045 | Model | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-046 | Field validation | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-047 | Required fields | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-048 | Defaults | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-049 | Schema types | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-050 | Timestamps | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-051 | Middleware/hooks | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-052 | populate() | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-053 | Virtuals | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-054 | Instance methods | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-055 | Static methods | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-056 | lean() | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-057 | Indexes | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-058 | Transactions | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-059 | Error handling | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### mongodb — Mandatory Database Demonstrations

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mongodb-060 | Insert documents | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-061 | Find documents | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-062 | Update documents | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-063 | Delete documents | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-064 | Filter records | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-065 | Sort records | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-066 | Paginate records | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-067 | Schema validation | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-068 | Unique constraint errors | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-069 | One-to-many relationships | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-070 | populate() | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-071 | Aggregation and grouping | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-072 | Lookup/join | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-073 | Index behavior and query plans | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mongodb-074 | Transactions | 8 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

### mern — Fundamentals

| ID | Concept or mandatory example | Phase | D | P | S | V | Q | M | T | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mern-001 | React form calling Express | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-002 | Express reading/writing MongoDB | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-003 | Full CRUD application | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-004 | Registration | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-005 | Login | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-006 | Password hashing | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-007 | JWT authentication | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-008 | Access and refresh token flows | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-009 | Protected routes | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-010 | Backend role-based authorization | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-011 | RTK Query integration | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-012 | Search | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-013 | Sorting | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-014 | Pagination | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-015 | Form validation | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-016 | File uploads | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-017 | Optimistic updates | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-018 | Error handling | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-019 | Loading states | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-020 | API testing | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-021 | React integration testing | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-022 | Environment configuration | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |
| mern-023 | Production build and deployment walkthrough | 9 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | APPROVED_COMPLETE |

## Phase 1 foundation acceptance

| Requirement | Status | Evidence |
| --- | --- | --- |
| npm workspaces, strict TypeScript and compatible locked dependencies | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |
| Vite + React shell and plain CSS two-column layout | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |
| Express server, validated environment and /api/v1/health | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |
| Eight-category grouped, collapsible, searchable sidebar | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |
| Typed registry, status labels, selected topic URL and unknown-topic handling | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |
| Reusable concept, demo, source, expected/actual output, mistakes and Q&A containers | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |
| One foundation browser interaction and one real health request, visibly named infrastructure smoke checks | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |
| Vitest + React Testing Library, Supertest and registry integrity checks | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |
| TypeScript, lint, tests, production build and built-server startup | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |
| Browser checks: selection, search, refresh, history, keyboard and console | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |
| Safe .env.example and .gitignore; no secrets in client or repository | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |
| README startup instructions and progress report | APPROVED_COMPLETE | User approved Phase 1 in this chat on 2026-11-08; see DEVELOPMENT_PROGRESS.md |

## Planned example records

For Phase 2 the reserved IDs are implemented and verified in PHASE_2_COVERAGE.md; later-phase IDs remain scope commitments rather than claims of working examples. Mandatory rows above already name their behavior and receive one record each. Ordinary topics initially reserve two example IDs; additional records must be named during topic design. Important topic minimums below override two-example defaults.

| Requirement | Planned example IDs | Status |
| --- | --- | --- |
| javascript-001 | javascript-001.e01, javascript-001.e02 | APPROVED_COMPLETE |
| javascript-002 | javascript-002.e01, javascript-002.e02 | APPROVED_COMPLETE |
| javascript-003 | javascript-003.e01, javascript-003.e02 | APPROVED_COMPLETE |
| javascript-004 | javascript-004.e01, javascript-004.e02 | APPROVED_COMPLETE |
| javascript-005 | javascript-005.e01, javascript-005.e02 | APPROVED_COMPLETE |
| javascript-006 | javascript-006.e01, javascript-006.e02 | APPROVED_COMPLETE |
| javascript-007 | javascript-007.e01, javascript-007.e02 | APPROVED_COMPLETE |
| javascript-008 | javascript-008.e01, javascript-008.e02 | APPROVED_COMPLETE |
| javascript-009 | javascript-009.e01, javascript-009.e02 | APPROVED_COMPLETE |
| javascript-010 | javascript-010.e01, javascript-010.e02 | APPROVED_COMPLETE |
| javascript-011 | javascript-011.e01, javascript-011.e02 | APPROVED_COMPLETE |
| javascript-012 | javascript-012.e01, javascript-012.e02 | APPROVED_COMPLETE |
| javascript-013 | javascript-013.e01, javascript-013.e02 | APPROVED_COMPLETE |
| javascript-014 | javascript-014.e01, javascript-014.e02 | APPROVED_COMPLETE |
| javascript-015 | javascript-015.e01, javascript-015.e02 | APPROVED_COMPLETE |
| javascript-016 | javascript-016.e01, javascript-016.e02 | APPROVED_COMPLETE |
| javascript-017 | javascript-017.e01, javascript-017.e02 | APPROVED_COMPLETE |
| javascript-018 | javascript-018.e01, javascript-018.e02 | APPROVED_COMPLETE |
| javascript-019 | javascript-019.e01, javascript-019.e02 | APPROVED_COMPLETE |
| javascript-020 | javascript-020.e01, javascript-020.e02 | APPROVED_COMPLETE |
| javascript-021 | javascript-021.e01, javascript-021.e02, javascript-021.e03, javascript-021.e04, javascript-021.e05 | APPROVED_COMPLETE |
| javascript-022 | javascript-022.e01, javascript-022.e02 | APPROVED_COMPLETE |
| javascript-023 | javascript-023.e01, javascript-023.e02 | APPROVED_COMPLETE |
| javascript-024 | javascript-024.e01, javascript-024.e02 | APPROVED_COMPLETE |
| javascript-025 | javascript-025.e01, javascript-025.e02 | APPROVED_COMPLETE |
| javascript-026 | javascript-026.e01, javascript-026.e02 | APPROVED_COMPLETE |
| javascript-027 | javascript-027.e01, javascript-027.e02 | APPROVED_COMPLETE |
| javascript-028 | javascript-028.e01, javascript-028.e02 | APPROVED_COMPLETE |
| javascript-029 | javascript-029.e01, javascript-029.e02 | APPROVED_COMPLETE |
| javascript-030 | javascript-030.e01, javascript-030.e02 | APPROVED_COMPLETE |
| javascript-031 | javascript-031.e01, javascript-031.e02 | APPROVED_COMPLETE |
| javascript-032 | javascript-032.e01, javascript-032.e02 | APPROVED_COMPLETE |
| javascript-033 | javascript-033.e01, javascript-033.e02 | APPROVED_COMPLETE |
| javascript-034 | javascript-034.e01, javascript-034.e02 | APPROVED_COMPLETE |
| javascript-035 | javascript-035.e01, javascript-035.e02 | APPROVED_COMPLETE |
| javascript-036 | javascript-036.e01, javascript-036.e02 | APPROVED_COMPLETE |
| javascript-037 | javascript-037.e01, javascript-037.e02 | APPROVED_COMPLETE |
| javascript-038 | javascript-038.e01, javascript-038.e02 | APPROVED_COMPLETE |
| javascript-039 | javascript-039.e01, javascript-039.e02 | APPROVED_COMPLETE |
| javascript-040 | javascript-040.e01, javascript-040.e02 | APPROVED_COMPLETE |
| javascript-041 | javascript-041.e01, javascript-041.e02 | APPROVED_COMPLETE |
| javascript-042 | javascript-042.e01, javascript-042.e02 | APPROVED_COMPLETE |
| javascript-043 | javascript-043.e01, javascript-043.e02 | APPROVED_COMPLETE |
| javascript-044 | javascript-044.e01, javascript-044.e02 | APPROVED_COMPLETE |
| javascript-045 | javascript-045.e01, javascript-045.e02 | APPROVED_COMPLETE |
| javascript-046 | javascript-046.e01, javascript-046.e02 | APPROVED_COMPLETE |
| javascript-047 | javascript-047.e01, javascript-047.e02 | APPROVED_COMPLETE |
| javascript-048 | javascript-048.e01, javascript-048.e02 | APPROVED_COMPLETE |
| javascript-049 | javascript-049.e01, javascript-049.e02 | APPROVED_COMPLETE |
| javascript-050 | javascript-050.e01, javascript-050.e02 | APPROVED_COMPLETE |
| javascript-051 | javascript-051.e01, javascript-051.e02 | APPROVED_COMPLETE |
| javascript-052 | javascript-052.e01, javascript-052.e02 | APPROVED_COMPLETE |
| javascript-053 | javascript-053.e01, javascript-053.e02 | APPROVED_COMPLETE |
| javascript-054 | javascript-054.e01, javascript-054.e02 | APPROVED_COMPLETE |
| javascript-055 | javascript-055.e01, javascript-055.e02 | APPROVED_COMPLETE |
| javascript-056 | javascript-056.e01, javascript-056.e02 | APPROVED_COMPLETE |
| javascript-057 | javascript-057.e01, javascript-057.e02 | APPROVED_COMPLETE |
| javascript-058 | javascript-058.e01, javascript-058.e02 | APPROVED_COMPLETE |
| javascript-059 | javascript-059.e01, javascript-059.e02 | APPROVED_COMPLETE |
| javascript-060 | javascript-060.e01, javascript-060.e02 | APPROVED_COMPLETE |
| javascript-061 | javascript-061.e01, javascript-061.e02 | APPROVED_COMPLETE |
| javascript-062 | javascript-062.e01, javascript-062.e02 | APPROVED_COMPLETE |
| javascript-063 | javascript-063.e01, javascript-063.e02 | APPROVED_COMPLETE |
| javascript-064 | javascript-064.e01, javascript-064.e02 | APPROVED_COMPLETE |
| javascript-065 | javascript-065.e01, javascript-065.e02, javascript-065.e03, javascript-065.e04, javascript-065.e05 | APPROVED_COMPLETE |
| javascript-066 | javascript-066.e01, javascript-066.e02, javascript-066.e03, javascript-066.e04, javascript-066.e05 | APPROVED_COMPLETE |
| javascript-067 | javascript-067.e01, javascript-067.e02 | APPROVED_COMPLETE |
| javascript-068 | javascript-068.e01, javascript-068.e02, javascript-068.e03, javascript-068.e04, javascript-068.e05 | APPROVED_COMPLETE |
| javascript-069 | javascript-069.e01, javascript-069.e02, javascript-069.e03, javascript-069.e04, javascript-069.e05 | APPROVED_COMPLETE |
| javascript-070 | javascript-070.e01, javascript-070.e02, javascript-070.e03, javascript-070.e04, javascript-070.e05 | APPROVED_COMPLETE |
| javascript-071 | javascript-071.e01, javascript-071.e02, javascript-071.e03, javascript-071.e04, javascript-071.e05 | APPROVED_COMPLETE |
| javascript-072 | javascript-072.e01, javascript-072.e02 | APPROVED_COMPLETE |
| javascript-073 | javascript-073.e01, javascript-073.e02, javascript-073.e03, javascript-073.e04, javascript-073.e05 | APPROVED_COMPLETE |
| javascript-074 | javascript-074.e01, javascript-074.e02 | APPROVED_COMPLETE |
| javascript-075 | javascript-075.e01, javascript-075.e02 | APPROVED_COMPLETE |
| javascript-076 | javascript-076.e01, javascript-076.e02 | APPROVED_COMPLETE |
| javascript-077 | javascript-077.e01, javascript-077.e02 | APPROVED_COMPLETE |
| javascript-078 | javascript-078.e01, javascript-078.e02 | APPROVED_COMPLETE |
| javascript-079 | javascript-079.e01, javascript-079.e02 | APPROVED_COMPLETE |
| javascript-080 | javascript-080.e01, javascript-080.e02 | APPROVED_COMPLETE |
| javascript-081 | javascript-081.e01, javascript-081.e02 | APPROVED_COMPLETE |
| javascript-082 | javascript-082.e01, javascript-082.e02 | APPROVED_COMPLETE |
| javascript-083 | javascript-083.e01, javascript-083.e02 | APPROVED_COMPLETE |
| javascript-084 | javascript-084.e01, javascript-084.e02 | APPROVED_COMPLETE |
| javascript-085 | javascript-085.e01, javascript-085.e02 | APPROVED_COMPLETE |
| javascript-086 | javascript-086.e01, javascript-086.e02 | APPROVED_COMPLETE |
| javascript-087 | javascript-087.e01, javascript-087.e02 | APPROVED_COMPLETE |
| javascript-088 | javascript-088.e01, javascript-088.e02 | APPROVED_COMPLETE |
| javascript-089 | javascript-089.e01, javascript-089.e02 | APPROVED_COMPLETE |
| javascript-090 | javascript-090.e01, javascript-090.e02 | APPROVED_COMPLETE |
| javascript-091 | javascript-091.e01, javascript-091.e02 | APPROVED_COMPLETE |
| javascript-092 | javascript-092.e01, javascript-092.e02 | APPROVED_COMPLETE |
| javascript-093 | javascript-093.e01, javascript-093.e02 | APPROVED_COMPLETE |
| javascript-094 | javascript-094.e01, javascript-094.e02 | APPROVED_COMPLETE |
| javascript-095 | javascript-095.e01, javascript-095.e02 | APPROVED_COMPLETE |
| javascript-096 | javascript-096.e01, javascript-096.e02 | APPROVED_COMPLETE |
| javascript-097 | javascript-097.e01, javascript-097.e02 | APPROVED_COMPLETE |
| javascript-098 | javascript-098.e01, javascript-098.e02 | APPROVED_COMPLETE |
| javascript-099 | javascript-099.e01, javascript-099.e02 | APPROVED_COMPLETE |
| javascript-100 | javascript-100.e01, javascript-100.e02 | APPROVED_COMPLETE |
| javascript-101 | javascript-101.e01, javascript-101.e02 | APPROVED_COMPLETE |
| javascript-102 | javascript-102.e01, javascript-102.e02 | APPROVED_COMPLETE |
| javascript-103 | javascript-103.e01, javascript-103.e02 | APPROVED_COMPLETE |
| javascript-104 | javascript-104.e01, javascript-104.e02 | APPROVED_COMPLETE |
| javascript-105 | javascript-105.e01, javascript-105.e02 | APPROVED_COMPLETE |
| javascript-106 | javascript-106.e01, javascript-106.e02 | APPROVED_COMPLETE |
| javascript-107 | javascript-107.e01, javascript-107.e02 | APPROVED_COMPLETE |
| javascript-108 | javascript-108.e01, javascript-108.e02 | APPROVED_COMPLETE |
| javascript-109 | javascript-109.e01, javascript-109.e02 | APPROVED_COMPLETE |
| javascript-110 | javascript-110.e01, javascript-110.e02 | APPROVED_COMPLETE |
| javascript-111 | javascript-111.e01, javascript-111.e02 | APPROVED_COMPLETE |
| javascript-112 | javascript-112.e01, javascript-112.e02, javascript-112.e03, javascript-112.e04, javascript-112.e05 | APPROVED_COMPLETE |
| javascript-113 | javascript-113.e01, javascript-113.e02 | APPROVED_COMPLETE |
| javascript-114 | javascript-114.e01, javascript-114.e02, javascript-114.e03, javascript-114.e04, javascript-114.e05 | APPROVED_COMPLETE |
| typescript-001 | typescript-001.e01, typescript-001.e02 | APPROVED_COMPLETE |
| typescript-002 | typescript-002.e01, typescript-002.e02 | APPROVED_COMPLETE |
| typescript-003 | typescript-003.e01, typescript-003.e02 | APPROVED_COMPLETE |
| typescript-004 | typescript-004.e01, typescript-004.e02 | APPROVED_COMPLETE |
| typescript-005 | typescript-005.e01, typescript-005.e02 | APPROVED_COMPLETE |
| typescript-006 | typescript-006.e01, typescript-006.e02 | APPROVED_COMPLETE |
| typescript-007 | typescript-007.e01, typescript-007.e02 | APPROVED_COMPLETE |
| typescript-008 | typescript-008.e01, typescript-008.e02 | APPROVED_COMPLETE |
| typescript-009 | typescript-009.e01, typescript-009.e02 | APPROVED_COMPLETE |
| typescript-010 | typescript-010.e01, typescript-010.e02 | APPROVED_COMPLETE |
| typescript-011 | typescript-011.e01, typescript-011.e02 | APPROVED_COMPLETE |
| typescript-012 | typescript-012.e01, typescript-012.e02 | APPROVED_COMPLETE |
| typescript-013 | typescript-013.e01, typescript-013.e02 | APPROVED_COMPLETE |
| typescript-014 | typescript-014.e01, typescript-014.e02 | APPROVED_COMPLETE |
| typescript-015 | typescript-015.e01, typescript-015.e02 | APPROVED_COMPLETE |
| typescript-016 | typescript-016.e01, typescript-016.e02 | APPROVED_COMPLETE |
| typescript-017 | typescript-017.e01, typescript-017.e02 | APPROVED_COMPLETE |
| typescript-018 | typescript-018.e01, typescript-018.e02 | APPROVED_COMPLETE |
| typescript-019 | typescript-019.e01, typescript-019.e02 | APPROVED_COMPLETE |
| typescript-020 | typescript-020.e01, typescript-020.e02 | APPROVED_COMPLETE |
| typescript-021 | typescript-021.e01, typescript-021.e02 | APPROVED_COMPLETE |
| typescript-022 | typescript-022.e01, typescript-022.e02 | APPROVED_COMPLETE |
| typescript-023 | typescript-023.e01, typescript-023.e02 | APPROVED_COMPLETE |
| typescript-024 | typescript-024.e01, typescript-024.e02 | APPROVED_COMPLETE |
| typescript-025 | typescript-025.e01, typescript-025.e02 | APPROVED_COMPLETE |
| typescript-026 | typescript-026.e01, typescript-026.e02 | APPROVED_COMPLETE |
| typescript-027 | typescript-027.e01, typescript-027.e02 | APPROVED_COMPLETE |
| typescript-028 | typescript-028.e01, typescript-028.e02, typescript-028.e03, typescript-028.e04, typescript-028.e05 | APPROVED_COMPLETE |
| typescript-029 | typescript-029.e01, typescript-029.e02 | APPROVED_COMPLETE |
| typescript-030 | typescript-030.e01, typescript-030.e02 | APPROVED_COMPLETE |
| typescript-031 | typescript-031.e01, typescript-031.e02 | APPROVED_COMPLETE |
| typescript-032 | typescript-032.e01, typescript-032.e02 | APPROVED_COMPLETE |
| typescript-033 | typescript-033.e01, typescript-033.e02 | APPROVED_COMPLETE |
| typescript-034 | typescript-034.e01, typescript-034.e02 | APPROVED_COMPLETE |
| typescript-035 | typescript-035.e01, typescript-035.e02 | APPROVED_COMPLETE |
| react-001 | react-001.e01, react-001.e02 | APPROVED_COMPLETE |
| react-002 | react-002.e01, react-002.e02 | APPROVED_COMPLETE |
| react-003 | react-003.e01, react-003.e02 | APPROVED_COMPLETE |
| react-004 | react-004.e01, react-004.e02 | APPROVED_COMPLETE |
| react-005 | react-005.e01, react-005.e02 | APPROVED_COMPLETE |
| react-006 | react-006.e01, react-006.e02 | APPROVED_COMPLETE |
| react-007 | react-007.e01, react-007.e02 | APPROVED_COMPLETE |
| react-008 | react-008.e01, react-008.e02 | APPROVED_COMPLETE |
| react-009 | react-009.e01, react-009.e02 | APPROVED_COMPLETE |
| react-010 | react-010.e01, react-010.e02 | APPROVED_COMPLETE |
| react-011 | react-011.e01, react-011.e02 | APPROVED_COMPLETE |
| react-012 | react-012.e01, react-012.e02 | APPROVED_COMPLETE |
| react-013 | react-013.e01, react-013.e02 | APPROVED_COMPLETE |
| react-014 | react-014.e01, react-014.e02 | APPROVED_COMPLETE |
| react-015 | react-015.e01, react-015.e02 | APPROVED_COMPLETE |
| react-016 | react-016.e01, react-016.e02 | APPROVED_COMPLETE |
| react-017 | react-017.e01, react-017.e02 | APPROVED_COMPLETE |
| react-018 | react-018.e01, react-018.e02 | APPROVED_COMPLETE |
| react-019 | react-019.e01, react-019.e02 | APPROVED_COMPLETE |
| react-020 | react-020.e01, react-020.e02 | APPROVED_COMPLETE |
| react-021 | react-021.e01, react-021.e02 | APPROVED_COMPLETE |
| react-022 | react-022.e01, react-022.e02 | APPROVED_COMPLETE |
| react-023 | react-023.e01, react-023.e02 | APPROVED_COMPLETE |
| react-024 | react-024.e01, react-024.e02 | APPROVED_COMPLETE |
| react-025 | react-025.e01, react-025.e02 | APPROVED_COMPLETE |
| react-026 | react-026.e01, react-026.e02 | APPROVED_COMPLETE |
| react-027 | react-027.e01, react-027.e02, react-027.e03, react-027.e04, react-027.e05, react-027.e06, react-027.e07, react-027.e08, react-027.e09, react-027.e10 | APPROVED_COMPLETE |
| react-028 | react-028.e01, react-028.e02, react-028.e03, react-028.e04, react-028.e05, react-028.e06, react-028.e07, react-028.e08, react-028.e09, react-028.e10, react-028.e11, react-028.e12, react-028.e13, react-028.e14, react-028.e15, react-028.e16, react-028.e17 | APPROVED_COMPLETE |
| react-029 | react-029.e01, react-029.e02 | APPROVED_COMPLETE |
| react-030 | react-030.e01, react-030.e02 | APPROVED_COMPLETE |
| react-031 | react-031.e01, react-031.e02 | APPROVED_COMPLETE |
| react-032 | react-032.e01, react-032.e02 | APPROVED_COMPLETE |
| react-033 | react-033.e01, react-033.e02 | APPROVED_COMPLETE |
| react-034 | react-034.e01, react-034.e02 | APPROVED_COMPLETE |
| react-035 | react-035.e01, react-035.e02 | APPROVED_COMPLETE |
| react-036 | react-036.e01, react-036.e02 | APPROVED_COMPLETE |
| react-037 | react-037.e01, react-037.e02 | APPROVED_COMPLETE |
| react-038 | react-038.e01, react-038.e02 | APPROVED_COMPLETE |
| react-039 | react-039.e01, react-039.e02 | APPROVED_COMPLETE |
| react-040 | react-040.e01, react-040.e02 | APPROVED_COMPLETE |
| react-041 | react-041.e01, react-041.e02 | APPROVED_COMPLETE |
| react-042 | react-042.e01, react-042.e02 | APPROVED_COMPLETE |
| react-043 | react-043.e01, react-043.e02 | APPROVED_COMPLETE |
| react-044 | react-044.e01, react-044.e02, react-044.e03, react-044.e04, react-044.e05 | APPROVED_COMPLETE |
| react-045 | react-045.e01, react-045.e02 | APPROVED_COMPLETE |
| react-046 | react-046.e01, react-046.e02 | APPROVED_COMPLETE |
| react-047 | react-047.e01 | APPROVED_COMPLETE |
| react-048 | react-048.e01 | APPROVED_COMPLETE |
| react-049 | react-049.e01 | APPROVED_COMPLETE |
| react-050 | react-050.e01 | APPROVED_COMPLETE |
| react-051 | react-051.e01 | APPROVED_COMPLETE |
| react-052 | react-052.e01 | APPROVED_COMPLETE |
| react-053 | react-053.e01 | APPROVED_COMPLETE |
| react-054 | react-054.e01 | APPROVED_COMPLETE |
| react-055 | react-055.e01 | APPROVED_COMPLETE |
| react-056 | react-056.e01 | APPROVED_COMPLETE |
| react-057 | react-057.e01 | APPROVED_COMPLETE |
| react-058 | react-058.e01 | APPROVED_COMPLETE |
| react-059 | react-059.e01 | APPROVED_COMPLETE |
| react-060 | react-060.e01 | APPROVED_COMPLETE |
| react-061 | react-061.e01 | APPROVED_COMPLETE |
| react-062 | react-062.e01 | APPROVED_COMPLETE |
| react-063 | react-063.e01 | APPROVED_COMPLETE |
| react-064 | react-064.e01 | APPROVED_COMPLETE |
| react-065 | react-065.e01 | APPROVED_COMPLETE |
| react-066 | react-066.e01 | APPROVED_COMPLETE |
| react-067 | react-067.e01 | APPROVED_COMPLETE |
| react-068 | react-068.e01 | APPROVED_COMPLETE |
| react-069 | react-069.e01 | APPROVED_COMPLETE |
| react-070 | react-070.e01 | APPROVED_COMPLETE |
| react-071 | react-071.e01 | APPROVED_COMPLETE |
| react-072 | react-072.e01 | APPROVED_COMPLETE |
| react-073 | react-073.e01 | APPROVED_COMPLETE |
| react-074 | react-074.e01, react-074.e02 | APPROVED_COMPLETE |
| react-075 | react-075.e01, react-075.e02 | APPROVED_COMPLETE |
| react-076 | react-076.e01, react-076.e02 | APPROVED_COMPLETE |
| react-077 | react-077.e01, react-077.e02 | APPROVED_COMPLETE |
| react-078 | react-078.e01, react-078.e02 | APPROVED_COMPLETE |
| react-079 | react-079.e01, react-079.e02 | APPROVED_COMPLETE |
| react-080 | react-080.e01, react-080.e02 | APPROVED_COMPLETE |
| react-081 | react-081.e01, react-081.e02 | APPROVED_COMPLETE |
| react-082 | react-082.e01, react-082.e02 | APPROVED_COMPLETE |
| react-083 | react-083.e01, react-083.e02 | APPROVED_COMPLETE |
| react-084 | react-084.e01, react-084.e02 | APPROVED_COMPLETE |
| react-085 | react-085.e01, react-085.e02 | APPROVED_COMPLETE |
| react-086 | react-086.e01, react-086.e02 | APPROVED_COMPLETE |
| react-087 | react-087.e01, react-087.e02 | APPROVED_COMPLETE |
| react-088 | react-088.e01, react-088.e02 | APPROVED_COMPLETE |
| react-089 | react-089.e01, react-089.e02 | APPROVED_COMPLETE |
| react-090 | react-090.e01, react-090.e02 | APPROVED_COMPLETE |
| react-091 | react-091.e01, react-091.e02 | APPROVED_COMPLETE |
| react-092 | react-092.e01, react-092.e02 | APPROVED_COMPLETE |
| react-093 | react-093.e01, react-093.e02 | APPROVED_COMPLETE |
| react-094 | react-094.e01, react-094.e02 | APPROVED_COMPLETE |
| react-095 | react-095.e01, react-095.e02 | APPROVED_COMPLETE |
| react-096 | react-096.e01, react-096.e02 | APPROVED_COMPLETE |
| react-097 | react-097.e01, react-097.e02 | APPROVED_COMPLETE |
| react-098 | react-098.e01, react-098.e02 | APPROVED_COMPLETE |
| react-099 | react-099.e01, react-099.e02 | APPROVED_COMPLETE |
| react-100 | react-100.e01, react-100.e02 | APPROVED_COMPLETE |
| redux-001 | redux-001.e01, redux-001.e02 | APPROVED_COMPLETE |
| redux-002 | redux-002.e01, redux-002.e02 | APPROVED_COMPLETE |
| redux-003 | redux-003.e01, redux-003.e02 | APPROVED_COMPLETE |
| redux-004 | redux-004.e01, redux-004.e02 | APPROVED_COMPLETE |
| redux-005 | redux-005.e01, redux-005.e02 | APPROVED_COMPLETE |
| redux-006 | redux-006.e01, redux-006.e02 | APPROVED_COMPLETE |
| redux-007 | redux-007.e01, redux-007.e02 | APPROVED_COMPLETE |
| redux-008 | redux-008.e01, redux-008.e02, redux-008.e03, redux-008.e04, redux-008.e05 | APPROVED_COMPLETE |
| redux-009 | redux-009.e01, redux-009.e02 | APPROVED_COMPLETE |
| redux-010 | redux-010.e01, redux-010.e02 | APPROVED_COMPLETE |
| redux-011 | redux-011.e01, redux-011.e02, redux-011.e03, redux-011.e04, redux-011.e05 | APPROVED_COMPLETE |
| redux-012 | redux-012.e01, redux-012.e02, redux-012.e03, redux-012.e04, redux-012.e05 | APPROVED_COMPLETE |
| redux-013 | redux-013.e01, redux-013.e02 | APPROVED_COMPLETE |
| redux-014 | redux-014.e01, redux-014.e02 | APPROVED_COMPLETE |
| redux-015 | redux-015.e01, redux-015.e02 | APPROVED_COMPLETE |
| redux-016 | redux-016.e01, redux-016.e02 | APPROVED_COMPLETE |
| redux-017 | redux-017.e01, redux-017.e02 | APPROVED_COMPLETE |
| redux-018 | redux-018.e01, redux-018.e02 | APPROVED_COMPLETE |
| redux-019 | redux-019.e01, redux-019.e02 | APPROVED_COMPLETE |
| redux-020 | redux-020.e01, redux-020.e02 | APPROVED_COMPLETE |
| redux-021 | redux-021.e01, redux-021.e02, redux-021.e03, redux-021.e04, redux-021.e05 | APPROVED_COMPLETE |
| redux-022 | redux-022.e01, redux-022.e02 | APPROVED_COMPLETE |
| redux-023 | redux-023.e01, redux-023.e02 | APPROVED_COMPLETE |
| redux-024 | redux-024.e01, redux-024.e02 | APPROVED_COMPLETE |
| redux-025 | redux-025.e01, redux-025.e02 | APPROVED_COMPLETE |
| redux-026 | redux-026.e01, redux-026.e02 | APPROVED_COMPLETE |
| redux-027 | redux-027.e01, redux-027.e02, redux-027.e03, redux-027.e04, redux-027.e05 | APPROVED_COMPLETE |
| redux-028 | redux-028.e01, redux-028.e02 | APPROVED_COMPLETE |
| redux-029 | redux-029.e01, redux-029.e02 | APPROVED_COMPLETE |
| redux-030 | redux-030.e01, redux-030.e02 | APPROVED_COMPLETE |
| redux-031 | redux-031.e01, redux-031.e02 | APPROVED_COMPLETE |
| redux-032 | redux-032.e01, redux-032.e02 | APPROVED_COMPLETE |
| redux-033 | redux-033.e01, redux-033.e02 | APPROVED_COMPLETE |
| redux-034 | redux-034.e01, redux-034.e02 | APPROVED_COMPLETE |
| redux-035 | redux-035.e01, redux-035.e02 | APPROVED_COMPLETE |
| redux-036 | redux-036.e01, redux-036.e02 | APPROVED_COMPLETE |
| redux-037 | redux-037.e01, redux-037.e02 | APPROVED_COMPLETE |
| redux-038 | redux-038.e01, redux-038.e02 | APPROVED_COMPLETE |
| redux-039 | redux-039.e01, redux-039.e02, redux-039.e03, redux-039.e04, redux-039.e05 | APPROVED_COMPLETE |
| redux-040 | redux-040.e01, redux-040.e02 | APPROVED_COMPLETE |
| redux-041 | redux-041.e01, redux-041.e02 | APPROVED_COMPLETE |
| redux-042 | redux-042.e01, redux-042.e02 | APPROVED_COMPLETE |
| redux-043 | redux-043.e01 | APPROVED_COMPLETE |
| redux-044 | redux-044.e01 | APPROVED_COMPLETE |
| redux-045 | redux-045.e01 | APPROVED_COMPLETE |
| redux-046 | redux-046.e01 | APPROVED_COMPLETE |
| redux-047 | redux-047.e01 | APPROVED_COMPLETE |
| redux-048 | redux-048.e01 | APPROVED_COMPLETE |
| redux-049 | redux-049.e01 | APPROVED_COMPLETE |
| redux-050 | redux-050.e01 | APPROVED_COMPLETE |
| redux-051 | redux-051.e01 | APPROVED_COMPLETE |
| redux-052 | redux-052.e01 | APPROVED_COMPLETE |
| node-001 | node-001.e01, node-001.e02 | APPROVED_COMPLETE |
| node-002 | node-002.e01, node-002.e02 | APPROVED_COMPLETE |
| node-003 | node-003.e01, node-003.e02, node-003.e03, node-003.e04, node-003.e05 | APPROVED_COMPLETE |
| node-004 | node-004.e01, node-004.e02 | APPROVED_COMPLETE |
| node-005 | node-005.e01, node-005.e02 | APPROVED_COMPLETE |
| node-006 | node-006.e01, node-006.e02 | APPROVED_COMPLETE |
| node-007 | node-007.e01, node-007.e02 | APPROVED_COMPLETE |
| node-008 | node-008.e01, node-008.e02 | APPROVED_COMPLETE |
| node-009 | node-009.e01, node-009.e02 | APPROVED_COMPLETE |
| node-010 | node-010.e01, node-010.e02 | APPROVED_COMPLETE |
| node-011 | node-011.e01, node-011.e02 | APPROVED_COMPLETE |
| node-012 | node-012.e01, node-012.e02 | APPROVED_COMPLETE |
| node-013 | node-013.e01, node-013.e02 | APPROVED_COMPLETE |
| node-014 | node-014.e01, node-014.e02 | APPROVED_COMPLETE |
| node-015 | node-015.e01, node-015.e02 | APPROVED_COMPLETE |
| node-016 | node-016.e01, node-016.e02 | APPROVED_COMPLETE |
| node-017 | node-017.e01, node-017.e02 | APPROVED_COMPLETE |
| node-018 | node-018.e01, node-018.e02 | APPROVED_COMPLETE |
| node-019 | node-019.e01, node-019.e02 | APPROVED_COMPLETE |
| node-020 | node-020.e01, node-020.e02 | APPROVED_COMPLETE |
| node-021 | node-021.e01, node-021.e02 | APPROVED_COMPLETE |
| node-022 | node-022.e01, node-022.e02 | APPROVED_COMPLETE |
| node-023 | node-023.e01, node-023.e02 | APPROVED_COMPLETE |
| node-024 | node-024.e01, node-024.e02, node-024.e03, node-024.e04, node-024.e05 | APPROVED_COMPLETE |
| node-025 | node-025.e01, node-025.e02 | APPROVED_COMPLETE |
| node-026 | node-026.e01, node-026.e02 | APPROVED_COMPLETE |
| node-027 | node-027.e01, node-027.e02 | APPROVED_COMPLETE |
| node-028 | node-028.e01, node-028.e02 | APPROVED_COMPLETE |
| node-029 | node-029.e01, node-029.e02 | APPROVED_COMPLETE |
| node-030 | node-030.e01, node-030.e02 | APPROVED_COMPLETE |
| node-031 | node-031.e01, node-031.e02 | APPROVED_COMPLETE |
| node-032 | node-032.e01, node-032.e02 | APPROVED_COMPLETE |
| node-033 | node-033.e01, node-033.e02 | APPROVED_COMPLETE |
| node-034 | node-034.e01, node-034.e02 | APPROVED_COMPLETE |
| node-035 | node-035.e01, node-035.e02 | APPROVED_COMPLETE |
| node-036 | node-036.e01, node-036.e02 | APPROVED_COMPLETE |
| node-037 | node-037.e01, node-037.e02 | APPROVED_COMPLETE |
| node-038 | node-038.e01, node-038.e02 | APPROVED_COMPLETE |
| node-039 | node-039.e01, node-039.e02 | APPROVED_COMPLETE |
| node-040 | node-040.e01, node-040.e02 | APPROVED_COMPLETE |
| node-041 | node-041.e01, node-041.e02 | APPROVED_COMPLETE |
| node-042 | node-042.e01, node-042.e02 | APPROVED_COMPLETE |
| node-043 | node-043.e01, node-043.e02 | APPROVED_COMPLETE |
| node-044 | node-044.e01, node-044.e02 | APPROVED_COMPLETE |
| node-045 | node-045.e01, node-045.e02 | APPROVED_COMPLETE |
| node-046 | node-046.e01, node-046.e02 | APPROVED_COMPLETE |
| express-001 | express-001.e01, express-001.e02 | APPROVED_COMPLETE |
| express-002 | express-002.e01, express-002.e02 | APPROVED_COMPLETE |
| express-003 | express-003.e01, express-003.e02 | APPROVED_COMPLETE |
| express-004 | express-004.e01, express-004.e02 | APPROVED_COMPLETE |
| express-005 | express-005.e01, express-005.e02 | APPROVED_COMPLETE |
| express-006 | express-006.e01, express-006.e02 | APPROVED_COMPLETE |
| express-007 | express-007.e01, express-007.e02 | APPROVED_COMPLETE |
| express-008 | express-008.e01, express-008.e02 | APPROVED_COMPLETE |
| express-009 | express-009.e01, express-009.e02 | APPROVED_COMPLETE |
| express-010 | express-010.e01, express-010.e02 | APPROVED_COMPLETE |
| express-011 | express-011.e01, express-011.e02 | APPROVED_COMPLETE |
| express-012 | express-012.e01, express-012.e02, express-012.e03, express-012.e04, express-012.e05 | APPROVED_COMPLETE |
| express-013 | express-013.e01, express-013.e02 | APPROVED_COMPLETE |
| express-014 | express-014.e01, express-014.e02 | APPROVED_COMPLETE |
| express-015 | express-015.e01, express-015.e02, express-015.e03, express-015.e04, express-015.e05 | APPROVED_COMPLETE |
| express-016 | express-016.e01, express-016.e02, express-016.e03, express-016.e04, express-016.e05 | APPROVED_COMPLETE |
| express-017 | express-017.e01, express-017.e02, express-017.e03, express-017.e04, express-017.e05 | APPROVED_COMPLETE |
| express-018 | express-018.e01, express-018.e02 | APPROVED_COMPLETE |
| express-019 | express-019.e01, express-019.e02 | APPROVED_COMPLETE |
| express-020 | express-020.e01, express-020.e02 | APPROVED_COMPLETE |
| express-021 | express-021.e01, express-021.e02 | APPROVED_COMPLETE |
| express-022 | express-022.e01, express-022.e02, express-022.e03, express-022.e04, express-022.e05 | APPROVED_COMPLETE |
| express-023 | express-023.e01, express-023.e02 | APPROVED_COMPLETE |
| express-024 | express-024.e01, express-024.e02 | APPROVED_COMPLETE |
| express-025 | express-025.e01, express-025.e02 | APPROVED_COMPLETE |
| express-026 | express-026.e01, express-026.e02 | APPROVED_COMPLETE |
| express-027 | express-027.e01, express-027.e02 | APPROVED_COMPLETE |
| express-028 | express-028.e01, express-028.e02 | APPROVED_COMPLETE |
| express-029 | express-029.e01, express-029.e02 | APPROVED_COMPLETE |
| express-030 | express-030.e01, express-030.e02 | APPROVED_COMPLETE |
| express-031 | express-031.e01, express-031.e02 | APPROVED_COMPLETE |
| express-032 | express-032.e01, express-032.e02 | APPROVED_COMPLETE |
| express-033 | express-033.e01, express-033.e02 | APPROVED_COMPLETE |
| express-034 | express-034.e01, express-034.e02 | APPROVED_COMPLETE |
| express-035 | express-035.e01, express-035.e02 | APPROVED_COMPLETE |
| express-036 | express-036.e01, express-036.e02 | APPROVED_COMPLETE |
| express-037 | express-037.e01, express-037.e02 | APPROVED_COMPLETE |
| express-038 | express-038.e01 | APPROVED_COMPLETE |
| express-039 | express-039.e01 | APPROVED_COMPLETE |
| express-040 | express-040.e01 | APPROVED_COMPLETE |
| express-041 | express-041.e01 | APPROVED_COMPLETE |
| express-042 | express-042.e01 | APPROVED_COMPLETE |
| express-043 | express-043.e01 | APPROVED_COMPLETE |
| express-044 | express-044.e01 | APPROVED_COMPLETE |
| express-045 | express-045.e01 | APPROVED_COMPLETE |
| express-046 | express-046.e01 | APPROVED_COMPLETE |
| express-047 | express-047.e01 | APPROVED_COMPLETE |
| express-048 | express-048.e01 | APPROVED_COMPLETE |
| express-049 | express-049.e01 | APPROVED_COMPLETE |
| express-050 | express-050.e01 | APPROVED_COMPLETE |
| mongodb-001 | mongodb-001.e01, mongodb-001.e02 | APPROVED_COMPLETE |
| mongodb-002 | mongodb-002.e01, mongodb-002.e02 | APPROVED_COMPLETE |
| mongodb-003 | mongodb-003.e01, mongodb-003.e02 | APPROVED_COMPLETE |
| mongodb-004 | mongodb-004.e01, mongodb-004.e02 | APPROVED_COMPLETE |
| mongodb-005 | mongodb-005.e01, mongodb-005.e02 | APPROVED_COMPLETE |
| mongodb-006 | mongodb-006.e01, mongodb-006.e02 | APPROVED_COMPLETE |
| mongodb-007 | mongodb-007.e01, mongodb-007.e02 | APPROVED_COMPLETE |
| mongodb-008 | mongodb-008.e01, mongodb-008.e02 | APPROVED_COMPLETE |
| mongodb-009 | mongodb-009.e01, mongodb-009.e02 | APPROVED_COMPLETE |
| mongodb-010 | mongodb-010.e01, mongodb-010.e02 | APPROVED_COMPLETE |
| mongodb-011 | mongodb-011.e01, mongodb-011.e02 | APPROVED_COMPLETE |
| mongodb-012 | mongodb-012.e01, mongodb-012.e02 | APPROVED_COMPLETE |
| mongodb-013 | mongodb-013.e01, mongodb-013.e02 | APPROVED_COMPLETE |
| mongodb-014 | mongodb-014.e01, mongodb-014.e02 | APPROVED_COMPLETE |
| mongodb-015 | mongodb-015.e01, mongodb-015.e02 | APPROVED_COMPLETE |
| mongodb-016 | mongodb-016.e01, mongodb-016.e02 | APPROVED_COMPLETE |
| mongodb-017 | mongodb-017.e01, mongodb-017.e02 | APPROVED_COMPLETE |
| mongodb-018 | mongodb-018.e01, mongodb-018.e02 | APPROVED_COMPLETE |
| mongodb-019 | mongodb-019.e01, mongodb-019.e02 | APPROVED_COMPLETE |
| mongodb-020 | mongodb-020.e01, mongodb-020.e02 | APPROVED_COMPLETE |
| mongodb-021 | mongodb-021.e01, mongodb-021.e02 | APPROVED_COMPLETE |
| mongodb-022 | mongodb-022.e01, mongodb-022.e02 | APPROVED_COMPLETE |
| mongodb-023 | mongodb-023.e01, mongodb-023.e02 | APPROVED_COMPLETE |
| mongodb-024 | mongodb-024.e01, mongodb-024.e02 | APPROVED_COMPLETE |
| mongodb-025 | mongodb-025.e01, mongodb-025.e02 | APPROVED_COMPLETE |
| mongodb-026 | mongodb-026.e01, mongodb-026.e02 | APPROVED_COMPLETE |
| mongodb-027 | mongodb-027.e01, mongodb-027.e02 | APPROVED_COMPLETE |
| mongodb-028 | mongodb-028.e01, mongodb-028.e02 | APPROVED_COMPLETE |
| mongodb-029 | mongodb-029.e01, mongodb-029.e02 | APPROVED_COMPLETE |
| mongodb-030 | mongodb-030.e01, mongodb-030.e02, mongodb-030.e03, mongodb-030.e04, mongodb-030.e05 | APPROVED_COMPLETE |
| mongodb-031 | mongodb-031.e01, mongodb-031.e02 | APPROVED_COMPLETE |
| mongodb-032 | mongodb-032.e01, mongodb-032.e02 | APPROVED_COMPLETE |
| mongodb-033 | mongodb-033.e01, mongodb-033.e02 | APPROVED_COMPLETE |
| mongodb-034 | mongodb-034.e01, mongodb-034.e02 | APPROVED_COMPLETE |
| mongodb-035 | mongodb-035.e01, mongodb-035.e02 | APPROVED_COMPLETE |
| mongodb-036 | mongodb-036.e01, mongodb-036.e02 | APPROVED_COMPLETE |
| mongodb-037 | mongodb-037.e01, mongodb-037.e02 | APPROVED_COMPLETE |
| mongodb-038 | mongodb-038.e01, mongodb-038.e02 | APPROVED_COMPLETE |
| mongodb-039 | mongodb-039.e01, mongodb-039.e02 | APPROVED_COMPLETE |
| mongodb-040 | mongodb-040.e01, mongodb-040.e02 | APPROVED_COMPLETE |
| mongodb-041 | mongodb-041.e01, mongodb-041.e02 | APPROVED_COMPLETE |
| mongodb-042 | mongodb-042.e01, mongodb-042.e02 | APPROVED_COMPLETE |
| mongodb-043 | mongodb-043.e01, mongodb-043.e02 | APPROVED_COMPLETE |
| mongodb-044 | mongodb-044.e01, mongodb-044.e02 | APPROVED_COMPLETE |
| mongodb-045 | mongodb-045.e01, mongodb-045.e02 | APPROVED_COMPLETE |
| mongodb-046 | mongodb-046.e01, mongodb-046.e02 | APPROVED_COMPLETE |
| mongodb-047 | mongodb-047.e01, mongodb-047.e02 | APPROVED_COMPLETE |
| mongodb-048 | mongodb-048.e01, mongodb-048.e02 | APPROVED_COMPLETE |
| mongodb-049 | mongodb-049.e01, mongodb-049.e02 | APPROVED_COMPLETE |
| mongodb-050 | mongodb-050.e01, mongodb-050.e02 | APPROVED_COMPLETE |
| mongodb-051 | mongodb-051.e01, mongodb-051.e02, mongodb-051.e03, mongodb-051.e04, mongodb-051.e05 | APPROVED_COMPLETE |
| mongodb-052 | mongodb-052.e01, mongodb-052.e02 | APPROVED_COMPLETE |
| mongodb-053 | mongodb-053.e01, mongodb-053.e02 | APPROVED_COMPLETE |
| mongodb-054 | mongodb-054.e01, mongodb-054.e02 | APPROVED_COMPLETE |
| mongodb-055 | mongodb-055.e01, mongodb-055.e02 | APPROVED_COMPLETE |
| mongodb-056 | mongodb-056.e01, mongodb-056.e02 | APPROVED_COMPLETE |
| mongodb-057 | mongodb-057.e01, mongodb-057.e02 | APPROVED_COMPLETE |
| mongodb-058 | mongodb-058.e01, mongodb-058.e02 | APPROVED_COMPLETE |
| mongodb-059 | mongodb-059.e01, mongodb-059.e02 | APPROVED_COMPLETE |
| mongodb-060 | mongodb-060.e01 | APPROVED_COMPLETE |
| mongodb-061 | mongodb-061.e01 | APPROVED_COMPLETE |
| mongodb-062 | mongodb-062.e01 | APPROVED_COMPLETE |
| mongodb-063 | mongodb-063.e01 | APPROVED_COMPLETE |
| mongodb-064 | mongodb-064.e01 | APPROVED_COMPLETE |
| mongodb-065 | mongodb-065.e01 | APPROVED_COMPLETE |
| mongodb-066 | mongodb-066.e01 | APPROVED_COMPLETE |
| mongodb-067 | mongodb-067.e01 | APPROVED_COMPLETE |
| mongodb-068 | mongodb-068.e01 | APPROVED_COMPLETE |
| mongodb-069 | mongodb-069.e01 | APPROVED_COMPLETE |
| mongodb-070 | mongodb-070.e01 | APPROVED_COMPLETE |
| mongodb-071 | mongodb-071.e01 | APPROVED_COMPLETE |
| mongodb-072 | mongodb-072.e01 | APPROVED_COMPLETE |
| mongodb-073 | mongodb-073.e01 | APPROVED_COMPLETE |
| mongodb-074 | mongodb-074.e01 | APPROVED_COMPLETE |
| mern-001 | mern-001.e01 | APPROVED_COMPLETE |
| mern-002 | mern-002.e01 | APPROVED_COMPLETE |
| mern-003 | mern-003.e01 | APPROVED_COMPLETE |
| mern-004 | mern-004.e01 | APPROVED_COMPLETE |
| mern-005 | mern-005.e01 | APPROVED_COMPLETE |
| mern-006 | mern-006.e01 | APPROVED_COMPLETE |
| mern-007 | mern-007.e01 | APPROVED_COMPLETE |
| mern-008 | mern-008.e01 | APPROVED_COMPLETE |
| mern-009 | mern-009.e01 | APPROVED_COMPLETE |
| mern-010 | mern-010.e01 | APPROVED_COMPLETE |
| mern-011 | mern-011.e01 | APPROVED_COMPLETE |
| mern-012 | mern-012.e01 | APPROVED_COMPLETE |
| mern-013 | mern-013.e01 | APPROVED_COMPLETE |
| mern-014 | mern-014.e01 | APPROVED_COMPLETE |
| mern-015 | mern-015.e01 | APPROVED_COMPLETE |
| mern-016 | mern-016.e01 | APPROVED_COMPLETE |
| mern-017 | mern-017.e01 | APPROVED_COMPLETE |
| mern-018 | mern-018.e01 | APPROVED_COMPLETE |
| mern-019 | mern-019.e01 | APPROVED_COMPLETE |
| mern-020 | mern-020.e01 | APPROVED_COMPLETE |
| mern-021 | mern-021.e01 | APPROVED_COMPLETE |
| mern-022 | mern-022.e01 | APPROVED_COMPLETE |
| mern-023 | mern-023.e01 | APPROVED_COMPLETE |

## Coverage reconciliation

Total syllabus requirement rows: 494.

- javascript: 114 requirement rows.
- typescript: 35 requirement rows.
- react: 100 requirement rows.
- redux: 52 requirement rows.
- node: 46 requirement rows.
- express: 50 requirement rows.
- mongodb: 74 requirement rows.
- mern: 23 requirement rows.

Coverage includes all module bullets, the mandatory useEffect/useState lists, Redux projects, Express examples, database demonstrations and all end-to-end scenarios. Infrastructure, security, reporting and review obligations are tracked in the implementation plan and phase gates.
