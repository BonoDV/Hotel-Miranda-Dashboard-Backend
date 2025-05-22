import { Router, Request, Response } from "express";
import listEndpoints from "express-list-endpoints";

import bookingsController from "./booking";
import roomsController from "./room";
import usersController from "./user";
import contactController from "./contact";
import loginController from "./login";

export const publicController = Router();

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Muestra todos los endpoints privados disponibles
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Lista de endpoints privados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hotelName:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 endpointsPrivados:
 *                   type: array
 *                   items:
 *                     type: object
 *                 nota:
 *                   type: string
 */

publicController.get("/routes", (req: Request, res: Response) => {
  // Obtener los endpoints de cada controlador
  const routes = [
    ...listEndpoints(bookingsController),
    ...listEndpoints(roomsController),
    ...listEndpoints(usersController),
    ...listEndpoints(contactController),
    ...listEndpoints(loginController),
  ];

  res.json({
    hotelName: "Hotel Miranda",
    descripcion: "Bienvenido al API del Hotel Miranda",
    endpointsPrivados: routes,
    nota: "Para acceder a los endpoints privados, es necesario un token JWT válido.",
  });
});

export default publicController;
