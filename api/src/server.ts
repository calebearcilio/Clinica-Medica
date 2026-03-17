import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { setupSwagger } from "./swagger";
import routes from "./routes";

dotenv.config({ quiet: true });

const app: Express = express();
app.use(express.json());

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Muitas requisições. Tente novamente mais tarde." },
});
app.use(limiter);

setupSwagger(app);
app.use("", routes);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno no servidor." });
});

//INICIAR O SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
  console.log(`Documentação swagger: http://localhost:${PORT}/api-docs`);
  console.log(`Cors permitido para: ${CORS_ORIGIN}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
});
