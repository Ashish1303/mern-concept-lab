export type AuditedUser = { name: string } & { createdAt: string };
export const valid: AuditedUser = { name: 'Ada', createdAt: '2026-01-01' };
// @ts-expect-error -- The audit field is required as well.
export const invalid: AuditedUser = { name: 'Ada' };
