import { Request, Response } from "express";
import { resObj } from "@helper/resObj";
import { getUserByToken } from "~/utils/helper/auth";
import { answerModel } from "~/models/answer";

// 설문 응답 목록 조회
const getAnswerList = async (req: Request, res: Response) => {
	const { id } = req.params;

	// Project ID
	const { authorization } = req.headers;
	// 유저 체크
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

		if (answer.length === 0) {
			res.status(404).send(resObj.failed({ status: 404, error: "검색 결과가 없습니다" }));
			return;
		}

		const questions = answer[0].question;
		const questionsSelect = answer[0].answer;

		const newQuestion = questions.map((question) => {
			const select = questionsSelect.find((select) => select.id === question.id);

			return {
				...question,
				choice: question.choice.map((choice, idx) => {
					return {
						text: choice,
						selected: select?.answer === idx,
					};
				}),
			};
		});

		console.log(newQuestion);

		res.status(200).send(
			resObj.success({
				status: 200,
				data: {
					id: answer[0].id,
					user_id: answer[0].user_id,
					survey_copy_id: answer[0].survey_copy_id,
					title: answer[0].title,
					question: newQuestion,
					created_at: answer[0].created_at,
					updated_at: answer[0].updated_at,
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
