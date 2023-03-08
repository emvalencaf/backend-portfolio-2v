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
const project_1 = __importDefault(require("../../repository/project/project"));
// utils
const handleFile_1 = __importDefault(require("../../utils/handleFile"));
class ProjectController {
    // create a new project
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, resume, description, mainLang, urlDemo, urlRepository } = req.body;
            // user validation
            if (!req.user)
                return res.status(403).send({
                    message: "you must be logged in for create a new portfolio"
                });
            // validation
            if (!title)
                return res.status(404).send({
                    message: "you must fill a title field for your project"
                });
            if (!resume)
                return res.status(400).send({
                    message: "you must fill a resume field of your project"
                });
            if (!description)
                return res.status(400).send({
                    message: "you must fill a description field of your project"
                });
            if (!mainLang)
                return res.status(400).send({
                    message: "you must fill a main language field of your project"
                });
            if (!urlDemo)
                return res.status(400).send({
                    message: "you must fill an url of your project demo"
                });
            if (!urlRepository)
                return res.status(400).send({
                    message: "you must fill an url of your project demo"
                });
            if (resume.length > 250)
                return res.status(400).send({
                    message: "you must not exceed 250 characters to resume your project"
                });
            try {
                if (!req.file)
                    return res.status(400).send({
                        message: "you must upload at least one photo for your project"
                    });
                // const { path } = req.file;
                // const srcImg = path ? path : "";
                const { id } = req.user;
                const owner = yield user_1.default.getById(id, false);
                if (!owner)
                    return res.status(404).send({
                        message: "user not found it"
                    });
                const data = {
                    owner,
                    title,
                    resume,
                    description,
                    srcImg: handleFile_1.default.getUrlFromFile(req.file),
                    mainLang,
                    urlDemo,
                    urlRepository,
                };
                const project = yield project_1.default.create(data);
                if (project) {
                    owner.projects.push(project._id);
                    yield owner.save();
                }
                ;
                res.status(201).send({
                    project
                });
            }
            catch (err) {
                console.log(`[server]: error`, err);
                res.status(500).send({
                    message: "internal error"
                });
            }
        });
    }
    // update a project
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const project = yield ProjectController.getById(id);
                if (!project)
                    return res.status(404).send({
                        message: "project not found it",
                    });
                const { title, resume, description, mainLang, urlDemo, urlRepository } = req.body;
                if (!title)
                    return res.status(400).send({
                        message: "you must fill a title field for your project"
                    });
                if (!resume)
                    return res.status(400).send({
                        message: "you must fill a resume field of your project"
                    });
                if (!description)
                    return res.status(400).send({
                        message: "you must fill a description field of your project"
                    });
                if (!mainLang)
                    return res.status(400).send({
                        message: "you must fill a main language field of your project"
                    });
                if (!urlDemo)
                    return res.status(400).send({
                        message: "you must fill an url of your project demo"
                    });
                if (!urlRepository)
                    return res.status(400).send({
                        message: "you must fill an url of your project demo"
                    });
                if (resume.length > 250)
                    return res.status(400).send({
                        message: "you must not exceed 250 characters to resume your project"
                    });
                if (!req.file && !project.srcImg)
                    return res.status(400).send({
                        message: "you must upload at least one photo for your project"
                    });
                let data = {
                    title,
                    resume,
                    description,
                    owner: project.owner,
                    srcImg: req.file ? handleFile_1.default.getUrlFromFile(req.file) : project.srcImg,
                    mainLang,
                    urlDemo,
                    urlRepository,
                };
                yield project_1.default.update(data, project);
                res.status(204).send({
                    message: `${title} project was successfully updated`,
                });
                return;
            }
            catch (err) {
                console.log("[server] : error : ", err);
                res.status(500).send({
                    message: "internal error",
                });
                return;
            }
        });
    }
    // get all projects
    static getAllProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield project_1.default.find();
                if (projects.length === 0)
                    return res.status(404).send({
                        message: "no project was found it",
                    });
                res.status(200).send({ projects });
            }
            catch (err) {
                console.log(`[server]: error `, err);
                res.status(500).send({
                    message: "internal error"
                });
            }
        });
    }
    // a controller to callback getById and findProejctsByParams
    static getByParams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id = "", mainLang = "", title = "", userId = "" } = req.params;
            try {
                if (id) {
                    const project = yield ProjectController.getById(id);
                    if (!project)
                        return res.status(404).send({
                            message: "project not found it",
                        });
                    res.status(200).send({
                        project,
                    });
                    return;
                }
                if (mainLang || title || userId) {
                    const projects = yield ProjectController.findProjectsByParams({
                        mainLang,
                        title,
                        userId,
                    });
                    if (!projects)
                        return res.status(404).send({
                            message: "no project were found it",
                        });
                    res.status(200).send({
                        projects,
                    });
                    return;
                }
            }
            catch (err) {
                console.log(`[server]: error:`, err);
                res.status(500).send({
                    message: "internal error",
                });
                return;
            }
        });
    }
    // get a project by id
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield project_1.default.getById(id);
            return project;
        });
    }
    // find projects by params
    static findProjectsByParams({ mainLang = "", title = "", userId = "", }) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield project_1.default.findProjectsByParams({
                mainLang,
                title,
                userId
            });
            return projects;
        });
    }
}
exports.default = ProjectController;
