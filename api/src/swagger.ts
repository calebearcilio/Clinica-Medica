import swaggerJSDoc, { Options } from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import { Express } from "express";
import dotenv from "dotenv";

dotenv.config({ quiet: true });
const PORT = process.env.PORT || 3000;

const getServerUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.SERVER_URL;
  }
  return `http://localhost:${process.env.PORT}`;
};

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Clínica Médica",
      version: "1.0.0",
      description:
        "API para gerenciar médicos, pacientes, secretários e consultas.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: getServerUrl(),
      },
    ],
  },
  security: [{ bearerAuth: [] }],
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));
};
