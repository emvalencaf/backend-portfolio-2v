// model
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

        data.owner.projects.push()

        const project = await ProjectModel.create(data);

        return project;
    }

}