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
 *      description:
 *        프로젝트 리스트 조회입니다.<br/><br/>
 *        - user 파라미터를 넣으면 해당 유저의 프로젝트만 조회합니다.<br/>
 *        - user 파라미터에 0 값을 넣으면 자기 자신의 프로젝트 목록을 조회합니다. <b>(Auth 토큰 필요)</b><br/>
 *        - user 파라미터를 넣지 않으면 전체 프로젝트를 조회합니다.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: user
 *          schema:
 *            type: integer
 *            description: 유저 아이디
 *            example: 0
 *      responses:
 *        200:
 *          description: 프로젝트 리스트 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: 성공여부
 *                    example: true
 *                  status:
 *                    type: number
 *                    description: 상태코드
 *                    example: 200
 *                  data:
 *                    type: array
 *                    description: 응답 데이터
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          $ref: '#/components/schemas/Project/properties/id'
 *                        title:
 *                          type: string
 *                          description: 프로젝트 제목
 *                          content: 내용
 *                          example: 제목입니다
 *
 */
router.get("/", projectController_1.ProjectController.getProjectsAll);
/**
 * @swagger
 * paths:
 *  /api/project:
 *    post:
 *      tags: [Project]
 *      summary: 프로젝트 추가 (로그인 필요)
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
 *          description: 프로젝트 리스트 추가 성공
 */
router.post("/", authMiddleware_1.authMiddleware, projectController_1.ProjectController.addProject);
router.put("/:id", authMiddleware_1.authMiddleware, projectController_1.ProjectController.modifyProject);
router.delete("/:id", authMiddleware_1.authMiddleware, projectController_1.ProjectController.removeProject);
// router.get("/like", projectController.getListOrderByLike);
// router.put("/like/:id", authMiddleware, projectController.like);
// router.get("/:id", projectController.getProject);
exports.default = router;
