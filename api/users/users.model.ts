import mongoose, { Schema, Document, Types, Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { IPet } from "../pets/pets.model";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  pets: Types.DocumentArray<IPet>;
  comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): string;
}

export const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  pets: { type: Array }
});

userSchema.method("comparePassword", function(password: string): boolean {
  if (bcrypt.compareSync(password, this.password)) return true;
  return false;
});

userSchema.static("hashPassword", (password: string): string => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
});

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

User.find().then(users => {
  if (!users.length) {
    const password = User.hashPassword("Test123");

    const user = new User({
      email: "gettingold@mail.ru",
      firstName: "Roman",
      lastName: "Shabanov",
      password,
      pets: []
    });

    user.save();
  }
});

export default User;
