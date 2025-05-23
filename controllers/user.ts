import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/auth";
import UserList from "./../data/users.json";

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
  (req: Request, res: Response) => {
    res.send(UserList);
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
 *         description: Trabajador no encontrada
 */

// Get user by ID
usersController.get(
  "/users/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const userId = req.params.id;
    const userFinded = UserList.find((user) => user.id.toString() === userId);
    if (!userFinded) {
      res.status(404).send("User not found");
      return;
    }
    res.send(userFinded);
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
 */

// Create a new user
usersController.post(
  "/users",
  authenticateToken,
  (req: Request, res: Response) => {
    const newUser = req.body;
    res.status(201).send(`New user created: ${JSON.stringify(newUser)}`);
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
 */

// Update user by ID
usersController.put(
  "/users/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const userId = req.params.id;
    res.send(`User with ID: ${userId} updated`);
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
 */

// Delete user by ID
usersController.delete(
  "/users/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const userId = req.params.id;
    res.send(`User with ID: ${userId} deleted`);
  }
);

export default usersController;
