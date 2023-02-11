"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const settingsScheme = new mongoose_1.default.Schema({
    websiteName: { type: String, required: true, trim: true, maxlength: 50 },
    owner: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    favIcon: { type: String, requried: true, trim: true },
    logo: {
        srcImg: {
            type: String, required: false, trim: true, default: ""
        },
        altText: {
            type: String, required: true, trim: true
        },
        link: {
            type: String, required: true, trim: true
        },
        newTab: {
            type: Boolean, required: false, default: false
        },
    },
    menu: [
        {
            link: {
                type: String, required: true, trim: true
            },
            icon: {
                type: String, required: true, trim: true
            },
            children: {
                type: String, required: true, trim: true, maxlength: 50
            },
            newTab: {
                type: Boolean, required: false, default: false
            },
        }
    ],
    createdAt: { type: Date, required: false, default: Date.now() },
    updatedAt: { type: Date, required: false, defualt: null },
});
const SettingsModel = mongoose_1.default.model("Settings", settingsScheme);
exports.default = SettingsModel;
