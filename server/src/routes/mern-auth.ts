import { createHash, createHmac, randomBytes, scrypt as deriveKey, timingSafeEqual } from 'node:crypto';
import { HttpError } from '../middleware/errors.js';

function scrypt(password: string, salt: string) {
  return new Promise<Buffer>((resolve, reject) => {
    deriveKey(password, salt, 32, (error, key) => error ? reject(error) : resolve(key));
  });
}
const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
export type Role = 'reader' | 'editor';
type Claims = { sub: string; role: Role; exp: number; aud: 'mern-lab' };

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = (await scrypt(password, salt)).toString('hex');
  return { salt, hash };
}

export async function matchesPassword(password: string, stored: { salt: string; hash: string }) {
  const received = await scrypt(password, stored.salt);
  return timingSafeEqual(received, Buffer.from(stored.hash, 'hex'));
}

function sign(value: string, key: Buffer) {
  return createHmac('sha256', key).update(value).digest();
}

export function issueAccess(username: string, role: Role, key: Buffer) {
  const claims: Claims = { sub: username, role, exp: Math.floor(Date.now() / 1000) + 60, aud: 'mern-lab' };
  const payload = Buffer.from(JSON.stringify(claims)).toString('base64url');
  return header + '.' + payload + '.' + sign(header + '.' + payload, key).toString('base64url');
}

export function readAccess(authorization: string | undefined, key: Buffer): Claims {
  const invalid = () => new HttpError(401, 'LAB_AUTH_REQUIRED', 'Sign in with a teaching account.');
  const token = /^Bearer ([\w-]+\.[\w-]+\.[\w-]+)$/.exec(authorization ?? '')?.[1];
  if (!token || token.length > 512) throw invalid();
  const [encodedHeader, payload, signature] = token.split('.');
  if (encodedHeader !== header || !payload || !signature) throw invalid();
  const received = Buffer.from(signature, 'base64url');
  const expected = sign(header + '.' + payload, key);
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) throw invalid();
  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString()) as Partial<Claims>;
    if (typeof claims.sub !== 'string' || (claims.role !== 'reader' && claims.role !== 'editor') ||
        claims.aud !== 'mern-lab' || typeof claims.exp !== 'number' || claims.exp <= Date.now() / 1000) throw invalid();
    return claims as Claims;
  } catch { throw invalid(); }
}

export const refreshDigest = (token: string) => createHash('sha256').update(token).digest('hex');
export const newRefreshToken = () => randomBytes(24).toString('base64url');
