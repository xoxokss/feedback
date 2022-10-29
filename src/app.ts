import express from "express";
import { router } from "./routes/index";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/file", express.static("./data/file"));
app.use("/api", router);

app.use("/", (req: express.Request, res: express.Response) => {
	res.send({ message: "없는 주소 건들지 마쇼" });
});

app.listen(8000, () => {
	console.log("server start");
});
