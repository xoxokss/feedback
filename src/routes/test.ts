import express, { Request, Response } from "express";
import testController from "~/controller/testController";

const router = express.Router();

router.get("/", testController.test);

export default router;
