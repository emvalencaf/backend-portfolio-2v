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
import SettingsController from "../settings";

export default class SectionController {

    // create a section
    static async create(req: Request, res: Response) {

        try {
            // get the type by params
            const { typeSection } = req.params;
            const data = req.body;

            if (!req.user) return;

            const { id } = req.user;

            const owner = await UserController.getById(id, false);

            if (!data.settings) return res.status(400).send({
                message: "you must choose a setting to attached a section"
            });

            const settings = await SettingsController.getById(data.settings);

            if (!settings) return res.status(404).send({
                message: "settings not found it"
            });

            if (settings?.menu) {
                let isThereAMenuLink: boolean = false;

                settings.menu.forEach((menuLink) => {
                    if (menuLink.children === typeSection) isThereAMenuLink = true;
                });

                if (isThereAMenuLink) return res.status(400).send({
                    message: `you cannot create more than one section of the type ${typeSection} for a settings`,
                })
            }

            if (owner) data.owner = owner.name;

            if (typeSection === "home" || typeSection === "about") {
                console.log("check home or about section images");
                if (!req.files) return res.status(400).send({
                    message: `you must upload a image for ${typeSection === "home" ? "the background" : "your profile"}`,
                })

                const files = req.files as { [fieldname: string]: Express.Multer.File[] };;

                if (typeSection === "home") data.backgroundImg = files["backgroundImg"][0]?.path;

                data.biosData = JSON.parse(data.biosData);
                if (typeSection === "about") {
                    data.biosData.profilePhoto.srcImg = files["picture"][0]?.path;
                    data.biosData.profilePhoto.altText = `profile picture`;
                }
            }

            let sanitated;

            try{
                
                sanitated = SectionController.validate(typeSection, data);

            } catch (err){
                const { message } = err as Error;
                return res.status(400).send({
                    message: message,
                });
            }

            sanitated.settings = settings;
            const section = await SectionRepository.create(sanitated);

            if (section) {
                if (settings) {
                    settings?.menu?.push({
                        children: typeSection,
                        link: typeSection,
                        icon: typeSection,
                    });
                    await settings.save();
                }
            }

            res.status(201).send({
                section,
            })

        } catch (err) {
            console.log("[server]: error: ",err);

            res.status(500).send({
                message: "internal error",
            });
        }
    }

    // get a section by it's id
    static async getById(id: string) {

        const section = await SectionRepository.getById(id);

        return section;

    }

    // get all sections attached to a settings id
    static async getAllBySettingsId(settingsId: string) {

        const sections = await SectionRepository.getAllBySettingsId(settingsId);

        return sections;

    }

    // a controller to callback getById or getAllBySettingsId
    static async getByParams(req: Request, res: Response) {

        try {
            if (req.params.settingsId) {

                const { settingsId } = req.params;

                const sections = await SectionController.getAllBySettingsId(settingsId);

                if (!sections || sections.length === 0) return res.status(404).send({
                    message: "no sections were found attached to this settings",
                });

                return res.status(200).send({
                    sections,
                });

            }

            if (req.params.id) {

                const { id } = req.params;

                const section = await SectionController.getById(id);

                if (!section) return res.status(404).send({
                    message: "no section was found it",
                });

                return res.status(200).send({
                    section,
                })
            }

        } catch (err) {
            console.log(`[server]: error: `,err);
            res.send({
                message: "internal error",
            });

        }

    }

    // update a section
    static async update(req: Request, res: Response) {
        const { id } = req.params;
        
        const data = req.body;

        const typeSection: "home" | "about" | "projects" | "other" | "skills" = req.body.typeSection;

        try{

            const section = await SectionController.getById(id);

            if (!section) return res.status(404).send({
                message: "section not found it",
            });

            let newData: ISection | IHomeSection | ISkillsSection | IProjectsSection | IAboutSection;
            
            try{
                
                newData = SectionController.validate(typeSection, data);

            } catch (err) {
                const { message } = err as Error;
                return res.status(400).send({
                    message: message,
                });
            }

            await SectionRepository.update(newData, section);

            return res.status(204).send({
                message: `${section.title} was successfully updated`
            });

        } catch(err) {
            console.log("[server]: error:",err);
            res.status(500).send({
                message: "internal error",
            });
        }
    }

    // validate the section's props by it's types.
    static validate(typeSection: string, data: ICreateSectionData): IHomeSection | IAboutSection | ISkillsSection | IProjectsSection | ISection {

        let sanitated: IHomeSection | IAboutSection | ISkillsSection | IProjectsSection | ISection;
        switch (typeSection) {
            case "home":
                sanitated = HomeSectionValidator.validate(data);
                break;
            case "about":
                sanitated = AboutSectionValidator.validate(data);
                break;
            case "skills":
                sanitated = SkillsSectionValidator.validate(data);
                break;
            case "projects":
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