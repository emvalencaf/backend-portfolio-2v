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
class PortfolioController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield portfolio_1.default.get();
                res.status(200).send(response);
            }
            catch (e) {
                res.status(404).send({ message: "error 404", err: e });
            }
        });
    }
}
exports.default = PortfolioController;
