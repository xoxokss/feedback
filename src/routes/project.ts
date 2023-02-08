import express from "express";
import { projectController } from "@controller/projectController";
import { authMiddleware } from "~/utils/middleware/authMiddleware";

const router = express.Router();

// like
router.get("/like", projectController.getListOrderByLike);
router.put("/like/:id", authMiddleware, projectController.like);
router.get("/", projectController.getList);
router.get("/:id", projectController.getProject);
router.post("/", authMiddleware, projectController.add);
router.put("/:id", authMiddleware, projectController.modify);
router.delete("/:id", authMiddleware, projectController.remove);

export default router;
