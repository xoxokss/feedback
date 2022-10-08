import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", function (req: Request, res: Response) {
	res.send("api페이지");
});

export default router;
