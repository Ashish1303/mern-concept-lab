import express from 'express';
import { HttpError } from '../../middleware/errors.js';
import { requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(app => {
    app.post("/upload", express.raw({ type: "multipart/form-data", limit: 2048 }), async (req, res) => {
      if (!Buffer.isBuffer(req.body))
        throw new HttpError(415, "UPLOAD_TYPE", "Use the multipart fixture");
      let form: FormData;
      try {
        form = await new Response(new Uint8Array(req.body), { headers: { "content-type": req.get("content-type") ?? "" } }).formData();
      }
      catch {
        throw new HttpError(400, "UPLOAD_FORMAT", "Malformed multipart data");
      }
      const files = form.getAll("file");
      const file = files[0];
      if (files.length !== 1 || !(file instanceof File) || file.type !== "text/plain" || file.size > 64)
        throw new HttpError(400, "INVALID_FILE", "Supply one small text fixture");
      res.status(201).json({ bytes: file.size, mediaType: file.type, text: await file.text() });
    });
  }, (send, input) => {
    const form = new FormData();
    form.append("file", new Blob([input], { type: "text/plain" }), "fixture.txt");
    return send("/upload", { method: "POST", body: form });
  }),
  requestDemo(app => {
    app.post("/upload", express.raw({ type: "multipart/form-data", limit: 2048 }), async (req, res) => {
      if (!Buffer.isBuffer(req.body))
        throw new HttpError(415, "UPLOAD_TYPE", "Use the multipart fixture");
      let form: FormData;
      try {
        form = await new Response(new Uint8Array(req.body), { headers: { "content-type": req.get("content-type") ?? "" } }).formData();
      }
      catch {
        throw new HttpError(400, "UPLOAD_FORMAT", "Malformed multipart data");
      }
      const files = form.getAll("file");
      const file = files[0];
      if (files.length !== 1 || !(file instanceof File) || file.type !== "text/plain" || file.size > 64)
        throw new HttpError(400, "INVALID_FILE", "Supply one small text fixture");
      res.status(201).json({ bytes: file.size, mediaType: file.type, text: await file.text() });
    });
  }, (send, input) => {
    const form = new FormData();
    form.append("file", new Blob([input.repeat(10)], { type: "text/plain" }), "fixture.txt");
    return send("/upload", { method: "POST", body: form });
  })
];
