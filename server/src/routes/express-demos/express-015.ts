import express from 'express';
import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { HttpError } from '../../middleware/errors.js';
import { json, requestDemo, titleBody } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.use((_req, res, next) => {
      res.set("X-Lab-Request", randomUUID());
      next();
    });
    app.get("/", (_req, res) => res.json({ ready: true }));
  }, send => send("/")),
  requestDemo(app => {
    const policy = (value: string) => Router().use((_req, res, next) => {
      res.set("X-Lab-Policy", value);
      next();
    });
    app.use(policy("private"));
    app.get("/", (_req, res) => res.json({ ready: true }));
  }, send => send("/")),
  requestDemo(app => {
    app.use(express.json());
    app.post("/", titleBody, (req, res) => res.json(req.body));
  }, (send, input) => send("/", json("POST", { title: input }))),
  requestDemo(app => {
    app.use((req, _res, next) => {
      if (!req.get("x-demo"))
        throw new HttpError(400, "MISSING_DEMO_HEADER", "Supply a demo header");
      next();
    });
    app.get("/", (_req, res) => res.json({ ready: true }));
  }, send => send("/")),
  requestDemo(app => {
    app.use((_req, res, next) => {
      res.locals.locale = "en";
      next();
    });
    app.get("/", (_req, res) => res.json({ locale: res.locals.locale }));
  }, send => send("/")),
  requestDemo(app => {
    app.use((_req, res, next) => {
      res.locals.steps = [...(res.locals.steps ?? []), "validate"];
      next();
    });
    app.use((_req, res, next) => {
      res.locals.steps = [...(res.locals.steps ?? []), "annotate"];
      next();
    });
    app.get('/', (_req, res) => res.json([...res.locals.steps, "respond"]));
  }, send => send("/"))
];
