import { PrismaClient, Tag, User } from "@prisma/client";
const prisma = new PrismaClient();

// 응답 전체 조회 (통계)
const getSurveyAnswer = (id: number) => {
	return prisma.$queryRaw`SELECT * FROM Answer WHERE survey_copy_id = ${id}`;
};

// 응답 개별 조회 상세
const getSurveyAnswerUser = (id: number) => {
	return prisma.$queryRaw<
		{
			id: number;
			user_id: number;
			survey_copy_id: number;
			title: string;
			question: {
				id: number;
				type: string;
				order: number;
				title: string;
				choice: string[];
			}[];
			answer: {
				id: number;
				answer: number;
			}[];
			created_at: Date;
			updated_at: Date;
		}[]
	>`
		SELECT
			a.id,
			a.user_id,
			a.survey_copy_id,
			sc.title,
			sc.question,
			a.answer,
			a.created_at,
			a.updated_at
		FROM Answer as a 
		INNER JOIN SurveyCopy as sc ON a.survey_copy_id = sc.id
		WHERE a.id = ${id}
	`;
};

const checkAnswerByDuplicate = async (userId: number, answerCopyId: number) => {
	const result =
		await prisma.$queryRaw`SELECT * FROM Answer WHERE survey_copy_id = ${answerCopyId} and user_id = ${userId}`;
	if (result) return true;
	return false;
};

const getAnswerList = async (projectId: number) => {
	const result = await prisma.$queryRaw<
		{
			id: number;
		}[]
	>`
		SELECT
			sc.id
		FROM Project AS p
		INNER JOIN SurveyCopy AS sc
		ON p.survey_copy_id = sc.id
		WHERE p.id = ${projectId};
	`;

	const answer = await prisma.$queryRaw`
		SELECT
			a.id,
			u.nickname,
			u.email,
			a.created_at,
			a.updated_at
		FROM Answer AS a INNER JOIN User AS u ON a.user_id = u.id where survey_copy_id=${result[0].id};
	`;

	return answer;
};

export const answerModel = {
	getSurveyAnswer,
	getSurveyAnswerUser,
	checkAnswerByDuplicate,
	getAnswerList,
};
