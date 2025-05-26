import UserList from "./../data/users.json";
import User from "../models/UserSchema";

export const getAllUsers = async () => {
  return await User.find({});
};

export const getUsersById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
