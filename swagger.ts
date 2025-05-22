import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Mi API Express",
    version: "1.0.0",
    description: "Documentación de la API con Swagger",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de desarrollo",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
