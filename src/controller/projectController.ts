import express from "express";
import { projectModel } from "@models/project";
import { resObj } from "~/utils/helper/resObj";
import { tagModel } from "~/models/tag";

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

	const tagIdList = tags.map(async (tag: string) => {
		const findTag = await tagModel.getTagByTagName(tag);
		if (findTag) {
			return findTag.id;
		} else {
			return null;
		}
	});

	tagIdList.map(async (v: string) => {
		console.log(await v);
	});

	try {
		// const result = await projectModel.addProject({
		// 	title,
		// 	intro,
		// 	content,
		// 	imageId,
		// });
		res.status(200).send(resObj.success({ status: 200, data: null }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

const modify = async (req: express.Request, res: express.Response) => {
	const { id } = req.params;
	const { title, intro, content, imageId } = req.body;

	try {
		const result = await projectModel.modifyProject({
			id: Number(id),
			title,
			intro,
			content,
			imageId,
		});
		res.status(200).send(resObj.success({ status: 200, data: result }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

const remove = async (req: express.Request, res: express.Response) => {
	const { id } = req.params;

	try {
		const result = await projectModel.removeProject(Number(id));
		res.status(200).send(resObj.success({ status: 200, data: result }));
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
