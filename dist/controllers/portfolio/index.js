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
// repository
const portfolio_1 = __importDefault(require("../../repository/portfolio"));
// controllers
const section_1 = __importDefault(require("../section"));
const settings_1 = __importDefault(require("../settings"));
class PortfolioController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const portfolios = yield PortfolioController.find();
                if (portfolios.length >= 1)
                    return res.status(409).send({
                        message: "there's already one portfolio in the database",
                    });
                const { settingsId } = req.body;
                const settings = yield settings_1.default.getById(settingsId);
                if (!settings)
                    return res.status(404).send({
                        message: "no settings were found it",
                    });
                const sections = yield section_1.default.getAllBySettingId(settingsId);
                if (sections.length === 0)
                    return res.status(404).send({
                        message: "no sections were found it attached to this settings",
                    });
                const data = {
                    settings,
                    content: {
                        sections: sections,
                    },
                };
                const portfolio = yield portfolio_1.default.create(data);
                return res.status(201).send({
                    portfolio,
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).send({
                    message: "internal error"
                });
            }
        });
    }
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield portfolio_1.default.find();
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const portfolios = yield PortfolioController.find();
                if (portfolios.length === 0)
                    return res.status(404).send({
                        message: "no portfolio were found it",
                    });
                const portfolio = portfolios[0];
                return res.status(200).send({
                    portfolio,
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).send({
                    message: "internal error",
                });
            }
        });
    }
}
exports.default = PortfolioController;
