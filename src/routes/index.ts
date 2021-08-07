import express from 'express';
import images from './api/images';
import library from './api/library';

const routes = express.Router();

routes.use("/images", images);
routes.use("/library", library);

export default routes;
