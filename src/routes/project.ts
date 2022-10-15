import express, { Request, Response } from "express";
import { projectController } from "@controller/projectController";

const router = express.Router();

router.get("/", projectController.getList);
router.get("/:id", projectController.getProject);
router.post("/", projectController.add);
router.put("/:id", projectController.modify);
router.delete("/:id", projectController.remove);

export default router;
