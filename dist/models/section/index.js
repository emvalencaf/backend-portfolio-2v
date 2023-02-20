"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// type
// subDocuments
const educationSecheme = new mongoose_1.default.Schema({
    title: { type: String, required: true, trim: true, maxlength: 50 },
    institution: { type: String, required: true, trim: true, maxlength: 50 },
    workTime: { type: String || Number, required: true, trim: true, maxlength: 50 },
    resume: { type: String || Number, required: true, trim: true, maxlength: 250 },
    startIn: { type: Date, required: true },
    endIn: { type: Date, required: false, default: null },
    urlDownload: { type: String, required: true, trim: false },
});
const educationDataScheme = new mongoose_1.default.Schema({
    courses: [{
            type: educationSecheme,
            default: () => ({}),
        }],
    higherEducation: [{
            type: educationSecheme,
            default: () => ({}),
        }],
});
const workScheme = new mongoose_1.default.Schema({
    employer: { type: String, required: true, trim: true, maxlength: 50 },
    ocupation: { type: String, required: true, trim: true, maxlength: 50 },
    startIn: { type: Date, required: true, },
    endIn: { type: Date, required: false, default: null },
    jobDescription: { type: String, required: true, trim: true, maxlength: 250 },
    showData: { type: Boolean, trim: true, required: false, default: false },
});
const workDataScheme = new mongoose_1.default.Schema({
    workExperience: [{
            type: workScheme,
            default: () => ({}),
        }],
});
const profilePhotoScheme = new mongoose_1.default.Schema({
    srcImg: { type: String, trim: true, required: true },
    altText: { type: String, trim: true, required: true },
});
const biosDataScheme = new mongoose_1.default.Schema({
    bios: { type: String, trim: true, required: true, maxlength: 1000 },
    profilePhoto: {
        type: profilePhotoScheme,
        default: () => ({}),
        required: true,
    }
});
const techScheme = new mongoose_1.default.Schema({
    techName: { type: String, trim: true, required: true, maxlength: 50 },
    techDescription: { type: String, trim: true, required: true, maxlength: 1000 },
    icon: { type: String, trim: false, required: false, default: "" },
    showTechDescription: { type: Boolean, trim: true, required: false, default: false },
});
const techDataScheme = new mongoose_1.default.Schema({
    techs: { type: [techScheme], default: () => ([]) },
});
const sectionScheme = new mongoose_1.default.Schema({
    title: { type: String, trim: true, required: true, maxlength: 50 },
    children: { type: String, trim: true, required: false },
    background: { type: Boolean, required: false, default: false },
    icon: { type: String, required: false, trim: true, default: "home" },
    backgroundImg: { type: String, required: false, trim: true, default: "" },
    createdAt: { type: Date, required: false, default: Date.now() },
    updatedAt: { type: Date, required: false, default: null },
    biosData: {
        type: biosDataScheme,
        required: false,
    },
    workData: {
        type: workDataScheme,
        required: false,
    },
    owner: { type: "string", trim: true, required: false },
    ocupation: { type: String, trim: true, required: false, maxlength: 50 },
    urlDownload: { type: String, required: false },
    mainStack: { type: [String], required: false },
    educationData: { type: educationDataScheme, required: false },
    techs: {
        type: [{
                type: techScheme, default: () => ({}),
            }], required: false
    },
    projects: {
        type: [mongoose_1.default.Types.ObjectId], ref: "Project", required: false
    },
    settings: {
        type: mongoose_1.default.Types.ObjectId, ref: "Settings", required: true
    },
});
const SectionModel = mongoose_1.default.model("Section", sectionScheme);
exports.default = SectionModel;
