# Phase 8 MongoDB and Mongoose

Status **APPROVED_COMPLETE**. The user approved Phase 8 and authorized Phase 9 on November 15, 2026.

Phase 8 covers 59 lessons, 139 demos, and 354 interview questions. The 15 required examples use stable IDs from `mongodb-060.e01` through `mongodb-074.e01`. The user approved Phase 7 before authorizing this phase.

| Area | Real database operations |
| --- | --- |
| Fundamentals | Create and query collections, BSON values and ObjectId lookup, CRUD, filter operators, projection, sorting, and pagination |
| Advanced MongoDB | Embedding and references, indexes and unique constraints, execution plans, aggregation and joins, native transactions, text search, TTL configuration, and client pooling |
| Mongoose | Independent connections, schemas and models, validation and casting, timestamps, middleware, populate, virtuals and methods, lean results, indexes, and ODM transactions |

The editor runs a request whose input you can change. The source panel shows the server implementation. Each request uses a unique database on the opted-in single-member loopback replica set. The server selects the database namespace and operations, limits input and concurrency, and drops that demo database before closing its connection. TTL examples inspect real index configuration and demonstrate immediate read-time filtering.

## Start the local database lab on Windows

Use a MongoDB Community Server binary installed on this computer. In one PowerShell window, from the project root, create a fresh fixture directory and start the dedicated process. Adjust the binary path to match your installed version.

```powershell
$fixture = New-Item -ItemType Directory -Path ([IO.Path]::Combine([IO.Path]::GetTempPath(), 'mern-phase8-' + [Guid]::NewGuid()))
& 'C:/Program Files/MongoDB/Server/8.2/bin/mongod.exe' --dbpath $fixture.FullName --bind_ip 127.0.0.1 --port 27180 --replSet mernLab
```

Keep MongoDB running. In a second PowerShell window at the project root, install dependencies with `npm ci` if needed, initialize the replica set, and start the app.

```powershell
node scripts/init-mongo-lab.mjs 27180
$env:MONGO_LAB_PORT = '27180'
npm run dev
```

Open **MongoDB + Mongoose** in the sidebar. Try the full CRUD lifecycle, the index comparison, or native and Mongoose commit and rollback. Use the same `MONGO_LAB_PORT` setting for `npm test` to run the live integration suite. The isolated MongoDB process can be stopped with Ctrl+C when finished.

## Verification

- All 2,072 tests passed on the final run, with the replica set enabled. Three Windows workers stopped unexpectedly in the initial parallel run. Server test files now run sequentially to keep local fixture checks deterministic. [Final suite](evidence/phase-8/final-tests.txt)

- Driver and Mongoose demos ran against the dedicated MongoDB Community Server replica set. Focused coverage includes cleanup of owned namespaces, edited CRUD, duplicate key and schema checks, populate, measured query plans, and commit and rollback in both APIs. [Focused tests](evidence/phase-8/target.txt)

- Development and production browser checks confirmed edited CRUD, syntax feedback, Reset, direct-route refresh, interview answer disclosure, and Mongoose transaction commit and rollback. Both passes recorded no browser console warnings or errors. [Browser results](evidence/phase-8/browser.json) · [CRUD preview](evidence/phase-8/crud-preview.jpg)
- TypeScript, lint, and the production build passed. The dependency audit found zero known vulnerabilities. The preview bundle emits the existing React Router directive warning. [TypeScript](evidence/phase-8/typecheck-rerun.txt) · [Lint](evidence/phase-8/lint.txt) · [Build](evidence/phase-8/build.txt) · [Dependency audit](evidence/phase-8/audit.json)

