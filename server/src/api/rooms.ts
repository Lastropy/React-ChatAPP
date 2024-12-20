import { Server, Socket } from "socket.io";
import * as controllers from "../controllers";
import Joi from "joi";

const roomRequestSchema = Joi.object({
	roomName: Joi.string()
		.pattern(/^[a-zA-Z1-9\s'",.-]+$/)
		.min(1)
		.max(100)
		.required(),
	roomPwd: Joi.string()
		.pattern(/^[a-zA-Z1-9\s'",.-]+$/)
		.min(1)
		.max(100)
		.required(),
	userUUID: Joi.string().uuid(),
});

const createANewRoom = async (data: any, callbackFunctionFromFrontEnd: any) => {
	try {
		const roomData = await roomRequestSchema.validateAsync(data);
		const room = await controllers.RoomsController.createRoom(roomData);
		callbackFunctionFromFrontEnd(room);
	} catch (error) {
		console.error("Error in createANewRoom", error);
		return callbackFunctionFromFrontEnd({ error });
	}
};

export default { createANewRoom };
