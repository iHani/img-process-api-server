import { Request, Response, RequestHandler } from "express";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import resizeImage from "../services/resizeImage";
import { ImageOptions } from "../types";

const fullDir = "../../images/full";
const cachedDir = "../../images/cached";

export const processImage: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, h, w } = req.query;
  const height: number = parseInt(`${h}`);
  const width: number = parseInt(`${w}`);
  const originalImg: string = path.join(__dirname, fullDir, `${name}.jpg`);
  const thumbDir = `./images/cached/${height}x${width}`;
  const outputDir = `${thumbDir}/${name}.jpg`;

  try {
    if (!existsSync(thumbDir)) {
      mkdirSync(thumbDir);
    }
    const imageOptions: ImageOptions = {
      originalImg,
      height,
      width,
      outputDir,
    };
    await resizeImage(imageOptions);
  } catch (error) {
    console.log(`processImage error: ${error}`);
    res.status(500).send(`500 Internal Server Error: ${error}`);
  }

  const resizedImage: string = path.join(
    __dirname,
    cachedDir,
    `${height}x${width}/${name}.jpg`
  );
  res.sendFile(resizedImage);
};
