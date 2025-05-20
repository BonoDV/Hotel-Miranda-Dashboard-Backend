import { Request, Response, Router } from "express";

export const roomsController = Router();

// Get all rooms
roomsController.get("/rooms", (req: Request, res: Response) => {
  res.send("Rooms page");
});

// Get room by ID
roomsController.get("/rooms/:id", (req: Request, res: Response) => {
  const roomId = req.params.id;
  res.send(`Room details for ID: ${roomId}`);
});

// Create a new room
roomsController.post("/rooms", (req: Request, res: Response) => {
  const newRoom = req.body;
  res.status(201).send(`New room created: ${JSON.stringify(newRoom)}`);
});

// Update room by ID
roomsController.put("/rooms/:id", (req: Request, res: Response) => {
  const roomId = req.params.id;
  res.send(`Room with ID: ${roomId} updated`);
});

// Delete room by ID
roomsController.delete("/rooms/:id", (req: Request, res: Response) => {
  const roomId = req.params.id;
  res.send(`Room with ID: ${roomId} deleted`);
});

export default roomsController;
