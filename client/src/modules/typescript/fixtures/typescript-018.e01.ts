export interface User { profile: { name: string }; tags: string[] }
export type Name = User['profile']['name'];
export type Tag = User['tags'][number];
export const valid: Name = 'Ada';
// @ts-expect-error -- The extracted name type is string.
export const invalid: Name = 3;
