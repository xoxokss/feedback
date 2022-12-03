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
userRouter.get("/kakao", passport.authenticate("kakao"));
//userRouter.get("/kakao/callback", userController.kakaoLogin);
userRouter.get("/kakao/callback", passport.authenticate("kakao", {
  failureRedirect: "/",
}), (req,res) => {
  res.redirect("/api");
});

export default userRouter;
