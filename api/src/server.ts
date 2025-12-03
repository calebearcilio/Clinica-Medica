import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
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

setupSwagger(app);
app.use("", routes);

//INICIAR O SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
  console.log(`Cors permitido para: ${CORS_ORIGIN}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
});
