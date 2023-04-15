import { PrismaClient, Tag, User } from "@prisma/client";
const prisma = new PrismaClient();

// 응답 전체 조회 (통계)
const getSurveyAnswer = (id: number) => {
	return prisma.$queryRaw`SELECT * FROM Answer WHERE survey_copy_id = ${id}`;
};

// 응답 개별 조회 목록 (리스트)
const getSurveyAnswerListShortInfo = (id: number) => {
	return prisma.$queryRaw`SELECT * FROM Answer WHERE survey_copy_id = ${id} GROUP BY user_id`;
};
// 응답 개별 조회 상세 (미정)
const getSurveyAnswerUser = (id: number) => {};

const checkAnswerByDuplicate = async (userId: number, answerCopyId: number) => {
	const result =
		await prisma.$queryRaw`SELECT * FROM Answer WHERE survey_copy_id = ${answerCopyId} and user_id = ${userId}`;
	if (result) return true;
	return false;
};

export const answerModel = {
	getSurveyAnswer,
	getSurveyAnswerListShortInfo,
	getSurveyAnswerUser,
	checkAnswerByDuplicate,
};
