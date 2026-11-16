import { HttpError } from '../../middleware/errors.js';
import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    const records = new Set<string>();
    const sessionId = "lab-session";
    app.post("/signin", (_req, res) => {
      records.add(sessionId);
      res.cookie("lab_session", sessionId, { httpOnly: true, sameSite: "lax", path: "/" }).status(201).end();
    });
    app.get("/profile", (req, res) => {
      if (req.get("cookie") !== "lab_session=" + sessionId || !records.has(sessionId))
        throw new HttpError(401, "SESSION_REQUIRED", "Sign into the fixture");
      res.json({ name: "Ada" });
    });
    app.delete("/session", (req, res) => {
      if (req.get("cookie") !== "lab_session=" + sessionId)
        throw new HttpError(401, "SESSION_REQUIRED", "Sign into the fixture");
      records.delete(sessionId);
      res.clearCookie("lab_session", { path: "/" }).status(204).end();
    });
  }, async (send) => {
    const issued = await send("/signin", { method: "POST" });
    const cookie = issued.headers["set-cookie"]?.split(";")[0] ?? "";
    return [issued, await send("/profile", { headers: { cookie } })];
  }),
  requestDemo(app => {
    const records = new Set<string>();
    const sessionId = "lab-session";
    app.post("/signin", (_req, res) => {
      records.add(sessionId);
      res.cookie("lab_session", sessionId, { httpOnly: true, sameSite: "lax", path: "/" }).status(201).end();
    });
    app.get("/profile", (req, res) => {
      if (req.get("cookie") !== "lab_session=" + sessionId || !records.has(sessionId))
        throw new HttpError(401, "SESSION_REQUIRED", "Sign into the fixture");
      res.json({ name: "Ada" });
    });
    app.delete("/session", (req, res) => {
      if (req.get("cookie") !== "lab_session=" + sessionId)
        throw new HttpError(401, "SESSION_REQUIRED", "Sign into the fixture");
      records.delete(sessionId);
      res.clearCookie("lab_session", { path: "/" }).status(204).end();
    });
  }, async (send) => {
    const issued = await send("/signin", { method: "POST" });
    const headers = { cookie: issued.headers["set-cookie"]?.split(";")[0] ?? "" };
    return [await send("/session", { method: "DELETE", headers }), await send("/profile", { headers })];
  })
];
