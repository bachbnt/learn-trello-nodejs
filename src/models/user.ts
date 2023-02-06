import DbSchema from '@constants/dbSchema';
import mongoose, { Document, Schema } from 'mongoose';

export interface User {
  email: string;
  password: string;
  fullName: string;
}

export type UserDocument = User & Document;

export const userSchema = new Schema(
  {
    email: { type: String, require: true },
    password: { type: String, require: true, select: false },
    fullName: { type: String, require: true },
  },
  { collection: DbSchema.USER }
);

export const UserModel = mongoose.model<UserDocument>(
  DbSchema.USER,
  userSchema
);
