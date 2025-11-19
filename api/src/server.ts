import express, { Express } from "express";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";
import routes from "./routes";

dotenv.config({ quiet: true });
const PORT = process.env.PORT || 3000;

const app: Express = express();
app.use(express.json());
app.use("", routes);
setupSwagger(app);

//INICIAR O SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação completa: http://localhost:${PORT}/`);
});
