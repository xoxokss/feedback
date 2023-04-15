"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fileController_1 = require("@controller/fileController");
var multerMiddleware_1 = __importDefault(require("@middleware/multerMiddleware"));
var authMiddleware_1 = require("@middleware/authMiddleware");
var multerS3_1 = __importDefault(require("@middleware/multerS3"));
var router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, multerMiddleware_1.default.single("file"), fileController_1.fileController.upload);
router.post("/s3", authMiddleware_1.authMiddleware, multerS3_1.default.single("file"), fileController_1.fileController.uploadS3);
exports.default = router;
