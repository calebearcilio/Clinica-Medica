import { Router } from "express";
import secretarioRoutes from "./secretarioRoutes";

const routes = Router();

//Routas
routes.use(secretarioRoutes);


export default routes;