import express from "express";
import { existsSync } from "fs";
import path from "path";

const cachedDir = "../../images/cached/";

export const serveCached = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const { name, h, w } = req.query;
  const height: number = parseInt(`${h}`);
  const width: number = parseInt(`${w}`);
  const cachedImg: string = path.join(
    __dirname,
    cachedDir,
    `/${height}x${width}/${name}.jpg`
  );

  if (existsSync(cachedImg)) {
    res.sendFile(cachedImg);
  }

  next();
};
