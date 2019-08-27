import mongoose, { Schema, Document, Types } from "mongoose";
import { IPet } from "../pets/pets.model";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  pets: Types.DocumentArray<IPet>;
}

export const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, unique: true }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
