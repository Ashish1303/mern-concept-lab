type Entry = [title: string, initial: string, expected: string, requirement?: string];
type Lesson = [id: string, description: string, interview: [string, string], examples: Entry[]];

const lessons: Lesson[] = [
  ["mongodb-001", "A MongoDB database namespaces its collections and operations.", ["What does selecting a database do?","It chooses a namespace for later operations. Writes or explicit collection creation materialize storage."], [
    ["Inspect the isolated namespace","","The lab namespace has its own books and authors collections"],
    ["Ping the database server","","The driver receives ok 1"],
  ]],
  ["mongodb-002", "A collection stores documents and has its own indexes.", ["When is explicit collection creation useful?","Use it to configure options before inserting data."], [
    ["Create an empty collection","","The notes collection appears with zero documents"],
    ["Read collection names after seeding","","authors and books exist"],
  ]],
  ["mongodb-003", "MongoDB documents can store nested objects, arrays, and other BSON values.", ["How does dot notation work?","It addresses a nested value such as details.pages without replacing the whole object."], [
    ["Read a nested document","Mongo Primer","The book includes a nested details object and tags"],
    ["Change one nested field","124","The page count changes and the rating is preserved"],
  ]],
  ["mongodb-004", "BSON represents values such as ObjectIds, dates and decimals with explicit types.", ["Why can BSON represent more than plain JSON?","The binary encoding includes type markers for values such as Date and Decimal128."], [
    ["Round-trip BSON data","Mongo","The date survives serialization as a Date"],
    ["Check a stored type on the server","","The author field has BSON type objectId"],
  ]],
  ["mongodb-005", "ObjectId is a BSON identifier. Its text form has 24 hexadecimal characters.", ["Why convert an incoming ID before querying?","A BSON ObjectId and a string with the same characters compare as different types."], [
    ["Query with a parsed ObjectId","000000000000000000000001","Ada is returned"],
    ["Read the timestamp from an ObjectId","000000000000000000000001","The embedded timestamp starts at the Unix epoch"],
  ]],
  ["mongodb-006", "CRUD operations create, read, update, and delete records.", ["What should a CRUD test verify?","Check the operation result and observe stored state after each mutation."], [
    ["Run a complete document lifecycle","New database note","Create, read, update and delete are performed on one ID"],
    ["Inspect result counts for a missing match","","No matched, modified, or deleted records"],
  ]],
  ["mongodb-007", "find returns a cursor that can filter, sort, and limit results.", ["Why avoid converting an unbounded cursor to an array?","It can load an arbitrarily large result into application memory."], [
    ["Find books by category","db","Two database books match"],
    ["Iterate selected results","","The cursor yields the first two titles by price"],
    ["Find documents","web","Both web titles appear","mongodb-061"],
  ]],
  ["mongodb-008", "findOne returns one matching document or null.", ["How do you choose a deterministic match?","Filter on a unique key or specify an explicit sort."], [
    ["Find a specific title","Node Guide","The matching document is returned"],
    ["Find the highest price with a stable tie-breaker","","The alphabetical title wins the price tie"],
  ]],
  ["mongodb-009", "insertOne stores a document and returns its inserted identifier.", ["When is _id generated automatically?","The driver generates an identifier when the document omits one."], [
    ["Insert and read a title","Index notebook","The inserted record is returned by its identifier"],
    ["Insert with an explicit identifier","","The inserted ID is the supplied ObjectId"],
    ["Insert documents","Interview notes","One book is added to the seeded collection","mongodb-060"],
  ]],
  ["mongodb-010", "insertMany submits a batch of documents and reports successful insertions.", ["What changes with ordered false?","The server can continue processing other writes after a failing item."], [
    ["Insert a small batch","Batch","Two documents are stored"],
    ["Observe unordered partial success","","A duplicate ID fails while a distinct record persists"],
  ]],
  ["mongodb-011", "updateOne modifies at most one matching document.", ["How do matchedCount and modifiedCount differ?","A matched document may already contain the requested value."], [
    ["Set one stored field","25","One matched and one modified document"],
    ["Compare a no-op update","","The book matches but already contains price 20"],
    ["Update documents","Updated primer","The selected book is renamed","mongodb-062"],
  ]],
  ["mongodb-012", "updateMany applies an update to every document matching its filter.", ["Is the entire multi-document update one atomic unit?","Individual document writes are atomic. Use a transaction when the group must commit together."], [
    ["Raise prices in a category","db","Both matching books have higher prices"],
    ["Add a shared tag without duplicates","","Two tagged books remain after applying the update twice"],
  ]],
  ["mongodb-013", "deleteOne removes at most one matching document.", ["What does a deletedCount of zero mean?","The operation found no matching document to remove."], [
    ["Delete one selected title","Node Guide","One book is deleted and three remain"],
    ["Delete a missing document","","Deleted count is zero"],
    ["Delete documents","API Patterns","The title is absent after deletion","mongodb-063"],
  ]],
  ["mongodb-014", "deleteMany removes every document matching a filter.", ["Why verify a deleteMany filter?","An empty filter matches the whole collection. Use explicit scope for targeted removals."], [
    ["Remove one category from owned fixtures","db","Two seeded books remain"],
    ["Run a bounded delete for an absent category","","All four books remain"],
  ]],
  ["mongodb-015", "Query operators express predicates over fields.", ["Why build the filter server-side?","It keeps the accepted operators and field names under application control."], [
    ["Select several prices","30","Both 30-price books match"],
    ["Check field existence","","All books contain details.rating"],
    ["Filter records","20","Only books costing at least 20 match","mongodb-064"],
  ]],
  ["mongodb-016", "Logical operators combine predicates with boolean conditions.", ["When is an explicit $and useful?","Use it if independent conditions cannot be expressed as distinct keys in one filter."], [
    ["Join category alternatives","","The database category or lowest price matches"],
    ["Exclude either matching condition","","Only books outside both conditions remain"],
  ]],
  ["mongodb-017", "Comparison operators express ranges and equality over BSON values.", ["How do $gt and $gte differ?","$gte includes records equal to the boundary. $gt excludes them."], [
    ["Select a closed price range","20","Prices from 20 through 30 match"],
    ["Exclude an exact numeric value","30","Two books have different prices"],
  ]],
  ["mongodb-018", "Projection controls the fields included in query results.", ["Can inclusions and exclusions be mixed?","MongoDB permits the _id exception. Other fields generally use one projection mode."], [
    ["Include only two fields","","Title and price are returned without _id"],
    ["Exclude whole fields","","Tags and details are absent"],
  ]],
  ["mongodb-019", "Sort order uses field directions and can include a stable tie-breaker.", ["Why specify a tie-breaker?","Equal primary keys can appear in either order unless another key orders them."], [
    ["Sort by ascending price","","15, 20, 30, 30"],
    ["Sort by descending pages","","Pages descend from 170 to 90"],
    ["Sort records","","Price descends and title breaks ties","mongodb-065"],
  ]],
  ["mongodb-020", "skip and limit choose a bounded slice of a cursor's result.", ["What is a large skip cost?","The server still has to reach the offset, which can require scanning preceding entries."], [
    ["Skip the first two results","2","The last two titles remain"],
    ["Sort before limiting","","The least expensive book is selected"],
  ]],
  ["mongodb-021", "Pagination returns a bounded subset and a rule for requesting the next subset.", ["Why prefer a cursor for deep pagination?","A suitable index can seek directly after the last seen key."], [
    ["Return an offset page","2","Page two contains the next two books"],
    ["Seek past the last title","Mongo Primer","The next title follows the cursor value"],
    ["Paginate records","1","First page has two results and a total of four","mongodb-066"],
  ]],
  ["mongodb-022", "An embedded document stores related fields within the same parent document.", ["When is embedding a good fit?","Embed bounded data that is commonly read and updated with its parent."], [
    ["Match a nested field with dot notation","5","Two books have rating five"],
    ["Read projected embedded data","","Only the embedded pages field is returned"],
  ]],
  ["mongodb-023", "References store identifiers for related documents in separate collections.", ["What is the tradeoff of a reference?","Independent updates are easier, and reads may need a second query or aggregation join."], [
    ["Resolve a book's author","Mongo Primer","The result includes the matching author"],
    ["Observe a missing referenced document","","The book persists and the deleted author lookup returns null"],
    ["One-to-many relationships","000000000000000000000001","Ada owns two related books","mongodb-069"],
  ]],
  ["mongodb-024", "Data modeling chooses document boundaries based on access patterns.", ["Why avoid an unbounded embedded array?","It continually increases document size and can complicate updates."], [
    ["Read an order with embedded line items","","One query returns its bounded items"],
    ["Store a large relationship as independent rows","","Count rows without loading the parent representation"],
  ]],
  ["mongodb-025", "Indexes provide ordered access paths and add work to writes.", ["When is an index useful?","Choose indexes according to real filters, sorts, and selectivity."], [
    ["Create and inspect an index","","The title index appears beside the _id index"],
    ["Force a known indexed access for observation","20","The price index supports the selected filter"],
  ]],
  ["mongodb-026", "A unique index rejects conflicting values on its indexed key.", ["How does a unique index differ from app validation?","The database enforces the constraint even when concurrent writers race."], [
    ["Reject a duplicate unique title","Unique note","MongoDB returns duplicate-key code 11000"],
    ["Read the unique index configuration","","The title index declares unique true"],
    ["Unique constraint errors","","Duplicate ObjectIds leave one stored record","mongodb-068"],
  ]],
  ["mongodb-027", "A compound index orders key combinations according to the indexed field sequence.", ["What does the prefix rule imply?","A compound index can support queries on its leading keys. A later key alone usually lacks the same efficient bounds."], [
    ["Filter on the leading key","db","The category prefix returns two books"],
    ["Inspect the compound key order","","category precedes price"],
  ]],
  ["mongodb-028", "Query optimization compares execution work for representative access patterns.", ["Which explain measurements are useful?","Compare returned rows, examined documents and keys, and scan stages."], [
    ["Compare scan and indexed document counts","20","The index examines fewer documents for this fixture"],
    ["Use a covered projection","","The hinted index returns titles with zero examined documents"],
  ]],
  ["mongodb-029", "explain exposes planner choices and execution statistics.", ["Does explain timing prove production performance?","Use representative data and repeated measurements. A tiny fixture primarily shows access behavior."], [
    ["Inspect an unindexed scan","","Execution statistics show all four documents examined"],
    ["Inspect key examination for an index","","The hinted price index examines a bounded key range"],
    ["Index behavior and query plans","","The natural scan and indexed path return the same matching count","mongodb-073"],
  ]],
  ["mongodb-030", "An aggregation pipeline passes documents through ordered transformation stages.", ["Why does stage order matter?","Each stage receives the previous stage's output and can change its shape and cardinality."], [
    ["Filter then project","db","Two selected titles remain"],
    ["Group then sort","","Two category totals are sorted"],
    ["Limit after sorting","","The two lowest prices are returned"],
    ["Compute a field with addFields","","Each result includes price with a fixed surcharge"],
    ["Count documents at the end","","Four fixture documents reached the count"],
    ["Aggregation and grouping","","Each category has two books and its own price total","mongodb-071"],
  ]],
  ["mongodb-031", "The aggregation match stage filters documents using query predicates.", ["Why move a selective match early where possible?","It can reduce downstream work and use an index when the pipeline permits it."], [
    ["Match a named category","web","The two web books pass"],
    ["Match an aggregated count","","Only groups with two books remain"],
  ]],
  ["mongodb-032", "The group stage builds one output per key using accumulator expressions.", ["What does _id: null do in a group?","It puts the whole input into a single group."], [
    ["Calculate the average price","","The overall average is 23.75"],
    ["Count books per author","","Both authors have two books"],
  ]],
  ["mongodb-033", "The project stage selects, reshapes, or computes output fields.", ["What is a computed projection?","A new field whose value comes from an aggregation expression."], [
    ["Alias a title","","The title is returned as label"],
    ["Compute the tag count","","Every seeded book has two tags"],
  ]],
  ["mongodb-034", "Lookup joins documents with related records from another collection into an array.", ["What does an unmatched lookup produce?","The original document remains and its joined array is empty."], [
    ["Join book authors by ObjectId","Mongo Primer","The joined author array contains Ada"],
    ["Preserve a row without a match","","The joined array is empty for a missing author"],
    ["Lookup/join","","Each author includes their matched book list","mongodb-072"],
  ]],
  ["mongodb-035", "Unwind emits a separate result for each element of an array.", ["How can unwind retain empty arrays?","Enable preserveNullAndEmptyArrays when those parent rows should survive."], [
    ["Expand each tag into a row","","Four books produce eight rows"],
    ["Preserve an empty array","","The untagged record survives"],
  ]],
  ["mongodb-036", "The aggregation sort stage orders pipeline documents and can follow a computed stage.", ["Why include a secondary key in sort?","It makes output deterministic when the primary sort value ties."], [
    ["Sort computed totals","","Categories rank by cumulative price"],
    ["Sort by price with title ties","","The sorted titles are stable for equal prices"],
  ]],
  ["mongodb-037", "Facet runs multiple subpipelines over the same input stream.", ["Can one facet branch consume another branch?","Each branch processes the same original input independently."], [
    ["Return a page with a total","","One output contains first-page rows and total four"],
    ["Compute separate price and category summaries","","A price summary and category buckets are returned together"],
  ]],
  ["mongodb-038", "A transaction can commit or abort several writes together on a supported deployment.", ["Which operations need the session?","Pass the same session to every read or write participating in the transaction."], [
    ["Commit a native-driver transfer","10","Balances change from 50 and 10 to 40 and 20"],
    ["Abort a native-driver transfer","10","Both balances retain their original values"],
    ["Transactions","12","A committed transfer changes both records and keeps their sum constant","mongodb-074"],
  ]],
  ["mongodb-039", "Array operators query and update elements within an array field.", ["When use $elemMatch?","Use it when multiple predicates must hold for the same array element."], [
    ["Match all requested tags","","Only the database starter matches both tags"],
    ["Use a single element to satisfy two predicates","","Only order 2 has a qualifying book line"],
  ]],
  ["mongodb-040", "A MongoDB text index supports token-based $text search.", ["How does text search differ from substring matching?","The text index interprets words according to its language rules."], [
    ["Find a word through a text index","primer","Mongo Primer matches"],
    ["Sort by text relevance","guide","Matching books include their text scores"],
  ]],
  ["mongodb-041", "TTL indexes let MongoDB's background process remove expired documents.", ["Does a TTL index guarantee immediate deletion?","Expiration is asynchronous. Applications should check expiry when immediate exclusion matters."], [
    ["Inspect a TTL index configuration","","The index uses expireAfterSeconds zero"],
    ["Filter expired documents at read time","","Only active is visible while the TTL background process runs separately"],
  ]],
  ["mongodb-042", "Driver connection pools reuse network connections and bound concurrency per server.", ["Should an application open a client for each normal request?","Reuse a long-lived client for normal production traffic. These exercises use isolated short-lived fixtures."], [
    ["Inspect the configured pool limits","","The pool limit is two connections"],
    ["Share one client across concurrent reads","","Both count queries use the same driver client"],
  ]],
  ["mongodb-043", "A Mongoose connection owns its database handle, models, and driver client.", ["How does createConnection differ from connect?","createConnection returns an independent connection and its own model registry."], [
    ["Inspect an opened connection","","Mongoose reports connected state"],
    ["Run a command through a connection","","The database replies with ok 1"],
  ]],
  ["mongodb-044", "A Mongoose schema defines paths, casting, validation, and document behavior.", ["Is a Mongoose schema enforced for raw driver writes?","Mongoose applies its schema through the ODM. Server-side validation is separately configured."], [
    ["Inspect defined schema paths","","The model declares title, price, category, and other fields"],
    ["Observe ODM field selection","Schema example","A field outside the schema is absent from the stored document"],
  ]],
  ["mongodb-045", "A model compiles a schema into a collection-backed constructor and query interface.", ["Where do you register a model for an independent connection?","Call connection.model rather than registering it on the default Mongoose connection."], [
    ["Create and retrieve through a model","Mongoose notes","A document is stored in odm_books"],
    ["Create two models with a reference","","Author and Book are separately registered and stored"],
  ]],
  ["mongodb-046", "Mongoose validators reject invalid document fields before a normal save.", ["When must update validators be enabled?","Pass runValidators on operations such as updateOne when their validation is required."], [
    ["Reject a negative price","-5","The ValidationError identifies the price field"],
    ["Enable validators for an update","","The rejected update leaves the stored price unchanged"],
    ["Schema validation","invalid","A category outside the enum is rejected","mongodb-067"],
  ]],
  ["mongodb-047", "Required validators check that a schema path has an acceptable present value.", ["How can trim affect required validation?","An all-whitespace string can be trimmed to an empty string and fail required validation."], [
    ["Reject a missing title","","The validation error identifies title"],
    ["Check a title after trimming","   ","The blank title is not stored"],
  ]],
  ["mongodb-048", "Schema defaults fill undefined values during document construction.", ["Does a default replace null?","Defaults apply to undefined. A deliberate null keeps its own meaning."], [
    ["Save omitted fields with defaults","Default note","The stored book has category db and price 10"],
    ["Compare missing with explicit null","","Missing price becomes 10 and explicit null remains null"],
  ]],
  ["mongodb-049", "Schema types define the expected shape and casting behavior of values.", ["What is a cast error?","It occurs when Mongoose cannot convert a value to the expected schema type."], [
    ["Cast a numeric string","24","The stored price is a number"],
    ["Reject a malformed ObjectId","","A query with an invalid identifier raises CastError"],
  ]],
  ["mongodb-050", "Mongoose timestamps track creation and modification using schema-managed fields.", ["Which timestamps are expected to change on a normal update?","updatedAt advances while createdAt stays associated with creation."], [
    ["Read timestamps on creation","Timed note","Both timestamps are present"],
    ["Observe timestamps after an update","","Creation stays the same and updatedAt advances"],
  ]],
  ["mongodb-051", "Mongoose middleware runs around document, query, model, and aggregation operations.", ["Why register hooks before compiling a model?","Model compilation captures the schema middleware configuration."], [
    ["Normalize text before saving","  Learn Mongoose  ","The pre-save hook stores normalized text"],
    ["Observe a post-save hook","","The hook records the saved title"],
    ["Record a query hook","","The hook captures the filter used by find"],
    ["Observe validation before saving","","Validation middleware runs before save middleware"],
    ["Inspect aggregation middleware","","The hook runs when the aggregation executes"],
  ]],
  ["mongodb-052", "populate resolves referenced values into related documents for a Mongoose query.", ["What happens when a single populated reference is missing?","The populated path typically resolves to null."], [
    ["Populate an author name","Ada","The book includes the selected author name"],
    ["Read a missing populated reference","","The related value is null"],
    ["populate()","Grace","The stored ID is replaced by the selected author document in the returned result","mongodb-070"],
  ]],
  ["mongodb-053", "Virtuals compute document properties without persisting them.", ["What happens to virtuals in lean results?","Plain lean results omit normal Mongoose virtuals unless explicitly decorated."], [
    ["Compute a display value","Ada","The display virtual adds a label"],
    ["Compare virtual output with stored fields","","The hydrated view includes display and the stored row does not"],
  ]],
  ["mongodb-054", "Instance methods define behavior for an individual hydrated document.", ["Why use a regular function for instance methods?","Mongoose supplies the document as this when invoking the method."], [
    ["Format the result from a hydrated document","Ada","The instance method formats the stored name"],
    ["Use a method that reads two fields","","The line total is 14"],
  ]],
  ["mongodb-055", "Static model methods package repeated collection-level operations.", ["What does this point to in a static method?","It references the model rather than a particular document."], [
    ["Query through a named static","Ada","The static returns the matching member"],
    ["Count records through the model","","The named static counts two active members"],
  ]],
  ["mongodb-056", "lean returns plain query results without hydrating Mongoose documents.", ["When is lean useful?","Use it for read-only responses that do not require document methods, tracking, or getters."], [
    ["Compare hydrated and lean results","Lean example","Only the hydrated value has a save method"],
    ["Use lean with field projection","","Only the requested title is returned"],
  ]],
  ["mongodb-057", "Mongoose index declarations must be applied to the database to take effect.", ["Why manage index builds explicitly in production?","Index builds consume resources and should follow the deployment plan."], [
    ["Build a declared Mongoose index","","MongoDB lists the named title index"],
    ["Observe that unique is enforced by the database","","A second insert yields duplicate-key code 11000"],
  ]],
  ["mongodb-058", "Mongoose Connection.transaction wraps the driver transaction and integrates with document tracking.", ["Can transaction operations use Promise.all safely?","Run operations sequentially on the transaction session."], [
    ["Commit an ODM balance transfer","10","Both updated balances persist"],
    ["Roll back an ODM balance transfer","10","The original balances remain after abort"],
  ]],
  ["mongodb-059", "Mongoose and MongoDB expose different error categories for invalid or conflicting operations.", ["Which errors distinguish invalid values from conflicting writes?","ValidationError and CastError come from ODM checks. Server code 11000 indicates a duplicate key."], [
    ["Classify field validation","","The result identifies ValidationError"],
    ["Classify a controlled duplicate","","The result identifies a conflict with code 11000"],
  ]],
];

export const mongoCatalog = lessons.map(([id, description, interview, entries]) => {
  let number = 0;
  const examples = entries.map(([title, initial, expected, requirement]) => ({
    id: requirement ? requirement + '.e01' : id + '.e' + String(++number).padStart(2, '0'),
    title, initial, expected
  }));
  return { id, description, interview, examples };
});
