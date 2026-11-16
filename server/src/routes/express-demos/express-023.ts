import { requestDemo, authenticate, requireEditor } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/editor", authenticate, requireEditor, (_req, res) => res.json({ allowed: true }));
  }, send => send("/editor", { headers: { authorization: "Bearer lab-reader" } })),
  requestDemo(app => {
    app.get("/editor", authenticate, requireEditor, (_req, res) => res.json({ allowed: true }));
  }, send => send("/editor", { headers: { authorization: "Bearer lab-editor" } })),
  requestDemo(app => {
    app.get("/editor", authenticate, requireEditor, (_req, res) => res.json({ allowed: true }));
  }, async (send) => [await send("/editor", { headers: { authorization: "Bearer lab-reader" } }), await send("/editor", { headers: { authorization: "Bearer lab-editor" } })])
];
