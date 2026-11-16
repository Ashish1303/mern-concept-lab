import express from 'express';
import { json, requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.post("/", express.json(), (req, res) => res.json(req.body));
  }, (send, input) => send("/", json("POST", { title: input }))),
  requestDemo(app => {
    app.post("/", express.text({ limit: "1kb" }), (req, res) => res.json({ text: req.body }));
  }, (send, input) => send("/", { method: "POST", body: input })),
  requestDemo(app => {
    app.post("/", express.raw({ limit: "1kb" }), (req, res) => res.json({ bytes: (req.body as Buffer).length }));
  }, (send, input) => send("/", { method: "POST", headers: { "content-type": "application/octet-stream" }, body: input })),
  requestDemo(app => {
    app.post("/", express.urlencoded({ extended: false }), (req, res) => res.json(req.body));
  }, (send, input) => send("/", { method: "POST", body: new URLSearchParams({ name: input }) })),
  requestDemo(app => {
    app.post("/", express.json({ limit: 8 }), (_req, res) => res.end());
  }, send => send("/", json("POST", { title: "longer than eight bytes" })))
];
