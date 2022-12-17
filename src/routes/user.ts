import express from "express";
import userController from "@controller/userController";
import { authMiddleware } from "@middleware/authMiddleware";
import { resObj } from "~/utils/helper/resObj";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/me", authMiddleware, userController.userInfo);
userRouter.get("/feedback/rank", (req, res) => {
	res.send(
		resObj.success({
			status: 200,
			data: [
				{
					rank: 1,
					cost: 97,
					username: "테스트1",
				},
				{
					rank: 2,
					cost: 44,
					username: "테스트2",
				},
				{
					rank: 3,
					cost: 22,
					username: "테스트3",
				},
				{
					rank: 4,
					cost: 14,
					username: "테스트4",
				},
				{
					rank: 5,
					cost: 5,
					username: "테스트5",
				},
			],
		})
	);
});

export default userRouter;
