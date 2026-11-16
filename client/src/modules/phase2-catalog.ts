import type { LessonSummary } from './lesson-types';

export const phase2Catalog = [
  {
    "id": "javascript-001",
    "description": "var is function-scoped; let and const are block-scoped. const prevents rebinding, not mutation.",
    "examples": [
      {
        "id": "javascript-001.e01",
        "title": "Block scope versus function scope",
        "runtime": "browser"
      },
      {
        "id": "javascript-001.e02",
        "title": "Constant binding, mutable contents",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-002",
    "description": "Scope controls where a binding can be resolved. A nearer binding shadows an outer one.",
    "examples": [
      {
        "id": "javascript-002.e01",
        "title": "Nested shadowing",
        "runtime": "browser"
      },
      {
        "id": "javascript-002.e02",
        "title": "Returning a block result",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-003",
    "description": "Lexical scope resolves identifiers from where a function is defined, not where it is called.",
    "examples": [
      {
        "id": "javascript-003.e01",
        "title": "Definition site wins",
        "runtime": "browser"
      },
      {
        "id": "javascript-003.e02",
        "title": "Explicit dependency injection",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-004",
    "description": "Declarations are instantiated before execution, but initialization rules differ between functions, var and lexical bindings.",
    "examples": [
      {
        "id": "javascript-004.e01",
        "title": "Function declaration before its line",
        "runtime": "browser"
      },
      {
        "id": "javascript-004.e02",
        "title": "var starts undefined",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-005",
    "description": "A let or const binding exists from scope entry but cannot be accessed until its initialization executes.",
    "examples": [
      {
        "id": "javascript-005.e01",
        "title": "Early closure read and corrected order",
        "runtime": "browser"
      },
      {
        "id": "javascript-005.e02",
        "title": "typeof also observes the TDZ",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-006",
    "description": "Primitive assignments copy values; object assignments copy references to the same object.",
    "examples": [
      {
        "id": "javascript-006.e01",
        "title": "Value copy and object alias",
        "runtime": "browser"
      },
      {
        "id": "javascript-006.e02",
        "title": "Separate the object before updating",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-007",
    "description": "Coercion converts values according to an operator’s rules. Addition can concatenate while multiplication requests numbers.",
    "examples": [
      {
        "id": "javascript-007.e01",
        "title": "String input through different operators",
        "runtime": "browser"
      },
      {
        "id": "javascript-007.e02",
        "title": "Whole-number conversion versus prefix parsing",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-008",
    "description": "Strict equality avoids cross-type coercion; Object.is differs for NaN and signed zero.",
    "examples": [
      {
        "id": "javascript-008.e01",
        "title": "Loose and strict comparisons",
        "runtime": "browser"
      },
      {
        "id": "javascript-008.e02",
        "title": "NaN and signed zero",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-009",
    "description": "Conditions use Boolean coercion. Empty arrays and objects are truthy, while empty text, zero, null and undefined are falsy.",
    "examples": [
      {
        "id": "javascript-009.e01",
        "title": "Inspect common values",
        "runtime": "browser"
      },
      {
        "id": "javascript-009.e02",
        "title": "Falsy default versus missing default",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-010",
    "description": "undefined usually represents an absent/uninitialized value; null is an explicit empty value. Both are nullish.",
    "examples": [
      {
        "id": "javascript-010.e01",
        "title": "Serialization treats missing and empty differently",
        "runtime": "browser"
      },
      {
        "id": "javascript-010.e02",
        "title": "Default parameter versus nullish default",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-011",
    "description": "Operators combine, compare and select values with precedence and short-circuit rules.",
    "examples": [
      {
        "id": "javascript-011.e01",
        "title": "Precedence and grouping",
        "runtime": "browser"
      },
      {
        "id": "javascript-011.e02",
        "title": "Short-circuit evaluation and operand values",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-012",
    "description": "A function packages reusable behavior with parameters, a return value and its own execution context.",
    "examples": [
      {
        "id": "javascript-012.e01",
        "title": "Parameters and returned values",
        "runtime": "browser"
      },
      {
        "id": "javascript-012.e02",
        "title": "Missing return versus explicit return",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-013",
    "description": "A function expression creates a function value during expression evaluation and can keep a private recursive name.",
    "examples": [
      {
        "id": "javascript-013.e01",
        "title": "Function expression as a callback",
        "runtime": "browser"
      },
      {
        "id": "javascript-013.e02",
        "title": "Private recursive function name",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-014",
    "description": "Arrow functions provide lexical this and expression-body syntax; they are not constructors.",
    "examples": [
      {
        "id": "javascript-014.e01",
        "title": "Expression body returns an object",
        "runtime": "browser"
      },
      {
        "id": "javascript-014.e02",
        "title": "Arrow captures this; ordinary callback accepts a receiver",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-015",
    "description": "Default parameters initialize an omitted or undefined argument at call time; null does not trigger the default.",
    "examples": [
      {
        "id": "javascript-015.e01",
        "title": "Omitted, undefined and null arguments",
        "runtime": "browser"
      },
      {
        "id": "javascript-015.e02",
        "title": "Fresh objects per default evaluation",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-016",
    "description": "Rest collects arguments; spread expands iterables or copies enumerable own object properties.",
    "examples": [
      {
        "id": "javascript-016.e01",
        "title": "Rest collection and iterable expansion",
        "runtime": "browser"
      },
      {
        "id": "javascript-016.e02",
        "title": "Shallow spread and nested correction",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-017",
    "description": "Destructuring extracts fields or positions and applies defaults only for undefined values.",
    "examples": [
      {
        "id": "javascript-017.e01",
        "title": "Rename fields and gather remaining properties",
        "runtime": "browser"
      },
      {
        "id": "javascript-017.e02",
        "title": "Undefined defaults differ from null",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-018",
    "description": "Template literals interpolate expressions and preserve literal newlines; tagged templates receive raw string segments.",
    "examples": [
      {
        "id": "javascript-018.e01",
        "title": "Interpolate user text safely",
        "runtime": "browser"
      },
      {
        "id": "javascript-018.e02",
        "title": "Tagged template receives segments and values",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-019",
    "description": "Optional chaining stops on null or undefined; it does not validate arbitrary runtime shapes.",
    "examples": [
      {
        "id": "javascript-019.e01",
        "title": "Missing nested fields",
        "runtime": "browser"
      },
      {
        "id": "javascript-019.e02",
        "title": "Falsy values are preserved",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-020",
    "description": "Nullish coalescing chooses the fallback only for null or undefined, preserving zero, false and empty text.",
    "examples": [
      {
        "id": "javascript-020.e01",
        "title": "Compare logical and nullish defaults",
        "runtime": "browser"
      },
      {
        "id": "javascript-020.e02",
        "title": "Lazy fallback evaluation",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-021",
    "description": "Closures retain access to their defining lexical bindings after the outer call has returned.",
    "examples": [
      {
        "id": "javascript-021.e01",
        "title": "Independent counter factories",
        "runtime": "browser"
      },
      {
        "id": "javascript-021.e02",
        "title": "Shared binding across two callbacks",
        "runtime": "browser"
      },
      {
        "id": "javascript-021.e03",
        "title": "Stale snapshot versus live read",
        "runtime": "browser"
      },
      {
        "id": "javascript-021.e04",
        "title": "Loop binding bug and block-scoped fix",
        "runtime": "browser"
      },
      {
        "id": "javascript-021.e05",
        "title": "Function factory retains a configuration",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-022",
    "description": "A lexical environment associates identifiers with bindings and an outer environment reference.",
    "examples": [
      {
        "id": "javascript-022.e01",
        "title": "Nearest binding wins",
        "runtime": "browser"
      },
      {
        "id": "javascript-022.e02",
        "title": "Mutation of a retained binding",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-023",
    "description": "Each function call creates an execution context; contexts run on a stack until returning or throwing.",
    "examples": [
      {
        "id": "javascript-023.e01",
        "title": "Enter and leave nested calls",
        "runtime": "browser"
      },
      {
        "id": "javascript-023.e02",
        "title": "Unwind through finally",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-024",
    "description": "The call stack tracks active synchronous calls. Deep recursion consumes stack frames; iteration avoids that growth.",
    "examples": [
      {
        "id": "javascript-024.e01",
        "title": "Bounded recursive stack trace",
        "runtime": "browser"
      },
      {
        "id": "javascript-024.e02",
        "title": "Iterative equivalent uses no recursive calls",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-025",
    "description": "Ordinary functions get this from their call form; arrows retain lexical this. Modules execute in strict mode.",
    "examples": [
      {
        "id": "javascript-025.e01",
        "title": "Detached method failure and bind fix",
        "runtime": "browser"
      },
      {
        "id": "javascript-025.e02",
        "title": "Receiver chosen at call time",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-026",
    "description": "call and apply invoke with an explicit receiver; bind creates a callable with receiver and optional arguments fixed.",
    "examples": [
      {
        "id": "javascript-026.e01",
        "title": "call versus apply argument shapes",
        "runtime": "browser"
      },
      {
        "id": "javascript-026.e02",
        "title": "Partial arguments and fixed receiver",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-027",
    "description": "Property lookup checks an object’s own properties before following its prototype chain.",
    "examples": [
      {
        "id": "javascript-027.e01",
        "title": "Shadow and reveal an inherited value",
        "runtime": "browser"
      },
      {
        "id": "javascript-027.e02",
        "title": "Own keys exclude prototype fields",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-028",
    "description": "Prototypal inheritance delegates property lookup to another object; class extends builds on that mechanism.",
    "examples": [
      {
        "id": "javascript-028.e01",
        "title": "Delegate to an object prototype",
        "runtime": "browser"
      },
      {
        "id": "javascript-028.e02",
        "title": "Override with super",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-029",
    "description": "Classes define constructors, instance fields and prototype methods. JavaScript private fields enforce runtime access.",
    "examples": [
      {
        "id": "javascript-029.e01",
        "title": "Shared method, independent fields",
        "runtime": "browser"
      },
      {
        "id": "javascript-029.e02",
        "title": "Private state and serialization boundary",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-030",
    "description": "Object helpers enumerate, copy, freeze and describe properties with different ownership and descriptor rules.",
    "examples": [
      {
        "id": "javascript-030.e01",
        "title": "assign reads a getter value",
        "runtime": "browser"
      },
      {
        "id": "javascript-030.e02",
        "title": "Preserve descriptors",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-031",
    "description": "A shallow copy creates a new outer container while retaining references to nested values.",
    "examples": [
      {
        "id": "javascript-031.e01",
        "title": "Array copy still shares objects",
        "runtime": "browser"
      },
      {
        "id": "javascript-031.e02",
        "title": "Copy the modified path",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-032",
    "description": "Deep copying duplicates supported reachable data; structuredClone supports cycles and several built-in data types.",
    "examples": [
      {
        "id": "javascript-032.e01",
        "title": "Nested independence",
        "runtime": "browser"
      },
      {
        "id": "javascript-032.e02",
        "title": "Date and cycle behavior",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-033",
    "description": "Object references identify allocations, not object contents. Equal-looking objects can be different Map keys.",
    "examples": [
      {
        "id": "javascript-033.e01",
        "title": "Equal values, different identities",
        "runtime": "browser"
      },
      {
        "id": "javascript-033.e02",
        "title": "Object keys in Map",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-034",
    "description": "Immutable updates produce new values while preserving the previous observable data. Object.freeze is shallow.",
    "examples": [
      {
        "id": "javascript-034.e01",
        "title": "Immutable path update",
        "runtime": "browser"
      },
      {
        "id": "javascript-034.e02",
        "title": "Shallow freeze and deeper protection",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-035",
    "description": "Currying turns a multi-argument function into a chain of single-argument functions.",
    "examples": [
      {
        "id": "javascript-035.e01",
        "title": "Curried addition",
        "runtime": "browser"
      },
      {
        "id": "javascript-035.e02",
        "title": "Specialize a formatter",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-036",
    "description": "A higher-order function accepts functions, returns functions, or both.",
    "examples": [
      {
        "id": "javascript-036.e01",
        "title": "Inject a transformation",
        "runtime": "browser"
      },
      {
        "id": "javascript-036.e02",
        "title": "Wrapper forwards arguments and return value",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-037",
    "description": "A pure function returns the same result for the same inputs and has no externally observable side effects.",
    "examples": [
      {
        "id": "javascript-037.e01",
        "title": "Pure transformation preserves its input",
        "runtime": "browser"
      },
      {
        "id": "javascript-037.e02",
        "title": "Mutation bug versus copied sort",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-038",
    "description": "Function composition connects the output of one operation to the input of another. Order changes behavior.",
    "examples": [
      {
        "id": "javascript-038.e01",
        "title": "Composition order changes the result",
        "runtime": "browser"
      },
      {
        "id": "javascript-038.e02",
        "title": "Left-to-right pipeline",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-039",
    "description": "Debouncing delays a callback until a quiet period has elapsed, replacing earlier scheduled calls.",
    "examples": [
      {
        "id": "javascript-039.e01",
        "title": "Trailing debounce keeps only the last call",
        "runtime": "browser"
      },
      {
        "id": "javascript-039.e02",
        "title": "Cancel pending debounce",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-040",
    "description": "Throttling limits callback execution frequency. This implementation runs on the leading edge and has no trailing call.",
    "examples": [
      {
        "id": "javascript-040.e01",
        "title": "Leading throttle drops a burst",
        "runtime": "browser"
      },
      {
        "id": "javascript-040.e02",
        "title": "A later window can execute again",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-041",
    "description": "Memoization reuses a function result for a previously seen key, trading memory for repeated-work savings.",
    "examples": [
      {
        "id": "javascript-041.e01",
        "title": "Repeated inputs skip computation",
        "runtime": "browser"
      },
      {
        "id": "javascript-041.e02",
        "title": "Falsy cache bug and has fix",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-042",
    "description": "Generators suspend execution at yield and implement the iterator protocol; iteration requests values lazily.",
    "examples": [
      {
        "id": "javascript-042.e01",
        "title": "Lazy next calls",
        "runtime": "browser"
      },
      {
        "id": "javascript-042.e02",
        "title": "Early loop break closes a generator",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-043",
    "description": "map transforms each present array element and returns a new array.",
    "examples": [
      {
        "id": "javascript-043.e01",
        "title": "Transform numeric input",
        "runtime": "browser"
      },
      {
        "id": "javascript-043.e02",
        "title": "Missing callback return and correction",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-044",
    "description": "filter keeps elements whose predicate result is truthy without transforming their values.",
    "examples": [
      {
        "id": "javascript-044.e01",
        "title": "Select even numbers",
        "runtime": "browser"
      },
      {
        "id": "javascript-044.e02",
        "title": "Truthiness filter drops valid values",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-045",
    "description": "reduce folds a sequence into an accumulator, using the initial value when provided.",
    "examples": [
      {
        "id": "javascript-045.e01",
        "title": "Accumulate a sum",
        "runtime": "browser"
      },
      {
        "id": "javascript-045.e02",
        "title": "Empty reduction error and identity fix",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-046",
    "description": "forEach visits present elements for side effects and returns undefined; it does not collect callback results.",
    "examples": [
      {
        "id": "javascript-046.e01",
        "title": "Collect observed side effects",
        "runtime": "browser"
      },
      {
        "id": "javascript-046.e02",
        "title": "Transform with map instead",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-047",
    "description": "find returns the first matching value or undefined; findIndex returns its index or -1.",
    "examples": [
      {
        "id": "javascript-047.e01",
        "title": "First match and absent result",
        "runtime": "browser"
      },
      {
        "id": "javascript-047.e02",
        "title": "Index zero is a valid match",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-048",
    "description": "some answers whether at least one element satisfies a predicate and short-circuits on the first success.",
    "examples": [
      {
        "id": "javascript-048.e01",
        "title": "Existence with early exit",
        "runtime": "browser"
      },
      {
        "id": "javascript-048.e02",
        "title": "Empty list and corrected nonempty rule",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-049",
    "description": "every answers whether all visited elements satisfy a predicate; an empty list returns true.",
    "examples": [
      {
        "id": "javascript-049.e01",
        "title": "Stop on the first failure",
        "runtime": "browser"
      },
      {
        "id": "javascript-049.e02",
        "title": "Vacuous truth and a nonempty guard",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-050",
    "description": "sort mutates an array and defaults to string comparison; numeric sorting requires a comparator.",
    "examples": [
      {
        "id": "javascript-050.e01",
        "title": "Default order versus numeric order",
        "runtime": "browser"
      },
      {
        "id": "javascript-050.e02",
        "title": "Stable ties and a secondary key",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-051",
    "description": "flat returns a new array flattened to a specified depth and removes holes at flattened levels.",
    "examples": [
      {
        "id": "javascript-051.e01",
        "title": "One level versus complete known nesting",
        "runtime": "browser"
      },
      {
        "id": "javascript-051.e02",
        "title": "Sparse holes are skipped",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-052",
    "description": "flatMap maps each present element and flattens each returned array one level.",
    "examples": [
      {
        "id": "javascript-052.e01",
        "title": "Split text into words",
        "runtime": "browser"
      },
      {
        "id": "javascript-052.e02",
        "title": "Filter and expand while respecting one-level depth",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-053",
    "description": "Object.keys returns own enumerable string property names in specified key order.",
    "examples": [
      {
        "id": "javascript-053.e01",
        "title": "Numeric key ordering",
        "runtime": "browser"
      },
      {
        "id": "javascript-053.e02",
        "title": "Ownership and enumerability",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-054",
    "description": "Object.values returns values of own enumerable string-keyed properties.",
    "examples": [
      {
        "id": "javascript-054.e01",
        "title": "Sum a numeric record",
        "runtime": "browser"
      },
      {
        "id": "javascript-054.e02",
        "title": "Non-enumerable values are absent",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-055",
    "description": "Object.entries returns own enumerable string-key/value pairs; fromEntries builds a record from pairs.",
    "examples": [
      {
        "id": "javascript-055.e01",
        "title": "Transform record values",
        "runtime": "browser"
      },
      {
        "id": "javascript-055.e02",
        "title": "Duplicate keys overwrite",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-056",
    "description": "Map stores ordered key/value entries with keys of any supported value type and identity-based object keys.",
    "examples": [
      {
        "id": "javascript-056.e01",
        "title": "Object identity and iteration order",
        "runtime": "browser"
      },
      {
        "id": "javascript-056.e02",
        "title": "Missing versus stored undefined",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-057",
    "description": "Set stores unique values using SameValueZero equality; objects are unique by identity.",
    "examples": [
      {
        "id": "javascript-057.e01",
        "title": "Deduplicate primitives",
        "runtime": "browser"
      },
      {
        "id": "javascript-057.e02",
        "title": "Object identity versus ID-based deduplication",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-058",
    "description": "WeakMap associates metadata with weakly held object keys without exposing key enumeration or size.",
    "examples": [
      {
        "id": "javascript-058.e01",
        "title": "Attach and delete metadata",
        "runtime": "browser"
      },
      {
        "id": "javascript-058.e02",
        "title": "Primitive key rejection and non-enumerability",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-059",
    "description": "WeakSet tracks weakly held object membership without enumeration or a public size.",
    "examples": [
      {
        "id": "javascript-059.e01",
        "title": "Track membership by object identity",
        "runtime": "browser"
      },
      {
        "id": "javascript-059.e02",
        "title": "Reject string members",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-060",
    "description": "Grouping partitions records into buckets selected by a key function.",
    "examples": [
      {
        "id": "javascript-060.e01",
        "title": "Group records using Map",
        "runtime": "browser"
      },
      {
        "id": "javascript-060.e02",
        "title": "Prototype-looking keys are safe Map keys",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-061",
    "description": "Transformations reshape data while preserving the information and identity rules required by the next consumer.",
    "examples": [
      {
        "id": "javascript-061.e01",
        "title": "Normalize by stable ID",
        "runtime": "browser"
      },
      {
        "id": "javascript-061.e02",
        "title": "Detect duplicate IDs instead of silently losing rows",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-062",
    "description": "Synchronous code runs to completion in the current task; asynchronous callbacks resume later through scheduled work.",
    "examples": [
      {
        "id": "javascript-062.e01",
        "title": "Synchronous prefix, asynchronous continuation",
        "runtime": "browser"
      },
      {
        "id": "javascript-062.e02",
        "title": "Await the value before consuming it",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-063",
    "description": "Callbacks supply behavior for another operation to invoke. Their timing is part of the receiving API’s contract.",
    "examples": [
      {
        "id": "javascript-063.e01",
        "title": "Synchronous callback invocation",
        "runtime": "browser"
      },
      {
        "id": "javascript-063.e02",
        "title": "Asynchronous callback timing",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-064",
    "description": "Nested asynchronous callbacks can obscure sequencing, error propagation and cleanup. Promises make those contracts composable.",
    "examples": [
      {
        "id": "javascript-064.e01",
        "title": "Nested callback stages execute in dependency order",
        "runtime": "browser"
      },
      {
        "id": "javascript-064.e02",
        "title": "Flatten dependent stages with await",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-065",
    "description": "A Promise represents one eventual settlement. Its executor runs synchronously; reactions run as microtasks.",
    "examples": [
      {
        "id": "javascript-065.e01",
        "title": "Executor is synchronous; reactions are deferred",
        "runtime": "browser"
      },
      {
        "id": "javascript-065.e02",
        "title": "Only the first settlement counts",
        "runtime": "browser"
      },
      {
        "id": "javascript-065.e03",
        "title": "Catch recovers with a returned value",
        "runtime": "browser"
      },
      {
        "id": "javascript-065.e04",
        "title": "Finally preserves fulfillment",
        "runtime": "browser"
      },
      {
        "id": "javascript-065.e05",
        "title": "Resolution adopts a thenable",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-066",
    "description": "Each then returns a new promise whose result depends on the handler’s return value, returned promise or thrown error.",
    "examples": [
      {
        "id": "javascript-066.e01",
        "title": "Transform through a chain",
        "runtime": "browser"
      },
      {
        "id": "javascript-066.e02",
        "title": "Missing return versus returned value",
        "runtime": "browser"
      },
      {
        "id": "javascript-066.e03",
        "title": "Throw propagates to catch",
        "runtime": "browser"
      },
      {
        "id": "javascript-066.e04",
        "title": "Returned promise is adopted",
        "runtime": "browser"
      },
      {
        "id": "javascript-066.e05",
        "title": "Throwing in finally replaces the previous result",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-067",
    "description": "An async function always returns a promise; await pauses that function until the awaited value settles.",
    "examples": [
      {
        "id": "javascript-067.e01",
        "title": "Async return and await",
        "runtime": "browser"
      },
      {
        "id": "javascript-067.e02",
        "title": "Async throw is a rejected promise",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-068",
    "description": "Promise.all fulfills with results in input order when every input fulfills and rejects on the first observed rejection.",
    "examples": [
      {
        "id": "javascript-068.e01",
        "title": "Input order survives opposite completion order",
        "runtime": "browser"
      },
      {
        "id": "javascript-068.e02",
        "title": "Reject when any required input fails",
        "runtime": "browser"
      },
      {
        "id": "javascript-068.e03",
        "title": "Non-promise inputs are accepted",
        "runtime": "browser"
      },
      {
        "id": "javascript-068.e04",
        "title": "Empty input fulfills with an empty array",
        "runtime": "browser"
      },
      {
        "id": "javascript-068.e05",
        "title": "Rejected all does not cancel another task",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-069",
    "description": "Promise.allSettled waits for every input and returns fulfillment/rejection records in input order.",
    "examples": [
      {
        "id": "javascript-069.e01",
        "title": "Mixed outcomes retain individual status",
        "runtime": "browser"
      },
      {
        "id": "javascript-069.e02",
        "title": "Input order is stable",
        "runtime": "browser"
      },
      {
        "id": "javascript-069.e03",
        "title": "Empty input",
        "runtime": "browser"
      },
      {
        "id": "javascript-069.e04",
        "title": "Plain values produce fulfilled records",
        "runtime": "browser"
      },
      {
        "id": "javascript-069.e05",
        "title": "Retry only rejected work",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-070",
    "description": "Promise.race adopts the first input to settle, whether fulfillment or rejection. Empty input remains pending.",
    "examples": [
      {
        "id": "javascript-070.e01",
        "title": "First settlement wins",
        "runtime": "browser"
      },
      {
        "id": "javascript-070.e02",
        "title": "An early rejection wins too",
        "runtime": "browser"
      },
      {
        "id": "javascript-070.e03",
        "title": "Already fulfilled inputs use reaction order",
        "runtime": "browser"
      },
      {
        "id": "javascript-070.e04",
        "title": "Empty race stays pending without awaiting forever",
        "runtime": "browser"
      },
      {
        "id": "javascript-070.e05",
        "title": "The losing task still runs",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-071",
    "description": "Promise.any fulfills with the first fulfillment and rejects with AggregateError only if every input rejects.",
    "examples": [
      {
        "id": "javascript-071.e01",
        "title": "Ignore early rejection and use a success",
        "runtime": "browser"
      },
      {
        "id": "javascript-071.e02",
        "title": "All failures produce ordered AggregateError reasons",
        "runtime": "browser"
      },
      {
        "id": "javascript-071.e03",
        "title": "Empty input rejects with no reasons",
        "runtime": "browser"
      },
      {
        "id": "javascript-071.e04",
        "title": "Plain values count as fulfillment",
        "runtime": "browser"
      },
      {
        "id": "javascript-071.e05",
        "title": "Losing operations continue",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-072",
    "description": "Error handling follows synchronous throws and promise rejection paths; try/catch only covers awaited asynchronous work.",
    "examples": [
      {
        "id": "javascript-072.e01",
        "title": "Parse failure becomes a controlled error result",
        "runtime": "browser"
      },
      {
        "id": "javascript-072.e02",
        "title": "Awaited rejection and finally cleanup",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-073",
    "description": "The browser event loop runs tasks to completion and drains queued microtasks at checkpoints before the next task.",
    "examples": [
      {
        "id": "javascript-073.e01",
        "title": "Synchronous work, promise reaction, timer",
        "runtime": "browser"
      },
      {
        "id": "javascript-073.e02",
        "title": "Nested microtasks join the same checkpoint",
        "runtime": "browser"
      },
      {
        "id": "javascript-073.e03",
        "title": "await schedules a continuation",
        "runtime": "browser"
      },
      {
        "id": "javascript-073.e04",
        "title": "Microtasks between timer tasks",
        "runtime": "browser"
      },
      {
        "id": "javascript-073.e05",
        "title": "Bounded synchronous work runs before reactions",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-074",
    "description": "Promise reactions and queueMicrotask callbacks share microtask ordering; timers schedule later tasks.",
    "examples": [
      {
        "id": "javascript-074.e01",
        "title": "Registration order across promise and queueMicrotask",
        "runtime": "browser"
      },
      {
        "id": "javascript-074.e02",
        "title": "Nested microtasks drain before a timer",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-075",
    "description": "Timers schedule future callbacks after a minimum delay; interval callbacks repeat until cancelled.",
    "examples": [
      {
        "id": "javascript-075.e01",
        "title": "Cancelled timeout does not publish",
        "runtime": "browser"
      },
      {
        "id": "javascript-075.e02",
        "title": "Bounded interval stops after three ticks",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-076",
    "description": "Queue order depends on the current task, the order reactions become ready and the microtask checkpoint.",
    "examples": [
      {
        "id": "javascript-076.e01",
        "title": "Promise chain interleaves with another microtask",
        "runtime": "browser"
      },
      {
        "id": "javascript-076.e02",
        "title": "Async function returns before its continuation",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-077",
    "description": "fetch performs a real request and fulfills with a Response even for HTTP error statuses; body parsing is another asynchronous step.",
    "examples": [
      {
        "id": "javascript-077.e01",
        "title": "Fetch and validate actual Express data",
        "runtime": "browser"
      },
      {
        "id": "javascript-077.e02",
        "title": "HTTP failure still returns a Response",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-078",
    "description": "AbortController signals cancellation to supported APIs such as fetch. It does not automatically undo completed side effects.",
    "examples": [
      {
        "id": "javascript-078.e01",
        "title": "An already-aborted signal rejects fetch",
        "runtime": "browser"
      },
      {
        "id": "javascript-078.e02",
        "title": "Cancel an in-flight delayed request",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-079",
    "description": "A race condition occurs when final state depends on completion order instead of the intended request ordering.",
    "examples": [
      {
        "id": "javascript-079.e01",
        "title": "Controlled stale overwrite and generation-token fix",
        "runtime": "browser"
      },
      {
        "id": "javascript-079.e02",
        "title": "Abort obsolete HTTP work and keep the fresh result",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-080",
    "description": "Concurrency overlaps waiting operations; a pool limits how many are active at once. It is distinct from CPU parallelism.",
    "examples": [
      {
        "id": "javascript-080.e01",
        "title": "Serial awaiting versus concurrent start",
        "runtime": "browser"
      },
      {
        "id": "javascript-080.e02",
        "title": "A two-worker pool bounds active tasks",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-081",
    "description": "DOM APIs create and update real document nodes. textContent displays text without interpreting markup.",
    "examples": [
      {
        "id": "javascript-081.e01",
        "title": "Create a real text node",
        "runtime": "browser"
      },
      {
        "id": "javascript-081.e02",
        "title": "Append and remove owned nodes",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-082",
    "description": "A bubbling event travels from its target through ancestor listeners after the target phase.",
    "examples": [
      {
        "id": "javascript-082.e01",
        "title": "Target then ancestor bubble listener",
        "runtime": "browser"
      },
      {
        "id": "javascript-082.e02",
        "title": "Origin versus listener owner",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-083",
    "description": "Capture listeners run on ancestors before the target; target and bubble phases follow.",
    "examples": [
      {
        "id": "javascript-083.e01",
        "title": "Capture, target and bubble phases",
        "runtime": "browser"
      },
      {
        "id": "javascript-083.e02",
        "title": "Capture and bubble listeners on the target",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-084",
    "description": "Event delegation uses an ancestor listener to handle events from current and future descendants.",
    "examples": [
      {
        "id": "javascript-084.e01",
        "title": "Delegate to a dynamically added child",
        "runtime": "browser"
      },
      {
        "id": "javascript-084.e02",
        "title": "Nested target requires closest",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-085",
    "description": "preventDefault cancels a cancelable event’s default action; it does not stop propagation.",
    "examples": [
      {
        "id": "javascript-085.e01",
        "title": "Cancel a real anchor event without navigation",
        "runtime": "browser"
      },
      {
        "id": "javascript-085.e02",
        "title": "Noncancelable event ignores preventDefault",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-086",
    "description": "stopPropagation prevents travel to later nodes; stopImmediatePropagation also stops later listeners on the current node.",
    "examples": [
      {
        "id": "javascript-086.e01",
        "title": "Stop bubbling after the target",
        "runtime": "browser"
      },
      {
        "id": "javascript-086.e02",
        "title": "Same-node listener behavior differs",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-087",
    "description": "localStorage stores origin-scoped strings across page sessions until removed or cleared.",
    "examples": [
      {
        "id": "javascript-087.e01",
        "title": "Round-trip a serialized value in real localStorage",
        "runtime": "browser"
      },
      {
        "id": "javascript-087.e02",
        "title": "Remove an owned key explicitly",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-088",
    "description": "sessionStorage stores strings within an origin and top-level browsing context for that tab session.",
    "examples": [
      {
        "id": "javascript-088.e01",
        "title": "Tab-session value is still a string",
        "runtime": "browser"
      },
      {
        "id": "javascript-088.e02",
        "title": "Local and session stores are separate",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-089",
    "description": "Cookies are path/domain-scoped browser state sent with matching requests; script-visible cookies are distinct from HttpOnly cookies.",
    "examples": [
      {
        "id": "javascript-089.e01",
        "title": "Encode and read an owned cookie",
        "runtime": "browser"
      },
      {
        "id": "javascript-089.e02",
        "title": "Delete with matching path",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-090",
    "description": "Browser events notify listeners about user or programmatic actions. Setting a property does not necessarily dispatch its corresponding event.",
    "examples": [
      {
        "id": "javascript-090.e01",
        "title": "Property assignment versus input event",
        "runtime": "browser"
      },
      {
        "id": "javascript-090.e02",
        "title": "Custom event carries detail",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-091",
    "description": "Garbage collectors reclaim unreachable allocations according to engine policy. Reachability can be reasoned about, but collection timing is not deterministic.",
    "examples": [
      {
        "id": "javascript-091.e01",
        "title": "A strong container retains an object until removal",
        "runtime": "browser"
      },
      {
        "id": "javascript-091.e02",
        "title": "WeakRef is kept alive within the current job",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-092",
    "description": "A memory leak is unintended retention of objects or ongoing work beyond their useful owner lifetime.",
    "examples": [
      {
        "id": "javascript-092.e01",
        "title": "Orphaned callback and explicit removal",
        "runtime": "browser"
      },
      {
        "id": "javascript-092.e02",
        "title": "Bounded cache retention and release",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-093",
    "description": "String reversal depends on whether the unit is a UTF-16 code unit, a Unicode code point or a grapheme cluster.",
    "examples": [
      {
        "id": "javascript-093.e01",
        "title": "Reverse by Unicode code points",
        "runtime": "browser"
      },
      {
        "id": "javascript-093.e02",
        "title": "Expose the UTF-16 split bug",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-094",
    "description": "A palindrome reads identically in both directions under a chosen normalization rule.",
    "examples": [
      {
        "id": "javascript-094.e01",
        "title": "Normalized reverse comparison",
        "runtime": "browser"
      },
      {
        "id": "javascript-094.e02",
        "title": "Literal bug versus two-pointer normalized scan",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-095",
    "description": "Factorial multiplies positive integers up to n, with 0! equal to one. BigInt avoids Number precision loss.",
    "examples": [
      {
        "id": "javascript-095.e01",
        "title": "Iterative exact factorial",
        "runtime": "browser"
      },
      {
        "id": "javascript-095.e02",
        "title": "Recursive base case",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-096",
    "description": "Fibonacci uses F(0)=0, F(1)=1 and F(n)=F(n−1)+F(n−2).",
    "examples": [
      {
        "id": "javascript-096.e01",
        "title": "Iterative nth Fibonacci",
        "runtime": "browser"
      },
      {
        "id": "javascript-096.e02",
        "title": "Memoized recursion computes each subproblem once",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-097",
    "description": "A prime is an integer greater than one with no positive divisors other than one and itself.",
    "examples": [
      {
        "id": "javascript-097.e01",
        "title": "Bounded trial division",
        "runtime": "browser"
      },
      {
        "id": "javascript-097.e02",
        "title": "Sieve generates every prime up to a bound",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-098",
    "description": "Deduplication retains one representative per equality rule while optionally preserving first-occurrence order.",
    "examples": [
      {
        "id": "javascript-098.e01",
        "title": "Ordered Set solution",
        "runtime": "browser"
      },
      {
        "id": "javascript-098.e02",
        "title": "Alternative filter and first-index solution",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-099",
    "description": "Finding duplicates requires distinguishing repeated values from a list of unique representatives.",
    "examples": [
      {
        "id": "javascript-099.e01",
        "title": "Unique repeated values",
        "runtime": "browser"
      },
      {
        "id": "javascript-099.e02",
        "title": "Frequency-based duplicate report",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-100",
    "description": "Two Sum finds two distinct positions whose values add to a target. The examples use target 9.",
    "examples": [
      {
        "id": "javascript-100.e01",
        "title": "Single-pass complement map",
        "runtime": "browser"
      },
      {
        "id": "javascript-100.e02",
        "title": "Brute-force distinct pairs",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-101",
    "description": "Anagrams contain equal character multiplicities under a defined normalization rule.",
    "examples": [
      {
        "id": "javascript-101.e01",
        "title": "Sorted normalized comparison",
        "runtime": "browser"
      },
      {
        "id": "javascript-101.e02",
        "title": "Set-only bug versus frequency-map fix",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-102",
    "description": "Flattening traverses nested arrays and emits their leaf values in order.",
    "examples": [
      {
        "id": "javascript-102.e01",
        "title": "Bounded recursive traversal",
        "runtime": "browser"
      },
      {
        "id": "javascript-102.e02",
        "title": "Native flattening versus default-depth bug",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-103",
    "description": "Grouping objects accumulates records under a selected domain key without losing records.",
    "examples": [
      {
        "id": "javascript-103.e01",
        "title": "Group objects without overwriting members",
        "runtime": "browser"
      },
      {
        "id": "javascript-103.e02",
        "title": "Index overwrite versus grouped values",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-104",
    "description": "Object sorting needs a comparator over selected fields and a defined policy for ties and mutation.",
    "examples": [
      {
        "id": "javascript-104.e01",
        "title": "Sort a copy by score with a tie-breaker",
        "runtime": "browser"
      },
      {
        "id": "javascript-104.e02",
        "title": "Descending validated ISO dates",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-105",
    "description": "The missing-number problem assumes n distinct values from 0 through n with exactly one omitted value.",
    "examples": [
      {
        "id": "javascript-105.e01",
        "title": "Validated arithmetic sum",
        "runtime": "browser"
      },
      {
        "id": "javascript-105.e02",
        "title": "XOR alternative after the same validation",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-106",
    "description": "Second-largest means the second distinct numeric value, with no answer when fewer than two distinct values exist.",
    "examples": [
      {
        "id": "javascript-106.e01",
        "title": "One-pass distinct maxima",
        "runtime": "browser"
      },
      {
        "id": "javascript-106.e02",
        "title": "Set and sort alternative, including missing answers",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-107",
    "description": "Character frequency counts code-point occurrences under an explicit case and normalization policy.",
    "examples": [
      {
        "id": "javascript-107.e01",
        "title": "Count Unicode code points",
        "runtime": "browser"
      },
      {
        "id": "javascript-107.e02",
        "title": "Case-sensitive versus normalized counts",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-108",
    "description": "A deep clone must define supported types and preserve repeated-reference/cycle relationships when required.",
    "examples": [
      {
        "id": "javascript-108.e01",
        "title": "Custom clone preserves a cycle and separates nested data",
        "runtime": "browser"
      },
      {
        "id": "javascript-108.e02",
        "title": "Reject unsupported classes; use the native clone for Date",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-109",
    "description": "A debounce implementation owns one replaceable timeout and exposes cancellation.",
    "examples": [
      {
        "id": "javascript-109.e01",
        "title": "Implement trailing input coalescing",
        "runtime": "browser"
      },
      {
        "id": "javascript-109.e02",
        "title": "Dispose before publishing",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-110",
    "description": "A leading throttle owns a time-window lock and suppresses calls until its timer releases the lock.",
    "examples": [
      {
        "id": "javascript-110.e01",
        "title": "Implement leading update suppression",
        "runtime": "browser"
      },
      {
        "id": "javascript-110.e02",
        "title": "Cancellation releases the throttle lock",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-111",
    "description": "A memoization implementation caches results under a key that represents every relevant argument.",
    "examples": [
      {
        "id": "javascript-111.e01",
        "title": "Compute once per numeric key",
        "runtime": "browser"
      },
      {
        "id": "javascript-111.e02",
        "title": "Ambiguous key bug versus tuple encoding",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-112",
    "description": "A Promise.all-like implementation must assimilate inputs, preserve input order, reject failures and handle empty iteration.",
    "examples": [
      {
        "id": "javascript-112.e01",
        "title": "Preserve positions despite reverse completion",
        "runtime": "browser"
      },
      {
        "id": "javascript-112.e02",
        "title": "Propagate rejection",
        "runtime": "browser"
      },
      {
        "id": "javascript-112.e03",
        "title": "Resolve empty input",
        "runtime": "browser"
      },
      {
        "id": "javascript-112.e04",
        "title": "Assimilate a thenable",
        "runtime": "browser"
      },
      {
        "id": "javascript-112.e05",
        "title": "An iterator failure rejects the result",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-113",
    "description": "Custom map/filter/reduce loops demonstrate indexing, sparse holes, output allocation and accumulation.",
    "examples": [
      {
        "id": "javascript-113.e01",
        "title": "Map, filter and reduce implementations",
        "runtime": "browser"
      },
      {
        "id": "javascript-113.e02",
        "title": "Sparse and empty edge cases",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "javascript-114",
    "description": "Output prediction combines lexical bindings, synchronous execution and queued continuations.",
    "examples": [
      {
        "id": "javascript-114.e01",
        "title": "var loop read after microtasks",
        "runtime": "browser"
      },
      {
        "id": "javascript-114.e02",
        "title": "let loop isolates the captured value",
        "runtime": "browser"
      },
      {
        "id": "javascript-114.e03",
        "title": "Mutation before a queued read",
        "runtime": "browser"
      },
      {
        "id": "javascript-114.e04",
        "title": "Async forEach returns before work completes",
        "runtime": "browser"
      },
      {
        "id": "javascript-114.e05",
        "title": "Nested call, microtask and timer trace",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-001",
    "description": "Type annotations constrain permitted values before execution; JavaScript values still have runtime types.",
    "examples": [
      {
        "id": "typescript-001.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-001.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-002",
    "description": "Inference derives a type from an initializer and surrounding context without writing an annotation.",
    "examples": [
      {
        "id": "typescript-002.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-002.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-003",
    "description": "Interfaces describe structural object contracts and can be extended or declaration-merged.",
    "examples": [
      {
        "id": "typescript-003.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-003.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-004",
    "description": "Type aliases name arbitrary types, including unions, tuples and object shapes.",
    "examples": [
      {
        "id": "typescript-004.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-004.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-005",
    "description": "A union permits a value from any member type; operations must be safe for the currently narrowed member.",
    "examples": [
      {
        "id": "typescript-005.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-005.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-006",
    "description": "Intersection types require all member contracts simultaneously rather than choosing one alternative.",
    "examples": [
      {
        "id": "typescript-006.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-006.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-007",
    "description": "Literal types restrict a value to exact strings, numbers or booleans; const assertions preserve narrow values.",
    "examples": [
      {
        "id": "typescript-007.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-007.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-008",
    "description": "Optional properties may be absent; a read must account for undefined. Exact optional property rules can distinguish absence from explicit undefined.",
    "examples": [
      {
        "id": "typescript-008.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-008.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-009",
    "description": "Readonly properties prevent assignments through that typed reference, but do not inherently freeze runtime objects or nested values.",
    "examples": [
      {
        "id": "typescript-009.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-009.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-010",
    "description": "Arrays describe collections of elements; tuples describe a fixed or patterned positional contract.",
    "examples": [
      {
        "id": "typescript-010.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-010.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-011",
    "description": "Enums emit runtime mappings; a const object plus a literal union can provide an alternative without enum reverse mappings.",
    "examples": [
      {
        "id": "typescript-011.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-011.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-012",
    "description": "Function signatures describe parameter, optional/rest and return contracts checked at call sites.",
    "examples": [
      {
        "id": "typescript-012.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-012.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-013",
    "description": "Overload signatures describe permitted call/result relationships while one implementation handles all supported cases.",
    "examples": [
      {
        "id": "typescript-013.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-013.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-014",
    "description": "Generics preserve relationships between input and output types rather than erasing them to any.",
    "examples": [
      {
        "id": "typescript-014.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-014.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-015",
    "description": "Generic constraints require a type argument to support the operations used by the implementation.",
    "examples": [
      {
        "id": "typescript-015.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-015.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-016",
    "description": "keyof creates the union of a type’s permitted property keys and can constrain safe generic access.",
    "examples": [
      {
        "id": "typescript-016.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-016.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-017",
    "description": "In a type position typeof derives a type from a value declaration; runtime typeof returns broad JavaScript category strings.",
    "examples": [
      {
        "id": "typescript-017.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-017.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-018",
    "description": "Indexed access types extract a property or element type from another type.",
    "examples": [
      {
        "id": "typescript-018.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-018.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-019",
    "description": "Mapped types transform properties over a key union, optionally adding or removing readonly/optional modifiers.",
    "examples": [
      {
        "id": "typescript-019.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-019.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-020",
    "description": "Conditional types select a type based on assignability, and infer can extract a component type.",
    "examples": [
      {
        "id": "typescript-020.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-020.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-021",
    "description": "Utility types derive common contracts such as subsets, optional updates, required fields and function results.",
    "examples": [
      {
        "id": "typescript-021.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-021.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-022",
    "description": "A type guard uses runtime checks to narrow unknown data; a user-defined predicate tells the compiler what those checks establish.",
    "examples": [
      {
        "id": "typescript-022.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-022.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-023",
    "description": "Control-flow narrowing refines a union after runtime checks and assignments. Truthiness is only one possible check.",
    "examples": [
      {
        "id": "typescript-023.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-023.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-024",
    "description": "A discriminated union uses a shared literal field to select a specific payload shape.",
    "examples": [
      {
        "id": "typescript-024.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-024.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-025",
    "description": "unknown requires narrowing before use, any opts out of checking, and never represents an unreachable value set.",
    "examples": [
      {
        "id": "typescript-025.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-025.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-026",
    "description": "A type assertion changes the compiler’s view but performs no runtime validation or conversion. Assertion functions can combine checks with narrowing.",
    "examples": [
      {
        "id": "typescript-026.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-026.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-027",
    "description": "TypeScript private/protected modifiers constrain typed access; JavaScript #private fields additionally enforce runtime privacy.",
    "examples": [
      {
        "id": "typescript-027.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-027.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-028",
    "description": "Promise<T> describes a future fulfillment value and Awaited<T> unwraps promise-like types. Rejection reasons are not encoded as a second Promise type parameter.",
    "examples": [
      {
        "id": "typescript-028.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-028.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      },
      {
        "id": "typescript-028.e03",
        "title": "Catch variables are unknown",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-028.e04",
        "title": "Generic asynchronous result preservation",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-028.e05",
        "title": "Promise.all tuple inference",
        "runtime": "typecheck"
      }
    ]
  },
  {
    "id": "typescript-029",
    "description": "API response types describe the expected contract; discriminants narrow success/error variants and runtime validation establishes trust.",
    "examples": [
      {
        "id": "typescript-029.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-029.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-030",
    "description": "React prop, event and hook types describe component boundaries and state updates without changing React’s runtime behavior.",
    "examples": [
      {
        "id": "typescript-030.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-030.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-031",
    "description": "Redux RootState and AppDispatch should be derived from the actual store; typed hooks preserve those contracts.",
    "examples": [
      {
        "id": "typescript-031.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-031.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-032",
    "description": "Express RequestHandler generics model parameters, response bodies, request bodies and query shapes. They do not validate incoming HTTP values.",
    "examples": [
      {
        "id": "typescript-032.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-032.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-033",
    "description": "Mongoose schema inference, hydrated document types and Model query types describe actual library contracts without performing a database operation.",
    "examples": [
      {
        "id": "typescript-033.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-033.e02",
        "title": "Hydrated fields and lean query inference",
        "runtime": "typecheck"
      }
    ]
  },
  {
    "id": "typescript-034",
    "description": "Compile-time types check authored code, while runtime validation establishes a contract for external values.",
    "examples": [
      {
        "id": "typescript-034.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-034.e02",
        "title": "Runtime behavior after type erasure",
        "runtime": "browser"
      }
    ]
  },
  {
    "id": "typescript-035",
    "description": "TypeScript configuration selects checking, module-resolution, emit and runtime-library assumptions. Compiler options change which programs are accepted.",
    "examples": [
      {
        "id": "typescript-035.e01",
        "title": "Compile-time contract: accepted and rejected code",
        "runtime": "typecheck"
      },
      {
        "id": "typescript-035.e02",
        "title": "Exact optional fields differ from explicit undefined",
        "runtime": "typecheck"
      }
    ]
  }
] satisfies LessonSummary[];
