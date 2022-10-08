import express, { Request, Response } from "express";
import { fileController } from "~/controller/fileController";
import multerMiddleware from "~/utils/middleware/multer";

const router = express.Router();

router.post("/", multerMiddleware.single("file"), fileController.upload);

export default router;
