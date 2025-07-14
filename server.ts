import app from "./app";
import { connectDB } from "./db";
import serverless from "serverless-http";

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  });
  console.log("Base de datos conectada");
});

export const handler = serverless(app);
