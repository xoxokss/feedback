import { Request, Response } from "express";
import { surveyModel } from "@models/survey";
import { resObj } from "~/utils/helper/resObj";
import { getUserByToken } from "~/utils/helper/auth";

interface ISurvey {
	surveyTitle: string;
	surveyQuestions: Array<{
		qTitle: string;
		qType: string;
		qModel: string;
		qRequired: boolean;
		qOrder: number;
	}>;
}

// 설문지 등록
const addSurvey = async (req: Request, res: Response) => {
	const { surveyTitle, surveyQuestions }: ISurvey = req.body;
	const { authorization } = req.headers;

	try {
		const auth = await getUserByToken(authorization as string);
		const result = await surveyModel.addSurveyPage(surveyTitle, auth);

		const response = await Promise.all(
			surveyQuestions.map(async ({ qTitle, qType, qModel, qRequired, qOrder }) => {
				return surveyModel.addSurveyQuestion({
					surveyId: result.id,
					qTitle,
					qType,
					qModel: JSON.stringify(qModel),
					qRequired,
					qOrder,
				});
			})
		);

		res.status(201).send(resObj.success({ status: 201, data: response }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

// 설문 응답을 위한 단일 설문 조회
const getSurvey = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const result = await surveyModel.getSurvey(parseInt(id));

		res.status(200).send(resObj.success({ status: 200, data: result }));
	} catch (err) {
		res.status(500).send(resObj.success({ status: 500, data: err }));
	}
};

// 내가 작성한 설문지 리스트 가져오기
const getSurveyList = async (req: Request, res: Response) => {
	const { authorization } = req.headers;

	try {
		// User 정보 가져오기
		const auth = await getUserByToken(authorization!);

		// User가 자신이 만든 설문지 목록 가져오기
		const result = await surveyModel.getSurveyListByUserId(auth.user!.id);

		res.status(200).send(resObj.success({ status: 200, data: result }));
	} catch (err) {
		res.status(500).send(resObj.success({ status: 500, data: err }));
	}
};

// 설문 응답 등록
const submitSurvey = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const { answer } = req.body;

	try {
		const auth = await getUserByToken(authorization!);

		const surveyAnswerResult = await surveyModel.addSurveyAnswerSheet(auth, Number(id));
		// const survey = await surveyModel.addSurveyAnswer(surveyAnswerResult.id, answer);
		answer.map(async (item: any) => {
			// survey 추가
			return await surveyModel.addSurveyAnswer(
				surveyAnswerResult.id,
				Number(item.questionId),
				String(item.answer)
			);
		});

		res.status(200).send(
			resObj.success({
				status: 200,
				data: {
					result: true,
				},
			})
		);
	} catch (err) {
		res.status(500).send(resObj.success({ status: 500, data: err }));
	}
};

// 해당 설문의 응답 리스트 가져오기
const getSurveyAnswerListShortInfo = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const result = await surveyModel.getSurveyAnswerListShortInfo(Number(id));
		res.status(200).send(resObj.success({ status: 200, data: result }));
	} catch (err) {
		res.status(500).send(resObj.success({ status: 500, data: err }));
	}
};

const getSurveyAnswerList = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const result = await surveyModel.getSurveyAnswer(Number(id));

		res.status(200).send(resObj.success({ status: 200, data: result }));
	} catch (err) {
		res.status(500).send(resObj.success({ status: 500, data: err }));
	}
};

export const surveyController = {
	addSurvey,
	getSurvey,
	getSurveyList,
	submitSurvey,
	getSurveyAnswerListShortInfo,
	getSurveyAnswerList,
};
