import { Request, Response, NextFunction } from "express";
import { existsSync } from "fs";
import path from "path";

const fullDir = "../../images/full/";

export const validateReq = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { name, h, w } = req.query;

    // validate 'name' in query string
    if (name === undefined) {
        res.status(406).send("Error: Image name is missing from query strings!");
    }

    // check if file 'name.jpg` exists
    const originalImg: string = path.join(__dirname, fullDir, `${name}.jpg`);
    if (!existsSync(originalImg)) {
        res.status(404).send(`Sorry can't find image ${name}.jpg!`);
    }

    // if h & w are missing, serve the full image
    if (!(h && w)) {
        res.sendFile(originalImg);
    }

    // validate numeric values for h & w
    if (isNaN(parseInt(`${h}`)) || isNaN(parseInt(`${w}`))) {
        res.status(406).send("Error: Please provide numeric values for h and w");
    }

    next();
};
