import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/", (_req, res) => res.cookie("lab_theme", "light", { httpOnly: true, sameSite: "lax", path: "/" }).json({ saved: true }));
  }, send => send("/")),
  requestDemo(app => {
    app.get("/issue", (_req, res) => res.cookie("lab_theme", "light", { path: "/" }).end());
    app.get("/check", (req, res) => res.json({ matched: req.get("cookie") === "lab_theme=light" }));
  }, async (send) => {
    const issued = await send("/issue");
    return [issued, await send("/check", { headers: { cookie: issued.headers["set-cookie"]?.split(";")[0] ?? "" } })];
  })
];
