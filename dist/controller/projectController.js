"use strict";
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
exports.ProjectController = void 0;
var auth_1 = require("~/utils/helper/auth");
var resObj_1 = require("~/utils/helper/resObj");
var copy_1 = require("~/models/copy");
var project_1 = require("~/models/project");
// /**
//  * Get List All
//  */
var ProjectController = /** @class */ (function () {
    function ProjectController() {
    }
    ProjectController.getProjectsAll = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var query, headers, userId, auth, projects_1, projects, projects, e_1, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = req.query;
                        headers = req.headers;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        userId = query === null || query === void 0 ? void 0 : query.user;
                        if (!userId) return [3 /*break*/, 7];
                        if (!(Number(userId) === 0)) return [3 /*break*/, 5];
                        if (!(headers === null || headers === void 0 ? void 0 : headers.authorization)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, auth_1.getUserByToken)(headers.authorization)];
                    case 2:
                        auth = _b.sent();
                        console.log(auth);
                        return [4 /*yield*/, project_1.ProjectModel.findAllByUserId(Number((_a = auth.user) === null || _a === void 0 ? void 0 : _a.id))];
                    case 3:
                        projects_1 = _b.sent();
                        res.status(200).send(resObj_1.resObj.success({ status: 200, data: projects_1 }));
                        return [2 /*return*/];
                    case 4:
                        res.status(500).send(resObj_1.resObj.failed({
                            status: 500,
                            error: "토큰이 없습니다.",
                        }));
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, project_1.ProjectModel.findAllByUserId(Number(userId))];
                    case 6:
                        projects = _b.sent();
                        res.status(200).send(resObj_1.resObj.success({ status: 200, data: projects }));
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, project_1.ProjectModel.findAll()];
                    case 8:
                        projects = _b.sent();
                        res.status(200).send(resObj_1.resObj.success({ status: 200, data: projects }));
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_1 = _b.sent();
                        error = e_1;
                        console.log(error);
                        res.status(500).send(resObj_1.resObj.failed({ status: 500, error: e_1 }));
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ProjectController.getProjectsOrderByLike = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var projects, e_2, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, project_1.ProjectModel.findAllOrderByLike(10)];
                    case 1:
                        projects = _a.sent();
                        console.log(projects);
                        res.status(200).send(resObj_1.resObj.success({ status: 200, data: projects }));
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        error = e_2;
                        console.log(error);
                        res.status(500).send(resObj_1.resObj.failed({ status: 500, error: e_2 }));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProjectController.getProject = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, headers, auth, project_2, isLike, project, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        headers = req.headers;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        if (!(headers === null || headers === void 0 ? void 0 : headers.authorization)) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, auth_1.getUserByToken)(headers.authorization)];
                    case 2:
                        auth = _b.sent();
                        if (!((_a = auth === null || auth === void 0 ? void 0 : auth.user) === null || _a === void 0 ? void 0 : _a.id)) return [3 /*break*/, 5];
                        return [4 /*yield*/, project_1.ProjectModel.findOneById(Number(id))];
                    case 3:
                        project_2 = _b.sent();
                        return [4 /*yield*/, project_1.ProjectModel.getIsLike(Number(auth.user.id), Number(id))];
                    case 4:
                        isLike = _b.sent();
                        res.status(200).send(resObj_1.resObj.success({ status: 200, data: __assign(__assign({}, project_2[0]), { isLike: isLike }) }));
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, project_1.ProjectModel.findOneById(Number(id))];
                    case 6:
                        project = _b.sent();
                        res.status(201).send(resObj_1.resObj.success({ status: 200, data: project[0] }));
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _b.sent();
                        res.status(500).send(resObj_1.resObj.failed({ status: 500, error: err_1 }));
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ProjectController.addProject = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, intro, content, surveyId, imageId, tags, user, surveyCopy, projectResult, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, intro = _a.intro, content = _a.content, surveyId = _a.surveyId, imageId = _a.imageId, tags = _a.tags;
                        user = res.locals.user;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, copy_1.CopyModel.copySurvey(surveyId, user.id)];
                    case 2:
                        surveyCopy = _b.sent();
                        if (!surveyCopy)
                            throw new Error("Survey Copy Error");
                        return [4 /*yield*/, project_1.ProjectModel.add({
                                title: title,
                                intro: intro,
                                content: content,
                                surveyCopyId: surveyCopy.id,
                                imageId: imageId,
                                userId: user.id,
                            }, tags)];
                    case 3:
                        projectResult = _b.sent();
                        // // 모든 처리가 정상적으로 이루어졌다면 201 응답 및 태그 포함 데이터 반환
                        res.status(201).send(resObj_1.resObj.success({ status: 201, data: projectResult }));
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _b.sent();
                        res.status(500).send(resObj_1.resObj.failed({ status: 500, error: err_2 }));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProjectController.modifyProject = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, title, intro, content, surveyId, imageId, tags, user, surveyCopy, projectResult, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, title = _a.title, intro = _a.intro, content = _a.content, surveyId = _a.surveyId, imageId = _a.imageId, tags = _a.tags;
                        user = res.locals.user;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, copy_1.CopyModel.copySurvey(surveyId, user.id)];
                    case 2:
                        surveyCopy = _b.sent();
                        if (!surveyCopy)
                            throw new Error("Survey Copy Error");
                        return [4 /*yield*/, project_1.ProjectModel.update(Number(id), {
                                title: title,
                                intro: intro,
                                content: content,
                                surveyCopyId: surveyCopy.id,
                                imageId: imageId,
                                userId: user.id,
                            }, tags)];
                    case 3:
                        projectResult = _b.sent();
                        // // 모든 처리가 정상적으로 이루어졌다면 201 응답 및 태그 포함 데이터 반환
                        res.status(201).send(resObj_1.resObj.success({ status: 201, data: projectResult }));
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _b.sent();
                        res.status(500).send(resObj_1.resObj.failed({ status: 500, error: err_3 }));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProjectController.removeProject = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, projectResult, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, project_1.ProjectModel.delete(Number(id))];
                    case 2:
                        projectResult = _a.sent();
                        // // 모든 처리가 정상적으로 이루어졌다면 201 응답 및 태그 포함 데이터 반환
                        res.status(201).send(resObj_1.resObj.success({ status: 201, data: projectResult }));
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        res.status(500).send(resObj_1.resObj.failed({ status: 500, error: err_4 }));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProjectController.likeProject = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, projectResult, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        user = res.locals.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, project_1.ProjectModel.like(Number(id), user.id)];
                    case 2:
                        projectResult = _a.sent();
                        // // 모든 처리가 정상적으로 이루어졌다면 201 응답 및 태그 포함 데이터 반환
                        res.status(201).send(resObj_1.resObj.success({ status: 201, data: projectResult }));
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        res.status(500).send(resObj_1.resObj.failed({ status: 500, error: err_5 }));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProjectController;
}());
exports.ProjectController = ProjectController;
