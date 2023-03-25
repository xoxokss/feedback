import { PrismaClient, Project, Tag } from "@prisma/client";

const prisma = new PrismaClient();

interface ProjectAddParams {
	title: string;
	intro: string;
	content: string;
	imageId: number;
	userId: number;
	surveyCopyId: number;
}

export class ProjectModel {
	static async getIsLike(userId: number, projectId: number) {
		const result = await prisma.like.findFirst({
			where: {
				userId,
				projectId,
			},
		});

		return result ? true : false;
	}

	static async findOneById(id: number) {
		const project = await prisma.$queryRaw<
			{
				id: number;
				imageId: number;
				userId: number;
				surveyCopyId: number;
				title: string;
				intro: string;
				content: string;
				likeCount: number;
				createdAt: Date;
				updatedAt: Date;
				author: string;
			}[]
		>`
 			SELECT
 				Project.id AS id,
 				Project.image_id AS imageId,
 				Project.user_id AS userId,
 				Project.survey_copy_id AS surveyCopyId,
 				Project.title,
 				Project.intro,
 				Project.content,
 				Project.like_count AS likeCount,
 				Project.created_at AS createdAt,
 				Project.updated_at AS updatedAt,
        User.nickname AS userNickname,
				File.file_path AS imagePath
 			FROM Project
      INNER JOIN User
      ON Project.user_id = User.id
			INNER JOIN File
			ON Project.image_id = File.id
			WHERE Project.id = ${id}
      ORDER BY Project.id DESC
		`;

		return project;
	}

	static async findAll() {
		const projects = await prisma.$queryRaw<
			{
				id: number;
				imageId: number;
				userId: number;
				surveyCopyId: number;
				title: string;
				intro: string;
				content: string;
				likeCount: number;
				createdAt: Date;
				updatedAt: Date;
				author: string;
			}[]
		>`
 			SELECT
 				Project.id AS id,
 				Project.image_id AS imageId,
 				Project.user_id AS userId,
 				Project.survey_copy_id AS surveyCopyId,
 				Project.title,
 				Project.intro,
 				Project.content,
 				Project.like_count AS likeCount,
 				Project.created_at AS createdAt,
 				Project.updated_at AS updatedAt,
        User.nickname AS userNickname,
				File.file_path AS imagePath
 			FROM Project
      INNER JOIN User
      ON Project.user_id = User.id
			INNER JOIN File
			ON Project.image_id = File.id
      ORDER BY Project.id DESC
      ;
    `;

		return await Promise.all(
			projects.map(async (project: Project) => {
				const tags = await prisma.$queryRaw<Tag[]>`
				SELECT name
				FROM Tag
				WHERE project_id = ${project.id}
			`;
				return { ...project, tags: tags.map((tag) => tag.name) };
			})
		);
	}

	static async findAllByUserId(userId: number) {
		const projects = await prisma.$queryRaw<
			{
				id: number;
				imageId: number;
				userId: number;
				surveyCopyId: number;
				title: string;
				intro: string;
				content: string;
				likeCount: number;
				createdAt: Date;
				updatedAt: Date;
			}[]
		>`
			SELECT
 				Project.id AS id,
 				Project.image_id AS imageId,
 				Project.user_id AS userId,
 				Project.survey_copy_id AS surveyCopyId,
 				Project.title,
 				Project.intro,
 				Project.content,
 				Project.like_count AS likeCount,
 				Project.created_at AS createdAt,
 				Project.updated_at AS updatedAt,
        User.nickname AS userNickname
				File.file_path AS imagePath
 			FROM Project
      INNER JOIN User
      ON Project.user_id = User.id
			INNER JOIN File
			ON Project.image_id = File.id
			WHERE User.id = ${userId}
      ORDER BY Project.like_count DESC
		`;

		return await Promise.all(
			projects.map(async (project: Project) => {
				const tags = await prisma.$queryRaw<Tag[]>`
				SELECT name
				FROM Tag
				WHERE project_id = ${project.id}
			`;
				return { ...project, tags: tags.map((tag) => tag.name) };
			})
		);
	}

	static async findAllOrderByLike(limit: number) {
		const projects = await prisma.$queryRaw<
			{
				id: number;
				imageId: number;
				userId: number;
				surveyCopyId: number;
				title: string;
				intro: string;
				content: string;
				likeCount: number;
				createdAt: Date;
				updatedAt: Date;
			}[]
		>`
			SELECT
 				Project.id AS id,
 				Project.image_id AS imageId,
 				Project.user_id AS userId,
 				Project.survey_copy_id AS surveyCopyId,
 				Project.title,
 				Project.intro,
 				Project.content,
 				Project.like_count AS likeCount,
 				Project.created_at AS createdAt,
 				Project.updated_at AS updatedAt,
        User.nickname AS author
				File.file_path AS imagePath
 			FROM Project
      INNER JOIN User
      ON Project.user_id = User.id
			INNER JOIN File
			ON Project.image_id = File.id
      ORDER BY Project.like_count DESC
			LIMIT ${limit}
		`;

		return await Promise.all(
			projects.map(async (project: Project) => {
				const tags = await prisma.$queryRaw<Tag[]>`
				SELECT name
				FROM Tag
				WHERE project_id = ${project.id}
			`;
				return { ...project, tags: tags.map((tag) => tag.name) };
			})
		);
	}

	static async add(
		{ title, intro, content, imageId, userId, surveyCopyId }: ProjectAddParams,
		tags: string[]
	) {
		const projectResult = await prisma.project.create({
			data: {
				title,
				intro,
				content,
				surveyCopyId,
				imageId,
				userId,
			},
		});

		// 프로젝트와 연관된 태그 생성
		const tagResult = await prisma.tag.createMany({
			data: tags.map((tag) => ({ projectId: projectResult.id, name: tag })) as Tag[],
		});

		return { ...projectResult, tags: tagResult };
	}

	static async update(
		id: number,
		{ title, intro, content, imageId, userId, surveyCopyId }: ProjectAddParams,
		tags: string[]
	) {
		const oldProject = await prisma.project.findUnique({
			where: { id },
		});

		// 이부분 추후 수정 필요
		if (oldProject?.surveyCopyId) {
			await prisma.surveyCopy.delete({ where: { id: oldProject.surveyCopyId } });
		}

		const project = await prisma.project.update({
			where: { id },
			data: {
				title,
				intro,
				content,
				surveyCopyId,
				imageId,
				userId,
			},
		});

		await prisma.tag.deleteMany({
			where: {
				projectId: id,
			},
		});

		const tagInsertResult = await prisma.tag.createMany({
			data: tags.map((tag) => ({ projectId: id, name: tag })) as Tag[],
		});

		return { ...project, tags: tagInsertResult };
	}

	static async delete(id: number) {
		const project = await prisma.project.delete({
			where: { id },
		});

		const surveyCopyResult = await prisma.surveyCopy.delete({
			where: { id: project.surveyCopyId },
		});

		const tagResult = await prisma.tag.deleteMany({
			where: { projectId: id },
		});

		return { ...project, tags: tagResult };
	}

	static async like(projectId: number, userId: number) {
		const like = await prisma.like.findMany({
			where: {
				userId,
				projectId,
			},
		});

		if (like.length > 0) {
			await prisma.like.deleteMany({
				where: {
					userId,
					projectId,
				},
			});

			const project = await prisma.project.update({
				where: { id: projectId },
				data: {
					likeCount: {
						decrement: 1,
					},
				},
			});

			return { ...project, isLike: false };
		}

		await prisma.like.create({
			data: {
				userId,
				projectId,
			},
		});

		const project = await prisma.project.update({
			where: { id: projectId },
			data: {
				likeCount: {
					increment: 1,
				},
			},
		});

		return { ...project, isLike: true };
	}
}

// const getProjectListByUserId = async (userId: number) => {
// 	// 프로젝트 유저 아이디로 조회
// 	const projects = await prisma.project.findMany({
// 		where: {
// 			userId,
// 		},
// 		include: {
// 			image: true,
// 			ProjectsOnTags: {
// 				select: {
// 					tag: true,
// 				},
// 			},
// 			User: {
// 				select: {
// 					nickname: true,
// 				},
// 			},
// 		},
// 	});

// 	return projects.map((project) => {
// 		const data = {
// 			id: project.id,
// 			title: project.title,
// 			intro: project.intro,
// 			content: project.content,
// 			createdAt: project.createdAt,
// 			updatedAt: project.updatedAt,
// 			userId: project.userId,
// 			userNickname: project.User.nickname,
// 			imageId: project.imageId,
// 			imagePath: project.image?.filePath,
// 			tags: project.ProjectsOnTags.map((projectOnTag) => projectOnTag.tag.name),
// 		};

// 		return data;
// 	});
// };

// const getProjectById = async (id: number) => {
// 	const project = await prisma.project.findUnique({
// 		where: {
// 			id,
// 		},
// 		include: {
// 			image: true,
// 			ProjectsOnTags: {
// 				select: {
// 					tag: true,
// 				},
// 			},
// 			User: {
// 				select: {
// 					nickname: true,
// 				},
// 			},
// 		},
// 	});

// 	return {
// 		id: project?.id,
// 		title: project?.title,
// 		intro: project?.intro,
// 		content: project?.content,
// 		createdAt: project?.createdAt,
// 		updatedAt: project?.updatedAt,
// 		userId: project?.userId,
// 		userNickname: project?.User.nickname,
// 		imageId: project?.imageId,
// 		imagePath: project?.image?.filePath,
// 		tags: project?.ProjectsOnTags.map((projectOnTag) => projectOnTag.tag.name),
// 	};
// };

// interface IAddProject {
// 	title: string;
// 	intro: string;
// 	content: string;
// 	imageId: number;
// 	userId: number;
// 	surveyId: number;
// }

// const addProject = ({ title, intro, content, surveyId, imageId, userId }: IAddProject) => {
// 	return prisma.project.create({
// 		data: {
// 			title,
// 			intro,
// 			content,
// 			surveyId,
// 			imageId,
// 			userId,
// 		},
// 	});
// };

// const modifyProject = async ({ id, title, intro, content, imageId }: IModifyProject) => {
// 	return prisma.project.update({
// 		where: {
// 			id,
// 		},
// 		data: {
// 			title,
// 			intro,
// 			content,
// 			imageId,
// 		},
// 	});
// };

// const removeProject = async (id: number) => {
// 	await prisma.projectsOnTags.deleteMany({
// 		where: {
// 			projectId: id,
// 		},
// 	});

// 	return await prisma.project.delete({
// 		where: {
// 			id,
// 		},
// 	});
// };

// const getLikeMine = (projectId: number, userId: number) => {
// 	return prisma.projectOnLikes.findUnique({
// 		where: {
// 			projectId_userId: {
// 				projectId,
// 				userId,
// 			},
// 		},
// 	});
// };

// const changeLike = async (projectId: number, userId: number) => {
// 	const like = await getLikeMine(projectId, userId);
// 	if (like) {
// 		await prisma.projectOnLikes.delete({
// 			where: {
// 				projectId_userId: {
// 					projectId,
// 					userId,
// 				},
// 			},
// 		});

// 		const project = await prisma.project.update({
// 			where: {
// 				id: projectId,
// 			},
// 			data: {
// 				likeCount: {
// 					decrement: 1,
// 				},
// 			},
// 		});

// 		return {
// 			likeCount: project.likeCount,
// 			isLike: false,
// 		};
// 	} else {
// 		await prisma.projectOnLikes.create({
// 			data: {
// 				projectId,
// 				userId,
// 			},
// 		});

// 		const project = await prisma.project.update({
// 			where: {
// 				id: projectId,
// 			},
// 			data: {
// 				likeCount: {
// 					increment: 1,
// 				},
// 			},
// 		});

// 		return {
// 			isLike: true,
// 			likeCount: project.likeCount,
// 		};
// 	}
// };

// const getListOrderByLike = async (sort: boolean, count: number, type: string) => {
// 	let day = 0;
// 	if (type === "WEEK") {
// 		day = 7;
// 	} else if (type === "MONTH") {
// 		day = 30;
// 	}
// 	const date = new Date();
// 	const minDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
// 	const maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + day);

// 	const projects = await prisma.project.findMany({
// 		take: count,
// 		where: {
// 			// createdAt find
// 			createdAt: {
// 				gt: new Date(`${minDate.getFullYear()}-${minDate.getMonth() + 1}-${minDate.getDate()}`),
// 				lt: new Date(`${maxDate.getFullYear()}-${maxDate.getMonth() + 1}-${maxDate.getDate()}`),
// 			},
// 		},
// 		include: {
// 			image: true,
// 			ProjectsOnTags: {
// 				select: {
// 					tag: true,
// 				},
// 			},
// 			User: {
// 				select: {
// 					nickname: true,
// 				},
// 			},
// 		},
// 		orderBy: {
// 			likeCount: sort ? "desc" : "asc",
// 		},
// 	});

// 	return projects.map((project) => {
// 		const data = {
// 			id: project.id,
// 			title: project.title,
// 			intro: project.intro,
// 			content: project.content,
// 			createdAt: project.createdAt,
// 			updatedAt: project.updatedAt,
// 			userId: project.userId,
// 			userNickname: project.User.nickname,
// 			imageId: project.imageId,
// 			imagePath: project.image?.filePath,
// 			tags: project.ProjectsOnTags.map((projectOnTag) => projectOnTag.tag.name),
// 			likeCount: project.likeCount,
// 		};

// 		return data;
// 	});
// };

// export const projectModel = {
// 	getProjectList,
// 	getProjectListByUserId,
// 	getProjectById,
// 	addProject,
// 	modifyProject,
// 	removeProject,
// 	getLikeMine,
// 	changeLike,
// 	getListOrderByLike,
// };
