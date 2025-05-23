import app from "./app";
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log("Documentación corriendo en http://localhost:3000/api-docs/");
});
