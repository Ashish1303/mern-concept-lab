import express from 'express';
import { HttpError } from '../../middleware/errors.js';
import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/", () => {
      throw new HttpError(422, "LESSON_ERROR", "Controlled error");
    });
  }, send => send("/")),
  requestDemo(app => {
    app.get("/", (_req, _res, next) => next(new HttpError(409, "LESSON_CONFLICT", "Controlled conflict")));
  }, send => send("/")),
  requestDemo(app => {
    app.post("/", express.json(), (_req, res) => res.end());
  }, (send, input) => send("/", { method: "POST", headers: { "content-type": "application/json" }, body: input })),
  requestDemo(app => {
    app.get("/", () => {
      throw new HttpError(422, "STOP_CHAIN", "Chain stopped");
    }, (_req, res) => res.send("unreachable"));
  }, send => send("/")),
  requestDemo(app => {
    app.get("/", () => {
      throw new Error("duplicate fixture");
    });
    app.use((error: unknown, _req: express.Request, _res: express.Response, next: express.NextFunction) => {
      next(error instanceof Error && error.message === "duplicate fixture" ? new HttpError(409, "DUPLICATE_ENTRY", "Entry exists") : error);
    });
  }, send => send("/"))
];
