/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express, { Request, Response } from "express";
import routes from "./routes";

const app = express();
const port = 9000;

app.use("/api", routes);

export default app.get("/", (_req: Request, res: Response): void => {
  res.send("Server Running");
});

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

export const destroyServer = async () => await server.close();
