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
const settings_1 = __importDefault(require("../../models/settings"));
class SettingsRepository {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield settings_1.default.create(data);
        });
    }
    static update(data, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            settings.favIcon = data.favIcon;
            settings.websiteName = data.websiteName;
            settings.logo = data.logo;
            settings.socialMedia = data.socialMedia;
            yield settings.save();
        });
    }
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield settings_1.default.find({}).populate({
                path: "owner",
                model: "User",
                select: "name _id email",
            });
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield settings_1.default.findById(id).populate({
                path: "owner",
                model: "User",
                select: "name _id email",
            });
        });
    }
}
exports.default = SettingsRepository;
