import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
  getAllBookings,
  getBookingsById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../services/booking";
export const bookingsController = Router();

/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: API para la gestión de reservas del hotel
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "000123456"
 *         name:
 *           type: string
 *           example: "Cahyadi Purnomo"
 *         image:
 *           type: string
 *           example: "https://randomuser.me/api/portraits/women/1.jpg"
 *         orderDate:
 *           type: Date
 *           example: "2020-10-30T09:21:00Z"
 *         checkIn:
 *           type: Date
 *           example: "2020-11-02"
 *         checkOut:
 *           type: Date
 *           example: "2020-11-04"
 *         specialRequest:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true
 *             text:
 *               type: string
 *               example: "Late check-out requested"
 *         roomType:
 *           type: string
 *           example: "Single Bed - Elegant"
 *         status:
 *           type: string
 *           example: "Check In"
 *         phone:
 *           type: string
 *           example: "+62 812-3456-7890"
 *         email:
 *           type: string
 *           example: "cahyadi.purnomo@example.com"
 */

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */

// Get all bookings
bookingsController.get(
  "/booking",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const bookings = await getAllBookings();
      res.send(bookings);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /booking/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Detalles de la reserva
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Reserva no encontrada
 */

// Get booking by ID
bookingsController.get(
  "/booking/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const bookingFinded = await getBookingsById(bookingId);
    res.status(200).send(bookingFinded);
  }
);

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos de la nueva reserva
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 */

// Create a new booking
bookingsController.post(
  "/booking",
  authenticateToken,
  async (req: Request, res: Response) => {
    const newBooking = req.body;
    const bookingCreate = await createBooking(newBooking);
    res.status(201).send(`New booking created: ${JSON.stringify(newBooking)}`);
  }
);

/**
 * @swagger
 * /booking/{id}:
 *   put:
 *     summary: Actualizar una reserva por ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a actualizar
 *     requestBody:
 *       description: Datos actualizados de la reserva
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Reserva actualizada correctamente
 */

// Update booking by ID
bookingsController.put(
  "/booking/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const updatedBookingData = req.body;
    try {
      const updatedBooking = await updateBooking(bookingId, updatedBookingData);
      res
        .status(200)
        .send(`Booking with ID: ${bookingId} updated successfully`);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /booking/{id}:
 *   delete:
 *     summary: Eliminar una reserva por ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a eliminar
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente
 */

// Delete booking by ID
bookingsController.delete(
  "/booking/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    try {
      const deletedBooking = await deleteBooking(bookingId);
      res.status(200).send(deletedBooking);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
);

export default bookingsController;
