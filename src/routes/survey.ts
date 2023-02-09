import express, { Request, Response } from "express";
import { surveyController } from "@controller/surveyController";
import { authMiddleware } from "~/utils/middleware/authMiddleware";

const router = express.Router();

// 설문지 목록 조회
router.get("/", authMiddleware, surveyController.getSurveyList);

// 설문 등록
router.post("/", authMiddleware, surveyController.addSurvey);

// 설문 응답을 위한 설문지 단일 조회
router.get("/:id", authMiddleware, surveyController.getSurvey);

// 설문 응답
router.post("/:id", authMiddleware, surveyController.submitSurvey);

// 전체 설문 답변 조회
router.get("/:id/answer", authMiddleware, surveyController.getSurveyAnswerList);

export default router;
