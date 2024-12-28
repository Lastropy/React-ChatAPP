import { JwksClient } from "jwks-rsa";
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

const getSigningKey = async (kid: string): Promise<string> => {
	try {
		const client = new JwksClient({
			jwksUri: `${process.env.ISSUER_URL}.well-known/jwks.json`,
		});
		const key = await client.getSigningKey(kid);
		const signingKey = key?.getPublicKey() || "";
		return signingKey;
	} catch (error) {
		console.error(error);
		throw new Error("Error getting signing key.");
	}
};

export const authSocketMiddleware = async (socket: Socket, next: any) => {
	console.log("Using auth middleware");
	const { token } = socket.handshake.auth;
	try {
		if (!token) {
			throw new Error("No access token provided.");
		}
		const decodedHeader = jwt.decode(token, { complete: true }) as { header: { kid: string } } | null;
		if (!decodedHeader || !decodedHeader.header.kid) {
			throw new Error("Invalid token: Missing 'kid' in header.");
		}
		const signingKey = await getSigningKey(decodedHeader.header.kid);
		const decodedToken = jwt.verify(token, signingKey, {
			algorithms: ["RS256"],
			audience: process.env.BASE_URL + ":" + process.env.PORT,
			issuer: process.env.ISSUER_URL,
		});
		socket.data.user = decodedToken;
		next();
	} catch (error) {
		console.error(error);
		return next(new Error("Not Authorized"));
	}
};
