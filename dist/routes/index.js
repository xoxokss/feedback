"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var project_1 = __importDefault(require("@routes/project"));
var tag_1 = __importDefault(require("@routes/tag"));
var file_1 = __importDefault(require("@routes/file"));
var user_1 = require("./user");
var router = express_1.default.Router();
exports.router = router;
router.get("/", function (req, res) {
    res.send("api페이지");
});
router.use("/project", project_1.default);
router.use("/tag", tag_1.default);
router.use("/file", file_1.default);
router.use("/user", user_1.userRouter);
