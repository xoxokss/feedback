import express from "express";
import { fileController } from "@controller/fileController";
import multerMiddleware from "@middleware/multerMiddleware";
import { authMiddleware } from "~/utils/middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, multerMiddleware.single("file"), fileController.upload);

export default router;
