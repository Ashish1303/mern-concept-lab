export interface User { name: string; city?: string }
export const valid: User = { name: 'Ada' };
export function invalid(user: User) {
 // @ts-expect-error -- The optional property may be undefined.
 return user.city.toUpperCase();
}
