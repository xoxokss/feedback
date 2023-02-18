import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET: any = process.env.SECRET;
const prisma = new PrismaClient();

export const getUserByToken = async (token: string) => {
  const [tokenType, tokenValue] = (token || "").split(" ");

  if (!tokenValue || tokenType !== "Bearer") {
    return {
      result: false,
    };
  }

  try {
    const { userId } = <jwt.UserIDJwtPayload>jwt.verify(tokenValue, SECRET);
    const user = await prisma.user.findUnique({
      where: { userId: userId },
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
