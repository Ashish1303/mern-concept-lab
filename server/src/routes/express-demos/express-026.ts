import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/", (req, res) => {
      res.vary("Origin");
      if (req.get("origin") === "https://example.test")
        res.set("Access-Control-Allow-Origin", "https://example.test");
      res.json({ ready: true });
    });
  }, (send, input) => send("/", { headers: { origin: input } })),
  requestDemo(app => {
    app.options("/", (req, res) => {
      res.vary("Origin");
      if (req.get("origin") === "https://example.test" && req.get("access-control-request-method") === "POST")
        res.set({ "Access-Control-Allow-Origin": "https://example.test", "Access-Control-Allow-Methods": "POST" });
      res.status(204).end();
    });
  }, async (send) => {
    const preflight = (origin: string) => send("/", { method: "OPTIONS", headers: { origin, "access-control-request-method": "POST" } });
    return [await preflight("https://example.test"), await preflight("https://other.test")];
  })
];
