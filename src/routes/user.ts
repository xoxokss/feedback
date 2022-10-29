import express from "express";
import userController from "@controller/userController";
import { authMiddleware } from "@middleware/authMiddleware";
import passport from "passport";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/confirmId", userController.confirmId);
userRouter.post("/confirmNick", userController.confirmNick);
userRouter.get("/me", authMiddleware, userController.userInfo);

export default userRouter;
