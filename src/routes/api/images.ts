import express, { Request, Response } from "express";
import path from "path";
// import { existsSync, access } from "fs";
// import { promises as fs } from "fs";


const images = express.Router();

images.get("/", async (req: Request, res: Response): Promise<void> => {
  const {
    query: { name, h, w },
  } = req;

  const dirPath = path.join(__dirname, "../../../images/full", `${name}.jpg`);

  // if (existsSync(dirPath)) {
  //   res.write(`File exists: ${name}`);
  // } else {
  //   res.write(`does NOT exist ${name}`);
  // }
  // res.write(`name=${name} w=${w} h=${h}`);
  res.sendFile(dirPath);
  // res.end();
});

export default images;
