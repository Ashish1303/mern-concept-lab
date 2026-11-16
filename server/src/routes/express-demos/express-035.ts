import { randomUUID } from 'node:crypto';
import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    const logs: unknown[] = [];
    app.get("/entry", (req, res) => {
      const started = performance.now();
      res.once("finish", () => logs.push({ method: req.method, status: res.statusCode, elapsedMs: performance.now() - started }));
      res.end();
    });
    app.get("/logs", (_req, res) => res.json(logs));
  }, async (send) => [await send("/entry"), await send("/logs")]),
  requestDemo(app => {
    app.get("/", (req, res) => res.json({ method: req.method, requestId: randomUUID() }));
  }, send => send("/", { headers: { authorization: "Bearer synthetic-example" } }))
];
