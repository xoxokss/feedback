"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var user_1 = require("./user");
router.get('/', function (req, res) {
    res.send('api페이지');
});
router.use("/user", [user_1.userRouter]);
exports.default = router;
