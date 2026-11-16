export interface Settings { label?: string }
export const valid: Settings = {};
// @ts-expect-error -- exactOptionalPropertyTypes forbids explicit undefined here.
export const invalid: Settings = { label: undefined };
