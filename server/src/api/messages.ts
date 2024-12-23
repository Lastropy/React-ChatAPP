import { Server, Socket } from "socket.io";
import * as controllers from "../controllers";
import Joi from "joi";

const messageRequestCreateSchema = Joi.object({
	content: Joi.string().min(1),
	roomId: Joi.string().uuid(),
	userId: Joi.string().uuid(),
	userName: Joi.string().min(1),
});

const messageRequestFindSchema = Joi.object({
	roomId: Joi.string().uuid(),
});

const createANewMessage = async (data: any, callbackFunctionFromFrontEnd: any, io: Server) => {
	try {
		const { userName, ...messageData } = await messageRequestCreateSchema.validateAsync(data);
		const message = await controllers.MessagesController.createMessage(messageData);
		message["user"] = {};
		message["user"].name = userName;
		callbackFunctionFromFrontEnd(message);
		io.to(message.roomId).emit("updateRoomClients", message);
	} catch (error) {
		console.error("Error in createANewMessage", error);
		return callbackFunctionFromFrontEnd({ error });
	}
};

const getMessagesForARoom = async (data: any, callbackFunctionFromFrontEnd: any) => {
	try {
		const messageData = await messageRequestFindSchema.validateAsync(data);
		const messages = await controllers.MessagesController.findAllMessages(messageData);
		callbackFunctionFromFrontEnd(messages);
	} catch (error) {
		console.error("Error in findMessage", error);
		return callbackFunctionFromFrontEnd({ error });
	}
};

export default { createANewMessage, getMessagesForARoom };
