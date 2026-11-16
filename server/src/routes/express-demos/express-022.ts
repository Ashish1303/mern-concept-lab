import { requestDemo, authenticate } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/profile", authenticate, (_req, res) => res.json({ role: res.locals.role }));
  }, send => send("/profile")),
  requestDemo(app => {
    app.get("/profile", authenticate, (_req, res) => res.json({ role: res.locals.role }));
  }, send => send("/profile", { headers: { authorization: "Bearer lab-reader" } })),
  requestDemo(app => {
    app.get("/profile", authenticate, (_req, res) => res.json({ role: res.locals.role }));
  }, send => send("/profile", { headers: { authorization: "Bearer lab-editor" } })),
  requestDemo(app => {
    app.get("/profile", authenticate, (_req, res) => res.json({ role: res.locals.role }));
  }, send => send("/profile", { headers: { authorization: "Bearer expired-demo" } })),
  requestDemo(app => {
    app.get("/public", (_req, res) => res.json({ ready: true }));
    app.get("/profile", authenticate, (_req, res) => res.json({ ready: true }));
  }, async (send) => [await send("/public"), await send("/profile")]),
  requestDemo(app => {
    app.get("/profile", authenticate, (_req, res) => res.json({ role: res.locals.role }));
  }, send => send("/profile", { headers: { authorization: "Bearer lab-reader" } }))
];
