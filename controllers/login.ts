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
 *               - email
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

loginController.post("/login", async (req: any, res: any) => {
  try {
    const { status, data, message } = await loginUser(
      req.body.email,
      req.body.password
    );

    return res.status(status).json(data ? data : { message });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default loginController;
