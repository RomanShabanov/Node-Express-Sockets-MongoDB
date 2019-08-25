import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserDocument extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): string;
  statics?: any;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, unique: true }
});

export const User: IUserModel = mongoose.model<IUser, IUserModel>(
  "User",
  userSchema
);

export default User;
