"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileModel = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
exports.fileModel = {
    addFile: function (file) {
        return prisma.file.create({
            data: {
                // fileName: file.originalname,
                fileName: file.filename,
                filePath: file.path,
                fileSize: file.size,
                fileType: file.mimetype,
            },
        });
    },
    addFileS3: function (file) {
        return prisma.file.create({
            data: {
                fileName: file.key,
                filePath: file.location,
                fileSize: file.size,
                fileType: file.contentType,
            },
        });
    }
};
