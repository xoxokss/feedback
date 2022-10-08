import express, { Request, Response } from "express";
import project from "@routes/project";

const router = express.Router();

router.get("/", function (req: Request, res: Response) {
	res.send("api페이지");
});

router.use("/project", project);

export { router };
