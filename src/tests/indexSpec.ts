import { existsSync } from "fs";
import path from "path";
import supertest from "supertest";

import app from "../index";
import resizeImage from "../services/resizeImage";
import { cachedDir, fullDir } from "../middleware/constants";
import { ImageOptions } from "../types";

/* Tests resizing image functionality */
describe("Test resizing image", () => {
  it("should create a resized image", async () => {
    const name = "fjord";
    const height = 50;
    const width = 50;
    const originalImg: string = path.join(__dirname, fullDir, `${name}.jpg`);
    const outputDir = `./images/cached/${height}x${width}/${name}.jpg`;
    const cachedImg: string = path.join(
      __dirname,
      cachedDir,
      `/${height}x${width}/${name}.jpg`
    );
    const imageOptions: ImageOptions = {
      originalImg,
      height,
      width,
      outputDir,
    };

    await resizeImage(imageOptions);
    expect(existsSync(cachedImg)).toBe(true);
  });
});

/* Test endpoint /api/images */
const request = supertest(app);
describe("Test endpoint /api/images", () => {
  it("Fails if no 'name' in query strings", async () => {
    const response = await request.get("/api/images?h=50&w=50");
    expect(response.status).toBe(406);
  });
  it("Fails if 'h' or 'w' isNaN", async () => {
    const response = await request.get("/api/images?h=hi&w=50");
    expect(response.status).toBe(406);
  });
});
