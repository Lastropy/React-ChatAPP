import { Server, Socket } from "socket.io";
import * as controllers from "../controllers";
import Joi from "joi";

const roomRequestCreateSchema = Joi.object({
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

const roomRequestFindIfExistsSchema = Joi.object({
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
});

const createANewRoom = async (data: any, callbackFunctionFromFrontEnd: any) => {
	try {
		const roomData = await roomRequestCreateSchema.validateAsync(data);
		const room = await controllers.RoomsController.createRoom(roomData);
		callbackFunctionFromFrontEnd(room);
	} catch (error) {
		console.error("Error in createANewRoom", error);
		return callbackFunctionFromFrontEnd({ error });
	}
};

const findRoom = async (data: any, callbackFunctionFromFrontEnd: any) => {
	try {
		const roomData = await roomRequestFindIfExistsSchema.validateAsync(data);
		const room = await controllers.RoomsController.findIfRoomExists(roomData);
		callbackFunctionFromFrontEnd(room);
	} catch (error) {
		console.error("Error in findRoom", error);
		return callbackFunctionFromFrontEnd({ error });
	}
};

const getAllRooms = async (callbackFunctionFromFrontEnd: any) => {
	try {
		const roomsRecords = await controllers.RoomsController.findAllRooms();
		callbackFunctionFromFrontEnd(roomsRecords);
	} catch (error) {
		console.error("Error in getAllRooms", error);
		return callbackFunctionFromFrontEnd({ error });
	}
};

const connectToRoom = async (data: any, callbackFunctionFromFrontEnd: any, socket: Socket) => {
	try {
		const roomData = await roomRequestCreateSchema.validateAsync(data);
		const room = await controllers.RoomsController.findIfRoomExists(roomData);
		if (!room) throw new Error(`Room ${data.roomName} does not exist.`);
		socket.join(room.id);
		console.log(`Connected socket to Room ${room.id} having name ${room.name}`);
		callbackFunctionFromFrontEnd(room);
	} catch (error) {
		console.error("Error in connectToRoom", error);
		return callbackFunctionFromFrontEnd({ error });
	}
};

export default { createANewRoom, findRoom, connectToRoom, getAllRooms };
