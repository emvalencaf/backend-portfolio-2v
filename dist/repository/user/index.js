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
const user_1 = __importDefault(require("../../models/user"));
// utils
const user_2 = __importDefault(require("../../utils/user"));
class UserRepository {
    static register(data) {
        const { username, password, email } = data;
        const newData = {
            username,
            password,
            email
        };
        return user_1.default.create(newData);
    }
    static findOneUser({ email, username, _id }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_id) {
                const user = yield user_1.default.findById(_id);
                return user_2.default.removePassword(user);
            }
            if (email) {
                const user = yield user_1.default.findOne({
                    email: email
                }).exec();
                return user_2.default.removePassword(user);
            }
            if (username) {
                const user = yield user_1.default.findOne({
                    username: username
                }).exec();
                return user_2.default.removePassword(user);
            }
        });
    }
}
exports.default = UserRepository;
