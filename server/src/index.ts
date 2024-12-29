import "dotenv/config";
import { api } from "./api";
import cors from "cors";
import express, { Request, Response, Router } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { AppDataSource } from "./data-source";
import { authSocketMiddleware } from "./middleware/auth";

/**
 * Declaring Express Router, app and http server
 */
const router = Router();
const port = process.env.PORT;
const app = express();
const server = createServer(app);

/**
 * Using router in Express app, specifying CORS policy
 */
app.use(router);
app.use(
	cors({
		origin: process.env.CLIENT,
	})
);

/**
 * HTTP server listening on desired port and router
 * defined route on '/'
 */
server.listen(port);
router.get("/", (req: Request, res: Response) => {
	res.json({ message: "Server is up and running", data: req.body });
});
console.log(`Server listening on port ${port}`);

/**
 * SocketIO server initialised with Auth Middleware
 * and APIs
 */
export const io = new Server(server, {
	cors: {
		origin: process.env.CLIENT,
	},
});
io.use(authSocketMiddleware);
io.on("connection", (socket) => api(socket, io));

/**
 * Importing DB connection and initializing on server start
 */
AppDataSource.initialize()
	.then(() => console.log("Database Connectivity established!!"))
	.catch((error) => console.error(error));
