import { requestDemo, books } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/v1/books", (_req, res) => res.json(books));
    app.get("/v2/books", (_req, res) => res.json({ data: books, total: books.length }));
  }, async (send) => [await send("/v1/books"), await send("/v2/books")]),
  requestDemo(app => {
    app.get("/v1/books", (_req, res) => res.set("X-Lab-Sunset", "demo retirement").json(books));
  }, send => send("/v1/books"))
];
