import { Socket } from "socket.io";
import { io } from "../index";
import { handleDisconnection, newUserJoins, sendNewMessage } from "./users";

io.on("connection", (socket: Socket) => {
	socket.on("join", (data, callback) => newUserJoins(data, socket, io, callback));
	socket.on("sendMessage", (data, callback) => sendNewMessage(data, socket, io, callback));
	socket.on("disconnect", (reason) => handleDisconnection(reason, socket, io));
});
