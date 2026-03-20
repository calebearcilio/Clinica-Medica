import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { setupSwagger } from "./swagger";
import routes from "./routes";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const app: Express = express();
app.use(express.json());

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);

setupSwagger(app);
app.use("", routes);

// Erro global
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(error.stack);
  res.status(500).json({ message: "Erro interno no servidor." });
});

//INICIAR O SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
  console.log(`Documentação swagger: http://localhost:${PORT}/api-docs`);
  console.log(`Cors permitido para: ${CORS_ORIGIN}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
});
