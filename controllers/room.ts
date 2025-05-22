import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/auth";
import RoomList from "./../data/rooms.json";

export const roomsController = Router();

/**
 * @swagger
 * tags:
 *   - name: Rooms
 *     description: API para la gestión de habitaciones de hotel
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         roomNumber:
 *           type: integer
 *           example: 101
 *         roomType:
 *           type: string
 *           example: Single Bed - Elegant
 *         bedType:
 *           type: string
 *           example: Single Bed
 *         roomFloor:
 *           type: string
 *           example: Floor A-1
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           example: ["https://images.unplash.com/photo-..."]
 *         description:
 *           type: string
 *           example: "Elegant single room..."
 *         offer:
 *           type: string
 *           example: YES
 *         price:
 *           type: integer
 *           example: 199
 *         discount:
 *           type: integer
 *           example: 10
 *         cancellation:
 *           type: string
 *           example: "Full refund available..."
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *           example: ["WiFi", "TV", "Mini Bar"]
 */


/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Obtener todas las habitaciones
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de habitaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */

// Get all rooms
roomsController.get(
  "/rooms",
  authenticateToken,
  (req: Request, res: Response) => {
    res.send(RoomList);
  }
);

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Obtener una habitación por ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de habitación
 *     responses:
 *       200:
 *         description: Detalles de la habitación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Habitación no encontrada
 */

// Get room by ID
roomsController.get(
  "/rooms/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const roomId = req.params.id;
    const roomFinded = RoomList.find(
      (room) => room.roomNumber.toString() === roomId
    );
    if (!roomFinded) {
      res.status(404).send("Room not found");
      return;
    }
    res.send(roomFinded);
  }
);

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Crear una nueva habitación
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos de la nueva habitación
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Habitación creada correctamente
 */

// Create a new room
roomsController.post(
  "/rooms",
  authenticateToken,
  (req: Request, res: Response) => {
    const newRoom = req.body;
    res.status(201).send(`New room created: ${JSON.stringify(newRoom)}`);
  }
);

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Actualizar una habitación por ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de habitación a actualizar
 *     requestBody:
 *       description: Datos actualizados de la habitación
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Habitación actualizada correctamente
 */

// Update room by ID
roomsController.put(
  "/rooms/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const roomId = req.params.id;
    res.send(`Room with ID: ${roomId} updated`);
  }
);

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Eliminar una habitación por ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de habitación a eliminar
 *     responses:
 *       200:
 *         description: Habitación eliminada correctamente
 */

// Delete room by ID
roomsController.delete(
  "/rooms/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const roomId = req.params.id;
    res.send(`Room with ID: ${roomId} deleted`);
  }
);

export default roomsController;
