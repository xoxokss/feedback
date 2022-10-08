"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("@controller/user"));
//import { authMiddleware } from "@middleware/authMiddleware";
var userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post("/signup", user_1.default.signup);
