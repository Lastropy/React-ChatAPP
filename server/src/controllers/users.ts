import BasicRepositoryOperations from "../helpers/BasicRepositoryOperations";
interface UsersControllerRequest {
	name: string;
	email: string;
}

export const createIfNotExists = async ({ name, email }: UsersControllerRequest) => {
	try {
		console.log("Inside createIfNotExists");
		let user = await findUser({ name, email });
		if (!user) {
			user = await BasicRepositoryOperations.create("User", {
				name,
				email,
			});
		}
		return Promise.resolve(user);
	} catch (error) {
		console.error("Error in upsertUser");
		return Promise.reject(error);
	}
};

export const findUser = async ({ name, email }: UsersControllerRequest) => {
	try {
		let user = await BasicRepositoryOperations.find("User", {
			name,
			email,
		});
		return Promise.resolve(user);
	} catch (error) {
		console.error("Error in findUser");
		return Promise.reject(error);
	}
};
