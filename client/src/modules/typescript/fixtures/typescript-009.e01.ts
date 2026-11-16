export const config: { readonly retries: number } = { retries: 2 };
// @ts-expect-error -- A readonly property cannot be assigned through this reference.
config.retries = 3;
