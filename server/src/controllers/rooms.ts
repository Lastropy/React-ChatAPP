import BasicRepositoryOperations from "../helpers/BasicRepositoryOperations";
interface RoomsControllerRequest {
	roomName: string;
	roomPwd: string;
	userUUID: string;
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
