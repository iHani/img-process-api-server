import { Request, Response, NextFunction, RequestHandler } from "express";
import { existsSync } from "fs";
import path from "path";

const cachedDir = "../../images/cached/";

export const serveCached: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { name, h, w } = req.query;
    const height: number | typeof NaN = parseInt(`${h}`);
    const width: number | typeof NaN = parseInt(`${w}`);
    const cachedImg: string = path.join(
        __dirname,
        cachedDir,
        `/${height}x${width}/${name}.jpg`
    );

    if (existsSync(cachedImg)) {
        console.log(name, " cached");
        res.sendFile(cachedImg);
    } else {
        console.log(name, " not cached");
        next();
    }
};
