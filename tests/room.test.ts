import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mi_clave_secreta";

describe("Room Endpoints", () => {
  it("GET /rooms should return a list of rooms", async () => {
    const token = jwt.sign({ username: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const res = await request(app)
      .get("/rooms")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /rooms/ should return 401 for missing token", async () => {
    const res = await request(app).get("/rooms/");

    expect(res.statusCode).toBe(401);
  });

  it("GET /rooms/ should return 403 for invalid token", async () => {
    const res = await request(app)
      .get("/rooms/")
      .set("Authorization", "Bearer invalidToken123");
    expect(res.statusCode).toBe(403);
  });

  it("GET /rooms/:id should return a room", async () => {
    const token = jwt.sign({ username: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const res = await request(app)
      .get("/rooms/101")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.roomNumber).toBe(101);
  });

  it("GET /rooms/:id should return 404 for non-existing room", async () => {
    const token = jwt.sign({ username: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const res = await request(app)
      .get("/rooms/1234567890")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("Room not found");
  });

  it("GET /rooms/:id should return 401 for missing token", async () => {
    const res = await request(app).get("/rooms/101");

    expect(res.statusCode).toBe(401);
  });
  it("GET /rooms/:id should return 403 for invalid token", async () => {
    const res = await request(app)
      .get("/rooms/101")
      .set("Authorization", "Bearer invalidToken123");
    expect(res.statusCode).toBe(403);
  });
});
