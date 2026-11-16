import { HttpError } from '../../middleware/errors.js';
import { requestDemo, books } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/books", (req, res) => {
      const { page = "1", category } = req.query;
      if (typeof page !== "string" || !/^[1-9][0-9]?$/.test(page) || (category !== undefined && category !== "web" && category !== "runtime"))
        throw new HttpError(400, "INVALID_FILTER", "Use page 1–99 and a known category");
      const matches = books.filter(book => !category || book.category === category);
      const offset = (Number(page) - 1) * 2;
      res.json({ data: matches.slice(offset, offset + 2), page: Number(page), total: matches.length });
    });
  }, (send, input) => send("/books?" + new URLSearchParams({ category: input, page: "1" }))),
  requestDemo(app => {
    app.get("/books", (req, res) => {
      const { page = "1", category } = req.query;
      if (typeof page !== "string" || !/^[1-9][0-9]?$/.test(page) || (category !== undefined && category !== "web" && category !== "runtime"))
        throw new HttpError(400, "INVALID_FILTER", "Use page 1–99 and a known category");
      const matches = books.filter(book => !category || book.category === category);
      const offset = (Number(page) - 1) * 2;
      res.json({ data: matches.slice(offset, offset + 2), page: Number(page), total: matches.length });
    });
  }, (send, input) => send("/books?" + new URLSearchParams({ category: input, page: "1" })))
];
