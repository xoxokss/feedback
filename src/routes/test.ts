import express, { Request, Response } from "express";
import testController from "~/controller/testController";
import { authMiddleware } from "~/utils/middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, testController.test);

export default router;
