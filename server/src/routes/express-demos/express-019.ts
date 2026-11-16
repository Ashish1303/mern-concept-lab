import { HttpError } from '../../middleware/errors.js';
import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/", () => {
      throw new HttpError(404, "ITEM_MISSING", "The item was not found");
    });
  }, send => send("/")),
  requestDemo(app => {
    app.get("/", () => {
      throw new Error("private diagnostic");
    });
  }, send => send("/")),
  requestDemo(() => {
  }, send => send("/missing"))
];
