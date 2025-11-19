import { Router } from "express";
import secretarioRoutes from "./secretarioRoutes";
import medicoRoutes from "./medicoRoutes";
import pacientRoutes from "./pacienteRoutes";
import concultaRoutes from "./consultaRoutes";

const routes = Router();

routes.use(secretarioRoutes);
routes.use(medicoRoutes);
routes.use(pacientRoutes);
routes.use(concultaRoutes);

export default routes;
