import User from "../models/UserSchema";
import mongoose from "mongoose";

export const getAllUsers = async () => {
  return await User.find();
};

export const getUsersById = async (id: string) => {
  const user = await User.findOne({ id: id });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const createUser = async (userData: any) => {
  // Normalizar fechas
  if (userData.start_date?.$date) {
    userData.start_date = new Date(userData.start_date.$date);
  }

  const newUser = new User(userData);
  newUser.id = new mongoose.Types.ObjectId().toString();

  const validationError = newUser.validateSync();
  if (validationError) {
    throw new Error(`Validation failed: ${validationError.message}`);
  }

  const existingUser = await User.findOne({ id: newUser.id });
  if (existingUser) {
    throw new Error("User with this ID already exists");
  }

  return await newUser.save();
};

export const updateUser = async (id: string, userData: any) => {
  const user = await User.findOne({ id: id });
  if (!user) {
    throw new Error("User not found");
  }
  // Normalizar fechas
  if (userData.start_date?.$date) {
    userData.start_date = new Date(userData.start_date.$date);
  }

  Object.assign(user, userData);
  const validationError = user.validateSync();
  if (validationError) {
    throw new Error(`Validation failed: ${validationError.message}`);
  }
  return await user.save();
};

export const deleteUser = async (id: string) => {
  const user = await User.findOne({ id: id });
  if (!user) {
    throw new Error("User not found");
  }
  await User.deleteOne({ id: id });
  return { message: "User deleted successfully" };
};
