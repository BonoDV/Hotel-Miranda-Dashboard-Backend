import app from "./app";
const PORT = process.env.PORT;
import { connectDB } from "./db";

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log("Documentación corriendo en http://localhost:3000/api-docs/");
  });
});
