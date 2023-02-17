import { PrismaClient, Tag } from "@prisma/client";

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *          description: 프로젝트 아이디
 *          example: 10
 */

const prisma = new PrismaClient();

interface IModifyProject {
	id: number;
	title: string;
	intro: string;
	content: string;
	imageId: number;
}

const getProjectList = async () => {
	// 프로젝트 전체조회
	const projects = await prisma.project.findMany({
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

	return projects.map((project) => {
		const data = {
			id: project.id,
			title: project.title,
			intro: project.intro,
			content: project.content,
			createdAt: project.createdAt,
			updatedAt: project.updatedAt,
			userId: project.userId,
			userNickname: project.User.nickname,
			imageId: project.imageId,
			imagePath: project.image?.filePath,
			tags: project.ProjectsOnTags.map((projectOnTag) => projectOnTag.tag.name),
		};

		return data;
	});
};

const getProjectListByUserId = async (userId: number) => {
	// 프로젝트 유저 아이디로 조회
	const projects = await prisma.project.findMany({
		where: {
			userId,
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

	return projects.map((project) => {
		const data = {
			id: project.id,
			title: project.title,
			intro: project.intro,
			content: project.content,
			createdAt: project.createdAt,
			updatedAt: project.updatedAt,
			userId: project.userId,
			userNickname: project.User.nickname,
			imageId: project.imageId,
			imagePath: project.image?.filePath,
			tags: project.ProjectsOnTags.map((projectOnTag) => projectOnTag.tag.name),
		};

		return data;
	});
};

const getProjectById = async (id: number) => {
	const project = await prisma.project.findUnique({
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

	return {
		id: project?.id,
		title: project?.title,
		intro: project?.intro,
		content: project?.content,
		createdAt: project?.createdAt,
		updatedAt: project?.updatedAt,
		userId: project?.userId,
		userNickname: project?.User.nickname,
		imageId: project?.imageId,
		imagePath: project?.image?.filePath,
		tags: project?.ProjectsOnTags.map((projectOnTag) => projectOnTag.tag.name),
	};
};

interface IAddProject {
	title: string;
	intro: string;
	content: string;
	imageId: number;
	userId: number;
	surveyId: number;
}

const addProject = ({ title, intro, content, surveyId, imageId, userId }: IAddProject) => {
	return prisma.project.create({
		data: {
			title,
			intro,
			content,
			surveyId,
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

const getListOrderByLike = async (sort: boolean, count: number, type: string) => {
	let day = 0;
	if (type === "WEEK") {
		day = 7;
	} else if (type === "MONTH") {
		day = 30;
	}
	const date = new Date();
	const minDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
	const maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + day);

	const projects = await prisma.project.findMany({
		take: count,
		where: {
			// createdAt find
			createdAt: {
				gt: new Date(`${minDate.getFullYear()}-${minDate.getMonth() + 1}-${minDate.getDate()}`),
				lt: new Date(`${maxDate.getFullYear()}-${maxDate.getMonth() + 1}-${maxDate.getDate()}`),
			},
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
		orderBy: {
			likeCount: sort ? "desc" : "asc",
		},
	});

	return projects.map((project) => {
		const data = {
			id: project.id,
			title: project.title,
			intro: project.intro,
			content: project.content,
			createdAt: project.createdAt,
			updatedAt: project.updatedAt,
			userId: project.userId,
			userNickname: project.User.nickname,
			imageId: project.imageId,
			imagePath: project.image?.filePath,
			tags: project.ProjectsOnTags.map((projectOnTag) => projectOnTag.tag.name),
			likeCount: project.likeCount,
		};

		return data;
	});
};

export const projectModel = {
	getProjectList,
	getProjectListByUserId,
	getProjectById,
	addProject,
	modifyProject,
	removeProject,
	getLikeMine,
	changeLike,
	getListOrderByLike,
};
