// model
import SectionModel from "../../models/section";

// types
import { IAboutSection, IBiosData, IEducationData, IHomeSection, IProjectsSection, ISection, ISectionDocument, ISkillsSection, ITechData, IWorkData } from "../../shared-type/sections";
import { Date, ObjectId as ObjectIdMongoose } from "mongoose";
interface UpdateData{
    title: string;
    children: string;
    background?: boolean;
    backgroundImg?: string;
    icon?: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    biosData?: IBiosData;
    urlDownload?: string;
    workData?: IWorkData;
    owner?: string;
    ocupation?: string;
    mainStack?: string[];
    educationData?: IEducationData;
    techs?: ITechData;
    projects?: ObjectIdMongoose[] | string[];
    settings: ObjectIdMongoose | string;
}


export default class SectionRepository{
    static async create(data: IHomeSection | IAboutSection | ISkillsSection | IProjectsSection | ISection) {

        return await SectionModel.create(data);
    }

    static async update(data: any, section: ISectionDocument) {

        if (section.title === "home") {
            
            if (section?.backgroundImg && data?.backgroundImg) section.backgroundImg = data.backgroundImg;
            
            if (section?.owner && data?.owner) section.owner = data.owner;
            
            if (section?.ocupation && data?.ocupation) section.ocupation = data.ocupation;
            
            if (section?.mainStack && data?.mainStack) section.mainStack = data.mainStack;

        }

        if (section.title === "about") {

            if (section?.urlDownload && data?.urlDownload) section.urlDownload = data.urlDownload;
            
            if (section?.biosData && data?.biosData) section.biosData = data.biosData;
            
            if (section?.workData && data?.workData) section.workData = data.workData;
            
            if (section?.educationData && data?.educationData) section.educationData = data.educationData;
        
        }
        
        if (section.title === "skills") {

            if (section?.techs && data?.techs) section.techs = data.techs;

        }
       
        if (section.title === "projects") {

            if (section?.projects && data?.rojects) section.projects = data.projects;

        }
        

        if (section.title !== "projects" && section.title !== "about" && section.title !== "home" && section.title !== "skills") {

            if (section?.children && data?.children) section.children = data.children;
        
        }

        section.updatedAt = Date.now();

        section.save();

    }
    static async getById(id: string){

        return await SectionModel.findById(id).populate("projects");
    }
    static async getAllBySettingsId(settingsId: string) {
    
        return await SectionModel.find({
            settings: settingsId,
        }).populate("projects");
    }
}