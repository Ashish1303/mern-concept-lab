import express from 'express';
import { json, requestDemo, titleBody } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/health", (_req, res) => res.json({ ready: true }));
    app.post("/books", express.json(), titleBody, (req, res) => res.status(201).json(req.body));
  }, async (send) => {
    const result = await send("/health");
    return { passed: result.status === 200 && JSON.stringify(result.body) === "{\"ready\":true}", result };
  }),
  requestDemo(app => {
    app.get("/health", (_req, res) => res.json({ ready: true }));
    app.post("/books", express.json(), titleBody, (req, res) => res.status(201).json(req.body));
  }, async (send) => {
    const result = await send("/books", json("POST", { title: "" }));
    return { passed: result.status === 400, result };
  }),
  requestDemo(app => {
    app.get("/health", (_req, res) => res.json({ ready: true }));
    app.post("/books", express.json(), titleBody, (req, res) => res.status(201).json(req.body));
  }, async (send, input) => {
    const created = await send("/books", json("POST", { title: input }));
    const missing = await send("/missing");
    return { passed: created.status === 201 && missing.status === 404, created, missing };
  })
];
