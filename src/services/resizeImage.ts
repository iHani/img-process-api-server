import sharp from "sharp";
import { ImageOptions } from "../types";

export default (options: ImageOptions): Promise<void> => {
  return new Promise((resolve) => {
    const { originalImg, height, width, outputDir } = options;
    try {
      sharp(originalImg)
        .resize(height, width)
        .toFile(outputDir)
        .then(() => resolve());
    } catch (error) {
      console.log(`processImage error: ${error}`);
    }
  });
};
