import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mi_clave_secreta";

describe("User Endpoints", () => {
  it("GET /users should return a list of users", async () => {
    const token = jwt.sign({ username: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /users/ should return 401 for missing token", async () => {
    const res = await request(app).get("/users/");

    expect(res.statusCode).toBe(401);
  });

  it("GET /users/ should return 403 for invalid token", async () => {
    const res = await request(app)
      .get("/users/")
      .set("Authorization", "Bearer invalidToken123");
    expect(res.statusCode).toBe(403);
  });

  it("GET /users/:id should return a user", async () => {
    const token = jwt.sign({ username: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const res = await request(app)
      .get("/users/9e62f60e-9968-4c32-8869-157daa0085bb")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe("9e62f60e-9968-4c32-8869-157daa0085bb");
  });

  it("GET /users/:id should return 404 for non-existing user", async () => {
    const token = jwt.sign({ username: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const res = await request(app)
      .get("/users/1234567890")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("User not found");
  });

  it("GET /users/:id should return 401 for missing token", async () => {
    const res = await request(app).get(
      "/users/9e62f60e-9968-4c32-8869-157daa0085bb"
    );

    expect(res.statusCode).toBe(401);
  });
  it("GET /users/:id should return 403 for invalid token", async () => {
    const res = await request(app)
      .get("/users/9e62f60e-9968-4c32-8869-157daa0085bb")
      .set("Authorization", "Bearer invalidToken123");
    expect(res.statusCode).toBe(403);
  });
});
