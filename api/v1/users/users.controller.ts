import Users, { IUser } from "./users.model";

import to from "../../../utils/await";

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
