import { mountBooks, requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.get("/label/:value", (req, res) => res.json(req.params));
  }, (send, input) => send("/label/" + encodeURIComponent(input))),
  requestDemo(app => {
    app.get("/topics/:topic/lessons/:lesson", (req, res) => res.json(req.params));
  }, send => send("/topics/api/lessons/7")),
  requestDemo(mountBooks, (send, input) => send("/books/" + encodeURIComponent(input)))
];
