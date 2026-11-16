import request from 'supertest';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { createPlaygroundApp } from '../playground.js';
import { createApp } from '../app.js';

describe('isolated browser-only edited code preview',()=>{
  const app=createPlaygroundApp(fileURLToPath(new URL('../../../client/playground-dist',import.meta.url)));
  it('serves a separate document without app data or code evaluation on the server',async()=>{
    const response=await request(app).get('/sandbox').expect(200);
    expect(response.text).toContain('/runtime.js');
    expect(response.headers['content-security-policy']).toContain("connect-src 'none'");
    expect(response.headers['content-security-policy']).toContain("worker-src 'none'");
    expect(response.headers['content-security-policy']).not.toContain('unsafe-eval');
    expect(response.headers['cache-control']).toBe('no-store');
  });
  it('serves only the trusted runtime, never APIs or files',async()=>{
    await request(app).get('/runtime.js').expect(200).expect('Content-Type',/javascript/);
    await request(app).post('/api/v1/lab/ack').send({label:'not allowed'}).expect(404);
    await request(app).get('/.env').expect(404);
    await request(app).get('/anything').expect(404);
  });
  it('does not weaken application script policy for editable code',async()=>{
    const app=createApp({clientDirectory:fileURLToPath(new URL('./fixtures/client',import.meta.url)),playgroundOrigin:'http://127.0.0.2:4101'});
    const response=await request(app).get('/foundation').expect(200);
    expect(response.headers['content-security-policy']).toContain('frame-src http://127.0.0.2:4101');
    expect(response.headers['content-security-policy']).toContain("script-src 'self'");
    expect(response.headers['content-security-policy']).not.toContain('unsafe-eval');
    expect(response.text).toContain('name="playground-origin" content="http://127.0.0.2:4101"');
  });
});
