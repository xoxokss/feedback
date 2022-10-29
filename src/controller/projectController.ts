import express from "express";
import { projectModel } from "@models/project";
import { resObj } from "@helper/resObj";
import { tagModel } from "@models/tag";
import { Tag } from "@prisma/client";

/**
 * Get List All
 */
const getList = async (req: express.Request, res: express.Response) => {
	try {
		const projectList = await projectModel.getProjectList();

		res.status(200).send(resObj.success({ status: 200, data: projectList }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

/**
 * Get Project By Id
 */
const getProject = async (req: express.Request, res: express.Response) => {
	const { id } = req.params;

	try {
		const result = await projectModel.getProjectById(Number(id));
		res.status(200).send(resObj.success({ status: 200, data: result }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

const add = async (req: express.Request, res: express.Response) => {
	const { title, intro, content, imageId, tags } = req.body;
	const { user } = res.locals;

	try {
		// 프로젝트 추가
		const result = await projectModel.addProject({
			title,
			intro,
			content,
			imageId,
			userId: user.id,
		});

		const tagIdList: Array<number> = [];

		// 태그명을 검색하고 있는 태그명은 바로 연결 / 없는 태그명은 생성 후 연결
		tags.forEach(async (tag: string) => {
			// 태그 명으로 태그가 있는지 검색
			const findTag = await tagModel.getTagByTagName(tag);
			if (findTag) {
				// 태그가 있다면
				tagIdList.push(findTag.id);
				// 프로젝트와 태그 연결
				tagModel.setProjectToTag(result.id, findTag.id);
			} else {
				// 태그가 없다면
				const newTag = await tagModel.addTag(tag);
				tagIdList.push(newTag.id);
				// 프로젝트와 태그 연결
				tagModel.setProjectToTag(result.id, newTag.id);
			}
		});

		// 모든 처리가 정상적으로 이루어졌다면 201 응답 및 태그 포함 데이터 반환
		res.status(201).send(resObj.success({ status: 201, data: { ...result, tags: [...tags] } }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

const modify = async (req: express.Request, res: express.Response) => {
	const { id } = req.params;
	const { title, intro, content, imageId, tags } = req.body;
	const { user } = res.locals;

	try {
		const oldProject = await projectModel.getProjectById(Number(id));
		if (user.id === oldProject?.userId) {
			// 프로젝트 수정
			const result = await projectModel.modifyProject({
				id: Number(id),
				title,
				intro,
				content,
				imageId,
			});

			// 태그 수정
			tagModel.modifyProjectToTag(Number(id), tags);

			const modify = await projectModel.getProjectById(Number(id));
			res.status(200).send(resObj.success({ status: 200, data: modify }));
		} else {
			res.status(403).send(resObj.alert({ status: 403, message: "권한이 없습니다." }));
		}
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

const remove = async (req: express.Request, res: express.Response) => {
	const { id } = req.params;
	const { user } = res.locals;

	try {
		const oldProject = await projectModel.getProjectById(Number(id));

		if (user.id === oldProject?.userId) {
			// 프로젝트 삭제
			const result = await projectModel.removeProject(Number(id));

			res.status(200).send(resObj.success({ status: 200, data: result }));
		}
		res.status(200).send(resObj.success({ status: 200, data: "삭제 실패" }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

export const projectController = {
	getList,
	getProject,
	add,
	modify,
	remove,
};
