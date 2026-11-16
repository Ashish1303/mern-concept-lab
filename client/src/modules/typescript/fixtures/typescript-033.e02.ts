import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';
const schema = new Schema({ name: { type: String, required: true } });
export type User = InferSchemaType<typeof schema>;
export const UserModel = model('Phase2LeanTypeOnlyUser', schema);
export async function lookup() { const value = await UserModel.findOne({ name: 'Ada' }).lean().exec(); return value ? value.name.toUpperCase() : null; }
declare const document: HydratedDocument<User>;
export const valid: string = document.name;
// @ts-expect-error -- A hydrated name remains a string.
export const invalid: number = document.name;
