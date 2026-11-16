import express from 'express';
import { json, requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.use(express.json({ limit: "1kb" }));
    app.post("/", (req, res) => res.json(req.body));
  }, (send, input) => send("/", json("POST", { title: input }))),
  requestDemo(app => {
    app.use(express.urlencoded({ extended: false, limit: "1kb" }));
    app.post("/", (req, res) => res.json(req.body));
  }, (send, input) => send("/", { method: "POST", body: new URLSearchParams({ names: input }) }))
];
