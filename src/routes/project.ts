import express from "express";
import { projectController } from "@controller/projectController";
import { authMiddleware } from "~/utils/middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/project:
 *    get:
 *      tags: [Project]
 *      summary: 프로젝트 리스트 조회
 *      responses:
 *        200:
 *          description: 프로젝트 리스트 조회 성공
 */
router.get("/", projectController.getList);

/**
 * @swagger
 * paths:
 *  /api/project:
 *    post:
 *      tags: [Project]
 *      summary: 프로젝트 추가
 *      requestBody:
 *        description: 프로젝트를 추가합니다
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  $ref: '#/components/schemas/Project/properties/id'
 *                title:
 *                  type: string
 *                  description: 프로젝트 제목
 *                  content: 내용
 *                intro:
 *                  type: string
 *                  description: 프로젝트 소개
 *                  content: 내용
 *      responses:
 *        200:
 *          description: 프로젝트 리스트 조회 성공
 */
router.post("/", authMiddleware, projectController.add);

router.get("/like", projectController.getListOrderByLike);
router.put("/like/:id", authMiddleware, projectController.like);
router.get("/:id", projectController.getProject);
router.put("/:id", authMiddleware, projectController.modify);
router.delete("/:id", authMiddleware, projectController.remove);

export default router;
