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
    // create a section
    static create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get the type of section to be created by params
                const { typeSection } = req.params;
                const data = req.body;
                if (!req.user)
                    return;
                const { id } = req.user;
                const owner = yield user_1.default.getById(id, false);
                // it will check if there's a settings attached (by an id) in the body of the request
                if (!data.settings)
                    return res.status(400).send({
                        message: "you must choose a setting to attached a section"
                    });
                const settings = yield settings_1.default.getById(data.settings);
                // it will check if the settings attached in the body's request is a valid one
                if (!settings)
                    return res.status(404).send({
                        message: "settings not found it"
                    });
                // each setting can only have one section of each seciton type 
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
                // it will check the files attached to the request body (only home and about section has files)
                if (typeSection === "home" || typeSection === "about") {
                    if (!req.files)
                        return res.status(400).send({
                            message: `you must upload a image for ${typeSection === "home" ? "the background" : "your profile"}`,
                        });
                    const files = req.files;
                    if (typeSection === "home") {
                        if (!files["backgroundImg"] || files["backgroundImg"].length === 0)
                            return res.status(400).send({
                                message: `you must upload a background image`,
                            });
                        data.backgroundImg = files["backgroundImg"][0].path;
                    }
                    else if (typeSection === "about") {
                        if (!files["picture"] || files["picture"].length === 0)
                            return res.status(400).send({
                                message: "you must upload a profile picture",
                            });
                        data.biosData = JSON.parse(data.biosData);
                        data.biosData.profilePhoto.srcImg = files["picture"][0].path;
                    }
                }
                let sanitated;
                // it will validate the request body
                try {
                    // the method validate will throw an error telling what is wrong in the request body that will be catched and will be sent to the client
                    sanitated = SectionController.validate(typeSection, data);
                }
                catch (err) {
                    const { message } = err;
                    return res.status(400).send({
                        message: message,
                    });
                }
                sanitated.settings = settings;
                const section = yield section_1.default.create(sanitated);
                if (section) {
                    if (settings) {
                        (_a = settings === null || settings === void 0 ? void 0 : settings.menu) === null || _a === void 0 ? void 0 : _a.push({
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
                console.log("[server]: error: ", err);
                res.status(500).send({
                    message: "internal error",
                });
            }
        });
    }
    // get a section by it's id
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const section = yield section_1.default.getById(id);
            return section;
        });
    }
    // get all sections attached to a settings id
    static getAllBySettingsId(settingsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sections = yield section_1.default.getAllBySettingsId(settingsId);
            return sections;
        });
    }
    // get al by users id
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sections = yield section_1.default.getAll();
                if (!sections)
                    return res.status(404).send({
                        message: "no sections were found it"
                    });
                return res.status(200).send({
                    sections
                });
            }
            catch (err) {
                console.log(err);
                res.status(501).send({
                    message: "internal error",
                });
                return;
            }
        });
    }
    // a controller to callback getById or getAllBySettingsId
    static getByParams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.settingsId) {
                    const { settingsId } = req.params;
                    const sections = yield SectionController.getAllBySettingsId(settingsId);
                    if (!sections || sections.length === 0)
                        return res.status(404).send({
                            message: "no sections were found attached to this settings",
                        });
                    return res.status(200).send({
                        sections,
                    });
                }
                if (req.params.id) {
                    const { id } = req.params;
                    const section = yield SectionController.getById(id);
                    if (!section)
                        return res.status(404).send({
                            message: "no section was found it",
                        });
                    return res.status(200).send({
                        section
                    });
                }
            }
            catch (err) {
                console.log(`[server]: error: `, err);
                res.send({
                    message: "internal error",
                });
            }
        });
    }
    // update a section
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const typeSection = req.body.typeSection;
            // it will check the files attached to the request body (only home and about section has files)
            try {
                // getting section by id
                const section = yield SectionController.getById(id);
                if (!section)
                    return res.status(404).send({
                        message: "section not found it",
                    });
                const dataMerged = {
                    // about section
                    biosData: typeSection === "about" && !!data.biosData ? JSON.parse(data.biosData) : section.biosData,
                    workData: typeSection === "about" && !!data.workData ? JSON.parse(data.workData) : section.workData,
                    educationData: typeSection === "about" && !!data.educationData ? JSON.parse(data.educationData) : section.educationData,
                    urlDownload: typeSection === "about" && !!data.urlDownload ? data.urlDownload : section.urlDownload,
                    // home section
                    owner: typeSection === "home" ? section.owner : section.owner,
                    ocupation: typeSection === "home" && !!data.ocupation ? data.ocupation : section.ocupation,
                    mainStack: typeSection === "home" && !!data.mainStack ? data.mainStack : section.mainStack,
                    backgroundImg: undefined,
                    // skills section
                    techs: typeSection === "skills" && !!data.techs ? data.techs : section.techs,
                    // project section
                    projects: typeSection === "projects" && !!data.projects ? data.projects : section.projects,
                    title: "",
                    icon: "home"
                };
                /*
                let files;
    
                if (req.files) files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
                
                if (files) {
                    if (typeSection === "home") {
                        if ((!files["backgroundImg"] || files["backgroundImg"].length === 0) && !section.backgroundImg) return res.status(400).send({
                            message: `you must upload a background image`,
                        });
                        
                        dataMerged.backgroundImg = files["backgroundImg"][0]? HandleFile.getUrlFromFile(files["backgroundImg"][0]) : section.backgroundImg;
                    }
                    
                    if (typeSection === "about") {
                        
                        if (!files["picture"] && !section.biosData?.profilePhoto?.srcImg) return res.status(400).send({
                            message: "you must upload a profile picture",
                        });
                        dataMerged.biosData.profilePhoto.srcImg = files["picture"][0] ? HandleFile.getUrlFromFile(files["picture"][0]) : section.biosData?.profilePhoto?.srcImg;
                    }
    
                }*/
                console.log("aqui? depois?");
                let newData;
                try {
                    // it will validate de request body, if the field is invalid it will throw an error that will be catched
                    newData = SectionController.validate(typeSection, data);
                }
                catch (err) {
                    const { message } = err;
                    return res.status(400).send({
                        message: message,
                    });
                }
                console.log("new data: ", newData);
                yield section_1.default.update(newData, section);
                console.log("section was updated?: ", section);
                return res.status(200).send({
                    section,
                });
            }
            catch (err) {
                console.log("[server]: error:", err);
                res.status(500).send({
                    message: "internal error",
                });
            }
        });
    }
    // validate the section's props by it's types.
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
