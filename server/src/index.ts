import { Socket } from "socket.io";
import api from "./api";
import cors from "cors";
import express, { Request, Response, Router } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { AppDataSource } from "./data-source";

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
	res.json({ message: "server is up and running", data: req.body });
});
console.log(`Server listening on port ${port}`);

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket: Socket) => {
	socket.on("createIfNotExists:user", async (data, callback) => await api.users.newUserJoins(data, callback));
	socket.on("create:room", async (data, callback) => await api.rooms.createANewRoom(data, callback));
	// socket.on("sendMessage", (data, callback) => sendNewMessage(data, socket, io, callback));
	// socket.on("disconnect", (reason) => handleDisconnection(reason, socket, io));
});

AppDataSource.initialize()
	.then(() => {
		// here you can start to work with your database
		console.log("Database Connectivity established!!");
	})
	.catch((error) => console.error(error));
