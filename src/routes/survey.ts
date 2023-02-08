import express, { Request, Response } from "express";
import { surveyController } from "@controller/surveyController";
import { authMiddleware } from "~/utils/middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, surveyController.addSurvey);
router.get("/:id", authMiddleware, surveyController.getSurvey);
router.post("/:id", authMiddleware, surveyController.submitSurvey);

// 전체 설문 답변지 목록
router.get("/:id/users", authMiddleware, surveyController.getSurveyAnswerUserList);

// 전체 설문 답변 조회
router.get("/:id/answer", authMiddleware, surveyController.getSurveyAnswerList);

export default router;
