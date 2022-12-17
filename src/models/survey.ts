import { PrismaClient, Tag } from "@prisma/client";

const prisma = new PrismaClient();

const addSurveyPage = (title: string) => {
	// 설문지 양식 추가
	return prisma.survey.create({
		data: {
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

export const surveyModel = {
	addSurveyPage,
	addSurveyQuestion,
	getSurvey,
};
