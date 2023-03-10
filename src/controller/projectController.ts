import express from "express";
// import { projectModel } from "@models/project";
// import { resObj } from "@helper/resObj";
// import { tagModel } from "@models/tag";
import { Tag } from "@prisma/client";
import { getUserByToken } from "~/utils/helper/auth";

// /**
//  * Get List All
//  */
// const getProjectList = async (req: express.Request, res: express.Response) => {
// 	const query = req.query;
// 	const headers = req.headers;

// 	try {
// 		// parameter에 user=0이면 내 정보 조회, 아니면 해당 유저 조회, user가 없다면 전체 조회
// 		const userId = query?.user;
// 		let projectList = null;
// 		if (userId) {
// 			if (typeof Number(userId) === "number") {
// 				if (Number(userId) === 0) {
// 					// 내 프로젝트 조회
// 					if (headers?.authorization) {
// 						const auth = await getUserByToken(headers.authorization);
// 						projectList = await projectModel.getProjectListByUserId(Number(auth.user?.id));
// 					} else {
// 						res.status(500).send(
// 							resObj.failed({
// 								status: 500,
// 								error: "토큰이 없습니다.",
// 							})
// 						);
// 						return;
// 					}
// 				} else {
// 					// 다른 유저 프로젝트 조회
// 					projectList = await projectModel.getProjectListByUserId(Number(query.user));
// 				}
// 			}
// 		} else {
// 			projectList = await projectModel.getProjectList();
// 		}

// 		res.status(200).send(resObj.success({ status: 200, data: projectList }));
// 	} catch (err) {
// 		res.status(500).send(resObj.failed({ status: 500, error: err }));
// 	}
// };

// const getProjectListByMe = async (req: express.Request, res: express.Response) => {};

// /**
//  * Get List Count Order By Like
//  */
// const getListOrderByLike = async (req: express.Request, res: express.Response) => {
// 	const { count, order, type } = req.query;
// 	try {
// 		const projectList = await projectModel.getListOrderByLike(
// 			order === "desc" ? true : false,
// 			Number(count),
// 			type === "week" ? "WEEK" : "MONTH"
// 		);

// 		res.status(200).send(resObj.success({ status: 200, data: projectList }));
// 	} catch (err) {
// 		res.status(500).send(resObj.failed({ status: 500, error: err }));
// 	}
// };

// /**
//  * Get Project By Id
//  */
// const getProject = async (req: express.Request, res: express.Response) => {
// 	const { id } = req.params;
// 	const headers = req.headers;

// 	try {
// 		const result = await projectModel.getProjectById(Number(id));
// 		let isLike = false; // 내가 좋아요 한 프로젝트인지 여부

// 		if (headers.authorization) {
// 			// 토큰이 있는 경우에만 체크하고 그게 아닌 경우에는 isLike는 false
// 			const auth = await getUserByToken(headers.authorization);
// 			if (auth.result && result.id) {
// 				const like = await projectModel.getLikeMine(result!.id, auth.user!.id);

// 				if (like) {
// 					isLike = true;
// 				}
// 			}
// 		}
// 		res.status(200).send(resObj.success({ status: 200, data: { ...result, isLike } }));
// 	} catch (err) {
// 		res.status(500).send(resObj.failed({ status: 500, error: err }));
// 	}
// };

// const addProject = async (req: express.Request, res: express.Response) => {
// 	const { title, intro, content, surveyId, imageId, tags } = req.body;
// 	const { user } = res.locals;

// 	try {
// 		// 프로젝트 추가
// 		const result = await projectModel.addProject({
// 			title,
// 			intro,
// 			content,
// 			surveyId,
// 			imageId,
// 			userId: user.id,
// 		});

// 		const tagIdList: Array<number> = [];

// 		// 태그명을 검색하고 있는 태그명은 바로 연결 / 없는 태그명은 생성 후 연결
// 		tags.forEach(async (tag: string) => {
// 			// 태그 명으로 태그가 있는지 검색
// 			const findTag = await tagModel.getTagByTagName(tag);
// 			if (findTag) {
// 				// 태그가 있다면
// 				tagIdList.push(findTag.id);
// 				// 프로젝트와 태그 연결
// 				tagModel.setProjectToTag(result.id, findTag.id);
// 			} else {
// 				// 태그가 없다면
// 				const newTag = await tagModel.addTag(tag);
// 				tagIdList.push(newTag.id);
// 				// 프로젝트와 태그 연결
// 				tagModel.setProjectToTag(result.id, newTag.id);
// 			}
// 		});

// 		// 모든 처리가 정상적으로 이루어졌다면 201 응답 및 태그 포함 데이터 반환
// 		res.status(201).send(resObj.success({ status: 201, data: { ...result, tags: [...tags] } }));
// 	} catch (err) {
// 		res.status(500).send(resObj.failed({ status: 500, error: err }));
// 	}
// };

// const modifyProject = async (req: express.Request, res: express.Response) => {
// 	const { id } = req.params;
// 	const { title, intro, content, imageId, tags } = req.body;
// 	const { user } = res.locals;

// 	try {
// 		const oldProject = await projectModel.getProjectById(Number(id));
// 		if (user.id === oldProject?.userId) {
// 			// 프로젝트 수정
// 			const result = await projectModel.modifyProject({
// 				id: Number(id),
// 				title,
// 				intro,
// 				content,
// 				imageId,
// 			});

// 			// 태그 수정
// 			tagModel.modifyProjectToTag(Number(id), tags);

// 			const modify = await projectModel.getProjectById(Number(id));
// 			res.status(200).send(resObj.success({ status: 200, data: modify }));
// 		} else {
// 			res.status(403).send(resObj.alert({ status: 403, message: "권한이 없습니다." }));
// 		}
// 	} catch (err) {
// 		res.status(500).send(resObj.failed({ status: 500, error: err }));
// 	}
// };

// const removeProject = async (req: express.Request, res: express.Response) => {
// 	const { id } = req.params;
// 	const { user } = res.locals;

// 	try {
// 		const oldProject = await projectModel.getProjectById(Number(id));

// 		if (user.id === oldProject?.userId) {
// 			// 프로젝트 삭제
// 			const result = await projectModel.removeProject(Number(id));

// 			res.status(200).send(resObj.success({ status: 200, data: result }));
// 		}
// 		res.status(200).send(resObj.success({ status: 200, data: "삭제 실패" }));
// 	} catch (err) {
// 		res.status(500).send(resObj.failed({ status: 500, error: err }));
// 	}
// };

// const like = async (req: express.Request, res: express.Response) => {
// 	const { id } = req.params;
// 	const { user } = res.locals;

// 	try {
// 		const result = await projectModel.changeLike(Number(id), user.id);

// 		res.status(200).send(resObj.success({ status: 200, data: result }));
// 	} catch (err) {
// 		res.status(500).send(resObj.failed({ status: 500, error: err }));
// 	}
// };

// export const projectController = {
// 	getProjectList,
// 	getListOrderByLike,
// 	getProject,
// 	addProject,
// 	modifyProject,
// 	removeProject,
// 	like,
// };
