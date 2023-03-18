import { Request, Response } from "express";
import { SurveyModel } from "@models/survey";
import { resObj } from "~/utils/helper/resObj";
import { getUserByToken } from "@utils/helper/auth";
import { PrismaClient } from "@prisma/client";

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
				question: question,
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
}
