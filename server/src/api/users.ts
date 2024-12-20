import { Server, Socket } from "socket.io";
import * as controllers from "../controllers";
import Joi from "joi";

const userRequestSchema = Joi.object({
	name: Joi.string()
		.pattern(/^[a-zA-Z\s'",.-]+$/) // Allows letters, spaces, and special characters: "',.-"
		.min(1) // Minimum length of 1
		.max(100) // Maximum length of 100
		.required(),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
});

const newUserJoins = async (data: any, callbackFunctionFromFrontEnd: any) => {
	try {
		const userData = await userRequestSchema.validateAsync(data);
		console.log(userData);
		const user = await controllers.UsersController.createIfNotExists(userData);
		callbackFunctionFromFrontEnd(user);
	} catch (error) {
		console.error("Error in newUserJoins", error);
		return callbackFunctionFromFrontEnd({ error });
	}
};

export default { newUserJoins };

// export const sendNewMessage = async (message: string, socket: Socket, io: Server, callbackFunctionFromFrontEnd: any) => {
// 	const messageData = await Joi.string().alphanum().min(3).max(30).required().validate(message);
// 	const { error, room, name } = controllers.UsersController.getUser(socket.id);
// 	if (error) return callbackFunctionFromFrontEnd(error);
// 	io.to(room).emit("message", {
// 		user: name,
// 		text: message,
// 	});
// 	io.to(room).emit("roomData", {
// 		room: room,
// 		users: controllers.UsersController.getUsersInRoom(room),
// 	});
// 	callbackFunctionFromFrontEnd();
// };

// export const handleDisconnection = (reason: string, socket: Socket, io: Server) => {
// 	const { error, room, name } = controllers.UsersController.removeUser(socket.id);
// 	if (error) {
// 		console.log(error);
// 		return;
// 	}
// 	io.to(room).emit("message", {
// 		user: "admin",
// 		text: `${name} has left the room ${room} for reason: ${reason}`,
// 	});
// };
