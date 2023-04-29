import { Request, Response } from "express";
import { resObj } from "@helper/resObj";
import { getUserByToken } from "~/utils/helper/auth";
import { answerModel } from "~/models/answer";

/*
{
	"success": true,
	"status": 200,
	"data": {
			"id": 4,
			"userId": 1,
			"title": "설문지 제목",
			"question": [
					{
							"id": 1,
							"type": "ONE",
							"order": 1,
							"title": "질문1",
							"choice": [
									"답변1",
									"답변2",
									"답변3"
							]
					},
					{
							"id": 2,
							"type": "ONE",
							"order": 2,
							"title": "질문2",
							"choice": [
									"답변2",
									"답변3",
									"답변4"
							]
					}
			]
	}
}
*/

/*
DBName: SurveyCopy
id: number
project_id: number
title: string
question: [
	{
		id: 1,
		order: 1,
		question: "질문1",
		type: "ONE", // ONE, MUL, TXT, LTXT
		choice: [
			{
				id: 1,
				order: 1,
				text: "선택지1"
			},
			{
				id: 2,
				order: 2,
				text: "선택지2"
			} 
		]
	},
	{
		id: 2,
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
interface IAnswer {
	id: number;
	answer: Array<{}>;
	survey_copy_id: number;
	user_id: number;
}

// 설문 응답 목록 조회
const getAnswerList = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	try {
		const auth = await getUserByToken(authorization!);

		const answer = await answerModel.getAnswerList(parseInt(id));

		res.status(200).send(resObj.success({ status: 200, data: answer }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

const getAnswerUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;

	try {
		const auth = await getUserByToken(authorization!);

		const answer = await answerModel.getSurveyAnswerUser(parseInt(id));

		let newAnswer = answer[0].question.map((item) => {
			return {
				...item,
				answer: answer[0].answer.find((answerItem) => answerItem.id === item.id),
			};
		});

		res.status(200).send(
			resObj.success({
				status: 200,
				data: {
					...answer[0],
					question: null,
					answer: newAnswer,
				},
			})
		);
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

export const answerController = {
	getAnswerList,
	getAnswerUser,
};
