import express, { Request, Response } from "express";
import { SurveyController } from "@controller/surveyController";
import { authMiddleware } from "~/utils/middleware/authMiddleware";

const router = express.Router();

// 설문지 목록 조회
// router.get("/", authMiddleware, surveyController.getSurveyList);

// 설문 등록
router.post("/", authMiddleware, SurveyController.addSurvey);

// 설문 응답을 위한 설문지 단일 조회
router.get("/:id", authMiddleware, SurveyController.getSurvey);

router.put("/:id", authMiddleware, SurveyController.modifySurvey);

router.delete("/:id", authMiddleware, SurveyController.removeSurvey);

// 설문 응답
// router.post("/:id", authMiddleware, surveyController.submitSurvey);

// 전체 설문 답변 조회
// router.get("/:id/answer", authMiddleware, surveyController.getSurveyAnswerList);

export default router;
