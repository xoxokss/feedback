"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var file = {
    addFile: function (file) {
        return prisma.file.create({
            data: {
                FILE_NAME: file.originalname,
                FILE_PATH: file.path,
                FILE_SIZE: file.size,
                FILE_TYPE: file.mimetype,
                FILE_URL: file.path.replace(/\\/gi, "/"),
            },
        });
    },
};
exports.file = file;
