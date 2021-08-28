import express, { Request, Response } from "express";
const library = express.Router();

library.get("/", (req: Request, res: Response) => {
    res.send("GET /library");
});

library.delete("/:id", (req: Request, res: Response) => {
    res.send("DELETE /library/:id");
});

export default library;
