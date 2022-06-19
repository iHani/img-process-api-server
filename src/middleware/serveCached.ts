import { Request, Response, NextFunction, RequestHandler } from "express";
import { existsSync } from "fs";
import path from "path";
import { cachedDir } from "../../constants";

export const serveCached: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, h, w } = req.query;
  const height: number | typeof NaN = parseInt(`${h}`);
  const width: number | typeof NaN = parseInt(`${w}`);
  const cachedImg: string = path.join(
    cachedDir,
    `/${height}x${width}/${name}.jpg`
  );

  if (existsSync(cachedImg)) {
    res.sendFile(cachedImg);
  } else {
    next();
  }
};
