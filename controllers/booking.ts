import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/auth";
import BookingList from "./../data/bookings.json";

export const bookingsController = Router();

// Get all bookings
bookingsController.get(
  "/booking",
  authenticateToken,
  (req: Request, res: Response) => {
    res.send(BookingList);
  }
);

// Get booking by ID
bookingsController.get(
  "/booking/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const bookingFinded = BookingList.find(
      (booking) => booking.id === bookingId
    );
    if (!bookingFinded) {
      res.status(404).send("Booking not found");
      return;
    }
    res.send(bookingFinded);
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
