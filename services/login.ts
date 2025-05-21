// src/services/login.ts
import jwt from "jsonwebtoken";

const SECRET_KEY = "mi_clave_secreta";

const hardcodedUser = {
  username: "admin",
  password: "1234",
};

export const loginUser = (
  username: string,
  password: string
): string | null => {
  if (
    username === hardcodedUser.username &&
    password === hardcodedUser.password
  ) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return token;
  }
  return null;
};
