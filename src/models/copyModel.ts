import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CopyModel {
	static async copySurvey(surveyId: number, userId: number) {
		const survey = await prisma.survey.findUnique({
			where: {
				id: surveyId,
			},
		});

		if (survey) {
			const { title, question } = survey;

			const newSurvey = await prisma.surveyCopy.create({
				data: {
					userId,
					title,
					question: question as string,
				},
			});

			return newSurvey;
		} else {
			return null;
		}
	}
}
