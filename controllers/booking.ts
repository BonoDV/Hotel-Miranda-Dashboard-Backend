import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/auth";

export const bookingsController = Router();

// Get all bookings
bookingsController.get(
  "/booking",
  authenticateToken,
  (req: Request, res: Response) => {
    res.send("Booking page");
  }
);

// Get booking by ID
bookingsController.get(
  "/booking/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const bookingId = req.params.id;
    res.send(`Booking details for ID: ${bookingId}`);
  }
);

// Create a new booking
bookingsController.post(
  "/booking",
  authenticateToken,
  (req: Request, res: Response) => {
    const newBooking = req.body;
    res.status(201).send(`New booking created: ${JSON.stringify(newBooking)}`);
  }
);

// Update booking by ID
bookingsController.put(
  "/booking/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const bookingId = req.params.id;
    res.send(`Booking with ID: ${bookingId} updated`);
  }
);

// Delete booking by ID
bookingsController.delete(
  "/booking/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const bookingId = req.params.id;
    res.send(`Booking with ID: ${bookingId} deleted`);
  }
);

export default bookingsController;
