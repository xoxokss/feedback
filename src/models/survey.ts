import { PrismaClient, Tag, User, Survey } from "@prisma/client";

const prisma = new PrismaClient();

/*
DBName: SurveyCopy
id: number
project_id: number
title: string
question: [
	{
		question_id: 1,
		order: 1,
		question: "질문1",
		type: "ONE", // ONE, MUL, TXT, LTXT
		choice: [
			{
				choice_id: 1,
				order: 1,
				text: "선택지1"
			},
			{
				choice_id: 2,
				order: 2,
				text: "선택지2"
			} 
		]
	},
	{
		choice_id: 2,
		order: 2,
		question: "질문2",
		type: "LTXT", // ONE, MUL, TXT, LTXT
	},
]
*/

/*
저장시에는 JSON.stringify, 불러올때는 JSON.parse
DBName: Answer
id: number
survey_copy_id: number
user_id: number
answer: [
	{
		question_id: 1,
		type: "ONE",
		choice_id: 1
	},
	{
		question_id: 2,
		type: "MUL",
		choice_id: [1, 2]
	},
	{
		question_id: 3,
		type: "TXT",
		text: "답변"
	}
]
*/

interface addSurveyParams {
	userId: number;
	title: string;
	question: questionParams[];
}

interface questionParams {
	order: number;
	title: string;
	type: "ONE" | "MUL" | "TXT" | "LTXT";
	choice?: choiceItem[];
}

interface choiceItem {
	order: number;
	text: string;
}

interface answerParams {
	id: number;
	userId: number;
	answers: {
		id: number;
		answer: number | string;
	}[];
}

export class SurveyModel {
	static async findOneById(id: number) {
		const survey = await prisma.$queryRaw<
			{
				id: number;
				userId: number;
				title: string;
				question: string;
			}[]
		>`
      SELECT
				Survey.id as id,
				Survey.user_id as userId,
				title,
				question as question
      From
        Survey
      INNER JOIN
        User
      ON
        Survey.user_id = User.id
      WHERE
        Survey.id = ${id}
		`;

		return survey;
	}

	static async findAllByUserId(userId: number) {
		const surveys = await prisma.$queryRaw<
			{
				id: number;
				userId: number;
				title: string;
				question: JSON;
			}[]
		>`
      SELECT
				Survey.id as id,
				Survey.user_id as userId,
				title,
				question
      From
        Survey
      INNER JOIN
        User
      ON
        Survey.user_id = User.id
      WHERE
        Survey.user_id = ${userId}
    `;

		return surveys;
	}

	static async add({ userId, title, question }: addSurveyParams) {
		return prisma.survey.create({
			data: {
				userId: userId,
				title: title,
				question: question as any,
			},
		});
	}

	static async update(
		id: number,
		{ title, question }: { title: string; question: questionParams[] }
	) {
		return prisma.survey.update({
			where: {
				id: id,
			},
			data: {
				title: title,
				question: question as any,
			},
		});
	}

	static async remove(id: number) {
		return prisma.survey.delete({
			where: {
				id: id,
			},
		});
	}

	static async submit(answer: answerParams) {
		console.log(answer);
		return prisma.answer.create({
			data: {
				userId: answer.userId,
				surveyCopyId: answer.id,
				answer: answer.answers as any,
			},
		});
	}
}
