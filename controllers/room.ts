import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../services/room";
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
 *       500:
 *         description: Error
 */

// Get all rooms
roomsController.get(
  "/rooms",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const rooms = await getAllRooms();
      res.send(rooms);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
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
  async (req: Request, res: Response) => {
    const roomId = Number(req.params.id);
    try {
      const room = await getRoomById(roomId);
      res.status(200).send(room);
    } catch (error) {
      res.status(404).send("Room not found");
    }
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
 *       500:
 *         description: Error al crear la habitación
 */

// Create a new room
roomsController.post(
  "/rooms",
  authenticateToken,
  async (req: Request, res: Response) => {
    const newRoom = req.body;
    try {
      const roomCreate = await createRoom(newRoom);
      res.status(201).send(roomCreate);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
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
 *         name: roomNumber
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la habitación a actualizar
 *     requestBody:
 *       description: Datos actualizados de la habitación
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: habitación actualizada correctamente
 *       500:
 *        description: Error
 */

// Update room by ID
roomsController.put(
  "/rooms/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const roomId = Number(req.params.id);
    const updatedRoomData = req.body;
    try {
      const updatedRoom = await updateRoom(roomId, updatedRoomData);
      res
        .status(200)
        .send(`Room with roomNumber: ${roomId} updated successfully`);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
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
 *       500:
 *        description: Error
 */

// Delete room by ID
roomsController.delete(
  "/rooms/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const roomId = Number(req.params.id);
    try {
      const deletedRoom = await deleteRoom(roomId);
      res.status(200).send(deletedRoom);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
);

export default roomsController;
