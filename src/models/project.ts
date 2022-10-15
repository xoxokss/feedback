import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IAddProject {
	title: string;
	intro: string;
	content: string;
	imageId: number;
}

interface IModifyProject {
	id: number;
	title: string;
	intro: string;
	content: string;
	imageId: number;
}

const getProjectList = () => {
	return prisma.project.findMany({
		include: {
			image: true,
		},
	});
};

const getProjectById = (id: number) => {
	return prisma.project.findUnique({
		where: {
			id,
		},
		include: {
			image: true,
		},
	});
};

const addProject = ({ title, intro, content, imageId }: IAddProject) => {
	return prisma.project.create({
		data: {
			title,
			intro,
			content,
			imageId,
		},
	});
};

const modifyProject = async ({
	id,
	title,
	intro,
	content,
	imageId,
}: IModifyProject) => {
	return prisma.project.update({
		where: {
			id,
		},
		data: {
			title,
			intro,
			content,
			imageId,
		},
	});
};

const removeProject = async (id: number) => {
	return prisma.project.delete({
		where: {
			id,
		},
	});
};

export const projectModel = {
	getProjectList,
	getProjectById,
	addProject,
	modifyProject,
	removeProject,
};
