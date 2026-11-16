# Phase 2 coverage and verification

Editable code enhancement: all existing examples now have source-backed Run/Reset/Stop editors alongside their original demos and interview questions. See [EDITABLE_SNIPPETS.md](EDITABLE_SNIPPETS.md) and evidence/snippets-tests.txt for the expanded acceptance run. The baseline phase evidence below is preserved. Phase 4 remains unstarted.

Status: APPROVED_COMPLETE. The user explicitly approved Phase 2 and authorized Phase 3 on 2026-11-08. The evidence below records the Phase 2 acceptance run.

149 topics: 114 JavaScript and 35 TypeScript. 331 example records: 291 actual runtime experiments and 40 compiler fixtures. Each topic has six interview questions (894 total), common mistakes/fixes, usage constraints and exact implementation source.

All runtime default outputs are exercised by client/src/modules/lessons.test.ts. Network examples use an actual temporary Express server, not a response mock. Browser APIs run in the jsdom test environment; representative native-browser semantics are separately verified in Chrome. Compiler fixtures are checked by the real TypeScript compiler and tied to their displayed source with SHA-256 hashes.

TypeScript fixture code is never executed in the browser. The validation script first checks the positive program with expected-error annotations, then removes those annotations and requires a real diagnostic at every marked invalid line. Model/query typing is verified without connecting MongoDB or simulating database operations.

## Topic and example ledger

### javascript-001

var is function-scoped; let and const are block-scoped. const prevents rebinding, not mutation.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-001.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-001.e01 | Block scope versus function scope | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-001.e02 | Constant binding, mutable contents | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Block scope reduces accidental name sharing; freezing is a separate runtime operation.

### javascript-002

Scope controls where a binding can be resolved. A nearer binding shadows an outer one.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-002.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-002.e01 | Nested shadowing | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-002.e02 | Returning a block result | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Smaller scopes reduce accidental coupling without making data globally accessible.

### javascript-003

Lexical scope resolves identifiers from where a function is defined, not where it is called.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-003.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-003.e01 | Definition site wins | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-003.e02 | Explicit dependency injection | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Lexical lookup is predictable; captured references can still retain objects.

### javascript-004

Declarations are instantiated before execution, but initialization rules differ between functions, var and lexical bindings.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-004.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-004.e01 | Function declaration before its line | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-004.e02 | var starts undefined | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Function declarations can be called early; var reads undefined and let/const remain in the TDZ.

### javascript-005

A let or const binding exists from scope entry but cannot be accessed until its initialization executes.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-005.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-005.e01 | Early closure read and corrected order | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-005.e02 | typeof also observes the TDZ | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: TDZ checks expose ordering bugs rather than silently yielding undefined.

### javascript-006

Primitive assignments copy values; object assignments copy references to the same object.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-006.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-006.e01 | Value copy and object alias | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-006.e02 | Separate the object before updating | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Object copies add allocation; reference sharing is useful only when intentional.

### javascript-007

Coercion converts values according to an operator’s rules. Addition can concatenate while multiplication requests numbers.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-007.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-007.e01 | String input through different operators | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-007.e02 | Whole-number conversion versus prefix parsing | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Number rejects malformed numeric text; parseInt accepts prefixes and has a different contract.

### javascript-008

Strict equality avoids cross-type coercion; Object.is differs for NaN and signed zero.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-008.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-008.e01 | Loose and strict comparisons | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-008.e02 | NaN and signed zero | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Object equality compares identity, not structural content.

### javascript-009

Conditions use Boolean coercion. Empty arrays and objects are truthy, while empty text, zero, null and undefined are falsy.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-009.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-009.e01 | Inspect common values | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-009.e02 | Falsy default versus missing default | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Truthiness is compact but can hide legitimate falsy domain values.

### javascript-010

undefined usually represents an absent/uninitialized value; null is an explicit empty value. Both are nullish.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-010.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-010.e01 | Serialization treats missing and empty differently | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-010.e02 | Default parameter versus nullish default | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: JSON arrays turn undefined slots into null while object fields are omitted.

### javascript-011

Operators combine, compare and select values with precedence and short-circuit rules.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-011.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-011.e01 | Precedence and grouping | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-011.e02 | Short-circuit evaluation and operand values | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Short-circuit operators skip evaluation and can prevent unnecessary work.

### javascript-012

A function packages reusable behavior with parameters, a return value and its own execution context.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-012.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-012.e01 | Parameters and returned values | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-012.e02 | Missing return versus explicit return | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Pure small functions are easier to test, though real effects still belong at clear boundaries.

### javascript-013

A function expression creates a function value during expression evaluation and can keep a private recursive name.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-013.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-013.e01 | Function expression as a callback | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-013.e02 | Private recursive function name | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Named expressions improve stack traces without adding their private name to the surrounding scope.

### javascript-014

Arrow functions provide lexical this and expression-body syntax; they are not constructors.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-014.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-014.e01 | Expression body returns an object | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-014.e02 | Arrow captures this; ordinary callback accepts a receiver | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Arrows have no own arguments binding; rest parameters are explicit alternatives.

### javascript-015

Default parameters initialize an omitted or undefined argument at call time; null does not trigger the default.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-015.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-015.e01 | Omitted, undefined and null arguments | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-015.e02 | Fresh objects per default evaluation | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Default expressions execute for each call that needs them.

### javascript-016

Rest collects arguments; spread expands iterables or copies enumerable own object properties.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-016.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-016.e01 | Rest collection and iterable expansion | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-016.e02 | Shallow spread and nested correction | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Spread costs time proportional to copied entries and only copies one level.

### javascript-017

Destructuring extracts fields or positions and applies defaults only for undefined values.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-017.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-017.e01 | Rename fields and gather remaining properties | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-017.e02 | Undefined defaults differ from null | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Rest properties copy remaining own enumerable properties and can add allocation.

### javascript-018

Template literals interpolate expressions and preserve literal newlines; tagged templates receive raw string segments.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-018.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-018.e01 | Interpolate user text safely | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-018.e02 | Tagged template receives segments and values | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Tags can implement escaping policies, but template literals alone provide none.

### javascript-019

Optional chaining stops on null or undefined; it does not validate arbitrary runtime shapes.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-019.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-019.e01 | Missing nested fields | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-019.e02 | Falsy values are preserved | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: A missing intermediate value yields undefined without evaluating the rest of that chain.

### javascript-020

Nullish coalescing chooses the fallback only for null or undefined, preserving zero, false and empty text.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-020.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-020.e01 | Compare logical and nullish defaults | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-020.e02 | Lazy fallback evaluation | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: ?? does not evaluate its right-hand side when the left side is present.

### javascript-021

Closures retain access to their defining lexical bindings after the outer call has returned.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-021.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-021.e01 | Independent counter factories | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-021.e02 | Shared binding across two callbacks | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-021.e03 | Stale snapshot versus live read | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-021.e04 | Loop binding bug and block-scoped fix | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-021.e05 | Function factory retains a configuration | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Each factory call creates an independent environment; closures can also intentionally share one environment.

### javascript-022

A lexical environment associates identifiers with bindings and an outer environment reference.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-022.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-022.e01 | Nearest binding wins | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-022.e02 | Mutation of a retained binding | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Environment records are conceptual specification machinery, not objects application code can enumerate.

### javascript-023

Each function call creates an execution context; contexts run on a stack until returning or throwing.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-023.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-023.e01 | Enter and leave nested calls | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-023.e02 | Unwind through finally | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: A trace shows observable call order rather than exposing engine-private context objects.

### javascript-024

The call stack tracks active synchronous calls. Deep recursion consumes stack frames; iteration avoids that growth.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-024.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-024.e01 | Bounded recursive stack trace | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-024.e02 | Iterative equivalent uses no recursive calls | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Recursion can be clear, but JavaScript engines do not offer a portable unlimited recursion depth.

### javascript-025

Ordinary functions get this from their call form; arrows retain lexical this. Modules execute in strict mode.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-025.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-025.e01 | Detached method failure and bind fix | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-025.e02 | Receiver chosen at call time | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Binding creates a new function identity, which matters for listener cleanup.

### javascript-026

call and apply invoke with an explicit receiver; bind creates a callable with receiver and optional arguments fixed.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-026.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-026.e01 | call versus apply argument shapes | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-026.e02 | Partial arguments and fixed receiver | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Bound function identity differs from the original, so retain it when removing listeners.

### javascript-027

Property lookup checks an object’s own properties before following its prototype chain.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-027.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-027.e01 | Shadow and reveal an inherited value | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-027.e02 | Own keys exclude prototype fields | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Prototype methods can be shared across instances without copying functions.

### javascript-028

Prototypal inheritance delegates property lookup to another object; class extends builds on that mechanism.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-028.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-028.e01 | Delegate to an object prototype | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-028.e02 | Override with super | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Inherited behavior is shared; mutations to a shared prototype can affect every descendant.

### javascript-029

Classes define constructors, instance fields and prototype methods. JavaScript private fields enforce runtime access.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-029.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-029.e01 | Shared method, independent fields | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-029.e02 | Private state and serialization boundary | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Class method functions are shared; per-instance fields have separate storage.

### javascript-030

Object helpers enumerate, copy, freeze and describe properties with different ownership and descriptor rules.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-030.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-030.e01 | assign reads a getter value | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-030.e02 | Preserve descriptors | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Value copying invokes getters; descriptor copying retains accessors and their behavior.

### javascript-031

A shallow copy creates a new outer container while retaining references to nested values.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-031.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-031.e01 | Array copy still shares objects | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-031.e02 | Copy the modified path | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Shallow copies are cheaper than copying the entire graph but require deliberate ownership.

### javascript-032

Deep copying duplicates supported reachable data; structuredClone supports cycles and several built-in data types.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-032.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-032.e01 | Nested independence | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-032.e02 | Date and cycle behavior | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Deep copying takes time and memory proportional to the cloned graph and does not preserve arbitrary class behavior.

### javascript-033

Object references identify allocations, not object contents. Equal-looking objects can be different Map keys.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-033.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-033.e01 | Equal values, different identities | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-033.e02 | Object keys in Map | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Identity comparisons are cheap; structural comparison needs a defined algorithm and can be expensive.

### javascript-034

Immutable updates produce new values while preserving the previous observable data. Object.freeze is shallow.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-034.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-034.e01 | Immutable path update | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-034.e02 | Shallow freeze and deeper protection | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Copying every level costs allocations; structural sharing copies only changed paths.

### javascript-035

Currying turns a multi-argument function into a chain of single-argument functions.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-035.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-035.e01 | Curried addition | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-035.e02 | Specialize a formatter | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Currying creates closures; partial application and currying are related but distinct.

### javascript-036

A higher-order function accepts functions, returns functions, or both.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-036.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-036.e01 | Inject a transformation | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-036.e02 | Wrapper forwards arguments and return value | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Composition improves reuse but adds indirection that should remain readable.

### javascript-037

A pure function returns the same result for the same inputs and has no externally observable side effects.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-037.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-037.e01 | Pure transformation preserves its input | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-037.e02 | Mutation bug versus copied sort | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Pure functions can be cached by stable inputs; allocating copies has a cost.

### javascript-038

Function composition connects the output of one operation to the input of another. Order changes behavior.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-038.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-038.e01 | Composition order changes the result | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-038.e02 | Left-to-right pipeline | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Composed pure operations can be reused, but intermediate allocations can matter on large data.

### javascript-039

Debouncing delays a callback until a quiet period has elapsed, replacing earlier scheduled calls.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-039.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-039.e01 | Trailing debounce keeps only the last call | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-039.e02 | Cancel pending debounce | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Trailing debounce improves burst efficiency while deliberately adding latency.

### javascript-040

Throttling limits callback execution frequency. This implementation runs on the leading edge and has no trailing call.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-040.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-040.e01 | Leading throttle drops a burst | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-040.e02 | A later window can execute again | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Throttle preserves periodic responsiveness while dropping intermediate work.

### javascript-041

Memoization reuses a function result for a previously seen key, trading memory for repeated-work savings.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-041.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-041.e01 | Repeated inputs skip computation | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-041.e02 | Falsy cache bug and has fix | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Cache key design must reflect every dependency; otherwise cached answers become stale.

### javascript-042

Generators suspend execution at yield and implement the iterator protocol; iteration requests values lazily.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-042.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-042.e01 | Lazy next calls | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-042.e02 | Early loop break closes a generator | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Laziness avoids materializing a full list, but each next resumes generator execution.

### javascript-043

map transforms each present array element and returns a new array.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-043.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-043.e01 | Transform numeric input | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-043.e02 | Missing callback return and correction | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: map is O(n) time and O(n) output space and skips sparse holes.

### javascript-044

filter keeps elements whose predicate result is truthy without transforming their values.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-044.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-044.e01 | Select even numbers | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-044.e02 | Truthiness filter drops valid values | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: filter is O(n) and allocates an output list while retaining original object references.

### javascript-045

reduce folds a sequence into an accumulator, using the initial value when provided.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-045.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-045.e01 | Accumulate a sum | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-045.e02 | Empty reduction error and identity fix | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: A reducer can be O(n), but repeatedly spreading a growing accumulator can make it O(n²).

### javascript-046

forEach visits present elements for side effects and returns undefined; it does not collect callback results.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-046.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-046.e01 | Collect observed side effects | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-046.e02 | Transform with map instead | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: forEach cannot be broken with return; a for-of loop offers normal control flow.

### javascript-047

find returns the first matching value or undefined; findIndex returns its index or -1.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-047.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-047.e01 | First match and absent result | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-047.e02 | Index zero is a valid match | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Early termination is O(k) for the visited prefix and O(n) in the worst case.

### javascript-048

some answers whether at least one element satisfies a predicate and short-circuits on the first success.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-048.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-048.e01 | Existence with early exit | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-048.e02 | Empty list and corrected nonempty rule | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: some short-circuits and uses constant auxiliary space.

### javascript-049

every answers whether all visited elements satisfy a predicate; an empty list returns true.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-049.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-049.e01 | Stop on the first failure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-049.e02 | Vacuous truth and a nonempty guard | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: every short-circuits at the first failure and has constant auxiliary space.

### javascript-050

sort mutates an array and defaults to string comparison; numeric sorting requires a comparator.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-050.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-050.e01 | Default order versus numeric order | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-050.e02 | Stable ties and a secondary key | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Common sorting implementations are O(n log n); comparator correctness matters more than assuming a particular engine algorithm.

### javascript-051

flat returns a new array flattened to a specified depth and removes holes at flattened levels.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-051.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-051.e01 | One level versus complete known nesting | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-051.e02 | Sparse holes are skipped | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Flattening visits produced entries and allocates a new outer array.

### javascript-052

flatMap maps each present element and flattens each returned array one level.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-052.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-052.e01 | Split text into words | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-052.e02 | Filter and expand while respecting one-level depth | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: flatMap can avoid a separate mapped-array pass, though output allocation remains.

### javascript-053

Object.keys returns own enumerable string property names in specified key order.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-053.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-053.e01 | Numeric key ordering | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-053.e02 | Ownership and enumerability | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Integer-index keys precede other string keys; insertion order is not the whole ordering rule.

### javascript-054

Object.values returns values of own enumerable string-keyed properties.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-054.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-054.e01 | Sum a numeric record | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-054.e02 | Non-enumerable values are absent | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Enumeration allocates a new array and follows the same key ordering as Object.keys.

### javascript-055

Object.entries returns own enumerable string-key/value pairs; fromEntries builds a record from pairs.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-055.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-055.e01 | Transform record values | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-055.e02 | Duplicate keys overwrite | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: fromEntries uses the last value for a repeated key.

### javascript-056

Map stores ordered key/value entries with keys of any supported value type and identity-based object keys.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-056.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-056.e01 | Object identity and iteration order | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-056.e02 | Missing versus stored undefined | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Map avoids prototype-key collisions but still needs a cache size/eviction policy for long-lived use.

### javascript-057

Set stores unique values using SameValueZero equality; objects are unique by identity.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-057.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-057.e01 | Deduplicate primitives | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-057.e02 | Object identity versus ID-based deduplication | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Set membership is typically sublinear; specification guarantees average sublinear access rather than a fixed hash implementation.

### javascript-058

WeakMap associates metadata with weakly held object keys without exposing key enumeration or size.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-058.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-058.e01 | Attach and delete metadata | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-058.e02 | Primitive key rejection and non-enumerability | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Weak references help ownership but do not prove an object has been collected.

### javascript-059

WeakSet tracks weakly held object membership without enumeration or a public size.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-059.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-059.e01 | Track membership by object identity | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-059.e02 | Reject string members | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Weak collection behavior does not make explicit listener or timer cleanup unnecessary.

### javascript-060

Grouping partitions records into buckets selected by a key function.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-060.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-060.e01 | Group records using Map | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-060.e02 | Prototype-looking keys are safe Map keys | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: One-pass grouping is O(n) time with output space proportional to grouped records.

### javascript-061

Transformations reshape data while preserving the information and identity rules required by the next consumer.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-061.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-061.e01 | Normalize by stable ID | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-061.e02 | Detect duplicate IDs instead of silently losing rows | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Index building is O(n); repeated lookups can then avoid rescanning the original list.

### javascript-062

Synchronous code runs to completion in the current task; asynchronous callbacks resume later through scheduled work.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-062.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-062.e01 | Synchronous prefix, asynchronous continuation | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-062.e02 | Await the value before consuming it | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Asynchronous waiting does not itself parallelize CPU-heavy JavaScript on the main thread.

### javascript-063

Callbacks supply behavior for another operation to invoke. Their timing is part of the receiving API’s contract.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-063.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-063.e01 | Synchronous callback invocation | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-063.e02 | Asynchronous callback timing | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: A callback is a function value; scheduling behavior belongs to the API invoking it.

### javascript-064

Nested asynchronous callbacks can obscure sequencing, error propagation and cleanup. Promises make those contracts composable.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-064.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-064.e01 | Nested callback stages execute in dependency order | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-064.e02 | Flatten dependent stages with await | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Promises improve composition without making dependent operations concurrent.

### javascript-065

A Promise represents one eventual settlement. Its executor runs synchronously; reactions run as microtasks.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-065.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-065.e01 | Executor is synchronous; reactions are deferred | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-065.e02 | Only the first settlement counts | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-065.e03 | Catch recovers with a returned value | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-065.e04 | Finally preserves fulfillment | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-065.e05 | Resolution adopts a thenable | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Settled state is immutable, but promises do not automatically cancel the underlying work.

### javascript-066

Each then returns a new promise whose result depends on the handler’s return value, returned promise or thrown error.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-066.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-066.e01 | Transform through a chain | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-066.e02 | Missing return versus returned value | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-066.e03 | Throw propagates to catch | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-066.e04 | Returned promise is adopted | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-066.e05 | Throwing in finally replaces the previous result | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: A returned promise is flattened into the chain; finally is for cleanup and catch can recover.

### javascript-067

An async function always returns a promise; await pauses that function until the awaited value settles.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-067.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-067.e01 | Async return and await | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-067.e02 | Async throw is a rejected promise | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: await suspends the async function, not the whole browser thread.

### javascript-068

Promise.all fulfills with results in input order when every input fulfills and rejects on the first observed rejection.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-068.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-068.e01 | Input order survives opposite completion order | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-068.e02 | Reject when any required input fails | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-068.e03 | Non-promise inputs are accepted | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-068.e04 | Empty input fulfills with an empty array | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-068.e05 | Rejected all does not cancel another task | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Results preserve input order, not completion order; all has no built-in concurrency limit.

### javascript-069

Promise.allSettled waits for every input and returns fulfillment/rejection records in input order.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-069.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-069.e01 | Mixed outcomes retain individual status | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-069.e02 | Input order is stable | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-069.e03 | Empty input | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-069.e04 | Plain values produce fulfilled records | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-069.e05 | Retry only rejected work | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: It waits for the slowest operation and does not itself retry or limit concurrency.

### javascript-070

Promise.race adopts the first input to settle, whether fulfillment or rejection. Empty input remains pending.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-070.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-070.e01 | First settlement wins | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-070.e02 | An early rejection wins too | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-070.e03 | Already fulfilled inputs use reaction order | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-070.e04 | Empty race stays pending without awaiting forever | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-070.e05 | The losing task still runs | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Timeout races need timer cleanup and often AbortController for underlying I/O.

### javascript-071

Promise.any fulfills with the first fulfillment and rejects with AggregateError only if every input rejects.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-071.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-071.e01 | Ignore early rejection and use a success | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-071.e02 | All failures produce ordered AggregateError reasons | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-071.e03 | Empty input rejects with no reasons | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-071.e04 | Plain values count as fulfillment | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-071.e05 | Losing operations continue | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: AggregateError.errors follows input order; underlying operations are not automatically cancelled.

### javascript-072

Error handling follows synchronous throws and promise rejection paths; try/catch only covers awaited asynchronous work.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-072.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-072.e01 | Parse failure becomes a controlled error result | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-072.e02 | Awaited rejection and finally cleanup | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: finally should release resources; a thrown cleanup error can replace the original failure.

### javascript-073

The browser event loop runs tasks to completion and drains queued microtasks at checkpoints before the next task.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-073.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-073.e01 | Synchronous work, promise reaction, timer | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-073.e02 | Nested microtasks join the same checkpoint | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-073.e03 | await schedules a continuation | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-073.e04 | Microtasks between timer tasks | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-073.e05 | Bounded synchronous work runs before reactions | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Browser ordering is distinct from Node-specific phases; rendering timing is not inferred from these traces.

### javascript-074

Promise reactions and queueMicrotask callbacks share microtask ordering; timers schedule later tasks.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-074.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-074.e01 | Registration order across promise and queueMicrotask | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-074.e02 | Nested microtasks drain before a timer | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Microtasks are not an alternative worker thread.

### javascript-075

Timers schedule future callbacks after a minimum delay; interval callbacks repeat until cancelled.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-075.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-075.e01 | Cancelled timeout does not publish | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-075.e02 | Bounded interval stops after three ticks | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Busy event loops delay timers; requested delays are lower bounds rather than exact deadlines.

### javascript-076

Queue order depends on the current task, the order reactions become ready and the microtask checkpoint.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-076.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-076.e01 | Promise chain interleaves with another microtask | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-076.e02 | Async function returns before its continuation | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Registration order applies to ready microtasks, not to arbitrary network completion order.

### javascript-077

fetch performs a real request and fulfills with a Response even for HTTP error statuses; body parsing is another asynchronous step.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-077.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-077.e01 | Fetch and validate actual Express data | Browser + real Express HTTP | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-077.e02 | HTTP failure still returns a Response | Browser + real Express HTTP | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Requests need cancellation, bounds and a clear server contract.

### javascript-078

AbortController signals cancellation to supported APIs such as fetch. It does not automatically undo completed side effects.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-078.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-078.e01 | An already-aborted signal rejects fetch | Browser + real Express HTTP | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-078.e02 | Cancel an in-flight delayed request | Browser + real Express HTTP | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Cancellation can stop waiting/transport work while a server may already have begun processing.

### javascript-079

A race condition occurs when final state depends on completion order instead of the intended request ordering.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-079.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-079.e01 | Controlled stale overwrite and generation-token fix | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-079.e02 | Abort obsolete HTTP work and keep the fresh result | Browser + real Express HTTP | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Tokens protect commits even when work cannot be cancelled; cancellation additionally saves resources.

### javascript-080

Concurrency overlaps waiting operations; a pool limits how many are active at once. It is distinct from CPU parallelism.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-080.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-080.e01 | Serial awaiting versus concurrent start | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-080.e02 | A two-worker pool bounds active tasks | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: A smaller pool reduces load but can increase total waiting time.

### javascript-081

DOM APIs create and update real document nodes. textContent displays text without interpreting markup.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-081.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-081.e01 | Create a real text node | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-081.e02 | Append and remove owned nodes | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Manual DOM mutation should stay inside an owned region, especially when React manages the surrounding UI.

### javascript-082

A bubbling event travels from its target through ancestor listeners after the target phase.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-082.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-082.e01 | Target then ancestor bubble listener | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-082.e02 | Origin versus listener owner | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Only events configured to bubble reach ancestor bubble listeners.

### javascript-083

Capture listeners run on ancestors before the target; target and bubble phases follow.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-083.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-083.e01 | Capture, target and bubble phases | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-083.e02 | Capture and bubble listeners on the target | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: At the target, both capture and bubble listeners report AT_TARGET rather than an ancestor phase.

### javascript-084

Event delegation uses an ancestor listener to handle events from current and future descendants.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-084.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-084.e01 | Delegate to a dynamically added child | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-084.e02 | Nested target requires closest | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: One listener reduces per-item registration but relies on bubbling and correct target filtering.

### javascript-085

preventDefault cancels a cancelable event’s default action; it does not stop propagation.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-085.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-085.e01 | Cancel a real anchor event without navigation | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-085.e02 | Noncancelable event ignores preventDefault | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Passive listeners cannot cancel a default action.

### javascript-086

stopPropagation prevents travel to later nodes; stopImmediatePropagation also stops later listeners on the current node.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-086.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-086.e01 | Stop bubbling after the target | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-086.e02 | Same-node listener behavior differs | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Stopping propagation does not cancel a default action.

### javascript-087

localStorage stores origin-scoped strings across page sessions until removed or cleared.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-087.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-087.e01 | Round-trip a serialized value in real localStorage | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-087.e02 | Remove an owned key explicitly | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Storage is synchronous and shared by origin, not by application port or component; these runs restore only their own lab key.

### javascript-088

sessionStorage stores strings within an origin and top-level browsing context for that tab session.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-088.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-088.e01 | Tab-session value is still a string | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-088.e02 | Local and session stores are separate | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: It survives reload within the session; a newly opened tab may start with a copy from an opener before diverging.

### javascript-089

Cookies are path/domain-scoped browser state sent with matching requests; script-visible cookies are distinct from HttpOnly cookies.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-089.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-089.e01 | Encode and read an owned cookie | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-089.e02 | Delete with matching path | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: JavaScript cannot create HttpOnly cookies; secure authentication belongs to the later server-auth phase.

### javascript-090

Browser events notify listeners about user or programmatic actions. Setting a property does not necessarily dispatch its corresponding event.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-090.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-090.e01 | Property assignment versus input event | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-090.e02 | Custom event carries detail | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Synthetic events are not trusted user activation and cannot bypass browser permissions.

### javascript-091

Garbage collectors reclaim unreachable allocations according to engine policy. Reachability can be reasoned about, but collection timing is not deterministic.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-091.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-091.e01 | A strong container retains an object until removal | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-091.e02 | WeakRef is kept alive within the current job | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: The lab observes references and WeakRef’s same-job guarantee; it never fabricates heap counts or forces GC.

### javascript-092

A memory leak is unintended retention of objects or ongoing work beyond their useful owner lifetime.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-092.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-092.e01 | Orphaned callback and explicit removal | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-092.e02 | Bounded cache retention and release | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: This bounded experiment proves callbacks and entries remain retained, not a precise engine heap-size change.

### javascript-093

String reversal depends on whether the unit is a UTF-16 code unit, a Unicode code point or a grapheme cluster.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-093.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-093.e01 | Reverse by Unicode code points | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-093.e02 | Expose the UTF-16 split bug | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Code-point reversal is O(n) time and O(n) space; grapheme-aware requirements need Intl.Segmenter.

### javascript-094

A palindrome reads identically in both directions under a chosen normalization rule.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-094.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-094.e01 | Normalized reverse comparison | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-094.e02 | Literal bug versus two-pointer normalized scan | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: The normalized reverse method is O(n) time/space; two-pointer comparison itself is O(1) extra space after normalization.

### javascript-095

Factorial multiplies positive integers up to n, with 0! equal to one. BigInt avoids Number precision loss.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-095.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-095.e01 | Iterative exact factorial | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-095.e02 | Recursive base case | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Iteration is O(n) multiplications and O(1) auxiliary slots; recursion adds O(n) stack space. BigInt operation cost grows with result size.

### javascript-096

Fibonacci uses F(0)=0, F(1)=1 and F(n)=F(n−1)+F(n−2).

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-096.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-096.e01 | Iterative nth Fibonacci | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-096.e02 | Memoized recursion computes each subproblem once | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Iteration takes O(n) time and O(1) auxiliary space; memoized recursion takes O(n) time and O(n) cache/stack space for these bounded Number inputs.

### javascript-097

A prime is an integer greater than one with no positive divisors other than one and itself.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-097.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-097.e01 | Bounded trial division | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-097.e02 | Sieve generates every prime up to a bound | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Trial division is O(√n) time/O(1) auxiliary space; the sieve uses O(n log log n) time/O(n) space for all primes up to n.

### javascript-098

Deduplication retains one representative per equality rule while optionally preserving first-occurrence order.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-098.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-098.e01 | Ordered Set solution | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-098.e02 | Alternative filter and first-index solution | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Set-based output is typically O(n) time/O(n) space; filter/indexOf is O(n²) time.

### javascript-099

Finding duplicates requires distinguishing repeated values from a list of unique representatives.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-099.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-099.e01 | Unique repeated values | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-099.e02 | Frequency-based duplicate report | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: A Set/Map pass is typically O(n) time and O(n) space; output ordering follows the chosen insertion policy.

### javascript-100

Two Sum finds two distinct positions whose values add to a target. The examples use target 9.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-100.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-100.e01 | Single-pass complement map | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-100.e02 | Brute-force distinct pairs | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: The map solution is typically O(n) time/O(n) space; brute force is O(n²) time/O(1) auxiliary space.

### javascript-101

Anagrams contain equal character multiplicities under a defined normalization rule.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-101.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-101.e01 | Sorted normalized comparison | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-101.e02 | Set-only bug versus frequency-map fix | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Sorting is O(n log n) time/O(n) space; frequency counting is typically O(n) time/O(k) space.

### javascript-102

Flattening traverses nested arrays and emits their leaf values in order.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-102.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-102.e01 | Bounded recursive traversal | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-102.e02 | Native flattening versus default-depth bug | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Both solutions visit O(n) nodes and allocate O(n) output; recursion uses O(depth) stack space.

### javascript-103

Grouping objects accumulates records under a selected domain key without losing records.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-103.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-103.e01 | Group objects without overwriting members | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-103.e02 | Index overwrite versus grouped values | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Map grouping is typically O(n) time/O(n) space; repeated array spreading can add copying cost.

### javascript-104

Object sorting needs a comparator over selected fields and a defined policy for ties and mutation.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-104.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-104.e01 | Sort a copy by score with a tie-breaker | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-104.e02 | Descending validated ISO dates | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Sorting commonly takes O(n log n) comparisons and a copied input adds O(n) container space.

### javascript-105

The missing-number problem assumes n distinct values from 0 through n with exactly one omitted value.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-105.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-105.e01 | Validated arithmetic sum | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-105.e02 | XOR alternative after the same validation | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Sum and XOR scans are O(n) time; validation here uses O(n) Set space. XOR is safe here because the UI bounds the domain to at most 30.

### javascript-106

Second-largest means the second distinct numeric value, with no answer when fewer than two distinct values exist.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-106.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-106.e01 | One-pass distinct maxima | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-106.e02 | Set and sort alternative, including missing answers | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: One pass takes O(n) time/O(1) auxiliary space; sorting distinct values costs O(n log n) time/O(n) space.

### javascript-107

Character frequency counts code-point occurrences under an explicit case and normalization policy.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-107.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-107.e01 | Count Unicode code points | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-107.e02 | Case-sensitive versus normalized counts | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: The scan is O(n) time/O(k) space; code-point counts still differ from grapheme-cluster counts.

### javascript-108

A deep clone must define supported types and preserve repeated-reference/cycle relationships when required.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-108.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-108.e01 | Custom clone preserves a cycle and separates nested data | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-108.e02 | Reject unsupported classes; use the native clone for Date | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: The plain-data helper is O(n) time/space with O(depth) stack; UI inputs are bounded and richer objects are rejected.

### javascript-109

A debounce implementation owns one replaceable timeout and exposes cancellation.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-109.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-109.e01 | Implement trailing input coalescing | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-109.e02 | Dispose before publishing | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Each call is O(1); one pending handle is O(1) retained state, excluding captured input.

### javascript-110

A leading throttle owns a time-window lock and suppresses calls until its timer releases the lock.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-110.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-110.e01 | Implement leading update suppression | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-110.e02 | Cancellation releases the throttle lock | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Calls and retained lock state are O(1); throttling does not make the callback itself cheaper.

### javascript-111

A memoization implementation caches results under a key that represents every relevant argument.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-111.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-111.e01 | Compute once per numeric key | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-111.e02 | Ambiguous key bug versus tuple encoding | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Typical lookups are sublinear; cache space is O(k), so production caches need eviction.

### javascript-112

A Promise.all-like implementation must assimilate inputs, preserve input order, reject failures and handle empty iteration.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-112.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-112.e01 | Preserve positions despite reverse completion | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-112.e02 | Propagate rejection | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-112.e03 | Resolve empty input | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-112.e04 | Assimilate a thenable | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-112.e05 | An iterator failure rejects the result | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: This implementation is O(n) coordination time/space and does not cancel or limit underlying work.

### javascript-113

Custom map/filter/reduce loops demonstrate indexing, sparse holes, output allocation and accumulation.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-113.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-113.e01 | Map, filter and reduce implementations | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-113.e02 | Sparse and empty edge cases | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Each helper is O(n); map/filter allocate O(n) output and reduce uses O(1) auxiliary state. This reduce deliberately requires an initial value.

### javascript-114

Output prediction combines lexical bindings, synchronous execution and queued continuations.

Source: [actual TypeScript implementation](../client/src/modules/javascript/javascript-114.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| javascript-114.e01 | var loop read after microtasks | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-114.e02 | let loop isolates the captured value | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-114.e03 | Mutation before a queued read | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-114.e04 | Async forEach returns before work completes | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| javascript-114.e05 | Nested call, microtask and timer trace | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: These bounded browser experiments do not imply Node phase ordering or exact timer latency.

### typescript-001

Type annotations constrain permitted values before execution; JavaScript values still have runtime types.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-001.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-001.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-001.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Type checking catches incompatible assignments but types are erased from emitted JavaScript.

### typescript-002

Inference derives a type from an initializer and surrounding context without writing an annotation.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-002.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-002.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2345; source hash matches. | APPROVED_COMPLETE |
| typescript-002.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Inference is compile-time reasoning; it does not add runtime collection checks.

### typescript-003

Interfaces describe structural object contracts and can be extended or declaration-merged.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-003.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-003.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2741; source hash matches. | APPROVED_COMPLETE |
| typescript-003.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Structural compatibility accepts variables with additional fields, while fresh object literals undergo excess-property checks.

### typescript-004

Type aliases name arbitrary types, including unions, tuples and object shapes.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-004.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-004.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-004.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Aliases cannot be reopened through declaration merging like interfaces, but can describe more than object shapes.

### typescript-005

A union permits a value from any member type; operations must be safe for the currently narrowed member.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-005.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-005.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2339; source hash matches. | APPROVED_COMPLETE |
| typescript-005.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Narrowing improves precision without changing the actual JavaScript representation.

### typescript-006

Intersection types require all member contracts simultaneously rather than choosing one alternative.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-006.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-006.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-006.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Intersections describe constraints; they do not merge objects at runtime.

### typescript-007

Literal types restrict a value to exact strings, numbers or booleans; const assertions preserve narrow values.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-007.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-007.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2820; source hash matches. | APPROVED_COMPLETE |
| typescript-007.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Literal restrictions disappear at runtime; network values remain untrusted.

### typescript-008

Optional properties may be absent; a read must account for undefined. Exact optional property rules can distinguish absence from explicit undefined.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-008.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-008.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 18048; source hash matches. | APPROVED_COMPLETE |
| typescript-008.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: The fixture compiler enables strict checking and exactOptionalPropertyTypes.

### typescript-009

Readonly properties prevent assignments through that typed reference, but do not inherently freeze runtime objects or nested values.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-009.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-009.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2540; source hash matches. | APPROVED_COMPLETE |
| typescript-009.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Readonly is shallow unless deeper types are constructed; Object.freeze is also shallow.

### typescript-010

Arrays describe collections of elements; tuples describe a fixed or patterned positional contract.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-010.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-010.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322, 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-010.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: noUncheckedIndexedAccess adds undefined to unchecked array reads; it does not add runtime bounds checks.

### typescript-011

Enums emit runtime mappings; a const object plus a literal union can provide an alternative without enum reverse mappings.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-011.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-011.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-011.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Numeric enums emit reverse names; const objects have only the properties explicitly supplied.

### typescript-012

Function signatures describe parameter, optional/rest and return contracts checked at call sites.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-012.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-012.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2345; source hash matches. | APPROVED_COMPLETE |
| typescript-012.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Signatures are erased, so runtime validation is still needed for untyped callers.

### typescript-013

Overload signatures describe permitted call/result relationships while one implementation handles all supported cases.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-013.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-013.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2769; source hash matches. | APPROVED_COMPLETE |
| typescript-013.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: A simpler union signature is preferable when callers do not need correlated return types.

### typescript-014

Generics preserve relationships between input and output types rather than erasing them to any.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-014.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-014.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-014.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Generics provide compile-time reuse; they do not instantiate new runtime code per type argument.

### typescript-015

Generic constraints require a type argument to support the operations used by the implementation.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-015.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-015.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2345; source hash matches. | APPROVED_COMPLETE |
| typescript-015.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Constraints restrict accepted types; they do not generate or validate properties at runtime.

### typescript-016

keyof creates the union of a type’s permitted property keys and can constrain safe generic access.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-016.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-016.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2345; source hash matches. | APPROVED_COMPLETE |
| typescript-016.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: keyof is a compile-time union; Object.keys supplies actual runtime keys and can have wider ownership considerations.

### typescript-017

In a type position typeof derives a type from a value declaration; runtime typeof returns broad JavaScript category strings.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-017.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-017.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-017.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: A type query is erased; the runtime operator still follows JavaScript rules.

### typescript-018

Indexed access types extract a property or element type from another type.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-018.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-018.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-018.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Type-level lookup cannot guarantee an external object actually has that field.

### typescript-019

Mapped types transform properties over a key union, optionally adding or removing readonly/optional modifiers.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-019.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-019.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-019.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Mapped types stay synchronized at compile time but runtime key enumeration still requires real values.

### typescript-020

Conditional types select a type based on assignability, and infer can extract a component type.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-020.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-020.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-020.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Distributive conditional types operate across naked type-parameter unions; tuple-wrapping can disable distribution.

### typescript-021

Utility types derive common contracts such as subsets, optional updates, required fields and function results.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-021.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-021.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2339; source hash matches. | APPROVED_COMPLETE |
| typescript-021.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Utility types are erased; a runtime object can still contain additional fields through structural assignment.

### typescript-022

A type guard uses runtime checks to narrow unknown data; a user-defined predicate tells the compiler what those checks establish.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-022.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-022.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 18046; source hash matches. | APPROVED_COMPLETE |
| typescript-022.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: A precise guard is executable validation, while a predicate annotation alone can be unsound.

### typescript-023

Control-flow narrowing refines a union after runtime checks and assignments. Truthiness is only one possible check.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-023.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-023.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2339; source hash matches. | APPROVED_COMPLETE |
| typescript-023.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Narrowing follows code paths, not a permanent mutation of the declared variable type.

### typescript-024

A discriminated union uses a shared literal field to select a specific payload shape.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-024.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-024.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2339; source hash matches. | APPROVED_COMPLETE |
| typescript-024.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: An assertNever boundary catches missing cases at compile time but external state still needs runtime validation.

### typescript-025

unknown requires narrowing before use, any opts out of checking, and never represents an unreachable value set.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-025.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-025.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 18046; source hash matches. | APPROVED_COMPLETE |
| typescript-025.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: any can propagate unchecked operations. unknown preserves the need for validation.

### typescript-026

A type assertion changes the compiler’s view but performs no runtime validation or conversion. Assertion functions can combine checks with narrowing.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-026.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-026.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-026.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Assertions are erased and can create false confidence without executable evidence.

### typescript-027

TypeScript private/protected modifiers constrain typed access; JavaScript #private fields additionally enforce runtime privacy.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-027.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-027.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2341; source hash matches. | APPROVED_COMPLETE |
| typescript-027.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Protected permits subclass access in typed code; public/private keywords do not by themselves rewrite ordinary property storage.

### typescript-028

Promise<T> describes a future fulfillment value and Awaited<T> unwraps promise-like types. Rejection reasons are not encoded as a second Promise type parameter.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-028.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-028.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-028.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |
| typescript-028.e03 | Catch variables are unknown | TypeScript compiler | Positive program passes; actual negative diagnostics: 18046; source hash matches. | APPROVED_COMPLETE |
| typescript-028.e04 | Generic asynchronous result preservation | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-028.e05 | Promise.all tuple inference | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322, 2322; source hash matches. | APPROVED_COMPLETE |

Constraints / complexity: Async typing models fulfillment relationships; runtime rejection handling and cancellation remain separate.

### typescript-029

API response types describe the expected contract; discriminants narrow success/error variants and runtime validation establishes trust.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-029.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-029.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2339; source hash matches. | APPROVED_COMPLETE |
| typescript-029.e02 | Runtime behavior after type erasure | Browser + real Express HTTP | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Shared types reduce drift but cannot validate remote data or replace HTTP status handling.

### typescript-030

React prop, event and hook types describe component boundaries and state updates without changing React’s runtime behavior.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-030.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-030.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2345; source hash matches. | APPROVED_COMPLETE |
| typescript-030.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: The compile fixture imports real React types and is never mounted or executed as a browser demo.

### typescript-031

Redux RootState and AppDispatch should be derived from the actual store; typed hooks preserve those contracts.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-031.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-031.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2345; source hash matches. | APPROVED_COMPLETE |
| typescript-031.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: The small local store here demonstrates TypeScript integration only; full Redux behavior and RTK Query remain Phase 5 topics.

### typescript-032

Express RequestHandler generics model parameters, response bodies, request bodies and query shapes. They do not validate incoming HTTP values.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-032.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-032.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-032.e02 | Runtime behavior after type erasure | Browser + real Express HTTP | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: The compile fixture uses actual Express types; the network example calls the real bounded lab route.

### typescript-033

Mongoose schema inference, hydrated document types and Model query types describe actual library contracts without performing a database operation.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-033.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-033.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-033.e02 | Hydrated fields and lean query inference | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |

Constraints / complexity: These are compile-only fixtures against real Mongoose. No connection or MongoDB behavior is simulated.

### typescript-034

Compile-time types check authored code, while runtime validation establishes a contract for external values.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-034.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-034.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-034.e02 | Runtime behavior after type erasure | Browser runtime | Default observed result equals the documented expected output; named test uses this example ID. | APPROVED_COMPLETE |

Constraints / complexity: Types improve development feedback; runtime guards protect real boundaries. Both are needed.

### typescript-035

TypeScript configuration selects checking, module-resolution, emit and runtime-library assumptions. Compiler options change which programs are accepted.

Source: [actual TypeScript implementation](../client/src/modules/typescript/typescript-035.ts). Six Q&A entries and the topic’s mistakes/fixes are in the same module and rendered for each example.

| Example ID | Named behavior | Environment | Verification | Status |
| --- | --- | --- | --- | --- |
| typescript-035.e01 | Compile-time contract: accepted and rejected code | TypeScript compiler | Positive program passes; actual negative diagnostics: 2322; source hash matches. | APPROVED_COMPLETE |
| typescript-035.e02 | Exact optional fields differ from explicit undefined | TypeScript compiler | Positive program passes; actual negative diagnostics: 2375; source hash matches. | APPROVED_COMPLETE |

Constraints / complexity: The actual fixture configuration is displayed with its real compiler result; enabling DOM types does not create a browser at runtime.

