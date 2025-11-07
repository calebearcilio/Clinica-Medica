import swaggerJSDoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

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
        url: "http://localhost:3333",
      },
    ],
  },
  // "apis" is the correct option name for swagger-jsdoc
  apis: ["./src/server.ts", "./src/routes/*.ts"],
};

export const swaggerDocs = swaggerJSDoc(options);
