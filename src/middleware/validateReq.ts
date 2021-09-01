import { Request, Response, NextFunction, RequestHandler } from "express";
import { existsSync } from "fs";
import path from "path";
import { fullDir } from "./constants";

export const validateReq: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, h, w } = req.query;
  const originalImg: string = path.join(__dirname, fullDir, `${name}.jpg`);
  const height = parseInt(`${h}`);
  const width = parseInt(`${w}`);

  if (name === undefined) {
    res.status(406).send("Error: Image name is missing from query strings!");
  } else if (!existsSync(originalImg)) {
    res.status(404).send(`Error: Image ${name}.jpg is not found!`);
  } else if (!(h && w)) {
    res.sendFile(originalImg);
  } else if (isNaN(height) || isNaN(width) || height < 1 || width < 1) {
    res.status(406).send("Error: Please provide a positive anumeric values for h and w");
  } else {
    next();
  }
};
