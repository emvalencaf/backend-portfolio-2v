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
const section_1 = __importDefault(require("../../models/section"));
class SectionRepository {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield section_1.default.create(data);
        });
    }
    static update(data, section) {
        return __awaiter(this, void 0, void 0, function* () {
            if (section.title === "home") {
                if ((section === null || section === void 0 ? void 0 : section.backgroundImg) && (data === null || data === void 0 ? void 0 : data.backgroundImg))
                    section.backgroundImg = data.backgroundImg;
                if ((section === null || section === void 0 ? void 0 : section.owner) && (data === null || data === void 0 ? void 0 : data.owner))
                    section.owner = data.owner;
                if ((section === null || section === void 0 ? void 0 : section.ocupation) && (data === null || data === void 0 ? void 0 : data.ocupation))
                    section.ocupation = data.ocupation;
                if ((section === null || section === void 0 ? void 0 : section.mainStack) && (data === null || data === void 0 ? void 0 : data.mainStack))
                    section.mainStack = data.mainStack;
            }
            if (section.title === "about") {
                if ((section === null || section === void 0 ? void 0 : section.urlDownload) && (data === null || data === void 0 ? void 0 : data.urlDownload))
                    section.urlDownload = data.urlDownload;
                if ((section === null || section === void 0 ? void 0 : section.biosData) && (data === null || data === void 0 ? void 0 : data.biosData))
                    section.biosData = data.biosData;
                if ((section === null || section === void 0 ? void 0 : section.workData) && (data === null || data === void 0 ? void 0 : data.workData))
                    section.workData = data.workData;
                if ((section === null || section === void 0 ? void 0 : section.educationData) && (data === null || data === void 0 ? void 0 : data.educationData))
                    section.educationData = data.educationData;
            }
            if (section.title === "skills") {
                if ((section === null || section === void 0 ? void 0 : section.techs) && (data === null || data === void 0 ? void 0 : data.techs))
                    section.techs = data.techs;
            }
            if (section.title === "projects") {
                if ((section === null || section === void 0 ? void 0 : section.projects) && (data === null || data === void 0 ? void 0 : data.rojects))
                    section.projects = data.projects;
            }
            if (section.title !== "projects" && section.title !== "about" && section.title !== "home" && section.title !== "skills") {
                if ((section === null || section === void 0 ? void 0 : section.children) && (data === null || data === void 0 ? void 0 : data.children))
                    section.children = data.children;
            }
            section.updatedAt = Date.now();
            section.save();
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield section_1.default.findById(id).populate("projects");
        });
    }
    static getAllBySettingsId(settingsId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield section_1.default.find({
                settings: settingsId,
            }).populate("projects");
        });
    }
}
exports.default = SectionRepository;
