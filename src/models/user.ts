import { PrismaClient, Tag } from "@prisma/client";
const prisma = new PrismaClient();

export const userModel = {
  getUserByUserId: async (userId: string) => {
    return await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
  },
  getUserByNickname: async (nickname: string) => {
    return prisma.user.findUnique({
      where: {
        nickname: nickname,
      },
    });
  },
  deleteUser: async (userId: string) => {
    const exUser = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    if (exUser) {
      return await prisma.user.delete({
        where: {
          userId: userId,
        },
      });
    }
    return;
  },
};
