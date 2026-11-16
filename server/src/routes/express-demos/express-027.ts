import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/", (_req, res) => res.set("X-Content-Type-Options", "nosniff").type("text").send("Explicit text"));
  }, send => send("/")),
  requestDemo(app => {
    app.use((_req, res, next) => {
      res.set("Referrer-Policy", "no-referrer");
      next();
    });
    app.get(["/one", "/two"], (_req, res) => res.json({ ready: true }));
  }, async (send) => [await send("/one"), await send("/two")])
];
