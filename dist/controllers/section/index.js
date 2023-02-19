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
// controller
const user_1 = __importDefault(require("../user"));
// repository
const section_1 = __importDefault(require("../../repository/section"));
// validators
const projects_1 = __importDefault(require("./validators/projects"));
const about_1 = __importDefault(require("./validators/about"));
const home_1 = __importDefault(require("./validators/home"));
const skills_1 = __importDefault(require("./validators/skills"));
const settings_1 = __importDefault(require("../settings"));
class SectionController {
    static create(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get the type by params
                const { typeSection } = req.params;
                const data = req.body;
                if (!req.user)
                    return;
                const { id } = req.user;
                const owner = yield user_1.default.getById(res, id, false);
                if (!data.settings)
                    return res.status(400).send({
                        message: "you must choose a setting to attached a section"
                    });
                const settings = yield settings_1.default.getById(data.settings);
                if (!settings)
                    return res.status(404).send({
                        message: "settings not found it"
                    });
                if (settings === null || settings === void 0 ? void 0 : settings.menu) {
                    let isThereAMenuLink = false;
                    settings.menu.forEach((menuLink) => {
                        if (menuLink.children === typeSection)
                            isThereAMenuLink = true;
                    });
                    if (isThereAMenuLink)
                        return res.status(400).send({
                            message: `you cannot create more than one section of the type ${typeSection} for a settings`,
                        });
                }
                if (owner)
                    data.owner = owner.name;
                if (typeSection === "home" || typeSection === "about") {
                    console.log("check home or about section images");
                    if (!req.files)
                        return res.status(400).send({
                            message: `you must upload a image for ${typeSection === "home" ? "the background" : "your profile"}`,
                        });
                    const files = req.files;
                    ;
                    console.log(files);
                    if (typeSection === "home")
                        data.backgroundImg = (_a = files["backgroundImg"][0]) === null || _a === void 0 ? void 0 : _a.path;
                    if (typeSection === "about")
                        data.profile.srcImg = (_b = files["picture"][0]) === null || _b === void 0 ? void 0 : _b.path;
                }
                const sanitated = SectionController.validate(typeSection, data);
                console.log(sanitated);
                sanitated.settings = settings;
                const section = yield section_1.default.create(sanitated);
                if (section) {
                    if (settings) {
                        (_c = settings === null || settings === void 0 ? void 0 : settings.menu) === null || _c === void 0 ? void 0 : _c.push({
                            children: typeSection,
                            link: typeSection,
                            icon: typeSection,
                        });
                        yield settings.save();
                    }
                }
                res.status(201).send({
                    section,
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static validate(typeSection, data) {
        let sanitated;
        switch (typeSection) {
            case "home":
                sanitated = home_1.default.validate(data);
                break;
            case "about":
                sanitated = about_1.default.validate(data);
                break;
            case "skills":
                sanitated = skills_1.default.validate(data);
                break;
            case "projects":
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
