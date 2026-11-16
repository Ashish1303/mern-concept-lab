import { requestDemo, books } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/", (_req, res) => res.json(books.toSorted((left, right) => left.price - right.price || left.id - right.id)));
  }, send => send("/")),
  requestDemo(app => {
    app.get("/", (_req, res) => res.json(books.toSorted((left, right) => right.price - left.price || left.id - right.id)));
  }, send => send("/"))
];
