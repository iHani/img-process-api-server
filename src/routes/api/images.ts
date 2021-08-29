import { Router, Request, Response } from "express";

import { validateReq } from "../../middleware/validateReq";
import { serveCached } from "../../middleware/serveCached";
import { processImage } from "../../middleware/processImage";

const images = Router();

export default images.get(
  "/",
  [validateReq, serveCached, processImage],
  (req: Request, res: Response): void => {
    res.status(200).send("OK");
  }
);
