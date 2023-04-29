import express from "express";
import { SurveyController } from "@controller/surveyController";
import { authMiddleware } from "~/utils/middleware/authMiddleware";

const router = express.Router();

// 내가 가진 설문지 목록 조회
router.get("/", authMiddleware, SurveyController.getSurveyByUserId);

// 설문 등록
router.post("/", authMiddleware, SurveyController.addSurvey);

// 설문 응답을 위한 설문지 단일 조회
router.get("/:id", authMiddleware, SurveyController.getSurvey);

router.put("/:id", authMiddleware, SurveyController.modifySurvey);

router.delete("/:id", authMiddleware, SurveyController.removeSurvey);

// 설문 응답
router.post("/:id", authMiddleware, SurveyController.submitSurvey);

// 전체 설문 답변 조회
// router.get("/:id/answer", authMiddleware, surveyController.getSurveyAnswerList);

export default router;
