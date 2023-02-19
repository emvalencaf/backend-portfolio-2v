// controller
import UserController from "../user";

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

export default class SectionController {
    static async create(req: Request, res: Response) {

        try {
            // get the type by params
            const { sectionType } = req.params;
            const data = req.body;

            if (!req.user) return;

            const { id } = req.user;

            const owner = await UserController.getById(res, id, false);

            if (owner) data.owner = owner.name;

            if (sectionType === "home" || sectionType === "about") {

                if (!req.file) return res.status(400).send({
                    message: `you must upload a image for ${sectionType === "home" ? "the background" : "your profile"}`,
                })

                const { path } = req.file;

                data.backgroundImg = path ? path : "";
                data.profile.srcImg = path? path: "";
            }



            const sanitated = SectionController.validate(sectionType, data);

            const response = await SectionRepository.create(sanitated);

            res.status(201).send({
                response,
            })

        } catch (err) {
            console.log(err);
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