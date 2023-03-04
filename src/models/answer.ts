import { PrismaClient, Tag, User } from '@prisma/client';
const prisma = new PrismaClient();

// 응답 전체 조회 (통계)
const getSurveyAnswer = (id: number) => {
  return prisma.$queryRaw`
  SELECT FROM`;
};

// 응답 개별 조회

// 응답 통계용

export const answerModel = {
  getSurveyAnswer,
};
