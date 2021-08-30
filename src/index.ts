import express, { Request, Response } from "express";
import routes from "./routes";

const app = express();
const port = 9000;

app.use("/api", routes);

app.get("/", (req: Request, res: Response): void => {
  res.send("Server Running");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
