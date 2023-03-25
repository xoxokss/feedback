import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fileModel = {
	addFile: (file: Express.Multer.File) => {
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
	addFileS3: (file: Express.MulterS3.File) => {
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
