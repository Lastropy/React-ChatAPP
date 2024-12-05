import { Server, Socket } from "socket.io";
import * as controllers from "../controllers";

export const newUserJoins = (
	{ name, room }: { name: string; room: string },
	socket: Socket,
	io: Server,
	callbackFunctionFromFrontEnd: any
) => {
	const { error } = controllers.UsersController.addUser({
		id: socket.id,
		name,
		room,
	});
	if (error) return callbackFunctionFromFrontEnd(error);

	socket.emit("message", {
		user: "admin",
		text: `${name}, welcome to the room ${room}`,
	});
	socket.broadcast.to(room).emit("message", {
		user: "admin",
		text: `${name} has joined!`,
	});
	socket.join(room);

	io.to(room).emit("roomData", {
		room: room,
		users: controllers.UsersController.getUsersInRoom(room),
	});
	callbackFunctionFromFrontEnd();
};

export const sendNewMessage = (message: string, socket: Socket, io: Server, callbackFunctionFromFrontEnd: any) => {
	const { error, room, name } = controllers.UsersController.getUser(socket.id);
	if (error) return callbackFunctionFromFrontEnd(error);
	io.to(room).emit("message", {
		user: name,
		text: message,
	});
	io.to(room).emit("roomData", {
		room: room,
		users: controllers.UsersController.getUsersInRoom(room),
	});
	callbackFunctionFromFrontEnd();
};

export const handleDisconnection = (reason: string, socket: Socket, io: Server) => {
	const { error, room, name } = controllers.UsersController.removeUser(socket.id);
	if (error) {
		console.log(error);
		return;
	}
	io.to(room).emit("message", {
		user: "admin",
		text: `${name} has left the room ${room} for reason: ${reason}`,
	});
};
