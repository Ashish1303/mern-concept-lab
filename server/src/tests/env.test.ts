import { describe, expect, it } from 'vitest';
import { parseEnvironment } from '../config/env.js';

describe('environment validation', () => {
  it('supports documented defaults and configured ports', () => {
    expect(parseEnvironment({})).toEqual({ port: 4000, playgroundPort:4001, host: '127.0.0.1', mode: 'development' });
    expect(parseEnvironment({ PORT: '4100', NODE_ENV: 'production', HOST: '0.0.0.0' })).toEqual({ port: 4100, playgroundPort:4101, host: '0.0.0.0', mode: 'production' });
  });
  it.each(['', '0', '-1', '65536', '4e3', ' 4000 ', 'not-a-port'])('rejects invalid PORT %j', (PORT) => {
    expect(() => parseEnvironment({ PORT })).toThrow('PORT');
  });
  it('rejects invalid modes and hosts', () => {
    expect(() => parseEnvironment({ NODE_ENV: 'staging' })).toThrow('NODE_ENV');
    expect(() => parseEnvironment({ HOST: 'invalid.example' })).toThrow('HOST');
  });
  it.each(['0','65536','4000','bad'])('rejects invalid preview port %s', PLAYGROUND_PORT => { expect(() => parseEnvironment({PLAYGROUND_PORT})).toThrow('PLAYGROUND_PORT'); });
});
