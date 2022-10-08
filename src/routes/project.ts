import express, { Request, Response } from "express";
import { projectController } from "@controller/projectController";

const router = express.Router();

router.get("/", projectController.getList);
router.post("/", projectController.add);

export default router;
