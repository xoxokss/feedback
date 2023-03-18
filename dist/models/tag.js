"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var TagModel = /** @class */ (function () {
    function TagModel() {
    }
    TagModel.addList = function (tags) {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.tag.createMany({
                            data: tags.list,
                        })];
                    case 1:
                        tag = _a.sent();
                        return [2 /*return*/, tag];
                }
            });
        });
    };
    return TagModel;
}());
exports.TagModel = TagModel;
// export class TagRepositry {
// 	static async findAll(): Promise<TagModel[]> {
// 		const tags = await prisma.tag.findMany();
// 		return tags.map(
// 			(tag) => new TagModel(tag.id, tag.name, tag.projectId, tag.createdAt, tag.updatedAt)
// 		);
// 	}
// }
// const getTagListAll = () => {
// 	return prisma.tag.findMany();
// };
// const getTagsByProjectId = async (projectId: number) => {
// 	const tagList = await prisma.projectsOnTags.findMany({
// 		where: {
// 			projectId,
// 		},
// 		select: {
// 			tag: true,
// 		},
// 	});
// 	return tagList.map((tag) => tag.tag);
// };
// const getTagByTagName = async (tagName: string) => {
// 	return prisma.tag.findUnique({
// 		where: {
// 			name: tagName,
// 		},
// 	});
// };
// const addTag = async (tagName: string) => {
// 	return prisma.tag.create({
// 		data: {
// 			name: tagName,
// 		},
// 	});
// };
// /**
//  * projectId에 tagId를 연결합니다.
//  */
// const setProjectToTag = async (projectId: number, tagId: number) => {
// 	return await prisma.projectsOnTags.create({
// 		data: {
// 			projectId,
// 			tagId,
// 		},
// 	});
// };
// const modifyProjectToTag = async (id: number, tags: Array<string>) => {
// 	await prisma.projectsOnTags.deleteMany({
// 		where: {
// 			projectId: id,
// 		},
// 	});
// 	const tagIdList: Array<number> = [];
// 	// 태그명을 검색하고 있는 태그명은 바로 연결 / 없는 태그명은 생성 후 연결
// 	tags.forEach(async (tagName: string) => {
// 		// 태그 명으로 태그가 있는지 검색
// 		const findTag = await tagModel.getTagByTagName(tagName);
// 		if (findTag) {
// 			// 태그가 있다면
// 			tagIdList.push(findTag.id);
// 			// 프로젝트와 태그 연결
// 			await prisma.projectsOnTags.create({
// 				data: {
// 					projectId: id,
// 					tagId: findTag.id,
// 				},
// 			});
// 		} else {
// 			// 태그가 없다면
// 			const newTag = await tagModel.addTag(tagName);
// 			tagIdList.push(newTag.id);
// 			// 프로젝트와 태그 연결
// 			await prisma.projectsOnTags.create({
// 				data: {
// 					projectId: id,
// 					tagId: newTag.id,
// 				},
// 			});
// 		}
// 	});
// };
// export const tagModel = {
// 	getTagListAll,
// 	getTagsByProjectId,
// 	getTagByTagName,
// 	addTag,
// 	setProjectToTag,
// 	modifyProjectToTag,
// };
