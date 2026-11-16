import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/", (_req, res) => res.json({ ready: true }));
  }, send => send("/")),
  requestDemo(app => {
    app.get("/", (_req, res) => res.type("text").send("Express is listening"));
  }, send => send("/")),
  requestDemo(app => {
    app.get("/health", (_req, res) => res.json({ ready: true }));
  }, send => send("/health"))
];
