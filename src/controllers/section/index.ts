// repository
import SectionRepository from "../../repository/section";

// validators
import ProjectsSectionValidator from "./validators/projects";
import AboutSectionValidator from "./validators/about";
import HomeSectionValidator from "./validators/home";
import SkillsSectionValidator from "./validators/skills";

// type
import { Request, Response } from "express";
import { IAboutSection, ICreateSectionData, IHomeSection, IProjectsSection, ISection, ISkillsSection } from "../../shared-type/sections";

export default class SectionController{
    static async create(req: Request, res:Response){

        try{
            // get the type by params
            const { sectionType } = req.params;
            const data = req.body;

            const sanitated = SectionController.validate(sectionType, data);

            const response = await SectionRepository.create(sanitated);

            res.status(201).send({
                response,
            })
            
        } catch (err) {

        }
    }
    static validate(sectionType: string, data: ICreateSectionData): IHomeSection | IAboutSection | ISkillsSection | IProjectsSection | ISection {

        let sanitated: IHomeSection | IAboutSection | ISkillsSection | IProjectsSection | ISection;
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
                const {
                    title,
                    children,
                    background,
                    backgroundImg,
                    icon,
                } = data;

                sanitated = {
                    title,
                    icon,
                    children,
                    background,
                    backgroundImg,
                }
                break;
        }

        return sanitated;
    }
}