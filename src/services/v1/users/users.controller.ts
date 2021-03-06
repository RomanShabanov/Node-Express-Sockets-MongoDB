import Users, { IUser } from "./users.model";

import to from "../../../utils/await";
import User from "./users.model";

export async function getUsers(): Promise<IUser[]> {
  return await Users.find()
    .lean()
    .exec();
}

export async function getUserById(id: IUser["_id"]): Promise<IUser | null> {
  const [err, user] = await to<IUser>(
    Users.findById(id)
      .lean()
      .exec()
  );

  if (err || !user) {
    return null;
  }

  return user;
}

export async function createUser(data: any): Promise<IUser | null> {
  const [err, user] = await to(User.create(data));

  if (+err.code === 11000) {
    console.log("duplicate");
  }
  return user;
}
