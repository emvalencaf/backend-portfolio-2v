// model
import ProjectModel from "../../models/project";

// type
import { FindProjectsByParams } from "../../controllers/project";
import { CreateDataParamsProject, IProject } from "../../shared-type/project";
import { ObjectId } from "mongoose";

export default class ProjectRepository{

    static async create(data:CreateDataParamsProject) {

        return await ProjectModel.create(data);

    }

    static async update(data: CreateDataParamsProject, project: IProject) {
        const {
            title,
            resume,
            description,
            owner,
            srcImg,
            mainLang,
            urlDemo,
            urlRepository,
        } = data;

        project.title = title;
        project.resume = resume;
        project.description = description;
        project.owner = owner as ObjectId;
        project.srcImg = srcImg;
        project.mainLang = mainLang;
        project.urlDemo = urlDemo;
        project.urlRepository = urlRepository;

        project.updatedAt = Date.now(); 

        await project.save();
    }

    static async getById(id:string) {

        return await ProjectModel.findById(id).populate({
            path: "owner",
            select: "name _id email"
        });
    }

    static async findProjectsByParams({ mainLang = "", title = "", userId = "" }:FindProjectsByParams) {

        if (title) return await ProjectModel.findOne({
            title: title
        }).populate({
            path: "owner",
            select: "name _id email"
        });;

        if (mainLang) return await ProjectModel.find({
            mainLang: mainLang
        }).populate({
            path: "owner",
            select: "name _id email"
        });;
        
        if (userId) return await ProjectModel.find({
            owner: userId
        }).populate({
            path: "owner",
            select: "name _id email"
        });


        return null;

    }

    static async find() {
        return await ProjectModel.find();
    }
}