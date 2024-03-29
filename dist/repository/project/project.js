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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// model
const project_1 = __importDefault(require("../../models/project"));
class ProjectRepository {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield project_1.default.create(data);
        });
    }
    static update(data, project) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, resume, description, owner, srcImg, mainLang, urlDemo, urlRepository, } = data;
            project.title = title;
            project.resume = resume;
            project.description = description;
            project.owner = owner;
            project.srcImg = srcImg;
            project.mainLang = mainLang;
            project.urlDemo = urlDemo;
            project.urlRepository = urlRepository;
            project.updatedAt = Date.now();
            yield project.save();
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield project_1.default.findById(id).populate({
                path: "owner",
                select: "name _id email"
            });
        });
    }
    static findProjectsByParams({ mainLang = "", title = "", userId = "" }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title)
                return yield project_1.default.findOne({
                    title: title
                }).populate({
                    path: "owner",
                    select: "name _id email"
                });
            ;
            if (mainLang)
                return yield project_1.default.find({
                    mainLang: mainLang
                }).populate({
                    path: "owner",
                    select: "name _id email"
                });
            ;
            if (userId)
                return yield project_1.default.find({
                    owner: userId
                }).populate({
                    path: "owner",
                    select: "name _id email"
                });
            return null;
        });
    }
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield project_1.default.find();
        });
    }
}
exports.default = ProjectRepository;
