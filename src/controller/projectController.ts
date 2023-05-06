import express from "express";
import { getUserByToken } from "~/utils/helper/auth";
import { resObj } from "~/utils/helper/resObj";
import { CopyModel } from "~/models/copy";
import { ProjectModel } from "~/models/project";

// /**
//  * Get List All
//  */

export class ProjectController {
	static async getProjectsAll(req: express.Request, res: express.Response) {
		const query = req.query;
		const headers = req.headers;

		try {
			// parameter에 user=0이면 내 정보 조회, 아니면 해당 유저 조회, user가 없다면 전체 조회
			const userId = query?.user;

			// 전체 조회
			if (userId) {
				if (Number(userId) === 0) {
					if (headers?.authorization) {
						const auth = await getUserByToken(headers.authorization);
						console.log(auth);
						const projects = await ProjectModel.findAllByUserId(Number(auth.user?.id));
						res.status(200).send(resObj.success({ status: 200, data: projects }));
						return;
					} else {
						res.status(500).send(
							resObj.failed({
								status: 500,
								error: "토큰이 없습니다.",
							})
						);
						return;
					}
				}
				const projects = await ProjectModel.findAllByUserId(Number(userId));
				res.status(200).send(resObj.success({ status: 200, data: projects }));
			} else {
				const projects = await ProjectModel.findAll();
				res.status(200).send(resObj.success({ status: 200, data: projects }));
			}
		} catch (e) {
			const error = e as Error;

			console.log(error);
			res.status(500).send(resObj.failed({ status: 500, error: e }));
		}
	}

	static async getProjectsOrderByLike(req: express.Request, res: express.Response) {
		try {
			// 좋아요 순 전체 조회
			const projects = await ProjectModel.findAllOrderByLike(10);

			console.log(projects);

			res.status(200).send(resObj.success({ status: 200, data: projects }));
		} catch (e) {
			const error = e as Error;

			console.log(error);
			res.status(500).send(resObj.failed({ status: 500, error: e }));
		}
	}

	static async getProject(req: express.Request, res: express.Response) {
		const { id } = req.params;
		const headers = req.headers;

		try {
			// 로그인 상태일 경우 isLike 추가
			if (headers?.authorization) {
				const auth = await getUserByToken(headers.authorization);

				if (auth?.user?.id) {
					const project = await ProjectModel.findOneById(Number(id));
					const isLike = await ProjectModel.getIsLike(Number(auth.user.id), Number(id));
					res.status(200).send(resObj.success({ status: 200, data: { ...project[0], isLike } }));
					return;
				}
			}
			// 프로젝트 조회
			const project = await ProjectModel.findOneById(Number(id));

			res.status(201).send(resObj.success({ status: 200, data: project[0] }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	}

	static async addProject(req: express.Request, res: express.Response) {
		const { title, intro, content, surveyId, imageId, tags } = req.body;

		const { user } = res.locals;

		try {
			// Survey to SurveyCopy
			const surveyCopy = await CopyModel.copySurvey(surveyId, user.id);

			if (!surveyCopy) throw new Error("Survey Copy Error");

			// 프로젝트 추가
			const projectResult = await ProjectModel.add(
				{
					title,
					intro,
					content,
					surveyCopyId: surveyCopy.id,
					imageId,
					userId: user.id,
				},
				tags
			);

			// // 모든 처리가 정상적으로 이루어졌다면 201 응답 및 태그 포함 데이터 반환
			res.status(201).send(resObj.success({ status: 201, data: projectResult }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	}

	static async modifyProject(req: express.Request, res: express.Response) {
		const { id } = req.params;
		const { title, intro, content, surveyId, imageId, tags } = req.body;

		const { user } = res.locals;

		try {
			// Survey to SurveyCopy
			const surveyCopy = await CopyModel.copySurvey(surveyId, user.id);

			if (!surveyCopy) throw new Error("Survey Copy Error");

			// 프로젝트 추가
			const projectResult = await ProjectModel.update(
				Number(id),
				{
					title,
					intro,
					content,
					surveyCopyId: surveyCopy.id,
					imageId,
					userId: user.id,
				},
				tags
			);

			// // 모든 처리가 정상적으로 이루어졌다면 201 응답 및 태그 포함 데이터 반환
			res.status(201).send(resObj.success({ status: 201, data: projectResult }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	}

	static async removeProject(req: express.Request, res: express.Response) {
		const { id } = req.params;

		try {
			// 프로젝트 추가
			const projectResult = await ProjectModel.delete(Number(id));

			// // 모든 처리가 정상적으로 이루어졌다면 201 응답 및 태그 포함 데이터 반환
			res.status(201).send(resObj.success({ status: 201, data: projectResult }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	}

	static async likeProject(req: express.Request, res: express.Response) {
		const { id } = req.params;
		const { user } = res.locals;

		try {
			// 프로젝트 추가
			const projectResult = await ProjectModel.like(Number(id), user.id);

			// // 모든 처리가 정상적으로 이루어졌다면 201 응답 및 태그 포함 데이터 반환
			res.status(201).send(resObj.success({ status: 201, data: projectResult }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	}
}
