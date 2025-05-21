import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/auth";
import RoomList from "./../data/rooms.json";

export const roomsController = Router();

// Get all rooms
roomsController.get(
  "/rooms",
  authenticateToken,
  (req: Request, res: Response) => {
    res.send(RoomList);
  }
);

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

// Create a new room
roomsController.post(
  "/rooms",
  authenticateToken,
  (req: Request, res: Response) => {
    const newRoom = req.body;
    res.status(201).send(`New room created: ${JSON.stringify(newRoom)}`);
  }
);

// Update room by ID
roomsController.put(
  "/rooms/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const roomId = req.params.id;
    res.send(`Room with ID: ${roomId} updated`);
  }
);

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
