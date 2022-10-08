import express from "express";
import { file } from "@models/file";
import { resObj } from "~/utils/helper/resObj";

const fileController = {
	upload: async (req: express.Request, res: express.Response) => {
		try {
			const result = await file.addFile(req.file as Express.Multer.File);
			res.status(200).send(resObj.success({ status: 200, data: result }));
		} catch (err) {
			res.status(500).send(resObj.failed({ status: 500, error: err }));
		}
	},
};

export { fileController };
