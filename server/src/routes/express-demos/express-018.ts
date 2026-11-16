import { HttpError } from '../../middleware/errors.js';
import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/", async () => {
      await Promise.resolve();
      throw new HttpError(503, "SERVICE_BUSY", "Controlled service failure");
    });
  }, send => send("/")),
  requestDemo(app => {
    app.get("/", (_req, _res, next) => {
      setImmediate(() => next(new HttpError(422, "CALLBACK_ERROR", "Controlled callback failure")));
    });
  }, send => send("/"))
];
