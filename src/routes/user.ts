import express from "express";
import userController from "@controller/userController";
import multerMiddleware from "@middleware/multerMiddleware";
import { authMiddleware } from "@middleware/authMiddleware";
import passport from "passport";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/confirmId", userController.confirmId);
userRouter.post("/confirmNick", userController.confirmNick);
userRouter.get("/me", authMiddleware, userController.userInfo);
userRouter.get("/kakao", passport.authenticate("kakao"));
userRouter.get("/kakao/callback", userController.kakaoLogin);
userRouter.post("/verifyEmail", userController.verifyEmail);
userRouter.delete("/delete", authMiddleware, userController.deleteUser);
userRouter.post(
	"/profileImg",
	multerMiddleware.single("file"),
	authMiddleware,
	userController.UpdateProfileImg
);

export default userRouter;
