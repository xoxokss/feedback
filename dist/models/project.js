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
exports.projectModel = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var getProjectList = function () { return __awaiter(void 0, void 0, void 0, function () {
    var projects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.project.findMany({
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
                })];
            case 1:
                projects = _a.sent();
                return [2 /*return*/, projects.map(function (project) {
                        var _a;
                        var data = {
                            id: project.id,
                            title: project.title,
                            intro: project.intro,
                            content: project.content,
                            createdAt: project.createdAt,
                            updatedAt: project.updatedAt,
                            userId: project.userId,
                            userNickname: project.User.nickname,
                            imageId: project.imageId,
                            imagePath: (_a = project.image) === null || _a === void 0 ? void 0 : _a.filePath,
                            tags: project.ProjectsOnTags.map(function (projectOnTag) { return projectOnTag.tag.name; }),
                        };
                        return data;
                    })];
        }
    });
}); };
var getProjectListByUserId = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var projects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.project.findMany({
                    where: {
                        userId: userId,
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
                })];
            case 1:
                projects = _a.sent();
                return [2 /*return*/, projects.map(function (project) {
                        var _a;
                        var data = {
                            id: project.id,
                            title: project.title,
                            intro: project.intro,
                            content: project.content,
                            createdAt: project.createdAt,
                            updatedAt: project.updatedAt,
                            userId: project.userId,
                            userNickname: project.User.nickname,
                            imageId: project.imageId,
                            imagePath: (_a = project.image) === null || _a === void 0 ? void 0 : _a.filePath,
                            tags: project.ProjectsOnTags.map(function (projectOnTag) { return projectOnTag.tag.name; }),
                        };
                        return data;
                    })];
        }
    });
}); };
var getProjectById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var project;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, prisma.project.findUnique({
                    where: {
                        id: id,
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
                })];
            case 1:
                project = _b.sent();
                return [2 /*return*/, {
                        id: project === null || project === void 0 ? void 0 : project.id,
                        title: project === null || project === void 0 ? void 0 : project.title,
                        intro: project === null || project === void 0 ? void 0 : project.intro,
                        content: project === null || project === void 0 ? void 0 : project.content,
                        createdAt: project === null || project === void 0 ? void 0 : project.createdAt,
                        updatedAt: project === null || project === void 0 ? void 0 : project.updatedAt,
                        userId: project === null || project === void 0 ? void 0 : project.userId,
                        userNickname: project === null || project === void 0 ? void 0 : project.User.nickname,
                        imageId: project === null || project === void 0 ? void 0 : project.imageId,
                        imagePath: (_a = project === null || project === void 0 ? void 0 : project.image) === null || _a === void 0 ? void 0 : _a.filePath,
                        tags: project === null || project === void 0 ? void 0 : project.ProjectsOnTags.map(function (projectOnTag) { return projectOnTag.tag.name; }),
                    }];
        }
    });
}); };
var addProject = function (_a) {
    var title = _a.title, intro = _a.intro, content = _a.content, surveyId = _a.surveyId, imageId = _a.imageId, userId = _a.userId;
    return prisma.project.create({
        data: {
            title: title,
            intro: intro,
            content: content,
            surveyId: surveyId,
            imageId: imageId,
            userId: userId,
        },
    });
};
var modifyProject = function (_a) {
    var id = _a.id, title = _a.title, intro = _a.intro, content = _a.content, imageId = _a.imageId;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, prisma.project.update({
                    where: {
                        id: id,
                    },
                    data: {
                        title: title,
                        intro: intro,
                        content: content,
                        imageId: imageId,
                    },
                })];
        });
    });
};
var removeProject = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.projectsOnTags.deleteMany({
                    where: {
                        projectId: id,
                    },
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.project.delete({
                        where: {
                            id: id,
                        },
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getLikeMine = function (projectId, userId) {
    return prisma.projectOnLikes.findUnique({
        where: {
            projectId_userId: {
                projectId: projectId,
                userId: userId,
            },
        },
    });
};
var changeLike = function (projectId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var like, project, project;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getLikeMine(projectId, userId)];
            case 1:
                like = _a.sent();
                if (!like) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma.projectOnLikes.delete({
                        where: {
                            projectId_userId: {
                                projectId: projectId,
                                userId: userId,
                            },
                        },
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, prisma.project.update({
                        where: {
                            id: projectId,
                        },
                        data: {
                            likeCount: {
                                decrement: 1,
                            },
                        },
                    })];
            case 3:
                project = _a.sent();
                return [2 /*return*/, {
                        likeCount: project.likeCount,
                        isLike: false,
                    }];
            case 4: return [4 /*yield*/, prisma.projectOnLikes.create({
                    data: {
                        projectId: projectId,
                        userId: userId,
                    },
                })];
            case 5:
                _a.sent();
                return [4 /*yield*/, prisma.project.update({
                        where: {
                            id: projectId,
                        },
                        data: {
                            likeCount: {
                                increment: 1,
                            },
                        },
                    })];
            case 6:
                project = _a.sent();
                return [2 /*return*/, {
                        isLike: true,
                        likeCount: project.likeCount,
                    }];
        }
    });
}); };
var getListOrderByLike = function (sort, count, type) { return __awaiter(void 0, void 0, void 0, function () {
    var day, date, minDate, maxDate, projects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                day = 0;
                if (type === "WEEK") {
                    day = 7;
                }
                else if (type === "MONTH") {
                    day = 30;
                }
                date = new Date();
                minDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
                maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + day);
                return [4 /*yield*/, prisma.project.findMany({
                        take: count,
                        where: {
                            // createdAt find
                            createdAt: {
                                gt: new Date("".concat(minDate.getFullYear(), "-").concat(minDate.getMonth() + 1, "-").concat(minDate.getDate())),
                                lt: new Date("".concat(maxDate.getFullYear(), "-").concat(maxDate.getMonth() + 1, "-").concat(maxDate.getDate())),
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
                    })];
            case 1:
                projects = _a.sent();
                return [2 /*return*/, projects.map(function (project) {
                        var _a;
                        var data = {
                            id: project.id,
                            title: project.title,
                            intro: project.intro,
                            content: project.content,
                            createdAt: project.createdAt,
                            updatedAt: project.updatedAt,
                            userId: project.userId,
                            userNickname: project.User.nickname,
                            imageId: project.imageId,
                            imagePath: (_a = project.image) === null || _a === void 0 ? void 0 : _a.filePath,
                            tags: project.ProjectsOnTags.map(function (projectOnTag) { return projectOnTag.tag.name; }),
                            likeCount: project.likeCount,
                        };
                        return data;
                    })];
        }
    });
}); };
exports.projectModel = {
    getProjectList: getProjectList,
    getProjectListByUserId: getProjectListByUserId,
    getProjectById: getProjectById,
    addProject: addProject,
    modifyProject: modifyProject,
    removeProject: removeProject,
    getLikeMine: getLikeMine,
    changeLike: changeLike,
    getListOrderByLike: getListOrderByLike,
};
