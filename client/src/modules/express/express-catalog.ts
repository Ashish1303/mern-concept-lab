type Entry = [title: string, initial: string, expected: string, requirement?: string];
type Lesson = [id: string, description: string, questions: [string, string][], examples: Entry[]];

const lessons: Lesson[] = [
  ["express-001", "Express applications register handlers and serve HTTP through Node.js.", [
    ["What does express() return?","An application that can handle Node HTTP requests and register middleware."],
    ["Why use an ephemeral port in a test?","The OS chooses an available port, which avoids a fixed-port collision."],
    ["Where should the listener start?","Keep application configuration separate from startup so it can be tested independently."],
  ], [
    ["Start a JSON endpoint","","HTTP 200 with ready true"],
    ["Send a plain-text response","","HTTP 200 with text/plain"],
    ["Create a server","","HTTP 200 from the loopback listener","express-038"],
  ]],
  ["express-002", "GET retrieves a representation and should leave application data unchanged.", [
    ["What does safe mean for GET?","The client is requesting a read operation."],
    ["What does idempotent mean?","Repeating a request has the same intended effect on resource state."],
    ["Should a GET rely on a JSON request body?","Use route and query inputs for a portable request contract."],
  ], [
    ["Read the book collection","","Four seeded books"],
    ["Read one book","","Book 2 is returned"],
  ]],
  ["express-003", "POST submits data and often creates a server-assigned resource.", [
    ["What status is useful after creation?","201 Created, commonly with a Location header."],
    ["How do you prevent duplicate creates on retry?","Support an idempotency key when the operation needs retry safety."],
    ["Who assigns the new resource ID?","The server commonly assigns it for collection POST."],
  ], [
    ["Create a resource","Express Notes","201 and Location /books/5"],
    ["Reject an invalid POST"," ","400 with INVALID_TITLE"],
  ]],
  ["express-004", "PUT replaces the representation at a known resource URI.", [
    ["What is PUT's idempotent effect?","Repeating the same replacement leaves the intended resource state the same."],
    ["May a PUT create a missing resource?","An API may support creation at a client-known URI. This demo requires an existing record."],
    ["What do omitted fields mean?","In a replacement contract, omitted fields are cleared or defaulted according to the schema."],
  ], [
    ["Replace a book and read it back","Updated book","The read shows the replacement and default price"],
    ["Repeat the same replacement","Same result","Two successful replacements produce the same representation"],
  ]],
  ["express-005", "PATCH applies a partial update according to the endpoint's patch format.", [
    ["Is every PATCH idempotent?","The defined operation decides. Assigning a fixed title is idempotent but incrementing a counter is not."],
    ["How does PATCH preserve untouched fields?","The handler merges only validated fields into the previous representation."],
    ["Why document the patch format?","Clients need to know whether fields are assigned, removed, or interpreted as operations."],
  ], [
    ["Change a title while preserving other fields","Renamed guide","The title changes and the price stays 30"],
    ["Patch a missing book","New title","404 with BOOK_NOT_FOUND"],
  ]],
  ["express-006", "DELETE requests removal of a resource at a specific URI.", [
    ["Can a second DELETE return 404?","Yes. The intended final state remains absent, even if the status changes."],
    ["Can a 204 include a JSON body?","A 204 response has no response content."],
    ["What can clients do after a successful deletion?","Invalidate or refresh views that reference the deleted resource."],
  ], [
    ["Delete and then read the resource","","204 followed by 404"],
    ["Delete the same resource twice","","204 followed by 404"],
  ]],
  ["express-007", "Route parameters capture named path segments.", [
    ["Where are named path values exposed?","req.params contains the parameters from the matched route."],
    ["Why validate a numeric ID?","Path segments arrive as strings and can have invalid forms."],
    ["What is a missing record response?","Use 404 when a valid identifier has no matching resource."],
  ], [
    ["Decode one path segment","Node and Express","The path parameter is decoded"],
    ["Read two named parameters","","Both topic and lesson appear"],
    ["Dynamic route parameters","3","The selected book is returned","express-040"],
  ]],
  ["express-008", "Query parameters describe optional filters and controls without changing the matched route.", [
    ["What shapes can query values have?","The configured parser may return strings, arrays, or structured values. Validate what the handler accepts."],
    ["How do you preserve a literal ampersand?","Use URLSearchParams or equivalent URL encoding."],
    ["Where should pagination use defaults?","Apply a documented default when a parameter is absent."],
  ], [
    ["Encode a search term","Node & Express","The decoded term retains the ampersand"],
    ["Read repeated filters","","Two tags arrive in an array"],
    ["Query string handling","web","The category value appears in the response","express-041"],
  ]],
  ["express-009", "Express body parsers interpret request bytes according to Content-Type.", [
    ["When is req.body populated?","After suitable middleware accepts and parses the incoming content."],
    ["Is a parsed object trusted?","It still needs runtime validation."],
    ["Where does the parser limit apply?","The parser rejects the request when the body exceeds its configured size."],
  ], [
    ["Parse JSON","Read Express","The JSON title appears in req.body"],
    ["Parse URL-encoded form fields","Ada & Grace","The form value preserves spaces and ampersand"],
  ]],
  ["express-010", "HTTP status codes describe how the server handled a request.", [
    ["How do 401 and 403 differ?","401 concerns missing or invalid credentials. 403 concerns insufficient permission."],
    ["When is 409 useful?","When current resource state conflicts with the requested change."],
    ["When does a response become committed?","Sending headers prevents changing status or header fields afterward."],
  ], [
    ["Redirect with an explicit status","","307 and Location /target"],
    ["Return no content","","204 with no response body"],
  ]],
  ["express-011", "A router groups handler stacks under a mount path.", [
    ["How do router paths combine with mount paths?","The router matches the remaining path after its mount prefix."],
    ["What does req.baseUrl expose?","The matched path under which the router was mounted."],
    ["How can a nested router read parent parameters?","Enable mergeParams and validate the inherited values."],
  ], [
    ["Mount a router below a prefix","","The route responds at /api/books"],
    ["Read inherited route parameters","","The child sees team and entry"],
    ["Route handling","","GET and POST at the same path reach different handlers","express-039"],
  ]],
  ["express-012", "Express runs matching middleware in registration order until a handler ends the response.", [
    ["What does app.use match?","It matches a mount prefix across HTTP methods."],
    ["How do route-scoped middleware differ?","They run only for a matching route and method."],
    ["What does res.locals store?","Request-scoped values that downstream middleware can read."],
  ], [
    ["Follow two middleware stages","","app → route"],
    ["Mount middleware under a prefix","","The mounted handler adds the X-Lab-Scope header"],
    ["Short-circuit a request","","403 with stopped before route"],
    ["Pass a route-specific value","","The route receives route-scope"],
    ["Run different middleware for two paths","","Only the scoped response carries X-Lab-Scope"],
  ]],
  ["express-013", "next advances a matching stack or transfers handling to the error path.", [
    ["When should middleware call next()?","When it has completed its work and leaves the response to a subsequent handler."],
    ["What does next('route') do?","Inside a route stack, it skips the remaining handlers for that route."],
    ["Why avoid next after sending?","Downstream code could try to write a response that has already started."],
  ], [
    ["Skip the rest of a route stack","","The fallback route responds"],
    ["Forward a controlled error","","422 with BAD_LESSON_DATA"],
  ]],
  ["express-014", "A request traverses parsing and handler stages, then a response finishes or its connection closes.", [
    ["When is response finish emitted?","Once the response data has been handed off to the underlying system."],
    ["What does close tell you?","It signals that the response completed or the connection terminated early."],
    ["Why attach response observers before downstream handlers?","The response can finish before a later observer is registered."],
  ], [
    ["Inspect the request and response stages","","A middleware sets a response header before the handler sends JSON"],
    ["Observe a response finish event","","The observer records the completed status"],
  ]],
  ["express-015", "Custom middleware centralizes reusable request and response behavior.", [
    ["How can a middleware factory take options?","Return a request handler that closes over the supplied options."],
    ["Where should shared request state live?","Use res.locals or a typed request extension with a clearly defined owner."],
    ["How can execution order be verified?","Record actual steps and assert their order from an HTTP request."],
  ], [
    ["Attach a correlation header","","X-Lab-Request is present"],
    ["Apply a configurable response policy","","X-Lab-Policy is private"],
    ["Normalize data once","  Express  ","The title is trimmed before the handler runs"],
    ["Reject a missing prerequisite","","400 with MISSING_DEMO_HEADER"],
    ["Read middleware context in the handler","","The handler sees locale en"],
    ["Custom middleware execution order","","validate → annotate → respond","express-043"],
  ]],
  ["express-016", "Express provides middleware for parsing JSON, text, URL-encoded fields, raw bytes, and serving static files.", [
    ["How does Express choose a parser?","Each parser checks the request Content-Type against its configured type."],
    ["Why scope an express.raw parser?","Other routes may need a different parsed value and a separate size limit."],
    ["What directory should express.static serve?","Use a dedicated public-assets directory with explicitly publishable files."],
  ], [
    ["Use express.json","hello","JSON objects become JavaScript data"],
    ["Use express.text","hello","Plain text is parsed as a string"],
    ["Use express.raw","hello","The handler receives five bytes"],
    ["Use express.urlencoded","Ada","The form field is parsed"],
    ["Enforce a parser size limit","","413 with BODY_TOO_LARGE"],
  ]],
  ["express-017", "Error middleware has four parameters and runs after an error reaches the routing stack.", [
    ["What determines error middleware arity?","Express identifies an error handler by its four-argument signature."],
    ["Where should error middleware be mounted?","After the relevant normal handlers and missing-route handling."],
    ["How do you delegate after headers were sent?","Pass the error onward to Express rather than attempting a second response."],
  ], [
    ["Handle a synchronous throw","","422 with LESSON_ERROR"],
    ["Handle next(error)","","409 with LESSON_CONFLICT"],
    ["Handle malformed JSON","{invalid","400 with INVALID_JSON"],
    ["Skip remaining normal middleware","","A controlled failure reaches the error response"],
    ["Translate a domain failure","","409 with DUPLICATE_ENTRY"],
  ]],
  ["express-018", "Express 5 forwards errors from promise-returning handlers to error middleware.", [
    ["What happens when an async handler rejects?","Express 5 routes the rejection to its error chain."],
    ["How should callback errors be delivered?","Forward them with next(error) when they occur outside a returned promise."],
    ["Why return or await a promise?","The framework can observe failures in the returned work."],
  ], [
    ["Reject an awaited operation","","503 with SERVICE_BUSY"],
    ["Forward a callback failure","","422 with CALLBACK_ERROR"],
  ]],
  ["express-019", "A centralized formatter maps failures to a consistent status and public response body.", [
    ["Why use a stable machine-readable code?","Clients can branch on it without parsing user-facing text."],
    ["What should an unexpected exception disclose?","Give clients a generic response and retain diagnostic details in appropriately protected logs."],
    ["Should 404s use the same contract?","A final route can forward a missing-resource error to the formatter."],
  ], [
    ["Inspect a typed error envelope","","404 with ITEM_MISSING, message, and request ID"],
    ["Sanitize unexpected exceptions","","500 with INTERNAL_ERROR"],
    ["Centralized error handling","","A missing route uses the same public envelope","express-046"],
  ]],
  ["express-020", "REST endpoints organize representations and operations around resources.", [
    ["How do collection and member URLs differ?","The collection represents a set. A member URI identifies one resource."],
    ["Why issue a Location header?","It gives the client the URI of the created resource."],
    ["What makes a CRUD exercise repeatable?","Seed a fresh data store per run and verify state after each mutation."],
  ], [
    ["Discover a collection representation","","The seeded list contains four records"],
    ["Follow the created resource location","REST guide","201 then 200 for the created member"],
    ["Full CRUD REST API","Express project","201, 200, 200, 204, then 404","express-047"],
  ]],
  ["express-021", "Versioned API boundaries let older and newer response contracts coexist.", [
    ["When should a version change?","Use a new version for incompatible contract changes."],
    ["Can the two versions share business logic?","Yes. Keep representation adapters at the boundary."],
    ["Where can version choice be expressed?","A path, header, or media type can select it if the client contract is consistent."],
  ], [
    ["Compare v1 and v2 representations","","v1 returns an array and v2 includes metadata"],
    ["Report a retirement signal","","v1 includes X-Lab-Sunset"],
  ]],
  ["express-022", "Authentication middleware establishes a caller's identity before protected logic runs.", [
    ["What should a bearer challenge look like?","Use HTTP 401 with an appropriate WWW-Authenticate challenge."],
    ["Is a public teaching token a production session?","Use it only with synthetic examples. Production sessions require independently issued and verified credentials."],
    ["Why centralize authentication?","It applies the same verification to each protected route."],
  ], [
    ["Request without credentials","","401 and a Bearer challenge"],
    ["Use the public reader credential","","The authenticated role is reader"],
    ["Use the public editor credential","","The authenticated role is editor"],
    ["Reject an unrecognized demo credential","","401 with SESSION_REQUIRED"],
    ["Compare public and protected routes","","Public route returns 200. Protected route returns 401"],
    ["Authentication middleware","","The public teaching credential reaches the protected route","express-044"],
  ]],
  ["express-023", "Authorization decides whether an authenticated caller can perform an operation.", [
    ["What status represents insufficient permission?","Use 403 for an authenticated caller without the required permission."],
    ["Where should a protected operation check access?","Authorize at the server boundary for each protected request."],
    ["Why run authentication first?","Authorization depends on the identity and claims established by authentication."],
  ], [
    ["Reject a read-only caller","","403 with EDITOR_REQUIRED"],
    ["Allow an authorized caller","","200 with allowed true"],
    ["Authorization middleware","","The same route rejects reader and accepts editor","express-045"],
  ]],
  ["express-024", "Role-based access control maps assigned roles to allowed operations.", [
    ["How should an unknown role behave?","Reject by default unless a permission rule explicitly allows it."],
    ["How do roles differ from permissions?","A role names a bundle of permissions, while a permission describes an allowed operation."],
    ["Why keep the capability matrix centralized?","It makes rules easier to review and test across routes."],
  ], [
    ["Map two synthetic roles to permissions","","Reader can read. Editor can read and write."],
    ["Require a write role","","Reader receives 403 and editor receives 201"],
  ]],
  ["express-025", "Runtime validation checks shape, bounds, and acceptable values before a handler uses input.", [
    ["Why does a TypeScript interface not validate JSON?","Type annotations are erased and HTTP data must be checked at runtime."],
    ["Should extra fields be accepted?","Choose an explicit policy. Strict schemas can reject unexpected fields early."],
    ["Where should normalization happen?","Normalize after checking the input type, before passing the value downstream."],
  ], [
    ["Trim a valid title","  Valid title  ","201 with a trimmed title"],
    ["Reject an extra field","Valid title","400 with INVALID_TITLE"],
    ["Request body validation"," ","The blank title returns 400. A valid title returns 201.","express-042"],
  ]],
  ["express-026", "CORS response headers tell browsers which origins can read a cross-origin response.", [
    ["Does CORS authenticate a caller?","It expresses browser access rules. Authentication is still required on protected routes."],
    ["What triggers a preflight?","The browser can send OPTIONS before a request with a method or headers outside the simple request rules."],
    ["Why send Vary: Origin?","Shared caches need to distinguish responses generated for different origins."],
  ], [
    ["Return an allowlisted origin","https://example.test","The allowed origin is reflected and Vary includes Origin"],
    ["Compare preflight policy","","Only the allowed origin receives CORS approval headers"],
  ]],
  ["express-027", "Security headers express browser policies for interpreting content and sharing navigation information.", [
    ["What does nosniff do?","It tells browsers to follow the declared content type for relevant resources."],
    ["What does Referrer-Policy control?","It sets how much referrer information accompanies browser requests."],
    ["Why set policies consistently?","A shared middleware applies the intended policy to all relevant routes."],
  ], [
    ["Set an explicit content-type policy","","X-Content-Type-Options is nosniff"],
    ["Apply a shared referrer policy","","Both routes send no-referrer"],
  ]],
  ["express-028", "Rate limiting bounds request volume during a defined time window.", [
    ["What status communicates a rate limit?","Use 429 and include a retry hint where available."],
    ["What is a weakness of a process-local counter?","Independent application instances each maintain their own counts."],
    ["What should key a production limit?","Choose a trusted client or identity key appropriate for the endpoint."],
  ], [
    ["Observe the remaining request budget","","The first response has one remaining request"],
    ["Watch an independent window start fresh","","The first request of a fresh run has a new budget"],
    ["Rate limiting","","Two 200 responses then 429 with Retry-After","express-049"],
  ]],
  ["express-029", "Cookies carry small values in Set-Cookie responses and Cookie request headers.", [
    ["What does HttpOnly restrict?","It prevents JavaScript from reading the cookie through document.cookie."],
    ["What does SameSite affect?","It controls whether browsers send the cookie in certain cross-site contexts."],
    ["When should Secure be set?","Use it for cookies that should only be sent over HTTPS."],
  ], [
    ["Inspect cookie attributes","","Set-Cookie includes HttpOnly and SameSite=Lax"],
    ["Send the issued cookie on the next request","","The second response confirms the fixture cookie"],
  ]],
  ["express-030", "A server-side session links a cookie identifier to state managed on the server.", [
    ["What does a session cookie contain?","Typically an opaque identifier that the server resolves against a session store."],
    ["What should happen on sign-out?","Revoke the server session and clear the corresponding client cookie."],
    ["Why use a shared session store for multiple instances?","Each instance needs consistent access to the same session state."],
  ], [
    ["Sign in and read server session state","","201 followed by a profile response"],
    ["Revoke the server session","","204 then 401 when presenting the old cookie"],
  ]],
  ["express-031", "An upload endpoint parses multipart fields and enforces size and content rules.", [
    ["Does express.json parse multipart bodies?","It handles JSON. Multipart requires a parser appropriate to that format."],
    ["Is an uploaded MIME label proof of file contents?","A client supplies the label. Check contents where the workflow requires it."],
    ["Why avoid saving the original filename directly?","Use a controlled storage name and validate metadata before persistence."],
  ], [
    ["Send a bounded text file","Hello Express","201 with the bytes of the generated text fixture"],
    ["Reject a fixture above the size cap","64 byte limit","400 with INVALID_FILE"],
  ]],
  ["express-032", "Pagination returns a bounded slice with metadata for navigating a result set.", [
    ["Why include a stable order?","A consistent order keeps page boundaries meaningful."],
    ["What is an offset pagination tradeoff?","Large offsets can be expensive and inserts may shift subsequent pages."],
    ["Where is the filter applied?","Filter the complete query before computing its total and selecting a page."],
  ], [
    ["Read the second page","","Page 2 contains the last two records"],
    ["Reject an invalid page","","400 with INVALID_FILTER"],
    ["Pagination and filtering","web","Page 1 returns two web titles and total 2","express-048"],
  ]],
  ["express-033", "Filtering restricts the resource set according to explicitly supported values.", [
    ["Why use an allowlist for filter fields?","It gives clients a stable contract and avoids exposing unintended query options."],
    ["What should happen with an invalid category?","Return an input error if the API defines a closed category set."],
    ["How do you combine filters and pagination?","Apply filters first and then page the matching result set."],
  ], [
    ["Filter by category","runtime","The result contains both runtime books"],
    ["Reject an unsupported filter","unknown","400 with INVALID_FILTER"],
  ]],
  ["express-034", "Sorting orders records by a documented key, direction, and tie-breaker.", [
    ["Why specify a secondary key?","It gives tied values a deterministic order across requests."],
    ["How do you validate sort direction?","Accept only documented options, such as asc and desc."],
    ["Does sort mutate its array?","Array.prototype.sort mutates. Copy first or use toSorted."],
  ], [
    ["Sort prices ascending","","Prices appear as 10, 20, 20, 30"],
    ["Sort prices descending with stable ties","","Equal prices are ordered by book ID"],
  ]],
  ["express-035", "Request logs capture selected HTTP metadata and correlate it with a request identifier.", [
    ["Which fields help diagnose a request?","Method, route, status, elapsed time, and a request ID are useful starting points."],
    ["Why avoid logging raw headers?","Authorization and cookie fields can carry credentials."],
    ["When should duration be recorded?","Use a monotonic clock when the response finishes or closes."],
  ], [
    ["Capture a structured completion entry","","The log entry contains method, status, and elapsedMs"],
    ["Log only named safe fields","","The entry records the method and a request ID"],
  ]],
  ["express-036", "HTTP tests verify observable status, headers, bodies, and state transitions.", [
    ["Why exercise the actual routing stack?","It verifies middleware ordering, parsing, and status mapping as clients observe them."],
    ["How do you keep API tests repeatable?","Use fresh fixtures and explicitly assert the starting and final state."],
    ["What should a failure test assert?","Check the intended status and error code so unrelated failures do not satisfy it."],
  ], [
    ["Assert the health response","","The assertion reports passed true"],
    ["Assert invalid data is rejected","","The assertion reports passed true with 400"],
    ["API tests","Test title","Both HTTP contract assertions pass","express-050"],
  ]],
  ["express-037", "Production error handling keeps response contracts stable and limits diagnostic details exposed to clients.", [
    ["What belongs in a public 500 response?","A generic explanation and a correlation identifier are often enough."],
    ["Why avoid stack traces in responses?","They can expose internal implementation and deployment details."],
    ["What is useful in an internal error event?","Record the correlation identifier and diagnostic context appropriate to your logging policy."],
  ], [
    ["Return a safe public 500","","INTERNAL_ERROR and a generic message"],
    ["Keep public errors correlated","","A request ID appears in the 503 response and response header"],
  ]],
];

export const expressCatalog = lessons.map(([id, description, questions, entries]) => {
  let number = 0;
  const examples = entries.map(([title, initial, expected, requirement]) => ({
    id: requirement ? requirement + '.e01' : id + '.e' + String(++number).padStart(2, '0'),
    title, initial, expected
  }));
  return { id, description, questions, examples };
});
