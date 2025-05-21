import { Router, Request, Response } from "express";
import { loginUser } from "../services/login";

export const loginController = Router();

loginController.post("/login", (req: any, res: any) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Usuario y contraseña requeridos" });
  }

  const token = loginUser(username, password);

  if (!token) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  return res.json({ token });
});

export default loginController;
