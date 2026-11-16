import { nodeInterview } from './node-interview';

type ExampleEntry = [title: string, initial: string, expected: string];
type LessonEntry = [id: string, reference: string, description: string, when: string, avoid: string, interview: [question: string, answer: string], examples: ExampleEntry[]];

const lessons: LessonEntry[] = [
  ["node-001", "process", "Node.js runs JavaScript on V8 and delegates many asynchronous operations to operating-system facilities or libuv.", "Use asynchronous native APIs for work that can complete outside the JavaScript thread.", "Avoid assuming that all asynchronous operations use the same thread pool.", ["How do V8 and libuv differ?","V8 executes JavaScript and manages its heap. Libuv provides event loop and async I/O infrastructure."], [
    ["Inspect runtime components","","Node, V8 and libuv version fields"],
    ["Observe asynchronous file completion","Node lab","Start and scheduled precede the file result"],
  ]],
  ["node-002", "v8", "V8 executes JavaScript, manages object allocation, and can serialize supported JavaScript data.", "Measure heap categories across repeat runs when investigating allocation.", "Avoid treating an isolated heap sample as a memory leak diagnosis.", ["When is optimization observable?","Profile the workload rather than assuming a given function is optimized."], [
    ["Inspect V8 heap categories","","Positive byte counts vary per run"],
    ["Round-trip a Map","Ada","The restored value retains its Map type"],
  ]],
  ["node-003", "timers", "The Node event loop coordinates callbacks and drains microtasks at checkpoints.", "Schedule I/O continuations and microtasks with their distinct ordering in mind.", "Avoid relying on a top-level race between the timer and check phases.", ["Can setTimeout(0) always beat setImmediate?","Their order from top-level code depends on scheduling. Inside an I/O callback, the immediate runs before a newly scheduled timer."], [
    ["Run a microtask after the stack","","start → end → microtask"],
    ["Schedule from an I/O callback","demo","I/O callback → immediate → timer"],
    ["Compare top-level scheduling","","Both callbacks run. The order shown is the observed order"],
    ["Observe nextTick in CommonJS","","nextTick precedes the queued microtask in this CommonJS script"],
    ["Queue work in a second turn","","first immediate → microtask → second immediate"],
  ]],
  ["node-004", "errors", "The call stack tracks the functions executing on the current thread.", "Bound recursion depth or use iteration for large trees.", "Avoid using a deep synchronous traversal on the request thread.", ["What happens to the stack across await?","The async function suspends and resumes later. The suspended call does not occupy the synchronous stack."], [
    ["Inspect nested frames","","inner precedes outer"],
    ["Observe recursion unwinding","4","Entries descend and exits ascend"],
  ]],
  ["node-005", "process", "Promise reactions and queueMicrotask schedule deferred work at JavaScript microtask checkpoints.", "Use microtasks for small work that should follow the current stack.", "Avoid filling the queue indefinitely in a request handler.", ["What causes microtask starvation?","Continuously queuing more microtasks can postpone timers and I/O callbacks."], [
    ["Compare Promise and queueMicrotask","","promise → queueMicrotask"],
    ["Append a nested microtask","","first → second → nested"],
  ]],
  ["node-006", "timers", "Timers schedule callbacks after a threshold and support cancellation.", "Use an AbortSignal for timers owned by cancellable work.", "Avoid treating the requested delay as an execution deadline.", ["Is the delay a deadline?","It is a scheduling threshold. Busy callbacks can delay execution."], [
    ["Measure a bounded delay","25","Elapsed milliseconds are measured"],
    ["Abort a promised timer","","AbortError"],
  ]],
  ["node-007", "fs", "Asynchronous file operations let JavaScript continue while I/O completes.", "Use asynchronous reads and overlap independent operations.", "Avoid blocking the request thread with synchronous filesystem operations.", ["Does async I/O move JavaScript onto a worker automatically?","The I/O implementation may use native workers. The JavaScript continuation resumes on its originating thread."], [
    ["Observe work during file read","report","Independent work precedes the read"],
    ["Read metadata and contents concurrently","parallel","File size and contents are returned"],
  ]],
  ["node-008", "modules", "CommonJS exposes module values through module.exports and caches resolved modules.", "Use the supported module extension to make CommonJS interpretation explicit.", "Avoid changing a cached export when consumers expect independent state.", ["Why can reassigning exports fail?","exports starts as an alias. Reassigning the local variable does not replace module.exports."], [
    ["Load the same CommonJS module twice","","Both imports share the same exported object"],
    ["Compare exports with module.exports","","first and final are exported"],
  ]],
  ["node-009", "esm", "ES modules support named exports, dynamic import, and live bindings.", "Use dynamic import for optional modules and observe named bindings from the importer.", "Avoid assuming that imported bindings are copies.", ["What is a live binding?","An importer observes changes an exporter makes to its binding. The importer cannot assign it."], [
    ["Import a named built-in export","notes.txt","The filename extension"],
    ["Observe a live binding","","stdout contains 1 and 2"],
  ]],
  ["node-010", "process", "The process object exposes the current runtime and coordinates lifecycle and resource reporting.", "Use exitCode in a child to let its pending output finish.", "Avoid calling process.exit from a request handler.", ["Why prefer exitCode when possible?","It permits pending output to finish naturally before the process exits."], [
    ["Inspect coarse process information","","Runtime, platform and uptime"],
    ["Set the exit code in an isolated process","","stdout is finished and exitCode is 3"],
  ]],
  ["node-011", "environment_variables", "Environment values arrive as strings and need explicit parsing and validation.", "Parse and validate only the environment values the program needs.", "Avoid returning the full environment as diagnostics.", ["When should configuration be validated?","At startup, before using values to configure services."], [
    ["Parse isolated dotenv text","250","250 is valid within the configured range"],
    ["Read only a supplied child environment","demo","Child prints only the lab value"],
  ]],
  ["node-012", "buffer", "Buffers represent bytes and require a known encoding when converting to text.", "Use explicit encodings and copy a buffer when independent ownership is needed.", "Avoid modifying a subarray when the original must stay unchanged.", ["Why can a UTF-8 byte length differ from string length?","Some characters occupy several bytes in UTF-8."], [
    ["Compare UTF-8 length and hex","café","café occupies 5 bytes"],
    ["Observe a shared Buffer view","","Both views reflect the changed byte"],
  ]],
  ["node-013", "errors", "Node errors can reach callers as throws, rejected promises, or callback arguments.", "Classify expected errors by stable code and preserve unexpected causes for diagnostics.", "Avoid falling back for every exception.", ["Why check an error code rather than matching its message?","Codes describe the failure category more reliably across platforms and releases."], [
    ["Handle an expected filesystem error","","ENOENT"],
    ["Preserve a cause when translating an error","","Outer error and preserved cause"],
  ]],
  ["node-014", "fs", "The fs module reads files, metadata, and file descriptors.", "Use a scoped fixture and close file handles in finally.", "Avoid handing request data directly to file-opening APIs.", ["Who closes a FileHandle?","The code that opened it should close it in finally or use a supported disposal mechanism."], [
    ["Read a temporary UTF-8 fixture","hello","Temporary text and its byte count"],
    ["Read only the first three bytes","abcdef","The first three bytes are shown as hex"],
  ]],
  ["node-015", "path", "Path operations manipulate strings using platform-specific conventions.", "Choose posix or win32 explicitly when interpreting a foreign path format.", "Avoid treating path normalization as filesystem authorization.", ["Does path.normalize verify filesystem safety?","It only rewrites path syntax. Filesystem access needs its own containment strategy."], [
    ["Compare Windows and POSIX parsing","docs/sub/report.txt","Equivalent filenames with platform-specific separators"],
    ["Normalize path segments","topics/./node/../react","The normalized string is topics/react"],
  ]],
  ["node-016", "http", "The low-level HTTP module exposes incoming requests and outgoing responses as streams.", "Set status and headers before ending a response.", "Avoid writing multiple responses for the same request.", ["When should you set status and headers?","Set them before sending response data, which commits the headers."], [
    ["Return JSON from a loopback server","hello","HTTP 200 with JSON and the supplied message"],
    ["Respond with HTTP 404","","HTTP 404 with Missing route"],
  ]],
  ["node-017", "events", "The events module lets code publish and subscribe to named events.", "Register the awaited listener before emitting its event.", "Avoid assuming a past synchronous event will be replayed.", ["When do normal EventEmitter listeners run?","emit invokes registered listeners synchronously in registration order."], [
    ["Measure listener order","","first → second"],
    ["Await an emitted event","ready","An array containing the emitted value"],
  ]],
  ["node-018", "stream", "Streams move chunks between producers and consumers and pipeline propagates failures and cleanup.", "Use pipeline to coordinate completion and cleanup across streams.", "Avoid waiting only for a consumer finish event when the producer can fail.", ["Why use pipeline for connected streams?","It coordinates errors and completion for the chain."], [
    ["Pipe chunks into a destination","lab","The two source chunks reach the destination"],
    ["Catch a pipeline failure","","The failure reaches the caller and the sink is destroyed"],
  ]],
  ["node-019", "crypto", "Node crypto exposes cryptographic hashes, message authentication, and random generation.", "Choose a digest, HMAC, or random generator according to the data contract.", "Avoid using a plain hash as evidence of authenticity.", ["How does an HMAC differ from a hash?","An HMAC uses a shared secret key. A plain hash is unkeyed."], [
    ["Hash a text sample","hello","A 64-character SHA-256 digest"],
    ["Generate independent random values","","Two 24-character hex values"],
  ]],
  ["node-020", "url", "The WHATWG URL API parses URLs and encodes query parameters.", "Use URL and URLSearchParams to parse and encode structured URLs.", "Avoid splitting strings manually for repeated query parameters.", ["How do you represent repeated query keys?","Append each value and use getAll when reading the key."], [
    ["Parse a relative URL against a fixed origin","/learn?q=node","The pathname and q parameter are returned"],
    ["Encode repeated query values","Node & JS","Both tags survive URL encoding"],
  ]],
  ["node-021", "os", "The os module exposes portable information useful for runtime decisions.", "Report the platform properties relevant to the behavior being inspected.", "Avoid using hostname or per-interface data for portable runtime choices.", ["Why use availableParallelism to size a pool?","It estimates parallelism available to the process, including relevant runtime constraints."], [
    ["Inspect runtime portability","","The current platform and byte order"],
    ["Inspect newline and parallelism","","Platform newline bytes and a positive parallelism estimate"],
  ]],
  ["node-022", "child_process", "child_process starts separate executables and can pipe their input and output.", "Use structured arguments and pass user text as data to a fixed child.", "Avoid composing command strings from request content.", ["What is the difference between shell execution and direct spawn?","Direct spawn passes the executable and arguments as structured values without shell expansion."], [
    ["Send text through child stdin","hello","The child prints uppercase input"],
    ["Capture separate output streams","","stdout and stderr are captured separately"],
  ]],
  ["node-023", "worker_threads", "Worker threads run JavaScript in separate V8 isolates within one Node process.", "Use message passing for bounded parallel work.", "Avoid starting a worker for each cheap arithmetic operation.", ["What normally crosses a worker boundary?","Messages are structured-cloned unless values are transferred or deliberately shared."], [
    ["Send a value to another thread","hello","Uppercase output and a nonzero worker thread ID"],
    ["Return a structured-cloned Map","","The receiving thread recognizes a Map"],
  ]],
  ["node-024", "util", "Callbacks report completion directly, while promises and async functions compose asynchronous results.", "Promisify an error-first callback or use the native promises API.", "Avoid dropping the rejected branch when adapting callbacks.", ["What does promisify assume?","The function accepts a final error-first callback."], [
    ["Use an error-first callback","callbacks","The callback returns the fixture contents"],
    ["Convert a legacy callback with promisify","promise","The promisified function returns the fixture contents"],
    ["Await a promises API","await","AWAIT"],
    ["Compare settled outcomes","mixed","fulfilled and rejected"],
    ["Recover from an awaited read error","","Fallback text"],
  ]],
  ["node-025", "events", "EventEmitter subscriptions have explicit lifetimes and the error event has special behavior.", "Pair each subscription with its intended removal or use once.", "Avoid allowing a repeated setup to stack duplicate listeners.", ["What happens when an error event has no listener?","An emitted error is thrown, so the emitting boundary needs an error policy."], [
    ["Compare once and on","","once runs once and on runs twice"],
    ["Remove a particular listener","","Count stays at one and the listener is gone"],
  ]],
  ["node-026", "stream", "Readable streams expose data incrementally through async iteration or events.", "Consume the readable with one mechanism and observe its completion.", "Avoid mixing flowing event listeners with another consumer.", ["Why avoid mixing consumption styles?","Multiple consumption modes can interfere with the stream’s flow and ownership."], [
    ["Consume chunks with for await","abc","One chunk per character"],
    ["Read until end using events","","Both chunks in source order"],
  ]],
  ["node-027", "stream", "Writable streams acknowledge writes and signal when all queued writes have finished.", "Wait for finish before treating written data as complete.", "Avoid treating the return value of write as completion.", ["What does finish indicate?","end was called and all writes were processed by the writable stream."], [
    ["Wait for a writable to finish","queued","Both chunks are present and finished is true"],
    ["Batch corked writes","","A and B reach writev together"],
  ]],
  ["node-028", "stream", "A Transform stream consumes input and emits a derived output stream.", "Use a Transform for chunk-wise conversion and pipeline for cleanup.", "Avoid assuming one input chunk always creates one output chunk.", ["Can input and output chunk counts differ?","Yes. A transform can emit multiple chunks, none, or final data from flush."], [
    ["Transform chunks to uppercase","hello","HELLO NODE"],
    ["Round-trip gzip data","compress me","The decompressed text matches the input"],
  ]],
  ["node-029", "stream", "Backpressure signals that producers should slow down to match consumer capacity.", "Wait for drain when write returns false or use pipeline.", "Avoid producing new chunks while the consumer signals a full buffer.", ["What does a false return from write mean?","The buffered amount reached its threshold. Wait for drain before writing more."], [
    ["Wait for drain after a full buffer","","write reports false, then the stream finishes"],
    ["Observe the pipeline buffer threshold","","The buffered byte count is measured during writes"],
  ]],
  ["node-030", "fs", "File workflows need explicit decisions about replacement, append, and cleanup.", "Stage replacements in the same directory and clean up the fixture.", "Avoid reading a target while a writer is overwriting its contents in place.", ["What does an atomic rename protect against?","On a supporting filesystem, readers see the old or new name target without reading a partly written replacement."], [
    ["Append to a temporary file","second line","Both lines are present"],
    ["Replace a fixture with a sibling rename","replacement","The target contains replacement"],
  ]],
  ["node-031", "readline", "Incremental processing handles a file a chunk or line at a time with bounded memory.", "Process incremental chunks or bounded lines for large input.", "Avoid buffering the full file just to count records or compute a digest.", ["Why can line processing still consume too much memory?","An unusually long line can require a large buffer, so use a limit for untrusted sources."], [
    ["Count lines without buffering the file","record","256 nonempty fixture lines"],
    ["Hash a fixture incrementally","record","Byte count and SHA-256 digest"],
  ]],
  ["node-032", "events", "Retained references such as listeners and unbounded caches can keep objects reachable.", "Compare retained resources across repeated setup and teardown.", "Avoid estimating a leak from one high heap reading.", ["How do you confirm a listener leak?","Observe sustained listener growth across repeated ownership cycles and compare counts after cleanup."], [
    ["Compare retained and removed listeners","","5 retained listeners, then 0"],
    ["Bound a collection’s retention","","Only entries 4, 5 and 6 remain"],
  ]],
  ["node-033", "v8", "Garbage collection can reclaim objects once they are unreachable, while timing and heap counts vary.", "Use an isolated process for GC measurements and report observed counts.", "Avoid making resource release depend on collection timing.", ["Why should application correctness avoid depending on GC timing?","The runtime controls collection scheduling and finalization is best effort."], [
    ["Observe heap before and after collection","","The isolated process reports two measured heap values"],
    ["Demonstrate a retained reference","","The reachable object survives collection"],
  ]],
  ["node-034", "perf_hooks", "CPU-intensive JavaScript occupies the current thread unless work yields or is delegated.", "Use workers when parallel execution repays its startup and messaging costs.", "Avoid interpreting a small fixture as a production benchmark.", ["When is a worker appropriate?","For substantial parallelizable CPU work whose benefit exceeds messaging and scheduling overhead."], [
    ["Observe when synchronous work delays a callback","","The sum is recorded before the callback"],
    ["Compute the same sum in a worker","","The main thread services a callback while the worker task is pending"],
  ]],
  ["node-035", "worker_threads", "Workers can copy structured data or transfer ownership of its backing storage.", "Transfer a buffer when its sender can relinquish ownership.", "Avoid using detached buffers after posting them.", ["What does transferring an ArrayBuffer do to the sender's view?","The sender's buffer becomes detached after the transfer."], [
    ["Transfer an ArrayBuffer to a worker","","The sender has zero bytes and the worker reads 7"],
    ["Observe a worker-scoped exception","","The parent handles Worker fixture failure"],
  ]],
  ["node-036", "child_process", "Child processes have separate memory, exit status, and lifecycle events.", "Wait for close when exit status and complete output are both required.", "Avoid interpreting a nonzero child exit as successful completion.", ["Why wait for close when collecting output?","close occurs after the child exits and its stdio streams close."], [
    ["Capture a controlled nonzero exit","","stderr and exit code 5"],
    ["Start a process with an isolated environment","demo","The provided label and false for the missing key"],
  ]],
  ["node-037", "cluster", "Cluster coordinates separate Node processes over IPC and can distribute server connections.", "Treat cluster workers as separate processes and communicate over IPC.", "Avoid expecting mutations in one heap to appear in another.", ["Do cluster workers share JavaScript state?","Each worker has its own heap. Use IPC or an external store for coordination."], [
    ["Send a message from a cluster worker","","The primary receives a worker message over IPC"],
    ["Observe a cluster worker exit","","The worker reports exit code 4 to the primary"],
  ]],
  ["node-038", "async_context", "Structured logging captures named fields and can associate entries with an asynchronous request context.", "Use structured fields and attach a request ID across awaits.", "Avoid logging input values unless the logging contract requires them.", ["Why use an allowlist of log fields?","It keeps logs useful while reducing accidental exposure of request data."], [
    ["Keep request IDs across awaits","","Each asynchronous task keeps its own request ID"],
    ["Log only approved event fields","example","The output contains operation and duration"],
  ]],
  ["node-039", "timers", "A cache reuses prior results according to an explicit key, lifetime, and invalidation policy.", "Bound cache lifetime and capacity, and test expiration with an injected clock.", "Avoid treating retained data as current after its TTL.", ["How does a TTL differ from invalidation?","TTL expires data by elapsed time. Invalidation removes entries when relevant data changes."], [
    ["Share a calculated result","cache me","Two reads perform one computation"],
    ["Expire a cache entry with an injected clock","","Before expiry is stored. At expiry is miss"],
  ]],
  ["node-040", "globals", "WebSocket upgrades an HTTP connection to carry messages over a persistent connection.", "Clean up the socket and server when a message exchange ends.", "Avoid opening lesson sockets on externally reachable network interfaces.", ["What does an HTTP 101 response signify?","The server accepted the requested protocol switch."], [
    ["Receive a text message on a local WebSocket","hello","The local client receives the supplied text"],
    ["Receive Unicode and close the test connection","مرحبا","Unicode survives and the connection is cleaned up"],
  ]],
  ["node-041", "http", "Graceful shutdown stops intake and gives active work a bounded time to finish.", "Stop intake and await owned work with a deadline.", "Avoid leaving active sockets or timers without an owner.", ["Why set a shutdown deadline?","An indefinitely active request can prevent shutdown forever."], [
    ["Close a dedicated server and await completion","","The dedicated server reports listening false"],
    ["Drain a bounded background operation","","Existing work completes before shutdown"],
  ]],
  ["node-042", "errors", "Async boundaries can classify failures, preserve context, and retry recoverable operations.", "Retry only a bounded, recoverable operation and release resources in finally.", "Avoid retrying every exception or repeating unsafe writes.", ["What makes a retry safe?","The operation should tolerate repetition, and retry policy should bound attempts and target transient failures."], [
    ["Retry one simulated transient error","","Recovered after two attempts"],
    ["Use finally to release a fixture resource","","Release follows the error"],
  ]],
  ["node-043", "environment_variables", "Environment configuration converts external strings into validated application settings.", "Validate explicit configuration at startup and use defaults for absent values.", "Avoid accepting a port just because its string is nonempty.", ["Should defaults override explicitly invalid values?","Reject invalid explicit values. Defaults are for missing configuration."], [
    ["Choose a typed setting from dotenv input","development","The supplied valid mode is returned"],
    ["Validate a port without opening it","4000","4000 passes the range check"],
  ]],
  ["node-044", "crypto", "Backend security includes validating input and comparing authenticated values with suitable primitives.", "Validate input at the boundary and use suitable crypto primitives for binary comparison.", "Avoid including runtime secrets in lesson inputs or output.", ["Why validate byte length before timingSafeEqual?","It requires equal-sized buffers. The surrounding code still needs its own timing analysis."], [
    ["Validate a bounded display label","Ada 42","Ada 42 passes the sample schema"],
    ["Compare two fixed-size message authentication values","lab message","The default fixture matches"],
  ]],
  ["node-045", "assert", "Node assertions express expected behavior and throw an AssertionError on mismatch.", "Test observable results and assert the intended error type or shape.", "Avoid passing a negative test on an unrelated error.", ["Why test failure paths as well as success paths?","Failure contracts guide caller recovery and prevent regressions in validation."], [
    ["Assert a pure calculation","3","3 passes. Changing the input can fail"],
    ["Assert rejection from an async function","","The assertion passes"],
  ]],
  ["node-046", "perf_hooks", "Performance work begins by measuring the operation and choosing the appropriate workload metric.", "Measure representative work with a monotonic clock and compare repeated samples.", "Avoid attributing changes in one noisy microbenchmark to an optimization.", ["What does an event-loop utilization delta show?","It reports the fraction of measured loop time spent active over that interval."], [
    ["Measure elapsed work with a monotonic clock","demo","Payload size and a measured duration"],
    ["Measure event-loop utilization over a short window","","Active, idle, and utilization values are observed"],
  ]],
];

export const nodeCatalog = lessons.map(([id, reference, description, when, avoid, interview, entries]) => ({
  id, reference, description, when, avoid, interview,
  questions: [
    ['How would you explain this concept in an interview?', description],
    ['Where would you apply this in a backend?', when],
    ['What mistake would you check for during review?', avoid],
    ...nodeInterview[Number(id.slice(5)) - 1]!
  ] as [string, string][],
  examples: entries.map(([title, initial, expected], index) => ({
    id: id + '.e' + String(index + 1).padStart(2, '0'), title, initial, expected
  }))
}));
