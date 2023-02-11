"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
;
const sectionScheme = new mongoose_1.default.Schema({
    home: {
        id: { type: String, trim: true, required: true, default: "#" },
        children: { type: String, trim: true, required: true },
        background: { type: Boolean, trim: true, required: false, default: false },
        icon: { type: String, required: false, trim: true, default: "home" },
        backgroundImg: { type: String, required: false, trim: true, default: "" },
        createdAt: { type: Date, required: false, default: Date.now() },
        updatedAt: { type: Date, required: false, default: null },
        owner: { type: String, trim: true, required: true },
        ocupation: { type: String, trim: true, required: true },
        mainStack: [
            { type: String, trim: true, required: true },
        ],
    },
    about: {
        id: { type: String, trim: true, required: true, default: "#about" },
        children: { type: String, trim: true, required: true },
        background: { type: Boolean, trim: true, required: false, default: false },
        icon: { type: String, required: false, trim: true, default: "home" },
        backgroundImg: { type: String, required: false, trim: true, default: "" },
        createdAt: { type: Date, required: false, default: Date.now() },
        updatedAt: { type: Date, required: false, default: null },
        biosData: {
            bios: { type: String, trim: true, required: true, maxlength: 1000 },
            profilePhoto: {
                srcImg: { type: String, trim: true, required: true },
                altText: { type: String, trim: true, required: true },
            }
        },
        workData: {
            workExperience: [
                {
                    employer: { type: String, required: true, trim: true, maxlength: 150 },
                    ocupation: { type: String, required: true, trim: true, },
                    startIn: { type: Date, required: true, },
                    endIn: { type: Date, required: false, default: null },
                    jobDescription: { type: String, required: true, trim: true, },
                    showData: { type: Boolean, trim: true, required: false, default: false },
                }
            ]
        },
        educationData: {
            higherEducation: [
                {
                    title: { type: String, required: true, trim: true, maxlength: 150 },
                    workTime: { type: String || Number, required: true, trim: true, maxlength: 50 },
                    resume: { type: String || Number, required: true, trim: true, maxlength: 250 },
                    startIn: { type: Date, required: true },
                    endIn: { type: Date, required: false, default: null },
                    urlDownload: { type: String, required: true, trim: true },
                }
            ],
            courses: [
                {
                    title: { type: String, required: true, trim: true, maxlength: 150 },
                    workTime: { type: String || Number, required: true, trim: true, maxlength: 50 },
                    resume: { type: String || Number, required: true, trim: true, maxlength: 250 },
                    startIn: { type: Date, required: true },
                    endIn: { type: Date, required: false, default: null },
                    urlDownload: { type: String, required: true, trim: true },
                }
            ]
        }
    },
    skills: {
        id: { type: String, trim: true, required: true, default: "#skills" },
        children: { type: String, trim: true, required: true },
        background: { type: Boolean, trim: true, required: false, default: false },
        icon: { type: String, required: false, trim: true, default: "home" },
        backgroundImg: { type: String, required: false, trim: true, default: "" },
        createdAt: { type: Date, required: false, default: Date.now() },
        updatedAt: { type: Date, required: false, default: null },
        techs: [
            {
                techName: { type: String, trim: true, required: true, maxlength: 50 },
                techDescription: { type: String, trim: true, required: true, maxlength: 1000 },
                icon: { type: String, trim: false, required: true, default: "" },
                showTechDescription: { type: Boolean, trim: true, required: false, default: false },
            }
        ]
    },
    projects: {
        id: { type: String, trim: true, required: true, default: "#projects" },
        children: { type: String, trim: true, required: true },
        background: { type: Boolean, trim: true, required: false, default: false },
        icon: { type: String, required: false, trim: true, default: "home" },
        backgroundImg: { type: String, required: false, trim: true, default: "" },
        createdAt: { type: Date, required: false, default: Date.now() },
        updatedAt: { type: Date, required: false, default: null },
        projects: [
            { type: mongoose_1.default.Types.ObjectId, ref: "Project" }
        ]
    }
});
const SectionModel = mongoose_1.default.model("Sections", sectionScheme);
exports.default = SectionModel;
