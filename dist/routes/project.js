"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var projectController_1 = require("@controller/projectController");
var router = express_1.default.Router();
router.get("/", projectController_1.projectController.getList);
router.post("/", projectController_1.projectController.add);
router.put("/:id", projectController_1.projectController.modify);
router.delete("/:id", projectController_1.projectController.remove);
exports.default = router;
