"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = require("./routes/index");
var cors_1 = __importDefault(require("cors"));
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
var swagger_1 = require("./swagger");
require("dotenv/config");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/api-docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false },
}));
app.use("/file", express_1.default.static("./data/file"));
app.use("/api", index_1.router);
app.use("/", function (req, res) {
    res.send({ message: "없는 주소 건들지 마쇼" });
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
var kakaopassport = require("./passport/index");
kakaopassport();
app.listen(8000, function () {
    console.log("server start");
});
