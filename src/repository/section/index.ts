// model
import SectionModel from "../../models/section";

// types
import { IAboutSection, IHomeSection, IProjectsSection, ISection, ISkillsSection } from "../../shared-type/sections";

export default class SectionRepository{
    static async create(data: IHomeSection | IAboutSection | ISkillsSection | IProjectsSection | ISection) {

        return await SectionModel.create(data);
    }

    static async update(data: IHomeSection | IAboutSection | ISkillsSection | IProjectsSection) {
        // to be implemented
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