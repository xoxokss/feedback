import express from "express";
import UserController from "@controller/userController";

//import { authMiddleware } from "@middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post("/signup", UserController.signup)

export { userRouter } ;