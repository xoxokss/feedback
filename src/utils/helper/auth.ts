import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const getUserByToken = async (token: string) => {
	const [tokenType, tokenValue] = (token || "").split(" ");

	if (!tokenValue || tokenType !== "Bearer") {
		return {
			result: false,
		};
	}

	try {
		const { userId } = <jwt.UserIDJwtPayload>jwt.verify(tokenValue, "sangseon");
		const user = await prisma.user.findUnique({
			where: { username: userId },
		});

		return {
			result: true,
			user,
		};
	} catch (error) {
		return {
			result: false,
		};
	}
};
