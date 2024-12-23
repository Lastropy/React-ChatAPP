import BasicRepositoryOperations from "../helpers/BasicRepositoryOperations";
interface MessagesControllerRequest {
	roomId: string;
}

interface CreateMessageRequest extends MessagesControllerRequest {
	userId: string;
	content: string;
}

export const createMessage = async ({ content, roomId, userId }: CreateMessageRequest) => {
	try {
		console.log("Inside createMessage");
		const messageRecord = await BasicRepositoryOperations.create("Message", {
			content,
			roomId,
			userId,
		});
		console.log(messageRecord);
		return Promise.resolve(messageRecord);
	} catch (error) {
		console.error("Error in createMessage");
		return Promise.reject(error);
	}
};

export const findAllMessages = async ({ roomId }: MessagesControllerRequest) => {
	try {
		console.log("Inside findAllMessages");
		const messagesRecord = await BasicRepositoryOperations.find("Message", {
			where: {
				roomId,
			},
			relations: {
				user: true,
			},
			select: {
				content: true,
				userId: true,
				user: {
					name: true,
				},
			},
			order: {
				generatedOn: "ASC",
			},
		});
		console.log(messagesRecord);
		return Promise.resolve(messagesRecord);
	} catch (error) {
		console.error("Error in findAllMessages");
		return Promise.reject(error);
	}
};
