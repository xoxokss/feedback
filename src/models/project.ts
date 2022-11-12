import { PrismaClient, Tag } from "@prisma/client";

const prisma = new PrismaClient();

interface IAddProject {
	title: string;
	intro: string;
	content: string;
	imageId: number;
	userId: number;
}

interface IModifyProject {
	id: number;
	title: string;
	intro: string;
	content: string;
	imageId: number;
}

const getProjectList = () => {
	// 프로젝트 전체조회
	return prisma.project.findMany({
		include: {
			image: true,
			ProjectsOnTags: {
				select: {
					tag: true,
				},
			},
			User: {
				select: {
					nickname: true,
				},
			},
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
			ProjectsOnTags: {
				select: {
					tag: true,
				},
			},
			User: {
				select: {
					nickname: true,
				},
			},
		},
	});
};

const addProject = ({ title, intro, content, imageId, userId }: IAddProject) => {
	return prisma.project.create({
		data: {
			title,
			intro,
			content,
			imageId,
			userId,
		},
	});
};

const modifyProject = async ({ id, title, intro, content, imageId }: IModifyProject) => {
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
	await prisma.projectsOnTags.deleteMany({
		where: {
			projectId: id,
		},
	});

	return await prisma.project.delete({
		where: {
			id,
		},
	});
};

const getLikeMine = (projectId: number, userId: number) => {
	return prisma.projectOnLikes.findUnique({
		where: {
			projectId_userId: {
				projectId,
				userId,
			},
		},
	});
};

const changeLike = async (projectId: number, userId: number) => {
	const like = await getLikeMine(projectId, userId);
	if (like) {
		await prisma.projectOnLikes.delete({
			where: {
				projectId_userId: {
					projectId,
					userId,
				},
			},
		});

		const project = await prisma.project.update({
			where: {
				id: projectId,
			},
			data: {
				likeCount: {
					decrement: 1,
				},
			},
		});

		return {
			likeCount: project.likeCount,
			isLike: false,
		};
	} else {
		await prisma.projectOnLikes.create({
			data: {
				projectId,
				userId,
			},
		});

		const project = await prisma.project.update({
			where: {
				id: projectId,
			},
			data: {
				likeCount: {
					increment: 1,
				},
			},
		});

		return {
			isLike: true,
			likeCount: project.likeCount,
		};
	}
};

export const projectModel = {
	getProjectList,
	getProjectById,
	addProject,
	modifyProject,
	removeProject,
	getLikeMine,
	changeLike,
};
