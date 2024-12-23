import BasicRepositoryOperations from "../helpers/BasicRepositoryOperations";
interface RoomsControllerRequest {
	roomName: string;
	roomPwd: string;
	userUUID?: string;
}

export const createRoom = async ({ roomName, roomPwd, userUUID }: RoomsControllerRequest) => {
	try {
		console.log("Inside createRoom");
		const roomRecord = await BasicRepositoryOperations.create("Room", {
			name: roomName,
			password: roomPwd,
			ownerId: userUUID,
		});
		return Promise.resolve(roomRecord);
	} catch (error) {
		console.error("Error in createRoom");
		return Promise.reject(error);
	}
};

export const findIfRoomExists = async ({ roomName, roomPwd }: RoomsControllerRequest) => {
	try {
		console.log("Inside findIfRoomExists");
		const roomRecord = await BasicRepositoryOperations.findOne("Room", {
			name: roomName,
			password: roomPwd,
		});
		return Promise.resolve(roomRecord);
	} catch (error) {
		console.error("Error in findIfRoomExists");
		return Promise.reject(error);
	}
};

export const findAllRooms = async () => {
	try {
		console.log("Inside findAllRooms");
		const roomRecords = await BasicRepositoryOperations.find("Room", {
			select: {
				id: true,
				name: true,
				owner: {
					id: true,
					name: true,
				},
			},
			relations: {
				owner: true,
			},
		});
		return Promise.resolve(roomRecords);
	} catch (error) {
		console.error("Error in findAllRooms");
		return Promise.reject(error);
	}
};
