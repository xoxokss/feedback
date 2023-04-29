import { Request, Response } from "express";
import { resObj } from "@helper/resObj";
import { SurveyModel } from "@models/survey";
import { answerModel } from "@models/answer";
import { stringify } from "querystring";
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
interface Ianalysis {
	project : Array<{}>;
	answer : Array<{}>;
}
// 설문 답변 통계 조회
const getAnalysis = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		let data = {};

		const projectSurvey:any = await SurveyModel.findOneById(parseInt(id));
		//console.log("프로젝트 :", projectSurvey)
		data = projectSurvey
		//console.log(projectSurvey)
		const surveyAnswer:any = await answerModel.getSurveyAnswer(parseInt(id));
		//console.log("응답 : ",surveyAnswer)	

		const questionOrder:any = projectSurvey[0].question
		

		let result = []
for(let i = 0; i < questionOrder.length; i++){
	//console.log(questionOrder[i].title)
	const a = {title:questionOrder[i].title, type:questionOrder[i].type}
	result.push(a)
}
data = result


console.log("result1 : ",surveyAnswer[0])
const arr = []
 for(let i = 0; i < surveyAnswer.length; i++){
	const a = JSON.parse(surveyAnswer[0].answer)
arr.push(a[i])
}
 console.log(arr)


//퍼센트는 answer.length로 나눠서 구함


// resObj.data = { 
// 	"suveyId" : projectSurvey.id,
// 			"project" : projectSurvey,

// }

		// for(let i = 0; i < surveyAnswer.length; i++){
		// 	surveyAnswer[i].answer = JSON.parse(surveyAnswer[i].answer);
		// 	//console.log(surveyAnswer[i].answer)
		// }


		/*
		resObj.data = 
		{
			{
				"id": 1,
				"surveyId": surveyAnswer.surveyId,
				"questionTitle": "질문1",
				"questionType": "SEL_ONE",
				"questionModel": "[\"답변1\",\"답변2\",\"답변3\"]",
				"questionRequired": true,
				"questionOrder": 1
			},
			{
				"id": 2,
				"surveyId": 1,
				"questionTitle": "질문2",
				"questionType": "SEL_ONE",
				"questionModel": "[\"답변1\",\"답변2\",\"답변3\"]",
				"questionRequired": true,
				"questionOrder": 2
			}

			{
				suveyId : 1,
				questionTitle : "sdk", // projectSuvey.question.title
				questionType : "ONE", // projectSuvey.question.type
				
			}
		}*/

		res.status(200).send(resObj.success({ status: 200, data: data }))
	}catch(err){
		console.log(err)
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
}

// 특정 설문의 응답 전체 조회 => answer 콜롬 파싱 (JSON 변환) => 통계 처리 => response
const getAnswer = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const data = {};
		// const survey = await SurveyModel.getSurveyAnswer(parseInt(id));

		res.status(200).send(resObj.success({ status: 200, data: data }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

// 설문 응답 개별 조회

export const answerController = {
	getAnswer,
	getAnalysis
};
