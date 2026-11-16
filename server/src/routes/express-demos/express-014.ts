import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.use((_req, res, next) => {
      res.set("X-Lab-Stage", "started");
      next();
    });
    app.get("/", (req, res) => res.json({ method: req.method, path: req.path }));
  }, send => send("/")),
  requestDemo(app => {
    const completions: number[] = [];
    app.get("/job", (_req, res) => {
      res.once("finish", () => completions.push(res.statusCode));
      res.status(202).end();
    });
    app.get("/observations", (_req, res) => res.json(completions));
  }, async (send) => [await send("/job"), await send("/observations")])
];
