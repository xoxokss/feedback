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
	return prisma.surveyQuestion.create({
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
			SurveyQuestion: true,
		},
	});
};

const addSurveyAnswer = (auth: any, questionId: number, surveyId: number, answer: string) => {
	return prisma.surveyAnswer.create({
		data: {
			userId: auth.user!.id,
			surveyId,
			questionId,
			answer,
		},
	});
};

const getSurveyAnswer = (id: number) => {
	return prisma.surveyAnswer.findMany({
		where: {
			surveyId: id,
		},
	});
};

export const surveyModel = {
	addSurveyPage,
	addSurveyQuestion,
	getSurvey,
	addSurveyAnswer,
	getSurveyAnswer,
};
