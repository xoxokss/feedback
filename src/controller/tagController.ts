import { Request, Response } from "express";
import { tagModel } from "@models/tag";
import { resObj } from "@helper/resObj";

const getList = async (req: Request, res: Response) => {
	try {
		const tagList = await tagModel.getTagListAll();
		res.status(200).send(resObj.success({ status: 200, data: tagList }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

const getTag = async (req: Request, res: Response) => {
	const tagName = req.params.tagName;
	try {
		const tag = await tagModel.getTagByTagName(tagName);
		res.status(200).send(resObj.success({ status: 200, data: tag }));
	} catch (err) {
		res.status(500).send(resObj.failed({ status: 500, error: err }));
	}
};

export const tagController = {
	getList,
	getTag,
};
