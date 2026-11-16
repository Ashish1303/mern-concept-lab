import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import express from 'express';

export function createPlaygroundApp(directory: string) {
  const app = express();
  app.disable('x-powered-by');
  app.use((_request, response, next) => {
    response.setHeader('X-Content-Type-Options','nosniff');
    response.setHeader('Referrer-Policy','no-referrer');
    response.setHeader('Cache-Control','no-store');
    response.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self' blob:; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; worker-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors http://127.0.0.1:* http://localhost:*");
    next();
  });
  app.get('/runtime.js', async (_request, response) => { response.type('js').send(await readFile(join(directory,'runtime.js'),'utf8')); });
  app.get('/sandbox', (_request, response) => {
    response.type('html').send('<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Edited snippet preview</title><style>body{font:15px system-ui;margin:12px;color:#173f36}button,input,select{font:inherit;padding:6px;margin:5px}label{display:inline-block}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f3f6f3;padding:12px;max-height:320px;overflow:auto}.measure-box{box-sizing:border-box;width:160px;padding:12px;border:1px solid}.measure-box.wide{width:260px}</style><script src="/runtime.js" defer></script></head><body><div id="preview"></div></body></html>');
  });
  app.use((_request,response) => { response.status(404).type('text').send('Preview route not found.'); });
  return app;
}
