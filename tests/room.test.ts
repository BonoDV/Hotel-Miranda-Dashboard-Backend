import request from "supertest";
import express, { Express } from "express";
import roomsController from "../controllers/room";
import {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../services/room";

// Mock the service functions and auth middleware
jest.mock("../services/room", () => ({
  getAllRooms: jest.fn(),
  getRoomById: jest.fn(),
  createRoom: jest.fn(),
  updateRoom: jest.fn(),
  deleteRoom: jest.fn(),
}));
jest.mock("../middleware/auth", () => ({
  authenticateToken: (req: any, res: any, next: any) => next(),
}));

const app: Express = express();
app.use(express.json());
app.use(roomsController);

describe("Rooms Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /rooms", () => {
    it("should return all rooms", async () => {
      (getAllRooms as jest.Mock).mockResolvedValue([{ roomNumber: 101 }]);
      const res = await request(app).get("/rooms");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ roomNumber: 101 }]);
      expect(getAllRooms).toHaveBeenCalled();
    });

    it("should handle errors", async () => {
      (getAllRooms as jest.Mock).mockRejectedValue(new Error("DB error"));
      const res = await request(app).get("/rooms");
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "DB error");
    });
  });

  describe("GET /rooms/:id", () => {
    it("should return a room by id", async () => {
      (getRoomById as jest.Mock).mockResolvedValue({ roomNumber: 101 });
      const res = await request(app).get("/rooms/101");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ roomNumber: 101 });
      expect(getRoomById).toHaveBeenCalledWith(101);
    });

    it("should return 404 if room not found", async () => {
      (getRoomById as jest.Mock).mockRejectedValue(new Error("Not found"));
      const res = await request(app).get("/rooms/999");
      expect(res.status).toBe(404);
      expect(res.text).toBe("Room not found");
    });
  });

  describe("POST /rooms", () => {
    it("should create a new room", async () => {
      const newRoom = { roomNumber: 102, roomType: "Double" };
      (createRoom as jest.Mock).mockResolvedValue(newRoom);
      const res = await request(app).post("/rooms").send(newRoom);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(newRoom);
      expect(createRoom).toHaveBeenCalledWith(newRoom);
    });

    it("should handle errors on create", async () => {
      (createRoom as jest.Mock).mockRejectedValue(new Error("Create error"));
      const res = await request(app).post("/rooms").send({ roomNumber: 103 });
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Create error");
    });
  });

  describe("PUT /rooms/:id", () => {
    it("should update a room", async () => {
      (updateRoom as jest.Mock).mockResolvedValue({});
      const res = await request(app)
        .put("/rooms/101")
        .send({ roomType: "Suite" });
      expect(res.status).toBe(200);
      expect(res.text).toBe("Room with roomNumber: 101 updated successfully");
      expect(updateRoom).toHaveBeenCalledWith(101, { roomType: "Suite" });
    });

    it("should handle errors on update", async () => {
      (updateRoom as jest.Mock).mockRejectedValue(new Error("Update error"));
      const res = await request(app)
        .put("/rooms/101")
        .send({ roomType: "Suite" });
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Update error");
    });
  });

  describe("DELETE /rooms/:id", () => {
    it("should delete a room", async () => {
      (deleteRoom as jest.Mock).mockResolvedValue({ success: true });
      const res = await request(app).delete("/rooms/101");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ success: true });
      expect(deleteRoom).toHaveBeenCalledWith(101);
    });

    it("should handle errors on delete", async () => {
      (deleteRoom as jest.Mock).mockRejectedValue(new Error("Delete error"));
      const res = await request(app).delete("/rooms/101");
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Delete error");
    });
  });
});
