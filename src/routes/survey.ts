import express, { Request, Response } from "express";
import { surveyController } from "@controller/surveyController";

const router = express.Router();

router.post("/", surveyController.addSurvey);
router.get("/:id", surveyController.getSurvey);
router.post("/:id", surveyController.submitSurvey);

export default router;
