"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userScheme = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    password: {
        type: String,
        reuqired: true,
        trim: true,
        maxlength: 150,
    },
    email: {
        type: String,
        reuqired: true,
        trim: true,
        maxlength: 50,
    },
    createdAt: {
        type: Date,
        reuqired: false,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        reuqired: false,
    }
});
const PortfolioModel = mongoose_1.default.model("User", userScheme);
exports.default = PortfolioModel;
