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
const CryptPassword_1 = __importDefault(require("../../utils/CryptPassword"));
// utils
class UserRepository {
    // create an user
    static register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate password hash
            try {
                const passwordHash = yield CryptPassword_1.default.encryptPassword(userData.password);
                userData.password = passwordHash;
                return user_1.default.create(userData);
            }
            catch (err) {
                console.log(`[server]: `, err);
            }
        });
    }
    static logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, password } = req.body;
            if (!email && !name)
                return res.status(400).send({
                    message: "error 400: bad request you must sent an email or username"
                });
            if (!password)
                return res.status(400).send({
                    message: "error 400: bad request you must sent a password"
                });
        });
    }
    // get an user by id
    static getById(id) {
        return user_1.default.findById(id).select('-password');
    }
    // get an user by name
    static findUser({ email, name }, showPassword = false) {
        if (email)
            return showPassword ? user_1.default.findOne({ email }) : user_1.default.findOne({ email }).select("-password");
        if (name)
            return showPassword ? user_1.default.findOne({ name }) : user_1.default.findOne({ name }).select("-password");
        return null;
    }
}
exports.default = UserRepository;
