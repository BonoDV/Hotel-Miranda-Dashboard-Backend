import express from "express";
import bookingsController from "./controllers/booking";
import roomsController from "./controllers/room";
import usersController from "./controllers/user";

const app = express();
const port = 3000;

// Montar las rutas del controlador
app.use("/", bookingsController, roomsController, usersController);
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
