import express from "express";
import bookingsController from "./controllers/booking";
import roomsController from "./controllers/room";
import usersController from "./controllers/user";
import contactController from "./controllers/contact";
import loginController from "./controllers/login";

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

// Montar las rutas del controlador
app.use(
  "/",
  bookingsController,
  roomsController,
  usersController,
  contactController,
  loginController
);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

export default app;
