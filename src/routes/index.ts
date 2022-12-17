import express, { Request, Response } from "express";
import projectRouter from "@routes/project";
import tagRouter from "@routes/tag";
import fileRouter from "@routes/file";
import testRouter from "@routes/test";
import userRouter from "@routes/user";
import surveyRouter from "@routes/survey";

const router = express.Router();

router.get("/", function (req: Request, res: Response) {
	res.send("API용 ROUTE");
});

router.use("/project", projectRouter);
router.use("/tag", tagRouter);
router.use("/file", fileRouter);
router.use("/user", userRouter);
router.use("/survey", surveyRouter);
router.use("/test", testRouter);

export { router };
