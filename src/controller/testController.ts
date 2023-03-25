import { Request, Response } from "express";
import { resObj } from "@helper/resObj";

const testController = {
	test: async (req: Request, res: Response) => {
		try {
			res.status(200).send(resObj.success({ status: 200, data: "test" }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	},
};

export default testController;
