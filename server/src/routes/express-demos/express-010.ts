import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/", (_req, res) => res.redirect(307, "/target"));
  }, send => send("/")),
  requestDemo(app => {
    app.get("/", (_req, res) => res.status(204).end());
  }, send => send("/"))
];
