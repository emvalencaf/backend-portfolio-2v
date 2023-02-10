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
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
// enviroment variables
// url
const mongoDBURL = process.env.DB_URL || "";
// db's user credentials
const dbUser = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbURL = `mongodb+srv://${dbUser}:${dbPassword}${mongoDBURL}`;
        const dbConn = yield mongoose_1.default.connect(dbURL);
        console.log(`[server]: connected to MongoDB database.`);
        return dbConn;
    }
    catch (err) {
        console.log(`[server]: there was an error when try to connect with MongoDB database: `, err);
    }
});
exports.default = connectDB;
