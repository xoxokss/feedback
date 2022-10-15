import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fileModel = {
	addFile: (file: Express.Multer.File) => {
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
