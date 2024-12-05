

import cors from "cors";
import express, { Request, Response, Router } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const router = Router();
const port = process.env.PORT || 5000;

const app = express();
app.use(router);
app.use(
  cors({
    origin: "*",
  })
);

export const server = createServer(app);
server.listen(port);

router.get("/", (req: Request, res: Response) => {
  res.json({message: "server is up and running", data: req.body});
});
console.log(`Server listening on port ${port}`)

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

