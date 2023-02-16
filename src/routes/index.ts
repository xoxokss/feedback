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

/**
 * @swagger
 * tags:
 *  name: Project
 *  description: 프로젝트 API
 */
router.use("/project", projectRouter);

/**
 * @swagger
 * tags:
 *  name: Tag
 *  description: 태그 API
 */
router.use("/tag", tagRouter);

/**
 * @swagger
 * tags:
 *  name: File
 *  description: 파일 API
 */
router.use("/file", fileRouter);

/**
 * @swagger
 * tags:
 *  name: User
 *  description: 유저 API
 */
router.use("/user", userRouter);

/**
 * @swagger
 * tags:
 *  name: Test
 *  description: 테스트용 API
 */
router.use("/test", testRouter);

/**
 * @swagger
 * tags:
 *  name: Survey
 *  description: 설문 API
 */
router.use("/survey", surveyRouter);

export { router };
