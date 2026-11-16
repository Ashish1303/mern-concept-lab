import { HttpError } from '../../middleware/errors.js';
import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/", (_req, _res, next) => next("route"), (_req, res) => res.send("skipped"));
    app.get("/", (_req, res) => res.send("fallback"));
  }, send => send("/")),
  requestDemo(app => {
    app.get("/", (_req, _res, next) => next(new HttpError(422, "BAD_LESSON_DATA", "Invalid teaching input")));
  }, send => send("/"))
];
