import request from "supertest";
import express, { Express } from "express";
import usersController from "../controllers/user";
import * as userService from "../services/user";




// Mock the authenticateToken middleware to always call next()
jest.mock("../middleware/auth", () => ({
  authenticateToken: (_req: any, _res: any, next: any) => next(),
}));

const app: Express = express();
app.use(express.json());
app.use(usersController);

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /users", () => {
    it("should return all users", async () => {
      const mockUsers = [{ id: "1", first_name: "Test" }];
      jest.spyOn(userService, "getAllUsers").mockResolvedValue(mockUsers as any);

      const res = await request(app).get("/users");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUsers);
    });

    it("should handle errors", async () => {
      jest.spyOn(userService, "getAllUsers").mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/users");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "DB error" });
    });
  });

  describe("GET /users/:id", () => {
    it("should return a user by ID", async () => {
      const mockUser = { id: "1", first_name: "Test" };
      jest.spyOn(userService, "getUsersById").mockResolvedValue(mockUser as any);

      const res = await request(app).get("/users/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUser);
    });

    it("should return 404 if user not found", async () => {
      jest.spyOn(userService, "getUsersById").mockRejectedValue(new Error("User not found"));

      const res = await request(app).get("/users/999");
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "User not found" });
    });

    it("should handle other errors", async () => {
      jest.spyOn(userService, "getUsersById").mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/users/1");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "DB error" });
    });
  });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const newUser = { first_name: "Test" };
      jest.spyOn(userService, "createUser").mockResolvedValue(newUser as any);

      const res = await request(app).post("/users").send(newUser);
      expect(res.status).toBe(201);
      expect(res.text).toContain("New user created");
    });

    it("should handle errors", async () => {
      jest.spyOn(userService, "createUser").mockRejectedValue(new Error("Create error"));

      const res = await request(app).post("/users").send({ first_name: "Test" });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Create error" });
    });
  });

  describe("PUT /users/:id", () => {
    it("should update a user by ID", async () => {
      jest.spyOn(userService, "updateUser").mockResolvedValue({ id: "1", first_name: "Updated" } as any);

      const res = await request(app).put("/users/1").send({ first_name: "Updated" });
      expect(res.status).toBe(200);
      expect(res.text).toContain("updated successfully");
    });

    it("should handle errors", async () => {
      jest.spyOn(userService, "updateUser").mockRejectedValue(new Error("Update error"));

      const res = await request(app).put("/users/1").send({ first_name: "Updated" });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Update error" });
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user by ID", async () => {
      jest.spyOn(userService, "deleteUser").mockResolvedValue({ message: "Deleted" } as any);

      const res = await request(app).delete("/users/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Deleted" });
    });

    it("should handle errors", async () => {
      jest.spyOn(userService, "deleteUser").mockRejectedValue(new Error("Delete error"));

      const res = await request(app).delete("/users/1");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Delete error" });
    });
  });
});