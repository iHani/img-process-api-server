import { existsSync, mkdirSync } from "fs";
import path from "path";
import supertest from "supertest";

import app from "./src/index";
import resizeImage from "./src/services/resizeImage";
import { ImageOptions } from "./src/types";
import { destroyServer } from "./src/index";

export const fullDir = path.join(__dirname, "images/full");
export const cachedDir = path.join(__dirname, "images/cached");

if (!existsSync(cachedDir)) {
  mkdirSync(cachedDir);
}

let request = supertest(app);

beforeAll(() => (request = supertest(app)));

describe("Test server connection", () => {
  it("Server is up and Running", async () => {
    const response = await request.get("/");
    expect(response.text).toBe("Server Running");
  });
});

/* Tests resizing image functionality */
describe("Test resizing image", () => {
  it("should create a resized image and cache it", async () => {
    const name = "fjord";
    const height = 50;
    const width = 50;

    // try catch 3 times here
    const outputDir = path.join(cachedDir, `${height}x${width}-${name}.jpg`);
    const imageOptions: ImageOptions = {
      originalImg: path.join(fullDir, `/${name}.jpg`),
      height,
      width,
      outputDir,
    };

    await resizeImage(imageOptions);

    const cachedImg: string = path.join(
      cachedDir,
      `/${height}x${width}-${name}.jpg`
    );
    expect(existsSync(cachedImg)).toBe(true);
  });
});

/* Test endpoint /api/images */
describe("Test endpoint /api/images", () => {
  it("Fails if no 'name' in query strings", async () => {
    const response = await request.get("/api/images?h=50&w=50");
    expect(response.status).toBe(406);
    expect(response.text).toBe(
      "Error: Image name is missing from query strings!"
    );
  });
  it("Fails if 'h' or 'w' isNaN", async () => {
    const response = await request.get("/api/images?h=hi&w=50");
    expect(response.status).toBe(406);
  });
});

afterAll(async () => await destroyServer());
