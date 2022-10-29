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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
var project_1 = require("@models/project");
var resObj_1 = require("@helper/resObj");
var tag_1 = require("@models/tag");
/**
 * Get List All
 */
var getList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectList, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, project_1.projectModel.getProjectList()];
            case 1:
                projectList = _a.sent();
                res.status(200).send(resObj_1.resObj.success({ status: 200, data: projectList }));
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).send(resObj_1.resObj.failed({ status: 500, error: err_1 }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Get Project By Id
 */
var getProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, project_1.projectModel.getProjectById(Number(id))];
            case 2:
                result = _a.sent();
                res.status(200).send(resObj_1.resObj.success({ status: 200, data: result }));
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(500).send(resObj_1.resObj.failed({ status: 500, error: err_2 }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var add = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, intro, content, imageId, tags, user, result_1, tagIdList_1, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, intro = _a.intro, content = _a.content, imageId = _a.imageId, tags = _a.tags;
                user = res.locals.user;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, project_1.projectModel.addProject({
                        title: title,
                        intro: intro,
                        content: content,
                        imageId: imageId,
                        userId: user.id,
                    })];
            case 2:
                result_1 = _b.sent();
                tagIdList_1 = [];
                // 태그명을 검색하고 있는 태그명은 바로 연결 / 없는 태그명은 생성 후 연결
                tags.forEach(function (tag) { return __awaiter(void 0, void 0, void 0, function () {
                    var findTag, newTag;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, tag_1.tagModel.getTagByTagName(tag)];
                            case 1:
                                findTag = _a.sent();
                                if (!findTag) return [3 /*break*/, 2];
                                // 태그가 있다면
                                tagIdList_1.push(findTag.id);
                                // 프로젝트와 태그 연결
                                tag_1.tagModel.setProjectToTag(result_1.id, findTag.id);
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, tag_1.tagModel.addTag(tag)];
                            case 3:
                                newTag = _a.sent();
                                tagIdList_1.push(newTag.id);
                                // 프로젝트와 태그 연결
                                tag_1.tagModel.setProjectToTag(result_1.id, newTag.id);
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                // 모든 처리가 정상적으로 이루어졌다면 201 응답 및 태그 포함 데이터 반환
                res.status(201).send(resObj_1.resObj.success({ status: 201, data: __assign(__assign({}, result_1), { tags: __spreadArray([], tags, true) }) }));
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                res.status(500).send(resObj_1.resObj.failed({ status: 500, error: err_3 }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var modify = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, intro, content, imageId, tags, result, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, title = _a.title, intro = _a.intro, content = _a.content, imageId = _a.imageId, tags = _a.tags;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, project_1.projectModel.modifyProject({
                        id: Number(id),
                        title: title,
                        intro: intro,
                        content: content,
                        imageId: imageId,
                    })];
            case 2:
                result = _b.sent();
                // 태그 수정
                tag_1.tagModel.modifyProjectToTag(Number(id), tags);
                res.status(200).send(resObj_1.resObj.success({ status: 200, data: result }));
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                res.status(500).send(resObj_1.resObj.failed({ status: 500, error: err_4 }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, project_1.projectModel.removeProject(Number(id))];
            case 2:
                result = _a.sent();
                res.status(200).send(resObj_1.resObj.success({ status: 200, data: result }));
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(500).send(resObj_1.resObj.failed({ status: 500, error: err_5 }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.projectController = {
    getList: getList,
    getProject: getProject,
    add: add,
    modify: modify,
    remove: remove,
};
