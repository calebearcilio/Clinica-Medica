import { Router } from "express";
import secretarioRoutes from "./secretarioRoutes";
import medicoRoutes from "./medicoRoutes";
import pacientRoutes from "./pacienteRoutes";

const routes = Router();

routes.use(secretarioRoutes);
routes.use(medicoRoutes);
routes.use(pacientRoutes);

export default routes;