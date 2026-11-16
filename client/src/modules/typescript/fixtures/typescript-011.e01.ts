export const Status = { Ready: 'ready', Done: 'done' } as const;
export type StatusValue = typeof Status[keyof typeof Status];
export const valid: StatusValue = Status.Ready;
// @ts-expect-error -- A different string is not a status value.
export const invalid: StatusValue = 'other';
