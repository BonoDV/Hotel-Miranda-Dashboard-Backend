import { Router, Request, Response } from "express";
import { loginUser } from "../services/login";

export const loginController = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login with jwt
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *        description: Usuario y contraseña requeridos
 *       401:
 *         description: Credenciales inválidas
 *
 */

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
