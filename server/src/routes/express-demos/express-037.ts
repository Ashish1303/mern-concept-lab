import { randomUUID } from 'node:crypto';
import { HttpError } from '../../middleware/errors.js';
import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/", () => {
      throw new Error("private fixture details");
    });
  }, send => send("/")),
  requestDemo(app => {
    app.use((_req, res, next) => {
      res.locals.requestId = randomUUID();
      res.set("X-Lab-Request", res.locals.requestId);
      next();
    });
    app.get("/", () => {
      throw new HttpError(503, "TEMPORARY_FAILURE", "Try again later");
    });
  }, send => send("/"))
];
