import express from "express";
import { authMiddleware } from "~/utils/middleware/authMiddleware";
import { answerController } from "~/controller/answerController";

const router = express.Router();

// 설문 응답 목록 조회
router.get("/:id", authMiddleware, answerController.getAnswerList);
router.get("/user/:id", authMiddleware, answerController.getAnswerUser);

// 설문 통계 조회

export default router;
