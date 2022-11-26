"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = require("./routes/index");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/file", express_1.default.static("./data/file"));
app.use("/api", index_1.router);
app.use("/", function (req, res) {
    res.send({ message: "없는 주소 건들지 마쇼" });
});
app.listen(8000, function () {
    console.log("server start");
});
