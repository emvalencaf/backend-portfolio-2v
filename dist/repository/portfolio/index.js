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
// models
const portfolio_1 = __importDefault(require("../../models/portfolio"));
class PortfolioRepository {
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id)
                return yield portfolio_1.default.findById(id).populate("owner");
            return yield portfolio_1.default.find({}).populate("owner");
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield portfolio_1.default.create(data);
        });
    }
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield portfolio_1.default.find({}).populate([
                {
                    path: "settings",
                    model: "Settings",
                    populate: {
                        path: "owner",
                        model: "User",
                        select: "name _id email",
                    }
                },
                {
                    path: "content",
                    populate: {
                        path: "sections",
                        model: "Section",
                        populate: {
                            path: "projects",
                            model: "Project",
                            select: "_id resume description mainLang srcImg urlDemo urlRepository title",
                        }
                    }
                }
            ]);
        });
    }
}
exports.default = PortfolioRepository;
