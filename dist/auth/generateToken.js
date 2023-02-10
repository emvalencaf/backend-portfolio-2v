"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// AUTH
const jwtSecret = process.env.JWT_SECRET || "";
// generate users token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};
exports.default = generateToken;
