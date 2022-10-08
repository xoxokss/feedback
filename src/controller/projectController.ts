import express from "express";
import { project } from "@models/project";
import { resObj } from "~/utils/helper/resObj";

const projectController = {
	getList: async (req: express.Request, res: express.Response) => {
		try {
			const projectList = await project.getProjectList();
			res.status(200).send(resObj.success({ status: 200, data: projectList }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	},
	add: async (req: express.Request, res: express.Response) => {
		const { title, intro, content, imageId } = req.body;

		try {
			const result = await project.addProject({
				title,
				intro,
				content,
				imageId,
			});
			res.status(200).send(resObj.success({ status: 200, data: result }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	},
};

export { projectController };
