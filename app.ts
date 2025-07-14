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

app
  .use(
    express.urlencoded({
      extended: true,
    })
  )
  .use(express.json({ limit: "1mb" }));

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
