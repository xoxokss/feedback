import express, { Request, Response } from "express";
import { fileController } from "@controller/fileController";
import multerMiddleware from "@middleware/multerMiddleware";

const router = express.Router();

router.post("/", multerMiddleware.single("file"), fileController.upload);

export default router;
