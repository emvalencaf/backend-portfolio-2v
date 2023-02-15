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
        sections: { type: mongoose_1.default.Types.ObjectId, ref: "Sections" },
    },
    createdAt: { type: Date, required: false, default: Date.now() },
    updatedAt: { type: Date, required: false, defualt: null },
});
const PortfolioModel = mongoose_1.default.model("Portfolio", portfolioScheme);
exports.default = PortfolioModel;
