"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const projectScheme = new mongoose_1.default.Schema({
    title: {
        type: String, required: true, trim: true, maxlength: 50,
    },
    resume: {
        type: String, required: true, trim: true, maxlength: 250,
    },
    description: {
        type: String, required: true, trim: true
    },
    mainLang: {
        type: String, required: true, trim: true
    },
    srcImg: {
        type: String, required: false, trim: true
    },
    urlDemo: {
        type: String, required: true, trim: true
    },
    urlRepository: {
        type: String, required: true, trim: true
    },
    owner: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, required: false, default: Date.now() },
    updatedAt: { type: Date, required: false, default: null },
});
const ProjectModel = mongoose_1.default.model("Project", projectScheme);
exports.default = ProjectModel;
