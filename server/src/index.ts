import "dotenv/config";
import { Socket } from "socket.io";
import api from "./api";
import cors from "cors";
import express, { Request, Response, Router } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { AppDataSource } from "./data-source";
import { authSocketMiddleware } from "./middleware/auth";

const router = Router();
const port = process.env.PORT;
const app = express();
app.use(router);
app.use(
	cors({
		origin: "*",
	})
);

const server = createServer(app);
server.listen(port);

router.get("/", (req: Request, res: Response) => {
	res.json({ message: "server is up and running", data: req.body });
});
console.log(`Server listening on port ${port}`);

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.use(authSocketMiddleware);

io.on("connection", (socket: Socket) => {
	socket.on("createIfNotExists:user", async (data, callback) => await api.users.newUserJoins(data, callback));
	socket.on("create:room", async (data, callback) => await api.rooms.createANewRoom(data, callback));
	socket.on("get:rooms", async (callback) => await api.rooms.getAllRooms(callback));
	socket.on("joinIfExists:room", async (data, callback) => await api.rooms.connectToRoom(data, callback, socket));
	socket.on(
		"getForARoom:messages",
		async (data, callback) => await api.messages.getMessagesForARoom(data, callback)
	);
	socket.on("create:message", async (data, callback) => await api.messages.createANewMessage(data, callback, io));
});

AppDataSource.initialize()
	.then(() => console.log("Database Connectivity established!!"))
	.catch((error) => console.error(error));
