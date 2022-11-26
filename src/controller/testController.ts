import { Request, Response } from "express";
import { resObj } from "@helper/resObj";
import { tagModel } from "~/models/tag";

const testController = {
	test: async (req: Request, res: Response) => {
		const locals = res.locals;
		// console.log(locals);
		try {
			const tags = await tagModel.getTagsByProjectId(5);
			res.status(200).send(resObj.success({ status: 200, data: tags }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	},
};

export default testController;
