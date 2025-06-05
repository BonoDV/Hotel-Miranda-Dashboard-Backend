import express from "express";
import bookingsController from "./controllers/booking";
import roomsController from "./controllers/room";
import usersController from "./controllers/user";
import contactController from "./controllers/contact";
import loginController from "./controllers/login";
import publicController from "./controllers/public";
import { swaggerUi, swaggerSpec } from "./swagger";
import cors from "cors";

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());

// Middleware para parsear body si llega como string (AWS HTTP API v2 workaround)
app.use((req, res, next) => {
  if (typeof req.body === "string") {
    try {
      req.body = JSON.parse(req.body);
    } catch {
      // Si no es JSON válido, dejar como está
    }
  }
  next();
});

// Montar las rutas del controlador
app.use(
  "/",
  bookingsController,
  roomsController,
  usersController,
  contactController,
  loginController,
  publicController
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
