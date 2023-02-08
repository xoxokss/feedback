import { PrismaClient, Tag, User } from "@prisma/client";

const prisma = new PrismaClient();

const addSurveyPage = (title: string, auth: { result: boolean; user?: User | null }) => {
	// 설문지 양식 추가
	return prisma.survey.create({
		data: {
			userId: auth.user!.id,
			surveyTitle: title,
		},
	});
};

const addSurveyQuestion = ({
	surveyId,
	qTitle,
	qType,
	qModel,
	qRequired,
	qOrder,
}: {
	surveyId: number;
	qTitle: string;
	qType: string;
	qModel: string;
	qRequired: boolean;
	qOrder: number;
}) => {
	// 설문지 질문 추가
	return prisma.question.create({
		data: {
			surveyId,
			questionTitle: qTitle,
			questionType: qType,
			questionModel: qModel,
			questionRequired: qRequired,
			questionOrder: qOrder,
		},
	});
};

const getSurvey = (id: number) => {
	return prisma.survey.findUnique({
		where: {
			id,
		},
		include: {
			Question: true,
		},
	});
};

const addSurveyAnswerSheet = (auth: any, surveyId: number) => {
	const answerSheetResult = prisma.answerSheet.create({
		data: {
			userId: auth.user!.id,
			surveyId,
		},
	});

	console.log(answerSheetResult);

	return answerSheetResult;
};

const addSurveyAnswer = (answerSheetId: number, questionId: number, answer: string) => {
	const answerResult = prisma.answer.create({
		data: {
			questionId,
			answerSheetId,
			answer,
		},
	});

	return answerResult;
};

const getSurveyAnswerUserList = (id: number) => {
	// return prisma.$queryRaw`
	// 	SELECT
	// 		sa.user_id AS userId
	// 	FROM SurveyAnswer AS sa
	// `;
};

const getSurveyAnswer = (id: number) => {
	return prisma.$queryRaw`
		SELECT
			sa.id,
			sa.survey_id AS surveyId,
			sa.question_id AS questionId,
			sa.user_id AS userId,
			sq.question_title AS questionTitle,
			sq.question_model AS questionModel,
			sa.answer AS answer
		FROM SurveyAnswer AS sa
		INNER JOIN 
			SurveyQuestion AS sq
		ON 
			sa.question_id = sq.id
		WHERE
			sa.survey_id = ${id}
	`;
};

export const surveyModel = {
	addSurveyPage,
	addSurveyQuestion,
	getSurvey,
	addSurveyAnswerSheet,
	addSurveyAnswer,
	getSurveyAnswer,
	getSurveyAnswerUserList,
};
