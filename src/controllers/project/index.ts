// controller
import UserController from "../user";

// repository
import ProjectRepository from "../../repository/project/project";

// types
import { Request, Response } from "express";
export type FindProjectsByParams = {
    mainLang?: string;
    title?: string;
    userId?: string
};

export default class ProjectController {

    // create a new project
    static async create(req: Request, res: Response) {

        const { title, resume, description, mainLang, srcImg, urlDemo, urlRepository } = req.body;

        // user validation
        if (!req.user) return res.status(403).send({
            message: "error 403: forbidden access you must be logged in for create a new portfolio"
        });

        // validation
        if (!title) res.status(404).send({
            message: "error 400: bad request you must fill a title for your project"
        });

        if (!resume) res.status(400).send({
            message: "error 400: bad request you must fill a resume of your project"
        });

        if (!description) res.status(400).send({
            message: "error 400: bad request you must fill a description of your project"
        });

        if (!mainLang) res.status(400).send({
            message: "error 400: bad request you must fill a main language of your project"
        });

        if (!srcImg) res.status(400).send({
            message: "error 400: bad request you must send a image to display your project"
        });

        if (!urlDemo) res.status(400).send({
            message: "error 400: bad request you must fill an url of your project demo"
        });

        if (!urlRepository) res.status(400).send({
            message: "error 400: bad request you must fill an url of your project demo"
        });

        if (resume.length > 250) res.status(400).send({
            message: "error 400: bad request you must not exceed 250 characters to resume your project"
        });

        if (resume.length > 50) res.status(400).send({
            message: "error 400: bad request you must not exceed 50 chracters for your project title"
        });


        const { id } = req.user;

        const owner = await UserController.getById(res, id, false);
        
        if (!owner) return res.status(404).send({
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
            }

            const project = await ProjectRepository.create(data);

            res.status(201).send({
                project,
            });

        } catch (err) {
            console.log(`[server]: error`, err);

            res.status(500).send({
                message: "error 500: internal error"
            });
        }

    }

    // get all projects
    static async getAllProjects(req: Request, res: Response) {

        try{

            const projects = await ProjectRepository.find();

            res.status(200).send(projects);

        }catch (err) {
            
            console.log(`[server]: error `, err);
            
            res.status(500).send({
                message: "error 500: internal error"
            });
        }

    }

    // get projects or project by params
    static async getByParams(req: Request, res: Response) {
        const { id = "", mainLang = "", title = "", userId = "" } = req.params;

        if (id) return await ProjectController.getById(res, id);

        if ( mainLang || title || userId ) return await ProjectController.findProjectsByParams(res, {
            mainLang,
            title,
            userId,
        });

        res.status(400).send({
            message: "error 400: bad request you must fill the param"
        })

    }

    // get a project by id
    static async getById(res: Response, id: string) {

        try{

            const project = await ProjectRepository.getById(id);

            res.status(200).send({
                project,
            });

        }catch (err) {
            console.log(`[server]: error : ${err}`);
            res.status(404).send({
                message: `error 404: project not find`
            })
        }
        
    }

    // find projects by params
    static async findProjectsByParams(res: Response, { mainLang = "", title = "", userId = "", }: FindProjectsByParams) {

        if (!mainLang || !title || !userId) res.status(400).send({
            message: "error 400: bad request you must fill the params"
        })

        try{
            
            const projects = await ProjectRepository.findProjectsByParams({
                mainLang,
                title,
                userId
            });

            if (!projects) res.status(400).send({
                message: "error 400: bad request you must pass a valida params"
            });

            res.status(200).send(projects);

        }catch (err){
            
            console.log("[server]: error ", err);

            res.status(500).send({
                message: `error 500: internal error`
            });
        }

    }
}