import { HttpError } from '../../middleware/errors.js';
import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    let count = 0;
    const windowMs = 10000;
    let started = Date.now();
    app.use((_req, res, next) => {
      const now = Date.now();
      if (now - started >= windowMs) {
        count = 0;
        started = now;
      }
      if (++count > 2) {
        res.set("Retry-After", String(Math.ceil((windowMs - (now - started)) / 1000)));
        throw new HttpError(429, "LIMIT_REACHED", "The teaching window allows two requests");
      }
      res.set("X-Lab-Remaining", String(2 - count));
      next();
    });
    app.get("/", (_req, res) => res.json({ ready: true }));
  }, send => send("/")),
  requestDemo(app => {
    let count = 0;
    const windowMs = 10000;
    let started = Date.now();
    app.use((_req, res, next) => {
      const now = Date.now();
      if (now - started >= windowMs) {
        count = 0;
        started = now;
      }
      if (++count > 2) {
        res.set("Retry-After", String(Math.ceil((windowMs - (now - started)) / 1000)));
        throw new HttpError(429, "LIMIT_REACHED", "The teaching window allows two requests");
      }
      res.set("X-Lab-Remaining", String(2 - count));
      next();
    });
    app.get("/", (_req, res) => res.json({ ready: true }));
  }, async (send) => [await send("/"), await send("/")]),
  requestDemo(app => {
    let count = 0;
    const windowMs = 10000;
    let started = Date.now();
    app.use((_req, res, next) => {
      const now = Date.now();
      if (now - started >= windowMs) {
        count = 0;
        started = now;
      }
      if (++count > 2) {
        res.set("Retry-After", String(Math.ceil((windowMs - (now - started)) / 1000)));
        throw new HttpError(429, "LIMIT_REACHED", "The teaching window allows two requests");
      }
      res.set("X-Lab-Remaining", String(2 - count));
      next();
    });
    app.get("/", (_req, res) => res.json({ ready: true }));
  }, async (send) => [await send("/"), await send("/"), await send("/")])
];
