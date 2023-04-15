"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var project_1 = __importDefault(require("@routes/project"));
// import tagRouter from "@routes/tag";
var file_1 = __importDefault(require("@routes/file"));
var test_1 = __importDefault(require("@routes/test"));
var user_1 = __importDefault(require("@routes/user"));
var survey_1 = __importDefault(require("@routes/survey"));
var answer_1 = __importDefault(require("@routes/answer"));
var router = express_1.default.Router();
exports.router = router;
router.get("/", function (req, res) {
    res.send("API용 ROUTE");
});
/**
 * @swagger
 * tags:
 *  name: Project
 *  description: 프로젝트 API
 */
router.use("/project", project_1.default);
/**
 * @swagger
 * tags:
 *  name: Tag
 *  description: 태그 API
 */
// router.use("/tag", tagRouter);
/**
 * @swagger
 * tags:
 *  name: File
 *  description: 파일 API
 */
router.use("/file", file_1.default);
/**
 * @swagger
 * tags:
 *  name: User
 *  description: 유저 API
 */
router.use("/user", user_1.default);
/**
 * @swagger
 * tags:
 *  name: Test
 *  description: 테스트용 API
 */
router.use("/test", test_1.default);
/**
 * @swagger
 * tags:
 *  name: Survey
 *  description: 설문 API
 */
router.use("/survey", survey_1.default);
/**
 * @swagger
 * tags:
 *  name: Stat
 *  description: 응답 API
 */
router.use("/answer", answer_1.default);
