import express from "express";
import { fileController } from "@controller/fileController";
import multerMiddleware from "@middleware/multerMiddleware";
import { authMiddleware } from "@middleware/authMiddleware";
import multerS3 from "@middleware/multerS3";

const router = express.Router();

router.post("/", authMiddleware, multerMiddleware.single("file"), fileController.upload);
router.post("/s3", authMiddleware, multerS3.single("file"), fileController.uploadS3);


export default router;
