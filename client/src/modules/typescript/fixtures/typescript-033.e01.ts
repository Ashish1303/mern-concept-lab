import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';
export const schema = new Schema({ name: { type: String, required: true }, age: Number });
export type User = InferSchemaType<typeof schema>;
export type UserDocument = HydratedDocument<User>;
export const UserModel = model('Phase2TypeOnlyUser', schema);
export const valid: User = { name: 'Ada' };
// @ts-expect-error -- The inferred required name is string.
export const invalid: User = { name: 3 };
