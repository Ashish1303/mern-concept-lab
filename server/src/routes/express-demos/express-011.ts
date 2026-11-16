import { Router } from 'express';
import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    const router = Router();
    router.get("/books", (_req, res) => res.json({ ready: true }));
    app.use("/api", router);
  }, send => send("/api/books")),
  requestDemo(app => {
    const router = Router({ mergeParams: true });
    router.get("/entries/:entry", (req, res) => res.json(req.params));
    app.use("/teams/:team", router);
  }, send => send("/teams/lab/entries/2")),
  requestDemo(app => {
    const router = Router();
    router.get("/", (_req, res) => res.send("read"));
    router.post("/", (_req, res) => res.status(201).send("created"));
    app.use("/entries", router);
  }, async (send) => [await send("/entries"), await send("/entries", { method: "POST" })])
];
