import { Request, Response } from "express";
import { resObj } from "@helper/resObj";
import { getUserByToken } from "~/utils/helper/auth";

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

// 설문지 응답 작성
const createAnswer = async (req: Request, res: Response) => {
	const { answer } = req.body;
	const { user } = res.locals;
	try {

		}catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};
const analysisAnswer = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		let data = {};

	}catch(err){
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
}

// 특정 설문의 응답 전체 조회 => answer 콜롬 파싱 (JSON 변환) => 통계 처리 => response
const getAnswer = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	try {
		let data = {};
		const auth = await getUserByToken(authorization!);

		// const survey = await SurveyModel.getSurveyAnswer(parseInt(id));

		res.status(200).send(resObj.success({ status: 200, data: data }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

// 설문 응답 개별 조회

export const answerController = {
	getAnswer,
};
