import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const project = {
	getProjectList: () => {
		console.log("test");
		return prisma.project.findMany({
			include: {
				image: true,
			},
		});
	},
	getProject: (id: number) => {
		return prisma.project.findUnique({
			where: {
				id,
			},
			include: {
				image: true,
			},
		});
	},
	addProject: ({
		title,
		intro,
		content,
		imageId,
	}: {
		title: string;
		intro: string;
		content: string;
		imageId: number;
	}) => {
		return prisma.project.create({
			data: {
				title,
				intro,
				content,
				imageId,
			},
		});
	},
	modifyProject: async () => {},
	removeProject: async () => {},
};

export { project };
