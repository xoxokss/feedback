import express, { Request, Response } from "express";
import { surveyController } from "@controller/surveyController";
import { authMiddleware } from "~/utils/middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, surveyController.addSurvey);
router.get("/:id", authMiddleware, surveyController.getSurvey);
router.post("/:id", authMiddleware, surveyController.submitSurvey);
router.get("/answer/:id", authMiddleware, surveyController.getSurveyAnswerList);

export default router;
