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
class ProjectController {
    // create a new project
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, resume, description, mainLang, urlDemo, urlRepository } = req.body;
            // user validation
            if (!req.user)
                return res.status(403).send({
                    message: "error 403: forbidden access you must be logged in for create a new portfolio"
                });
            // validation
            if (!title)
                return res.status(404).send({
                    message: "error 400: bad request you must fill a title for your project"
                });
            if (!resume)
                return res.status(400).send({
                    message: "error 400: bad request you must fill a resume of your project"
                });
            if (!description)
                return res.status(400).send({
                    message: "error 400: bad request you must fill a description of your project"
                });
            if (!mainLang)
                return res.status(400).send({
                    message: "error 400: bad request you must fill a main language of your project"
                });
            if (!urlDemo)
                return res.status(400).send({
                    message: "error 400: bad request you must fill an url of your project demo"
                });
            if (!urlRepository)
                return res.status(400).send({
                    message: "error 400: bad request you must fill an url of your project demo"
                });
            if (resume.length > 250)
                return res.status(400).send({
                    message: "error 400: bad request you must not exceed 250 characters to resume your project"
                });
            if (resume.length > 50)
                return res.status(400).send({
                    message: "error 400: bad request you must not exceed 50 chracters for your project title"
                });
            if (!req.file)
                return res.status(400).send({
                    message: "error 400: bad request you must upload at least one photo for your project"
                });
            const { path } = req.file;
            const srcImg = path ? path : "";
            const { id } = req.user;
            const owner = yield user_1.default.getById(res, id, false);
            if (!owner)
                return res.status(404).send({
                    message: "error 404: user not found it"
                });
            try {
                const data = {
                    owner,
                    title,
                    resume,
                    description,
                    srcImg,
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
                    message: "error 500: internal error"
                });
            }
        });
    }
    // get all projects
    static getAllProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield project_1.default.find();
                res.status(200).send(projects);
            }
            catch (err) {
                console.log(`[server]: error `, err);
                res.status(500).send({
                    message: "error 500: internal error"
                });
            }
        });
    }
    // get projects or project by params
    static getByParams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id = "", mainLang = "", title = "", userId = "" } = req.params;
            if (id)
                return yield ProjectController.getById(res, id);
            if (mainLang || title || userId)
                return yield ProjectController.findProjectsByParams(res, {
                    mainLang,
                    title,
                    userId,
                });
            res.status(400).send({
                message: "error 400: bad request you must fill the param"
            });
        });
    }
    // get a project by id
    static getById(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield project_1.default.getById(id);
                res.status(200).send({
                    project,
                });
            }
            catch (err) {
                console.log(`[server]: error : ${err}`);
                res.status(404).send({
                    message: `error 404: project not find`
                });
            }
        });
    }
    // find projects by params
    static findProjectsByParams(res, { mainLang = "", title = "", userId = "", }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield project_1.default.findProjectsByParams({
                    mainLang,
                    title,
                    userId
                });
                if (!projects)
                    res.status(400).send({
                        message: "error 400: bad request you must pass a valida params"
                    });
                res.status(200).send(projects);
            }
            catch (err) {
                console.log("[server]: error ", err);
                res.status(500).send({
                    message: `error 500: internal error`
                });
            }
        });
    }
}
exports.default = ProjectController;
