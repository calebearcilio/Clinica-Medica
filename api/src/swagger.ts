import swaggerJSDoc, { Options } from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import { Express } from "express";
import dotenv from "dotenv";

dotenv.config({ quiet: true });
const port = process.env.PORT || 3000;

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Clínica Médica",
      version: "1.0.0",
      description: "API para gerenciar médicos em uma clínica médica.",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/", SwaggerUi.serve, SwaggerUi.setup(specs));
};
