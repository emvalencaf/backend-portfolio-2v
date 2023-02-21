// controller
import UserController from "../user";

// repository
import ProjectRepository from "../../repository/project/project";

// types
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { CreateDataParamsProject } from "../../shared-type/project";
export type FindProjectsByParams = {
    mainLang?: string;
    title?: string;
    userId?: string
};

export default class ProjectController {

    // create a new project
    static async create(req: Request, res: Response) {
        const { title, resume, description, mainLang, urlDemo, urlRepository } = req.body;


        // user validation
        if (!req.user) return res.status(403).send({
            message: "you must be logged in for create a new portfolio"
        });

        // validation
        if (!title) return res.status(404).send({
            message: "you must fill a title field for your project"
        });

        if (!resume) return res.status(400).send({
            message: "you must fill a resume field of your project"
        });

        if (!description) return res.status(400).send({
            message: "you must fill a description field of your project"
        });

        if (!mainLang) return res.status(400).send({
            message: "you must fill a main language field of your project"
        });

        if (!urlDemo) return res.status(400).send({
            message: "you must fill an url of your project demo"
        });

        if (!urlRepository) return res.status(400).send({
            message: "you must fill an url of your project demo"
        });

        if (resume.length > 250) return res.status(400).send({
            message: "you must not exceed 250 characters to resume your project"
        });

        if (resume.length > 50) return res.status(400).send({
            message: "you must not exceed 50 chracters for your project title"
        });

        if (!req.file) return res.status(400).send({
            message: "you must upload at least one photo for your project"
        })

        const { path } = req.file;

        const srcImg = path ? path : "";

        const { id } = req.user;

        const owner = await UserController.getById(res, id, false);

        if (!owner) return res.status(404).send({
            message: "user not found it"
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
            }

            const project = await ProjectRepository.create(data);

            if (project) {
                owner.projects.push(project._id as unknown as ObjectId);
                await owner.save();
            };

            res.status(201).send({
                project
            });

        } catch (err) {
            console.log(`[server]: error`, err);

            res.status(500).send({
                message: "internal error"
            });
        }

    }

    // update a project
    static async update(req: Request, res: Response) {
        const { id } = req.params;

        const project = await ProjectController.getById(id);

        if (!project) return res.status(404).send({
            message: "project not found it",
        });

        const { title, resume, description, mainLang, urlDemo, urlRepository } = req.body;

        if (!title) return res.status(404).send({
            message: "you must fill a title field for your project"
        });

        if (!resume) return res.status(400).send({
            message: "you must fill a resume field of your project"
        });

        if (!description) return res.status(400).send({
            message: "you must fill a description field of your project"
        });

        if (!mainLang) return res.status(400).send({
            message: "you must fill a main language field of your project"
        });

        if (!urlDemo) return res.status(400).send({
            message: "you must fill an url of your project demo"
        });

        if (!urlRepository) return res.status(400).send({
            message: "you must fill an url of your project demo"
        });

        if (resume.length > 250) return res.status(400).send({
            message: "you must not exceed 250 characters to resume your project"
        });

        if (resume.length > 50) return res.status(400).send({
            message: "you must not exceed 50 chracters for your project title"
        });

        if (!req.file) return res.status(400).send({
            message: "you must upload at least one photo for your project"
        })

        const { path } = req.file;

        const srcImg = path ? path : "";

        try{

            const data: CreateDataParamsProject = {
                title,
                resume,
                description,
                owner: project.owner,
                srcImg,
                mainLang,
                urlDemo,
                urlRepository,
            }

            await ProjectRepository.update(data, project);

            res.status(204).send({
                message: `${title} project was successfully updated`,
            });

            return;

        } catch(err){
            console.log("[server] : error : ", err);
            res.status(500).send({
                message: "internal error",
            });
            return;
        }

    }

    // get all projects
    static async getAllProjects(req: Request, res: Response) {

        try {

            const projects = await ProjectRepository.find();

            res.status(200).send(projects);

        } catch (err) {

            console.log(`[server]: error `, err);

            res.status(500).send({
                message: "internal error"
            });
        }

    }

    // a controller to callback getById and findProejctsByParams
    static async getByParams(req: Request, res: Response) {
        const { id = "", mainLang = "", title = "", userId = "" } = req.params;

        try {

            if (id) {

                const project = await ProjectController.getById(id);

                if (!project) return res.status(404).send({
                    message: "project not found it",
                });

                res.status(200).send({
                    project,
                });

                return;
            }

            if (mainLang || title || userId) {

                const projects = await ProjectController.findProjectsByParams({
                    mainLang,
                    title,
                    userId,
                });

                if (!projects) return res.status(404).send({
                    message: "no project were found it",
                });

                res.status(200).send({
                    projects,
                });

                return;
            }

        } catch (err) {
            console.log(`[server]: error:`, err);
            res.status(404).send({
                message: "internal error",
            });
            return;
        }

    }

    // get a project by id
    static async getById(id: string) {

        const project = await ProjectRepository.getById(id);

        return project;

    }

    // find projects by params
    static async findProjectsByParams({ mainLang = "", title = "", userId = "", }: FindProjectsByParams) {

        const projects = await ProjectRepository.findProjectsByParams({
            mainLang,
            title,
            userId
        });

        return projects;

    }
}