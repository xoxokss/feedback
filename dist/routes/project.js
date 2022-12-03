"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var projectController_1 = require("@controller/projectController");
var authMiddleware_1 = require("~/utils/middleware/authMiddleware");
var router = express_1.default.Router();
// like
router.get("/like", projectController_1.projectController.getListOrderByLike);
router.put("/like/:id", authMiddleware_1.authMiddleware, projectController_1.projectController.like);
// project
router.get("/", projectController_1.projectController.getList);
router.get("/:id", projectController_1.projectController.getProject);
router.post("/", authMiddleware_1.authMiddleware, projectController_1.projectController.add);
router.put("/:id", authMiddleware_1.authMiddleware, projectController_1.projectController.modify);
router.delete("/:id", authMiddleware_1.authMiddleware, projectController_1.projectController.remove);
exports.default = router;
