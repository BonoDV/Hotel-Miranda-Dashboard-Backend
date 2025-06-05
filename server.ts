import app from "./app";
import { connectDB } from "./db";


const PORT = process.env.PORT;



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log("Documentación corriendo en http://localhost:3000/api-docs/");
  });
});
