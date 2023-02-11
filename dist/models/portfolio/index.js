"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const portfolioScheme = new mongoose_1.default.Schema({
    settings: {
        type: mongoose_1.default.Types.ObjectId, ref: "Settings"
    },
    content: {
        main: {
            sections: { type: mongoose_1.default.Types.ObjectId, ref: "Sections" },
            sideBar: {
                githubURL: { type: String, required: false, trim: true, default: "" },
                linkedinURL: { type: String, required: false, trim: true, default: "" },
                sizes: { type: String, required: false, trim: true, default: "medium" }
            },
        },
        footer: {
            instaURL: { type: String, required: false, trim: true, default: "" },
            linkedinURL: { type: String, required: false, trim: true, default: "" },
            facebookURL: { type: String, required: false, trim: true, default: "" },
            homepageURL: { type: String, required: false, trim: true, default: "" },
            twitterURL: { type: String, required: false, trim: true, default: "" },
            githubURL: { type: String, required: false, trim: true, default: "" },
            tiktokURL: { type: String, required: false, trim: true, default: "" },
            year: { type: Date, required: false, default: Date.now() },
            sizes: { type: String, required: false, trim: true, default: "medium" },
            owner: { type: String, required: true, trim: true }
        }
    }
});
const PortfolioModel = mongoose_1.default.model("Portfolio", portfolioScheme);
exports.default = PortfolioModel;
