import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTagListAll = () => {
	return prisma.tag.findMany();
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

export const tagModel = {
	getTagListAll,
	getTagByTagName,
	addTag,
	setProjectToTag,
};
