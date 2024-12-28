import { Server, Socket } from "socket.io";
import * as controllers from "../controllers";
import Joi from "joi";

const userRequestSchema = Joi.object({
	name: Joi.string()
		.pattern(/^[a-zA-Z\s'",.-]+$/)
		.min(1)
		.max(100)
		.required(),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } }),
});

const newUserJoins = async (data: any, callbackFunctionFromFrontEnd: any) => {
	try {
		const userData = await userRequestSchema.validateAsync(data);
		const user = await controllers.UsersController.createIfNotExists(userData);
		callbackFunctionFromFrontEnd(user);
	} catch (error: any) {
		console.error("Error in newUserJoins: ", error.message);
		return callbackFunctionFromFrontEnd({ error });
	}
};

export default { newUserJoins };
