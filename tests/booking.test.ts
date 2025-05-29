import request from "supertest";
import express from "express";
import bookingsController from "../controllers/booking";
import * as bookingService from "../services/booking";
import { authenticateToken } from "../middleware/auth";

jest.mock("../middleware/auth", () => ({
  authenticateToken: (req: any, res: any, next: any) => next(),
}));

const app = express();
app.use(express.json());
app.use(bookingsController);

describe("Bookings Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /booking", () => {
    it("should return all bookings", async () => {
      const mockBookings = [{ id: "1", name: "Test Booking" }];
      jest
        .spyOn(bookingService, "getAllBookings")
        .mockResolvedValue(mockBookings as any);

      const res = await request(app).get("/booking");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockBookings);
    });

    it("should handle errors", async () => {
      jest
        .spyOn(bookingService, "getAllBookings")
        .mockRejectedValue(new Error("DB Error"));

      const res = await request(app).get("/booking");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "DB Error" });
    });
  });

  describe("GET /booking/:id", () => {
    it("should return a booking by id", async () => {
      const mockBooking = { id: "1", name: "Test Booking" };
      jest
        .spyOn(bookingService, "getBookingsById")
        .mockResolvedValue(mockBooking as any);

      const res = await request(app).get("/booking/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockBooking);
    });

    it("should return 404 if booking not found", async () => {
      jest
        .spyOn(bookingService, "getBookingsById")
        .mockRejectedValue(new Error("Not found"));

      const res = await request(app).get("/booking/1");
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Not found" });
    });
  });

  describe("POST /booking", () => {
    it("should create a new booking", async () => {
      const newBooking = { name: "New Booking" };
      jest
        .spyOn(bookingService, "createBooking")
        .mockResolvedValue(newBooking as any);

      const res = await request(app).post("/booking").send(newBooking);
      expect(res.status).toBe(201);
      expect(res.text).toContain("New booking created");
    });

    it("should handle errors on create", async () => {
      jest
        .spyOn(bookingService, "createBooking")
        .mockRejectedValue(new Error("Create error"));

      const res = await request(app).post("/booking").send({ name: "fail" });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Create error" });
    });
  });

  describe("PUT /booking/:id", () => {
    it("should update a booking by id", async () => {
      jest.spyOn(bookingService, "updateBooking").mockResolvedValue({} as any);

      const res = await request(app)
        .put("/booking/1")
        .send({ name: "Updated" });
      expect(res.status).toBe(200);
      expect(res.text).toContain("Booking with ID: 1 updated successfully");
    });

    it("should handle errors on update", async () => {
      jest
        .spyOn(bookingService, "updateBooking")
        .mockRejectedValue(new Error("Update error"));

      const res = await request(app).put("/booking/1").send({ name: "fail" });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Update error" });
    });
  });

  describe("DELETE /booking/:id", () => {
    it("should delete a booking by id", async () => {
      jest
        .spyOn(bookingService, "deleteBooking")
        .mockResolvedValue({ success: true } as any);

      const res = await request(app).delete("/booking/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ success: true });
    });

    it("should handle errors on delete", async () => {
      jest
        .spyOn(bookingService, "deleteBooking")
        .mockRejectedValue(new Error("Delete error"));

      const res = await request(app).delete("/booking/1");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Delete error" });
    });
  });
});
