// model
import { Response } from "express";
import { FindProjectsByParams } from "../../controllers/project";
import ProjectModel from "../../models/project";

// type
import { IUser } from "../../models/user";
type CreateDataParams = {
    title: string;
    resume: string;
    description: string;
    mainLang: "javascript" | "typescript" | "html" | "css" | "python" | "java" | "csharp" | "php" | "cplus";
    srcImg?: string;
    urlDemo: string;
    urlRepository: string;
    owner: IUser
}

export default class ProjectRepository{

    static async create(data:CreateDataParams) {

        return await ProjectModel.create(data);

    }

    static async update() {
        
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