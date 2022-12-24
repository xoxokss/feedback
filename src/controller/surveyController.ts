import { Request, Response } from "express";
import { surveyModel } from "@models/survey";
import { resObj } from "~/utils/helper/resObj";

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

const addSurvey = async (req: Request, res: Response) => {
	const { surveyTitle, surveyQuestions }: ISurvey = req.body;

	try {
		const result = await surveyModel.addSurveyPage(surveyTitle);

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

const getSurvey = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const result = await surveyModel.getSurvey(parseInt(id));

		res.status(200).send(resObj.success({ status: 200, data: result }));
	} catch (err) {
		res.status(500).send(resObj.success({ status: 500, data: err }));
	}
};

const submitSurvey = async (req: Request, res: Response) => {};

export const surveyController = {
	addSurvey,
	getSurvey,
	submitSurvey,
};
