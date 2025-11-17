import express, { Express } from "express";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";
import routes from "./routes";

dotenv.config({quiet: true});

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("", routes);
setupSwagger(app);

app.get("/", (req, res) => {
  res.send(
    '<html><h1>API médica</h1><br><a href="/secretarios">Todos os secretários</a><br><a href="/api-docs">Documentação com swagger</a></html>'
  );
});

//INICIAR O SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
  console.log(`Documentação: http://localhost:${PORT}/api-docs`);
});
