import users from "./users";
import rooms from "./rooms";
import messages from "./messages";
import { Socket, Server } from "socket.io";

export const api = (socket: Socket, io: Server) => {
	socket.on("createIfNotExists:user", async (data, callback) => await users.newUserJoins(data, callback));
	socket.on("create:room", async (data, callback) => await rooms.createANewRoom(data, callback, socket));
	socket.on("get:rooms", async (callback) => await rooms.getAllRooms(callback));
	socket.on("joinIfExists:room", async (data, callback) => await rooms.connectToRoom(data, callback, socket));
	socket.on("getForARoom:messages", async (data, callback) => await messages.getMessagesForARoom(data, callback));
	socket.on("create:message", async (data, callback) => await messages.createANewMessage(data, callback, io));
};
