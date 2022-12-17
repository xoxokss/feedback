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
var test_1 = __importDefault(require("@routes/test"));
var user_1 = __importDefault(require("@routes/user"));
var survey_1 = __importDefault(require("@routes/survey"));
var router = express_1.default.Router();
exports.router = router;
router.get("/", function (req, res) {
    res.send("API용 ROUTE");
});
router.use("/project", project_1.default);
router.use("/tag", tag_1.default);
router.use("/file", file_1.default);
router.use("/user", user_1.default);
router.use("/survey", survey_1.default);
router.use("/test", test_1.default);
