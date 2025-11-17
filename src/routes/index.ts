import { Router } from "express";
import secretarioRoutes from "./secretarioRoutes";
import medicoRoutes from "./medicoRoutes";

const routes = Router();

routes.use(secretarioRoutes);
routes.use(medicoRoutes);

export default routes;