import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.use((_req, res, next) => {
      res.locals.steps = [...(res.locals.steps ?? []), "app"];
      next();
    });
    app.get('/', (_req, res) => res.json([...res.locals.steps, "route"]));
  }, send => send("/")),
  requestDemo(app => {
    app.use("/lab", (_req, res, next) => {
      res.set("X-Lab-Scope", "lab");
      next();
    });
    app.get("/lab/path", (_req, res) => res.json({ ready: true }));
  }, send => send("/lab/path")),
  requestDemo(app => {
    app.use((_req, res) => res.status(403).send("stopped before route"));
    app.get("/", (_req, res) => res.json({ ready: true }));
  }, send => send("/")),
  requestDemo(app => {
    app.get("/", (_req, res, next) => {
      res.locals.scope = "route-scope";
      next();
    }, (_req, res) => res.json(res.locals.scope));
  }, send => send("/")),
  requestDemo(app => {
    app.use("/scoped", (_req, res, next) => {
      res.set("X-Lab-Scope", "yes");
      next();
    });
    app.get(["/scoped", "/other"], (_req, res) => res.json({ ready: true }));
  }, async (send) => [await send("/scoped"), await send("/other")])
];
