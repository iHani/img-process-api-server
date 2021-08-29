import express from "express";
import { existsSync } from "fs";

export const processImage = (
    req: express.Request,
    res: express.Response
): void => {
    const { name, h, w } = req.query;
    const height: number = parseInt(`${h}`);
    const width: number = parseInt(`${w}`);

    // process image with Sharp
    // create processed image in /images/cashed/${height}x${width}
    // sendFile the processed image
};
