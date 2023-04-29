"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ProjectModel = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var ProjectModel = /** @class */ (function () {
    function ProjectModel() {
    }
    ProjectModel.getIsLike = function (userId, projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.like.findFirst({
                            where: {
                                userId: userId,
                                projectId: projectId,
                            },
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result ? true : false];
                }
            });
        });
    };
    ProjectModel.findOneById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var project;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n \t\t\tSELECT\n \t\t\t\tProject.id AS id,\n \t\t\t\tProject.image_id AS imageId,\n \t\t\t\tProject.user_id AS userId,\n \t\t\t\tProject.survey_copy_id AS surveyCopyId,\n \t\t\t\tProject.title,\n \t\t\t\tProject.intro,\n \t\t\t\tProject.content,\n \t\t\t\tProject.like_count AS likeCount,\n \t\t\t\tProject.created_at AS createdAt,\n \t\t\t\tProject.updated_at AS updatedAt,\n        User.nickname AS userNickname,\n\t\t\t\tFile.file_path AS imagePath\n \t\t\tFROM Project\n      INNER JOIN User\n      ON Project.user_id = User.id\n\t\t\tINNER JOIN File\n\t\t\tON Project.image_id = File.id\n\t\t\tWHERE Project.id = ", "\n      ORDER BY Project.id DESC\n\t\t"], ["\n \t\t\tSELECT\n \t\t\t\tProject.id AS id,\n \t\t\t\tProject.image_id AS imageId,\n \t\t\t\tProject.user_id AS userId,\n \t\t\t\tProject.survey_copy_id AS surveyCopyId,\n \t\t\t\tProject.title,\n \t\t\t\tProject.intro,\n \t\t\t\tProject.content,\n \t\t\t\tProject.like_count AS likeCount,\n \t\t\t\tProject.created_at AS createdAt,\n \t\t\t\tProject.updated_at AS updatedAt,\n        User.nickname AS userNickname,\n\t\t\t\tFile.file_path AS imagePath\n \t\t\tFROM Project\n      INNER JOIN User\n      ON Project.user_id = User.id\n\t\t\tINNER JOIN File\n\t\t\tON Project.image_id = File.id\n\t\t\tWHERE Project.id = ", "\n      ORDER BY Project.id DESC\n\t\t"])), id)];
                    case 1:
                        project = _a.sent();
                        return [2 /*return*/, project];
                }
            });
        });
    };
    ProjectModel.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var projects;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.$queryRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n \t\t\tSELECT\n \t\t\t\tProject.id AS id,\n \t\t\t\tProject.image_id AS imageId,\n \t\t\t\tProject.user_id AS userId,\n \t\t\t\tProject.survey_copy_id AS surveyCopyId,\n \t\t\t\tProject.title,\n \t\t\t\tProject.intro,\n \t\t\t\tProject.content,\n \t\t\t\tProject.like_count AS likeCount,\n \t\t\t\tProject.created_at AS createdAt,\n \t\t\t\tProject.updated_at AS updatedAt,\n        User.nickname AS userNickname,\n\t\t\t\tFile.file_path AS imagePath\n \t\t\tFROM Project\n      INNER JOIN User\n      ON Project.user_id = User.id\n\t\t\tINNER JOIN File\n\t\t\tON Project.image_id = File.id\n      ORDER BY Project.id DESC\n      ;\n    "], ["\n \t\t\tSELECT\n \t\t\t\tProject.id AS id,\n \t\t\t\tProject.image_id AS imageId,\n \t\t\t\tProject.user_id AS userId,\n \t\t\t\tProject.survey_copy_id AS surveyCopyId,\n \t\t\t\tProject.title,\n \t\t\t\tProject.intro,\n \t\t\t\tProject.content,\n \t\t\t\tProject.like_count AS likeCount,\n \t\t\t\tProject.created_at AS createdAt,\n \t\t\t\tProject.updated_at AS updatedAt,\n        User.nickname AS userNickname,\n\t\t\t\tFile.file_path AS imagePath\n \t\t\tFROM Project\n      INNER JOIN User\n      ON Project.user_id = User.id\n\t\t\tINNER JOIN File\n\t\t\tON Project.image_id = File.id\n      ORDER BY Project.id DESC\n      ;\n    "])))];
                    case 1:
                        projects = _a.sent();
                        return [4 /*yield*/, Promise.all(projects.map(function (project) { return __awaiter(_this, void 0, void 0, function () {
                                var tags;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, prisma.$queryRaw(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\t\t\tSELECT name\n\t\t\t\tFROM Tag\n\t\t\t\tWHERE project_id = ", "\n\t\t\t"], ["\n\t\t\t\tSELECT name\n\t\t\t\tFROM Tag\n\t\t\t\tWHERE project_id = ", "\n\t\t\t"])), project.id)];
                                        case 1:
                                            tags = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, project), { tags: tags.map(function (tag) { return tag.name; }) })];
                                    }
                                });
                            }); }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProjectModel.findAllByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var projects;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.$queryRaw(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\t\t\tSELECT\n \t\t\t\tProject.id AS id,\n \t\t\t\tProject.image_id AS imageId,\n \t\t\t\tProject.user_id AS userId,\n \t\t\t\tProject.survey_copy_id AS surveyCopyId,\n \t\t\t\tProject.title,\n \t\t\t\tProject.intro,\n \t\t\t\tProject.content,\n \t\t\t\tProject.like_count AS likeCount,\n \t\t\t\tProject.created_at AS createdAt,\n \t\t\t\tProject.updated_at AS updatedAt,\n        User.nickname AS userNickname\n\t\t\t\tFile.file_path AS imagePath\n \t\t\tFROM Project\n      INNER JOIN User\n      ON Project.user_id = User.id\n\t\t\tINNER JOIN File\n\t\t\tON Project.image_id = File.id\n\t\t\tWHERE User.id = ", "\n      ORDER BY Project.like_count DESC\n\t\t"], ["\n\t\t\tSELECT\n \t\t\t\tProject.id AS id,\n \t\t\t\tProject.image_id AS imageId,\n \t\t\t\tProject.user_id AS userId,\n \t\t\t\tProject.survey_copy_id AS surveyCopyId,\n \t\t\t\tProject.title,\n \t\t\t\tProject.intro,\n \t\t\t\tProject.content,\n \t\t\t\tProject.like_count AS likeCount,\n \t\t\t\tProject.created_at AS createdAt,\n \t\t\t\tProject.updated_at AS updatedAt,\n        User.nickname AS userNickname\n\t\t\t\tFile.file_path AS imagePath\n \t\t\tFROM Project\n      INNER JOIN User\n      ON Project.user_id = User.id\n\t\t\tINNER JOIN File\n\t\t\tON Project.image_id = File.id\n\t\t\tWHERE User.id = ", "\n      ORDER BY Project.like_count DESC\n\t\t"])), userId)];
                    case 1:
                        projects = _a.sent();
                        return [4 /*yield*/, Promise.all(projects.map(function (project) { return __awaiter(_this, void 0, void 0, function () {
                                var tags;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, prisma.$queryRaw(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\t\t\t\tSELECT name\n\t\t\t\tFROM Tag\n\t\t\t\tWHERE project_id = ", "\n\t\t\t"], ["\n\t\t\t\tSELECT name\n\t\t\t\tFROM Tag\n\t\t\t\tWHERE project_id = ", "\n\t\t\t"])), project.id)];
                                        case 1:
                                            tags = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, project), { tags: tags.map(function (tag) { return tag.name; }) })];
                                    }
                                });
                            }); }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProjectModel.findAllOrderByLike = function (limit) {
        return __awaiter(this, void 0, void 0, function () {
            var projects;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.$queryRaw(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n\t\t\tSELECT\n \t\t\t\tProject.id AS id,\n \t\t\t\tProject.image_id AS imageId,\n \t\t\t\tProject.user_id AS userId,\n \t\t\t\tProject.survey_copy_id AS surveyCopyId,\n \t\t\t\tProject.title,\n \t\t\t\tProject.intro,\n \t\t\t\tProject.content,\n \t\t\t\tProject.like_count AS likeCount,\n \t\t\t\tProject.created_at AS createdAt,\n \t\t\t\tProject.updated_at AS updatedAt,\n        User.nickname AS author,\n\t\t\t\tFile.file_path AS imagePath\n \t\t\tFROM Project\n      INNER JOIN User\n      ON Project.user_id = User.id\n\t\t\tINNER JOIN File\n\t\t\tON Project.image_id = File.id\n      ORDER BY Project.like_count DESC\n\t\t\tLIMIT ", "\n\t\t"], ["\n\t\t\tSELECT\n \t\t\t\tProject.id AS id,\n \t\t\t\tProject.image_id AS imageId,\n \t\t\t\tProject.user_id AS userId,\n \t\t\t\tProject.survey_copy_id AS surveyCopyId,\n \t\t\t\tProject.title,\n \t\t\t\tProject.intro,\n \t\t\t\tProject.content,\n \t\t\t\tProject.like_count AS likeCount,\n \t\t\t\tProject.created_at AS createdAt,\n \t\t\t\tProject.updated_at AS updatedAt,\n        User.nickname AS author,\n\t\t\t\tFile.file_path AS imagePath\n \t\t\tFROM Project\n      INNER JOIN User\n      ON Project.user_id = User.id\n\t\t\tINNER JOIN File\n\t\t\tON Project.image_id = File.id\n      ORDER BY Project.like_count DESC\n\t\t\tLIMIT ", "\n\t\t"])), limit)];
                    case 1:
                        projects = _a.sent();
                        return [4 /*yield*/, Promise.all(projects.map(function (project) { return __awaiter(_this, void 0, void 0, function () {
                                var tags;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, prisma.$queryRaw(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n\t\t\t\tSELECT name\n\t\t\t\tFROM Tag\n\t\t\t\tWHERE project_id = ", "\n\t\t\t"], ["\n\t\t\t\tSELECT name\n\t\t\t\tFROM Tag\n\t\t\t\tWHERE project_id = ", "\n\t\t\t"])), project.id)];
                                        case 1:
                                            tags = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, project), { tags: tags.map(function (tag) { return tag.name; }) })];
                                    }
                                });
                            }); }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProjectModel.add = function (_a, tags) {
        var title = _a.title, intro = _a.intro, content = _a.content, imageId = _a.imageId, userId = _a.userId, surveyCopyId = _a.surveyCopyId;
        return __awaiter(this, void 0, void 0, function () {
            var fileCheck, projectResult_1, tagResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prisma.file.findUnique({
                            where: { id: imageId },
                        })];
                    case 1:
                        fileCheck = _b.sent();
                        if (!fileCheck) return [3 /*break*/, 4];
                        return [4 /*yield*/, prisma.project.create({
                                data: {
                                    title: title,
                                    intro: intro,
                                    content: content,
                                    surveyCopyId: surveyCopyId,
                                    imageId: imageId,
                                    userId: userId,
                                },
                            })];
                    case 2:
                        projectResult_1 = _b.sent();
                        return [4 /*yield*/, prisma.tag.createMany({
                                data: tags.map(function (tag) { return ({ projectId: projectResult_1.id, name: tag }); }),
                            })];
                    case 3:
                        tagResult = _b.sent();
                        return [2 /*return*/, __assign(__assign({}, projectResult_1), { tags: tagResult })];
                    case 4: throw new Error("파일이 존재하지 않습니다.");
                }
            });
        });
    };
    ProjectModel.update = function (id, _a, tags) {
        var title = _a.title, intro = _a.intro, content = _a.content, imageId = _a.imageId, userId = _a.userId, surveyCopyId = _a.surveyCopyId;
        return __awaiter(this, void 0, void 0, function () {
            var oldProject, project, tagInsertResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prisma.project.findUnique({
                            where: { id: id },
                        })];
                    case 1:
                        oldProject = _b.sent();
                        if (!(oldProject === null || oldProject === void 0 ? void 0 : oldProject.surveyCopyId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, prisma.surveyCopy.delete({ where: { id: oldProject.surveyCopyId } })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, prisma.project.update({
                            where: { id: id },
                            data: {
                                title: title,
                                intro: intro,
                                content: content,
                                surveyCopyId: surveyCopyId,
                                imageId: imageId,
                                userId: userId,
                            },
                        })];
                    case 4:
                        project = _b.sent();
                        return [4 /*yield*/, prisma.tag.deleteMany({
                                where: {
                                    projectId: id,
                                },
                            })];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, prisma.tag.createMany({
                                data: tags.map(function (tag) { return ({ projectId: id, name: tag }); }),
                            })];
                    case 6:
                        tagInsertResult = _b.sent();
                        return [2 /*return*/, __assign(__assign({}, project), { tags: tagInsertResult })];
                }
            });
        });
    };
    ProjectModel.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var project, surveyCopyResult, tagResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.delete({
                            where: { id: id },
                        })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, prisma.surveyCopy.delete({
                                where: { id: project.surveyCopyId },
                            })];
                    case 2:
                        surveyCopyResult = _a.sent();
                        return [4 /*yield*/, prisma.tag.deleteMany({
                                where: { projectId: id },
                            })];
                    case 3:
                        tagResult = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, project), { tags: tagResult })];
                }
            });
        });
    };
    ProjectModel.like = function (projectId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var like, project_1, project;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.like.findMany({
                            where: {
                                userId: userId,
                                projectId: projectId,
                            },
                        })];
                    case 1:
                        like = _a.sent();
                        if (!(like.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, prisma.like.deleteMany({
                                where: {
                                    userId: userId,
                                    projectId: projectId,
                                },
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prisma.project.update({
                                where: { id: projectId },
                                data: {
                                    likeCount: {
                                        decrement: 1,
                                    },
                                },
                            })];
                    case 3:
                        project_1 = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, project_1), { isLike: false })];
                    case 4: return [4 /*yield*/, prisma.like.create({
                            data: {
                                userId: userId,
                                projectId: projectId,
                            },
                        })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, prisma.project.update({
                                where: { id: projectId },
                                data: {
                                    likeCount: {
                                        increment: 1,
                                    },
                                },
                            })];
                    case 6:
                        project = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, project), { isLike: true })];
                }
            });
        });
    };
    return ProjectModel;
}());
exports.ProjectModel = ProjectModel;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
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
