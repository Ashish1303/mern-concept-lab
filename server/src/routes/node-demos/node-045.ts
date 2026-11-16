import assert from 'node:assert/strict';

export const examples = [
  (input: string) => {
    const value = Number(input);
    try { assert.equal(value * 2, 6); return 'PASS'; }
    catch (error) { return { result: 'FAIL', name: (error as Error).name }; }
  },
  async () => {
    await assert.rejects(async () => { throw new TypeError('Invalid data'); }, { name: 'TypeError', message: 'Invalid data' });
    return 'PASS: rejection matched';
  }
];
