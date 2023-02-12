// controller
import UserController from "../user";

// repository
import ProjectRepository from "../../repository/project/project";

// types
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
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
            message: "error 403: forbidden access you must be logged in for create a new portfolio"
        });
        
        // validation
        if (!title) return res.status(404).send({
            message: "error 400: bad request you must fill a title for your project"
        });

        if (!resume) return res.status(400).send({
            message: "error 400: bad request you must fill a resume of your project"
        });
        
        if (!description) return res.status(400).send({
            message: "error 400: bad request you must fill a description of your project"
        });
        
        if (!mainLang) return res.status(400).send({
            message: "error 400: bad request you must fill a main language of your project"
        });
        
        if (!urlDemo) return res.status(400).send({
            message: "error 400: bad request you must fill an url of your project demo"
        });
        
        if (!urlRepository) return res.status(400).send({
            message: "error 400: bad request you must fill an url of your project demo"
        });
        
        if (resume.length > 250) return res.status(400).send({
            message: "error 400: bad request you must not exceed 250 characters to resume your project"
        });
        
        if (resume.length > 50) return res.status(400).send({
            message: "error 400: bad request you must not exceed 50 chracters for your project title"
        });
        
        if (!req.file) return res.status(400).send({
            message: "error 400: bad request you must upload at least one photo for your project"
        })

        const { path } = req.file;

        const srcImg = path ? path : "";
        
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
            
            if (!project) {
                owner.projects.push(project);
                owner.save();
            };

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
        console.log("id params: ", id);
        console.log("mainLang params: ", mainLang);
        console.log("userId params: ", userId);
        console.log("title params: ", title);
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