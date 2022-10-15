"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileModel = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
exports.fileModel = {
    addFile: function (file) {
        return prisma.file.create({
            data: {
                fileName: file.originalname,
                filePath: file.path,
                fileSize: file.size,
                fileType: file.mimetype,
            },
        });
    },
};
