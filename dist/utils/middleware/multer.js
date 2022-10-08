"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "data/file/");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + "-" + file.originalname);
    },
});
var multerMiddleware = (0, multer_1.default)({ storage: storage });
exports.default = multerMiddleware;
