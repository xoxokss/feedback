import { Request, Response } from "express";
import { SurveyModel } from "@models/survey";
import { resObj } from "~/utils/helper/resObj";
import { getUserByToken } from "@utils/helper/auth";
import { answerModel } from "~/models/answer";

interface SurveyParams {
	title: string;
	question: questionParams[];
}

interface questionParams {
	id: number;
	order: number;
	title: string;
	type: "ONE" | "MUL" | "TXT" | "LTXT";
	choice?: choiceItem[];
}

interface choiceItem {
	id: number;
	order: number;
	text: string;
}

export class SurveyController {
	// 설문지 추가
	static async addSurvey(req: Request, res: Response) {
		const { title, question }: SurveyParams = req.body;
		const { authorization } = req.headers;

		try {
			const auth = await getUserByToken(authorization as string);

			// user 정보가 없을 경우 에러 메세지
			if (!auth.user) res.status(500).send(resObj.failed({ status: 500, error: "User not found" }));

			// question은 현재 order 값을 활용하여 id를 만들어줌
			const result = await SurveyModel.add({
				userId: auth.user!.id,
				title,
				question: question.map((item) => ({ ...item, id: item.order })),
			});

			res.status(200).send(resObj.success({ status: 200, data: result }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	}

	static async getSurvey(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const result = await SurveyModel.findOneById(parseInt(id));

			res.status(200).send(
				resObj.success({
					status: 200,
					data: { ...result[0], question: result[0].question },
				})
			);
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	}

	static async getSurveyByUserId(req: Request, res: Response) {
		const { authorization } = req.headers;

		try {
			const auth = await getUserByToken(authorization as string);
			const result = await SurveyModel.findAllByUserId(auth!.user!.id);

			// user 정보가 없을 경우 에러 메세지
			if (!auth.user) res.status(500).send(resObj.failed({ status: 500, error: "User not found" }));

			res.status(200).send(resObj.success({ status: 200, data: result }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	}

	static async modifySurvey(req: Request, res: Response) {
		const { id } = req.params;
		const { title, question }: SurveyParams = req.body;

		try {
			const result = await SurveyModel.update(parseInt(id), {
				title,
				question: question.map((item) => ({ ...item, id: item.order })),
			});

			res.status(200).send(resObj.success({ status: 200, data: result }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	}

	static async removeSurvey(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const result = await SurveyModel.remove(parseInt(id));

			res.status(200).send(resObj.success({ status: 200, data: result }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	}

	static async submitSurvey(req: Request, res: Response) {
		const { id } = req.params;
		const { authorization } = req.headers;
		const reqBody = req.body;

		try {
			const auth = await getUserByToken(authorization as string);

			// user 정보가 없을 경우 에러 메세지
			if (!auth.user) {
				res.status(500).send(resObj.failed({ status: 500, error: "User not found" }));
				return;
			}

			await answerModel.checkAnswerByDuplicate(auth.user!.id, parseInt(id));

			// user 정보가 있을 경우
			// reqBody에 userId 추가
			reqBody.id = parseInt(id);
			reqBody.userId = auth.user!.id;

			const result = await SurveyModel.submit(reqBody);

			res.status(200).send(resObj.success({ status: 200, data: result }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	}
}
