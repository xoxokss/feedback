import express, { Request, Response } from "express";
import project from "@routes/project";
import file from "@routes/file";

const router = express.Router();

router.get("/", function (req: Request, res: Response) {
	res.send("api페이지");
});

router.use("/project", project);
router.use("/file", file);

export { router };
