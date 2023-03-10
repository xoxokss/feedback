import express from "express";
import { router } from "./routes/index";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { swaggerUi, specs } from "./swagger";
import "dotenv/config";

const app = express();

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
		cookie: { httpOnly: true, secure: false },
	})
);

app.use("/file", express.static("./data/file"));
app.use("/api", router);

app.use("/", (req: express.Request, res: express.Response) => {
	res.send({ message: "없는 주소 건들지 마쇼" });
});

app.use(passport.initialize());
app.use(passport.session());
const kakaopassport = require("./passport/index");
kakaopassport();

app.listen(8000, () => {
	console.log("server start");
});
