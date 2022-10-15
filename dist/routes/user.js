"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var userController_1 = require("@controller/userController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post("/signup", userController_1.UserController.signup);
userRouter.post("/login", userController_1.UserController.login);
userRouter.get("/me", authMiddleware_1.authMiddleware, userController_1.UserController.userInfo);
