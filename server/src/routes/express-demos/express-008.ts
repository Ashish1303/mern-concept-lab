import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/search", (req, res) => res.json(req.query));
  }, (send, input) => send("/search?" + new URLSearchParams({ q: input }))),
  requestDemo(app => {
    app.get("/filters", (req, res) => res.json(req.query));
  }, send => send("/filters?tag=web&tag=api")),
  requestDemo(app => {
    app.get("/books", (req, res) => res.json(req.query));
  }, (send, input) => send("/books?" + new URLSearchParams({ category: input })))
];
