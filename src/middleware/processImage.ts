import { NextFunction, Request, Response, RequestHandler } from "express";
import { existsSync, mkdirSync } from "fs";
import sharp from "sharp";
import path from "path";

const fullDir = "../../images/full";
const cachedDir = "../../images/cached";

export const processImage: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, h, w } = req.query;
  const height: number = parseInt(`${h}`);
  const width: number = parseInt(`${w}`);
  const originalImg: string = path.join(__dirname, fullDir, `${name}.jpg`);
  const outputDir = `./images/cached/${height}x${width}`;

  try {
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir);
    }

    await sharp(originalImg)
      .resize(height, width)
      .toFile(`${outputDir}/${name}.jpg`);

    const processedImage: string = path.join(__dirname, cachedDir, `${height}x${width}/${name}.jpg`);

    res.sendFile(processedImage);
  } catch (error) {
    console.log(`processImage error: ${error}`);
    res.status(500).send(`500 Internal Server Error: ${error}`);
  }
};
