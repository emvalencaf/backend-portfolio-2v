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
const CryptPassword_1 = __importDefault(require("../../utils/CryptPassword"));
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
                console.log(`[server]: error: `, err);
                throw new Error();
            }
        });
    }
    // update an user
    static updateUserData(dataUser, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = newData;
            if (name)
                dataUser.name = name;
            if (password)
                dataUser.password = yield CryptPassword_1.default.encryptPassword(password);
            if (email)
                dataUser.email = email;
            yield dataUser.save();
        });
    }
    // get an user by id
    static getById(id, showPassword = false) {
        try {
            return showPassword ? user_1.default.findById(id).populate("projects") : user_1.default.findById(id).select('-password').populate("projects");
        }
        catch (err) {
            console.log(err);
        }
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
