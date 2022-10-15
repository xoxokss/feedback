import express from "express";
import { UserController } from "@controller/userController";
import {authMiddleware} from "../middlewares/authMiddleware"

const userRouter = express.Router();

userRouter.post("/signup", UserController.signup);
userRouter.post("/login", UserController.login);

export { userRouter };
