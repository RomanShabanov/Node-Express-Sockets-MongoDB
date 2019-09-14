import mongoose, { Schema, Document, Types, Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { IPet } from "../pets/pets.model";
import validator from "validator";

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

export const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
      // validate: value => {
      //   if (!validator.isEmail(value)) {
      //     throw new Error("Invalid Email address");
      //   }
      // }
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    pets: { type: Array }
  },
  { timestamps: true }
);

userSchema.method("comparePassword", function(
  candidatePassword: string,
  next: any
): void {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(err);
    next(null, isMatch);
  });
});

userSchema.pre<IUser>("save", function(next) {
  const user = this;

  if (!user.isModified("password")) return next();
  const saltRounds = 10;

  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

const changeStream = User.watch();

changeStream.on("change", change => {
  console.group("Users collection");
  console.log(change);
  console.groupEnd();
});

export default User;
