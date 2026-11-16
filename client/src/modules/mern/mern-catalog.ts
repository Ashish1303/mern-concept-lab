type Scenario = [title: string, description: string, exampleTitle: string, expected: string, interview: [string, string][]];

const scenarios: Scenario[] = [
  ["React form calling Express", "A React form sends an HTTP POST and renders the record returned from MongoDB.", "Save a sample title", "The new item appears with a database identifier.", [
    ["Where should form submission start?","Handle submit on the form so keyboard and button submission use the same code."],
    ["What causes the persisted result to render?","The completed Express response updates React state."],
    ["Why should the server validate the submitted title?","A caller can send requests without the React form."],
  ]],
  ["Express reading/writing MongoDB", "Express uses a Mongoose model to write a record and performs a separate read to verify it.", "Save and read back", "The title appears in both the write response and a fresh query.", [
    ["Why do a separate read?","It verifies the stored representation and query contract."],
    ["Where does the model get its connection?","The model is scoped to the workspace-owned Mongoose connection."],
    ["What should a handler return if a read fails?","Map an expected error to a stable public status and code."],
  ]],
  ["Full CRUD application", "The React controls share one workspace and issue create, read, update, and delete requests.", "Create, update and delete one item", "Read-back shows the created title, then you can update it and confirm it is gone after deletion.", [
    ["What should update and delete use to identify a record?","Use its stable database identifier."],
    ["Why confirm delete with a read?","It verifies the stored state after the request completed."],
    ["When should an API return 404?","When a valid identifier has no matching resource."],
  ]],
  ["Registration", "Express validates sample credentials, hashes the password, and stores an account in MongoDB.", "Register a synthetic user", "The server returns the teaching username, reader role, and hash-storage confirmation.", [
    ["Why enforce unique usernames in the database?","A unique index resolves competing writes atomically."],
    ["Where is the initial role assigned?","The registration handler fixes it to reader."],
    ["What account fields should the response omit?","Exclude the verifier and salt."],
  ]],
  ["Login", "The login handler checks a submitted fixture password against the persisted verifier.", "Register then sign in", "The UI reports successful authentication with a reader role.", [
    ["How should wrong credentials be reported?","Use a generic authentication error that avoids revealing which field was wrong."],
    ["Why send the sample password only in the request body?","URLs appear in many logs and histories."],
    ["Where is the JWT generated?","The server issues it after verification succeeds."],
  ]],
  ["Password hashing", "A salted scrypt verifier is persisted, then checked during login.", "Verify the persisted password hash", "Register, then verify against the stored hash. The UI shows verification without exposing the verifier.", [
    ["Why use scrypt instead of a plain hash?","A password derivation function increases the cost of each guessing attempt."],
    ["Why use a random salt?","It gives otherwise equal passwords distinct stored verifiers."],
    ["What should the UI show?","Show the verification outcome and keep secret values off-screen."],
  ]],
  ["JWT authentication", "The API checks a signed access token before returning a profile.", "Verify token and profile", "A missing token is rejected. A signed token returns the authenticated profile.", [
    ["What must the verifier check besides the signature?","Check algorithm policy, audience, expiry, and expected claim types."],
    ["Does base64url encrypt claims?","It only encodes them. Avoid placing secrets in claims."],
    ["What controls token lifetime?","The server issues and checks an expiration timestamp."],
  ]],
  ["Access and refresh token flows", "The refresh endpoint consumes the active opaque value and issues a replacement session.", "Rotate and reject the previous value", "Rotation succeeds and the previous refresh value is rejected.", [
    ["What does rotation change?","A refresh consumes the current value and returns a new one."],
    ["Why delete the stored digest atomically?","Only one request can use the same refresh value successfully."],
    ["Why store a digest?","The server can identify the presented refresh value without storing the raw value."],
  ]],
  ["Protected routes", "A React Router guard redirects signed-out learners, and Express separately protects the profile endpoint.", "Visit the private route before and after sign-in", "Signed-out navigation redirects. After sign-in, the private route can load the server profile.", [
    ["What problem does a client route guard solve?","It guides navigation and keeps inappropriate screens hidden."],
    ["Where is API authorization enforced?","The Express handler verifies the token before returning data."],
    ["What should happen after an expired token?","Prompt for a fresh session or run the refresh flow."],
  ]],
  ["Backend role-based authorization", "Express uses a verified role claim to decide access to an editor resource.", "Compare reader and editor permissions", "A reader receives 403. The editor fixture can read the protected resource.", [
    ["What is the difference between 401 and 403?","401 means the request lacks valid authentication. 403 means permission is insufficient."],
    ["Who sets the role?","The server chooses the role when issuing the signed token."],
    ["Why test both roles?","It proves the endpoint denies and permits the intended callers."],
  ]],
  ["RTK Query integration", "An RTK Query mutation invalidates the item-list tag and reloads data through Express and MongoDB.", "Create a record and invalidate the list", "The mutation adds an item and list totals refresh.", [
    ["Why tag a query?","A mutation can invalidate resources that may be stale."],
    ["Where are results cached?","RTK Query stores them under the endpoint and serialized arguments."],
    ["What is the source of the refreshed total?","The database-backed API provides the authoritative count."],
  ]],
  ["Search", "A React search field becomes an encoded query and MongoDB applies a literal title filter.", "Search titles by substring", "The MongoDB query returns matching titles and a filtered total.", [
    ["Why escape regex input?","It keeps the search field literal."],
    ["What belongs in the URL?","Encode documented search parameters, such as q."],
    ["Does simple substring search scale to every workload?","Choose an indexed search strategy appropriate to production search behavior."],
  ]],
  ["Sorting", "The client chooses a direction and MongoDB applies the order before paging.", "Switch between ascending and descending", "Changing the direction changes the returned first page.", [
    ["Where must sort happen for paged data?","Order the full matching set before selecting a page."],
    ["Why include a tie-breaker?","It gives equal titles a stable order."],
    ["Why restrict the direction?","It keeps client choices within the documented query contract."],
  ]],
  ["Pagination", "The API returns a bounded page, result count, and page size from MongoDB.", "Read two result pages", "Page one contains two rows and page two contains the remaining row.", [
    ["What is pageSize?","It sets the maximum number of items returned in a response."],
    ["How does a client determine the last page?","Use the returned total and page size."],
    ["How can deep offsets affect performance?","The database must advance over earlier results."],
  ]],
  ["Form validation", "React gives immediate title feedback and Express rejects invalid direct submissions.", "Compare client and server validation", "The UI blocks a short title and the server rejects an invalid API request with 400.", [
    ["Why validate twice?","Client validation improves feedback and server validation protects storage."],
    ["Where should normalization happen?","Trim and validate the title at the server boundary."],
    ["How can you test both rules?","Submit an invalid form and send an invalid request directly."],
  ]],
  ["File uploads", "The client constructs a multipart text fixture, and Express parses it and stores the text in MongoDB.", "Upload generated file text", "The API returns recorded bytes and the text read back from MongoDB.", [
    ["Why limit size before parsing?","It bounds the memory allocated for the request."],
    ["Why use a server-defined filename?","The storage key should be controlled by the application."],
    ["How does the client indicate multipart content?","The request declares a boundary matching the encoded part body."],
  ]],
  ["Optimistic updates", "RTK Query previews a rename, then either reconciles the accepted write or undoes a rejected patch.", "Compare rollback and persistence", "A temporary edit appears while saving. Rejection restores the previous title.", [
    ["Where is the optimistic patch applied?","onQueryStarted updates the relevant cached query entry."],
    ["What happens if the request fails?","Undo the cache patch and report the failure."],
    ["Why refresh after success?","The persisted result and sorting remain authoritative."],
  ]],
  ["Error handling", "The API sends a controlled failure and React presents a retry action.", "Load a controlled error and recover", "The UI reports HTTP 503 and a successful retry renders items.", [
    ["Why return a stable error envelope?","Clients can show consistent errors and act on error codes."],
    ["Which errors are reasonable to retry?","Transient failures can be retried if the operation tolerates it."],
    ["Why keep stack traces out of the UI?","User-facing errors should contain relevant recovery details."],
  ]],
  ["Loading states", "The client renders an in-flight state while Express delays a real database query.", "Observe the pending and completed states", "Loading text appears before the MongoDB rows arrive.", [
    ["When does loading start?","Mark it when the request is dispatched."],
    ["When should it clear?","Clear it on success and failure."],
    ["Why disable a submission while pending?","It prevents unintended consecutive requests for the same action."],
  ]],
  ["API testing", "An executable HTTP contract check runs a valid create, invalid create, and database read.", "Run HTTP contract assertions", "The check reports PASS conditions for 201, 400, and one stored match.", [
    ["What should a success test assert?","Assert the status and resulting stored state."],
    ["What should the invalid case verify?","Check the specific rejection and preserve database state."],
    ["Why use an isolated workspace?","Assertions should start from known data every time."],
  ]],
  ["React integration testing", "The verified integration test uses the actual React controls and a live Express and MongoDB fixture.", "Submit the tested React form", "Submitting shows the stored title in the rendered result.", [
    ["What should a React integration test interact with?","Use visible controls and accessible labels."],
    ["What proves persistence through the stack?","Assert the rendered response and read the stored item separately."],
    ["Why test a real local API here?","It exercises the browser-facing contract and database wiring together."],
  ]],
  ["Environment configuration", "The running app reports database readiness and its runtime mode through an allowlisted endpoint.", "Check runtime and database readiness", "The screen reports MongoDB readiness and the app mode.", [
    ["When should ports and mode be validated?","Validate them at startup before opening listeners."],
    ["Where should real secrets live?","Supply them to the server through deployment configuration."],
    ["What can a readiness page reveal?","Report coarse operational status and keep configuration values private."],
  ]],
  ["Production build and deployment walkthrough", "The built app serves compiled React, the Express API, and an isolated snippet preview.", "Verify the deployed local build", "On the production port, the runtime mode is production and MongoDB is ready.", [
    ["Which assets must the build produce?","Compile client assets, server code, and the snippet preview runtime."],
    ["Why run a production smoke test?","It checks built routing, API wiring, and preview configuration."],
    ["What should production startup receive?","Supply a validated runtime environment and explicitly provision the database connection."],
  ]],
];

export const mernCatalog = scenarios.map(([title, description, exampleTitle, expected, interview], index) => {
  const number = String(index + 1).padStart(2, '0');
  const id = 'mern-0' + number;
  return {
    id, title, description, expected, interview,
    examples: [{ id: id + '.e01', title: exampleTitle }],
    component: 'Example' + number
  };
});
