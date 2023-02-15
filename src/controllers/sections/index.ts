// repository
import SectionRepository from "../../repository/section";

// validators
import ProjectsSectionValidator from "./validators/projects";
import AboutSectionValidator from "./validators/about";
import HomeSectionValidator from "./validators/home";
import SkillsSectionValidator from "./validators/skills";

// type
import { Request, Response } from "express";
import { IAboutSection, ICreateSectionData, IHomeSection, IProjectsSection, ISkillsSection } from "../../shared-type/sections";

export default class SectionController{
    static async create(req: Request, res:Response){

        try{
            // get the type by params
            const { sectionType } = req.params;
            const data: ICreateSectionData = req.body;

            let sanitated: IHomeSection | IAboutSection | ISkillsSection | IProjectsSection;
            switch (sectionType) {
                case "Home":
                    sanitated = HomeSectionValidator.validate(data);
                    break;
                case "About":
                    sanitated = AboutSectionValidator.validate(data);
                    break;
                case "Skills":
                    sanitated = SkillsSectionValidator.validate(data);
                    break;
                case "Projects":
                    sanitated = ProjectsSectionValidator.validate(data);
                    break;
                default:
                    break;
            }

            const response = await SectionRepository.create(sanitated);

            res.status(201).send({
                response,
            })
            
        } catch (err) {

        }
    }
}