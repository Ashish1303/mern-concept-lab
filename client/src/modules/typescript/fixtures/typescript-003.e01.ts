export interface User { name: string; active: boolean }
export const valid: User = { name: 'Ada', active: true };
// @ts-expect-error -- A required property is absent.
export const invalid: User = { name: 'Ada' };
