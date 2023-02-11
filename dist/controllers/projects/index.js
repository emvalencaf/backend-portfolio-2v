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
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, resume, description, mainLang, srcImg, urlDemo, urlRepository } = req.body;
            // user validation
            if (!req.user)
                return res.status(403).send({
                    message: "error 403: forbidden access you must be logged in for create a new portfolio"
                });
            // validation
            if (!title)
                res.status(404).send({
                    message: "error 400: bad request you must fill a title for your project"
                });
            if (!resume)
                res.status(400).send({
                    message: "error 400: bad request you must fill a resume of your project"
                });
            if (!description)
                res.status(400).send({
                    message: "error 400: bad request you must fill a description of your project"
                });
            if (!mainLang)
                res.status(400).send({
                    message: "error 400: bad request you must fill a main language of your project"
                });
            if (!srcImg)
                res.status(400).send({
                    message: "error 400: bad request you must send a image to display your project"
                });
            if (!urlDemo)
                res.status(400).send({
                    message: "error 400: bad request you must fill an url of your project demo"
                });
            if (!urlRepository)
                res.status(400).send({
                    message: "error 400: bad request you must fill an url of your project demo"
                });
            if (resume.length > 250)
                res.status(400).send({
                    message: "error 400: bad request you must not exceed 250 characters to resume your project"
                });
            if (resume.length > 50)
                res.status(400).send({
                    message: "error 400: bad request you must not exceed 50 chracters for your project title"
                });
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
                return yield project_1.default.create(data);
            }
            catch (err) {
                console.log(`[server]: error`, err);
                res.status(500).send({
                    message: "error 500: internal error"
                });
            }
            /*
            title: string;
            resume: string;
            description: string;
            mainLang: "javascript" | "typescript" | "html" | "css" | "python" | "java" | "csharp" | "php" | "cplus";
            srcImg?: string;
            urlDemo: string;
            urlRepository: string;*/
        });
    }
}
exports.default = ProjectController;
