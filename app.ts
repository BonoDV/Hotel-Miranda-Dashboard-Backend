import express from "express";
import bookingsController from "./controllers/booking";
import roomsController from "./controllers/room";
import usersController from "./controllers/user";
import contactController from "./controllers/contact";
import loginController from "./controllers/login";

const app = express();
const port = 3000;

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
