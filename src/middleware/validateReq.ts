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

  if (name === undefined) {
    res.status(406).send("Error: Image name is missing from query strings!");
  } else if (!existsSync(originalImg)) {
    res.status(404).send(`Error: Image ${name}.jpg is not found!`);
  } else if (!(h && w)) {
    res.sendFile(originalImg);
  } else if (isNaN(parseInt(`${h}`)) || isNaN(parseInt(`${w}`))) {
    res.status(406).send("Error: Please provide numeric values for h and w");
  } else {
    next();
  }
};
