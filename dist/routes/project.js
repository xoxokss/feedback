"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var projectController_1 = require("@controller/projectController");
var authMiddleware_1 = require("~/utils/middleware/authMiddleware");
var router = express_1.default.Router();
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
router.get("/", projectController_1.projectController.getList);
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
 *                  example: 제목입니다
 *                intro:
 *                  type: string
 *                  description: 프로젝트 소개
 *                  content: 내용
 *      responses:
 *        200:
 *          description: 프로젝트 리스트 조회 성공
 */
router.post("/", authMiddleware_1.authMiddleware, projectController_1.projectController.add);
router.get("/like", projectController_1.projectController.getListOrderByLike);
router.put("/like/:id", authMiddleware_1.authMiddleware, projectController_1.projectController.like);
router.get("/:id", projectController_1.projectController.getProject);
router.put("/:id", authMiddleware_1.authMiddleware, projectController_1.projectController.modify);
router.delete("/:id", authMiddleware_1.authMiddleware, projectController_1.projectController.remove);
exports.default = router;
