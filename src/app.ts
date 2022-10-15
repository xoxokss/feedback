import express from "express";
import router  from "@routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/file", express.static("./data/file"));

app.use("/api", router);

app.use("/", (req: express.Request, res: express.Response) => {
	res.send("hello");
});

app.listen(8000, () => {
	console.log("server start");
});
