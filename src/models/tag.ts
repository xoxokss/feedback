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

const modifyProjectToTag = async (id: number, tags: Array<string>) => {
	await prisma.projectsOnTags.deleteMany({
		where: {
			projectId: id,
		},
	});

	const tagIdList: Array<number> = [];
	// 태그명을 검색하고 있는 태그명은 바로 연결 / 없는 태그명은 생성 후 연결
	tags.forEach(async (tagName: string) => {
		// 태그 명으로 태그가 있는지 검색
		const findTag = await tagModel.getTagByTagName(tagName);
		if (findTag) {
			// 태그가 있다면
			tagIdList.push(findTag.id);
			// 프로젝트와 태그 연결
			await prisma.projectsOnTags.create({
				data: {
					projectId: id,
					tagId: findTag.id,
				},
			});
		} else {
			// 태그가 없다면
			const newTag = await tagModel.addTag(tagName);
			tagIdList.push(newTag.id);
			// 프로젝트와 태그 연결
			await prisma.projectsOnTags.create({
				data: {
					projectId: id,
					tagId: newTag.id,
				},
			});
		}
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
