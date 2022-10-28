import { PrismaClient, Tag } from "@prisma/client";

const prisma = new PrismaClient();

const getTagListAll = () => {
	return prisma.tag.findMany();
};

const getTagsByProjectId = async (projectId: number) => {
	const tagList = await prisma.projectsOnTags.findMany({
		where: {
			projectId,
		},
		select: {
			tag: true,
		},
	});
	return tagList.map((tag) => tag.tag);
};

const getTagByTagName = async (tagName: string) => {
	return prisma.tag.findUnique({
		where: {
			name: tagName,
		},
	});
};

const addTag = async (tagName: string) => {
	return prisma.tag.create({
		data: {
			name: tagName,
		},
	});
};

/**
 * projectId에 tagId를 연결합니다.
 */
const setProjectToTag = async (projectId: number, tagId: number) => {
	return await prisma.projectsOnTags.create({
		data: {
			projectId,
			tagId,
		},
	});
};

const modifyProjectToTag = async (id: number, tags: Array<Tag>) => {
	await prisma.projectsOnTags.deleteMany({
		where: {
			projectId: id,
		},
	});

	return await prisma.projectsOnTags.createMany({
		data: tags.map((tag) => ({
			projectId: id,
			tagId: tag.id,
		})),
	});
};

export const tagModel = {
	getTagListAll,
	getTagsByProjectId,
	getTagByTagName,
	addTag,
	setProjectToTag,
	modifyProjectToTag,
};
