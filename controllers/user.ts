import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/auth";
import UserList from "./../data/users.json";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUsersById,
  updateUser,
} from "../services/user";
export const usersController = Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API para la gestión de trabajadores del hotel
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 9e62f60e-9968...
 *         photo:
 *           type: string
 *           example: https://randomuser.me/api/portraits/women/1.jpg
 *         first_name:
 *           type: string
 *           example: Chrisse
 *         last_name:
 *           type: string
 *           example: Willatts
 *         job:
 *           type: string
 *           example: Room Service
 *         email:
 *           type: string
 *           example: "cgarcia@example.com"
 *         phone_number:
 *           type: string
 *           example: 123-456-7890
 *         start_date:
 *           type: Date
 *           example: 2023-05-15
 *         schedule:
 *           type: string
 *           example: "Tuesday, Friday"
 *         function_description:
 *           type: string
 *           example: "Welcomes guests, performs check-in..."
 *         status:
 *           type: boolean
 *           example: true
 *         password:
 *           type: string
 *           anotation: hashed
 *           example: "$2a$04$abcd1234Efg..."
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los trabajadores
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de trabajadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

// Get all users
usersController.get(
  "/users",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers();
      res.send(users);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un trabajador por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de trabajador
 *     responses:
 *       200:
 *         description: Detalles del trabajador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Trabajador no encontrado
 *       500:
 *        description: Error
 */

// Get user by ID
usersController.get(
  "/users/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const userFinded = await getUsersById(userId);
      res.status(200).send(userFinded);
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).send({ message: error.message });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  }
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo trabajador
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del nuevo trabajador
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Trabajador creado correctamente
 *       500:
 *        description: Error
 */

// Create a new user
usersController.post(
  "/users",
  authenticateToken,
  async (req: Request, res: Response) => {
    const newUser = req.body;
    try {
      const userCreate = await createUser(newUser);
      res.status(201).send(`New user created: ${JSON.stringify(newUser)}`);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un trabajador por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de trabajador a actualizar
 *     requestBody:
 *       description: Datos actualizados del trabajador
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Trabajador actualizado correctamente
 *       500:
 *         description: Error
 */

// Update user by ID
usersController.put(
  "/users/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const updateUserData = req.body;
    try {
      const updatedUser = await updateUser(userId, updateUserData);
      res.status(200).send(`User with ID: ${userId} updated successfully`);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Eliminar un trabajador por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de trabajador a eliminar
 *     responses:
 *       200:
 *         description: Trabajador eliminado correctamente
 *       500:
 *         description: Error
 */

// Delete user by ID
usersController.delete(
  "/users/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const deletedUser = await deleteUser(userId);
      res.status(200).send(deletedUser);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
);

export default usersController;
