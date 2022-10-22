"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fileController_1 = require("@controller/fileController");
var multerMiddleware_1 = __importDefault(require("@middleware/multerMiddleware"));
var router = express_1.default.Router();
router.post("/", multerMiddleware_1.default.single("file"), fileController_1.fileController.upload);
exports.default = router;
