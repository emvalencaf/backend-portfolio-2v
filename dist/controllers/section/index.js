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
const section_1 = __importDefault(require("../../repository/section"));
// validators
const projects_1 = __importDefault(require("./validators/projects"));
const about_1 = __importDefault(require("./validators/about"));
const home_1 = __importDefault(require("./validators/home"));
const skills_1 = __importDefault(require("./validators/skills"));
class SectionController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get the type by params
                const { sectionType } = req.params;
                const data = req.body;
                const sanitated = SectionController.validate(sectionType, data);
                const response = yield section_1.default.create(sanitated);
                res.status(201).send({
                    response,
                });
            }
            catch (err) {
            }
        });
    }
    static validate(sectionType, data) {
        let sanitated;
        switch (sectionType) {
            case "Home":
                sanitated = home_1.default.validate(data);
                break;
            case "About":
                sanitated = about_1.default.validate(data);
                break;
            case "Skills":
                sanitated = skills_1.default.validate(data);
                break;
            case "Projects":
                sanitated = projects_1.default.validate(data);
                break;
            default:
                const { title, children, background, backgroundImg, icon, } = data;
                sanitated = {
                    title,
                    icon,
                    children,
                    background,
                    backgroundImg,
                };
                break;
        }
        return sanitated;
    }
}
exports.default = SectionController;
