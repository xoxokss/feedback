import { PrismaClient, Tag } from "@prisma/client";
const prisma = new PrismaClient();



export const userModel = {
  // 유저 생성
    createUser: async (username: string, email:string, nickname:string, password: string) => {
      const defaultProfileImage = "https://i.imgur.com/9LDfN2H.png"
    return await prisma.user.create({
      data: {
        username: username,
        email: email,
        nickname: nickname,
        password: password,
        profileImage: defaultProfileImage,
      },
    });
  },
  // 유저 찾기
  getUserByUserId: async (username: string) => {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  },
  // 닉네임으로 유저 조회
  getUserByNickname: async (nickname: string) => {
    return prisma.user.findUnique({
      where: {
        nickname: nickname,
      },
    });
  },

  // 유저 삭제
  deleteUser: async (username: string) => {
    const exUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (exUser) {
      return await prisma.user.delete({
        where: {
          username: username,
        },
      });
    }
    return;
  },
};
