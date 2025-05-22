import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mi_clave_secreta";

describe("Booking Endpoints", () => {
  it("GET /booking should return a list of rooms", async () => {
    const token = jwt.sign({ username: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const res = await request(app)
      .get("/booking")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /booking/ should return 401 for missing token", async () => {
    const res = await request(app).get("/booking/");

    expect(res.statusCode).toBe(401);
  });

  it("GET /booking/ should return 403 for invalid token", async () => {
    const res = await request(app)
      .get("/booking/")
      .set("Authorization", "Bearer invalidToken123");
    expect(res.statusCode).toBe(403);
  });

  it("GET /booking/:id should return a booking", async () => {
    const token = jwt.sign({ username: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const res = await request(app)
      .get("/booking/000123456")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe("000123456");
  });

  it("GET /booking/:id should return 404 for non-existing booking", async () => {
    const token = jwt.sign({ username: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const res = await request(app)
      .get("/booking/1234567890")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("Booking not found");
  });

  it("GET /booking/:id should return 401 for missing token", async () => {
    const res = await request(app).get("/booking/000123456");

    expect(res.statusCode).toBe(401);
  });
  it("GET /booking/:id should return 403 for invalid token", async () => {
    const res = await request(app)
      .get("/booking/000123456")
      .set("Authorization", "Bearer invalidToken123");
    expect(res.statusCode).toBe(403);
  });
});
