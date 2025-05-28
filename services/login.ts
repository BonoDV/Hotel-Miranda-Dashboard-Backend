import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/UserSchema";
import mongoose from "mongoose";
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const loginUser = async (
  email: string,
  password: string
): Promise<{
  status: number;
  data?: { token: string };
  message?: string;
}> => {
  if (!email || !password) {
    return { status: 400, message: "Email y contraseña requeridos" };
  }

  try {
    const user = await User.findOne({ email });

    if (!user || typeof user.password !== "string") {
      return { status: 401, message: "Credenciales inválidas" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 401, message: "Credenciales inválidas1" };
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { status: 200, data: { token } };
  } catch (error) {
    console.error("Error en loginUser:", error);
    return { status: 500, message: "Error interno del servidor" };
  }
};
