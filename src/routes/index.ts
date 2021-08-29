import { Router } from "express";
import images from "./api/images";

const routes = Router();

routes.use("/images", images);

export default routes;
