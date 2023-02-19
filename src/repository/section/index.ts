// model
import SectionModel from "../../models/section";

// types
import { IAboutSection, IHomeSection, IProjectsSection, ISection, ISkillsSection } from "../../shared-type/sections";

export default class SectionRepository{
    static async create(data: IHomeSection | IAboutSection | ISkillsSection | IProjectsSection | ISection) {
        console.log(data);
        return await SectionModel.create(data);
    }
    static async update(data: IHomeSection | IAboutSection | ISkillsSection | IProjectsSection) {
        
    }
}