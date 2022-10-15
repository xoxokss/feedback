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

const setProjectToTag = async (tagName: string) => {
	try {
		const tag = getTagByTagName(tagName);
	} catch (err) {}
};

export const tagModel = {
	getTagListAll,
	getTagByTagName,
	addTag,
	setProjectToTag,
};
