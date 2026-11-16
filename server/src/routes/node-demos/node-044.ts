import { createHmac, timingSafeEqual } from 'node:crypto';

export const examples = [
  (input: string) => {
    return { valid: /^[A-Za-z0-9 ]{1,24}$/.test(input.trim()), length: input.trim().length };
  },
  (input: string) => {
    const sign = (text: string) => createHmac('sha256', 'public-teaching-key').update(text).digest();
    const expected = sign('lab message');
    return { matchesFixture: timingSafeEqual(sign(input), expected) };
  }
];
