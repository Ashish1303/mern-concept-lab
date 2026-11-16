import { requestDemo, authenticate, requireEditor } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    const permissions = { reader: ["read"], editor: ["read", "write"] };
    app.get("/capabilities", authenticate, (_req, res) => res.json(permissions[res.locals.role as keyof typeof permissions]));
  }, async (send) => [await send("/capabilities", { headers: { authorization: "Bearer lab-reader" } }), await send("/capabilities", { headers: { authorization: "Bearer lab-editor" } })]),
  requestDemo(app => {
    app.post("/entries", authenticate, requireEditor, (_req, res) => res.status(201).json({ created: true }));
  }, async (send) => [await send("/entries", { method: "POST", headers: { authorization: "Bearer lab-reader" } }), await send("/entries", { method: "POST", headers: { authorization: "Bearer lab-editor" } })])
];
